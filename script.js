const apiUrl = "https://dummyjson.com/users";
let userCardsContainer = document.getElementById('user-cards');

function generateUserCard(user) {
    const card = document.createElement('div');
    card.classList.add('user-card');
    card.innerHTML = `
    <div>
    <img src="${user.image}" alt=""/> 
    </div>
    <div>
        <div><h3>Name: ${user.firstName + " " + user.lastName} </h3></div>
        <div>University: ${user.university} </div>
        <div>Email: ${user.email} </div>
        <div>Phone: ${user.phone} </div>
        <div>Brith Date: ${user.birthDate} </div>
    </div>
    `;
    return card;
}

function dataAppendToCard(data)
{
    data = data.users;
    // console.log(data);
    data.forEach(user => {
        
        const card = generateUserCard(user);
        userCardsContainer.appendChild(card);
    });
}




// Fetch data using Worker
let fetchWorker;
function fetchDataWithWorker() {
    if (fetchWorker) {
        fetchWorker.terminate();
    }

    fetchWorker = new Worker("fetchWorker.js");
    // Send message to the worker with the API URL
    fetchWorker.postMessage(apiUrl);

    // Listen for messages from worker.js
    fetchWorker.onmessage = function (event) {
        const data = event.data;
        dataAppendToCard(data);
    };
};


// Fetch data using callback
function fetchDataCallback(callback) {
    fetch(apiUrl)
        .then(res=>res.json())
        .then(data=>callback(data))
        .catch(error=>{
            console.log("Error fetch data in callback method ",error)
        })
}

function fetchDataWithCallback() {
    fetchDataCallback(dataAppendToCard); 
}


// Fetch data using Promise 
function fetchDataPromise(){
    return new Promise((resolve,reject)=>{
        fetch(apiUrl)
            .then(res=>{
                if(!res.ok){
                    throw new Error("Error resoponse in promise");
                }
                return res.json();
            })
            .then(data=>{
                resolve(data);
            })
            .catch(error=>{
                reject(error);
            });
    });
};

function fetchDataWithPromise(){

    fetchDataPromise()
        .then(data=>{
            dataAppendToCard(data);
        })
        .catch(error=>{
            console.error('Error fetching data Promise: ', error);
        })

}


// Fetch data using Async-await
async function fetchDataWithAsyncAwait(){
    try {
        const res=await fetch(apiUrl);
        const data=await res.json();
        dataAppendToCard(data);
        
    } catch (error) {
        console.log("🚀 ~ fetchDataWithAsyncAwait ~ error:", error)
    }
}


alert("Click any method for view users list")
let navbarBtn=["worker-btn","callback-btn","promise-btn","async-await-btn"];

function fetchData(method) {
    
    userCardsContainer.innerHTML = '';

    for(let i=0;i<navbarBtn.length;i++)
    {
        let btn=document.getElementById(navbarBtn[i]);
        if(btn.classList.contains("active-button"))
        {
            btn.classList.remove("active-button");
        }
        let activBtn=method+"-btn";
        if(activBtn===navbarBtn[i])
        {
            btn.classList.add("active-button");
        }
    }


    switch (method) {

        case 'worker':
            fetchDataWithWorker();
            
            break;
        case 'callback':
            fetchDataWithCallback();
          
            break;
        case 'promise':
            fetchDataWithPromise();
           
            break;
        case 'async-await':
            fetchDataWithAsyncAwait();
            break;

    }
}