export default st => {
    console.log("objects in the export function of Cheapest.js", st)
    return`
<section class="cheapest">
    <div class="cheap-page-container">
        ${st.code.map((value,index)=>{
            return formatResults(value, st.name[index], st.airlineName[index], st.flNum[index], st.price[index], st.origin)
        }).join(" ")}
    </div>
</section>
`
};

function formatResults(ctCode, ctName, aplName, num, price, origin){
    return `
    <a href="/">
        <div class="origin">${origin}</div>
        <i class="fas fa-long-arrow-alt-right"></i>
        <div class="code">${ctCode}</div>
        <div class="ct-name">${ctName}</div>
        <div class="apl-name">${aplName} flight: ${num}</div>
        <div class="price">$${price}</div>
    </a>`
}