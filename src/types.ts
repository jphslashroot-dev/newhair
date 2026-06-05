export interface HairService {
  id: string;
  name: string;
  category: 'coupe' | 'couleur' | 'soin' | 'evenement';
  description: string;
  basePrice: number;
  duration: number; // in minutes
  popular?: boolean;
}

export interface BookingState {
  services: string[]; // List of hair service ids
  hairLength: 'court' | 'mi-long' | 'long';
  date: string; // YYYY-MM-DD
  timeSlot: string; // "09:00", "11:00", etc
  distanceKm: number; // for travel fee
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  clientCity: string;
  clientNotes: string;
}

export interface AIResponse {
  isDemo?: boolean;
  diagnostic: string;
  hairstyles: Array<{
    name: string;
    description: string;
    whyMatched: string;
  }>;
  routine: Array<{
    title: string;
    steps: string[];
    recommendedProducts: string;
  }>;
  tips: string[];
}
