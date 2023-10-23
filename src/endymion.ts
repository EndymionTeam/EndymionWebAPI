import  { EndymionApi }  from './endymion/endymion-api';
import ACube from './tags/a-cube.element';
import { GenerateSupporStyles, GenerateTransparentMeta } from './utils/dom-utils';

GenerateSupporStyles();
GenerateTransparentMeta();

customElements.define('a-cube', ACube);

(window as any).endymion = new EndymionApi();

export { EndymionApi, ACube };