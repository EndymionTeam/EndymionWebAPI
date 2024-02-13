export class EndymionIncomingWebApi {
    window: Window;
    handlers: Map<string, Function> = new Map();
    communicationInterface: any;
    skipMap: Map<string, { skipCount: number, skipValue: number }> = new Map();
    constructor(commInterface: string = 'vuplex', w: Window = window) {
        this.window = w;
        this.communicationInterface = (this.window as any)[commInterface];
        if (this.communicationInterface == undefined
            || this.communicationInterface === ''
            || this.communicationInterface === null) {
            //polyfill for vuplex for execution in browser
            this.communicationInterface = {};
            this.communicationInterface.postMessage = (message: any) => { };
            this.communicationInterface.addEventListener = (message: any) => { };

        }
        var that = this;
        this.communicationInterface.addEventListener('message', function (event: any) {
            let jsonStr = event.data;
            let json = JSON.parse(jsonStr);
            let name = json.name;
            let payload = json.payload;

            if (!name || !payload) return;
            var handler = that.handlers.get(name);
            if (!handler) {
                name = `${name}_${payload.id}`;
                handler = that.handlers.get(name);
                if (!handler) return;
                var skip = that.skipMap.get(name);
                if (skip !== undefined) {
                    if (skip.skipValue < skip.skipCount) {
                        skip.skipValue++;
                        return;
                    }
                }
            }
            handler(payload);
        });
    }

    addHandler(name: string, funct: Function, skipEvent: boolean = false, skipCount: number = 0) {
        this.handlers.set(name, funct);
        if (skipEvent) {
            this.skipMap.set(name, { skipCount: skipCount, skipValue: 0 });
        }
    }
}