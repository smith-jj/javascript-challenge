// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// Check Data in console log
console.log(tableData);

// Use Arrow Functions to loop and 
tableData.forEach((sightingsReport) => {
    var row = tbody.append("tr");
    Object.entries(sightingsReport).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
});

// Select the button
var button = d3.select("#filter-btn");

button.on("click", function() {

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    console.log(inputValue);
    console.log(data);

    var filteredData = tableData.filter(sighting => sighting.date === inputValue);

    console.log(filteredData);
});