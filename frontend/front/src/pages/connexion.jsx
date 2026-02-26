import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            if (response.data.token) {
          
                localStorage.setItem('adminToken', response.data.token);
           
                navigate('/admin');
            }
        } catch (err) {
          
            const message = err.response?.data?.message || "Une erreur est survenue";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-100">
                
                <div className="bg-[#2d3748] p-10 text-center text-white">
                    <h2 className="text-3xl font-serif italic tracking-widest mb-2">MurieL</h2>
                    <p className="text-[10px] uppercase tracking-[0.4em] opacity-70">Espace Administration</p>
                </div>

                <form onSubmit={handleLogin} className="p-8 space-y-6">
                   
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold text-center border border-red-100 animate-pulse">
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">
                            Adresse Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-[#2d3748]/20 focus:border-[#2d3748] outline-none transition-all"
                                placeholder="admin@muriel-beauty.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">
                            Mot de passe
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-12 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-[#2d3748]/20 focus:border-[#2d3748] outline-none transition-all"
                                placeholder="••••••••"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#2d3748] transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full bg-[#2d3748] text-white py-4 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-slate-700 shadow-lg active:scale-[0.98] transition-all mt-8 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Vérification...' : 'Se connecter'}
                        {!loading && <ArrowRight size={16} />}
                    </button>

                    <p className="text-center text-[10px] text-zinc-400 uppercase tracking-tighter pt-4">
                        Accès réservé au personnel autorisé uniquement
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;