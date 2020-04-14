export default st=> {
    return `
    <section class="results"> 
    ${st.price.map((value, index)=>{
        return formatResults(value, st.originName, st.destName, st.departDate[index], st.returnDate[index],st.originCode,st.destCode)
    }).join("")
    }         
    </section>`
}
function formatResults(price, origin, dest, date, rtnDate, oc, dc){
    return `
    <a href=#>
        <div class="price">
            <p>$${Math.round(price)}</p>
        </div>
        <div class="oc">${oc}</div>
        <div class="origin">${origin}</div>
        <div class="dc">${dc}</div>
        <div class="destination">${dest}</div>
        <i class="fas fa-plane-departure fa-2x"></i>
        <i class="fas fa-plane-arrival fa-2x"></i>
        <div class="dd">${displayNormalDate(date)}</div>
        <div class="rd">${displayNormalDate(rtnDate)}</div>
    </a>
    `
}

function displayNormalDate(date){
    let normal = date.split('-')
    let day = normal[1]
    let month = normal[2]
    let year = normal[0]
    return(`${day}-${month}-${year}`)
}