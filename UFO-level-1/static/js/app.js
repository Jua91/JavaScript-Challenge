// from data.js
var tableData = data;
console.log(tableData);
// YOUR CODE HERE!

// Select tbody tag
var tbody = d3.select('tbody');


// Select the button
var button = d3.select('#filter-btn');
//Create event handlers for clicking button or pressing enter key
button.on("click", runEnter)



// Create function to run both events
function runEnter() {
    
    // Remove existing table
    tbody.html("");

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    //Select the input element
    var inputElement = d3.select('#datetime');
    //Get the value property of the input element
    var inputValue = inputElement.property('value');

    console.log(inputValue);
    
    // Filter the datetime data 
    var filteredData = tableData.filter(day =>day.datetime === inputValue);

    console.log(filteredData);

    // Loop through each data
    // Add values along with the td tag
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
