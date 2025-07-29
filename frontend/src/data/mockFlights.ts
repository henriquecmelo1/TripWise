// src/data/mockFlights.ts

// Ícones SVG para as companhias aéreas (placeholders)
// const iconLatam = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V9h2v8zm3 0h-2V9h2v8zm3 0h-2V9h2v8z"/></svg>'; // Exemplo genérico
// const iconAzul = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V9h2v8zm3 0h-2V9h2v8zm3 0h-2V9h2v8z"/></svg>'; // Exemplo genérico
// const iconGol = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V9h2v8zm3 0h-2V9h2v8zm3 0h-2V9h2v8z"/></svg>'; // Exemplo genérico
// const iconTap = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V9h2v8zm3 0h-2V9h2v8zm3 0h-2V9h2v8z"/></svg>'; // Exemplo genérico

export const planeIcon = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9L2 14v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1V20.5L14 19v-2.5l8 2.5z"/></svg>'; // Ícone de avião genérico
export const clockIcon = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.5-13h1V7h-1zm0 2h1v4h-1z"/></svg>'; // Ícone de relógio

// NOVO: Definição da interface Flight
export interface Flight {
  id: string;
  origem: string;
  destino: string;
  dataHoraPartida: string;
  dataHoraChegada: string;
  duracao: string;
  numeroVoo: string;
  companhiaAerea: string;
  precoAdulto: string; // Manter como string já formatada se o backend retornar assim
  precoCrianca: string; // Manter como string já formatada
  precoTotal: string; // Manter como string já formatada
  // Os tipos 'Direto', '1 parada' etc. não estão na nova estrutura, mas podemos inferir
  // ou adicionar um campo se o backend passar essa informação separadamente.
  // Por enquanto, vou remover 'type' da interface, ou assumir que não será usado mais para tags.
  // Se o backend enviar 'type', adicione-o aqui.
}

export const mockFlights: Flight[] = [
  {
    "id": "1",
    "origem": "REC",
    "destino": "GRU",
    "dataHoraPartida": "10 de out. de 2025, 13:00",
    "dataHoraChegada": "10 de out. de 2025, 16:20",
    "duracao": "03:20",
    "numeroVoo": "1809",
    "companhiaAerea": "GOL LINHAS AEREAS S/A",
    "precoAdulto": "R$796.59",
    "precoCrianca": "R$796.59",
    "precoTotal": "R$2389.77"
  },
  {
    "id": "2",
    "origem": "GRU",
    "destino": "REC",
    "dataHoraPartida": "15 de out. de 2025, 08:00",
    "dataHoraChegada": "15 de out. de 2025, 11:20",
    "duracao": "03:20",
    "numeroVoo": "1810",
    "companhiaAerea": "LATAM AIRLINES",
    "precoAdulto": "R$850.00",
    "precoCrianca": "R$850.00",
    "precoTotal": "R$2550.00"
  },
  {
    "id": "3",
    "origem": "REC",
    "destino": "BSB",
    "dataHoraPartida": "12 de nov. de 2025, 10:00",
    "dataHoraChegada": "12 de nov. de 2025, 13:00",
    "duracao": "03:00",
    "numeroVoo": "2001",
    "companhiaAerea": "AZUL LINHAS AEREAS BRASILEIRAS S/A",
    "precoAdulto": "R$600.00",
    "precoCrianca": "R$600.00",
    "precoTotal": "R$1800.00"
  }
];