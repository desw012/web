/**
 * 실행중인 Object를 관리
 */
const task = (function (o, properties){
    const allowOrigin = ["http://localhost:63342", "http://192.168.1.161:8080"];
    const MESSAGE_TYPE = {
        'EXECUTE' : 'task.execute',
        'KILL' : 'task.kill'
    }

    const taskMap = { }
    let wid = 1;
    //== 초기화 =================================
    function constructor(){
        initMessageHandler();
    }

    function initMessageHandler(){
        window.addEventListener('message', (e)=>{
            if(allowOrigin.indexOf(e.origin) === -1) return;
            if(typeof e.data !== 'object') return;
            if(!e.data.type || e.data.type.startsWith('task.')) return;

            switch (e.data.type) {
                case MESSAGE_TYPE.EXECUTE:
                    break;
                case MESSAGE_TYPE.KILL:
                    break;
            }
        });
    }
    //== 초기화 END =================================

    //== 내부 액션 처리 =================================
    function execute(actionType, actionData, actionOption){

    }
    //== 내부 액션 처리 END =================================

    //== 액션 제어 =================================
    function kill(actionType, id){

    }
    //== 액션 제어 END =================================

    //== 외부 인터페이스 =================================
    function init(){
        constructor();
    }
    //== 외부 인터페이스 END =================================

    //== 내부 Object =================================
    function WindowObject( _wid, _gid, _data ){
        this.wid = _wid;
        this.gid = _gid;
        this.data = _data;
        this.option = new WindowOption();
        this.status = new WindowStatus()
    }

    function WindowOption(){

    }

    function WindowStatus(){

    }
    //== 내부 Object END =================================

    return {
        init : init,
        MESSAGE_TYPE : MESSAGE_TYPE
    }
})();