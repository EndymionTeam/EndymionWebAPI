
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

    private createAction = (actName:string, actPayload:any):any =>{
        var act = {
            name: actName,
            payload: actPayload
        };
        return act;
    }
    public sendAction = (name:string, payload:any)=>{
        let jsonAction = this.createAction(name, payload);
        this.vuplex.postMessage(jsonAction);
    }
    public sendActions = (actionArray:any[]) =>{
        var jsonAction = this.createAction('multi-action', actionArray);
        this.vuplex.postMessage(jsonAction);
    }

    public destroyObject = (objectId:number)=>{
        this.sendAction(
            'destroy-object',
            {
                id: objectId
            }
        );
    }
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
    public importGltf = (objectId: number, source:string):void=>{
        var action = this.sendAction(
            'import-gltf',
            {
                id: objectId,
                url: source
            }
        );
    }
    //not usable because cannot set sigle greatness at time
    //we have must set all greatness at time
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
    public playHaptic():void{
        this.sendAction(
            'play-haptic',
            {}
        );
    }
}
export  { Endymion };




