import  { EndymionApi, rgb, rgba }  from './endymion/endymion-api';
import ACube from './tags/a-cube.element';
import { GenerateSupporStyles, GenerateTransparentMeta } from './utils/dom-utils';
import { EndymionDebug } from './utils/debug'
GenerateSupporStyles();
GenerateTransparentMeta();

customElements.define('a-cube', ACube);

(window as any).endymion = new EndymionApi();
(window as any).endymionDebug = EndymionDebug;
(window as any).rgb = rgb;
(window as any).rgba = rgba;

export { EndymionApi, ACube, rgb, rgba };