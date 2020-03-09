console.log("OK")
let city = 'http://api.travelpayouts.com/data/en/cities.json?token='
let ip = 'http://ip-api.com/json'
let token = 'a4afad13a7337940879a2f94505872ab'
let url = 'http://www.travelpayouts.com/whereami?locale=en&ip='
const proxy = 'https://cors-anywhere.herokuapp.com/'
function check(result) {
  if (!result.status) {
    console.log("You have an error", result)
  }
  return result
}
function fail(err) {
  console.log(err)
}
function parseJson(data) {
  return data.json()
}

async function popularCityInformation(data) {
  try {
    const response = await fetch(proxy+`http://api.travelpayouts.com/v1/city-directions?origin=${data}&currency=usd&token=` + token)
    return (await response.json())
  }
  catch (err) {
    console.log("ERR", err)
  }
}
async function cityCodesToCityName(data) {
  try {
    const response = await fetch(proxy+'http://api.travelpayouts.com/data/en/cities.json?token=' + token)
    cities = await response.json()
    cityName = []
    cities.map(cityChunk => {
      for (key of Object.keys(data.data)) {
        if (cityChunk.code === data.data[key].destination) {
          cityName.push(cityChunk.name)
          //return cityName
        }
      }
    })
    return cityName
  }
  catch (err) {
    console.log("ERROR", err)
  }
}
async function cityNameToPicture(data) {
  let pictures = [];
  let pictureData = [];
  //let count = 0;
  for (city of data) {//start
    try {
      const response = await fetch(`https://pixabay.com/api/?key=15438259-6282fc2d733e8f5d4bdb809a9&q=${city}&image_type=photo&category=travel`)
      pictureData[city] = await response.json()
      //count++;
      console.log(city);
      //return await pictureData.hits
    }
    catch (err) {
      console.log("You have an error", err)
    }
  }//end
  return pictureData
}
async function pictureToWebsite(data) {
  //for(let i = 0; i< data.length; i++){
  //  console.log(data);//data[i].hits[0].webformatURL);
  //}
  const divs = document.getElementsByClassName("flex-footer-content");
  let count = divs.length < data.length ? divs.length: data.length;
  data.slice(0,count); //
  //adjust for index
  console.log(count)
  for await( key of Object.keys(data)){
    if(await count < divs.length){
      //if you order matters you need to filter this
      divs[count].innerHTML = await renderCityDiv(key, data[key].hits[1].webformatURL);
      count++;
    }
  }
  
}
async function renderCityDiv(cityname, url){
  return `<div class="city" style="position: relative; background: url(${url});" id="${cityname}">
  <div class="city-name-text">${cityname}</div>
  </div>`;
}
document.onload =
  fetch(proxy+url)
  .then(check)
  .then(parseJson)
  .then(data => { return data.iata })
  .then(popularCityInformation)
  .then(cityCodesToCityName)
  .then(cityNameToPicture)
  .then(pictureToWebsite)
  .catch(fail)

