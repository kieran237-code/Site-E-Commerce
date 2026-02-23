import React from 'react';

const FAQs = () => {
  const faqs = [
    { q: "Quels sont les délais de livraison ?", a: "Nous livrons sous 24h à 48h dans les grandes villes du Cameroun." },
    { q: "Vos sacs sont-ils en cuir véritable ?", a: "Oui, nos modèles Premium sont confectionnés en cuir de haute qualité, sélectionné pour sa durabilité." },
    { q: "Puis-je retourner un article ?", a: "Vous disposez de 48h après réception pour signaler tout défaut de fabrication." }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold text-center text-[#2d3748] mb-12">Questions Fréquentes</h1>
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