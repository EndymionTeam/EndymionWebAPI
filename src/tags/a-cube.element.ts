import { EndymionCore } from '../endymion/endymion-core';
import { Color } from '../endymion/endymion.types';
import { checkValueForColor } from '../utils/color-utils';
class ACube extends HTMLElement{
    
    endy:EndymionCore = new EndymionCore();
    objectId:number = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

    static observedAttributes = ["color"];

    constructor(){
        super();
    }

    connectedCallback(){
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
    
}
export default ACube;
