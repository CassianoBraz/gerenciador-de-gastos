const token = localStorage.getItem('token')
const baseURL = 'https://costmanager.vinirodrigues.com'

let values = []
let days = []

const getTransactions = async () => {
    try {
        const response = await axios.get(`${baseURL}/transaction`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const entradas = response.data.map(res => res.type == 'in' ? res.value : null)

        options.series[0].data = entradas
        options.series[1].data = response.data.map(res => res.type == 'out' ? res.value : null)
        let initDay = response.data.map(res => new Date(res.date).getDate())

        options.xaxis.categories = initDay

        console.log(Math.max.apply(null, entradas.map(ent => ent === null ? 0 : Number(ent))))

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

    } catch (err) {

    }
}

var options = {
    series: [{
    name: 'Entradas',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }, {
    name: 'Saidas',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  }],
    chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: [],
  },
  yaxis: {
    title: {
      text: 'R$'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "R$ " + val
      }
    }
  }
  };


getTransactions()