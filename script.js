const apiUrl = "https://dummyjson.com/users";
const userCardsContainer = document.getElementById('user-cards');

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




// Fetch data using Worker
let fetchWorker;
function fetchDataWorker() {
    if (fetchWorker) {
        fetchWorker.terminate();
    }

    fetchWorker = new Worker("fetchWorker.js");
    // Send message to the worker with the API URL
    fetchWorker.postMessage(apiUrl);

    // Listen for messages from worker.js
    fetchWorker.onmessage = function (event) {
        const data = event.data.users;
        // console.log("Data from worker:", data);

        data.forEach(user => {
            
            const card = generateUserCard(user);
            userCardsContainer.appendChild(card);
        });
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
function handleDataCallback(data){
        data = data.users;
        // console.log("Data from worker:", data);

        data.forEach(user => {
            
            const card = generateUserCard(user);
            userCardsContainer.appendChild(card);
        });
}

function fetchDataWithCallback() {
    fetchDataCallback(handleDataCallback); 
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
function handleDataPromise(data){
    data = data.users;
    console.log(data);
    data.forEach(user => {
        
        const card = generateUserCard(user);
        userCardsContainer.appendChild(card);
    });
}
function fetchDataWithPromise(){

    fetchDataPromise()
        .then(data=>{
            handleDataPromise(data);
        })
        .catch(error=>{
            console.error('Error fetching data Promise: ', error);
        })

}







function fetchData(method) {
    switch (method) {

        case 'worker':
            fetchDataWorker();
            break;
        case 'callback':
            fetchDataWithCallback();
            break;
        case 'promise':
            fetchDataWithPromise();
            break;
        case 'async-await':
            fetchDataAsyncAwait();
            break;

    }
}