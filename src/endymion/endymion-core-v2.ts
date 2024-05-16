
import { enError, enLog, enAlert, enOnWindowError } from '../utils/debug';
import { Position, Rotation, Scale, Color, ActionName, Action } from './endymion-v2.types';

class EndymionCoreV2 {
    private messageStack: any[] = [];
    private apiVerisionInitExecuted = false;
    protected objectId = 0;
    protected defaultPosition: Position = { x: 0, y: 0, z: 0 };
    protected defaultRotation: Rotation = { x: 0, y: 0, z: 0 };
    protected defaultScale: Scale = { x: 1, y: 1, z: 1 };
    protected defaultColor: Color = { r: 255, g: 255, b: 255, a: 1 };
    communicationInterface: any;
    window: Window;

    constructor(commInterface: string = 'vuplex', w: Window = window) {
        this.window = w;
        this.communicationInterface = (this.window as any)[commInterface];
        if (this.communicationInterface == undefined
            || this.communicationInterface === ''
            || this.communicationInterface === null) {
            if (this.isDebugMode()) console.log('communication interface not ready');
            (this.window as any).EnSpace = {
                ...(this.window as any).EnSpace,
                environment: 'web-browser'
            };
            this.window.addEventListener('vuplexready', () => {
                if (this.isDebugMode()) console.log('communication interface ready event received');
                this.communicationInterface = (this.window as any)[commInterface];
                this.initApiVersion();
                this.messageStack.forEach((message) => {
                    this.communicationInterface.postMessage(message);
                });
                this.messageStack = [];
                (this.window as any).EnSpace = {
                    ...(this.window as any).EnSpace,
                    environment: 'web-view'
                };
                (this.window as any).console.log = enLog;
                (this.window as any).console.error = enError;
                (this.window as any).alert = enAlert;
                (this.window as any).onerror = enOnWindowError;
            });
            this.communicationInterface = {};
            this.communicationInterface.postMessage = (message: any) => {
                this.messageStack.push(message);
            };
            this.communicationInterface.addEventListener = (message: any) => { };

        } else {
            if (this.isDebugMode()) console.log('communication interface already ready');
            (this.window as any).EnSpace = {
                ...(this.window as any).EnSpace,
                environment: 'web-view'
            };
            (this.window as any).console.log = enLog;
            (this.window as any).console.error = enError;
            (this.window as any).alert = enAlert;
            (this.window as any).onerror = enOnWindowError;
            this.initApiVersion();
        }
    }
    generateObjectId = (): number => {
        (this.window as any).EnSpace.objectId++;
        return (this.window as any).EnSpace.objectId;
    }
    getEnvironment = (): string => {
        return (this.window as any).EnSpace.environment;
    }
    getApiVersion = (): string => {
        return (this.window as any).EnSpace.apiVersion;
    }
    enableDebug = () => {
        (this.window as any).EnSpace.debugMode = true;
    }
    disableDebug = () => {
        (this.window as any).EnSpace.debugMode = false;
    }
    isDebugMode = (): boolean => {
        return (this.window as any).EnSpace?.debugMode || false;
    }
    /**
     * Send message to Endymion Browser Application
     * @param message message to send of type message
     * @returns objectId
     */
    sendMessage = (message: any) => {
        this.communicationInterface.postMessage(message);
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
    destroyAll() {
        this.sendAction(
            'actor-destroy-all', {}
        );
    }

    playHaptic = () => {
        this.sendAction('device-play-haptic', {});
    }

    private createAction = (actName: ActionName, actPayload: any): Action => {
        if (actName == undefined || actName == null) throw new Error('[core][createAction] - actName is not defined');
        if (actPayload == undefined || actPayload == null) throw new Error('[core][createAction] - actPayload is not defined');
        var act = {
            name: actName,
            payload: actPayload
        };
        return act as Action;
    }
    private initApiVersion = () => {
        if (!this.apiVerisionInitExecuted) {
            if (this.isDebugMode()) console.log('initApiVersion');
            this.apiVerisionInitExecuted = true;
            this.communicationInterface.postMessage({
                name: "api-init",
                payload:
                {
                    api: "2"
                }
            });
        }
    }
}

export { EndymionCoreV2 as EndymionCore };




