
function fetchData(method){
    switch (method){

        case 'worker':
            fetchDataWorker();
            break;
        case 'callback':
            fetchDataCallback();
            break;
        case 'promise':
            fetchDataPromise();
            break;
        case 'async-await':
            fetchDataAsyncAwait();
            break;

    }
}


const userCardsContainer = document.getElementById('user-cards');

function generateUserCard(user){
    const card=document.createElement('div');
    card.classList.add('user-card');
    card.innerHTML=`
    <div>
    <img src="${user.image}" alt=""/> 
    </div>
    <div>
        <div><h3>Name: ${user.firstName+" "+user.lastName} </h3></div>
        <div>University: ${user.university} </div>
        <div>Email: ${user.email} </div>
        <div>Phone: ${user.phone} </div>
        <div>Brith Date: ${user.birthDate} </div>
    </div>
    `;
    return card;
}


fetch('https://dummyjson.com/users')
    .then(respose=>respose.json())
    .then(users=>{
        // console.log(users.users)
        users.users.forEach(user=>{
            const card=generateUserCard(user);
            userCardsContainer.appendChild(card);
        })

    }).catch(error=>{
        console.log("Error fetching data:",error);
    });
