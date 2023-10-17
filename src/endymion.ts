
import { Subject } from 'rxjs';
import { primitive, position, rotation, scale, TransformType, TransformGreatness, Color, actionName, action } from './endymion.types';

class Endymion {
    communicationInterface:any;
    window:Window
    messageIn = new Subject();
    messageIn$ = this.messageIn.asObservable();
    objectId = 0;
    constructor(commInterface: string = 'vuplex', w:Window = window){
        this.window = w;
        this.communicationInterface = (this.window as any)["commInterface"];

        if (this.communicationInterface == undefined 
            || this.communicationInterface ==='' 
            || this.communicationInterface === null) {
                //polyfill for vuplex for execution in browser
                this.communicationInterface = {};
                this.communicationInterface.postMessage = (message:any) => {};
                this.communicationInterface.addEventListener = (message:any) => {};

            }

        this.communicationInterface.addEventListener('message', (event:any)=>{
            this.messageIn.next(event.data);
        });
               
    }
    /**
     * Create action for request to Endymion Browser Application    
     *
     * @param actName Action Name, for example: 'create-primitive'
     * @param actPayload Definition of asset to create
     * @returns action object
     */
    public createAction = (actName:actionName, actPayload:any):action =>{
        if(actName == undefined || actName == null) throw new Error('actName is not defined');
        if(actPayload == undefined || actPayload == null) throw new Error('actPayload is not defined');
        var act = {
            name: actName,
            payload: actPayload
        };
        return act as action;
    }
    /**
     * Send action to Endymion Browser Application      
     * It is a wrapper for createAction and vuplex.postMessage      
     *
     * @param name Action Name, for example: 'create-primitive'
     * @param payload Definition of action
     * @returns void
     */
    public sendAction = (name:actionName, payload:any):void=>{
        if(name == undefined || name == null) throw new Error('name is not defined');
        if(payload == undefined || payload == null) throw new Error('payload is not defined');
        let jsonAction = this.createAction(name, payload);
        this.communicationInterface.postMessage(jsonAction);
    }
    /**
     * Send multiple actions to Endymion Browser Application        
     * It is a wrapper for createAction and vuplex.postMessage      
     * action used is 'multi-action'        
     * 
     * @param actionArray Array of actions
     * @returns void
     */
    public sendActions = (actionArray:action[]):void =>{
        if(actionArray == undefined || actionArray == null || typeof actionArray !== 'object' || actionArray.length == 0) throw new Error('actionArray is not defined');
        var jsonAction = this.createAction('multi-action', actionArray);
        this.communicationInterface.postMessage(jsonAction);
    }
    /**
     * Destroy object in Endymion Browser Application       
     * It is a wrapper for sendAction configured for 'destroy-object'       
     * 
     * @param objectId 
     */
    public destroyObject = (objectId:number)=>{
        if(objectId < 0) throw new Error('objectId is not valid');
        this.sendAction(
            'destroy-object',
            {
                id: objectId
            }
        );
    }
    /**
     * Create primitive object in Endymion Browser Application      
     * It is a wrapper for sendAction configured for 'create-primitive'     
     * 
     * @param objectId typeof number
     * @param primitive typeof primitive
     * @param position typeof position
     * @param rotation typeof rotation
     * @param scale typeof scale
     */
    public createObject =   (   objectId:number, 
                                primitive:primitive, 
                                position:position, 
                                rotation:rotation, 
                                scale:scale
                            ):void=>{
        if(objectId < 0) throw new Error('objectId is not valid');
        this.sendAction(
            'create-primitive',
            {
                id: objectId,
                primitive: primitive,
                position: position,
                rotation: rotation,
                scale: scale
            }
        );
    }
    /**
     * Create primitive object in Endymion Browser Application      
     * It is a wrapper for sendAction configured for 'create-primitive'     
     * 
     * @param objectId typeof number
     * @param source typeof string - url of gltf file
     * @returns void
     */
    public importGltf = (objectId: number, source:string):void=>{
        if(objectId < 0) throw new Error('objectId is not valid');
        if(source == undefined || source == null || typeof source !== 'string' || source.length == 0) throw new Error('source is not defined');
        var action = this.sendAction(
            'import-gltf',
            {
                id: objectId,
                url: source
            }
        );
    }

    /**
     * Set a transformation to object       
     * 
     * WARNING: not usable because cannot set sigle greatness at time               
     * we have must set all greatness at time       
     * 
     * @param objectId 
     * @param type typeof TransformType - delta|absolute
     * @param greatness typeof position|rotation|scale
     * @param value typeof position|rotation|scale
     * @returns {objectId:number, action:any}
     */
    public updateTransform = (objectId: number, 
                        type: TransformType,
                        greatness: TransformGreatness, 
                        value: position|rotation|scale):{objectId:number, action:any} => {

        let request = { id:objectId, type: type };
        if(greatness === 'position') (request as any)['position'] = value;
        if(greatness === 'rotation') (request as any)['rotation'] = value;
        if(greatness === 'scale') (request as any)['scale'] = value;
        let action = this.createAction(
            'update-transform',
            request
        );
        return {
            objectId: objectId,
            action: action
        }
    }
    /**
     * Set color to object      
     * 
     * @param objectId 
     * @param color typeof color - {r:number, g:number, b:number, a:number} in range 0-255
     * @returns void
     */
    public setColor = (objectId:number, color:Color):void=>{
        if(objectId < 0) throw new Error('objectId is not valid');
        if(color.r < 0) throw new Error('r color value is not valid');
        if(color.g < 0) throw new Error('g color value is not valid');
        if(color.b < 0) throw new Error('b color value is not valid');
        if(color.a < 0) throw new Error('a color value is not valid');

        if(color.r > 255) throw new Error('r color value must be minor or equal to 255');
        if(color.g > 255) throw new Error('g color value must be minor or equal to 255');
        if(color.b > 255) throw new Error('b color value must be minor or equal to 255');
        if(color.a > 1) throw new Error('a color value must be minor or equal to 1');

        if(!isInt(color.r)) throw new Error('r color value must be an integer');
        if(!isInt(color.g)) throw new Error('g color value must be an integer');
        if(!isInt(color.b)) throw new Error('b color value must be an integer');

        this.sendAction(
            'set-color',
            {
                id: objectId,
                color: {
                    r: color.r/255,
                    g: color.g/255,
                    b: color.b/255,
                    a: color.a
                }
            }
        );
    }
    /**
     * play haptics on device       
     * 
     * @returns void
     */
    public playHaptic():void{
        this.sendAction(
            'play-haptic',
            {}
        );
    }
}

function isInt(value: string | number) {
    var x;
    if (isNaN(value as number)) {
      return false;
    }
    x = parseFloat(value as string);
    return (x | 0) === x;
}

export  { Endymion };




