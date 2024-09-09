export function ApplyAnalytics(doc: Document, code: string){

    let script = doc.createElement('script');
    script.setAttribute('defer', '');
    script.setAttribute('src', 'https://cdn.jsdelivr.net/gh/litlyx/litlyx-js/browser/litlyx.js');
    script.setAttribute('data-project', code);
    doc.head.appendChild(script);
}
