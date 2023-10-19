import  { EndymionApi }  from './endymion/endymion-api';
import ACube from './tags/a-cube.element';

customElements.define('a-cube', ACube);
(window as any).endymion = new EndymionApi();

export { EndymionApi, ACube };