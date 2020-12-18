const xlabel = [];
const ylabel = [];
const minTempG = [];
const maxTempG = [];
const DateG = [];
const pressureG = [];


var count = 0;
const limit = 1000;

async function getData() {
    const res = await fetch('https://raw.githubusercontent.com/the-pudding/data/master/mars-weather/mars-weather.csv');
    const data = await res.text();
    //console.log(data);
    const rows = data.split('\n').slice(1)
    rows.forEach(elt=>{
        count=count+1;
        if(count<limit){
        const row = elt.split(',');
        const Date = row[1];
        const minTemp = row[5];
        const maxTemp = row[6];
        const pressure = 6*row[7]/-100;
        DateG.push(Date);
        pressureG.push(pressure)
        minTempG.push(minTemp);
        maxTempG.push(maxTemp);
        console.log(Date,maxTemp);
        //console.log(row);
        }
    })
    //console.log(rows);
}






function chart1(){

    getData();

    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: xlabel,
        datasets: [{
            label: 'Mars Temprature',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
    });
}



function chart2(){

      
    var options = {
        series: [
        {
          name: "High - 2013",
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: "Low - 2013",
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ],
        chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Average High & Low Temperature',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month'
        }
      },
      yaxis: {
        title: {
          text: 'Temperature'
        },
        min: 5,
        max: 40
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
      };

      var chart = new ApexCharts(document.getElementById('chart'), options);
      chart.render();
}



async function chart3(){
    await getData();
    const data = {
        labels: DateG,
        datasets: [{ 
            data: minTempG,
            label: "Min Temperature",
            borderColor: "#3e95cd",
            fill: false
          }, { 
            data: maxTempG,
            label: "Max Temperature",
            borderColor: "#c45850",
            fill: false
          },{ 
            data: pressureG,
            label: "Pressure",
            borderColor: "#a4ca50",
            fill: false
          }

        ]
      }
      const options = {
        title: {
          display: true,
          text: 'Mars weather'
        }
      }
    const ctx = document.getElementById('chart').getContext('2d');
    const myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}

chart3();