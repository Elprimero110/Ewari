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
        name: "1461 Smooth",
        brand: "Dr. Martens",
        category: "Chaussures",
        subcategory: "Ville",
        price: 19500,
        image: "images/chaussures.jpg",
        lifestyle_image: "images/chaussures_life.jpg",
        description: "Chaussure basse à 3 œillets en cuir Smooth robuste. Coutures jaunes emblématiques et semelle à coussin d'air.",
        sizes: ["41", "42", "43", "44"],
        colors: ["Noir"],
        rating: 4.7,
        reviews: 215,
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
