import { En } from './endymion/en';
import { GenerateSupporStyles, removeSupportStyle } from './utils/dom-utils';
import { ApplyGoogleAnalyticsScript } from './utils/google-tag';
GenerateSupporStyles(document);
ApplyGoogleAnalyticsScript(document, 'G-7GSJCF5BLC');
(window as any).en = new En();
(window as any).removeSupportStyle = removeSupportStyle;
(window as any).EnSpace = {
    objectId: 0,
    environment: 'web-browser',
    debugMode: false,
    apiVersion: '2.5.8',
}

export { En }