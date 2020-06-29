// from data.js
var tableData = data;
//console.log(tableData);



// Select tbody
var tbody = d3.select('tbody');
// Select the 'select' tag with 'datetime' id
var dateInput = d3.select('#datetime');
// Select the 'select' tag with 'country' id
var countryInput = d3.select('#country');
// Select the 'select' tag with 'state' id
var stateInput = d3.select('#state');
// Select the 'select' tag with 'city' id
var cityInput = d3.select('#city');
// Select the 'select' tag with 'shape' id
var shapeInput = d3.select('#shape');



//Create an array to store all the states
var stateArray = [];
tableData.forEach(data => {
    // Push the states to the array
    stateArray.push(data.state)
}); 
// Use 'Set' to store state in array without duplicates
var uniqueState = [...new Set(stateArray)];
// Sort the array
uniqueState.sort();
//console.log(uniqueState);
// Add 'option' tags with each state under the 'select' tag
uniqueState.forEach( state => {
    stateInput.append('option').text(state)
});



// Create a object to store the states and the cities in each state
var citiesObject = new Object();
uniqueState.forEach(state=>{
    // Create an array to store the cities
    var citiesArray = []
    tableData.forEach(data=> {
        if (data.state===state) {
            // Add cities to the array
            citiesArray.push(data.city);
            // Add the created array to the object without duplicates
            citiesObject[state] = [...new Set(citiesArray)];
        }
    })
})
console.log(citiesObject);



// Set cities of AK as default options because AK is the default state
var AKcities = Object.entries(citiesObject).filter(([key,value])=> key=="ak")[0][1];
AKcities.forEach(city=>{
    cityInput.append('option').text(city);
});



// Create a function to show the cities of the selected state when a state is selected
function showCities(){
    var selectedState = stateInput.property("value");
    var selectedCity = cityInput.property("value");
    var selectedCountry = countryInput.property("value");
    
    // Remove the existing city options
    cityInput.html("");
    // Filter the cities of the selected state
    if (selectedState){
        var cities = Object.entries(citiesObject).filter(([key,value])=> key==selectedState)[0][1];
    }
    console.log(cities);
    
    // Add the city options to the 'select' tag
    cities.forEach( city => {
        cityInput.append('option').text(city);
    });
}




// Select the button
var button = d3.select('#filter-btn');
//Create event handlers for clicking button or pressing enter key
button.on("click", runEnter)


// Create function to run both events
function runEnter() {
    
    // Select the value of each input
    var selectedDate = dateInput.property("value");
    var selectedState = stateInput.property("value");
    var selectedCity = cityInput.property("value");
    var selectedCountry = countryInput.property("value");
    var selectedShape = shapeInput.property("value");
    
    var filteredData = tableData;
    // filter data using multiple conditionals
    if (selectedDate){
        filteredData = filteredData.filter(data=> data.datetime === selectedDate);
    }
    if (selectedCountry){
        filteredData = filteredData.filter(data=> data.country === selectedCountry);
    }
    if (selectedState){
        filteredData = filteredData.filter(data=> data.state === selectedState);
    }
    if (selectedCity){
        filteredData = filteredData.filter(data=> data.city === selectedCity);
    }
    if (selectedShape){
        filteredData = filteredData.filter(data=> data.shape === selectedShape);
    }
    

    // Remove existing table
    tbody.html("");

    // Prevent the page from refreshing
    d3.event.preventDefault();

    console.log(filteredData);

    // Loop through each data
    // Add new rows, then add values along with the td tag
    filteredData.forEach(function(selection) {
        // Append one row for each object
        var newRow = tbody.append('tr');
        // 
        Object.entries(selection).forEach(([key,value])=>{
            console.log(key, value);
            newRow.append('td').text(value);
        });
    });
}
