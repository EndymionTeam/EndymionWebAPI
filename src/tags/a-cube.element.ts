import { Endymion } from '../endymion';
import { checkValueForColor } from '../utils/color-utils';
class ACube extends HTMLElement{
    endy:Endymion = new Endymion();
    objectId:number = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    defaultColor:string = '#FFFFFF';
    defaultTris: { x: number; y: number; z: number; }[] = [{x: 0, y: 0, z: 0},{x: 1, y: 1, z: 1}];
    static observedAttributes = ['color', 'position', 'rotation', 'scale'];

    constructor(){
        super();
        this.endy.createObject(this.objectId, 'cube', this.defaultTris[0], this.defaultTris[0], this.defaultTris[1]);
    }
    attributeChangeCallback(name:string, oldValue:any, newValue:any){
        switch(name){
            case 'color':
                if(checkValueForColor(newValue)){
                    this.endy.setColor(this.objectId, newValue);
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
}


customElements.define('a-cube', ACube);
export default ACube;
