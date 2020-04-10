export default () => {
    return `
<section class="main">
    <div class="form-container">
    <form>
    <label for="origin">Origin city</label><br>
    <input type="text" id="origin" name="origin"><br>
    <label for="destination">Destination city</label><br>
    <input type="text" id="destination" name="destination"><br>
    <label for="departing">Departing</label><br>
    <input type="date" id="departing" name="departing"><br>
      <label for="arriving">Arriving</label><br>
    <input type="date" id="arriving" name="arriving"><br>
    <input type="submit" id="submit" value="Results">
  </form> 
    </div>
</section>
`
};

