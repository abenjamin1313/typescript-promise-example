"use strict";
// Typscript get JSON data example using promises
function getData(method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            }
            else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}
getData('GET', 'https://jsonplaceholder.typicode.com/users').then(function (data) {
    var todos = JSON.parse(data);
    var output = '';
    for (var _i = 0, todos_1 = todos; _i < todos_1.length; _i++) {
        var todo = todos_1[_i];
        output += "\n          <h4>Name: " + todo.name + "</h4>\n          <h4>username: " + todo.username + "</h4>\n          <h4>Email: " + todo.email + "</h4>\n          <strong>Address Street:" + todo.address.street + "</strong>\n          <strong>" + todo.address.suite + "</strong><br/>\n          <strong>City: " + todo.address.city + "</strong><br/>\n          <strong>Zipcode: " + todo.address.zipcode + "</strong>\n          <br/>\n          <hr/>\n    ";
    }
    document.getElementById('template').innerHTML = output;
}).catch(function (err) {
    console.log(err);
});
