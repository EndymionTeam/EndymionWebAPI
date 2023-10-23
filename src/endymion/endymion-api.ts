import { Primitive, Position, Rotation, Scale, Color, Entity, EntityMap } from './endymion.types';
import { EndymionCore } from './endymion-core';
import { hexToRGB } from '../utils/color-utils';
import { rgba, rgb } from '../utils/color-utils';
export class EndymionApi{
    objectId: number = 0;
    primitive!: Primitive;
    position!: Position;
    rotation!: Rotation;
    scale!: Scale;
    color!: Color;
    core!: EndymionCore;
    entity!: Entity;
    renderedEntities: Map<number, EntityMap> = new Map();
    constructor(){
        this.primitive = 'cube';
        this.position = {x:0, y:0, z:0};
        this.rotation = {x:0, y:0, z:0};
        this.scale = {x:1, y:1, z:1};
        this.color = {r:255, g:255, b:255, a:1};
        this.core = new EndymionCore();
    }
    public setPrimitive = (primitive:Primitive):EndymionApi => {
        this.primitive = primitive;
        return this;
    }
    public setPosition = (position:Position):EndymionApi => {
        this.position = position;
        return this;
    }
    public setPosX= (x:number):EndymionApi => {
        this.position.x = x;
        return this;
    }
    public setPosY= (y:number):EndymionApi => {
        this.position.y = y;
        return this;
    }
    public setPosZ= (z:number):EndymionApi => {
        this.position.z = z;
        return this;
    }
    public setRotation = (rotation:Rotation):EndymionApi => {
        this.rotation = rotation;
        return this;
    }
    public setRotX= (x:number):EndymionApi => {
        this.rotation.x = x;
        return this;
    }
    public setRotY= (y:number):EndymionApi => {
        this.rotation.y = y;
        return this;
    }
    public setRotZ= (z:number):EndymionApi => {
        this.rotation.z = z;
        return this;
    }   
    public setScale = (scale:Scale):EndymionApi => {
        this.scale = scale;
        return this;
    }
    public setScaleX= (x:number):EndymionApi => {
        this.scale.x = x;
        return this;
    }
    public setScaleY= (y:number):EndymionApi => {
        this.scale.y = y;
        return this;
    }
    public setScaleZ= (z:number):EndymionApi => {
        this.scale.z = z;
        return this;
    }
    public setColor = (color:Color | string):EndymionApi => {
        if(typeof color === 'string'){
            if(color.includes('#')){
                this.color = hexToRGB(color) as Color;
            }
            if(color.includes('rgb')){
                const rgb = color.replace('rgb(','').replace(')','').split(',');
                this.color = {r:parseInt(rgb[0]), g:parseInt(rgb[1]), b:parseInt(rgb[2]), a:1};
            }
            if(color.includes('rgba')){
                const rgb = color.replace('rgba(','').replace(')','').split(',');
                this.color = {r:parseInt(rgb[0]), g:parseInt(rgb[1]), b:parseInt(rgb[2]), a:parseFloat(rgb[3])};
            }
        }
        if(typeof color === 'object' 
                && color !== null 
                && color !== undefined 
                && color.hasOwnProperty('r') 
                && color.hasOwnProperty('g') 
                && color.hasOwnProperty('b') 
                && color.hasOwnProperty('a')){
            this.color = color;
        }
        return this;
    }

    public render = (): EntityMap => {
        this.objectId += 1;
        this.entity = this.mapEntity(this);
        this.core.sendAction('create-primitive',this.entity);
        this.core.setColor(this.entity.id, this.color);
        this.renderedEntities.set(this.entity.id, {...this.entity, color:this.color});
        return {...this.entity, color:this.color};
    }

    public apply = (): EntityMap => {
        this.entity = this.mapEntity(this);
        this.core.sendAction('destroy-object',{ id:this.entity.id });
        this.core.sendAction('create-primitive', this.entity);
        this.core.setColor(this.entity.id, this.color);
        return {...this.entity, color:this.color};
    }

    public cube = (): EndymionApi => {
        this.primitive = 'cube';
        return this;
    }

    public sphere = (): EndymionApi => {
        this.primitive = 'sphere';
        return this;
    }

    public cylinder = (): EndymionApi => {
        this.primitive = 'cylinder';
        return this;
    }

    public capsule = (): EndymionApi => {
        this.primitive = 'capsule';
        return this;
    }

    public plane = (): EndymionApi => {
        this.primitive = 'plane';
        return this;
    }

    public quad = (): EndymionApi => {
        this.primitive = 'quad';
        return this;
    }

    public with = (entity:EntityMap): EndymionApi => {
        if(entity !== undefined){
            this.objectId = entity.id;
            var entityMap = this.renderedEntities.get(entity.id);
            if(entityMap){
                this.primitive = entityMap.primitive;
                this.position = entityMap.position;
                this.rotation = entityMap.rotation;
                this.scale = entityMap.scale;
                this.color = entityMap.color;
            }
        }
        return this;
    }
    

    private mapEntity = (config:EndymionApi): Entity=> {
        return {
            id: config.objectId,
            primitive: config.primitive,
            position: config.position,
            rotation: config.rotation,
            scale: config.scale
        } as Entity;
    }

}
export { rgba, rgb };