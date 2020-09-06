
import axios from 'axios';
import API from '../../../ApiHref';

const trade_delay = 10000; // millis

// REST endpoint
var restdb = axios.create({
    baseURL: API.API_DISCUSSTION,
    timeout: 1000,
});
// Eventsource endpoint
const realtimeURL = API.API_DISCUSSTION

export default{restdb, realtimeURL, trade_delay };