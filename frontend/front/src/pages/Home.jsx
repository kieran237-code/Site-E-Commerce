import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductGrid from '../components/ProductGrid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const sliderImages = [
    "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=1600"
  ];

  const API_URL = `${import.meta.env.VITE_API_URL}/api`;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/categories`);
        setCategories([{ id: 'all', name: t("all") }, ...response.data]);
      } catch (error) {
        console.error("Erreur catégories :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [t]);

  return (
    <div className="min-h-screen bg-white">
      {/* Slider */}
      <div className='relative h-[400px] md:h-[500px] w-full overflow-hidden mb-12'>
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect={'fade'} 
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full"
        >
          {sliderImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-[4000ms] scale-110"
                style={{ backgroundImage: `url(${img})` }}
              >
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif italic mb-4 drop-shadow-lg">
            {t("collections")}
          </h1>
          <p className="text-sm md:text-base uppercase tracking-[0.4em] font-light opacity-90 drop-shadow-md">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap gap-3 mb-12 justify-center'>
          {loading ? (
            <div className="flex gap-3">
              {[1,2,3,4].map(i => <div key={i} className="h-10 w-24 bg-zinc-100 animate-pulse rounded-full"></div>)}
            </div>
          ) : (
            categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`py-2.5 px-8 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  selectedCategory === cat.name 
                  ? 'bg-[#2d3748] text-white border-[#2d3748] shadow-xl scale-105' 
                  : 'bg-white text-zinc-500 border-zinc-200 hover:border-[#2d3748] hover:text-[#2d3748]'
                }`}
              >
                {cat.name}
              </button>
            ))
          )}
        </div>

        {/* Product Grid */}
        <ProductGrid selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Home;
