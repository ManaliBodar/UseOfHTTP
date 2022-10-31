const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

//using promise
function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";

    xhr.onload = function () {
        if(xhr.status >= 200 && xhr.status<300)
        {
            resolve(xhr.response);
        }
        else{
            reject(new Error('Something went wrong'));
        }
      // const listOfPosts = JSON.parse(xhr.response);
    };

    xhr.onerror = function () {
        reject(new Error('Failed to send request!'));
    };

    xhr.send(JSON.stringify(data));
  });

  return promise;
}

async function fetchPost() {
    try{
        const responseData = await sendHttpRequest(
            'GET',
            'https://jsonplaceholder.typicode.com/posts'
        );
        const listOfPosts = responseData ;
        for (const post of listOfPosts) {
          const postEl = document.importNode(postTemplate.content, true);
          postEl.querySelector("h2").textContent = post.title.toUpperCase();
          postEl.querySelector("p").textContent = post.body;
          postEl.querySelector('li').id = post.id;
          listElement.append(postEl);
        }
    }
    catch(error)
    {
        alert(error.message);
    }
  
}


//for creating a new post
async function createPost(title,content)
{
    const userId = Math.random();
    const post ={
        title :title,
        body:content,
        userId:userId
    };

    sendHttpRequest('POST','https://jsonplaceholder.typicode.com/posts',post);
}

//for fetching post on click button
fetchButton.addEventListener('click',fetchPost);
//adding post
form.addEventListener('submit',event =>{
    event.preventDefault();
    //getting title and content from form
    const enteredTitle = event.currentTarget.querySelector('#title').value;
    const enteredContent = event.currentTarget.querySelector('#content').value;

    createPost(enteredTitle,enteredContent);
});


//for deleting post
postList.addEventListener('click',event =>{
    if(event.target.tagName === 'BUTTON')
    {
        const postId = event.target.closest('li').id;
        sendHttpRequest('DELETE',`https://jsonplaceholder.typicode.com/posts/${postId}`);

    }
});
