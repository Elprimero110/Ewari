const products = [
    {
        id: "zara-tshirt-01",
        name: "T-shirt Slim Fit Basique /01",
        brand: "Zara",
        category: "Vêtements",
        subcategory: "Hauts",
        price: 3000,
        image: "images/tshirt.jpg",
        lifestyle_image: "images/tshirt_life.jpg",
        description: "Le t-shirt blanc minimaliste de référence. Coupe slim fit, 100% coton peigné pour un confort optimal au quotidien.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blanc"],
        rating: 4.8,
        reviews: 124,
        inStock: true
    },
    {
        id: "nike-af1-white",
        name: "Air Force 1 '07",
        brand: "Nike",
        category: "Chaussures",
        subcategory: "Sneakers",
        price: 23500,
        image: "images/sneakers.jpg",
        lifestyle_image: "images/sneakers_life.jpg",
        description: "La sneaker urbaine par excellence. Cuir souple, amorti Nike Air classique et silhouette intemporelle.",
        sizes: ["40", "41", "42", "43", "44"],
        colors: ["Blanc"],
        rating: 4.9,
        reviews: 842,
        inStock: true
    },
    {
        id: "zara-pull-gris",
        name: "Pull Regular Fit en Maille Perlée",
        brand: "Zara",
        category: "Vêtements",
        subcategory: "Hauts",
        price: 8500,
        image: "images/pull.jpg",
        lifestyle_image: "images/pull_life.jpg",
        description: "Pull texturé en maille perlée. Coupe regular confortable, idéal pour la mi-saison et les soirées fraîches.",
        sizes: ["M", "L", "XL"],
        colors: ["Gris"],
        rating: 4.6,
        reviews: 89,
        inStock: true
    },
    {
        id: "drmartens-1461-noir",
        name: "Dr. Martens 1461 Smooth - Noir",
        brand: "Dr. Martens",
        category: "Chaussures",
        subcategory: "Ville",
        price: 19500,
        image: "images/drmertens1.png",
        lifestyle_image: "images/chaussures_life.jpg",
        gallery: ["images/drmertens1.png", "images/drmertens2.png", "images/drmertens3.png", "images/chaussures.jpg", "images/chaussures_life.jpg"],
        badge: "Produit Star",
        description: "Portez une légende. La 1461 n'est pas une simple chaussure — c'est une déclaration. Son cuir Smooth noir, qui gagne en caractère avec le temps, s'adapte aussi bien à un jean décontracté qu'à une tenue de soirée. Ses coutures jaunes emblématiques et sa semelle AirWair à coussin d'air vous accompagnent du matin au soir sans jamais vous fatiguer.",
        sizes: ["40", "41", "42", "43", "44", "45"],
        colors: ["Noir"],
        rating: 4.9,
        reviews: 347,
        isStar: true,
        inStock: true
    },
    {
        id: "levis-501-bleu",
        name: "Jean 501® Original",
        brand: "Levi's",
        category: "Vêtements",
        subcategory: "Bas",
        price: 15000,
        image: "images/jean.jpg",
        lifestyle_image: "images/jean_life.jpg",
        description: "La légende du denim. Coupe droite iconique, braguette boutonnée et toile robuste. Un indispensable du vestiaire.",
        sizes: ["30", "32", "34", "36"],
        colors: ["Bleu Brut"],
        rating: 4.8,
        reviews: 430,
        inStock: true
    }
];

function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
}
