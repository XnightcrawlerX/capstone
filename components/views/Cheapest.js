export default st => {
    return`
<section class="cheapest">
${st.code.map(key=>{
    return formatResults(key)
}).join("")}
</section>
`
};

function formatResults(data){
    return `
    <div class="test">
    ${data}
    </div>`
}