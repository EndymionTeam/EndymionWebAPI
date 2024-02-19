import { EndymionCore } from './endymion-core-v2';
import { EnCube } from '../entities/en-cube';
import { EnSphere } from '../entities/en-sphere';
import { EnCylinder } from '../entities/en-cylinder';
import { EnAsset } from '../entities/en-asset';
import { EnCapsule } from '../entities/en-capsule';
import { EnPlane } from '../entities/en-plane';
import { EnQuad } from '../entities/en-quad';
import { EnWebview } from '../entities/en-webview';
import { EnShapeLine } from '../entities/en-shape-line';

export class En {
    core: EndymionCore;
    constructor(private commInterface: string = 'vuplex', private w: Window = window) {
        this.core = new EndymionCore(commInterface, w);
    }
    enableDebug = () => {
        this.core.enableDebug();
    }
    disableDebug = () => {
        this.core.disableDebug();
    }
    asset = (): EnAsset => new EnAsset(this.commInterface, this.w);
    capsule = (): EnCapsule => new EnCapsule(this.commInterface, this.w);
    cube = (): EnCube => new EnCube(this.commInterface, this.w);
    cylinder = (): EnCylinder => new EnCylinder(this.commInterface, this.w);
    plane = (): EnPlane => new EnPlane(this.commInterface, this.w);
    quad = (): EnQuad => new EnQuad(this.commInterface, this.w);
    sphere = (): EnSphere => new EnSphere(this.commInterface, this.w);
    webview = (): EnWebview => new EnWebview(this.commInterface, this.w);
    line = (): EnShapeLine => new EnShapeLine(this.commInterface, this.w);

}