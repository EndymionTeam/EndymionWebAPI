import { BaseEntity } from '../entities/en-base-entity';
import { En } from '../endymion/en';
import { Color, Position, Rotation } from '../endymion/endymion-v2.types';
export class PagePlaceholder {
    private _type: 'cube' | 'sphere' | 'cylinder' | 'asset' | 'capsule' | 'plane' | 'quad' = 'cube';
    private position: Position = { x: 0, y: 0, z: 0 };
    private rotation:Rotation = { x: 0, y: 0, z: 0 };
    private scale: Position = { x: 1, y: 1, z: 1 };
    private color: Color | string  = { r: 0, g: 0, b: 0, a: 1 };
    private opacity:number = 1;
    entity!: BaseEntity;
    constructor(private en: En) { }
    type(type: 'cube' | 'sphere' | 'cylinder' | 'asset' | 'capsule' | 'plane' | 'quad') {
        this._type = type;
        return this;
    }
    setPos(x: number, y: number, z: number) {
        this.position = { x, y, z };
        return this;
    }
    setRot(x: number, y: number, z: number) {
        this.rotation = { x, y, z };
        return this;    
    }
    setScale(x: number, y: number, z: number) {
        this.scale = { x, y, z };
        return this;
    }
    setColor(color:Color | string){
        this.color = color;
        return this;
    }
    setOpacity(opacity:number){
        this.opacity = opacity;
        return this;
    }
    create() {
        try {
            this.entity = this.en[this._type]();
            this.entity
            .setPos(this.position.x, this.position.y, this.position.z)
            .setRot(this.rotation.x, this.rotation.y, this.rotation.z)
            .setScale(this.scale.x, this.scale.y, this.scale.z)
            .setColor(this.color)
            .setOpacity(this.opacity)
            .create();
            return this.entity;
        } catch (e) {
            throw new Error('[placeholder][create] - ' + JSON.stringify(e));
        }
    }
}