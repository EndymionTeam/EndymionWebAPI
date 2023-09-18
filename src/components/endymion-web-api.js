import { Subject } from 'rxjs';
class EndymionWebApi{
    vuplex;
    messageIn = new Subject();
    messageIn$ = this.messageIn.asObservable();
    constructor(){
        this.vuplex = window.vuplex;
        if (this.vuplex == undefined 
            || this.vuplex ==='' 
            || this.vuplex === null) throw new Error("vuplex is not setted");

        window.vuplex.addEventListener('message', (event)=>{
            this.messageIn.next(event.data);
        });
               
    }

    createAction = (actName, actPayload) =>{
        var act = {};
        act.name = actName;
        act.payload = actPayload;
        return act;
    }

    sendAction = (name, payload)=>{
        let jsonAction = this.createAction(name, payload);
        window.vuplex.postMessage(jsonAction);
    }
    
    sendActions = (actionArray) =>{
        var jsonAction = this.createAction('multi-action', actionArray);
        window.vuplex.postMessage(jsonAction);
    }
}
export { EndymionWebApi }