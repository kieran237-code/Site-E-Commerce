import React, { useState, useEffect } from 'react';
import {
    PlusCircle, Trash2, Edit, LogOut, Package,
    FolderPlus, Image as ImageIcon, Check, X, Loader2, Save, Trash
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
    const [view, setView] = useState('list');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);

    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');
    const API_URL = `${import.meta.env.VITE_API_URL}/api`;

    useEffect(() => {
        if (!token) { navigate('/connexion'); return; }
        loadInitialData();
    }, [token]);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            const [prodRes, catRes] = await Promise.all([
                axios.get(`${API_URL}/admin/produit`, { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(`${API_URL}/categories`)
            ]);
            setProducts(prodRes.data);
            setCategories(catRes.data);
        } catch (err) {
            if (err.response?.status === 401) navigate('/connexion');
        } finally { setLoading(false); }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/connexion');
    };

    const btnPrimary = "bg-[#2d3748] text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-all flex items-center gap-2 shadow-sm";
    const inputStyle = "w-full p-2.5 border border-zinc-300 rounded-md focus:ring-2 focus:ring-[#2d3748]/20 focus:border-[#2d3748] outline-none transition-all bg-white text-sm";

    return (
        <div className="flex min-h-screen bg-zinc-50 font-sans text-zinc-900">
            {/* SIDEBAR */}
            <div className="w-72 bg-[#2d3748] text-white p-8 flex flex-col shadow-xl sticky top-0 h-screen">
                <div className="mb-12 text-center">
                    <h2 className="text-2xl font-serif italic tracking-widest">MurieL</h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">Luxury Beauty Admin</p>
                </div>

                <nav className="flex flex-col gap-3 flex-grow">
                    <button onClick={() => setView('list')} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${view === 'list' ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'}`}>
                        <Package size={20} /> Produits postés
                    </button>
                    <button onClick={() => setView('add-product')} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${view === 'add-product' ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'}`}>
                        <PlusCircle size={20} /> Poster un produit
                    </button>
                    <button onClick={() => setView('add-category')} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${view === 'add-category' ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'}`}>
                        <FolderPlus size={20} /> Créer une catégorie
                    </button>
                </nav>

                <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 hover:text-red-300 mt-auto pt-6 border-t border-white/10 transition-colors">
                    <LogOut size={20} /> Déconnexion
                </button>
            </div>

            {/* CONTENU PRINCIPAL */}
            <div className="flex-1 p-10 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 text-zinc-400">
                            <Loader2 className="animate-spin mb-4" size={40} />
                            <p className="italic font-serif text-lg">Préparation du catalogue...</p>
                        </div>
                    ) : (
                        <>
                            {view === 'list' && (
                                <ProductList
                                    products={products}
                                    setView={setView}
                                    onDelete={loadInitialData}
                                    onEdit={(p) => setEditingProduct(p)}
                                />
                            )}
                            {view === 'add-product' && <AddProductForm categories={categories} onSuccess={() => { setView('list'); loadInitialData(); }} inputStyle={inputStyle} btnStyle={btnPrimary} />}
                            {view === 'add-category' && <AddCategoryForm onSuccess={loadInitialData} inputStyle={inputStyle} btnStyle={btnPrimary} />}
                        </>
                    )}
                </div>
            </div>

            {/* MODALE */}
            {editingProduct && (
                <EditProductModal
                    product={editingProduct}
                    categories={categories}
                    onClose={() => setEditingProduct(null)}
                    onSuccess={loadInitialData}
                    inputStyle={inputStyle}
                />
            )}
        </div>
    );
};

