
import { Subject } from 'rxjs';
import { primitive, position, rotation, scale, TransformType, TransformGreatness, Color } from './endymion.types';


class Endymion{
    vuplex:any;
    messageIn = new Subject();
    messageIn$ = this.messageIn.asObservable();
    objectId = 0;
    constructor(){
        this.vuplex = (window as any).vuplex;
        if (this.vuplex == undefined 
            || this.vuplex ==='' 
            || this.vuplex === null) {
                //polyfill for vuplex for execution in browser
                console.log("vuplex is not setted");
                this.vuplex = {};
                this.vuplex.postMessage = (message:any) => {};
                this.vuplex.addEventListener = (message:any) => {};

            }

        (window as any).vuplex.addEventListener('message', (event:any)=>{
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
    private createAction = (actName:string, actPayload:any):any =>{
        var act = {
            name: actName,
            payload: actPayload
        };
        return act;
    }
    /**
     * Send action to Endymion Browser Application      
     * It is a wrapper for createAction and vuplex.postMessage      
     *
     * @param name Action Name, for example: 'create-primitive'
     * @param payload Definition of action
     * @returns void
     */
    public sendAction = (name:string, payload:any):void=>{
        let jsonAction = this.createAction(name, payload);
        this.vuplex.postMessage(jsonAction);
    }
    /**
     * Send multiple actions to Endymion Browser Application        
     * It is a wrapper for createAction and vuplex.postMessage      
     * action used is 'multi-action'        
     * 
     * @param actionArray Array of actions
     * @returns void
     */
    public sendActions = (actionArray:any[]):void =>{
        var jsonAction = this.createAction('multi-action', actionArray);
        this.vuplex.postMessage(jsonAction);
    }
    /**
     * Destroy object in Endymion Browser Application       
     * It is a wrapper for sendAction configured for 'destroy-object'       
     * 
     * @param objectId 
     */
    public destroyObject = (objectId:number)=>{
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
export  { Endymion };




