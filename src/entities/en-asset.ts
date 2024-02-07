import { Color, PrimitiveType } from "../endymion/endymion.types";
import { BaseEntity } from "./en-primitive";

export class EnAsset extends BaseEntity {
    type: PrimitiveType = 'gltf';
    animationIndex: number = -1;
    constructor() {
        super();
        this.entity.primitive = this.type;
    }

    override create(): EnAsset {
        throw new Error("Method not allowed on EnAsset");
    }
    override setColor(color: Color): BaseEntity {
        throw new Error("Method not allowed on EnAsset");
    }
    override setOpacity(value: number): BaseEntity {
        throw new Error("Method not allowed on EnAsset");
    }

    setAnimation(animationIndex: number) {
        this.animationIndex = animationIndex;
        return this;
    }

    load(url: string): EnAsset {
        url = url.includes('http')
            ? url
            : `${this.win.getCurrentProtocol()}//${this.win.getCurrentHost()}/${url}`
            
        this.entity.id = this.id;
        this.actions = [
            { name: 'import-gltf', payload: { id: this.id, url: url } },
            {
                name: 'update-transform', payload: {
                    id: this.id,
                    type: 'absolute',
                    rotation: this.entity.rotation,
                    position: this.entity.position,
                    scale: this.entity.scale
                }
            }]
        if (this.animationIndex > -1) {
            this.actions.push({
                name: 'play-anim',
                payload: {
                    id: this.id,
                    index: this.animationIndex,
                    //name: animationName
                }
            });
        }
        super.create();
        return this;
    }

}