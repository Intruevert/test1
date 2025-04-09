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
                labels: ['Uroxel', 'Placebo', 'Tratamiento Estándar'],
                datasets: [{
                    label: 'Cambio Promedio en la Puntuación IPSS',
                    data: [-9.5, -3.5, -5.1],
                    backgroundColor: [
                        'rgba(33, 150, 243, 0.7)', // Azul
                        'rgba(158, 158, 158, 0.7)', // Gris
                        'rgba(244, 67, 54, 0.7)'  // Rojo
                    ],
                    borderColor: [
                        'rgba(33, 150, 243, 1)',
                        'rgba(158, 158, 158, 1)',
                        'rgba(244, 67, 54, 1)'
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
                            text: 'Cambio en Puntos (Reducción)'
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
                                    label += Math.abs(context.parsed.y).toFixed(1) + ' puntos';
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
                labels: ['Uroxel', 'Placebo', 'Tratamiento Estándar'],
                datasets: [{
                    label: 'Proporción de Pacientes con Mejoría Significativa',
                    data: [82, 32, 45],
                    backgroundColor: [
                        'rgba(76, 175, 80, 0.7)',  // Verde
                        'rgba(158, 158, 158, 0.7)', // Gris
                        'rgba(255, 235, 59, 0.7)'  // Amarillo
                    ],
                    borderColor: [
                        'rgba(76, 175, 80, 1)',
                        'rgba(158, 158, 158, 1)',
                        'rgba(255, 235, 59, 1)'
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
                            text: 'Proporción de Pacientes (%)'
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

    // Iniciar la observación de los contenedores de los gráficos
    ipssObserver.observe(ipssChartContainer);
    significantImprovementObserver.observe(significantImprovementChartContainer);
});