const dock = new (function(){
    const dock = this;

    const POSITION = ['top', 'right', 'bottom', 'left'];

    const root = document.getElementById("dock");
    const opt = {
        iconSize : 40,
        position : 'bottom'
    }
    root.classList.add(opt.position);

    function eventInit() {

    }

    const EVENT = (function(){

    })();

    const itemBarEvent = (function(){
        const minSize = 20;
        const maxSize = 100;
        let dim = undefined;
        let isDrag = false;
        let isVertical  = false;
        let barSelectPositionRadio = undefined;
        let prevScreenX = undefined;
        let prevScreenY = undefined;
        let iconSize = undefined;

        function mousedown(e) {
            if(e.buttons === 1) {
                isVertical = opt.position === 'top' || opt.position === 'bottom' ? true : false;

                initial();
                if(isVertical){
                    barSelectPositionRadio = e.offsetY / e.target.height;
                } else {
                    barSelectPositionRadio = e.offsetX / e.target.width;
                }
                prevScreenX = e.screenX;
                prevScreenY = e.screenY;
            }
        }

        function initial() {
            isDrag = true;
            iconSize = opt.iconSize;

            dim = document.createElement('div');
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
            isDrag = false;
            prevScreenX = undefined;
            prevScreenY = undefined;
            iconSize = undefined;
        }

        function mouseup() {
            release();
        }

        function mousemove(e) {
            if(isDrag){

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

    function init(){
        root.addEventListener("changePosition", changePosition);


        const wrap = document.createElement('div');
        wrap.classList.add('wrap');
        root.appendChild(wrap);

        const item1 = document.createElement('div');
        item1.classList.add("item");
        item1.innerText = '가'
        wrap.appendChild(item1);

        const item2 = document.createElement('div');
        item2.classList.add("item");
        item2.innerText = '나'
        wrap.appendChild(item2);

        const itemBar = document.createElement('div');
        itemBar.classList.add("item-bar");
        itemBar.addEventListener('mousedown', itemBarEvent.mousedown);
        wrap.appendChild(itemBar);

        const item3 = document.createElement('div');
        item3.classList.add("item");
        item3.innerText = '다'
        wrap.appendChild(item3);
    }

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
                    el.style.height = (size - 10) + 'px';
                });
                break;
            case 'left':
            case 'right':
                root.querySelectorAll('div.wrap div.item-bar').forEach(el=>{
                    el.style.width = (size - 10) + 'px';
                });
                break;
            default:
                break;
        }
    }

    function push(){

    }

    function remove(){

    }

    init();
    return {
        resizeIcon : resizeIcon,
        changePosition : changePosition,
        push : push,
        remove : remove
    }
})();