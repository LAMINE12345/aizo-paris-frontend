import { Product, Translations, Language } from './types';

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
      author: "DIRECTEUR ARTISTIQUE"
    },
    about: {
      title: "L'ESPRIT AIZO",
      p1: "Né dans les rues de Paris, AIZO représente la fusion entre le minimalisme brutaliste et l'élégance intemporelle.",
      p2: "Nous ne créons pas de la mode, nous concevons des uniformes pour le chaos urbain moderne."
    },
    aboutPage: {
      heroTitle: "EST. 2024 PARIS",
      heroSubtitle: "AU-DELÀ DE LA MODE, UNE IDENTITÉ.",
      manifestoTitle: "LE MANIFESTE",
      manifestoText: "Dans un monde saturé de bruit et de couleurs, AIZO PARIS a choisi le silence du noir et la pureté du blanc. Nous ne suivons pas les tendances ; nous construisons une architecture vestimentaire pour ceux qui façonnent la ville. Chaque pièce est une déclaration d'indépendance.",
      values: {
        title: "NOS PILIERS",
        items: [
          { title: "MINIMALISME RADICAL", desc: "Supprimer le superflu pour ne garder que l'essentiel. La complexité réside dans la simplicité." },
          { title: "QUALITÉ SANS COMPROMIS", desc: "Des textiles lourds, durables, sélectionnés pour traverser les saisons et les époques." },
          { title: "ESPRIT URBAIN", desc: "Inspiré par le béton, l'acier et le rythme de la métropole moderne." }
        ]
      },
      studio: {
        title: "LE STUDIO",
        text: "Situé au cœur de Paris, notre studio de création est un laboratoire d'expérimentation où le design graphique rencontre le textile. Chaque collection commence par une étude des formes et des volumes."
      }
    },
    contactPage: {
      title: "CONTACT",
      subtitle: "ENTRONS EN CONTACT",
      info: {
        addressLabel: "ADRESSE",
        address: ["15 Rue du Faubourg Saint-Honoré", "75008 Paris, France"],
        emailLabel: "EMAIL",
        phoneLabel: "TÉLÉPHONE",
        hoursLabel: "HORAIRES DU STUDIO",
        hours: ["Lundi - Vendredi: 10h - 19h", "Samedi: 11h - 18h", "Dimanche: Fermé"]
      },
      form: {
        name: "VOTRE NOM",
        email: "VOTRE EMAIL",
        subject: "SUJET",
        message: "VOTRE MESSAGE",
        submit: "ENVOYER LE MESSAGE",
        success: "MERCI. NOUS VOUS RÉPONDRONS SOUS PEU."
      }
    },
    lookbook: {
      title: "CAMPAGNE",
      subtitle: "AUTOMNE / HIVER 2024"
    },
    products: {
      title: "DERNIERS DROPS",
      addToCart: "AJOUTER",
      added: "AJOUTÉ",
      filters: {
        all: "TOUT",
        top: "HAUTS",
        hoodie: "SWEATS",
        bottom: "BAS",
        outerwear: "VESTES",
        accessory: "ACCESSOIRES"
      },
      sort: {
        label: "TRIER",
        newest: "NOUVEAUTÉS",
        priceLow: "PRIX CROISSANT",
        priceHigh: "PRIX DÉCROISSANT"
      },
      count: "ARTICLES"
    },
    productDetail: {
      selectSize: "CHOISIR UNE TAILLE",
      description: "Fabriqué à partir de coton premium à haut grammage. Coupe oversize emblématique de la marque. Finitions main à Paris.",
      addToCart: "AJOUTER AU PANIER",
      selectSizeError: "VEUILLEZ SÉLECTIONNER UNE TAILLE",
      close: "FERMER",
      sizeGuide: "GUIDE DES TAILLES",
      related: "VOUS AIMEREZ AUSSI"
    },
    sizeGuide: {
      title: "GUIDE DES TAILLES (CM)",
      chest: "POITRINE",
      length: "LONGUEUR",
      sleeve: "MANCHES",
      close: "FERMER"
    },
    wishlist: {
      title: "FAVORIS",
      empty: "AUCUN ARTICLE EN FAVORIS",
      moveToCart: "AJOUTER AU PANIER",
      remove: "RETIRER"
    },
    search: {
      placeholder: "RECHERCHER UN PRODUIT...",
      noResults: "AUCUN RÉSULTAT TROUVÉ.",
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
      submitRegister: "CRÉER UN COMPTE",
      switchToRegister: "PAS DE COMPTE ? S'INSCRIRE",
      switchToLogin: "DÉJÀ UN COMPTE ? SE CONNECTER",
      welcome: "BIENVENUE",
      logout: "SE DÉCONNECTER"
    },
    faq: {
      title: "QUESTIONS FRÉQUENTES",
      items: [
        {
          question: "QUELS SONT LES DÉLAIS DE LIVRAISON ?",
          answer: "Les commandes sont expédiées sous 24h. La livraison en France prend 2-3 jours ouvrés, et 3-7 jours pour l'international."
        },
        {
          question: "PUIS-JE RETOURNER UN ARTICLE ?",
          answer: "Oui, vous disposez de 14 jours après réception pour effectuer un retour. Les articles doivent être neufs et étiquetés."
        },
        {
          question: "COMMENT TAILLENT VOS VÊTEMENTS ?",
          answer: "Nos collections ont une coupe 'Oversize'. Prenez votre taille habituelle pour l'effet désiré, ou une taille en dessous pour un fit plus ajusté."
        }
      ]
    },
    contact: {
      title: "CONTACT",
      name: "NOM",
      email: "EMAIL",
      message: "MESSAGE",
      submit: "ENVOYER",
      success: "MESSAGE ENVOYÉ AVEC SUCCÈS"
    },
    newsletter: {
      title: "JOIN THE CLUB",
      subtitle: "BE THE FIRST TO KNOW ABOUT UPCOMING DROPS.",
      placeholder: "YOUR EMAIL",
      button: "SUBSCRIBE",
      success: "WELCOME TO THE CLUB"
    },
    cookie: {
      text: "WE USE COOKIES TO IMPROVE YOUR EXPERIENCE.",
      accept: "ACCEPT",
      decline: "DECLINE"
    },
    cart: {
      title: "VOTRE PANIER",
      empty: "Le panier est vide.",
      total: "TOTAL",
      checkout: "PAIEMENT",
      close: "FERMER",
      size: "TAILLE",
      processing: "TRAITEMENT EN COURS...",
      success: "COMMANDE VALIDÉE"
    },
    footer: {
      rights: "TOUS DROITS RÉSERVÉS.",
      contact: "CONTACT"
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
      cta: "DISCOVER COLLECTION"
    },
    marquee: {
      text: "NEW COLLECTION — WINTER 2024 — LIMITED EDITION — "
    },
    featured: {
      title: "NEW ARRIVALS",
      subtitle: "THIS WEEK'S SELECTION",
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
        tops: "TOPS",
        bottoms: "BOTTOMS",
        accessories: "ACCESSORIES"
      }
    },
    editorial: {
      text: "Style is not about clothes, it's about attitude. In the chaos of the modern world, minimalism is our armor.",
      author: "ARTISTIC DIRECTOR"
    },
    about: {
      title: "THE AIZO SPIRIT",
      p1: "Born in the streets of Paris, AIZO represents the fusion between brutalist minimalism and timeless elegance.",
      p2: "We don't create fashion, we design uniforms for the modern urban chaos."
    },
    aboutPage: {
      heroTitle: "EST. 2024 PARIS",
      heroSubtitle: "BEYOND FASHION, AN IDENTITY.",
      manifestoTitle: "THE MANIFESTO",
      manifestoText: "In a world saturated with noise and color, AIZO PARIS chose the silence of black and the purity of white. We don't follow trends; we build sartorial architecture for those who shape the city. Each piece is a declaration of independence.",
      values: {
        title: "OUR PILLARS",
        items: [
          { title: "RADICAL MINIMALISM", desc: "Removing the superfluous to keep only the essential. Complexity lies in simplicity." },
          { title: "UNCOMPROMISING QUALITY", desc: "Heavy, durable textiles selected to withstand seasons and eras." },
          { title: "URBAN SPIRIT", desc: "Inspired by concrete, steel, and the rhythm of the modern metropolis." }
        ]
      },
      studio: {
        title: "THE STUDIO",
        text: "Located in the heart of Paris, our creative studio is a laboratory of experimentation where graphic design meets textiles. Every collection starts with a study of shapes and volumes."
      }
    },
    contactPage: {
      title: "CONTACT",
      subtitle: "GET IN TOUCH",
      info: {
        addressLabel: "ADDRESS",
        address: ["15 Rue du Faubourg Saint-Honoré", "75008 Paris, France"],
        emailLabel: "EMAIL",
        phoneLabel: "PHONE",
        hoursLabel: "STUDIO HOURS",
        hours: ["Monday - Friday: 10am - 7pm", "Saturday: 11am - 6pm", "Sunday: Closed"]
      },
      form: {
        name: "YOUR NAME",
        email: "YOUR EMAIL",
        subject: "SUBJECT",
        message: "YOUR MESSAGE",
        submit: "SEND MESSAGE",
        success: "THANK YOU. WE WILL RESPOND SHORTLY."
      }
    },
    lookbook: {
      title: "CAMPAIGN",
      subtitle: "FALL / WINTER 2024"
    },
    products: {
      title: "LATEST DROPS",
      addToCart: "ADD TO CART",
      added: "ADDED",
      filters: {
        all: "ALL",
        top: "TOPS",
        hoodie: "HOODIES",
        bottom: "BOTTOMS",
        outerwear: "OUTERWEAR",
        accessory: "ACCESSORIES"
      },
      sort: {
        label: "SORT",
        newest: "NEWEST",
        priceLow: "PRICE: LOW TO HIGH",
        priceHigh: "PRICE: HIGH TO LOW"
      },
      count: "ITEMS"
    },
    productDetail: {
      selectSize: "SELECT SIZE",
      description: "Crafted from premium heavyweight cotton. Signature oversized fit. Hand-finished in Paris.",
      addToCart: "ADD TO CART",
      selectSizeError: "PLEASE SELECT A SIZE",
      close: "CLOSE",
      sizeGuide: "SIZE GUIDE",
      related: "YOU MIGHT ALSO LIKE"
    },
    sizeGuide: {
      title: "SIZE GUIDE (CM)",
      chest: "CHEST",
      length: "LENGTH",
      sleeve: "SLEEVE",
      close: "CLOSE"
    },
    wishlist: {
      title: "WISHLIST",
      empty: "NO ITEMS IN WISHLIST",
      moveToCart: "ADD TO CART",
      remove: "REMOVE"
    },
    search: {
      placeholder: "SEARCH FOR PRODUCTS...",
      noResults: "NO RESULTS FOUND.",
      results: "RESULTS",
      close: "CLOSE"
    },
    auth: {
      title: "ACCOUNT",
      login: "LOGIN",
      register: "REGISTER",
      email: "EMAIL",
      password: "MOT DE PASSE",
      submitLogin: "SIGN IN",
      submitRegister: "CREATE ACCOUNT",
      switchToRegister: "NO ACCOUNT? REGISTER",
      switchToLogin: "ALREADY HAVE AN ACCOUNT? LOGIN",
      welcome: "WELCOME",
      logout: "LOGOUT"
    },
    faq: {
      title: "FREQUENTLY ASKED QUESTIONS",
      items: [
        {
          question: "WHAT ARE THE SHIPPING TIMES?",
          answer: "Orders are shipped within 24h. Delivery in France takes 2-3 business days, and 3-7 days internationally."
        },
        {
          question: "CAN I RETURN AN ITEM?",
          answer: "Yes, you have 14 days after receipt to make a return. Items must be new and tagged."
        },
        {
          question: "HOW DO YOUR CLOTHES FIT?",
          answer: "Our collections feature an 'Oversize' cut. Take your usual size for the desired effect, or a size down for a more fitted look."
        }
      ]
    },
    contact: {
      title: "CONTACT",
      name: "NAME",
      email: "EMAIL",
      message: "MESSAGE",
      submit: "SEND",
      success: "MESSAGE SENT SUCCESSFULLY"
    },
    newsletter: {
      title: "JOIN THE CLUB",
      subtitle: "BE THE FIRST TO KNOW ABOUT UPCOMING DROPS.",
      placeholder: "YOUR EMAIL",
      button: "SUBSCRIBE",
      success: "WELCOME TO THE CLUB"
    },
    cookie: {
      text: "WE USE COOKIES TO IMPROVE YOUR EXPERIENCE.",
      accept: "ACCEPT",
      decline: "DECLINE"
    },
    cart: {
      title: "VOTRE PANIER",
      empty: "Le panier est vide.",
      total: "TOTAL",
      checkout: "PAIEMENT",
      close: "FERMER",
      size: "TAILLE",
      processing: "TRAITEMENT EN COURS...",
      success: "COMMANDE VALIDÉE"
    },
    footer: {
      rights: "TOUS DROITS RÉSERVÉS.",
      contact: "CONTACT"
    }
  }
};