import { HairService } from "./types";

export const HAIR_SERVICES: HairService[] = [
  // Coupe & Coiffage
  {
    id: "femme-shamp-coupe",
    name: "Forfait Coupe, Shampoing & Brushing",
    category: "coupe",
    description: "Shampoing massant doux, coupe sur mesure adaptée à votre morphologie et brushing élégant.",
    basePrice: 55,
    duration: 60,
    popular: true
  },
  {
    id: "femme-brushing",
    name: "Brushing Signature & Coiffage",
    category: "coupe",
    description: "Shampoing massant et séchage structuré (lissé miroir, wavy souple ou volume glamour).",
    basePrice: 35,
    duration: 45
  },
  {
    id: "homme-coupe",
    name: "Forfait Homme Coupe & Coiffage",
    category: "coupe",
    description: "Coupe classique ou dégradé américain, shampoing et coiffage texturé aux cires naturelles.",
    basePrice: 28,
    duration: 35
  },
  {
    id: "enfant-coupe",
    name: "Coupe Enfant (-12 ans)",
    category: "coupe",
    description: "Un moment de douceur à domicile pour vos enfants. Coupe rapide et ludique adaptée.",
    basePrice: 18,
    duration: 25
  },

  // Technique & Couleur
  {
    id: "couleur-racines",
    name: "Coloration Racines (Couverture cheveux blancs)",
    category: "couleur",
    description: "Application minutieuse de couleur professionnelle sur les repousses, sans ammoniaque.",
    basePrice: 48,
    duration: 75
  },
  {
    id: "balayage-miel",
    name: "Balayage Nuancé Lumière (Miel ou Polaire)",
    category: "couleur",
    description: "Éclaircissement fondu sur mesure pour apporter du relief et de la luminosité style retour de vacances.",
    basePrice: 95,
    duration: 120,
    popular: true
  },
  {
    id: "ombre-hair",
    name: "Ombré Hair Premium & Patine",
    category: "couleur",
    description: "Dégradé de couleur naturel et fondu des racines sombres aux pointes claires, suivi d'une patine de finition.",
    basePrice: 135,
    duration: 150
  },

  // Soins Profonds
  {
    id: "soin-botox",
    name: "Soin Profond Capillaire 'Thermique Botox'",
    category: "soin",
    description: "Cure de choc réparatrice à base d'acide hyaluronique et de kératine pour réhydrater en profondeur et éliminer les frisottis.",
    basePrice: 75,
    duration: 90,
    popular: true
  },
  {
    id: "soin-detox",
    name: "Soin Détoxifiant Argile & Massage Crânien",
    category: "soin",
    description: "Soin purifiant du cuir chevelu aux huiles essentielles et argiles, suivi d'un massage crânien relaxant de 15 min.",
    basePrice: 45,
    duration: 40
  },

  // Événements & Mariage
  {
    id: "chignon-evenement",
    name: "Attache ou Chignon d'Exception",
    category: "evenement",
    description: "Coiffure événementielle de soirée, gala ou soirée cocktail (chignon flou, tresse bohème).",
    basePrice: 65,
    duration: 60
  },
  {
    id: "mariage-forfait",
    name: "Forfait Mariée 'Amour Immortel'",
    category: "evenement",
    description: "Comprend un entretien préparatoire, 1 séance d'essai complète à domicile et la coiffure sublime le Jour J.",
    basePrice: 190,
    duration: 180,
    popular: true
  }
];

export const REVIEWS = [
  {
    name: "Morgane Deland",
    city: "Montpellier (34000)",
    date: "Il y a 3 jours",
    rating: 5,
    comment: "Quel bonheur de se faire coiffer chez soi par Bettyna ! Elle est d'un professionnalisme incroyable, ponctuelle et de très bon conseil. Mon balayage miel est magnifique, d'un naturel fou !",
    services: "Forfait Coupe & Balayage"
  },
  {
    name: "Sophie Valon",
    city: "Saint-Jean-de-Védas (34430)",
    date: "Il y a 1 semaine",
    rating: 5,
    comment: "Bettyna s'est occupée de mon chignon de mariée ainsi que de la coiffure de mes demoiselles d'honneur. Tout s'est déroulé dans le calme et la complicité à la maison. Un travail d'orfèvre qui a tenu toute la nuit ! Merci !",
    services: "Forfait Mariée Premium"
  },
  {
    name: "Guillaume Pelletier",
    city: "Lattes (34970)",
    date: "Il y a 2 semaines",
    rating: 5,
    comment: "Coiffure à domicile super pratique pour ma maman âgée et moi. Bettyna est attentionnée, douce et très douée pour les coupes hommes comme femmes. Je recommande vivement !",
    services: "Coupe Homme & Coupe Femme"
  },
  {
    name: "Camille Durand",
    city: "Pérols (34470)",
    rating: 5,
    date: "Il y a 1 mois",
    comment: "Le soin botox a complètement ressuscité mes cheveux décolorés. Ils sont brillants, doux et incroyablement faciles à coiffer. Bettyna donne des astuces en or !",
    services: "Soin Thermique Botox"
  }
];

