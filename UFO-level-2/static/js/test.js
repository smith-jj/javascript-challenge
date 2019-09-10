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

// Get references to the tbody element, input fields and button
var $tbody = document.querySelector('tbody');
var $dateInput = document.querySelector('#dateInput');
var $cityInput = document.querySelector('#cityInput');
var $stateInput = document.querySelector('#stateInput');
var $countryInput = document.querySelector('#countryInput');
var $shapeInput = document.querySelector('#shapeInput');
var $searchBtn = document.querySelector('#filter-btn');
var $paginateBtn = document.getElementsByClassName('paginate-btn');
// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener('click', handleSearchButtonClick);

// Set filteredData to dataSet initially
var filteredData = tableData;
// Set pageNumbers counter for setting pagination
var pageNumbers = 1;
// Keep track of current page for pagination
var currentPage = 1;

// renderTable renders the filteredData to the tbody
function renderTable() {
    // reset currentPage & pageNumbers
    currentPage = 1;
    pageNumbers = 1;
    $tbody.innerHTML = '';
    for (var i = 0; i < filteredData.length; i++) {
        // Get get the current sighting object and its fields
        var sighting = filteredData[i];
        var fields = Object.keys(sighting);
        // Create a new row in the tbody, set the index to be i + startingIndex
        var $row = $tbody.insertRow(i);
        $row.className = "rowdiv";


        // Paginate every 50 rows
        if (i % 50 === 0 && i !== 0) {
            pageNumbers++;
        }
        // Set row attribute to keep track of page
        $row.setAttribute('data-page', pageNumbers);

        // If row's data-page attribute isn't the same as currentPage, don't show it
        if (parseInt($row.getAttribute('data-page')) !== currentPage) {
            $row.style.display = 'none';
        }
        for (var j = 0; j < fields.length; j++) {
            //Create a new cell at set its inner text to be the current value at the current address's field
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = sighting[field];
        }
    }
}

// Run this to get current page and hide/show DOM elements based on that output
function displayPage() {
    var tableRows = document.getElementsByClassName('rowdiv');
    console.log('itsme');
    console.dir(tableRows)
    for (var i = 0; i < tableRows.length; i++) {
        var rowPage = parseInt(tableRows[i].getAttribute('data-page'));
        console.dir(tableRows[i])
        if (rowPage === currentPage) {
            tableRows[i].style.display = 'table-row';
        } else {
            tableRows[i].style.display = 'none';
        }
    }
}

function handleSearchButtonClick() {
    // Format the user's search by removing leading and trailing whitespace
    var filterDate = $dateInput.value.trim();
    var filterCity = $cityInput.value.trim().toLowerCase();
    var filterState = $stateInput.value.trim().toLowerCase();
    var filterCountry = $countryInput.value.trim().toLowerCase();
    var filterShape = $shapeInput.value.trim().toLowerCase();

    // Set filteredData to an array of all sightings whose "date" matches the filter
    filteredData = dataSet.filter(function(sighting) {
        var currentSightingDate = sighting.datetime;
        var currentSightingCity = sighting.city.toLowerCase();
        var currentSightingState = sighting.state.toLowerCase();
        var currentSightingCountry = sighting.country.toLowerCase();
        var currentSightingShape = sighting.shape.toLowerCase();

        // If true, add the address to the filteredData, otherwise don't add it to filteredData
        if (
            (currentSightingDate === filterDate || filterDate == '') &&
            (currentSightingCity === filterCity || filterCity == '') &&
            (currentSightingState === filterState || filterState == '') &&
            (currentSightingCountry === filterCountry || filterCountry == '') &&
            (currentSightingShape === filterShape || filterShape == '')
        ) {
            return true;
        }
        return false;
    });
    renderTable();
}

// Add Event Listeners
for (var i = 0; i < $paginateBtn.length; i++) {
    // If it's previous page, make current page go down... but not lower than 1
    if ($paginateBtn[i].textContent === 'Previous Page') {
        $paginateBtn[i].addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayPage();
            }
        });
    } else {
        // Else make it move the currentPage forward, but not higher than the most pages we have 
        $paginateBtn[i].addEventListener('click', function() {
            console.log('hi');
            if (currentPage < pageNumbers) {
                currentPage++;
                displayPage();
            }
        });
    }
}

renderTable();