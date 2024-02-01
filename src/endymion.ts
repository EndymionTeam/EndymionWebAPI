import  { EndymionApi, rgb, rgba }  from './endymion/endymion-api';
import ACube from './tags/a-cube.element';
import { GenerateSupporStyles, GenerateTransparentMeta, removeSupportStyle } from './utils/dom-utils';
import { EndymionDebug, consoleLog } from './utils/debug'
GenerateSupporStyles(document);
GenerateTransparentMeta(document);

customElements.define('a-cube', ACube);

(window as any).endymion = new EndymionApi();
(window as any).endymionDebug = EndymionDebug;
(window as any).consoleLog = consoleLog;
(window as any).removeSupportStyle = removeSupportStyle;
(window as any).rgb = rgb;
(window as any).rgba = rgba;

export { EndymionApi, ACube, rgb, rgba };