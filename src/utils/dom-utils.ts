/**
 * Generates and appends a style element to the head of the document with custom styles for the body element.
 */
export function GenerateSupporStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
    body{
        background-color: transparent!important;
        font-size: 48px;
      };`
    document.head.appendChild(style);
}

/**
 * Generates a meta tag with the name "transparent" and content "true" and appends it to the document head.
 */
export function GenerateTransparentMeta() {
    const meta = document.createElement("meta");
    meta.setAttribute("name", "transparent");
    meta.setAttribute("content", "true");
    document.head.appendChild(meta);
}
