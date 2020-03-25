export default st =>  {
    console.log(st)
    return `<section class="popular">
${st.picture.map((result, index)=>{
    return formatResult(result, st.cityName[index])
}).join("")}
</section>
`};


function formatResult(url, city){
    return`
    <a href="#" class="popular-results" style="background: url( ${url} ); background-repeat: no-repeat; background-size:cover">
    <div class="city-name">${city}</div>
    </a>
    `
}  