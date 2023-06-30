const url = '/data?startDate=' + new Date().setMonth(new Date().getMonth()-1);

function drawChart(containerId, selectedOptions) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const startDateParam = `startDate=${oneMonthAgo.toISOString()}`;

    fetch(`${url}?${startDateParam}`)
        .then(response => response.json())
        .then(data => {

            console.log("Client received data:", data);

            data.forEach(d => {
                d.time = new Date(d.time);
                for (let key in d) {
                    if (selectedOptions.includes(key)) d[key] = +d[key];
                }
            });










            const lines = selectedOptions.map(option => {
                return {
                    x: data.map(d => d.time),
                    y: data.map(d => d[option]),
                    mode: 'lines',
                    name: option,
                };
            });

            const selectedOptionsString = selectedOptions.join(', ');
            const hoverAreas = document.querySelectorAll('.hoverarea_p, .hoverArea, .hoverarea_t');

           

            let exceededCount = 0;

            hoverAreas.forEach(element => {
                const upperThreshold = parseFloat(element.getAttribute('data-upper-threshold'));
                const lowerThreshold = parseFloat(element.getAttribute('data-lower-threshold'));
                const measurementValue = data[data.length - 1][element.getAttribute('data-options')];
            
                if (measurementValue > upperThreshold || measurementValue < lowerThreshold) {
                    exceededCount++;
                }
            });
            
            // Use the exceededCount variable anywhere in the program
            console.log(exceededCount);

            const allElement = document.querySelector('#all');
if (allElement) {
    allElement.textContent = `이상 ${exceededCount}개`;
    allElement.style.fontSize = '15px'; // Adjust the font size as needed
}






            const shapes = Array.from(hoverAreas).filter(element => {
                return selectedOptions.includes(element.getAttribute('data-options'));
            }).map(element => {
                const upperThreshold = element.getAttribute('data-upper-threshold');
                const lowerThreshold = element.getAttribute('data-lower-threshold');
                
                return [
                    {
                        type: 'line',
                        xref: 'x',
                        yref: 'y',
                        x0: data[0].time,
                        x1: data[data.length - 1].time,
                        y0: upperThreshold,
                        y1: upperThreshold,
                        line: { color: 'red', width: 2, dash: 'dot' }
                    },
                    {
                        type: 'line',
                        xref: 'x',
                        yref: 'y',
                        x0: data[0].time,
                        x1: data[data.length - 1].time,
                        y0: lowerThreshold,
                        y1: lowerThreshold,
                        line: { color: 'blue', width: 2, dash: 'dot' }
                    }
                ];
            }).flat();

            const layout = {
                title: `Sensor ${selectedOptionsString} Measurements`,
                xaxis: {
                    title: 'Date',
                    rangeselector: {
                        buttons: [
                            {
                                count: 1,
                                label: '1d',
                                step: 'day',
                                stepmode: 'backward'
                            },
                            {
                                count: 7,
                                label: '1w',
                                step: 'day',
                                stepmode: 'backward'
                            },
                            {
                                count: 1,
                                label: '1m',
                                step: 'month',
                                stepmode: 'backward'
                            },
                        ]
                    }
                },
                yaxis: { title: 'Measurement Value' },
                width: 950,
                height: 350,
                autosize: true,
                shapes: shapes
            };

            Plotly.newPlot(containerId, lines, layout);
        })
        .catch(console.error);
}

document.querySelectorAll('.hoverArea, .hoverarea_t, .hoverarea_p').forEach(hoverArea => {
    hoverArea.addEventListener('mouseenter', () => {
        const selectedOptions = hoverArea.getAttribute('data-options').split(',');
        
        const containerId = 'chartContainer';
        
        drawChart(containerId, selectedOptions);
        document.getElementById(containerId).style.display = 'block';
    });
});

// Add this block to hide the chart when clicking outside
document.addEventListener('click', function(event) {
    const containerId = 'chartContainer';
    const container = document.getElementById(containerId);
    if (container && !container.contains(event.target)) {
        container.style.display = 'none';
    }
});

let lastTopPosition = 0;

document.querySelectorAll('.hoverArea, .hoverarea_t, .hoverarea_p').forEach(hoverArea => {
    const dataOptionsText = document.createElement('span');
    dataOptionsText.innerHTML = hoverArea.getAttribute('data-options');
    dataOptionsText.classList.add('dataOptionsText');

    hoverArea.appendChild(dataOptionsText);

    dataOptionsText.style.left = '0px';
    dataOptionsText.style.top = '0px';
});










    
