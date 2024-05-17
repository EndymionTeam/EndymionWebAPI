import { Subject } from "rxjs";
import { Color, PrimitiveType } from "../endymion/endymion-v2.types";
import { BaseEntity } from "./en-base-entity";

export class EnAsset extends BaseEntity {
    type: PrimitiveType = 'gltf';
    private url: string = '';
    private animationIndex: number = -1;
    private animationUpdated: Subject<number> = new Subject<number>();
    private animationPlaying: Subject<boolean> = new Subject<boolean>();
    private animationPaused: Subject<boolean> = new Subject<boolean>();
    private animationStopped: Subject<boolean> = new Subject<boolean>();
    animationUpdated$ = this.animationUpdated.asObservable();
    animationPlaying$ = this.animationPlaying.asObservable();
    animationPaused$ = this.animationPaused.asObservable();
    animationStopped$ = this.animationStopped.asObservable();

    constructor(protected commInterface: string = 'vuplex', protected w: Window = window) {
        super(commInterface, w);
        this.entity.primitive = this.type;
    }

    override create(): EnAsset {
        throw new Error("s[en-asset][create]Method not allowed on EnAsset");
    }
    override setColor(color: Color): BaseEntity {
        throw new Error("[en-asset][setColor] - Method not allowed on EnAsset");
    }
    override setOpacity(value: number): BaseEntity {
        throw new Error("[en-asset][setOpacity] - Method not allowed on EnAsset");
    }

    setAnim(animationIndex: number) {
        this.animationIndex = animationIndex;
        this.animationUpdated.next(animationIndex);
        return this;
    }
    playAnim() {
        if (this.animationIndex > -1) {
            this.actions.push({
                name: 'gltf-play-anim',
                payload: {
                    id: this.entity.id,
                    index: this.animationIndex
                }
            });
            this.apply();
            this.animationPlaying.next(true);
            this.animationPaused.next(false);
            this.animationStopped.next(false);
        }
    }
    stopAnim() {
        this.actions.push({
            name: 'gltf-stop-anim',
            payload: {
                id: this.entity.id
            }
        });
        this.apply();
        this.animationPlaying.next(false);
        this.animationPaused.next(false);
        this.animationStopped.next(true);
    }
    pauseAnim() {
        this.actions.push({
            name: 'gltf-pause-anim',
            payload: {
                id: this.entity.id
            }
        });
        this.apply();
        this.animationPlaying.next(false);
        this.animationPaused.next(true);
        this.animationStopped.next(false);
    }

    load(url: string): EnAsset {
        url = url.includes('http')
            ? url
            : `${this.win.getCurrentProtocol()}//${this.win.getCurrentHost()}/${url}`
        
        if(this.isCreated && this.url !== url){
            this.destroy();
            this.setId(this.entity.id);
            this.isCreated = false;
        }

        this.entity.id = this.isCustomId ? this.customId : this.core.generateObjectId();
        this.actions = [
            {
                name: 'gltf-create',
                payload: {
                    id: this.entity.id,
                    url: url,
                    transform: {
                        position: this.entity.position,
                        rotation: this.entity.rotation,
                        scale: this.entity.scale
                    }
                }
        }];
        super.create();
        if(this.isCreated && this.url !== url){
            this.isCustomId = false;
        }
        return this;
    }

}