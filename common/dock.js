const dock = (function(){

    const root = document.getElementById("dock");
    const opt = {
        position : 'left'
    }
    root.classList.add(opt.position);

    function eventInit(){

    }

    function changePosition(e) {
        console.log(e);
        root.classList.remove(opt.position);
        opt.position = e.detail.position;
        root.classList.add(opt.position);
    }

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
        wrap.appendChild(itemBar);

        const item3 = document.createElement('div');
        item3.classList.add("item");
        item3.innerText = '다'
        wrap.appendChild(item3);
    }

    function push(){

    }

    function remove(){

    }
    /*
    function position(pos){
        switch (pos){
            case 'top':

                break;
            case 'top':
                break;
            case 'top':
                break;
            case 'top':
                break;
            default:
                throw ''
        }
    }
    */

    init();
    return {
        push : push,
        remove : remove
    }
})();

/*
document.getElementById('dock').dispatchEvent(new CustomEvent('changePosition', {detail: {position:'left'}}))
 */