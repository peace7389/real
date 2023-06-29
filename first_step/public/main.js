const url = '/data';

// Get the selector element
const selector = document.getElementById('columns');

// Function to update selected columns
function updateSelectedColumns() {
    // Get the selected value columns
    let selectedColumns = Array.from(selector.selectedOptions, wow => wow.value);

    // Convert selectedColumns array to a string and put it in div tag
    document.getElementById('go').innerHTML = selectedColumns.join(' and ');
}

// Initial update
updateSelectedColumns();

// Update when selection changes
selector.addEventListener('change', updateSelectedColumns);





