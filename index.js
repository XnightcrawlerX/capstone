import "babel-polyfill";
import * as website from "./components/index.js";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
const proxy = 'https://cors-anywhere.herokuapp.com/';

//Main function
async function render(st){
    document.querySelector('#root').innerHTML = `
    ${website.Header(state.Links)}
    ${website.Main(st)}
    ${website.Footer()}
    `;
    router.updatePageLinks();
    addNavListener();
    barMenu();
};

//Routes
const router = new Navigo(window.location.origin);
router
    .on({
        ":page": ({page}) => render(state[capitalize(page)]),
        "/": () => render(state.Home)
    })
.resolve();

//Bar menu, Onclick even
function barMenu(){
    document.getElementById("Menu").addEventListener("click",event=>{
        if(document.getElementById("dropdown").style.display === "grid"){
            document.getElementById("dropdown").style.display = "none";
        }else{
            document.getElementById("dropdown").style.display = "grid";
        };
    });
};

//Home Page Search
//__________________________
//Api call to get information of every city
async function getCity(){
    const resp = await axios.get(proxy+'http://api.travelpayouts.com/data/en/cities.json?token=a4afad13a7337940879a2f94505872ab');
    return resp
};

//Searches for travel tickets depending on user input
async function searchForTicket(o, d, dd, rd){
    const resp = await axios.get(proxy+`http://api.travelpayouts.com/v2/prices/week-matrix?currency=usd&origin=${o}&destination=${d}&show_to_affiliates=true&depart_date=${dd}&return_date=${rd}&token=a4afad13a7337940879a2f94505872ab`);
    return resp;
}

//Nav listener for Home Page Input
document.getElementById('submit').addEventListener("click", event=>{
    event.preventDefault()
    let origin = document.getElementById('origin').value;
    let destination = document.getElementById('destination').value;
    let departure = document.getElementById('dep-date').value;
    let returnDate = document.getElementById('rtn-date').value;
    getCity()
        .then(response=>{
            response.data.map(keys=>{

                // checks if city is equal to origin
                if(keys.name === origin){
                    state.result.originName = keys.name;
                    state.result.originCode  = keys.code;
                };
                
                // check if @city is equal to Destination
                if(keys.name === destination){
                    state.result.destCode = keys.code;
                    state.result.destName = keys.name;
                };
            });
            return response;
        })
        .then(resp =>{
            searchForTicket(state.result.originCode, state.result.destCode, departure, returnDate)
            .then(data=>{
                data.data.data.map(key=>{
                    // Pushes dates and the price to result.js
                    state.result.departDate.push(key.depart_date);
                    state.result.returnDate.push(key.return_date);
                    state.result.price.push(key.value);
                });
                render(state.result);
            });
        });
});

//Nav for Home page Nav Menu
function addNavListener(){
    const elements = document.getElementsByClassName("menu-items");
    for(let x=0; x<elements.length; x++){
        elements[x].addEventListener("click", event =>{
            event.preventDefault();
            const text = state[event.target.textContent];
            render(text);
        });
    };
};
//Popular Page
axios
.get('https://www.travelpayouts.com/whereami?locale=en&ip=')
.then(response=>{
    state.Cheapest.origin = response.data.iata; 
    tickets(response.data.iata);
    findPopularCity(response.data.iata);
});

function findPopularCity(iata){
    axios
    .get(proxy+`https://api.travelpayouts.com/v1/city-directions?origin=${iata}&currency=usd&token=a4afad13a7337940879a2f94505872ab`)
    .then(response=>{
        Object.keys(response.data.data).map(key=>{
            state.Popular.price.push(response.data.data[key].price)
        })
        popularCityCodeToName(response.data.data);
    });
};
function popularCityCodeToName(code){
    axios.get(proxy+'https://api.travelpayouts.com/data/en/cities.json?token=a4afad13a7337940879a2f94505872ab')
    .then(response=>{
        response.data.map(key=>{
            Object.keys(code).map(codeKey=>{
                if(key.code === codeKey){
                    getCityPicture(key.name);
                };
            });
        });
    });
};
function getCityPicture(cityName){
    axios.get(`https://pixabay.com/api/?key=15438259-6282fc2d733e8f5d4bdb809a9&q=city of ${cityName}&image_type=photo&category=places&editors_choice="true"`)
    .then(response=>{
        console.log(response)
        state.Popular.picture.push(response.data.hits[0].webformatURL);
        state.Popular.cityName.push(cityName);
    });
};


//Cheapest Tickets page
function tickets(code){
    axios.get(proxy+`https://api.travelpayouts.com/v1/prices/cheap?currency=usd&origin=${code}&destination=-&token=a4afad13a7337940879a2f94505872ab`)
    .then(resp=>{
        Object.keys(resp.data.data).map((value)=>{
            let x = Object.values(resp.data.data[value]);
            city(value,x[0].flight_number,x[0].price);
            airportCodeToName(x[0].airline);
        });
    });
};

function city(code, fn, p){
    axios.get(proxy+'https://api.travelpayouts.com/data/en/cities.json?token=a4afad13a7337940879a2f94505872ab')
    .then(response=>{
        response.data.map(key=>{
            if(key.code === code){
                state.Cheapest.flNum.push(fn);
                state.Cheapest.price.push(p);
                state.Cheapest.code.push(key.code);
                state.Cheapest.name.push(key.name);
            };
        });
    });
};
function airportCodeToName(code){
    axios.get(proxy+`https://api.travelpayouts.com/data/en/airlines.json?token=a4afad13a7337940879a2f94505872ab`)
    .then(resp=>{
        resp.data.map(key=>{
            if(key.code === code){
                state.Cheapest.airlineCode.push(code)
                state.Cheapest.airlineName.push(key.name);
            }
        });
    });
};