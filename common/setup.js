const dockItems = [
    {
        id : 'TEST',
        name : 'TEST',
        actionMessage : 'execute',
        windowOption : {
            singleWindow : false,
            width : 600,
            height : 800,
            top : 100,
            left : 100
        }
    }
];

(function(){
    const allowOrigin = ["http://localhost:63342", "http://192.168.1.161:8080"]

    workspace.init();
    dock.init()
    task.init();
    let id = 1;

    dockItems.forEach((item)=>{
        dock.push(item.id, item.name, item);
    });

    window.addEventListener("message", (e)=>{
        if(allowOrigin.indexOf(e.origin) === -1) return;

        if(typeof e.data === 'string' && e.data === 'hello'){
            e.source.postMessage('welcome', e.origin);
        } else if(typeof e.data === 'object' && e.data.type.startsWith('task.')){
            //active(e.data.name);
        } else if(typeof e.data === 'object' && e.data.type.startsWith('workspace.')){
            //active(e.data.name);
        } else if(typeof e.data === 'object' && e.data.type.startsWith('dock.')){
            //active(e.data.name);
        } else if(typeof e.data === 'object' && e.data.type.startsWith('menu.')){
            //active(e.data.name);
        } else if(typeof e.data === 'object' && e.data.type == 'focus'){
            postMessage({...e.data, type : workspace.MESSAGE_TYPE.FOCUS}, location.origin );
        } else if(typeof e.data === 'object' && e.data.type == 'execute'){
            task.newInstance(e.data);
            postMessage({...e.data, type : task.MESSAGE_TYPE.EXECUTE}, location.origin );
        }
    }, false);
})();