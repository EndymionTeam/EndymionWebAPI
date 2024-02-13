
import { enError, enLog, enAlert, enOnWindowError } from '../utils/debug';
import {
    PrimitiveType, Position, Rotation, Scale, Color, ActionName, Action, message,
    webViewPayload, actorSetActivePayload
} from './endymion-v2.types';

class EndymionCoreV2 {
    communicationInterface: any;
    window: Window
    objectId = 0;
    defaultPosition: Position = { x: 0, y: 0, z: 0 };
    defaultRotation: Rotation = { x: 0, y: 0, z: 0 };
    defaultScale: Scale = { x: 1, y: 1, z: 1 };
    defaultColor: Color = { r: 255, g: 255, b: 255, a: 1 };
    constructor(commInterface: string = 'vuplex', w: Window = window) {
        this.window = w;
        this.communicationInterface = (this.window as any)[commInterface];
        if (this.communicationInterface == undefined
            || this.communicationInterface === ''
            || this.communicationInterface === null) {
            (this.window as any).EnSpace = {
                ...(this.window as any).EnSpace,
                environment: 'web-browser'
            };
            this.communicationInterface = {};
            this.communicationInterface.postMessage = (message: any) => { /*console.log(message)*/ };
            this.communicationInterface.addEventListener = (message: any) => { };
            return;
        }

        (this.window as any).EnSpace = {
            ...(this.window as any).EnSpace,
            environment: 'web-view'
        };
        (this.window as any).console.log = enLog;
        (this.window as any).console.error = enError;
        (this.window as any).alert = enAlert;
        (this.window as any).onerror = enOnWindowError;
    }
    getObjectId = (): number => {
        (window as any).EnSpace.objectId++;
        return (window as any).EnSpace.objectId;
    }
    getEnvironment = (): string => {
        return (window as any).EnSpace.environment;
    }
    enableDebug = () => {
        (window as any).EnSpace.debugMode = true;
    }
    disableDebug = () => {
        (window as any).EnSpace.debugMode = false;
    }
    isDebugMode = (): boolean => {
        return (window as any).EnSpace.debugMode;
    }
    /**
     * Send message to Endymion Browser Application
     * @param message message to send of type message
     * @returns objectId
     */
    sendMessage = (message: message) => {
        this.communicationInterface.postMessage(message);
    }
    /**
     * Create action for request to Endymion Browser Application    
     *
     * @param actName Action Name, for example: 'primitive-create'
     * @param actPayload Definition of asset to create
     * @returns action object
     */
    createAction = (actName: ActionName, actPayload: any): Action => {
        if (actName == undefined || actName == null) throw new Error('[core][createAction] - actName is not defined');
        if (actPayload == undefined || actPayload == null) throw new Error('[core][createAction] - actPayload is not defined');
        var act = {
            api: "2",
            name: actName,
            payload: actPayload
        };
        return act as Action;
    }