// --- Tableau de produit------
const ProductList = ({ products, setView, onDelete, onEdit }) => {
    const handleDelete = async (id) => {
        if (!window.confirm("Supprimer ce produit définitivement ?")) return;
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onDelete();
        } catch (err) { alert("Erreur lors de la suppression"); }
    };

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-10">
                <h1 className="text-3xl font-bold text-[#2d3748]">Catalogue</h1>
                <button onClick={() => setView('add-product')} className="bg-[#2d3748] text-white px-6 py-3 rounded-md flex items-center gap-2 shadow-lg">
                    <PlusCircle size={20} /> Nouveau Produit
                </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-xs font-bold uppercase tracking-wider">
                        <tr>
                            <th className="p-5">Visuel</th>
                            <th className="p-5">Désignation</th>
                            <th className="p-5">Catégorie</th>
                            <th className="p-5">Couleur</th>
                            <th className="p-5">Prix</th>
                            <th className="p-5">Stock</th>
                            <th className="p-5 text-center">Status</th>
                            <th className="p-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {products.map((p) => (
                            <tr key={p.id} className="hover:bg-zinc-50/80 transition-colors group">
                                <td className="p-5">
                                    <div className="w-12 h-12 rounded bg-zinc-100 border overflow-hidden">
                                        {p.Images?.[0] ? <img src={p.Images[0].url} className="w-full h-full object-cover" /> : <ImageIcon className="m-auto text-zinc-300 h-full" />}
                                    </div>
                                </td>
                                <td className="p-5 font-semibold text-[#2d3748]">{p.name}</td>
                                <td className="p-5"><span className="text-[10px] bg-zinc-100 px-2 py-1 rounded-full font-bold">{p.Category?.name || '---'}</span></td>
                                <td className="p-5 text-zinc-500 text-sm">{p.color}</td>
                                <td className="p-5 font-medium">{p.price.toLocaleString()} FCFA</td>
                                <td className="p-5 font-bold text-green-600">{p.stock}</td>
                                <td className="p-5">
                                    <div className="flex gap-2 justify-center">
                                        {p.is_new && <div className="w-2.5 h-2.5 rounded-full bg-orange-400" title="Nouveau"></div>}
                                        {p.is_popular && <div className="w-2.5 h-2.5 rounded-full bg-blue-400" title="Populaire"></div>}
                                        {p.is_promo && <div className="w-2.5 h-2.5 rounded-full bg-red-500" title="Promotion"></div>}
                                    </div>
                                </td>
                                <td className="p-5 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => onEdit(p)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-full transition-all"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-full transition-all"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Modal de modification
