export default st =>  {
    return `<section class="popular">
${st.picture.map((result, index)=>{
    return formatResult(result, st.cityName[index], st.price[index])
}).join("")}
</section>
`};


function formatResult(url, city, price){
    return`
    <a href="/" alt="${city}:${price}" style="background: url( ${url} ); background-repeat: no-repeat; background-size: cover; background-position: center;">
        <div class="city-name">${city}</div>
        <div class="price">$${price}</div>
    </a>
    `
}  