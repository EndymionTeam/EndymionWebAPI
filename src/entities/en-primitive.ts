import { Color, Action, Entity } from "../endymion/endymion.types";
import { EndymionCore } from "../endymion/endymion-core";
import { Subject } from "rxjs";
type enEvent = {
    name: string,
    type: string,
    payload: any
}
export class BaseEntity {
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
        scale: { x: 1, y: 1, z: 1 }

    };
    protected color: Color = { r: 0, g: 0, b: 0, a: 1 };
    protected core: EndymionCore;
    protected actions: Array<Action> = [];
    constructor() {
        this.core = new EndymionCore();
        this.updated$.subscribe((event) => {
            if (this.isCreated) {
                if(event.type == 'update' && event.name == 'position') {
                    this.actions.push({ name: 'update-transform', payload: { id: this.entity.id, type: 'absolute', position: event.payload.position } })
                }
                if(event.type == 'update' && event.name == 'rotation') {
                    this.actions.push({ name: 'update-transform', payload: { id: this.entity.id, type: 'absolute', rotation: event.payload.rotation } })
                }
                if(event.type == 'update' && event.name == 'scale') {
                    this.actions.push({ name: 'update-transform', payload: { id: this.entity.id, type: 'absolute', scale: event.payload.scale } })
                }
                if(event.type == 'update' && event.name == 'color') {
                    this.actions.push({ name: 'set-color', payload: {id: this.entity.id, color: event.payload.color }});
                }
            } 
        });
    }
    create() {
        try {
            this.core.sendActions(this.actions);
            this.created.next(this.actions);
            this.actions = [];
            this.isCreated = true;
        } catch (e) {
            this.createdError.next({method: 'create', error:e});
            this.error.next({method: 'create', error:e});
        }
    }
    apply(){
        try {
            this.core.sendActions(this.actions);
            this.applyed.next(this.actions);
            this.actions = [];
        } catch (e) {
            this.applyError.next({method: 'apply', error:e});
            this.error.next({method: 'apply', error:e});
        }
    }
    setPos(x: number, y: number, z: number): BaseEntity {
        this.entity.position = { x: x, y: y, z: z };
        this.updated.next({ name: 'position', type:'update',payload: { position: this.entity.position } })
        this.positionUpdated.next(this.entity.position);
        return this;
    }
    setRot(x: number, y: number, z: number): BaseEntity {
        this.entity.rotation = { x: x, y: y, z: z };
        this.updated.next({ name: 'rotation', type:'update',payload: { rotation: this.entity.rotation } })
        this.rotationUpdated.next(this.entity.rotation);
        return this;
    }
    setScale(x: number, y: number, z: number): BaseEntity {
        this.entity.scale = { x: x, y: y, z: z };
        this.updated.next({ name: 'scale', type:'update',payload: { scale: this.entity.scale } })
        this.scaleUpdated.next(this.entity.scale);
        return this;
    }
    setColor(r: number, g: number, b: number, a: number): BaseEntity {
        this.color = { r: r / 255, g: g / 255, b: b / 255, a: a };
        this.updated.next({ name: 'color', type:'update' ,payload:  { color: this.color } })
        this.colorUpdated.next(this.color);
        return this;
    }


}



