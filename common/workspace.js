const workspace = new (function(){
    const _this = this;
    const root = document.getElementById("workspace");

    const opt = {

    }
    const initData = {
        viewStatus : 'max'
    }
    const itemDataMap = {}

    //== 내부 액션 처리 =================================
    const moveEvent = (function(){
        let dim = undefined;
        let offsetX = undefined;
        let offsetY = undefined;
        let targetWindow = undefined;

        function mousedown(e) {
            if(e.buttons === 1) {
                initial();
                offsetX = e.offsetX;
                offsetY = e.offsetY;

                targetWindow = e.target.closest('.window');
            }
        }

        function initial() {
            dim = document.createElement('div');
            dim.style.position = 'absolute';
            dim.style.top = '0px';
            dim.style.left = '0px';
            dim.style.bottom = '0px';
            dim.style.right = '0px';

            dim.addEventListener('mousemove', mousemove);
            dim.addEventListener('mouseup', mouseup);
            document.body.appendChild(dim);
        }

        function release() {
            document.body.removeChild(dim);

            dim = undefined;
            offsetX = undefined;
            offsetY = undefined;
            targetWindow = undefined;
        }

        function mouseup() {
            release();
        }

        function mousemove(e) {
            if(e.buttons === 1){
                targetWindow.style.top = `${e.clientY - offsetY}px`;
                targetWindow.style.left = `${e.clientX - offsetX}px`;
            } else {
                release();
            }

        }

        return {
            mousedown : mousedown
        }
    })();
    const fnMaximum = function(e){
        const targetWindow = e.target.closest('.window');

        const id = targetWindow.dataset.dataid;
        itemDataMap[id].restoreData = {
            top : targetWindow.style.top,
            left : targetWindow.style.left,
            width : targetWindow.style.width,
            height : targetWindow.style.height
        }

        targetWindow.style.top = `${0}px`;
        targetWindow.style.left = `${0}px`;
        targetWindow.style.width = `${root.offsetWidth}px`;
        targetWindow.style.height = `${root.offsetHeight}px`;
    }

    const fnMinimum = function(e){
        const targetWindow = e.target.closest('.window');

        const id = targetWindow.dataset.dataid;
        itemDataMap[id].restoreData = {
            top : targetWindow.style.top,
            left : targetWindow.style.left,
            width : targetWindow.style.width,
            height : targetWindow.style.height
        }

        targetWindow.addEventListener('transitionend', (e)=>{
            targetWindow.style.display = 'none';
        }, {once : true})
        targetWindow.classList.add('ani_minimum');

    }

    const fnRestore = function(e){
        const targetWindow = e.target.closest('.window');
    }
    const fnClose = function(e){
        const targetWindow = e.target.closest('.window');

    }

    const resizeEvent  = (function(){
        let type = undefined;
        let targetWindow = undefined;
        let orgTop = undefined;
        let orgLeft = undefined;
        let orgWidth = undefined;
        let orgHeight = undefined;

        function getNumberFromPxString(str){
            return Number(str.replace('px', ''));
        }

        function mousedown(e) {
            if(e.buttons === 1) {
                type = e.target.dataset.type;

                initial();
                targetWindow = e.target.closest('.window');
                orgTop = getNumberFromPxString(targetWindow.style.top);
                orgLeft = getNumberFromPxString(targetWindow.style.left);
                orgWidth = getNumberFromPxString(targetWindow.style.width);
                orgHeight = getNumberFromPxString(targetWindow.style.height);

                console.log(orgTop);
                console.log(orgLeft);
                console.log(orgWidth);
                console.log(orgHeight);

            }
        }

        function initial() {
            dim = document.createElement('div');
            dim.style.position = 'absolute';
            dim.style.top = '0px';
            dim.style.left = '0px';
            dim.style.bottom = '0px';
            dim.style.right = '0px';
            dim.style.cursor = `${type}-resize`;

            dim.addEventListener('mousemove', mousemove);
            dim.addEventListener('mouseup', mouseup);
            document.body.appendChild(dim);
        }

        function release() {
            orgTop = undefined;
            orgLeft = undefined;
            orgWidth = undefined;
            orgHeight = undefined;
            type = undefined;
            targetWindow = undefined;
            document.body.removeChild(dim);
        }

        function mouseup() {
            release();
        }

        function mousemove(e) {
            if(e.buttons === 1){
                let top = orgTop;
                let left = orgLeft;
                let width = orgWidth;
                let height = orgHeight;
                switch (type){
                    case 'n':
                        top = e.clientY;
                        height = orgHeight + orgTop - e.clientY;
                        break;
                    case 'e':
                        width = orgWidth + e.clientX - orgLeft - orgWidth;
                        break;
                    case 's':
                        height = orgHeight + e.clientY - orgTop - orgHeight;
                        break;
                    case 'w':
                        left = e.clientX;
                        width = orgWidth + orgLeft - e.clientX;
                        break;
                    case 'nw':
                        top = e.clientY;
                        height = orgHeight + orgTop - e.clientY;
                        left = e.clientX;
                        width = orgWidth + orgLeft - e.clientX;
                        break;
                    case 'ne':
                        top = e.clientY;
                        height = orgHeight + orgTop - e.clientY;
                        width = orgWidth + e.clientX - orgLeft - orgWidth;
                        break;
                    case 'sw':
                        height = orgHeight + e.clientY - orgTop - orgHeight;
                        left = e.clientX;
                        width = orgWidth + orgLeft - e.clientX;
                        break;
                    case 'se':
                        width = orgWidth + e.clientX - orgLeft - orgWidth;
                        height = orgHeight + e.clientY - orgTop - orgHeight;
                        break;
                    default:
                        break;
                }

                targetWindow.style.top = `${top}px`;
                targetWindow.style.left = `${left}px`;
                targetWindow.style.width = `${width}px`;
                targetWindow.style.height = `${height}px`;
            } else {
                release();
            }

        }

        return {
            mousedown : mousedown
        }
    })();
    //== 내부 액션 처리 END =================================

    //== 초기화 =================================
    function init(){
        createWindow("1", "title", {});
    }
    //== 초기화 END =================================

    //== 액션 제어 =================================
    function createWindow(id, name, data){
        const window = document.createElement('div');
        window.classList.add('window');
        window.style.top = '10px';
        window.style.width = '400px';
        window.style.height = '400px';
        window.dataset.dataid = id;

        createTitleBar(window, id, name, data);
        createResizeBar(window, id, name, data);
        createContent(window, id, name, data);

        root.appendChild(window);
        itemDataMap[id] = data;
    }
    function createTitleBar(window, id, name, data){
        const titleBar = document.createElement('div');
        titleBar.classList.add('title-bar');

        const title = document.createElement('div');
        title.classList.add('title');
        title.innerText = name;
        title.addEventListener('mousedown', moveEvent.mousedown);
        titleBar.appendChild(title);

        const minBtn = document.createElement('div');
        minBtn.classList.add('btn');
        minBtn.classList.add('fnMin');
        minBtn.innerText = 'm';
        minBtn.addEventListener('click', fnMinimum);
        titleBar.appendChild(minBtn);
        const maxBtn = document.createElement('div');
        maxBtn.classList.add('btn');
        maxBtn.classList.add('fnMax');
        maxBtn.addEventListener('click', fnMaximum);
        maxBtn.innerText = 'M';
        titleBar.appendChild(maxBtn);
        const restoreBtn = document.createElement('div');
        restoreBtn.classList.add('btn');
        restoreBtn.classList.add('fnRestore');
        restoreBtn.addEventListener('click', fnRestore);
        restoreBtn.innerText = 'R';
        titleBar.appendChild(restoreBtn);
        const closeBtn = document.createElement('div');
        closeBtn.classList.add('btn');
        closeBtn.classList.add('fnClose');
        closeBtn.addEventListener('click', fnClose);
        closeBtn.innerText = 'C';
        titleBar.appendChild(closeBtn);

        window.appendChild(titleBar);
    }

    function createResizeBar(window, id, name, data){
        const resizeBarCode = ['n', 'e', 's', 'w', 'nw', 'ne', 'sw', 'se'];
        resizeBarCode.forEach((code)=>{
            const resizeBar = document.createElement('div');
            resizeBar.classList.add('resize-bar');
            resizeBar.classList.add(code);
            resizeBar.dataset.type = code;
            resizeBar.addEventListener('mousedown', resizeEvent.mousedown);
            window.appendChild(resizeBar);
        });
    }

    function createContent(window, id, name, data){
        const content = document.createElement('div');
        content.classList.add('content');

        window.appendChild(content);
    }
    //== 액션 제어 END =================================

    //== 외부 인터페이스 =================================
    function push(){

    }

    function remove(){

    }
    //== 외부 인터페이스 END =================================


    init();
    return {
        push : push,
        remove : remove
    }
})();