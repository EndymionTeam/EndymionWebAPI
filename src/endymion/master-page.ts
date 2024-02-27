import { En } from "../endymion";
import { webViewParent, Transform } from "./endymion-v2.types";
import { EnAsset } from "../entities/en-asset";

export type Page = {
    name: string;
    url: string;
    transform: Transform | null;
    placeholder: {
        url: string;
        transform: Transform | null;
    },
    inherit_transform: string | null;
}

export class MasterPage {
    pages: Page[] = [];
    constructor(private en: En) {

    }
    addPage(name: string,
        url: string,
        placeholderUrl: string,
        pageTransform: Transform | null,
        placeholderTransform: Transform | null = null,
        inherit_transform: string | null = null) {
        this.pages.push({
            name,
            url,
            transform: pageTransform,
            placeholder: {
                url: placeholderUrl,
                transform: placeholderTransform
            },
            inherit_transform
        });
    }
    
    addPages(pages: Page[]) {
        this.pages = pages;
    }
    connect() {
        this.pages.map(page => {
            let cube = this.en.cube();
            cube.setColor('lime')
                .setOpacity(0.5)
                .create();

        //     let placeholder = this.en.asset() as EnAsset;
        //     placeholder.load(page.placeholder.url);
        //     if (page.placeholder.transform) {
        //         placeholder.setPos(page.placeholder.transform.position.x,
        //             page.placeholder.transform.position.y,
        //             page.placeholder.transform.position.z)
        //             .setRot(page.placeholder.transform.rotation.x,
        //                 page.placeholder.transform.rotation.y,
        //                 page.placeholder.transform.rotation.z)
        //             .setScale(page.placeholder.transform.scale.x,
        //                 page.placeholder.transform.scale.y,
        //                 page.placeholder.transform.scale.z);
        //     }

        //     let webView = this.en.webview();
        //     webView.setUrl(page.url)
        //         .setParent({ id: placeholder.id.toString() } as webViewParent)
        //         .setTargetable(false);

        //     if (page.transform) {
        //         webView.setScale(page.transform.scale.x, page.transform.scale.y, page.transform.scale.z)
        //     }
        //     webView.create();

        //     placeholder.targetted$.subscribe((message) => {
        //         let targetted = message.payload.state;
        //         cube.setActive(!!targetted);
        //     });

        //     cube.targetted$.subscribe((message) => {
        //         console.log('cube targetted', message.payload.state)
        //         let targetted = message.payload.state;
        //         webView.setActive(!!targetted);
        //         placeholder.setActive(false);
        //         if (!!targetted == false) {
        //             cube.setActive(false);
        //             placeholder.setActive(true);
        //         }
        //     });
        })
    }
}