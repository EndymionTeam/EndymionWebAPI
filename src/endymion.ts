import { En } from './endymion/en';
import { GenerateSupporStyles, GenerateTransparentMeta, removeSupportStyle } from './utils/dom-utils';
GenerateSupporStyles(document);
GenerateTransparentMeta(document);
(window as any).en = new En();
(window as any).removeSupportStyle = removeSupportStyle;
(window as any).EnSpace = {
    objectId: 0,
    environment: 'web-browser',
    debugMode: false,
    apiVersion: '2.4.0',
}

export { En };