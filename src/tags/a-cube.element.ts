import { Endymion } from '../endymion';
import { Color } from '../endymion.types';
import { checkValueForColor } from '../utils/color-utils';
class ACube extends HTMLElement{
    endy:Endymion = new Endymion();
    objectId:number = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    debugBox!:HTMLDivElement;

    static observedAttributes = ["color"];

    constructor(){
        super();
    }

    connectedCallback(){
        this.debugBox = this.crateDebugBox();
        this.endy.createObject(this.objectId, 'cube', {x: 0, y: 0, z: 0}, {x: 45, y: 45, z: 45}, {x: 1, y: 1, z: 1});
        this.renderPresets();
    }

    attributeChangedCallback(name:string, oldValue:any, newValue:any){
        switch(name){
            case 'color':
                var color = checkValueForColor(newValue);
                if(color !== false){
                    this.endy.setColor(this.objectId, color as Color);
                } 
                break;
            case 'position':
                    
                break;
            case 'rotation':

                break;
            case 'scale':
                    
                break;

        }
    }

    private renderPresets(){
        var color = this.getAttribute('color');
        if(color){
            this.preset('color', color);
        }
        var position = this.getAttribute('position');
        if(position){
            this.preset('position', position);
        }
        var rotation = this.getAttribute('rotation');
        if(rotation){
            this.preset('rotation', rotation);
        }
        var scale = this.getAttribute('scale');
        if(scale){
            this.preset('scale', scale);
        }
    }
    private preset(property: 'color' | 'position' | 'rotation' | 'scale', value: any) {
        this.setAttribute(property, value);
    }
    private crateDebugBox() {
        var shadow = this.attachShadow({ mode: 'closed' });
        var div = document.createElement('div');
        div.style.width = '100%';
        div.style.height = '300px';
        div.style.backgroundColor = 'white';
        div.style.border = '1px solid black';
        div.style.overflow = 'scroll';
        div.style.display = 'none';
        div.style.marginTop = '300px';
        shadow.appendChild(div);
        return div;
    }

    private consoleLog(message: object) {
        this.debugBox.innerHTML = JSON.stringify(message);
        this.debugBox.style.display = 'block';
        setTimeout(() => {
            this.debugBox.style.display = 'none';
        }, 7000);
    }
     
}
export default ACube;
