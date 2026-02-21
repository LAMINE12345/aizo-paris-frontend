import { Product, Translations, Language } from './types';

// Use environment variable if available, otherwise fallback to the provided Strapi Cloud URL or localhost
export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "https://ancient-fruit-82360a15fb.strapiapp.com";

// Helper to get full media URL
export const getStrapiMedia = (url: string) => {
  if (url == null) {
    return null;
  }
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
};

export const products: Product[] = [
  {
    id: 1,
    name: "T-SHIRT OVERSIZE NOIR",
    price: 45,
    category: "T-shirts",
    collections: ["T-shirts"],
    gender: "HOMME",
    image: "/images/star/05.jpg",
    isNew: true
  },
  {
    id: 2,
    name: "HOODIE ESSENTIAL BLANC",
    price: 85,
    category: "Hoodies",
    collections: ["Hoodies"],
    gender: "HOMME",
    image: "/images/star/06.jpg"
  },
  {
    id: 3,
    name: "PANTALON CARGO TECH",
    price: 110,
    category: "Pantalons",
    collections: [],
    gender: "HOMME",
    image: "/images/star/07.jpg",
    isNew: true
  },
  {
    id: 4,
    name: "VESTE URBAINE",
    price: 150,
    category: "Vestes",
    collections: ["Vestes"],
    gender: "FEMME",
    image: "/images/star/08.jpg"
  }
];

