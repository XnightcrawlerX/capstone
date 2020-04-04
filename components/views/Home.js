export default () => {
    return `
<section class="main">
    <div class="form-container">
        <input class="city" id="origin" type="text" placeholder="Origin"></input>
        <input class="dest" id="destination" type="text" placeholder="Destination"></input>
        <input class="dep-date" id="dep-date" type="date"></input>
        <input class="rtn-date" id="rtn-date" type="date"></input>
        <input class="sbmt" type="submit" id="submit" value="Results"></input>
    </div>
</section>
`
};
