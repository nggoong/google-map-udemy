import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address') as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyCn0PJxSEJTR7E0CasE15SV0TjtwjanA_E"

type GoogleGeocodingResponse = {
    results: {geometry: {location:{lat:number; lng:number}}}[];
    status:'OK' | 'ZERO_RESULTS';
}

function searchAddressHandler(event:Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    // send this to google's API!

    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
    .then(res => {
        if(res.data.status !== "OK") {
            throw new Error("Could not fetch location");
        }
        const coordinate = res.data.results[0].geometry.location;
    }).catch(err => {
        alert(err.message);
        console.log(err);
    })
}

form.addEventListener('submit', searchAddressHandler);


// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY



