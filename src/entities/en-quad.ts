import { PrimitiveType } from "../endymion/endymion.types";
import { BaseEntity } from "./en-primitive";

export class EnQuad extends BaseEntity {
    type: PrimitiveType = 'quad';
    constructor() {
        super();
        this.entity.primitive = this.type;
    }
    
    create(): EnQuad {
        this.entity.id = this.id;
        this.actions = [
            { name: 'create-primitive', payload: this.entity },
            { name: 'set-color', payload: { id: this.entity.id, color: this.color }}
        ]
        super.create();
        return this;
    }

}