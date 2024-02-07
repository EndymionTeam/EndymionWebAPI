import { Color, PrimitiveType, webViewParent as WebViewParent } from "../endymion/endymion.types";
import { BaseEntity } from "./en-primitive";

export class EnWebview extends BaseEntity {
    type: PrimitiveType = 'webview';
    webViewParent!: WebViewParent;
    url: string = '';
    constructor() {
        super();
        this.entity.primitive = this.type;
    }

    override setColor(color: Color): BaseEntity {
        throw new Error("Method not allowed on EnWebview");
    }
    override setOpacity(value: number): BaseEntity {
        throw new Error("Method not allowed on EnWebview");
    }
    setUrl(url: string): EnWebview {
        this.url = url;
        return this;
    }
    setParent(webViewParent: WebViewParent): EnWebview {
        this.webViewParent = webViewParent;
        return this;
    }
    override create(): EnWebview {
        if (!this.url) throw new Error('url is required');
        this.entity.id = this.id;
        this.actions = [
            { name: 'webview-create', payload: { id: this.id, url: this.url, parent: this.webViewParent } },
            {
                name: 'update-transform', payload: {
                    id: this.id,
                    type: 'absolute',
                    rotation: this.entity.rotation,
                    position: this.entity.position,
                    scale: this.entity.scale
                }
            }]
        super.create();
        return this;
    }

}