import React from 'react';

const About = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#2d3748] mb-6">L'Héritage MurieL</h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              Depuis notre création, MurieL Luxury Beauty s'efforce de redéfinir l'élégance à travers une maroquinerie d'exception. Chaque sac est une pièce unique, conçue pour la femme qui ne fait aucun compromis entre style et fonctionnalité.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nos cuirs sont sélectionnés avec la plus grande attention, garantissant une durabilité et une texture incomparable. Plus qu'un accessoire, nos créations sont le reflet d'un savoir-faire artisanal dédié au luxe.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img src="/tof/sac5.jpg" alt="Artisanat MurieL" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;