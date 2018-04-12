"use strict"

// Typscript get JSON data example using promises

function getData(method, url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onload = function(){
        if(this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        }else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function(){
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
}

getData('GET', 'https://jsonplaceholder.typicode.com/users').then(function(data){
  let todos = JSON.parse(data);
  let output = '';
  for(let todo of todos){
    output += `
          <h4>Name: ${todo.name}</h4>
          <h4>username: ${todo.username}</h4>
          <h4>Email: ${todo.email}</h4>
          <strong>Address Street:${todo.address.street}</strong>
          <strong>${todo.address.suite}</strong><br/>
          <strong>City: ${todo.address.city}</strong><br/>
          <strong>Zipcode: ${todo.address.zipcode}</strong>
          <br/>
          <hr/>
    `;
  }

  document.getElementById('template').innerHTML = output;
}).catch(function(err){
  console.log(err);
});
