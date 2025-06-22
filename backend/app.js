import express from 'express';
import bodyParser from 'body-parser'
import cors from "cors"
import { getFlights } from './flights/flights.js';




const app = express();
const PORT = 3000;
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:5173'
}));


// app.get('/flights', getFlights);
app.post('/flights/search', getFlights);

app.listen(PORT, () =>
    console.log(`Server is running on port: http://localhost:${PORT}`)
);