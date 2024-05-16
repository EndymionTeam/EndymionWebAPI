import { En } from './endymion/en';
import { GenerateSupporStyles, removeSupportStyle } from './utils/dom-utils';
GenerateSupporStyles(document);
(window as any).en = new En();
(window as any).removeSupportStyle = removeSupportStyle;
(window as any).EnSpace = {
    objectId: 0,
    environment: 'web-browser',
    debugMode: false,
    apiVersion: '2.5.3',
}

export { En }