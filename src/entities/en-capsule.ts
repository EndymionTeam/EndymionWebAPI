import { PrimitiveType } from "../Endymion/endymion-v2.types";
import { BaseEntity } from "./en-base-entity";

export class EnCapsule extends BaseEntity {
    type: PrimitiveType = 'capsule';
    constructor(protected commInterface: string = 'vuplex', protected w: Window = window) {
        super(commInterface, w);
        this.entity.primitive = this.type;
    }

    create(): EnCapsule {
        this.entity.id = this.isCustomId ? this.customId : this.core.generateObjectId();
        this.actions = [
            {
               name: 'primitive-create', payload: {
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