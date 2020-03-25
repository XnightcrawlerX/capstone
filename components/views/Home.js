export default () => {
    return `
<section class="main">
    <div class="form-container">
        <form class="form-field">
        <div style="font-size:13px" class="form-city-origin-small">origin city</div>
        <div style="font-size:13px" class="form-city-dest-small">destination city</div>
        <input class="input-city" id="origin"  type="text"></input>
        <input class="input-city-dest" id="destination" type="text"></input>
        <p style="grid-area: dname;">Departing</p>
        <p style="grid-area: rname;">Returning</p>
        <input style="width:80%; font-size:11px; padding-right:0%"class="dep-date" id="dep-date" type="date"></input>
        <input style="width:80%; font-size:11px; padding-right:0%"class="rtn-date" id="rtn-date" type="date"></input>
        <input type="submit" style="grid-area:sbmt; height:35px; width:100%; top:25%; font-size:11px;" id="submit" value="Results"></input>
        </form>
    </div>
</section>
`
};
