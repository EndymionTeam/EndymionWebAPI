
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

// var value = {
//     rotate: {
//         x: 0,
//         y: 0,
//         z: 0
//     },
//     position: {
//         x: 0,
//         y: 0,
//         z: 0
//     },
//     scale: {
//         x: 0,
//         y: 0,
//         z: 0
//     }
// }
// var step = 5;
// var spiritello;

// modify = (property, axe, value) => {

//     consoleLog({value});
//     switch(property){
//         case 'rotate':
//             switch(axe){
//                 case 'x':
//                     endymion.with(spiritello).setRotX(value.rotate.x).apply();
//                     break;
//                 case 'y':
//                     endymion.with(spiritello).setRotY(value.rotate.y).apply();
//                     break;
//                 case 'z':
//                     endymion.with(spiritello).setRotZ(value.rotate.z).apply();
//                     break;
//             }
//             break;
//         case 'position':
//             switch(axe){
//                 case 'x':
//                     endymion.with(spiritello).setPosX(value.position.x).apply();
//                     break;
//                 case 'y':
//                     endymion.with(spiritello).setPosY(value.position.y).apply();
//                     break;
//                 case 'z':
//                     endymion.with(spiritello).setPosZ(value.position.z).apply();
//                     break;
//             }
//             break;
//         case 'scale':
//             switch(axe){
//                 case 'x':
//                     endymion.with(spiritello).setScaleX(value.scale.x/10).apply();
//                     break;
//                 case 'y':
//                     endymion.with(spiritello).setScaleY(value.scale.y/10).apply();
//                     break;
//                 case 'z':
//                     endymion.with(spiritello).setScaleZ(value.scale.z/10).apply();
//                     break;
//             }
//             break;
//     }
// }
// increase = ()=>{
//     let property = document.getElementById('property').value;
//     let axe = document.getElementById('axe').value;
//     value[property][axe] += step;
//     modify(property, axe, value);
// }
// decrease = ()=>{
//     let property = document.getElementById('property').value;
//     let axe = document.getElementById('axe').value;
//     value[property][axe] -= step;
//     modify(property, axe, value);
// }

// <div class="en-debug-button-container">
// <button onclick="decrease()">-</button>
// <div class="en-debug-select-container">
//     <select id="property">
//         <option value="rotate">rotate</option>
//         <option value="position">position</option>
//         <option value="scale">scale</option>
//     </select>
//     <select id="axe">
//         <option value="x">X</option>
//         <option value="y">Y</option>
//         <option value="z">Z</option>
//     </select>
// </div>
// <button onclick="increase()">+</button>
// </div>

// <style>
// .en-debug-button-container{
//     display:flex;
//     position: absolute;
//     bottom: 200px;
//     width: 100%;
//     justify-content: center;
//     align-items: center;
    
// }
// .en-debug-button-container .en-debug-select-container{
//     display: flex;
//     flex-direction: column;
// }
// .en-debug-button-container button,
// .en-debug-button-container select{
//     font-size: 48px !important;
//     text-align: center;
// }
// </style>