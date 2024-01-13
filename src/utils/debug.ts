import { debug } from "console";

export function EndymionDebug(id:string | undefined) {

    let parent = document.getElementById(id as string);
    if(parent !== null){
        parent.appendChild(createDebugBox());
    }else{
        document.body.appendChild(createDebugBox())
    }
    function createDebugBox() {
        console.log('creating debug box');
        var div = document.createElement('div');
        div.id = "debug-box";
        div.style.width = '100%';
        div.style.height = '300px';
        div.style.backgroundColor = 'white';
        div.style.border = '1px solid black';
        div.style.overflow = 'scroll';
        div.style.display = 'none';
        div.style.marginTop = '300px';
        return div;
    }

}
    
export function consoleLog(message: object, time: number = 20) {
    var debugBox = document.getElementById("debug-box") as HTMLDivElement;
    var text = document.createTextNode(JSON.stringify(message));
    var p = document.createElement('p');
    p.appendChild(text);
    debugBox.appendChild(p);
    debugBox.style.display = 'block';
    setTimeout(() => {
        debugBox.style.display = 'none';
    }, time*1000);
}
