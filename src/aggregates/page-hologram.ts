import { En } from "../endymion/en";
import { Position, Rotation, Scale } from "../endymion/endymion-v2.types";
import { EnAsset } from "../entities/en-asset";

export class PageHologram {
    private assetUrl: string = '';
    private position: Position = { x: 0, y: 0, z: 0 };
    private rotation: Rotation = { x: 0, y: 0, z: 0 };
    private scale: Scale = { x: 1, y: 1, z: 1 };
    private hologram!: EnAsset;
    constructor(private en: En) { }
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
    setAssetUrl(url: string) {
        this.assetUrl = url;
        return this;
    }
    create() {
        this.hologram = this.en.asset() as EnAsset;
        (this.hologram.setPos(this.position.x, this.position.y, this.position.z)
            .setRot(this.rotation.x, this.rotation.y, this.rotation.z)
            .setScale(this.scale.x, this.scale.y, this.scale.z) as EnAsset)
            .load(this.assetUrl);
        return this.hologram;
    }
}