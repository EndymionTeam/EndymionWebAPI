import { En } from './endymion/en';
import { GenerateSupporStyles, removeSupportStyle } from './utils/dom-utils';
import { ApplyAnalytics } from './utils/analytics';
GenerateSupporStyles(document);
ApplyAnalytics(document, '66d201a048ad8047c37d9115');
(window as any).en = new En();
(window as any).removeSupportStyle = removeSupportStyle;
(window as any).EnSpace = {
    objectId: 0,
    environment: 'web-browser',
    debugMode: false,
    version: '2.6.0',
    apiVersion:'3'
}

export { En }