export const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      home: "ACCUEIL",
      men: "HOMME",
      women: "FEMME",
      kids: "ENFANT",
      shop: "BOUTIQUE",
      about: "À PROPOS",
      cart: "PANIER",
      contact: "CONTACT"
    },
    hero: {
      title: "AIZO PARIS",
      subtitle: "L'ÉLÉGANCE URBAINE REDÉFINIE.",
      cta: "DÉCOUVRIR LA COLLECTION"
    },
    marquee: {
      text: "NOUVELLE COLLECTION — HIVER 2024 — ÉDITION LIMITÉE — "
    },
    featured: {
      title: "NOUVEAUTÉS",
      subtitle: "SÉLECTION DE LA SEMAINE",
      cta: "TOUT VOIR"
    },
    categories: {
      title: "PAR GENRE",
      items: {
        men: "HOMME",
        women: "FEMME",
        kids: "ENFANT"
      },
      cta: "EXPLORER"
    },
    collections: {
      title: "COLLECTIONS",
      items: {
        tshirts: "T-SHIRTS",
        hoodies: "HOODIES",
        shorts: "SHORTS",
        vestes: "VESTES",
        accessoires: "ACCESSOIRES"
      }
    },
    editorial: {
      text: "Le style n'est pas une question de vêtements, mais d'attitude. Dans le chaos du monde moderne, le minimalisme est notre armure.",
      author: "DIRECTEUR ARTISTIQUE",
      cursor: "MANIFESTE"
    },
    about: {
      title: "L'ESPRIT AIZO",
      subtitle: "L'ESSENCE DE LA MARQUE",
      quote: "Le minimalisme n'est pas un manque de quelque chose. C'est simplement la quantité parfaite de tout.",
      p1: "Né dans les rues de Paris, AIZO représente la fusion entre le minimalisme brutaliste et l'élégance intemporelle.",
      p2: "Nous ne créons pas de la mode, nous concevons des uniformes pour le chaos urbain moderne."
    },
    aboutPage: {
      heroTitle: "EST. 2024 PARIS",
      heroSubtitle: "AU-DELÀ DE LA MODE, UNE IDENTITÉ.",
      manifestoTitle: "LE MANIFESTE",
      manifestoText: "AIZO PARIS est né d'une volonté de redéfinir les codes du streetwear. Nous croyons en une mode qui transcende les tendances éphémères pour s'ancrer dans la durabilité et l'authenticité. Chaque pièce est conçue comme une œuvre architecturale, où la forme suit la fonction.",
      values: {
        title: "NOS VALEURS",
        items: [
          { title: "QUALITÉ", desc: "Sans compromis. Nous utilisons les meilleurs matériaux." },
          { title: "DESIGN", desc: "Intemporel et minimaliste." },
          { title: "ÉTHIQUE", desc: "Production responsable et durable." }
        ]
      },
      studio: {
        title: "LE STUDIO",
        text: "Un espace de création au cœur de Paris."
      }
    },
    contactPage: {
      title: "CONTACT",
      subtitle: "NOUS CONTACTER",
      info: {
        addressLabel: "ADRESSE",
        address: ["15 Rue du Faubourg St-Honoré", "75008 Paris"],
        emailLabel: "EMAIL",
        phoneLabel: "TÉLÉPHONE",
        hoursLabel: "HORAIRES",
        hours: ["Lundi - Vendredi: 10h - 19h"]
      },
      form: {
        name: "VOTRE NOM",
        email: "VOTRE EMAIL",
        subject: "SUJET",
        message: "VOTRE MESSAGE",
        submit: "ENVOYER",
        success: "MESSAGE ENVOYÉ AVEC SUCCÈS"
      }
    },
    products: {
      title: "PRODUITS",
      addToCart: "AJOUTER AU PANIER",
      added: "AJOUTÉ",
      filters: {
        all: "TOUT",
        top: "HAUTS",
        hoodie: "HOODIES",
        bottom: "BAS",
        outerwear: "VESTES"
      },
      sort: {
        label: "TRIER PAR",
        newest: "NOUVEAUTÉS",
        priceLow: "PRIX CROISSANT",
        priceHigh: "PRIX DÉCROISSANT"
      },
      count: "PRODUITS"
    },
    productDetail: {
      selectSize: "SÉLECTIONNER UNE TAILLE",
      description: "DESCRIPTION",
      addToCart: "AJOUTER AU PANIER",
      selectSizeError: "VEUILLEZ SÉLECTIONNER UNE TAILLE",
      close: "FERMER",
      sizeGuide: "GUIDE DES TAILLES",
      related: "VOUS AIMEREZ AUSSI"
    },
    sizeGuide: {
      title: "GUIDE DES TAILLES",
      chest: "POITRINE",
      length: "LONGUEUR",
      sleeve: "MANCHE",
      close: "FERMER"
    },
    wishlist: {
      title: "LISTE D'ENVIES",
      empty: "VOTRE LISTE D'ENVIES EST VIDE",
      moveToCart: "AJOUTER AU PANIER",
      remove: "RETIRER"
    },
    search: {
      placeholder: "RECHERCHER...",
      noResults: "AUCUN RÉSULTAT",
      results: "RÉSULTATS",
      close: "FERMER"
    },
    auth: {
      title: "COMPTE",
      login: "CONNEXION",
      register: "INSCRIPTION",
      email: "EMAIL",
      password: "MOT DE PASSE",
      submitLogin: "SE CONNECTER",
      submitRegister: "S'INSCRIRE",
      switchToRegister: "PAS ENCORE DE COMPTE ? S'INSCRIRE",
      switchToLogin: "DÉJÀ UN COMPTE ? SE CONNECTER",
      welcome: "BIENVENUE",
      logout: "DÉCONNEXION"
    },
    faq: {
      title: "FAQ",
      items: [
        { question: "LIVRAISON ?", answer: "Nous livrons dans le monde entier." },
        { question: "RETOURS ?", answer: "Vous avez 30 jours pour retourner vos articles." }
      ]
    },
    contact: {
      title: "CONTACT",
      name: "NOM",
      email: "EMAIL",
      message: "MESSAGE",
      submit: "ENVOYER",
      success: "MERCI POUR VOTRE MESSAGE"
    },
    newsletter: {
      title: "NEWSLETTER",
      subtitle: "INSCRIVEZ-VOUS POUR RECEVOIR NOS ACTUALITÉS",
      placeholder: "VOTRE EMAIL",
      button: "S'INSCRIRE",
      success: "INSCRIPTION RÉUSSIE"
    },
    cookie: {
      text: "NOUS UTILISONS DES COOKIES POUR AMÉLIORER VOTRE EXPÉRIENCE.",
      accept: "ACCEPTER",
      decline: "REFUSER"
    },
    cart: {
      title: "PANIER",
      empty: "VOTRE PANIER EST VIDE",
      total: "TOTAL",
      checkout: "COMMANDER",
      close: "FERMER",
      size: "TAILLE",
      processing: "TRAITEMENT...",
      success: "COMMANDE RÉUSSIE"
    },
    footer: {
      rights: "TOUS DROITS RÉSERVÉS",
      contact: "CONTACTEZ-NOUS"
    },
    lookbook: {
      title: "LOOKBOOK",
      subtitle: "COLLECTION 2024"
    }
  },
  en: {
    nav: {
      home: "HOME",
      men: "MEN",
      women: "WOMEN",
      kids: "KIDS",
      shop: "SHOP",
      about: "ABOUT",
      cart: "CART",
      contact: "CONTACT"
    },
    hero: {
      title: "AIZO PARIS",
      subtitle: "URBAN ELEGANCE REDEFINED.",
      cta: "DISCOVER THE COLLECTION"
    },
    marquee: {
      text: "NEW COLLECTION — WINTER 2024 — LIMITED EDITION — "
    },
    featured: {
      title: "NEW ARRIVALS",
      subtitle: "WEEKLY SELECTION",
      cta: "VIEW ALL"
    },
    categories: {
      title: "BY GENDER",
      items: {
        men: "MEN",
        women: "WOMEN",
        kids: "KIDS"
      },
      cta: "EXPLORE"
    },
    collections: {
      title: "COLLECTIONS",
      items: {
        tshirts: "T-SHIRTS",
        hoodies: "HOODIES",
        shorts: "SHORTS",
        vestes: "JACKETS",
        accessoires: "ACCESSORIES"
      }
    },
    editorial: {
      text: "Style is not about clothes, it's about attitude. In the chaos of the modern world, minimalism is our armor.",
      author: "ART DIRECTOR",
      cursor: "MANIFESTO"
    },
    about: {
      title: "THE AIZO SPIRIT",
      subtitle: "THE ESSENCE OF THE BRAND",
      quote: "Minimalism is not a lack of something. It's simply the perfect amount of everything.",
      p1: "Born in the streets of Paris, AIZO represents the fusion between brutalist minimalism and timeless elegance.",
      p2: "We don't create fashion, we design uniforms for the modern urban chaos."
    },
    aboutPage: {
      heroTitle: "EST. 2024 PARIS",
      heroSubtitle: "BEYOND FASHION, AN IDENTITY.",
      manifestoTitle: "THE MANIFESTO",
      manifestoText: "AIZO PARIS was born from a desire to redefine streetwear codes. We believe in fashion that transcends ephemeral trends to anchor itself in sustainability and authenticity. Each piece is designed as an architectural work, where form follows function.",
      values: {
        title: "OUR VALUES",
        items: [
          { title: "QUALITY", desc: "Uncompromised. We use the best materials." },
          { title: "DESIGN", desc: "Timeless and minimalist." },
          { title: "ETHICS", desc: "Responsible and sustainable production." }
        ]
      },
      studio: {
        title: "THE STUDIO",
        text: "A creative space in the heart of Paris."
      }
    },
    contactPage: {
      title: "CONTACT",
      subtitle: "GET IN TOUCH",
      info: {
        addressLabel: "ADDRESS",
        address: ["15 Rue du Faubourg St-Honoré", "75008 Paris"],
        emailLabel: "EMAIL",
        phoneLabel: "PHONE",
        hoursLabel: "HOURS",
        hours: ["Monday - Friday: 10am - 7pm"]
      },
      form: {
        name: "YOUR NAME",
        email: "YOUR EMAIL",
        subject: "SUBJECT",
        message: "YOUR MESSAGE",
        submit: "SEND",
        success: "MESSAGE SENT SUCCESSFULLY"
      }
    },
    products: {
      title: "PRODUCTS",
      addToCart: "ADD TO CART",
      added: "ADDED",
      filters: {
        all: "ALL",
        top: "TOPS",
        hoodie: "HOODIES",
        bottom: "BOTTOMS",
        outerwear: "OUTERWEAR"
      },
      sort: {
        label: "SORT BY",
        newest: "NEWEST",
        priceLow: "PRICE LOW TO HIGH",
        priceHigh: "PRICE HIGH TO LOW"
      },
      count: "PRODUCTS"
    },
    productDetail: {
      selectSize: "SELECT A SIZE",
      description: "DESCRIPTION",
      addToCart: "ADD TO CART",
      selectSizeError: "PLEASE SELECT A SIZE",
      close: "CLOSE",
      sizeGuide: "SIZE GUIDE",
      related: "YOU MIGHT ALSO LIKE"
    },
    sizeGuide: {
      title: "SIZE GUIDE",
      chest: "CHEST",
      length: "LENGTH",
      sleeve: "SLEEVE",
      close: "CLOSE"
    },
    wishlist: {
      title: "WISHLIST",
      empty: "YOUR WISHLIST IS EMPTY",
      moveToCart: "ADD TO CART",
      remove: "REMOVE"
    },
    search: {
      placeholder: "SEARCH...",
      noResults: "NO RESULTS",
      results: "RESULTS",
      close: "CLOSE"
    },
    auth: {
      title: "ACCOUNT",
      login: "LOGIN",
      register: "REGISTER",
      email: "EMAIL",
      password: "PASSWORD",
      submitLogin: "LOGIN",
      submitRegister: "REGISTER",
      switchToRegister: "NO ACCOUNT? REGISTER",
      switchToLogin: "ALREADY HAVE AN ACCOUNT? LOGIN",
      welcome: "WELCOME",
      logout: "LOGOUT"
    },
    faq: {
      title: "FAQ",
      items: [
        { question: "SHIPPING?", answer: "We ship worldwide." },
        { question: "RETURNS?", answer: "You have 30 days to return your items." }
      ]
    },
    contact: {
      title: "CONTACT",
      name: "NAME",
      email: "EMAIL",
      message: "MESSAGE",
      submit: "SEND",
      success: "THANKS FOR YOUR MESSAGE"
    },
    newsletter: {
      title: "NEWSLETTER",
      subtitle: "SUBSCRIBE TO OUR NEWSLETTER",
      placeholder: "YOUR EMAIL",
      button: "SUBSCRIBE",
      success: "SUBSCRIPTION SUCCESSFUL"
    },
    cookie: {
      text: "WE USE COOKIES TO IMPROVE YOUR EXPERIENCE.",
      accept: "ACCEPT",
      decline: "DECLINE"
    },
    cart: {
      title: "CART",
      empty: "YOUR CART IS EMPTY",
      total: "TOTAL",
      checkout: "CHECKOUT",
      close: "CLOSE",
      size: "SIZE",
      processing: "PROCESSING...",
      success: "ORDER SUCCESSFUL"
    },
    footer: {
      rights: "ALL RIGHTS RESERVED",
      contact: "CONTACT US"
    },
    lookbook: {
      title: "LOOKBOOK",
      subtitle: "COLLECTION 2024"
    }
  }
};
