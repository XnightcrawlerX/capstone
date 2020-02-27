fetch = require("node-fetch")
const proxy = 'https://cors-anywhere.herokuapp.com/'
const token = 'a4afad13a7337940879a2f94505872ab'
let cityUrl = 'http://api.travelpayouts.com/data/en/cities.json?token='
const airportUrl = 'http://api.travelpayouts.com/data/en/airports.json?token='
let ip = 'http://ip-api.com/json'
// List of urls to parse 
let urls = [
    ip,
    cityUrl+token,
    airportUrl+token
]
Promise.all(urls.map(url=>
    fetch(url)
    .then(checkStatus)
    .then(parseJson)
    .catch(logError)
    ))
    .then(parseAllData)
    .catch(logError)
// checks if there is a json file
function checkStatus(result){
    if(!result.status){
        throw Error("You have an error")
    }
    // if there is result gets passes onto the next .then
    return result
}
// turns result into json format
function parseJson(result){
    return result.json()
}
// logs error if there is one
function logError(err){
    console.log(err)
}

function flights(data){
    for(flightInformation of data.data){
        console.log(flightInformation.value, flightInformation.origin)
    }
}

function listOfCities(list){
    originCity = list[0]
    destinationCity = list[1]
    url = `http://api.travelpayouts.com/v2/prices/latest?origin=${originCity}&destination=${destinationCity}&currency=usd&period_type=year&page=1&limit=30&show_to_affiliates=true&sorting=price&trip_class=0&token=${token}`
    fetch(url)
    .then(checkStatus)
    .then(parseJson)
    .then(flights)
    .catch(logError)
}
function parseAllData(data){
    let destination = "Dallas" ///document element destination
    let start = "Saint Louis" /// document element origin
    user = data[0]
    cities = data[1]
    airports = data[2]
    cityList = []
    for(city of cities){
        for(airport of airports){
            if((city.name === start || city.name === destination) && (city.code === airport.code) && (airport.flightable) && (user.countryCode === airport.country_code)){
                cityList.push(city.code)
            }
        }
    }
    listOfCities(cityList)
}
// document.getElementById('myButton').addEventListener('click', function(){
//     Promise.all(urls.map(url=>
//         fetch(url)
//         .then(checkStatus)
//         .then(parseJson)
//         .catch(logError)
//         ))
//         .then(parseAllData)
//         .then(userLocation)
// })

