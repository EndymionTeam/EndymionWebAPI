import { EndymionCore } from './endymion-core-v2';
import { EnCube } from '../entities/en-cube';
import { EnSphere } from '../entities/en-sphere';
import { EnCylinder } from '../entities/en-cylinder';
import { EnAsset } from '../entities/en-asset';
import { EnCapsule } from '../entities/en-capsule';
import { EnPlane } from '../entities/en-plane';
import { EnQuad } from '../entities/en-quad';
import { EnWebview } from '../entities/en-webview';
import { EnShapeLine } from '../entities/en-shape-line';
import { MasterPage } from './master-page';
import { MessageName, MessagePayload, MessageIncoming } from './endymion-v2.types';
import { Subject, tap } from 'rxjs';
import { Win } from '../utils/nav-utils';

export class En {
    core: EndymionCore;
    private win: Win;
    private message: Subject<MessageIncoming> = new Subject<MessageIncoming>();
    private actionResult: Subject<MessageIncoming> = new Subject<MessageIncoming>();
    private trackImage: Subject<MessageIncoming> = new Subject<MessageIncoming>();
    private connections: Map<number, EnWebview | null> = new Map<number, EnWebview | null>();
    private currentConnectionImageId: number = -1;

    message$ = this.message.asObservable().pipe(
        tap((message) => {
            if (this.core.isDebugMode()) {
                console.log(message);
            }
        })
    );
    actionResult$ = this.actionResult.asObservable();
    trackImage$ = this.trackImage.asObservable();


    constructor(private commInterface: string = 'vuplex', private w: Window = window) {
        this.core = new EndymionCore(commInterface, w);
        this.win = new Win(this.core.window);
        var that = this;
        this.core.communicationInterface.addEventListener('message', function (event: any) {
            let jsonStr = event.data;
            let json = JSON.parse(jsonStr);
            let name: MessageName = json.name;
            let payload: MessagePayload = json.payload;
            if (!name || !payload) return;
            switch (name) {
                case 'api-on-result':
                    that.actionResult.next({ name: name, type: 'message', payload: payload });
                    break;
                case 'tracker-on-image':
                    that.trackImage.next({ name: name, type: 'message', payload: payload });
                    break;
            }
            that.message.next({ name: name, type: 'message', payload: payload });
        });
    }
    enableDebug = () => {
        this.core.enableDebug();
    }
    disableDebug = () => {
        this.core.disableDebug();
    }
    playHaptic() {
        this.core.playHaptic();
    }
    connect = (url: string): En => {
        if(url === undefined || url === null || url === '') throw new Error('[EN][connect] - url is required');
        this.currentConnectionImageId = this.addTrackingImage(url);
        return this;
    }
    toWebView = (webViewCreationFn: (imageId: number, state: boolean) => EnWebview): number | string => {
        var that = this;
         this.trackImage$.subscribe((message: MessageIncoming) => {
            let webView = webViewCreationFn(that.currentConnectionImageId, message.payload.state as boolean);
            this.connections.set(that.currentConnectionImageId, webView);
        });
        return that.currentConnectionImageId;
    };
    getWebView = (imageId: number): EnWebview | null => {
        return this.connections.get(imageId)!;
    }
    asset = (): EnAsset => new EnAsset(this.commInterface, this.w);
    capsule = (): EnCapsule => new EnCapsule(this.commInterface, this.w);
    cube = (): EnCube => new EnCube(this.commInterface, this.w);
    cylinder = (): EnCylinder => new EnCylinder(this.commInterface, this.w);
    plane = (): EnPlane => new EnPlane(this.commInterface, this.w);
    quad = (): EnQuad => new EnQuad(this.commInterface, this.w);
    sphere = (): EnSphere => new EnSphere(this.commInterface, this.w);
    webview = (): EnWebview => new EnWebview(this.commInterface, this.w);
    line = (): EnShapeLine => new EnShapeLine(this.commInterface, this.w);

    addTrackingImage = (url: string, refWidth: number = 0.05): number => {
        if(url === undefined || url === null || url === '') throw new Error('[EN][addTrackingImage] - url is required');
        let id = this.core.getObjectId();
        url = url.includes('http')
        ? url
        : `${this.win.getCurrentProtocol()}//${this.win.getCurrentHost()}/${url}`;

        let payload = {
            id: id,
            url: url,
            refWidth: refWidth
        }
        this.core.sendActions([{ name: 'tracker-add-image', payload: payload }]);
        return id;
    }
}