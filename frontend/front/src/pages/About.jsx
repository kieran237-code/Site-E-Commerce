import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#2d3748] mb-6">
              {t("title")}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t("paragraph1")}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t("paragraph2")}
            </p>
          </div>
          
            <p className='text-gray-600 leading-relaxed mb-3'>{t("image_alt")}</p>
         
        </div>
      </div>
    </div>
  );
};

export default About;
