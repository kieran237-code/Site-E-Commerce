import React, { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { translateText } from '../utils/translate';
const ProductDetails = () => {
  const { slug } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
   const [translatedDescription, setTranslatedDescription] = useState("");
  const { t , i18n } = useTranslation();

  const WHATSAPP_NUMBER = "237697284828"; 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${slug}`);
        setProduct(res.data);
        if (res.data.Images && res.data.Images.length > 0) {
          setMainImage(res.data.Images[0].url);
        }
         // Traduire la description automatiquement selon la langue active 
         if (res.data.description) 
          {
                const translated = await translateText(res.data.description, i18n.language.toUpperCase());
                setTranslatedDescription(translated);
          }

      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug, i18n.language]);

  const handleOrder = () => {
    if (!product) return;

    const priceFormatted = Number(product.price).toLocaleString();
    const message = 
      `*MURIEL LUXURY BEAUTY*%0A` +
      `--------------------------%0A%0A` +
      `${t("whatsapp_intro")}%0A%0A` +
      `*${t("details")} :*%0A` +
      `• *${t("name")}:* ${product.name}%0A` +
      `• *${t("price")}:* ${priceFormatted} FCFA%0A` +
      `• *${t("color")}:* ${product.color || 'N/A'}%0A%0A` +
      `*${t("image")}:* ${mainImage}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handlePrev = () => {
    const currentIndex = product.Images.findIndex(img => img.url === mainImage);
    const prevIndex = (currentIndex - 1 + product.Images.length) % product.Images.length;
    setMainImage(product.Images[prevIndex].url);
  };

  const handleNext = () => {
    const currentIndex = product.Images.findIndex(img => img.url === mainImage);
    const nextIndex = (currentIndex + 1) % product.Images.length;
    setMainImage(product.Images[nextIndex].url);
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-zinc-300" size={48} />
      <p className="text-zinc-400 animate-pulse">{t("loading")}</p>
    </div>
  );

  if (!product) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold">{t("not_found")}</h2>
      <Link to="/" className="text-blue-600 hover:underline">{t("back")}</Link>
    </div>
  );

  return (
    <div className='container mx-auto px-4 py-8 animate-in fade-in duration-500'>
      <Link to="/" className='mb-8 inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium'>
        <ArrowLeft size={20} />
        {t("back_to_shop")}
      </Link>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
        {/* SECTION IMAGES */}
                {/* SECTION IMAGES */}
        <div className='flex flex-col gap-6'>
          <div className='relative group shadow-2xl rounded-3xl bg-white overflow-hidden border border-zinc-100 aspect-[4/5]'>
            <img 
                src={mainImage || 'https://via.placeholder.com/800x1000'} 
                alt={product.name} 
                className="w-full h-full object-contain bg-zinc-50 transition-all duration-500"
            />

            {product.Images?.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-[#2d3748] hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-[#2d3748] hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                >
                  <ChevronRight size={24} />
                </button>

                <div className="absolute bottom-4 right-4 flex gap-2 md:hidden">
                    <button onClick={handlePrev} className="bg-white p-2 rounded-full shadow-md active:bg-zinc-200"><ChevronLeft size={20}/></button>
                    <button onClick={handleNext} className="bg-white p-2 rounded-full shadow-md active:bg-zinc-200"><ChevronRight size={20}/></button>
                </div>
              </>
            )}
          </div>
          
          <div className='flex gap-4 overflow-x-auto pb-2 scrollbar-hide'>
            {product.Images?.map((img) => (
              <button 
                key={img.id} 
                onClick={() => setMainImage(img.url)}
                className={`shrink-0 w-24 h-28 rounded-xl border-2 transition-all overflow-hidden ${
                    mainImage === img.url ? 'border-[#2d3748] scale-95 shadow-inner' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url} className="w-full h-full object-cover" alt="miniature" />
              </button>
            ))}
          </div>
        </div>

        {/* SECTION INFOS */}
        <div className="py-4 space-y-6">
          <div className="flex flex-wrap gap-2">
            {product.is_new && <span className="bg-orange-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase">{t("new")}</span>}
            {product.is_promo && <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase">{t("promo")}</span>}
            {product.is_popular && <span className="bg-blue-400 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase">{t("popular")}</span>}
          </div>

          <div className="border-b border-zinc-100 pb-6">
            <h1 className='text-5xl font-bold mb-2 text-[#2d3748] font-serif italic'>{product.name}</h1>
            <p className="text-sm text-zinc-400 font-bold uppercase tracking-[0.2em]">{product.color}</p>
          </div>
          
          <div className='flex items-center gap-4'>
            <span className='text-4xl font-black text-[#2d3748]'>
              {Number(product.price).toLocaleString()} <span className='text-xl'>FCFA</span>
            </span>
          </div>

          <div className="bg-zinc-50 p-6 rounded-2xl">
              <h3 className="text-[10px] font-black uppercase text-zinc-400 mb-2">{t("description_title")}</h3>
              <p className='text-gray-600 leading-relaxed text-lg italic'>
                   {translatedDescription || product.description || t("no_description")}
              </p>
          </div>
          
          <div className='grid grid-cols-2 gap-6'>
            <div className="p-4 border border-zinc-100 rounded-2xl">
              <h3 className='font-black text-[10px] text-gray-400 uppercase mb-1'>{t("category")}</h3>
              <span className='font-bold text-[#2d3748]'>{product.Category?.name}</span>
            </div>
          </div>

          {/* BOUTON COMMANDE */}
          <button 
            onClick={handleOrder}
            disabled={product.stock <= 0}
            className={`w-full bg-[#2d3748] text-white px-10 py-5 rounded-2xl flex items-center justify-center gap-4 hover:bg-slate-700 transition-all shadow-2xl active:scale-95 disabled:bg-zinc-300 disabled:cursor-not-allowed`}
          >
            <FaWhatsapp size={24}/>
            <span className="font-black uppercase tracking-widest text-sm">{t("order_button")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
