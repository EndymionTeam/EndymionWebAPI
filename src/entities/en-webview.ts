import { Color, PrimitiveType, webViewParent as WebViewParent, webViewType } from "../endymion/endymion-v2.types";
import { BaseEntity } from "./en-base-entity";

export class EnWebview extends BaseEntity {
    type: PrimitiveType = 'webview';
    webViewParent!: WebViewParent;
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
    setUrl(url: string): EnWebview {
        url = url.includes('http')
            ? url
            : `${this.win.getCurrentProtocol()}//${this.win.getCurrentHost()}/${url}`;
        this.url = url;
        return this;
    }
    setParent(webViewParent: WebViewParent): EnWebview {
        this.webViewParent = webViewParent;
        return this;
    }
    setType(type: webViewType): EnWebview {
        this.webViewType = type;
        return this;
    }
    override create(): EnWebview {
        if (!this.url) throw new Error('[en-webview][create] - url is required');
        this.entity.id = this.isCustomId ? this.customId : this.id;
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

}