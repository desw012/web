const dock = new (function(){
    const _this = this;
    const root = document.getElementById("dock");

    const POSITION = ['top', 'right', 'bottom', 'left'];
    const opt = {
        iconSize : 40,
        position : 'bottom'
    }

    const itemDataMap = {}

    //== 내부 액션 처리 =================================
    const itemBarEvent = (function(){
        const minSize = 20;
        const maxSize = 100;
        let dim = undefined;
        let isVertical  = false;
        let prevScreenX = undefined;
        let prevScreenY = undefined;
        let iconSize = undefined;

        function mousedown(e) {
            if(e.buttons === 1) {
                isVertical = opt.position === 'top' || opt.position === 'bottom' ? true : false;
                initial();
                iconSize = opt.iconSize;
                prevScreenX = e.screenX;
                prevScreenY = e.screenY;
            }
        }

        function initial() {
            dim = document.createElement('div');
            dim.classList.add('dim');
            dim.style.position = 'absolute';
            dim.style.top = '0px';
            dim.style.left = '0px';
            dim.style.bottom = '0px';
            dim.style.right = '0px';
            dim.style.cursor = isVertical ? 'row-resize' : 'col-resize';

            dim.addEventListener('mousemove', mousemove);
            dim.addEventListener('mouseup', mouseup);
            document.body.appendChild(dim);
        }

        function release() {
            document.body.removeChild(dim);

            dim = undefined;
            prevScreenX = undefined;
            prevScreenY = undefined;
            iconSize = undefined;
        }

        function mouseup() {
            release();
        }

        function mousemove(e) {
            if(e.buttons === 1){
                let offset = isVertical ? prevScreenY - e.screenY : e.screenX - prevScreenX;

                if (offset !== 0) {
                    iconSize += offset
                    if(iconSize > maxSize){
                        iconSize = maxSize;
                    }
                    if(iconSize < minSize){
                        iconSize = minSize;
                    }
                    prevScreenX = e.screenX;
                    prevScreenY = e.screenY;
                    setTimeout(resizeIcon, 0, iconSize);
                }
            } else {
                release();
            }

        }

        return {
            mousedown : mousedown
        }
    })();

    const itemAction = function(e){
        const targetWindow = e.target.closest('.item');
        const id = targetWindow.dataset.dataid;
        const data = itemDataMap[id];
        if(data.action && typeof data.action === 'function'){
            data.action.call(e.target, data);
        }
    }
    //== 내부 액션 처리 =================================

    //== 초기화 =================================
    function init(){
        root.classList.add(opt.position);
        root.addEventListener('contextmenu', (e)=>{ e.preventDefault() });

        const wrap = document.createElement('div');
        wrap.classList.add('wrap');
        root.appendChild(wrap);

        createDefaultItem();
        initMessageHandler();
    }

    function initMessageHandler(){
        const allowOrigin = ["http://localhost:63342", "http://192.168.1.161:8080"]
        window.addEventListener("message", (e)=>{
            if(allowOrigin.indexOf(e.origin) === -1) return;

            console.log(e);
        }, false);
    }

    function createDefaultItem(){
        pushItem("DASHBOARD", 'A', { })
        pushItem("SEARCH", 'S', { })
        pushItemBar()
    }
    //== 초기화 END =================================

    //== 액션 제어 =================================
    function changePosition(pos) {
        let position = undefined;
        if(typeof pos === 'string' && POSITION.indexOf(pos) > -1){
            position = pos;
        } else if(typeof pos === 'number' && pos > -1 && pos < POSITION.length){
            position = POSITION[pos];
        }

        if(position === undefined) return;

        root.classList.remove(opt.position);
        opt.position = position;
        root.classList.add(opt.position);
    }

    function resizeIcon(size) {
        opt.iconSize = size;
        root.querySelectorAll('div.wrap div.item').forEach(el=>{
            el.style.width = size + 'px';
            el.style.height = size + 'px';
        });
        switch (opt.position){
            case 'top':
            case 'bottom':
                root.querySelectorAll('div.wrap div.item-bar').forEach(el=>{
                    el.style.height = size + 'px';
                });
                break;
            case 'left':
            case 'right':
                root.querySelectorAll('div.wrap div.item-bar').forEach(el=>{
                    el.style.width = size + 'px';
                });
                break;
            default:
                break;
        }
    }

    function pushItem(id, name, data){
        const itemWrap = document.createElement('div');
        itemWrap.classList.add('item-wrap');
        root.querySelector('div.wrap').appendChild(itemWrap);

        const item = document.createElement('div');
        item.classList.add("item");
        item.dataset.dataid = id;
        item.title = name;
        item.innerText = name;
        if(data.action)  item.addEventListener('click', itemAction)
        itemWrap.appendChild(item);

        itemDataMap[id] = data;
    }

    function pushItemBar(){
        const itemWrap = document.createElement('div');
        itemWrap.classList.add('item-wrap');
        root.querySelector('div.wrap').appendChild(itemWrap);

        const itemBar = document.createElement('div');
        itemBar.classList.add("item-bar");
        itemBar.addEventListener('mousedown', itemBarEvent.mousedown);
        itemWrap.appendChild(itemBar);
    }
    //== 액션 제어 END =================================


    //==외부 인터페이스 =================================
    function push(id, name, data){
        pushItem(id, name, data);
    }
    function remove(id){

    }
    //==외부 인터페이스 END =================================
    return {
        init : init,
        push : push,
        remove : remove
    }
})();