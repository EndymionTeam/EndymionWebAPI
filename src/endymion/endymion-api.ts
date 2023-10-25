import { Primitive, Position, Rotation, Scale, Color, Entity, EntityMap } from './endymion.types';
import { EndymionCore } from './endymion-core';
import { hexToRGB, namedColor } from '../utils/color-utils';
import { rgba, rgb } from '../utils/color-utils';
import { getCurrentProtocol, getCurrentHost } from '../utils/nav-utils';
export class EndymionApi{
    objectId: number = 0;
    primitive!: Primitive;
    position!: Position;
    rotation!: Rotation;
    scale!: Scale;
    color!: Color;
    core!: EndymionCore;
    entity!: Entity;
    url!: string;
    animation:boolean = false;
    index:number = 0;
    animationName:string = '';
    renderedEntities: Map<number, EntityMap> = new Map();
    constructor(){
        this.primitive = 'cube';
        this.position = {x:0, y:0, z:0};
        this.rotation = {x:0, y:0, z:0};
        this.scale = {x:1, y:1, z:1};
        this.color = {r:255, g:255, b:255, a:1};
        this.core = new EndymionCore();
        this.url = '';
    }
    /**
     * Sets the primitive of the EndymionApi instance.
     * @param primitive - The primitive to set.
     * @returns The updated EndymionApi instance.
     */
    public setPrimitive = (primitive:Primitive):EndymionApi => {
        this.primitive = primitive;
        return this;
    }
    /**
     * Sets the position of the EndymionApi instance.
     * @param position - The new position to set.
     * @returns The updated EndymionApi instance.
     */
    public setPosition = (position:Position):EndymionApi => {
        this.position = position;
        return this;
    }
    /**
     * Sets the x-coordinate of the position of the EndymionApi object.
     * @param x - The new x-coordinate value.
     * @returns The updated EndymionApi object.
     */
    public setPosX = (x:number):EndymionApi => {
        this.position.x = x;
        return this;
    }
    /**
     * Sets the y-coordinate of the position of the EndymionApi object.
     * @param y - The new y-coordinate value.
     * @returns The updated EndymionApi object.
     */
    public setPosY = (y:number):EndymionApi => {
        this.position.y = y;
        return this;
    }
    /**
     * Sets the z position of the EndymionApi object.
     * @param z - The new z position value.
     * @returns The updated EndymionApi object.
     */
    public setPosZ = (z:number):EndymionApi => {
        this.position.z = z;
        return this;
    }
    /**
     * Sets the rotation of the EndymionApi instance.
     * @param rotation The rotation to set.
     * @returns The updated EndymionApi instance.
     */
    public setRotation = (rotation:Rotation):EndymionApi => {
        this.rotation = rotation;
        return this;
    }
    /**
     * Sets the rotation value of the x-axis.
     * @param x - The value to set the x-axis rotation to.
     * @returns The updated EndymionApi instance.
     */
    public setRotX = (x:number):EndymionApi => {
        this.rotation.x = x;
        return this;
    }
    /**
     * Sets the rotation of the EndymionApi object around the y-axis.
     * @param y The new rotation value in radians.
     * @returns The updated EndymionApi object.
     */
    public setRotY = (y:number):EndymionApi => {
        this.rotation.y = y;
        return this;
    }
    /**
     * Sets the rotation around the z-axis of the EndymionApi object.
     * @param z - The rotation value in radians.
     * @returns The updated EndymionApi object.
     */
    public setRotZ = (z:number):EndymionApi => {
        this.rotation.z = z;
        return this;
    }   
    /**
     * Sets the scale of the EndymionApi instance.
     * @param scale The scale to set.
     * @returns The updated EndymionApi instance.
     */
    public setScale = (scale:Scale):EndymionApi => {
        this.scale = scale;
        return this;
    }
    /**
     * Sets the scale of the EndymionApi instance along the x-axis.
     * @param x - The new scale value for the x-axis.
     * @returns The updated EndymionApi instance.
     */
    public setScaleX = (x:number):EndymionApi => {
        this.scale.x = x;
        return this;
    }
    /**
     * Sets the scale of the object along the y-axis.
     * @param y - The new scale value for the y-axis.
     * @returns The updated EndymionApi object.
     */
    public setScaleY = (y:number):EndymionApi => {
        this.scale.y = y;
        return this;
    }
    /**
     * Sets the z scale of the EndymionApi object.
     * @param z - The z scale value to set.
     * @returns The updated EndymionApi object.
     */
    public setScaleZ = (z:number):EndymionApi => {
        this.scale.z = z;
        return this;
    }
    /**
     * Sets the color of the EndymionApi object.
     * @param color - The color to set. Can be a Color object or a string in the format of a hex, rgb, or rgba value.
     * @returns The updated EndymionApi object.
     */
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
            if(namedColor().has(color.toUpperCase())){
                var hexColor = namedColor().get(color.toUpperCase()) as string;
                this.color = hexToRGB(hexColor) as Color;
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

    /**
     * Sets the opacity of the EndymionApi object.
     * @param opacity - A number between 0 and 1 representing the opacity value.
     * @returns The updated EndymionApi object.
     * @throws An error if the opacity value is not between 0 and 1.
     */
    public setOpacity = (opacity:number):EndymionApi => {
        if(opacity <0 || opacity > 1) throw new Error('Opacity must be between 0 and 1');
        this.color.a = opacity;
        return this;
    }

    /**
     * Renders an entity and returns an EntityMap object.
     * @returns {EntityMap} The rendered entity as an EntityMap object.
     */
    public render = (): EntityMap => {
        this.objectId += 1;
        this.entity = this.mapEntity(this);
        if(this.primitive === 'gltf'){
            this.core.importGltf(this.objectId, this.url);
            this.core.sendAction('update-transform', this.entity);
            if(this.animation){
                this.core.playAnimation(this.objectId, this.index, this.animationName);
                this.animation = false;
            }
        }else{
            this.core.sendAction('create-primitive',this.entity);
            this.core.setColor(this.entity.id, this.color);
        }
        this.renderedEntities.set(this.entity.id, {...this.entity, color:this.color, url:this.url});
        return {...this.entity, color:this.color};
    }

    /**
     * Applies the changes made to the entity and returns the updated entity map.
     * @returns The updated entity map with the new color.
     */
    public apply = (): EntityMap => {
        this.entity = this.mapEntity(this);
        if(this.primitive === 'gltf'){
            this.core.sendAction('update-transform', this.entity);
            if(this.animation){
                this.core.playAnimation(this.objectId, this.index, this.animationName);
                this.animation = false;
            }
        }else{
            this.core.sendAction('update-transform', this.entity);
            this.core.setColor(this.entity.id, this.color);
        }
        return {...this.entity, color:this.color};
    }

    /**
     * Sets the primitive to 'cube'.
     * @returns The EndymionApi instance.
     */
    public cube = (): EndymionApi => {
        this.primitive = 'cube';
        return this;
    }

    /**
     * Sets the primitive to 'sphere' for the EndymionApi instance.
     * @returns The updated EndymionApi instance.
     */
    public sphere = (): EndymionApi => {
        this.primitive = 'sphere';
        return this;
    }

    /**
     * Sets the primitive to 'cylinder'.
     * @returns The EndymionApi instance.
     */
    public cylinder = (): EndymionApi => {
        this.primitive = 'cylinder';
        return this;
    }

    /**
     * Sets the primitive to 'capsule' and returns the EndymionApi instance.
     * @returns {EndymionApi} The EndymionApi instance.
     */
    public capsule = (): EndymionApi => {
        this.primitive = 'capsule';
        return this;
    }

    /**
     * Sets the primitive to 'plane' for the EndymionApi instance.
     * @returns The updated EndymionApi instance.
     */
    public plane = (): EndymionApi => {
        this.primitive = 'plane';
        return this;
    }

    /**
     * Sets the primitive type to 'quad'.
     * @returns The EndymionApi instance.
     */
    public quad = (): EndymionApi => {
        this.primitive = 'quad';
        return this;
    }

    /**
     * Sets the properties of the EndymionApi instance based on the provided entity.
     * @param entity - The entity to set the properties from.
     * @returns The updated EndymionApi instance.
     */
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
    
    /**
     * Loads an asset from the specified URL.
     * @param url The URL of the asset to load.
     * @returns The EndymionApi instance.
     */
    public loadAsset = (url:string):EndymionApi => {
        this.primitive = 'gltf';
        if(url.includes('http')){
            this.url = url;
            return this;
        }
        this.url = `${getCurrentProtocol()}//${getCurrentHost()}/${url}`
        return this;
    }

    /**
     * Plays an animation on the specified entity.
     * @param index The index of the animation to play.
     * @returns The EndymionApi instance.
     */
    public playAnimation = (index:number):EndymionApi => {
        this.animation = true;
        this.index = index;
        this.animationName = "";
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