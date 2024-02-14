import { PrimitiveType } from "../endymion/endymion-v2.types";
import { BaseEntity } from "./en-base-entity";

export class EnCube extends BaseEntity {
    type: PrimitiveType = 'cube';
    constructor() {
        super();
        this.entity.primitive = this.type;
    }

    create(): EnCube {
        this.entity.id = this.id;
        this.actions = [
            {
                api: '2', name: 'primitive-create', payload: {
                    id: this.entity.id,
                    primitive: this.entity.primitive,
                    transform: {
                        position: this.entity.position,
                        rotation: this.entity.rotation,
                        scale: this.entity.scale
                    }
                }
            }
        ]
        super.create();
        return this;
    }

}