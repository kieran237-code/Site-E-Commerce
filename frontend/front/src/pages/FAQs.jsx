import React from 'react';
import { useTranslation } from 'react-i18next';

const FAQs = () => {
  const { t } = useTranslation();

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold text-center text-[#2d3748] mb-12">
        {t("faq_title")}
      </h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-zinc-200 pb-4">
            <h3 className="text-xl font-semibold text-[#2d3748] mb-2">{faq.q}</h3>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
