import { En } from './endymion/en';
import ACube from './tags/a-cube.element';
import { GenerateSupporStyles, GenerateTransparentMeta, removeSupportStyle } from './utils/dom-utils';
import { EndymionDebug, consoleLog } from './utils/debug'
GenerateSupporStyles(document);
GenerateTransparentMeta(document);

customElements.define('a-cube', ACube);


(window as any).en = new En();
(window as any).endymionDebug = EndymionDebug;
(window as any).removeSupportStyle = removeSupportStyle;
(window as any).EnSpace = {
    objectId: 0,
    environment: 'web-browser',
    debugMode: false,
    apiVersion: '2.0.0',
}

export { ACube, En };