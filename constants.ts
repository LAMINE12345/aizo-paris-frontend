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
      manifestoText: "AIZO PARIS est né d'une volonté de redéfinir les codes du streetwear. Nous croyons en une mode qui transcende les tendances éphémères pour s'ancrer dans la durabilité et l'authenticité. Chaque pièce est conçue comme une œuvre architecturale, où la forme suit la fonction.",
      valuesTitle: "NOS VALEURS",
      valuesText: "Qualité sans compromis. Design intemporel. Production éthique. Nous collaborons avec les meilleurs artisans européens pour garantir une excellence à chaque étape de la fabrication.",
      teamTitle: "L'ÉQUIPE",
      teamText: "Un collectif de créatifs, designers et visionnaires unis par une même passion pour l'esthétique urbaine et l'innovation."
    },
    contactPage: {
      title: "CONTACT",
      formTitle: "ENVOYER UN MESSAGE",
      namePlaceholder: "VOTRE NOM",
      emailPlaceholder: "VOTRE EMAIL",
      subjectPlaceholder: "SUJET",
      messagePlaceholder: "VOTRE MESSAGE",
      submitButton: "ENVOYER",
      successMessage: "MESSAGE ENVOYÉ AVEC SUCCÈS",
      errorMessage: "UNE ERREUR EST SURVENUE"
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
      author: "ARTISTIC DIRECTOR"
    },
    about: {
      title: "THE AIZO SPIRIT",
      p1: "Born in the streets of Paris, AIZO represents the fusion between brutalist minimalism and timeless elegance.",
      p2: "We don't create fashion, we design uniforms for modern urban chaos."
    },
    aboutPage: {
      heroTitle: "EST. 2024 PARIS",
      heroSubtitle: "BEYOND FASHION, AN IDENTITY.",
      manifestoTitle: "THE MANIFESTO",
      manifestoText: "AIZO PARIS was born from a desire to redefine streetwear codes. We believe in fashion that transcends ephemeral trends to anchor itself in sustainability and authenticity. Each piece is designed as an architectural work, where form follows function.",
      valuesTitle: "OUR VALUES",
      valuesText: "Uncompromised quality. Timeless design. Ethical production. We collaborate with the best European artisans to ensure excellence at every manufacturing stage.",
      teamTitle: "THE TEAM",
      teamText: "A collective of creatives, designers, and visionaries united by a shared passion for urban aesthetics and innovation."
    },
    contactPage: {
      title: "CONTACT",
      formTitle: "SEND A MESSAGE",
      namePlaceholder: "YOUR NAME",
      emailPlaceholder: "YOUR EMAIL",
      subjectPlaceholder: "SUBJECT",
      messagePlaceholder: "YOUR MESSAGE",
      submitButton: "SEND",
      successMessage: "MESSAGE SENT SUCCESSFULLY",
      errorMessage: "AN ERROR OCCURRED"
    }
  }
};
