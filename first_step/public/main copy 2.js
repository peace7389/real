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

    // Set domains for the scales
    x.domain(d3.extent(data, d => d.time));
    y.domain([
        d3.min(data, d => d3.min(Object.values(d).filter(v => typeof v === 'number'))),
        d3.max(data, d => d3.max(Object.values(d).filter(v => typeof v === 'number')))
    ]);

    // Draw the x axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Draw the y axis
    svg.append('g')
        .call(d3.axisLeft(y));

    // Draw one line for each data key (excluding 'time')
    Object.keys(data[0])
        .filter(key => key !== 'time')
        .forEach(key => {
            svg.append('path')
                .datum(data.map(d => ({ date: d.time, value: d[key] })))
                .attr('fill', 'none')
                .attr('stroke', color(key))
                .attr('stroke-width', 2)
                .attr('d', line);
        });

    // Draw the legend
    const legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => `translate(0,${i * 20})`);

    legend.append('rect')
        .attr('x', width - 18)
        .attr('width', 18)
        .attr('height', 18)
        .style('fill', color);

    legend.append('text')
        .attr('x', width - 24)
        .attr('y', 9)
        .attr('dy', '.35em')});
