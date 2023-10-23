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
        var rgba = value.replace('rgba', '').replace('(', '').replace(')', '').replace(' ', '').split(',');
        if(    parseInt(rgba[0]) >= 0 
            && parseInt(rgba[0]) <= 255 
            && parseInt(rgba[1]) >= 0 
            && parseInt(rgba[1]) <= 255 
            && parseInt(rgba[2]) >= 0 
            && parseInt(rgba[2]) <= 255
            && parseInt(rgba[3]) >= 0
            && parseInt(rgba[3]) <= 1){
            return {
                r: parseInt(rgba[0]),
                g: parseInt(rgba[1]),
                b: parseInt(rgba[2]),
                a: parseFloat(rgba[3])
            };
        }
    }
    //rgb format
    if(value.includes('rgb')){
        var rgb = value.replace('rgb', '').replace('(', '').replace(')', '').replace(' ', '').split(',');
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
    if(value.includes('transparent')){
        return {
            r: 255,
            g: 255,
            b: 255,
            a: 0
        };
    }

    if(namedColor().has(value.toUpperCase())){
        var hex = namedColor().get((value.toUpperCase() as string));
        var res = hexToRGB(hex as string);
        if(res === false) return false;
        else return res as { r: number; g: number; b: number; a: number; };
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
export const namedColor = ():Map<string, string>=>{
    var m = new Map();

    m.set('RED',  '#FF0000');
    m.set('DARK RED',  '#8B0000');
    m.set('MAROON',  '#800000');
    m.set('TOMATO',  '#FF6347');
    m.set('VIOLET RED',  '#D02090');
    m.set('PALE VIOLET RED',  '#DB7093');
    m.set('MEDIUM VIOLET RED',  '#C71585');
    m.set('INDIAN RED',  '#CD5C5C');
    m.set('FIRE BRICK',  '#B22222');
    m.set('SIENNA',  '#A0522D');
    m.set('ORANGE RED',  '#FF4500');
    m.set('ORANGE',  '#FFA500');
    m.set('DARK ORANGE',  '#FF8C00');
    m.set('CORAL',  '#FF7F50');
    m.set('LIGHT CORAL',  '#F08080');
    m.set('PEACH',  '#FEF0DB');
    m.set('PEACH PUFF',  '#FFDAB9');
    m.set('PAPAYAWHIP',  '#FFEFD5');
    m.set('YELLOW',  '#FFFF00');
    m.set('LIGHT YELLOW',  '#FFFFE0');
    m.set('LEMON CHIFFON',  '#FFFACD');
    m.set('GREEN YELLOW',  '#ADFF2F');
    m.set('SUNFLOWER',  '#F6A600');
    m.set('GOLDENROD',  '#DAA520');
    m.set('DARK GOLDENROD',  '#B8860B');
    m.set('LIGHT GOLDENROD',  '#EEDD82');
    m.set('LIGHT GOLDENROD YELLOW',  '#FAFAD2');
    m.set('PALE GOLDENROD',  '#EEE8AA');
    m.set('PINK',  '#FFC0CB');
    m.set('LIGHT PINK',  '#FFB6C1');
    m.set('HOT PINK',  '#FF69B4');
    m.set('FUCHSIA',  '#FF00FF');
    m.set('DEEP PINK',  '#FF1493');
    m.set('MISTY ROSE',  '#FFE4E1');
    m.set('SALMON',  '#FA8072');
    m.set('LIGHT SALMON',  '#FFA07A');
    m.set('DARK SALMON',  '#E9967A');
    m.set('YELLOW GREEN',  '#9ACD32');
    m.set('GREEN',  '#008000');
    m.set('PALE GREEN',  '#98FB98');
    m.set('LIGHT GREEN',  '#90EE90');
    m.set('DARK GREEN',  '#006400');
    m.set('OLIVE',  '#808000');
    m.set('OLIVE DRAB',  '#6B8E23');
    m.set('DARK OLIVE GREEN',  '#556B2F');
    m.set('CHARTREUSE',  '#7FFF00');
    m.set('FOREST GREEN',  '#228B22');
    m.set('GAINSBORO',  '#DCDCDC');
    m.set('SPRING GREEN',  '#00FF7F');
    m.set('MEDIUM SPRING GREEN',  '#00FA9A');
    m.set('LAWN GREEN',  '#7CFC00');
    m.set('HONEYDEW',  '#F0FFF0');
    m.set('MINT CREAM',  '#F5FFFA');
    m.set('LIGHT SEA GREEN',  '#20B2AA');
    m.set('MEDIUM SEA GREEN',  '#3CB371');
    m.set('DARK SEA GREEN',  '#8FBC8F');
    m.set('LIME',  '#00FF00');
    m.set('LIME GREEN',  '#32CD32');
    m.set('TEAL',  '#008080');
    m.set('TURQUOISE',  '#40E0D0');
    m.set('PALE TURQUOISE',  '#AFEEEE');
    m.set('MEDIUM TURQUOISE',  '#48D1CC');
    m.set('DARK TURQUOISE',  '#00CED1');
    m.set('AQUA',  '#00FFFF');
    m.set('MEDIUM AQUAMARINE',  '#66CDAA');
    m.set('BLUE',  '#0000FF');
    m.set('MEDIUM BLUE',  '#0000CD');
    m.set('DARK BLUE',  '#00008B');
    m.set('LIGHT BLUE',  '#ADD8E6');
    m.set('ALICE BLUE',  '#F0F8FF');
    m.set('NAVY',  '#000080');
    m.set('NAVY BLUE',  '#9FAFDF');
    m.set('AZURE',  '#F0FFFF');
    m.set('CADET BLUE',  '#5F9EA0');
    m.set('CYAN',  '#00FFFF');
    m.set('LIGHT CYAN',  '#E0FFFF');
    m.set('DARK CYAN',  '#008B8B');
    m.set('SLATE BLUE',  '#6A5ACD');
    m.set('LIGHT SLATE BLUE',  '#8470FF');
    m.set('MEDIUM SLATE BLUE',  '#7B68EE');
    m.set('DARK SLATE BLUE',  '#483D8B');
    m.set('POWDER BLUE',  '#B0E0E6');
    m.set('SKY BLUE',  '#87CEEB');
    m.set('LIGHT SKY BLUE',  '#87CEFA');
    m.set('DEEP SKY BLUE',  '#00BFFF');
    m.set('MIDNIGHT BLUE',  '#191970');
    m.set('STEEL BLUE',  '#4682B4');
    m.set('LIGHT STEEL BLUE',  '#B0C4DE');
    m.set('ROYAL BLUE',  '#4169E1');
    m.set('CORNFLOWER BLUE',  '#6495ED');
    m.set('DODGER BLUE',  '#1E90FF');
    m.set('BLUE VIOLET',  '#8A2BE2');
    m.set('INDIGO',  '#4B0082');
    m.set('PURPLE',  '#800080');
    m.set('MEDIUM PURPLE',  '#9370DB');
    m.set('LAVENDER',  '#E6E6FA');
    m.set('LAVENDER BLUSH',  '#FFF0F5');
    m.set('ORCHID',  '#DA70D6');
    m.set('MEDIUM ORCHID',  '#BA55D3');
    m.set('DARK ORCHID',  '#9932CC');
    m.set('THISTLE',  '#D88FD8');
    m.set('PLUM',  '#DDA0DD');
    m.set('VIOLET',  '#EE82EE');
    m.set('DARK VIOLET',  '#9400D3');
    m.set('MAGENTA',  '#FF00FF');
    m.set('DARK MAGENTA',  '#8B008B');
    m.set('WHITE',  '#FFFFFF');
    m.set('ANTIQUE WHITE',  '#FAEBD7');
    m.set('FLORAL WHITE',  '#FFFAF0');
    m.set('GHOST WHITE',  '#F8F8FF');
    m.set('IVORY',  '#FFFFF0');
    m.set('NAVAJO WHITE',  '#FFDEAD');
    m.set('SNOW',  '#FFFAFA');
    m.set('WHITE SMOKE',  '#F5F5F5');
    m.set('GRAY',  '#808080');
    m.set('DARK GRAY',  '#A9A9A9');
    m.set('DARK SLATE GRAY',  '#2F4F4F');
    m.set('DIM GRAY',  '#696969');
    m.set('LIGHT GRAY',  '#D3D3D3');
    m.set('SLATE GRAY',  '#708090');
    m.set('LIGHT SLATE GREY',  '#778899');
    m.set('BROWN',  '#A52A2A');
    m.set('CHOCOLATE',  '#D2691E');
    m.set('ROSY BROWN',  '#BC8F8F');
    m.set('SADDLE BROWN',  '#8B4513');
    m.set('SANDY BROWN',  '#F4A460');
    m.set('SEASHELL',  '#FFF5EE');
    m.set('BEIGE',  '#F5F5DC');
    m.set('LINEN',  '#FAF0E6');
    m.set('OLD LACE',  '#FDF5E6');
    m.set('WHEAT',  '#F5DEB3');
    m.set('BLANCHED ALMOND',  '#FFEBCD');
    m.set('BISQUE',  '#FFE4C4');
    m.set('PERU',  '#CD853F');
    m.set('MOCCASIN',  '#FFE4B5');
    m.set('CORN SILK',  '#FFF8DC');
    m.set('BURLY WOOD',  '#DEB887');
    m.set('KHAKI',  '#F0E68C');
    m.set('DARK KHAKI',  '#BDB76B');
    m.set('BLACK',  '#000000');
    m.set('PEARLESCENT',  '#FFE2B7 ');
    m.set('GOLD',  '#FFD700');
    m.set('SILVER',  '#C0C0C0');
    m.set('COPPER',  '#B87333');
    return m;
}
export function rgba(r:number, g:number, b:number, a:number){
    if(r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 || a < 0 || a > 1) return {r:0, g:0, b:0, a:1};
    return { r, g, b, a };
}
export function rgb(r:number, g:number, b:number){
    if(r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return {r:0, g:0, b:0, a:1};
    return { r, g, b, a:1 };
}
