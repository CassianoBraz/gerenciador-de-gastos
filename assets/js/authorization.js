const baseURL = 'https://costmanager.vinirodrigues.com'

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

const login = async (e) => {
    e.preventDefault
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    if (email && password) {
        try {
            const response = await axios.post(`${baseURL}/sessions`, {
                email: email,
                password: password
            })
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            toastMixin.fire({
                title: 'Login realizado com sucesso!',
                icon: 'success'
            });
            window.location.href = '/gerenciador-de-gastos/master/dashboard.html'
        } catch (err) {
            toastMixin.fire({
                title: 'Login/Senha incorretos',
                icon: 'error'
            });
        }
    } else {
        toastMixin.fire({
            title: 'Login/Senha incorretos',
            icon: 'error'
        });
    }
}

const register = async (e) => {
    e.preventDefault
    const name = document.querySelector('#name_cad').value
    const email = document.querySelector("#email_cad").value
    const password = document.querySelector("#pass_cad").value

    if (email && password && name) {
        try {
            await axios.post(`${baseURL}/users`, {
                name: name,
                email: email,
                password: password
            })

            toastMixin.fire({
                title: 'Usuário criado com sucesso',
                icon: 'success'
            });

            $("#second").fadeOut("fast", function () {
                $("#first").fadeIn("fast");
            });

        } catch (err) {
            toastMixin.fire({
                title: 'Dados incorretos.',
                icon: 'error'
            });
        }
    } else {
        toastMixin.fire({
            title: 'Dados incorretos',
            icon: 'error'
        });
    }
}

document.getElementById('loginButton').addEventListener(
    'click', login, false
);

document.getElementById('registerButton').addEventListener(
    'click', register, false
);