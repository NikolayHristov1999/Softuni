function validate(request) {
    const methods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    const validVersion = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
    const uriReg = /^([\w.]+)$/;
    const messageReg = /[<>\\&'"]+/;
    console.log(!(request.message || request.message == ""));

    if (!request.method || !methods.includes(request.method)) {
        throw new Error("Invalid request header: Invalid Method")
    }

    if (!request.uri || !uriReg.test(request.uri)) {
        throw new Error("Invalid request header: Invalid URI");
    }

    if (!validVersion.includes(request.version)){
        throw new Error('Invalid request header: Invalid Version');
    }

    if (!(request.message || request.message == "") || messageReg.test(request.message)){
        throw new Error("Invalid request header: Invalid Message");
    }
    return request;
}

console.log(validate({
    method: 'POST',
    version: 'HTTP/2.0',
    message: 'rm -rf /*'
}));
