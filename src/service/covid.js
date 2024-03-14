 
import axios from "axios";

 export const getCovidData = () =>{
     return axios.get('https://data.covid19india.org/data.json')
 }