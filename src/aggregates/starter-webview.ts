import { En } from "../endymion";
import { webViewParent, Transform } from "../endymion/endymion-v2.types";
import { EnAsset } from "../entities/en-asset";
import { BaseEntity } from "../entities/en-base-entity";

export type Page = {
    name: string;
    url: string;
    placeholder: BaseEntity;
    hologram: EnAsset;
    transform: Transform;
}

export class StarterWebView {
    pages: Page[] = [];
    constructor(private en: En) {

    }
    addPage(name: string, url: string, placeholder: BaseEntity, hologram: EnAsset, transform: Transform) {
        this.pages.push({ name, url, placeholder, hologram, transform });
    }
    addPages(pages: Page[]) {
        this.pages = pages;
    }
    connect() {
        this.pages.map(page => {
            let webView = this.en.webview();
            webView.setUrl(page.url)
                .setParent({ id: page.placeholder.id.toString() } as webViewParent)
                .setScale(page.transform.scale.x, page.transform.scale.y, page.transform.scale.z)
                .setTargetable(false)
                .create();
            page.hologram.targetted$.subscribe((message) => {
                let targetted = message.payload.state;
                page.placeholder.setActive(!!targetted);
            });
            page.placeholder.targetted$.subscribe((message) => {
                let targetted = message.payload.state;
                webView.setActive(!!targetted);
                page.hologram.setActive(false);
                if(!!targetted == false) {
                    page.placeholder.setActive(false);
                    page.hologram.setActive(true);
                }
            });
        })
    }
}