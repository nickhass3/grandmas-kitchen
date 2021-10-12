document.getElementById("search").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    let foodString = document.getElementById("input").value;
    console.log("foodString is", foodString);

    var fullURL = `https://api.nal.usda.gov/fdc/v1/foods/search?query="${foodString}"&requireAllWords=true&api_key=KnviKbbyX5nal48fbX7l2aEjmWc1fpoJLphSOiG2`;
    console.log(fullURL);
    fetch(fullURL)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
        let myObj = {};
        let myNutrients = ['Sugars, total including NLEA', 'Caffeine', 'Carbohydrate, by difference', 'Energy', 'Protein', 'Fiber, total dietary', 'Sodium, Na', 'Vitamin B-12, added', 'Potassium, K', 'Vitamin C, total ascorbic acid', 'Vitamin A, IU'];
        document.getElementById("search-results").innerHTML = `<h2>${foodString}</h2>` +
          `<p>${json.foods[0].description}</p>`;
        for (let i = 0; i < json.foods[0].foodNutrients.length; i++) { // json.foods[0].foodNutrients.length
          if (json.foods[0].foodNutrients[i].value > 0 && myNutrients.includes(json.foods[0].foodNutrients[i].nutrientName)) {
            document.getElementById("search-results").innerHTML += `<p>${json.foods[0].foodNutrients[i].nutrientName.split(',')[0]}` + `: ${json.foods[0].foodNutrients[i].value} ${json.foods[0].foodNutrients[i].unitName}`;
            if (!(json.foods[0].foodNutrients[i].nutrientName in myObj))
              myObj[json.foods[0].foodNutrients[i].nutrientName.split(',')[0]] = json.foods[0].foodNutrients[i].value + " " + json.foods[0].foodNutrients[i].unitName;
          }
        }
      }).catch((message) => {
        console.log(message);
        document.getElementById("search-results").innerHTML = `<p>No results containing all your search terms were found.</p>`;
        document.getElementById("search-results").innerHTML += `<p>Suggestions:</p>`;
        document.getElementById("search-results").innerHTML += `<ul>
                                                                  <li>Make sure all words are spelled correctly.</li>
                                                                  <li>Try different keywords.</li>
                                                                  <li>Try more general keywords.</li>
                                                                </ul>`;
      });
  }
});



/*
function buildTable(data) {
  let table = document.createElement("table");
  let fields = Object.keys(data);
  let headRow = document.createElement("tr");
  fields.forEach(function(field) {
    let headCell = document.createElement("th");
    headCell.textContent = field;
    headRow.appendChild(headCell);
  });
  table.appendChild(headRow);

  data = JSON.stringify(data);
  data = JSON.parse(data);

  data.forEach(function(object) {
    let row = document.createElement("tr");
    fields.forEach(function(field) {
      let cell = document.createElement("td");
      cell.textContent = object[field];
      if (typeof object[field] == "number")
        cell.style.textAlign = "right";
      row.appendChild(cell);
    });
    table.appendChild(row);
  });
  return table;
}*/

/*
  <div class="search-container">
    <input type="text" placeholder="Search for a food...">
  </div>*/