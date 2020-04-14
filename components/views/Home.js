export default () => {
    return `
<section class="main">
    <div class="form-container">
    <form>
    <label for="origin">Origin city</label><br>
    <input type="text" id="origin" name="origin" placeholder="Leave blank for current city"><br>
    <label for="destination">Destination city</label><br>
    <input type="text" id="destination" name="destination"><br>
    <label for="arriving">Returning</label><br>
    <input type="date" id="arriving" name="arriving"><br>
    <input type="submit" id="submit" value="Results">
  </form> 
    </div>
</section>
`
};

