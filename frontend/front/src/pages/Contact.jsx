import React, { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { FaFacebookF, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: ''
  });

  const numeroWhatsApp = "237697284828"; 
  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const { nom, email, message } = formData;

    const texte = `*${t("new_message")}*%0A%0A` +
                  `*${t("name2")}:* ${nom}%0A` +
                  `*${t("email")}:* ${email}%0A` +
                  `*${t("message2")}:* ${message}`;

    window.open(`https://wa.me/${numeroWhatsApp}?text=${texte}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#2d3748] mb-12">
        {t("title")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Infos */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#2d3748] p-3 rounded-md text-white"><Phone size={24} /></div>
            <div>
              <h3 className="font-bold text-lg">{t("phone")}</h3>
              <p className="text-gray-600">+237 697 284 828</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-[#2d3748] p-3 rounded-md text-white"><Mail size={24} /></div>
            <div>
              <h3 className="font-bold text-lg">{t("email")}</h3>
              <p className="text-gray-600">contact@muriel-luxury.com</p>
            </div>
          </div>
          <div className="pt-8">
            <h3 className="font-bold mb-4">{t("follow_us")}</h3>
            <div className="flex gap-4">
              <a href="#" className='p-2 bg-slate-700 rounded-full hover:bg-blue-600 transition-colors text-white'><FaFacebookF /></a>
              <a href={`https://wa.me/${numeroWhatsApp}`} target="_blank" rel="noreferrer" className='p-2 bg-slate-700 rounded-full hover:bg-green-600 transition-colors text-white'><FaWhatsapp /></a>
              <a href="#" className='p-2 bg-slate-700 rounded-full hover:bg-black transition-colors text-white'><FaTiktok /></a>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSendWhatsApp} className="bg-zinc-50 p-8 rounded-xl shadow-sm border border-zinc-100">
          <div className="space-y-4">
            <input 
              type="text" 
              name="nom"
              required
              value={formData.nom}
              onChange={handleChange}
              placeholder={t("name")} 
              className="w-full p-3 rounded-md border border-zinc-200 focus:ring-1 focus:ring-[#2d3748] outline-none" 
            />
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={t("email2")} 
              className="w-full p-3 rounded-md border border-zinc-200 focus:ring-1 focus:ring-[#2d3748] outline-none" 
            />
            <textarea 
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder={t("message")} 
              rows="4" 
              className="w-full p-3 rounded-md border border-zinc-200 focus:ring-1 focus:ring-[#2d3748] outline-none"
            ></textarea>
            <button 
              type="submit"
              className="w-full bg-[#2d3748] text-white py-3 rounded-md font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <FaWhatsapp size={20} />
              {t("send_whatsapp")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
