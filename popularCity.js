let fetch = require('node-fetch')
let city = 'http://api.travelpayouts.com/data/en/cities.json?token='
let ip = 'http://ip-api.com/json'
let token = 'a4afad13a7337940879a2f94505872ab'
let url = 'http://www.travelpayouts.com/whereami?locale=en&ip='
const proxy = 'https://cors-anywhere.herokuapp.com/'
function check(result){
    if(!result.status){
        console.log("You have an error", result)
    }
    return result
}
function fail(err){
    console.log(err)
}
function parseJson(data){
    return data.json()
}

fetch(url)
.then(check)
.then(parseJson)
.then(data=>{return data.iata})
.then(popularCityInformation)
.then(cityCodesToCityName)
.then(cityNameToPicture)
.then(pictureToWebsite)
.catch(fail)


async function popularCityInformation(data){
    try{
        const response = await fetch(`http://api.travelpayouts.com/v1/city-directions?origin=${data}&currency=usd&token=`+ token)
        return (await response.json())
    }
    catch(err){
        console.log("ERR", err)
    }
}

async function cityCodesToCityName(data){
    try{
        const response = await fetch('http://api.travelpayouts.com/data/en/cities.json?token='+token)
        cities = await response.json()
        cityName = []
        cities.map(cityChunk=>{
            for(key of Object.keys(data.data)){
                if(cityChunk.code === data.data[key].destination){
                    cityName.push(cityChunk.name)
                    return cityName
                }
            }
        })
    return cityName
    }
    catch(err){
        console.log("ERROR",err)
    }
}

async function cityNameToPicture(data){
    pictures = []
    for(city of data){
        try{
            const response = await fetch(`https://pixabay.com/api/?key=15438259-6282fc2d733e8f5d4bdb809a9&q=${city}&image_type=photo&category=travel`)
            pictureData = await response.json()
        return await pictureData.hits
    }
    catch(err){
        console.log("You have an error", err)
    }
}
}

function pictureToWebsite(data){
    console.log(data)
}


// function getDataFromIp(){
//     fetch(url)
//     .then(check)
//     .then(parseJson)
//     .then(data =>{
//         parseCity(data.iata)
//     })
//     .catch(fail)
// }

// async function parseCity(code){
//     urls = [
//         `http://api.travelpayouts.com/v1/city-directions?origin=${code}&currency=usd&token=`,
//         'http://api.travelpayouts.com/data/en/cities.json?token='
//     ]
//     Promise.all(urls.map(url=>
//         fetch(url+token)
//         .then(check)
//         .then(parseJson)
//         ))
//         .then(data=>{
//             listOfCityCodes =[]
//             cityNames = []
//             popularCities = data[0].data
//             allCityData = data[1]
//             Object.keys(popularCities).map(keysOfCities=>{
//                 listOfCityCodes.push(popularCities[keysOfCities].destination)
//             })
//             allCityData.map(allCityCodes =>{
//                 for(lenOfCity =0; lenOfCity < 8; lenOfCity++){
//                     if(allCityCodes.code === listOfCityCodes[lenOfCity]){
//                         splitCode = allCityCodes.name.replace(' ', '-')
//                         cityNames.push(splitCode)
//                     }
//                 }
//             })
//             return cityNames
//         })
//         .then(data=>{
//             cityPictureLst = []
//                 Promise.all(data.map(eachCity=>{
//                     fetch(`https://pixabay.com/api/?key=15438259-6282fc2d733e8f5d4bdb809a9&q=${eachCity}+&image_type=photo+category=travel`)
//                     .then(check)
//                     .then(parseJson)
//                     .then(data=>{
//                         console.log(data.hits[0].webformatURL)
//                     })
//                     .catch(fail)
//             }))
//         })
//         .catch(fail)
//     }

// function checkData(data){
//     imageUrlDataChunk = data.hits[0]['webformatURL']
//     console.log(imageUrlDataChunk)
// }


// getDataFromIp()

                    // const docElements = document.getElementsByClassName('flex-footer-content')
                    // Array.from(docElements).forEach(element, index){
                    //     element.innerHTML = `<h6>lol</h6>`
                    // }
