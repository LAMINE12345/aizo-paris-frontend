export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  gender: 'HOMME' | 'FEMME' | 'ENFANT';
  collections?: string[];
  colors?: string[];
  sizes?: string[];
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export type Language = 'fr' | 'en';

export interface Translations {
  nav: {
    home: string;
    men: string;
    women: string;
    kids: string;
    shop: string;
    about: string;
    cart: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  marquee: {
    text: string;
  };
  featured: {
    title: string;
    subtitle: string;
    cta: string;
  };
  categories: {
    title: string;
    items: {
      men: string;
      women: string;
      kids: string;
    };
    cta: string;
  };
  collections: {
    title: string;
    items: {
      tshirts: string;
      hoodies: string;
      shorts: string;
      vestes: string;
      accessoires: string;
    };
  };
  editorial: {
    text: string;
    author: string;
  };
  about: {
    title: string;
    p1: string;
    p2: string;
  };
  aboutPage: {
    heroTitle: string;
    heroSubtitle: string;
    manifestoTitle: string;
    manifestoText: string;
    values: {
      title: string;
      items: { title: string; desc: string }[];
    };
    studio: {
      title: string;
      text: string;
    };
  };
  contactPage: {
    title: string;
    subtitle: string;
    info: {
      addressLabel: string;
      address: string[];
      emailLabel: string;
      phoneLabel: string;
      hoursLabel: string;
      hours: string[];
    };
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      submit: string;
      success: string;
    };
  };
  lookbook: {
    title: string;
    subtitle: string;
  };
  products: {
    title: string;
    addToCart: string;
    added: string;
    filters: {
        all: string;
        top: string;
        hoodie: string;
        bottom: string;
        outerwear: string;
      },
      sort: {
      label: string;
      newest: string;
      priceLow: string;
      priceHigh: string;
    };
    count: string;
  };
  productDetail: {
    selectSize: string;
    description: string;
    addToCart: string;
    selectSizeError: string;
    close: string;
    sizeGuide: string;
    related: string;
  };
  sizeGuide: {
    title: string;
    chest: string;
    length: string;
    sleeve: string;
    close: string;
  };
  wishlist: {
    title: string;
    empty: string;
    moveToCart: string;
    remove: string;
  };
  search: {
    placeholder: string;
    noResults: string;
    results: string;
    close: string;
  };
  auth: {
    title: string;
    login: string;
    register: string;
    email: string;
    password: string;
    submitLogin: string;
    submitRegister: string;
    switchToRegister: string;
    switchToLogin: string;
    welcome: string;
    logout: string;
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  contact: {
    title: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    success: string;
  };
  newsletter: {
    title: string;
    subtitle: string;
    placeholder: string;
    button: string;
    success: string;
  };
  cookie: {
    text: string;
    accept: string;
    decline: string;
  };
  cart: {
    title: string;
    empty: string;
    total: string;
    checkout: string;
    close: string;
    size: string;
    processing: string;
    success: string;
  };
  footer: {
    rights: string;
    contact: string;
  }
}