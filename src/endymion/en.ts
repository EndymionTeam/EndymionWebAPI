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
import { MessageName, MessagePayload, IncomingMessage } from './endymion-v2.types';
import { Subject, tap } from 'rxjs';
import { Win } from '../utils/nav-utils';

export class En {
    core: EndymionCore;
    private win: Win;
    private message: Subject<IncomingMessage> = new Subject<IncomingMessage>();
    private actionResult: Subject<IncomingMessage> = new Subject<IncomingMessage>();
    private trackImage: Subject<IncomingMessage> = new Subject<IncomingMessage>();
    private pageVisibility: Subject<boolean> = new Subject<boolean>();
    private webViewMessage: Subject<IncomingMessage> = new Subject<IncomingMessage>();
    private assetCollition: Subject<IncomingMessage> = new Subject<IncomingMessage>();
    private qrcodeDetected: Subject<IncomingMessage> = new Subject<IncomingMessage>();
    private connections: Map<number, EnWebview | null> = new Map<number, EnWebview | null>();
    private currentConnectionImageId: number = -1;
    /**
     * message$ - Observable to listen to messages from Endymion Browser
     * if debug mode is enabled, messages will be logged to console
     */
    message$ = this.message.asObservable().pipe(
        tap((message) => {
            if (this.core.isDebugMode()) {
                console.log(message);
            }
        })
    );
    /**
     * actionResult$ - Observable to listen to action results from Endymion Browser
     */
    actionResult$ = this.actionResult.asObservable();
    /**
     * trackImage$ - Observable to listen to tracking image events from Endymion Browser
     */
    trackImage$ = this.trackImage.asObservable();
    /**
     * pageVisibility$ - Observable to listen to page visibility events from Endymion Browser
     */
    pageVisibility$ = this.pageVisibility.asObservable();
    /**
     * webViewMessage$ - Observable to listen to webview messages from Endymion Browser
     */
    webViewMessage$ = this.webViewMessage.asObservable();
    /**
     * assetCollition$ - Observable to listen to collitions messages from Endymion Browser
     */
    assetCollition$ = this.assetCollition.asObservable();
    /**
     * qrcodeDetected$ - Observable to listen qrcode detection event
     */
    qrcodeDetected$ = this.qrcodeDetected.asObservable();

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
                case 'imgtracker-on-image':
                    that.trackImage.next({ name: name, type: 'message', payload: payload });
                    break;
                case 'webview-visible':
                    that.pageVisibility.next(payload.state as boolean);
                    break;
                case 'webview-on-message':
                    that.webViewMessage.next({ name: name, type: 'message', payload: payload });
                    break;
                case 'actor-on-collision':
                    that.assetCollition.next({ name: name, type: 'message', payload: payload});
                    break;
                case 'qrctracker-on-qrcode':
                    that.qrcodeDetected.next({ name: name, type: 'message', payload: payload});
                    break;
            }
            that.message.next({ name: name, type: 'message', payload: payload });
        });
    }
    /**
     * enable debug mode
     * message from Endymion Browser will be logged to console
     * action sended to Endymion Browser will be logged to console
     * a box will appear in the scene to show the debug message
     */
    enableDebug = () => {
        this.core.enableDebug();
    }
    /**
     * disable debug mode
     */
    disableDebug = () => {
        this.core.disableDebug();
    }
    /**
     * play haptic feedback
     */
    playHaptic() {
        this.core.playHaptic();
    }
    //TODO: will be developed
    // connect = (url: string): En => {
    //     if(url === undefined || url === null || url === '') throw new Error('[EN][connect] - url is required');
    //     this.currentConnectionImageId = this.addTrackingImage(url);
    //     return this;
    // }
    // toWebView = (webViewCreationFn: (imageId: number, state: boolean) => EnWebview): number | string => {
    //     var that = this;
    //      this.trackImage$.subscribe((message: MessageIncoming) => {
    //         let webView = webViewCreationFn(that.currentConnectionImageId, message.payload.state as boolean);
    //         this.connections.set(that.currentConnectionImageId, webView);
    //     });
    //     return that.currentConnectionImageId;
    // };
    // getWebView = (imageId: number): EnWebview | null => {
    //     return this.connections.get(imageId)!;
    // }
    /**
     * @returns EnAsset
     * example: en.asset().load('https://example.com/model.glb')
     */
    asset = (): EnAsset => new EnAsset(this.commInterface, this.w);
    /**
     * @returns EnCapsule
     */
    capsule = (): EnCapsule => new EnCapsule(this.commInterface, this.w);
    /**
     * @returns EnCube
     */
    cube = (): EnCube => new EnCube(this.commInterface, this.w);
    /**
     * @returns EnCylinder
     */
    cylinder = (): EnCylinder => new EnCylinder(this.commInterface, this.w);
    /**
     * @returns EnPlane
     */
    plane = (): EnPlane => new EnPlane(this.commInterface, this.w);
    /**
     * @returns EnQuad
     */
    quad = (): EnQuad => new EnQuad(this.commInterface, this.w);
    /**
     * @returns EnSphere
     */
    sphere = (): EnSphere => new EnSphere(this.commInterface, this.w);
    /**
     * @returns EnWebview
     */
    webview = (): EnWebview => new EnWebview(this.commInterface, this.w);
    /**
     * @returns EnShapeLine
     */
    line = (): EnShapeLine => new EnShapeLine(this.commInterface, this.w);
    /**
     * add tracking image to the scene
     * @param url - url of the image to be tracked
     * @param refWidth - reference width of the image to be tracked
     * @returns id of the image
     * @obsolete
     */
    addTrackingImage = (url: string, refWidth: number = 0.05): number => {
        if (url === undefined || url === null || url === '') throw new Error('[EN][addTrackingImage] - url is required');
        let id = this.core.generateObjectId();
        url = url.includes('http')
            ? url
            : `${this.win.getCurrentProtocol()}//${this.win.getCurrentHost()}/${url}`;

        let payload = {
            id: id,
            url: url,
            refWidth: refWidth
        }
        this.core.sendActions([{ name: 'imgtracker-add-image', payload: payload }]);
        return id;
    }
    /**
     * Tracking Image methods
     * allow to set an use image to start an experience
     */
    trackingImage = {
        /**
         * init tracking image system
         */
        init: (): void => {
            this.core.sendActions([{ name: 'imgtracker-init', payload: {} }])
        },
        /* add tracking image to the scene
        * @param url - url of the image to be tracked
        * @param refWidth - reference width of the image to be tracked
        * @returns id of the image
        */
        add: (url: string, refWidth: number = 0.05): number => {
            if (url === undefined || url === null || url === '') throw new Error('[EN][addTrackingImage] - url is required');
            let id = this.core.generateObjectId();
            url = url.includes('http')
                ? url
                : `${this.win.getCurrentProtocol()}//${this.win.getCurrentHost()}/${url}`;
    
            let payload = {
                id: id,
                url: url,
                refWidth: refWidth
            }
            this.core.sendActions([{ name: 'imgtracker-add-image', payload: payload }]);
            return id;
        },
        /**
         * reset tracking image
         */
        reset:():void=>{
            this.core.sendActions([{ name:'imgtracker-reset', payload:{} }])
        }
    }
    /**
     * qrcode methods
     */
    qrcode = {
        /**
         * 
         * @param trackMode track mode to be used
         * @param maxActives max possible active qrcodes at same time
         * @param maxCached max number of qrcode to keep in cache
         * @param refSize qrcode reference size in meters (only for "anchor" mode) 
         */
        init: (trackMode: 'cv' | 'anchor', maxActives: number = 1, maxCached: number = 10, refSize: number = 0.1) => {
            let payload = {
                trackMode: trackMode,
                maxActives: maxActives,
                maxCached: maxCached,
                refSize: refSize
            };
            this.core.sendActions([{ name: 'qrctracker-init', payload: payload }]);
        },
        /**
         * qr code scan reset
         */
        reset: () => {
            this.core.sendActions([{ name: "qrctracker-reset", payload: {} }]);
        },
        /**
         * qr code scan start
         */
        run: () => {
            this.core.sendActions([{ name: "qrctracker-run", payload: { state: true } }]);
        },
        /**
         * qr code scan stop
         */
        stop: () => {
            this.core.sendActions([{ name: "qrctracker-run", payload: { state: false } }]);
        }
    }

    deviceCollition = (enable:boolean, radius:number = 0)=>{
        if(enable){
            if(radius < 0 || radius > 100) throw new Error('[EN][deviceCollition] - radius out of range [0,100]');
            this.core.sendActions([{ name: 'actor-set-collidable', payload: { enabled: enable, radius: radius}}]);
        }
    }
}