/**
 * 실행중인 Object를 관리
 */
const task = (function (o, properties){
    const allowOrigin = ["http://localhost:63342", "http://192.168.1.161:8080"];

    const taskMap = { }
    let wid = 1;
    //== 초기화 =================================
    function constructor(){
        initMessageHandler();
    }

    function initMessageHandler(){
        window.addEventListener('message', (e)=>{
            if(allowOrigin.indexOf(e.origin) === -1) return;

        });
    }
    //== 초기화 END =================================

    //== 내부 액션 처리 =================================
    //== 내부 액션 처리 END =================================

    //== 액션 제어 =================================
    //== 액션 제어 END =================================

    //== 외부 인터페이스 =================================
    function init(){
        constructor();
    }
    //== 외부 인터페이스 END =================================

    //== 내부 Object =================================
    //== 내부 Object END =================================

    return {
        init : init
    }
})();