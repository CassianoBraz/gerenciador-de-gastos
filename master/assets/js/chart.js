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

const getCosts = async() => {
  try{
    const response = await axios.get(`${baseURL}/transaction/costs`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const values = response.data.map(res => Number(res.sum))
    options2.series[0].data = values

    
    const categories = response.data.map(res => res.name)
    options2.xaxis.categories = categories

    var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
    chart2.render();
    
    
  }catch(err){
    console.log('opa deu merda')
  }
}

const getPayments = async() => {
  try{
    const response = await axios.get(`${baseURL}/transaction/payments`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const values = response.data.map(res => Number(res.sum))
    options3.series = values

    
    const categories = response.data.map(res => res.name)
    options3.labels = categories

    var chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
    chart3.render();
    
    
  }catch(err){
    console.log('opa deu merda')
  }
}

const getCostTypes = async () => {
  try {
    const response = await axios.get(`${baseURL}/costs`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    response.data.map(res => {
      document.querySelector('#cost_type').insertAdjacentHTML('beforeend', `<option value="${res.id}">${res.name}</option>`)
    })
  }catch(err){

  }      
}

const getPaymentTypes = async () => {
  try{
    const response = await axios.get(`${baseURL}/payment`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    response.data.map(res => {
      document.querySelector('#payment_type').insertAdjacentHTML('beforeend', `<option value="${res.id}">${res.name}</option>`)
    })
  }catch(err){

  }   
}

var options = {
  series: [{
    name: 'Entradas',
    data: [3800]
  }, {
    name: 'Saidas',
    data: [800, 700, 250, 400, 120, 350]
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
    categories: ['10', '11', '12', '13', '14', '15'],
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
        return ("R$ " + val + '\n')
      }
    }
  }
};

var options2 = {
  series: [{
    data: []
  }],
  labels: ['Moradia', 'Alimentação', 'Lazer', 'Energia', 'Água', 'Outros'],
  chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Moradia', 'Alimentação', 'Lazer', 'Energia', 'Água', 'Outros'],
  }
};

var options3 = {
  series: [14, 23, 21, 17, 15],
  chart: {
    type: 'polarArea',
  },
  labels: ['Débito', 'Crédito', 'Ted/Doc', 'Cheque', '    PIX    '],
  stroke: {
    colors: ['#fff']
  },
  fill: {
    opacity: 0.8
  },
  responsive: [{
    breakpoint: 480,
    options: {
      legend: {
        position: 'bottom'
      }
    }
  }]
};

const newTransaction = async (e) => {
  e.preventDefault
  const value = document.querySelector("#value").value
  const type = document.querySelector("#select").value
  const description = document.querySelector('#description').value
  const cost_type = document.querySelector('#cost_type').value
  const payment_type = document.querySelector('#payment_type').value
  if (value && type && description && cost_type && payment_type) {
    try {

      await axios.post(`${baseURL}/transaction`, {
        value: value,
        type: type,
        description: description,
        cost_id: cost_type,
        payment_id: payment_type,
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

getPaymentTypes()
getCostTypes()
getTransactions()
getCosts()
getPayments()

