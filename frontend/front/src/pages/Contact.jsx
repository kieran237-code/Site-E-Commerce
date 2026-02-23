import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF, FaWhatsapp, FaTiktok } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#2d3748] mb-12">Contactez-nous</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Infos de contact */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#2d3748] p-3 rounded-md text-white"><Phone size={24} /></div>
            <div>
              <h3 className="font-bold text-lg">Téléphone</h3>
              <p className="text-gray-600">+237 6XX XXX XXX</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-[#2d3748] p-3 rounded-md text-white"><Mail size={24} /></div>
            <div>
              <h3 className="font-bold text-lg">Email</h3>
              <p className="text-gray-600">contact@muriel-luxury.com</p>
            </div>
          </div>
          <div className="pt-8">
            <h3 className="font-bold mb-4">Suivez-nous</h3>
            <div className="flex gap-4">
              <FaFacebookF size={35} className="bg-[#2d3748] text-white p-2 rounded-md hover:bg-slate-700 transition-all cursor-pointer" />
              <FaWhatsapp size={35} className="bg-[#2d3748] text-white p-2 rounded-md hover:bg-slate-700 transition-all cursor-pointer" />
              <FaTiktok size={35} className="bg-[#2d3748] text-white p-2 rounded-md hover:bg-slate-700 transition-all cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <form className="bg-zinc-50 p-8 rounded-xl shadow-sm border border-zinc-100">
          <div className="space-y-4">
            <input type="text" placeholder="Votre nom" className="w-full p-3 rounded-md border border-zinc-200 focus:ring-1 focus:ring-[#2d3748] outline-none" />
            <input type="email" placeholder="Email" className="w-full p-3 rounded-md border border-zinc-200 focus:ring-1 focus:ring-[#2d3748] outline-none" />
            <textarea placeholder="Votre message" rows="4" className="w-full p-3 rounded-md border border-zinc-200 focus:ring-1 focus:ring-[#2d3748] outline-none"></textarea>
            <button className="w-full bg-[#2d3748] text-white py-3 rounded-md font-bold hover:bg-slate-700 transition-all">Envoyer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;