export class Win {
    w: Window;
    constructor(w:Window = window) {
        this.w = w;
    }
    public getCurrentProtocol() {
        return this.w.location.protocol;
    }
    public getCurrentHost() {
        return this.w.location.host;
    }
    public getCurrentPort() {
        return this.w.location.port;
    }
}