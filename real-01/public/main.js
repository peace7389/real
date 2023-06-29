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
            const layout = {
                title: `센서 ${selectedOptionsString}의 측정값`,
                xaxis: {
                    title: '일자',
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
                yaxis: { title: '측정값' },
                width: 950,
                height: 350,
                autosize: true
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




    
