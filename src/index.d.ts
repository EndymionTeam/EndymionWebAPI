
import { primitive, position, rotation, scale } from './types';
export type WebApi = {
    createAction(actName:string, actPayload:any):void;
    sendAction(name:string, payload:any):void;
    sendActions(actionArray:any[]):void;
    destroyObject(objectId:number):void;
    createObject(primitive:primitive, position:position, rotation:rotation, scale:scale):number;
    importGltf(source:string):{objectId:number, action:any}
    messageIn:any;
    messageIn$:any;
    objectId:number;
    vuplex:any;
}
