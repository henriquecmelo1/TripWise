
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