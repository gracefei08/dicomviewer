(()=>{
    console.log('back')
    console.log(chrome.extension.getBackgroundPage())
   
})();




  /*
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // 2. A page requested user data, respond with a copy of `user`
    console.log('background')
    console.log(message)
    //if (message === 'get-user-data') {
     // sendResponse("send data");
    //}
  });**/