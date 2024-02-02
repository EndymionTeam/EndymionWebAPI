import { PrimitiveType } from "../endymion/endymion.types";
import { BaseEntity } from "./en-primitive";

export class EnCube extends BaseEntity {
    type: PrimitiveType = 'cube';
    constructor() {
        super();
        this.entity.primitive = this.type;
    }
    
    create(): EnCube {
        this.entity.id = this.id;
        this.actions = [
            { name: 'create-primitive', payload: this.entity },
            { name: 'set-color', payload: { id: this.entity.id, color: this.color }}
        ]
        super.create();
        return this;
    }

}