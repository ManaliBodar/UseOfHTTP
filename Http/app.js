const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");

//create object for XMLHttprequest
const xhr = new XMLHttpRequest();

//pass object into open method with method name and url
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

xhr.responseType = "json";

xhr.onload = function () {
  // const listOfPosts = JSON.parse(xhr.response); //but we already set json type
  const listOfPosts = xhr.response;

  for (const post of listOfPosts) {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector("h2").textContent = post.title.toUpperCase();
    postEl.querySelector("p").textContent = post.body;
    listElement.append(postEl);
  }
};
  

//for sending request
xhr.send();