const EditProductModal = ({ product, categories, onClose, onSuccess, inputStyle }) => {
    const [form, setForm] = useState({ ...product });
    const [newFiles, setNewFiles] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [deletingImgId, setDeletingImgId] = useState(null);

    const API_URL = `${import.meta.env.VITE_API_URL}/api`;
    const token = localStorage.getItem('adminToken');

    const handleDeleteImage = async (imageId) => {
        if (!window.confirm("Supprimer cette image définitivement ?")) return;

        setDeletingImgId(imageId);
        try {
            await axios.delete(`${API_URL}/admin/images/${imageId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setForm({
                ...form,
                Images: form.Images.filter(img => img.id !== imageId)
            });
        } catch (err) {
            alert("Erreur lors de la suppression de l'image");
        } finally {
            setDeletingImgId(null);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
   
            const cleanData = {
                name: form.name,
                price: form.price,
                stock: form.stock,
                color: form.color,
                description: form.description,
                category_id: form.category_id,
                is_new: form.is_new,
                is_promo: form.is_promo,
                is_popular: form.is_popular
            };

            await axios.put(`${API_URL}/admin/products/${product.id}`, cleanData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (newFiles.length > 0) {
                const imageData = new FormData();
                Array.from(newFiles).forEach(file => imageData.append('images', file));

                await axios.put(`${API_URL}/admin/products/${product.id}`, imageData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            onSuccess();
            onClose();
        } catch (err) {
            alert("Erreur lors de la modification");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#2d3748]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* HEADER */}
                <div className="p-6 bg-[#2d3748] text-white flex justify-between items-center shrink-0">
                    <h2 className="text-xl font-bold font-serif italic">Gestion du Produit & Images</h2>
                    <button onClick={onClose} className="p-2 hover:rotate-90 transition-transform"><X /></button>
                </div>

                <form onSubmit={handleUpdate} className="overflow-y-auto p-8 grid grid-cols-12 gap-6">

                    {/* SECTION IMAGES */}
                    <div className="col-span-12">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 mb-3 block">Images en ligne</label>
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {form.Images?.map((img) => (
                                <div key={img.id} className="relative group shrink-0 w-28 h-28 rounded-xl border-2 border-zinc-100 overflow-hidden">
                                    <img src={img.url} className="w-full h-full object-cover" alt="produit" />
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteImage(img.id)}
                                        className="absolute top-1 right-1 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                    >
                                        {deletingImgId === img.id ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
                                    </button>
                                </div>
                            ))}

                            <label className="w-28 h-28 border-2 border-dashed border-zinc-200 rounded-xl flex flex-col items-center justify-center text-zinc-400 hover:border-[#2d3748] hover:text-[#2d3748] cursor-pointer transition-all bg-zinc-50">
                                <PlusCircle size={24} />
                                <span className="text-[9px] mt-1 font-bold uppercase">Ajouter</span>
                                <input type="file" multiple className="hidden" onChange={(e) => setNewFiles(e.target.files)} />
                            </label>
                        </div>
                        {newFiles.length > 0 && (
                            <p className="text-xs text-blue-600 font-bold mt-2 flex items-center gap-1">
                                <Check size={12} /> {newFiles.length} nouvelle(s) image(s) prête(s)
                            </p>
                        )}
                    </div>

                    {/* CHAMPS TEXTE */}
                    <div className="col-span-12 md:col-span-8">
                        <label className="text-[10px] font-bold uppercase text-zinc-400">Désignation</label>
                        <input type="text" className={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>

                    <div className="col-span-12 md:col-span-4">
                        <label className="text-[10px] font-bold uppercase text-zinc-400">Couleur</label>
                        <input type="text" className={inputStyle} value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} />
                    </div>

                    <div className="col-span-12 md:col-span-4">
                        <label className="text-[10px] font-bold uppercase text-zinc-400">Prix (FCFA)</label>
                        <input type="number" className={inputStyle} value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                    </div>

                    <div className="col-span-6 md:col-span-4">
                        <label className="text-[10px] font-bold uppercase text-zinc-400">Stock</label>
                        <input type="number" className={inputStyle} value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
                    </div>

                    <div className="col-span-6 md:col-span-4">
                        <label className="text-[10px] font-bold uppercase text-zinc-400">Catégorie</label>
                        <select className={inputStyle} value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}>
                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                    </div>

                    {/* SECTION STATUS (SÉLECTION UNIQUE : NOUVEAU, PROMO, OU POPULAIRE) */}
                    <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        <StatusToggle
                            label="Nouveau"
                            active={form.is_new}
                            color="bg-orange-500"
                            activeBg="bg-orange-50"
                            activeBorder="border-orange-500"
                            onClick={() => setForm({
                                ...form,
                                is_new: !form.is_new, // On bascule Nouveau
                                is_promo: false,      // On désactive Promo
                                is_popular: false     // On désactive Populaire
                            })}
                        />
                        <StatusToggle
                            label="Promotion"
                            active={form.is_promo}
                            color="bg-red-600"
                            activeBg="bg-red-50"
                            activeBorder="border-red-600"
                            onClick={() => setForm({
                                ...form,
                                is_new: false,
                                is_promo: !form.is_promo,
                                is_popular: false
                            })}
                        />
                        <StatusToggle
                            label="Populaire"
                            active={form.is_popular}
                            color="bg-blue-400"
                            activeBg="bg-blue-50"
                            activeBorder="border-blue-400"
                            onClick={() => setForm({
                                ...form,
                                is_new: false,
                                is_promo: false,
                                is_popular: !form.is_popular
                            })}
                        />
                    </div>

                    <div className="col-span-12">
                        <label className="text-[10px] font-bold uppercase text-zinc-400">Description</label>
                        <textarea rows="3" className={`${inputStyle} resize-none`} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
                    </div>

                    {/* ACTIONS */}
                    <div className="col-span-12 pt-6 flex gap-4">
                        <button type="submit" disabled={loading} className="w-full bg-[#2d3748] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl hover:bg-slate-700 transition-all disabled:opacity-50">
                            {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Enregistrer les changements</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
 
const StatusToggle = ({ label, active, color, activeBg, activeBorder, onClick }) => (
    <div
        onClick={onClick}
        className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${active ? `${activeBg} ${activeBorder}` : 'border-zinc-100 bg-white'}`}
    >
        <span className={`text-[10px] font-bold uppercase ${active ? 'opacity-100' : 'text-zinc-400'}`}>{label}</span>
        <div className={`w-10 h-5 rounded-full relative transition-colors ${active ? color : 'bg-zinc-200'}`}>
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${active ? 'left-6' : 'left-1'}`} />
        </div>
    </div>
);

const StatusSwitch = ({ label, active, onClick, color }) => (
    <div className="flex flex-col items-center gap-3">
        <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-tighter">{label}</span>
        <button type="button" onClick={onClick} className={`w-14 h-7 rounded-full relative transition-all duration-300 ${active ? color : 'bg-zinc-200 shadow-inner'}`}>
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${active ? 'left-8' : 'left-1'}`}></div>
        </button>
    </div>
);
// Ajouter un cate
const AddCategoryForm = ({ onSuccess, inputStyle, btnStyle }) => {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const API_URL = `${import.meta.env.VITE_API_URL}/api`;
    const token = localStorage.getItem('adminToken');

    
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${API_URL}/categories`);
            setCategories(res.data);
        } catch (err) {
            console.error("Erreur chargement catégories", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');

        try {
            const response = await axios.post(
                `${API_URL}/admin/categories`,
                { name },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccessMessage(`La catégorie "${name}" a été créée !`);
            setName('');
            fetchCategories(); 
            onSuccess(); 

            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            alert("Erreur lors de la création");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, catName) => {
        if (!window.confirm(`Supprimer la catégorie "${catName}" ? Cela pourrait impacter les produits associés.`)) return;

        try {
            await axios.delete(`${API_URL}/admin/categories/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccessMessage("Catégorie supprimée");
            fetchCategories(); 
            onSuccess();
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            alert("Erreur lors de la suppression");
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-4">
            {/* FORMULAIRE DE CRÉATION */}
            <div className="bg-white p-10 rounded-2xl shadow-xl border text-center">
                <FolderPlus size={40} className="mx-auto text-[#2d3748] mb-4" />
                <h2 className="text-xl font-bold mb-6">Nouvelle Catégorie</h2>

                {successMessage && (
                    <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm font-medium animate-in fade-in zoom-in">
                        <Check size={16} className="inline mr-2" />
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        required
                        type="text"
                        className={inputStyle}
                        placeholder="Nom (ex: Sacs de soirée)"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${btnStyle} whitespace-nowrap px-8`}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Ajouter"}
                    </button>
                </form>
            </div>

            {/* LISTE DES CATÉGORIES EXISTANTES */}
            <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
                <div className="bg-zinc-50 p-4 border-b">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                        <Package size={16} /> Catégories actuelles ({categories.length})
                    </h3>
                </div>
                <div className="divide-y max-h-[400px] overflow-y-auto">
                    {categories.length === 0 ? (
                        <p className="p-8 text-center text-zinc-400 italic">Aucune catégorie trouvée</p>
                    ) : (
                        categories.map((cat) => (
                            <div key={cat.id} className="p-4 flex justify-between items-center hover:bg-zinc-50 transition-colors">
                                <div>
                                    <p className="font-semibold text-[#2d3748]">{cat.name}</p>

                                </div>
                                <button
                                    onClick={() => handleDelete(cat.id, cat.name)}
                                    className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                                    title="Supprimer"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
// Ajouter un Produit
const AddProductForm = ({ categories, onSuccess, inputStyle, btnStyle }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', price: '', stock: '', color: '', description: '', category_id: '', is_new: true, is_promo: false, is_popular: false });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        Object.keys(form).forEach(key => data.append(key, form[key]));
        Array.from(files).forEach(file => data.append('images', file));
        try {
            const token = localStorage.getItem('adminToken');
            await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products`, data, { headers: { Authorization: `Bearer ${token}` } });
            onSuccess();
        } catch (err) { alert("Erreur"); }
        finally { setLoading(false); }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl bg-white p-10 rounded-2xl shadow-xl border grid grid-cols-6 gap-6 animate-in slide-in-from-bottom-4">
            <h2 className="col-span-6 text-2xl font-bold text-[#2d3748] border-b pb-4">Nouveau Produit</h2>
            <div className="col-span-4">
                <label className="text-[10px] font-bold uppercase text-zinc-400">Nom</label>
                <input required type="text" className={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="col-span-2">
                <label className="text-[10px] font-bold uppercase text-zinc-400">Couleur</label>
                <input required type="text" className={inputStyle} value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} />
            </div>
            <div className="col-span-2">
                <label className="text-[10px] font-bold uppercase text-zinc-400">Prix (FCFA)</label>
                <input required type="number" className={inputStyle} value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            </div>
            <div className="col-span-2">
                <label className="text-[10px] font-bold uppercase text-zinc-400">Stock</label>
                <input required type="number" className={inputStyle} value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div className="col-span-2">
                <label className="text-[10px] font-bold uppercase text-zinc-400">Catégorie</label>
                <select required className={inputStyle} value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}>
                    <option value="">Choisir...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>
            <div className="col-span-6 flex gap-10 bg-zinc-50 p-4 rounded-xl justify-center border">
                <StatusSwitch
                    label="Nouveau"
                    active={form.is_new}
                    onClick={() => setForm({
                        ...form,
                        is_new: !form.is_new, 
                        is_promo: false,      
                        is_popular: false     
                    })}
                    color="bg-orange-500" />
                <StatusSwitch
                    label="Promo"
                    active={form.is_promo}
                    onClick={() => setForm({
                        ...form,
                        is_new: false, 
                        is_promo: !form.is_promo,      
                        is_popular: false     
                    })}
                    color="bg-red-500" />
                <StatusSwitch
                    label="Populaire"
                    active={form.is_popular}
                    onClick={() => setForm({
                        ...form,
                        is_new: false, 
                        is_promo: false,      
                        is_popular: !form.is_popular     
                    })}
                    color="bg-blue-500" />
            </div>
            <div className="col-span-6">
                <textarea placeholder="Description..." className={inputStyle} rows="4" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
            </div>
            <div className="col-span-6 border-2 border-dashed p-6 rounded-xl text-center group hover:border-[#2d3748] transition-all">
                <input type="file" multiple className="hidden" id="addImg" onChange={e => setFiles(e.target.files)} />
                <label htmlFor="addImg" className="cursor-pointer flex flex-col items-center">
                    <ImageIcon className="text-zinc-300 mb-2 group-hover:text-[#2d3748]" size={30} />
                    <span className="text-sm text-zinc-500">{files.length} images sélectionnées</span>
                </label>
            </div>
            <button disabled={loading} type="submit" className={`${btnStyle} col-span-6 justify-center py-4 uppercase text-xs font-bold tracking-widest`}>
                {loading ? <Loader2 className="animate-spin" /> : "Mettre en ligne"}
            </button>
        </form>
    );
};

export default Admin;