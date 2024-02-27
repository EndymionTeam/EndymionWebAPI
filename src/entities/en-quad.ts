import { PrimitiveType } from "../endymion/endymion-v2.types";
import { BaseEntity } from "./en-base-entity";

export class EnQuad extends BaseEntity {
    type: PrimitiveType = 'quad';
    constructor(protected commInterface: string = 'vuplex', protected w: Window = window) {
        super(commInterface, w);
        this.entity.primitive = this.type;
    }

    create(): EnQuad {
        this.entity.id = this.id;
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