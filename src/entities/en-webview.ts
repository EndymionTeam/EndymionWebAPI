import { Action, ActionName, Color, PolicyType, PrimitiveType, webViewParent, webViewType, webviewOrientation } from "../endymion/endymion-v2.types";
import { BaseEntity } from "./en-base-entity";

export class EnWebview extends BaseEntity {
    type: PrimitiveType = 'webview';
    webViewParent!: webViewParent;
    url: string = '';
    webViewType: webViewType = 'flat-fixed';

    constructor(protected commInterface: string = 'vuplex', protected w: Window = window) {
        super(commInterface, w);
        this.entity.primitive = this.type;
    }

    override setColor(color: Color): BaseEntity {
        throw new Error("[en-webview][setColor] - Method not allowed on EnWebview");
    }

    override setOpacity(value: number): BaseEntity {
        throw new Error("[en-webview][setOpacity] - Method not allowed on EnWebview");
    }

    override setCollidable(value:boolean): BaseEntity{
        throw new Error("[en-webview][setCollidable] - Method not allowed on EnWebview");
    }

    setUrl(url: string): EnWebview {
        url = url.includes('http')
            ? url
            : `${this.win.getCurrentProtocol()}//${this.win.getCurrentHost()}/${url}`;
        this.url = url;
        return this;
    }

    override setParent(webViewParent: webViewParent): EnWebview {
        this.webViewParent = webViewParent;
        return this;
    }

    setType(type: webViewType): EnWebview {
        this.webViewType = type;
        return this;
    }

    setOrientation(orientation: webviewOrientation): EnWebview {
        if(orientation == null)  throw new Error('[en-webview][sendMessage] - orientation is required');
        let action = {
            name: 'webview-set-orientation' as ActionName,
            payload: {
                id: this.entity.id,
                mode: orientation
            }
        };
        this.actions.push(action);
        return this;
    }

    sendMessage(destinationId: number, message: string) {
        if(destinationId < 0)  throw new Error('[en-webview][sendMessage] - destination webview id is required');
        if(message == '' || message == null)  throw new Error('[en-webview][sendMessage] - message is required');
        let action =  {
            name : 'webview-send-message' as ActionName, 
            payload :  
             { 
               id : destinationId,
               message : message
             }           
         }
         this.actions.push(action);
         return this;
    }

    setClickPolicy(type: PolicyType){
        let action =  {
            name : 'webview-send-message' as ActionName, 
            payload :  
             { 
               id : this.entity.id,
               rule : type
             }           
         }
         this.actions.push(action);
         return this;
    }

    override create(): EnWebview {
        if (!this.url) throw new Error('[en-webview][create] - url is required');
        this.entity.id = this.isCustomId ? this.customId : this.core.generateObjectId();
        this.actions = [
            {
                name: 'webview-create',
                payload: {
                    id: this.entity.id,
                    type: this.webViewType,
                    url: this.url,
                    parent: this.webViewParent,
                    transform: {
                        rotation: this.entity.rotation,
                        position: this.entity.position,
                        scale: this.entity.scale
                    }
                }
            }]
        super.create();
        return this;
    }

    build(): Action[] {
        if (!this.url) throw new Error('[en-webview][create] - url is required');
        this.entity.id = this.isCustomId ? this.customId : this.core.generateObjectId();
        this.actions = [
            {
                name: 'webview-create',
                payload: {
                    id: this.entity.id,
                    type: this.webViewType,
                    url: this.url,
                    parent: this.webViewParent,
                    transform: {
                        rotation: this.entity.rotation,
                        position: this.entity.position,
                        scale: this.entity.scale
                    }
                }
            }]
        return super.build();
    }

}