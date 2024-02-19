import { Color, Action, Entity, MessageName, MessagePayload, MessageIncoming as IncomingMessage } from "../endymion/endymion-v2.types";
import { EndymionCore } from "../endymion/endymion-core-v2";
import { Subject, tap } from "rxjs";
import { Win } from "../utils/nav-utils";
import { hexToRGB, namedColor } from "../utils/color-utils";
type enEvent = {
    name: string,
    type: string,
    payload: any
}
export class BaseEntity {
    protected win: Win;
    private isCreated: boolean = false;
    private updated: Subject<enEvent> = new Subject<enEvent>();
    private colorUpdated: Subject<Color> = new Subject<Color>();
    private positionUpdated: Subject<{ x: number, y: number, z: number }> = new Subject<{ x: number, y: number, z: number }>();
    private rotationUpdated: Subject<{ x: number, y: number, z: number }> = new Subject<{ x: number, y: number, z: number }>();
    private scaleUpdated: Subject<{ x: number, y: number, z: number }> = new Subject<{ x: number, y: number, z: number }>();
    private created: Subject<Action[]> = new Subject<Action[]>();
    private applyed: Subject<Action[]> = new Subject<Action[]>();
    private applyError: Subject<any> = new Subject<any>();
    private error: Subject<any> = new Subject<any>();
    private createdError: Subject<any> = new Subject<any>();
    private setTargetableUpdated: Subject<{ enabled: boolean, radius: number }> = new Subject<{ enabled: boolean, radius: number }>();
    private message: Subject<IncomingMessage> = new Subject<IncomingMessage>();
    private targetted: Subject<IncomingMessage> = new Subject<IncomingMessage>();
    private clicked: Subject<IncomingMessage> = new Subject<IncomingMessage>();
    private webViewVisible: Subject<IncomingMessage> = new Subject<IncomingMessage>();
    private isClickable: Subject<boolean> = new Subject<boolean>();
    private hapticPlay: Subject<boolean> = new Subject<boolean>();
    private destroyed: Subject<boolean> = new Subject<boolean>();

    protected get id() {
        return this.core.getObjectId();
    }
    protected entity: Entity = {
        id: 0,
        primitive: 'cube',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
    };

    protected color: Color = { r: 0, g: 0, b: 0, a: 1 };
    protected core: EndymionCore;
    private _actions: Action[] = [];
    protected get actions() {
        return this._actions;
    }
    protected set actions(actions: Action[]) {
        if (!actions) throw new Error(`[en-primitive][actions] - value is not valid - ${actions}`);
        if(actions.length === 0) {
            this._actions = [];
            return;
        }
        this._actions.map(action => {
            action.payload.id = this.entity.id;
        });
        actions.map(action => {
            let findend = this._actions.findIndex(a => a.name === action.name
                && a.payload.id === action.payload.id);
            if (findend < 0) {
                this._actions.unshift(action);
            }
        })
    }
    protected clickable: boolean = false;
    protected active: boolean = true;
    protected targetable: boolean = false;
    protected playHaptic: boolean = false;

    updated$ = this.updated.asObservable();
    colorUpdated$ = this.colorUpdated.asObservable();
    positionUpdated$ = this.positionUpdated.asObservable();
    rotationUpdated$ = this.rotationUpdated.asObservable();
    scaleUpdated$ = this.scaleUpdated.asObservable();
    setTargetableUpdated$ = this.setTargetableUpdated.asObservable();
    setActiveUpdated: Subject<boolean> = new Subject<boolean>();
    setActiveUpdated$ = this.setActiveUpdated.asObservable();
    created$ = this.created.asObservable();
    applyed$ = this.applyed.asObservable();
    applyError$ = this.applyError.asObservable();
    createdError$ = this.createdError.asObservable();
    error$ = this.error.asObservable();
    targetted$ = this.targetted.asObservable();
    clicked$ = this.clicked.asObservable();
    webViewVisible$ = this.webViewVisible.asObservable();
    isClickable$ = this.isClickable.asObservable();
    hapticPlay$ = this.hapticPlay.asObservable();
    destroyed$ = this.destroyed.asObservable();

    constructor(protected commInterface: string = 'vuplex', protected w: Window = window) {
        this.core = new EndymionCore(commInterface, w);
        this.win = new Win(this.core.window);
        var that = this;
        this.core.communicationInterface.addEventListener('message', function (event: any) {
            let jsonStr = event.data;
            let json = JSON.parse(jsonStr);
            let name: MessageName = json.name;
            let payload: MessagePayload = json.payload;
            if (!name || !payload) return;
            if ((payload as any).id == that.entity.id) {
                that.message.next({ name: name, type: 'message', payload: payload });
            }
        });
    }

