export class EndymionWebApi{
    vuplex;

    constructor(){
        this.vuplex = window.vuplex;
        if (this.vuplex == undefined 
            || this.vuplex ==='' 
            || this.vuplex === null) throw new Error("vuplex is not setted");
               
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