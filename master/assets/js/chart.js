const token = localStorage.getItem('token')
const baseURL = 'https://costmanager.vinirodrigues.com'

let values = []
let days = []

var toastMixin = Swal.mixin({
  toast: true,
  icon: 'success',
  title: 'General Title',
  animation: false,
  position: 'top-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

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

const newTransaction = async (e) => {
  e.preventDefault
  const value = document.querySelector("#value").value
  const type = document.querySelector("#select").value
  if (value && type) {
    try {

      await axios.post(`${baseURL}/transaction`, {
        value: value,
        type: type,
        date: new Date(Date.now())
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      toastMixin.fire({
        title: 'Cadastro realizado com sucesso!',
        icon: 'success'
      });

      getTransactions()

    } catch (err) {
      toastMixin.fire({
        title: 'Erro ao cadastrar',
        icon: 'error'
      });
    }
  } else {
    toastMixin.fire({
      title: 'Confirme os dados',
      icon: 'error'
    });
  }
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  window.location.href = '/gerenciador-de-gastos/login.html'
}


document.getElementById('newTransaction').addEventListener(
  'click', newTransaction, false
);

document.getElementById('logout').addEventListener(
  'click', logout, false
);


