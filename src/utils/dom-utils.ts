/**
 * Generates and appends a style element to the head of the document with custom styles for the body element.
 */
export function GenerateSupporStyles(doc: Document) {
    const style = doc.createElement("style");
    style.innerHTML = `
    body{
        background-color: transparent!important;
        font-size: 48px;
      };`
      doc.head.appendChild(style);
}

/**
 * Generates a meta tag with the name "transparent" and content "true" and appends it to the document head.
 */
export function GenerateTransparentMeta(doc: Document) {
    const meta = doc.createElement("meta");
    meta.setAttribute("name", "transparent");
    meta.setAttribute("content", "true");
    doc.head.appendChild(meta);
}
