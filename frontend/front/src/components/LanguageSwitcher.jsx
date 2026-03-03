import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex gap-2">
      <button 
        onClick={() => i18n.changeLanguage('fr')} 
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        FR
      </button>
      <button 
        onClick={() => i18n.changeLanguage('en')} 
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
