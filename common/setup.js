(function(){
    workspace.init();
    dock.init()


    let id = 1;
    dock.push( 'TEST', 'TEST', { action : function(data){
        workspace.push(id++, `title${id}`, data);
    }});
})();