export function ApplyGoogleAnalyticsScript(doc: Document, code: string){

    let script = doc.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=' + code);

    script.addEventListener('load', function(event){
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args:any[]){ (window as any).dataLayer.push(args)};
        gtag('js', new Date());
        gtag('config', code);
    });
    doc.head.appendChild(script);
}