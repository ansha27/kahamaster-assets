// kahatex-charts.js
function createCostBreakdownChart(ctx, vsData, pinkData) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Material Cost', 'Direct Operational', 'Overhead', 'Logistics', 'FOC'],
            datasets: [
                {
                    label: "Victoria's Secret",
                    data: vsData, // e.g., [1906044.79, 266794.01, 96192.83, 32815.36, 3322.46]
                    backgroundColor: 'rgba(211, 47, 47, 0.7)',
                    borderColor: 'rgba(211, 47, 47, 1)',
                    borderWidth: 1
                },
                {
                    label: 'PINK',
                    data: pinkData, // e.g., [1407213.96, 199075.16, 52336.15, 24734.70, 717.86]
                    backgroundColor: 'rgba(2, 136, 209, 0.7)',
                    borderColor: 'rgba(2, 136, 209, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Cost Structure by Brand (USD)',
                    font: { size: 18, family: 'Inter', weight: '600' },
                    padding: { bottom: 20 }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: { family: 'Inter' },
                    bodyFont: { family: 'Inter' },
                    callbacks: {
                        label: (context) => `${context.dataset.label}: $${context.raw.toLocaleString()}`,
                        afterLabel: (context) => {
                            const dataset = context.dataset;
                            const total = dataset.data.reduce((a, b) => a + b, 0);
                            const percent = ((context.raw / total) * 100).toFixed(1);
                            return `${dataset.label} Allocation: ${percent}%`;
                        }
                    }
                },
                legend: {
                    position: 'top',
                    labels: { font: { family: 'Inter', size: 14 } }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'USD',
                        font: { family: 'Inter', size: 14 }
                    },
                    grid: { color: '#e2e8f0' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function createBrandComparisonChart(ctx, vsData, pinkData, labels) {
    new Chart(ctx, {
        type: 'barwat bar',
        data: {
            labels: labels || ['Yarn-Dyed', 'Yarn-Dyed + Metallic', 'Reactive Print', 'Foil Print'],
            datasets: [
                {
                    label: "Victoria's Secret",
                    data: vsData, // e.g., [1089025, 1484079, 768038, 444979]
                    backgroundColor: 'rgba(211, 47, 47, 0.7)',
                    borderColor: 'rgba(211, 47, 47, 1)',
                    borderWidth: 1
                },
                {
                    label: 'PINK',
                    data: pinkData, // e.g., [2261502, 0, 462673, 134338]
                    backgroundColor: 'rgba(2, 136, 209, 0.7)',
                    borderColor: 'rgba(2, 136, 209, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Revenue by Fabric Type & Brand (USD)',
                    font: { size: 18, family: 'Inter', weight: '600' },
                    padding: { bottom: 20 }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: { family: 'Inter' },
                    bodyFont: { family: 'Inter' },
                    callbacks: {
                        label: (context) => `${context.dataset.label}: $${context.raw.toLocaleString()}`,
                        footer: (tooltipItems) => {
                            const vs = tooltipItems[0].raw;
                            const pink = tooltipItems[1].raw;
                            const total = vs + pink;
                            return [
                                `VS: ${((vs / total) * 100).toFixed(1)}% of category`,
                                `PINK: ${((pink / total) * 100).toFixed(1)}% of category`
                            ];
                        }
                    }
                },
                legend: {
                    position: 'top',
                    labels: { font: { family: 'Inter', size: 14 } }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'USD',
                        font: { family: 'Inter', size: 14 }
                    },
                    grid: { color: '#e2e8f0' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function createOperationalGapChart(ctx, actualData, targetData, labels) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels || ['On-Time Delivery (%)', 'Order Accuracy (%)', 'Sample Lead Time (days)', 'FOC Incidents', 'FOC Rate (%)'],
            datasets: [
                {
                    label: 'Actual Performance',
                    data: actualData, // e.g., [18, 99.97, 26, 8, 0.13]
                    backgroundColor: 'rgba(211, 47, 47, 0.7)',
                    borderColor: 'rgba(211, 47, 47, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Target Performance',
                    data: targetData, // e.g., [98, 99, 7, 4, 2]
                    backgroundColor: 'rgba(46, 204, 113, 0.7)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Operational Performance Gaps',
                    font: { size: 18, family: 'Inter', weight: '600' },
                    padding: { bottom: 20 }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: { family: 'Inter' },
                    bodyFont: { family: 'Inter' },
                    callbacks: {
                        label: (context) => {
                            const label = context.dataset.label;
                            const value = context.raw;
                            const index = context.dataIndex;
                            const unit = index === 2 ? 'days' : index === 3 ? 'incidents' : '%';
                            return `${label}: ${value}${unit}`;
                        }
                    }
                },
                legend: {
                    position: 'top',
                    labels: { font: { family: 'Inter', size: 14 } }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Value',
                        font: { family: 'Inter', size: 14 }
                    },
                    grid: { color: '#e2e8f0' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function createWalletShareChart(ctx, kahatexData, competitorData, labels) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels || ['VS Flannel', 'VS Other', 'PINK Flannel', 'PINK Lyocell', 'PINK Celia', 'PINK Other'],
            datasets: [
                {
                    label: 'Kahatex Volume (Yards)',
                    data: kahatexData, // e.g., [1500000, 100000, 1300000, 1200000, 200000, 0]
                    backgroundColor: [
                        'rgba(211, 47, 47, 0.7)',
                        'rgba(211, 47, 47, 0.4)',
                        'rgba(2, 136, 209, 0.7)',
                        'rgba(2, 136, 209, 0.9)',
                        'rgba(2, 136, 209, 0.6)',
                        'rgba(2, 136, 209, 0.3)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Competitor Volume (Yards)',
                    data: competitorData, // e.g., [4000000, 6000000, 0, 0, 0, 1200000]
                    backgroundColor: 'rgba(100, 116, 139, 0.5)',
                    borderColor: 'rgba(100, 116, 139, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Share of Wallet by Category (Yards)',
                    font: { size: 18, family: 'Inter', weight: '600' },
                    padding: { bottom: 20 }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: { family: 'Inter' },
                    bodyFont: { family: 'Inter' },
                    callbacks: {
                        label: (context) => {
                            const label = context.dataset.label || '';
                            const value = context.raw.toLocaleString();
                            const total = context.chart.data.datasets
                                .map(d => d.data[context.dataIndex])
                                .reduce((a, b) => a + b, 0);
                            const share = Math.round((context.raw / total) * 100);
                            return `${label}: ${value} yards (${share}%)`;
                        }
                    }
                },
                legend: {
                    position: 'top',
                    labels: { font: { family: 'Inter', size: 14 } }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Yards',
                        font: { family: 'Inter', size: 14 }
                    },
                    stacked: true,
                    grid: { color: '#e2e8f0' }
                },
                x: {
                    stacked: true,
                    grid: { display: false }
                }
            }
        }
    });
}

function createRecoveryForecastChart(ctx, deliveryData, revenueData, labels) {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels || ['HO24 (Actual)', 'Pre-Holiday Prep (Jul–Aug 2025)', 'Early Holiday (Sep–Oct 2025)', 'Peak Holiday (Nov–Dec 2025)'],
            datasets: [
                {
                    label: 'On-Time Delivery Rate (%)',
                    data: deliveryData, // e.g., [18, 30, 50, 70]
                    borderColor: 'rgba(211, 47, 47, 1)',
                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y',
                    pointRadius: 5,
                    pointHoverRadius: 8
                },
                {
                    label: 'Revenue (USD Millions)',
                    data: revenueData, // e.g., [6.64, 6.8, 7.0, 7.2]
                    borderColor: 'rgba(2, 136, 209, 1)',
                    backgroundColor: 'rgba(2, 136, 209, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y1',
                    pointRadius: 5,
                    pointHoverRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'HO25 Recovery Projection',
                    font: { size: 18, family: 'Inter', weight: '600' },
                    padding: { bottom: 20 }
                },
                legend: {
                    position: 'top',
                    labels: { font: { family: 'Inter', size: 14 } }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: { family: 'Inter' },
                    bodyFont: { family: 'Inter' },
                    callbacks: {
                        label: (context) => {
                            const value = context.raw;
                            const label = context.dataset.label;
                            return `${label}: ${label.includes('Revenue') ? '$' + value.toFixed(2) + 'M' : value + '%'}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    min: 0,
                    max: 100,
                    title: {
                        display: true,
                        text: 'On-Time Delivery %',
                        font: { family: 'Inter', size: 14 }
                    },
                    grid: { color: '#e2e8f0' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    min: 6,
                    max: 8,
                    title: {
                        display: true,
                        text: 'Revenue (USD M)',
                        font: { family: 'Inter', size: 14 }
                    },
                    grid: { drawOnChartArea: false }
                },
                x: {
                    grid: { color: '#e2e8f0' }
                }
            }
        }
    });
}