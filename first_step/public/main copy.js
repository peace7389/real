fetch('/data')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('myChart').getContext('2d');
        const labels = data.map(row => row.time); // assuming your data has a 'time' property
        
        // Get all the keys in the object excluding 'time'
        const dataKeys = Object.keys(data[0]).filter(key => key !== 'time');

        const datasets = dataKeys.map(key => {
            return {
                label: key,
                data: data.map(row => row[key]),
                // add other properties as needed
            };
        });

        new Chart(ctx, {
            type: 'line', // choose the type of chart you want
            data: {
                labels: labels,
                datasets: datasets,
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: {
                                size: 12
                            },
                            // Custom hover and color settings
                            color: '#000',
                            hoverColor: '#aaa',
                            // Set usePointStyle to true to show actual points in the legend
                            usePointStyle: true,
                        }
                    }
                }
            }
        });
    });

