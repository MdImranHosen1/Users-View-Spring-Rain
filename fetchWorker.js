self.onmessage=function(event){
    const apiUrl=event.data;
    // console.log(apiUrl)
    fetch(apiUrl).then(res=>res.json())
        .then(data=>{
            self.postMessage(data);
        })
        .catch(error=>{
            console.log("🚀 ~ error fetch data worker:", error);
        });
};