import 'dotenv/config';

import Amadeus from 'amadeus';
import { Duration, DateTime } from 'luxon';

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_API_SECRET,
});

export async function getFlights(req, res) {

    const originCode = req.query.originCode || 'REC';
    const destinationCode = req.query.destinationCode || 'SAO';
    const dateOfDeparture = req.query.dateOfDeparture || DateTime.now().plus({ days: 1 }).toFormat('yyyy-MM-dd'); 
    const currency = 'BRL';
    const adults = req.query.adults || 1; // adultos
    const children = req.query.children || 0; // crianças
    const infants = req.query.infants || 0; // bebês
    const max = req.query.max || '5';

    amadeus.shopping.flightOffersSearch.get({
            originLocationCode: originCode,
            destinationLocationCode: destinationCode,
            departureDate: dateOfDeparture,
            currencyCode: currency,
            adults: adults,
            children: children,
            infants: infants,
            max: max,
            
    
        }).then(function (response) {
    
            const show = response.data.map(flight => {
                // Initialize prices for adults and children
                let adultPrice = 'N/A';
                let childPrice = 'N/A';
    
                // Loop through travelerPricings to find adult and child prices
                flight.travelerPricings.forEach(traveler => {
                    if (traveler.travelerType === 'ADULT') {
                        adultPrice = traveler.price.total;
                    } else if (traveler.travelerType === 'CHILD') {
                        childPrice = traveler.price.total;
                    }
                });
    
                return {
                    id: flight.id,
                    origem: flight.itineraries[0].segments[0].departure.iataCode,
                    destino: flight.itineraries[0].segments[0].arrival.iataCode,
                    dataHoraPartida: DateTime.fromISO(flight.itineraries[0].segments[0].departure.at).setLocale('pt-BR').toLocaleString(DateTime.DATETIME_MED), // Format date and time to 'dd/MM/yyyy HH:mm'
                    dataHoraChegada: DateTime.fromISO(flight.itineraries[0].segments[0].arrival.at).setLocale('pt-BR').toLocaleString(DateTime.DATETIME_MED), // Format date and time to 'dd/MM/yyyy HH:mm'
                    duracao: Duration.fromISO(flight.itineraries[0].duration).toFormat('hh:mm'), // Format duration to 'hh:mm'
                    numeroVoo: flight.itineraries[0].segments[0].number, // Changed from flightNumber to number
                    companhiaAerea: response.result.dictionaries.carriers[(flight.validatingAirlineCodes[0])], // Use the airline code or a dictionary to get the name
                    precoAdulto: adultPrice !== 'N/A' ? `R$${parseFloat(adultPrice)}` : 'N/A', // Format price to Brazilian Real
                    precoCrianca: childPrice !== 'N/A' ? `R$${parseFloat(childPrice)}` : 'N/A', // Format price to Brazilian Real
                    precoTotal: `R$${parseFloat(flight.price.total)}` // Total price of the offer
                };
            });
    
            res.send(show);
            // console.log(response.result);
            
    
            
    
    
    
        }).catch(function (response) {
            res.send(response);
        });


    


}