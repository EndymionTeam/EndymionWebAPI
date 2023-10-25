
export function EndymionDebug() {

    document.body.appendChild(createDebugBox())

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
    
export function consoleLog(message: object) {
    var debugBox = document.getElementById("debug-box") as HTMLDivElement;
    debugBox.innerHTML = JSON.stringify(message);
    debugBox.style.display = 'block';
    setTimeout(() => {
        debugBox.style.display = 'none';
    }, 20000);
}