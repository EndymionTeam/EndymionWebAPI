/**
 * Returns the current protocol used by the browser.
 * @returns {string} The current protocol used by the browser.
 */
export function getCurrentProtocol() {
    return window.location.protocol;
}
/**
 * Returns the current host of the window location.
 * @returns {string} The current host of the window location.
 */
export function getCurrentHost() {
    return window.location.host;
}
/**
 * Returns the current port number of the window location.
 * @returns {string} The current port number of the window location.
 */
export function getCurrentPort() {
    return window.location.port;
}