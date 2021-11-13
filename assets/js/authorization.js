const baseURL = 'https://costmanager.vinirodrigues.com'
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

            const {token, user} = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/master/dashboard.html'

        } catch (err) {
            
        }

    } else {
        
    }
}
document.getElementById('loginButton').addEventListener(
    'click', login, false
);