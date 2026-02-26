const slugify = require('../../utils/slugify');

describe('Unit Test : Slugify Utility', () => {
    test('devrait transformer une chaine en minuscule et sans accents', () => {
        const input = "Sac à Main Luxe Étoilé";
        
        const expected = "sacamainluxeetoile"; 
        expect(slugify(input)).toBe(expected);
    });

    test('devrait supprimer les caracteres speciaux et les espaces', () => {
        expect(slugify("Produit #123 !!!")).toBe("produit123");
    });
});