export const HOME_HAIRDRESSER_BENEFITS = [
  {
    title: "Confort Absolu & Gain de Temps",
    description: "Fini la cohue des salons, la recherche d'une place de parking ou l'attente interminable. Bettyna vient à vous avec tout son équipement professionnel."
  },
  {
    title: "Une Coiffeuse 100% à Votre Écoute",
    description: "Aucune distraction ou autre client en parallèle. Une attention totalement centrée sur vous pour un diagnostic millimétré et un échange chaleureux."
  },
  {
    title: "Propreté & Hygiène Rigoureuses",
    description: "Installation propre en 3 minutes (bâche de protection pour sol, serviettes à usage unique biodégradables). Bettyna nettoie méticuleusement après sa prestation : aucun cheveu n'est laissé derrière."
  },
  {
    title: "Horaires Flexibles Adaptés",
    description: "Prestations disponibles sur des créneaux étendus, idéal pour les parents actifs, le télétravail ou les préparatifs d'événements matinaux."
  }
];

export const TRAVEL_FEES = [
  { zone: "Zone Ultra-Proximité (Montpellier, Lattes)", distance: "0 - 10 km", price: 0, desc: "Frais de déplacement offerts !" },
  { zone: "Zone Urbaine Montpellier (Montpellier Centre, Lattes, Pérols)", distance: "10 - 20 km", price: 5, desc: "Déplacement offert dès 50€ d'achat." },
  { zone: "Couronne Sud (Saint-Jean-de-Védas, Pérols, Villeneuve-lès-Maguelone)", distance: "20 - 30 km", price: 10, desc: "Déplacement offert dès 80€ d'achat." },
  { zone: "Zone Périurbaine (Villeneuve-lès-Maguelone et banlieue proche)", distance: "30+ km", price: 15, desc: "Sur demande spécifique." }
];

export const FAQ_ITEMS = [
  {
    category: "Organisation",
    question: "De quoi avez-vous besoin lors de votre venue ?",
    answer: "Bettyna amène tout le matériel professionnel : serviettes propres, bac à shampoing amovible gonflable s'adaptant à toutes les chaises/douches, bâche de sol étanche, sèche-cheveux, fers et produits. Elle a seulement besoin d'une chaise confortable, d'une prise électrique à proximité, et d'un accès à un point d'eau chaude (évier, douche) pour rincer le bac."
  },
  {
    category: "Produits",
    question: "Quelles marques de produits utilisez-vous ?",
    answer: "Bettyna utilise des gammes de soins professionnels, d'origine naturelle à plus de 90%, respectueuses de la fibre capillaire (sans silicones lourds ni sulfates agressifs). Les colorations proposées sont très douces et respectent les cuirs chevelus sensibles."
  },
  {
    category: "Règlement & Frais",
    question: "Comment se calculent les frais de déplacement ?",
    answer: "Les déplacements sont gratuits dans la zone de Montpellier/Lattes (rayon de 10km). Pour les autres communes de la métropole montpelliéraine, de légers frais s'appliquent (de 5€ à 15€) mais sont totalement annulés dès que la facture atteint un certain palier de prestations !"
  },
  {
    category: "Règlement",
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Vous pouvez régler votre prestation en espèces, par carte bancaire (via un terminal de paiement mobile sécurisé) ou par virement instantané."
  }
];

export const BEFORE_AFTER_CASES = [
  {
    title: "Balayage Miel & Coupe Bohème",
    duration: "2h15",
    desc: "Éclaircissement fondu sur base châtaine terne, associé à un dégradé fluide pour recréer du volume.",
    beforeUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800",
    afterUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Soin Profond Botox Réparateur",
    duration: "1h30",
    desc: "Traitement de choc sur cheveux secs et cassants agressés par les fers à lisser. Brillance et gainage immédiat.",
    beforeUrl: "https://images.unsplash.com/photo-1595959183075-c1d09e7a9cf1?auto=format&fit=crop&q=80&w=800",
    afterUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=800"
  }
];
