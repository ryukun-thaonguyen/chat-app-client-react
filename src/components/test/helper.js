
import axios from 'axios';


const trade_delay = 10000; // millis

// REST endpoint
let restdb = axios.create({
  baseURL: 'https://reactrealtime-6683.restdb.io',
  timeout: 1000,
  headers: { 'x-apikey': apikey }
});
// Eventsource endpoint
const realtimeURL = `http://127.0.0.1:8000/api/getDiscustion?id=1`

export { apikey, restdb, realtimeURL, trade_delay };
