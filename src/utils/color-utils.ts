export function checkValueForColor(value: string):boolean | { r: number; g: number; b: number; a: number; } {
    // #xxxxxx format
    if( value.includes('#')){
        var res = hexToRGB(value);
        if(res === false) return false;
        else return res as { r: number; g: number; b: number; a: number; };
    }
    // {"r": 255, "g":255, "b":255, "a":1} format
    if( value.includes('r')
        && value.includes('g')
        && value.includes('b')
        && value.includes('a')
        && value.includes('}')
        && value.includes('{')){
        
        var parsed = parsing(value);//JSON.parse(value);

        if(typeof parsed['r'] === 'number' && typeof parsed['g'] === 'number' && typeof parsed['b'] === 'number'){
            if(    parsed['r'] >= 0 
                && parsed['r'] <= 255 
                && parsed['g'] >= 0 
                && parsed['g'] <= 255 
                && parsed['b'] >= 0 
                && parsed['b'] <= 255
                && parsed['a'] >= 0
                && parsed['a'] <= 1){
                return parsed as { r: number; g: number; b: number; a: number; }
            }
        }
    }
    //rgba format
    if(value.includes('rgba')){
        var rgb = value.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(' ', '').split(',');
        if(    parseInt(rgb[0]) >= 0 
            && parseInt(rgb[0]) <= 255 
            && parseInt(rgb[1]) >= 0 
            && parseInt(rgb[1]) <= 255 
            && parseInt(rgb[2]) >= 0 
            && parseInt(rgb[2]) <= 255
            && parseInt(rgb[3]) >= 0
            && parseInt(rgb[3]) <= 1){
            return {
                r: parseInt(rgb[0]),
                g: parseInt(rgb[1]),
                b: parseInt(rgb[2]),
                a: parseInt(rgb[3])
            };
        }
    }
    //rgb format
    if(value.includes('rgb')){
        var rgb = value.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(' ', '').split(',');
        if(    parseInt(rgb[0]) >= 0 
            && parseInt(rgb[0]) <= 255 
            && parseInt(rgb[1]) >= 0 
            && parseInt(rgb[1]) <= 255 
            && parseInt(rgb[2]) >= 0 
            && parseInt(rgb[2]) <= 255){
            return {
                r: parseInt(rgb[0]),
                g: parseInt(rgb[1]),
                b: parseInt(rgb[2]),
                a: 1
            };
        }
    }
    return false;
}

export function hexToRGB(color: string){
    // return an array containing R, G and B values
    if(color === 'transparent')// IE (6 and ?)
        color = '#FFF';
    var r,g,b;
    var hex_color_pcre = new RegExp("^#[0-9a-f]{3}([0-9a-f]{3})?$",'gi');
    var rgb_color_pcre = new RegExp("rgb\\(\\s*((?:[0-2]?[0-9])?[0-9])\\s*,\\s*((?:[0-2]?[0-9])?[0-9])\\s*,\\s*((?:[0-2]?[0-9])?[0-9])\\s*\\)$",'gi');
    var rgb_percent_color_pcre = new RegExp("rgb\\(\\s*((?:[0-1]?[0-9])?[0-9])%\\s*,\\s*((?:[0-1]?[0-9])?[0-9])%\\s*,\\s*((?:[0-1]?[0-9])?[0-9])%\\s*\\)$",'gi');
    if(color.match(hex_color_pcre)){
        if(color.length == 4){
            r  = color.charAt(1)+""+color.charAt(1);
            g  = color.charAt(2)+""+color.charAt(2);
            b  = color.charAt(3)+""+color.charAt(3);
        }
        else{
            r  = color.charAt(1)+""+color.charAt(2);
            g  = color.charAt(3)+""+color.charAt(4);
            b  = color.charAt(5)+""+color.charAt(6);
        }
        r = h2d(r);
        g = h2d(g);
        b = h2d(b);
    }
    else if(color.match(rgb_color_pcre)){
        r = RegExp.$1;
        g = RegExp.$2;
        b = RegExp.$3;
    }
    else if(color.match(rgb_percent_color_pcre)){
        r = parseInt(RegExp.$1)*2.55;
        g = parseInt(RegExp.$2)*2.55;
        b = parseInt(RegExp.$3)*2.55;
    }
    else
        return false;

    var returned ={
        r: r,
        g: g,
        b: b,
        a: 1
    };
    return returned;
}
export function parsing(value:string):any{
    var parsed = { r: 0, g: 0, b: 0, a: 0};
    try{
        parsed = JSON.parse(value);
    }catch(e){
        var tmp:any[] = [];
        var res = value.replace('{', '').replace('}', '').replace(' ', '').split(',');
        for(var i = 0; i < res.length; i++){
            let t = res[i].split(':');
            t[0] = t[0].trim();
            t[1] = t[1].trim();
            tmp.push(t);
        }
        for(var i = 0; i < tmp.length; i++){
            if(tmp[i][0] === 'r'){
                parsed['r'] = parseInt(tmp[i][1]);
            }else if(tmp[i][0] === 'g'){
                parsed['g'] = parseInt(tmp[i][1]);
            }else if(tmp[i][0] === 'b'){
                parsed['b'] = parseInt(tmp[i][1]);
            }else if(tmp[i][0] === 'a'){
                parsed['a'] = parseInt(tmp[i][1]);
            }
        }
        return parsed;
    }
    return parsed;
}
export function h2d(h: string) {
    // hex to decimal
    return parseInt(h,16);
} 