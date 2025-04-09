document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('open');
        mainNav.classList.toggle('open');
    });

    const ipssChartContainer = document.getElementById('ipssChart').parentNode;
    const significantImprovementChartContainer = document.getElementById('significantImprovementChart').parentNode;

    let ipssChartInstance = null;
    let significantImprovementChartInstance = null;

    const ipssObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !ipssChartInstance) {
                createIpssChart();
                ipssObserver.unobserve(ipssChartContainer);
            }
        });
    });

    const significantImprovementObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !significantImprovementChartInstance) {
                createSignificantImprovementChart();
                significantImprovementObserver.unobserve(significantImprovementChartContainer);
            }
        });
    });

    function createIpssChart() {
        const ipssCtx = document.getElementById('ipssChart').getContext('2d');
        ipssChartInstance = new Chart(ipssCtx, {
            type: 'bar',
            data: {
                labels: ['Uroxel', 'Плацебо', 'Стандартне лікування'],
                datasets: [{
                    label: 'Середня зміна балу IPSS',
                    data: [-9.5, -3.5, -5.1],
                    backgroundColor: [
                        'rgba(0, 123, 255, 0.7)', // Blue
                        'rgba(108, 117, 125, 0.7)', // Grey
                        'rgba(220, 53, 69, 0.7)' // Red
                    ],
                    borderColor: [
                        'rgba(0, 123, 255, 1)',
                        'rgba(108, 117, 125, 1)',
                        'rgba(220, 53, 69, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Зміна балів (зниження)'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += Math.abs(context.parsed.y).toFixed(1) + ' балів';
                                }
                                return label;
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    function createSignificantImprovementChart() {
        const significantImprovementCtx = document.getElementById('significantImprovementChart').getContext('2d');
        significantImprovementChartInstance = new Chart(significantImprovementCtx, {
            type: 'bar',
            data: {
                labels: ['Uroxel', 'Плацебо', 'Стандартне лікування'],
                datasets: [{
                    label: 'Частка пацієнтів зі значним поліпшенням',
                    data: [82, 32, 45],
                    backgroundColor: [
                        'rgba(25, 135, 84, 0.7)', // Green
                        'rgba(108, 117, 125, 0.7)', // Grey
                        'rgba(255, 193, 7, 0.7)' // Yellow
                    ],
                    borderColor: [
                        'rgba(25, 135, 84, 1)',
                        'rgba(108, 117, 125, 1)',
                        'rgba(255, 193, 7, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Частка пацієнтів (%)'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + '%';
                                }
                                return label;
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Почати спостереження за контейнерами графіків
    ipssObserver.observe(ipssChartContainer);
    significantImprovementObserver.observe(significantImprovementChartContainer);
});