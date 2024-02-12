import { PrimitiveType } from "../endymion/endymion.types";
import { BaseEntity } from "./en-primitive";

export class EnCylinder extends BaseEntity {
    type: PrimitiveType = 'cylinder';
    constructor() {
        super();
        this.entity.primitive = this.type;
    }

    create(): EnCylinder {
        this.entity.id = this.id;
        this.actions = [
            { api: '2', name: 'create-primitive', payload: this.entity },
            { api: '2', name: 'set-color', payload: { id: this.entity.id, color: this.color } }
        ]
        super.create();
        return this;
    }

}