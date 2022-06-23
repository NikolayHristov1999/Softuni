const host = 'http://localhost:3030'

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);
        if (response.ok != true) {
            if (response.status == 403) {
                sessionStorage.removeItem('userData');
            }
            const err = await response.json();
            throw new Error(err.message);
        }
        if (response.status == 204) {
            return response;
        }

        return response.json();

    } catch (err) {
        alert(err.message);
        throw err;
    }

}

function createOptions(method = "GET", data) {
    const options = {
        method,
        headers: {}
    }
    if (data != undefined) {
        options.headers['content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        options.headers['X-Authorization'] = userData.token;
    }
    return options;
}

export async function get(path) {
    return request(path, createOptions());
}

export async function post(path, data) {
    return request(path, createOptions('post', data));
}

export async function put(path, data) {
    return request(path, createOptions('put', data));
}

export async function del(path) {
    return request(path, createOptions('delete'));
}

export async function login(email, password) {
    const result = await post('/users/login', { email, password });
    setUserData(result.email, result._id, result.accessToken);
}

export async function register(email, password) {
    const result = await post('/users/register', { email, password });
    setUserData(result.email, result._id, result.accessToken);
}

export async function logout(){
    await get('/users/logout');
    sessionStorage.removeItem('userData'); 
}

function setUserData(email, id, token) {
    const userData = {
        email,
        token,
        id,
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));
}
