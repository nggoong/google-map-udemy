import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address') as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyCn0PJxSEJTR7E0CasE15SV0TjtwjanA_E"

declare var google:any; // google maps를 사용하는 코드가 정상적으로 실행되는 코드이지만, google 객체를 typescript가 인식하지 못함. 존재함을 알림

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
        const map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
          });

          new google.maps.Marker({position:coordinate, map:map});
    }).catch(err => {
        alert(err.message);
        console.log(err);
    })
}

form.addEventListener('submit', searchAddressHandler);




