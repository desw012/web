const dockItems = [
    {
        id : 'TEST',
        name : 'TEST',
        actionMessage : task.MESSAGE_TYPE.EXECUTE,
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
    workspace.init();
    dock.init()
    task.init();
    let id = 1;

    dockItems.forEach((item)=>{
        dock.push(item.id, item.name, item);
    });
})();