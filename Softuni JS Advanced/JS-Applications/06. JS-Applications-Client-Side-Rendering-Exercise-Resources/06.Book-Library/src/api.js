async function request(url, options) {
    try {
        const response = await fetch(url, options);
        if (response.ok != true) {
            const message = await response.json();
            throw new Error(message);
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

function createOptions(method = 'GET', data) {
    const obj = { method, headers: {} };
    if (data != undefined) {
        obj.headers = {
            'content-type': 'application/json'
        };
        obj.body = JSON.stringify(data);
    }

    return obj;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(url){
    return request(url, createOptions('delete'));
}