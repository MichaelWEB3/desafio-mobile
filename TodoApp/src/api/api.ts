import axios from "axios";
import Configuration from 'react-native-config';


const service_url = Configuration.SERVICE_URL

export const api = axios.create({
    baseURL: service_url,
});