    /**
     * Send action to Endymion Browser Application      
     * It is a wrapper for createAction and vuplex.postMessage      
     *
     * @param name Action Name, for example: 'primitive-create'
     * @param payload Definition of action
     * @returns void
     */
    sendAction = (name: ActionName, payload: any): void => {
        if (name == undefined || name == null) throw new Error('[core][sendAction] - name is not defined');
        if (payload == undefined || payload == null) throw new Error('[core][sendAction] - payload is not defined');
        let jsonAction = this.createAction(name, payload);
        if (this.isDebugMode()) console.log(jsonAction);
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
    sendActions = (actionArray: Action[]): void => {
        if (actionArray == undefined
            || actionArray == null
            || typeof actionArray !== 'object'
            || actionArray.length == 0) throw new Error('[core][sendActions] - actionArray is not defined');
        var jsonAction = this.createAction('api-multi-action', actionArray);
        if (this.isDebugMode()) console.log(jsonAction);
        this.communicationInterface.postMessage(jsonAction);
    }
    /**
     * Destroy object in Endymion Browser Application       
     * It is a wrapper for sendAction configured for 'destroy-object'       
     * 
     * @param objectId 
     */
    destroyObject = (objectId: number | string) => {
        this.sendAction(
            'actor-destroy',
            {
                id: objectId
            }
        );
    }
    /**
     * Destroys all objects.
     */
    destroyAllObjects() {
        this.sendAction(
            'actor-destroy-all', {}
        );
    }
    /**
     * Create primitive object in Endymion Browser Application      
     * It is a wrapper for sendAction configured for 'primitive-create'     
     * 
     * @param objectId typeof number
     * @param primitive typeof primitive
     * @param position typeof position
     * @param rotation typeof rotation
     * @param scale typeof scale
     */
    createObject = (objectId: number,
        primitive: PrimitiveType,
        position: Position,
        rotation: Rotation,
        scale: Scale
    ): void => {
        if (objectId < 0) throw new Error('[core][createObject] - objectId is not valid');
        this.sendAction(
            'primitive-create',
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
     * It is a wrapper for sendAction configured for 'primitive-create'     
     * 
     * @param objectId typeof number
     * @param source typeof string - url of gltf file
     * @returns void
     */
    importGltf = (objectId: number, source: string): void => {
        if (objectId < 0) throw new Error('[core][importGltf] - objectId is not valid');
        if (source == undefined
            || source == null
            || typeof source !== 'string'
            || source.length == 0) throw new Error('[core][importGltf] - source is not defined');
        this.sendAction(
            'gltf-create',
            {
                id: objectId,
                url: source
            }
        );
    }

    /**
  * Set color to object      
  * 
  * @param objectId 
  * @param color typeof color - {r:number, g:number, b:number, a:number} in range 0-255
  * @returns void
  */
    setColor = (objectId: number, color: Color): void => {
        if (objectId < 0) throw new Error('[core][setColor] - objectId is not valid');
        if (color.r < 0) throw new Error('[core][setColor] - r color value is not valid');
        if (color.g < 0) throw new Error('[core][setColor] - g color value is not valid');
        if (color.b < 0) throw new Error('[core][setColor] - b color value is not valid');
        if (color.a < 0) throw new Error('[core][setColor] - a color value is not valid');

        if (color.r > 255) throw new Error('[core][setColor] - r color value must be minor or equal to 255');
        if (color.g > 255) throw new Error('[core][setColor] - g color value must be minor or equal to 255');
        if (color.b > 255) throw new Error('[core][setColor] - b color value must be minor or equal to 255');
        if (color.a > 1) throw new Error('[core][setColor] - a color value must be minor or equal to 1');

        if (!isInt(color.r)) throw new Error('[core][setColor] - r color value must be an integer');
        if (!isInt(color.g)) throw new Error('[core][setColor] - g color value must be an integer');
        if (!isInt(color.b)) throw new Error('[core][setColor] - b color value must be an integer');

        this.sendAction(
            'primitive-set-color',
            {
                id: objectId,
                color: {
                    r: color.r / 255,
                    g: color.g / 255,
                    b: color.b / 255,
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
    playHaptic(): void {
        this.sendAction(
            'device-play-haptic',
            {}
        );
    }
    /**
     * play animation on object       
     * 
     * @param objectId 
     * @param animationName 
     * @returns void
     */
    playAnimation = (objectId: number, index: number, animationName: string): void => {
        this.sendAction(
            'gltf-play-anim',
            {
                id: objectId,
                index: index,
                //name: animationName
            }
        );

    }
    /**
     * stop animation on object       
     * 
     * @param objectId 
     * @returns void
     */
    stopAnimation = (objectId: number, index: number): void => {
        this.sendAction(
            'gltf-stop-anim',
            {
                id: objectId,
            }
        );
    }
    /**
     * pause animation on object       
     * 
     * @param objectId 
     * @returns void
     */
    pauseAnimation = (objectId: number, index: number): void => {
        this.sendAction(
            'gltf-pause-anim',
            {
                id: objectId,
            }
        );
    }

    /**
     * Creates a webview with the specified payload.
     * @param payload The payload for creating the webview.
     */
    /**
     * Creates a webview with the given payload.
     * @param payload The payload for creating the webview.
     * @returns The ID of the created webview.
     */
    createWebview = (payload: webViewPayload): { webViewId: string, webViewPayload: webViewPayload } => {
        this.sendAction('webview-create', payload);
        return { webViewId: payload.id, webViewPayload: payload };
    }

    /**
     * Sets the active actor.
     * @param payload The payload containing the information about the actor to set as active.
     */
    actorSetActive = (payload: actorSetActivePayload): void => {
        this.sendAction('actor-setactive', payload);
    }

    /**
     * Sets the aimable property of an object.
     * @param objectId - The ID of the object.
     * @param aimable - Whether the object is aimable or not.
     * @param radius - The radius of the aimable area (optional, default value is 0.1).
     */
    setAimable(objectId: string, aimable: boolean, radius: number = 0.1): void {
        this.sendAction('actor-set-aimable', { id: objectId, enabled: aimable, radius: radius });
    }

    line(objectId: string, points: Array<Position>, thickness: number, color: Color, transform: any) {
        this.sendAction('shape-line-create', {
            api: 2,
            id: objectId,
            points: points,
            thickness: thickness,
            color: color,
            transform: transform
        });
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

export { EndymionCoreV2 as EndymionCore };