    message$ = this.message.asObservable().pipe(
        tap(message => { if (this.core.isDebugMode()) console.log('message', message); }),
        tap(message => {
            switch (message.name) {
                case 'actor-on-aim':
                    if(this.playHaptic){
                        this.core.playHaptic();
                        this.hapticPlay.next(true);
                    } 
                    this.targetted.next(message);
                    break;
                case 'actor-on-click':
                    if(this.playHaptic){
                        this.core.playHaptic();
                        this.hapticPlay.next(true);
                    } 
                    this.clicked.next(message);
                    break;
                case 'webview-visible':
                    this.webViewVisible.next(message);
                    break;
            }
        })
    ).subscribe(r => r);


    create() {
        if (this.isCreated) throw new Error('[en-primitive][create] - Entity already created');
        try {
            this.core.sendActions(this.actions);
            this.created.next(this.actions);
            this.actions = [];
            this.isCreated = true;
        } catch (e) {
            this.createdError.next({ method: 'create', error: e });
            this.error.next({ method: 'create', error: e });
        }
    }
    apply() {
        if (!this.isCreated) throw new Error('[en-primitive][apply] - Entity not created');
        try {
            this.core.sendActions(this.actions);
            this.applyed.next(this.actions);
            this.actions = [];
        } catch (e) {
            this.applyError.next({ method: 'apply', error: e });
            this.error.next({ method: 'apply', error: e });
        }
    }
    destroy() {
        try {
            this.actions.push({ api: '2', name: 'actor-destroy', payload: { id: this.entity.id } });
            this.core.sendActions(this.actions);
            this.destroyed.next(true);
        } catch (e) {
            this.error.next({ method: 'destroy', error: e });
        }
    }
    setPos(x: number, y: number, z: number): BaseEntity {
        if(typeof x !== 'number') throw new Error('[en-primitive][setPos] - x value is not valid');
        if(typeof y !== 'number') throw new Error('[en-primitive][setPos] - y value is not valid');
        if(typeof z !== 'number') throw new Error('[en-primitive][setPos] - z value is not valid');

        this.entity.position = { x: x, y: y, z: z };
        this.updated.next({ name: 'actor-set-transform', type: 'update', payload: { position: this.entity.position } })
        this.positionUpdated.next(this.entity.position);
        if(this.isCreated) {
            this.actions.push({ api: '2', name: 'actor-set-transform', payload: { id: this.entity.id.toString(), position: this.entity.position  } });
        }
        return this;
    }
    addPos(x: number, y: number, z: number): BaseEntity {
        if(typeof x !== 'number') throw new Error('[en-primitive][setPos] - x value is not valid');
        if(typeof y !== 'number') throw new Error('[en-primitive][setPos] - y value is not valid');
        if(typeof z !== 'number') throw new Error('[en-primitive][setPos] - z value is not valid');
        
        this.entity.position = { x: this.entity.position.x + x, y: this.entity.position.y + y, z: this.entity.position.z + z };
        this.updated.next({ name: 'actor-add-transform', type: 'update', payload: { position: { x, y, z } } });
        this.positionUpdated.next(this.entity.position);
        this.actions.push({ api: '2', name: 'actor-add-transform', payload: { id: this.entity.id.toString(), position: this.entity.position  } });
        return this;
    }
    setRot(x: number, y: number, z: number): BaseEntity {
        this.entity.rotation = { x: x, y: y, z: z };
        this.updated.next({ name: 'actor-set-transform', type: 'update', payload: { rotation: this.entity.rotation } })
        this.rotationUpdated.next(this.entity.rotation);
        if(this.isCreated) {
            this.actions.push({ api: '2', name: 'actor-set-transform', payload: { id: this.entity.id.toString(), rotation: this.entity.rotation  } });
        }
        return this;
    }
    addRot(x: number, y: number, z: number): BaseEntity {
        this.entity.rotation = { x: this.entity.rotation.x + x, y: this.entity.rotation.y + y, z: this.entity.rotation.z + z };
        this.updated.next({ name: 'actor-add-transform', type: 'update', payload: { rotation: { x, y, z } } });
        this.rotationUpdated.next(this.entity.rotation);
        this.actions.push({ api: '2', name: 'actor-add-transform', payload: { id: this.entity.id.toString(),  rotation: this.entity.rotation  } });
        return this;
    }
    setScale(x: number, y: number, z: number): BaseEntity {
        this.entity.scale = { x: x, y: y, z: z };
        this.updated.next({ name: 'actor-set-transform', type: 'update', payload: { scale: this.entity.scale } })
        this.scaleUpdated.next(this.entity.scale);
        if(this.isCreated) {
            this.actions.push({ api: '2', name: 'actor-set-transform', payload: { id: this.entity.id.toString(),  scale: this.entity.scale  } });
        }
        return this;
    }
    addScale(x: number, y: number, z: number): BaseEntity {
        this.entity.scale = { x: this.entity.scale.x + x, y: this.entity.scale.y + y, z: this.entity.scale.z + z };
        this.updated.next({ name: 'actor-add-transform', type: 'update', payload: { scale: { x, y, z } } });
        this.scaleUpdated.next(this.entity.scale);
        this.actions.push({ api: '2', name: 'actor-add-transform', payload: { id: this.entity.id.toString(),  scale: this.entity.scale  } });
        return this;
    }
    setColor(color: Color | string): BaseEntity {
        if(color === undefined) throw new Error('[en-primitive][setcolor] - color value is not valid');
        let selectedColor: Color = { r: 0, g: 0, b: 0, a: 1 };
        if (typeof color === 'string') {
            if (color.includes('#')) {
                selectedColor = hexToRGB(color) as Color;
            }
            if (color.includes('rgb')) {
                const rgb = color.replace('rgb(', '').replace(')', '').split(',');
                selectedColor = { r: parseInt(rgb[0]), g: parseInt(rgb[1]), b: parseInt(rgb[2]), a: 1 };
            }
            if (color.includes('rgba')) {
                const rgb = color.replace('rgba(', '').replace(')', '').split(',');
                selectedColor = { r: parseInt(rgb[0]), g: parseInt(rgb[1]), b: parseInt(rgb[2]), a: parseFloat(rgb[3]) };
            }
            if (namedColor().has(color.toUpperCase())) {
                var hexColor = namedColor().get(color.toUpperCase()) as string;
                selectedColor = hexToRGB(hexColor) as Color;
            }
        }
        if (typeof color === 'object'
            && color !== null
            && color !== undefined
            && color.hasOwnProperty('r')
            && color.hasOwnProperty('g')
            && color.hasOwnProperty('b')
            && color.hasOwnProperty('a')) {
            selectedColor = color;
        }
        if (selectedColor.r < 0) throw new Error('[en-primitive][setcolor] - r color value is not valid');
        if (selectedColor.g < 0) throw new Error('[en-primitive][setcolor] - g color value is not valid');
        if (selectedColor.b < 0) throw new Error('[en-primitive][setcolor] - b color value is not valid');
        if (selectedColor.a < 0) throw new Error('[en-primitive][setcolor] - a color value is not valid');

        if (selectedColor.r > 255) throw new Error('[en-primitive][setcolor] - r color value must be minor or equal to 255');
        if (selectedColor.g > 255) throw new Error('[en-primitive][setcolor] - g color value must be minor or equal to 255');
        if (selectedColor.b > 255) throw new Error('[en-primitive][setcolor] - b color value must be minor or equal to 255');
        if (selectedColor.a > 1) throw new Error('[en-primitive][setcolor] - a color value must be minor or equal to 1');

        if (!isInt(selectedColor.r)) throw new Error('[en-primitive][setcolor] - r color value must be an integer');
        if (!isInt(selectedColor.g)) throw new Error('[en-primitive][setcolor] - g color value must be an integer');
        if (!isInt(selectedColor.b)) throw new Error('[en-primitive][setcolor] - b color value must be an integer');

        this.color = { r: selectedColor.r / 255, g: selectedColor.g / 255, b: selectedColor.b / 255, a: selectedColor.a };
        this.updated.next({ name: 'color', type: 'update', payload: { color: this.color } })
        this.colorUpdated.next(this.color);
        this.actions.push({ api: '2', name: 'primitive-set-color', payload: { id: this.entity.id, color: this.color } });
        return this;
    }
    setOpacity(value: number): BaseEntity {
        if (value < 0) throw new Error('[en-primitive][setOpacity] - opacity value is not valid');
        if (value > 1) throw new Error('[en-primitive][setOpacity] - opacity value must be minor or equal to 1');
        this.color.a = value;
        this.updated.next({ name: 'color', type: 'update', payload: { color: this.color } })
        this.colorUpdated.next(this.color);
        return this;
    }
    setTargetable(value: boolean, radius: number = 0.1): BaseEntity {
        this.targetable = value;
        this.updated.next({ name: 'actor-set-aimable', type: 'update', payload: { enabled: value, radius: radius } });
        this.setTargetableUpdated.next({ enabled: value, radius: radius });
        this.actions.push({ api: '2', name: 'actor-set-aimable', payload: { id: this.entity.id, enabled: this.targetable, radius: radius } });
        return this;
    }
    setActive(value: boolean): BaseEntity {
        this.active = value;
        this.updated.next({ name: 'actor-setactive', type: 'update', payload: { activated: value } });
        this.setActiveUpdated.next(value);
        this.actions.push({ api: '2', name: 'actor-setactive', payload: { id: this.entity.id, activated: this.active } });
        return this;
    }
    setClickable(value: boolean): BaseEntity {
        this.clickable = value;
        this.updated.next({ name: 'actor-set-clickable', type: 'update', payload: { clickable: value } });
        this.isClickable.next(value);
        this.actions.push({ api: '2', name: 'actor-set-clickable', payload: { id: this.entity.id, enabled: this.clickable } });
        return this;
    }
    setHapticFeedback(value: boolean): BaseEntity {
        this.playHaptic = value;
        return this;
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
