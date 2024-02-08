import { Color, Action, Entity } from "../endymion/endymion.types";
import { EndymionCore } from "../endymion/endymion-core";
import { Subject } from "rxjs";
import { Win } from "../utils/nav-utils";
type enEvent = {
    name: string,
    type: string,
    payload: any
}
export class BaseEntity {
    protected win: Win;
    private isCreated: boolean = false;
    private updated: Subject<enEvent> = new Subject<enEvent>();
    public updated$ = this.updated.asObservable();
    private colorUpdated: Subject<Color> = new Subject<Color>();
    public colorUpdated$ = this.colorUpdated.asObservable();
    private positionUpdated: Subject<{ x: number, y: number, z: number }> = new Subject<{ x: number, y: number, z: number }>();
    public positionUpdated$ = this.positionUpdated.asObservable();
    private rotationUpdated: Subject<{ x: number, y: number, z: number }> = new Subject<{ x: number, y: number, z: number }>();
    public rotationUpdated$ = this.rotationUpdated.asObservable();
    private scaleUpdated: Subject<{ x: number, y: number, z: number }> = new Subject<{ x: number, y: number, z: number }>();
    public scaleUpdated$ = this.scaleUpdated.asObservable();
    public setTargetableUpdated: Subject<{ enabled: boolean, radius: number }> = new Subject<{ enabled: boolean, radius: number }>();
    public setTargetableUpdated$ = this.setTargetableUpdated.asObservable();
    public setActiveUpdated: Subject<boolean> = new Subject<boolean>();
    public setActiveUpdated$ = this.setActiveUpdated.asObservable();

    private created: Subject<Action[]> = new Subject<Action[]>();
    public created$ = this.created.asObservable();
    public applyed: Subject<Action[]> = new Subject<Action[]>();
    public applyed$ = this.applyed.asObservable();
    private applyError: Subject<any> = new Subject<any>();
    public applyError$ = this.applyError.asObservable();
    private createdError: Subject<any> = new Subject<any>();
    public createdError$ = this.createdError.asObservable();
    public error: Subject<any> = new Subject<any>();
    public error$ = this.error.asObservable();

    protected get id() {
        return this.core.getObjectId();
    }
    protected entity: Entity = {
        id: 0,
        primitive: 'cube',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        targetable: false,
        active: false

    };
    protected color: Color = { r: 0, g: 0, b: 0, a: 1 };
    protected core: EndymionCore;
    protected actions: Array<Action> = [];
    constructor() {
        this.core = new EndymionCore();
        this.win = new Win(this.core.window);
        this.updated$.subscribe((event) => {
            if (this.isCreated) {
                if (event.type == 'update') {
                    switch (event.name) {
                        case 'position':
                            this.actions.push({ name: 'update-transform', payload: { id: this.entity.id, type: 'absolute', position: event.payload.position } })
                            break;
                        case 'rotation':
                            this.actions.push({ name: 'update-transform', payload: { id: this.entity.id, type: 'absolute', rotation: event.payload.rotation } })
                            break;
                        case 'scale':
                            this.actions.push({ name: 'update-transform', payload: { id: this.entity.id, type: 'absolute', scale: event.payload.scale } })
                            break;
                        case 'color':
                            this.actions.push({ name: 'set-color', payload: { id: this.entity.id, color: event.payload.color } });
                            break;
                        case 'object-setaimable':
                            this.actions.push({ name: 'object-setaimable', payload: { id: this.entity.id, enabled: event.payload.enabled, radius: event.payload.radius } });
                            break;
                        case 'actor-setactive':
                            this.actions.push({ name: 'actor-setactive', payload: { id: this.entity.id, activated: event.payload.activated } });
                    }
                }
            }
        });
    }
    create() {
        if (this.isCreated) throw new Error('Entity already created');
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
        if (!this.isCreated) throw new Error('Entity not created');
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
            this.actions.push({ name: 'destroy-object', payload: { id: this.entity.id } });
            this.core.sendActions(this.actions);
        } catch (e) {
            this.error.next({ method: 'destroy', error: e });
        }
    }
    setPos(x: number, y: number, z: number): BaseEntity {
        this.entity.position = { x: x, y: y, z: z };
        this.updated.next({ name: 'position', type: 'update', payload: { position: this.entity.position } })
        this.positionUpdated.next(this.entity.position);
        return this;
    }
    setRot(x: number, y: number, z: number): BaseEntity {
        this.entity.rotation = { x: x, y: y, z: z };
        this.updated.next({ name: 'rotation', type: 'update', payload: { rotation: this.entity.rotation } })
        this.rotationUpdated.next(this.entity.rotation);
        return this;
    }
    setScale(x: number, y: number, z: number): BaseEntity {
        this.entity.scale = { x: x, y: y, z: z };
        this.updated.next({ name: 'scale', type: 'update', payload: { scale: this.entity.scale } })
        this.scaleUpdated.next(this.entity.scale);
        return this;
    }
    setColor(color: Color): BaseEntity {
        if (color.r < 0) throw new Error('r color value is not valid');
        if (color.g < 0) throw new Error('g color value is not valid');
        if (color.b < 0) throw new Error('b color value is not valid');
        if (color.a < 0) throw new Error('a color value is not valid');

        if (color.r > 255) throw new Error('r color value must be minor or equal to 255');
        if (color.g > 255) throw new Error('g color value must be minor or equal to 255');
        if (color.b > 255) throw new Error('b color value must be minor or equal to 255');
        if (color.a > 1) throw new Error('a color value must be minor or equal to 1');

        if (!isInt(color.r)) throw new Error('r color value must be an integer');
        if (!isInt(color.g)) throw new Error('g color value must be an integer');
        if (!isInt(color.b)) throw new Error('b color value must be an integer');

        this.color = { r: color.r / 255, g: color.g / 255, b: color.b / 255, a: color.a };
        this.updated.next({ name: 'color', type: 'update', payload: { color: this.color } })
        this.colorUpdated.next(this.color);
        return this;
    }

    setOpacity(value: number) {
        if (value < 0) throw new Error('opacity value is not valid');
        if (value > 1) throw new Error('opacity value must be minor or equal to 1');
        this.color.a = value;
        this.updated.next({ name: 'color', type: 'update', payload: { color: this.color } })
        this.colorUpdated.next(this.color);
    }
    setTargetable(value: boolean, radius: number = 0.1) {
        this.entity.targetable = value;
        this.updated.next({ name: 'object-setaimable', type: 'update', payload: { enabled: value, radius: radius } });
        this.setTargetableUpdated.next({ enabled: value, radius: radius });
    }
    setActive(value: boolean) {
        this.entity.active = value;
        this.updated.next({ name: 'actor-setactive', type: 'update', payload: { activated: value } });
        this.setActiveUpdated.next(value);
    }

    //TODO aggiungere la gestione dei messaggi da vuplex as esempio quando l'oggetto viene mirato
}

function isInt(value: string | number) {
    var x;
    if (isNaN(value as number)) {
        return false;
    }
    x = parseFloat(value as string);
    return (x | 0) === x;
}
