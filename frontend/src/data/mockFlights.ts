// src/data/mockFlights.ts
export interface Flight {
  id: string;
  airline: string;
  airlineLogoIcon: string; // SVG string para o logo da companhia ou ícone de avião
  departureTime: string;
  originAirport: string;
  duration: string;
  arrivalTime: string;
  destination: string;
  price: number;
  type: 'Direto' | '1 parada' | '2+ paradas';
}

// Ícones SVG para as companhias aéreas (placeholders)
const latamIcon = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V9h2v8zm3 0h-2V9h2v8zm3 0h-2V9h2v8z"/></svg>'; // Exemplo genérico
const azulIcon = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V9h2v8zm3 0h-2V9h2v8zm3 0h-2V9h2v8z"/></svg>'; // Exemplo genérico
const golIcon = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V9h2v8zm3 0h-2V9h2v8zm3 0h-2V9h2v8z"/></svg>'; // Exemplo genérico
const tapIcon = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V9h2v8zm3 0h-2V9h2v8zm3 0h-2V9h2v8z"/></svg>'; // Exemplo genérico
export const planeIcon = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9L2 14v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1V20.5L14 19v-2.5l8 2.5z"/></svg>'; // Ícone de avião genérico
export const clockIcon = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.5-13h1V7h-1zm0 2h1v4h-1z"/></svg>'; // Ícone de relógio

export const mockFlights: Flight[] = [
  {
    id: 'f1',
    airline: 'LATAM',
    airlineLogoIcon: latamIcon,
    departureTime: '14:30',
    originAirport: 'São Paulo (GRU)',
    duration: '8h 30m',
    arrivalTime: '23:00',
    destination: 'Rio de Janeiro',
    price: 1200,
    type: 'Direto',
  },
  {
    id: 'f2',
    airline: 'Azul',
    airlineLogoIcon: azulIcon,
    departureTime: '09:15',
    originAirport: 'São Paulo (CGH)',
    duration: '10h 45m',
    arrivalTime: '20:00',
    destination: 'Rio de Janeiro',
    price: 980,
    type: '1 parada',
  },
  {
    id: 'f3',
    airline: 'GOL',
    airlineLogoIcon: golIcon,
    departureTime: '16:45',
    originAirport: 'Rio de Janeiro (GIG)',
    duration: '9h 15m',
    arrivalTime: '02:00+1',
    destination: 'Rio de Janeiro',
    price: 1150,
    type: 'Direto',
  },
  {
    id: 'f4',
    airline: 'TAP',
    airlineLogoIcon: tapIcon,
    departureTime: '11:00',
    originAirport: 'São Paulo (GRU)',
    duration: '12h 20m',
    arrivalTime: '23:20',
    destination: 'Rio de Janeiro',
    price: 850,
    type: '1 parada',
  },
];