export default st => {
    console.log("objects in the export function of Cheapest.js", st)
    return`
<section class="cheapest">
${st.code.map((value,index)=>{
    formatResults(value, st.name[index], st.airlineCode[index], st.airlineName[index], st.flNum[index], st.price[index])
}).join(" ")}
</section>
`
};

function formatResults(ctCode, ctName, aplCode, aplName, num, price){
    console.log("object of format results function of Cheapest.js",st)
    return `
    <div class="test">
    ${ctCode}
    </div>`
}