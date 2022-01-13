(function (){
    let targetOrigin;
    function receiveMessage(e){
        if(typeof e.data === 'string' && e.data === 'welcome'){
            targetOrigin = e.origin;
            document.addEventListener('mousedown', (e)=>{
                top.postMessage({type: 'focus', name: window.name}, targetOrigin);
            })
        }
        document.removeEventListener('message', receiveMessage);
    }

    window.addEventListener('message', receiveMessage);
    if(top !== window) top.postMessage('hello', '*');
})();