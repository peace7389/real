// Data fetch URL
const url = '/data';

// Dimensions and margins
const margin = { top: 20, right: 30, bottom: 30, left: 60 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Scales and axes
const x = d3.scaleUtc().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Define the line
const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));

// Create the SVG
const svg = d3.select('#chartContainer')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

// Fetch and process the data
d3.json(url).then(data => {
    // Parse dates and cast values to Number
    data.forEach(d => {
        d.time = new Date(d.time);
        for (let key in d) {
            if (key !== 'time') d[key] = +d[key];
        }
    });

    // Get the selector element
    const selector = document.getElementById('columns');

    // Get the selected value columns
    let selectedColumns = Array.from(selector.selectedOptions, option => option.value);

    // Set domains for the scales
    x.domain(d3.extent(data, d => d.time));
    y.domain([
        d3.min(data, d => d3.min(selectedColumns.filter(column => d[column] !== undefined), column => d[column])),
        d3.max(data, d => d3.max(selectedColumns.filter(column => d[column] !== undefined), column => d[column]))
    ]);

    // Draw the x axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Draw the y axis
    svg.append('g')
        .call(d3.axisLeft(y));

    // Draw the lines for selected value columns
    let lines = svg.selectAll('.line')
        .data(selectedColumns)
        .join('path')
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', d => color(d))
        .attr('stroke-width', 2)
        .attr('d', d => line(data.filter(row => row[d] !== undefined).map(row => ({ date: row.time, value: row[d] }))));

    // Function to handle changes in the value column selector
    function handleColumnChange() {
        // Update the selected columns
        selectedColumns = Array.from(selector.selectedOptions, option => option.value);

        // Update the y scale domain
        y.domain([
            d3.min(data, d => d3.min(selectedColumns.filter(column => d[column] !== undefined), column => d[column])),
            d3.max(data, d => d3.max(selectedColumns.filter(column => d[column] !== undefined), column => d[column]))
        ]);

        // Update the lines
        lines.data(selectedColumns)
            .attr('d', d => line(data.filter(row => row[d] !== undefined).map(row => ({ date: row.time, value: row[d] }))));
    }

    // Add event listener for the value column selector
    selector.addEventListener('change', handleColumnChange);
}).catch(console.error);




    
