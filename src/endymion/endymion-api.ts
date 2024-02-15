import { Primitive, Position, Rotation, Scale, Color, Entity, EntityMap, message, webViewParent, webViewPayload, Coordinate } from './endymion.types';
import { EndymionCore } from './endymion-core';
import { hexToRGB, namedColor } from '../utils/color-utils';
import { rgba, rgb } from '../utils/color-utils';
import { Win } from '../utils/nav-utils';
import { EndymionIncomingWebApi } from './endymion-incoming-api';
export class EndymionApi {
    objectId: number = 0;
    primitive!: Primitive;
    position!: Position;
    rotation!: Rotation;
    scale!: Scale;
    color!: Color;
    core!: EndymionCore;
    webViewParent!: webViewParent;
    incomingApi!: EndymionIncomingWebApi;
    thickness: number = 4;
    points: Coordinate[] = [];
    entity!: Entity;
    url!: string;
    statusActivated!: boolean;
    target!: boolean;
    radius!: number;
    animation: boolean = false;
    index: number = 0;
    animationName: string = '';
    renderedEntities: Map<number, EntityMap> = new Map();
    isClickable: boolean = false;
    win: Win;
    webViewMap: Map<string, webViewPayload> = new Map();
    private filterCount: Map<string, number> = new Map();

    constructor(interf: string = 'vuplex', w: Window = window) {
        this.primitive = 'cube';
        this.position = { x: 0, y: 0, z: 0 };
        this.rotation = { x: 0, y: 0, z: 0 };
        this.scale = { x: 1, y: 1, z: 1 };
        this.color = { r: 255, g: 255, b: 255, a: 1 };
        this.core = new EndymionCore(interf, w);
        this.incomingApi = new EndymionIncomingWebApi(interf, w);
        this.url = '';
        this.statusActivated = true;
        this.target = false;
        this.radius = 0.1;
        this.win = new Win(w);
    }

    /**
     * Sends a message to the Endymion Browser Application.
     * @param message - The message to send.
     */
    public sendMessage = (message: message) => {
        this.core.sendMessage(message);
    }
    /**
     * Registers a message handler function for a specific handler name.
     * @param handlerName - The name of the handler.
     * @param handlerFunction - The function to be executed when a message with the specified handler name is received.
     */
    public onMessage = (handlerName: string, handlerFunction: Function): void => {
        this.incomingApi.addHandler(handlerName, handlerFunction);
    }

    public on = (handlerName: string, handlerFunction: Function, skipEvent: boolean = false, skipCount: number = 0): EndymionApi => {
        if (handlerName === 'target') {
            this.target = true;
            this.radius = 0.1;
            this.incomingApi.addHandler(`object-onaim_${this.objectId}`, handlerFunction, skipEvent, skipCount);
            return this;
        }
        if (handlerName === 'click') {
            this.incomingApi.addHandler(`actor-on-click_${this.objectId}`, handlerFunction, skipEvent, skipCount);
            return this;
        }
        this.target = true;
        this.radius = 0.1;
        this.incomingApi.addHandler(`${handlerName}_${this.objectId}`, handlerFunction, skipEvent, skipCount);
        return this;
    }
    /**
     * Sets the primitive of the EndymionApi instance.
     * @param primitive - The primitive to set.
     * @returns The updated EndymionApi instance.
     */
    public setPrimitive = (primitive: Primitive): EndymionApi => {
        this.primitive = primitive;
        return this;
    }
    /**
     * Sets the position of the EndymionApi object.
     * @param x - The x-coordinate of the position, or a Position object containing all three coordinates.
     * @param y - The y-coordinate of the position. Defaults to -100000 if not provided.
     * @param z - The z-coordinate of the position. Defaults to -100000 if not provided.
     * @returns The updated EndymionApi object.
     * 
     * @example
     * // Sets the position of the EndymionApi object to 1, 2, 3.
     * endymion.setPosition(1, 2, 3);           set position to {x:1, y:2, z:3}
     * endymion.setPosition({x:1, y:2, z:3});   set position to {x:1, y:2, z:3}
     * endymion.setPosition(1);                 set position to {x:1, y:1, z:1}
     */
    public setPosition = (x: Position | number, y: number = -100000, z: Number = -100000): EndymionApi => {
        if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
            if (y === -100000 && z === -100000) {
                this.position = { x: x, y: x, z: x };
                return this;
            }
            this.position = { x, y, z };
            return this;
        }
        this.position = x as Position;
        return this;
    }
    /**
     * Sets the x-coordinate of the position of the EndymionApi object.
     * @param x - The new x-coordinate value.
     * @returns The updated EndymionApi object.
     */
    public setPosX = (x: number): EndymionApi => {
        this.position.x = x;
        return this;
    }
    /**
     * Sets the y-coordinate of the position of the EndymionApi object.
     * @param y - The new y-coordinate value.
     * @returns The updated EndymionApi object.
     */
    public setPosY = (y: number): EndymionApi => {
        this.position.y = y;
        return this;
    }
    /**
     * Sets the z position of the EndymionApi object.
     * @param z - The new z position value.
     * @returns The updated EndymionApi object.
     */
    public setPosZ = (z: number): EndymionApi => {
        this.position.z = z;
        return this;
    }

    /**
     * Sets the rotation of the EndymionApi object.
     * @param x - The x-axis rotation value or a Rotation object containing all three rotation values.
     * @param y - The y-axis rotation value. Defaults to -100000 if not provided.
     * @param z - The z-axis rotation value. Defaults to -100000 if not provided.
     * @returns The updated EndymionApi object.
     * 
     * @example
     * // Sets the rotation of the EndymionApi object to 1, 2, 3.
     * endymion.setRotation(1, 2, 3);           set rotation to {x:1, y:2, z:3}
     * endymion.setRotation({x:1, y:2, z:3});   set rotation to {x:1, y:2, z:3}
     * endymion.setRotation(1);                 set rotation to {x:1, y:1, z:1}
     */
    public setRotation = (x: Rotation | number, y: number = -100000, z: number = -100000): EndymionApi => {
        if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
            if (y === -100000 && z === -100000) {
                this.rotation = { x: x, y: x, z: x };
                return this;
            }
            this.rotation = { x, y, z };
            return this;
        }
        this.rotation = x as Rotation;
        return this;
    }
    /**
     * Sets the rotation value of the x-axis.
     * @param x - The value to set the x-axis rotation to.
     * @returns The updated EndymionApi instance.
     */
    public setRotX = (x: number): EndymionApi => {
        this.rotation.x = x;
        return this;
    }
    /**
     * Sets the rotation of the EndymionApi object around the y-axis.
     * @param y The new rotation value in radians.
     * @returns The updated EndymionApi object.
     */
    public setRotY = (y: number): EndymionApi => {
        this.rotation.y = y;
        return this;
    }
    /**
     * Sets the rotation around the z-axis of the EndymionApi object.
     * @param z - The rotation value in radians.
     * @returns The updated EndymionApi object.
     */
    public setRotZ = (z: number): EndymionApi => {
        this.rotation.z = z;
        return this;
    }

    /**
     * Sets the scale of the EndymionApi object.
     * @param x - The x scale value or a Scale object.
     * @param y - The y scale value. Optional if x is a Scale object.
     * @param z - The z scale value. Optional if x is a Scale object.
     * @returns The EndymionApi object.
     * 
     * @example
     * // Sets the scale of the EndymionApi object to 1, 2, 3.
     * endymion.setScale(1, 2, 3);           set scale to {x:1, y:2, z:3}
     * endymion.setScale({x:1, y:2, z:3});   set scale to {x:1, y:2, z:3}
     * endymion.setScale(1);                 set scale to {x:1, y:1, z:1}
     */
    public setScale = (x: Scale | number, y: number = -1, z: number = -1): EndymionApi => {
        if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
            if (y === -1 && z === -1) {
                this.scale = { x: x, y: x, z: x };
                return this;
            }
            this.scale = { x, y, z };
            return this;
        }
        this.scale = x as Scale;
        return this;
    }
    /**
     * Sets the scale of the EndymionApi instance along the x-axis.
     * @param x - The new scale value for the x-axis.
     * @returns The updated EndymionApi instance.
     */
    public setScaleX = (x: number): EndymionApi => {
        this.scale.x = x;
        return this;
    }
    /**
     * Sets the scale of the object along the y-axis.
     * @param y - The new scale value for the y-axis.
     * @returns The updated EndymionApi object.
     */
    public setScaleY = (y: number): EndymionApi => {
        this.scale.y = y;
        return this;
    }
    /**
     * Sets the z scale of the EndymionApi object.
     * @param z - The z scale value to set.
     * @returns The updated EndymionApi object.
     */
    public setScaleZ = (z: number): EndymionApi => {
        this.scale.z = z;
        return this;
    }
    /**
     * Sets the color of the EndymionApi object.
     * @param color - The color to set. Can be a Color object or a string in the format of a hex, rgb, or rgba value.
     * @returns The updated EndymionApi object.
     */
    public setColor = (color: Color | string): EndymionApi => {
        if (typeof color === 'string') {
            if (color.includes('#')) {
                this.color = hexToRGB(color) as Color;
            }
            if (color.includes('rgb')) {
                const rgb = color.replace('rgb(', '').replace(')', '').split(',');
                this.color = { r: parseInt(rgb[0]), g: parseInt(rgb[1]), b: parseInt(rgb[2]), a: 1 };
            }
            if (color.includes('rgba')) {
                const rgb = color.replace('rgba(', '').replace(')', '').split(',');
                this.color = { r: parseInt(rgb[0]), g: parseInt(rgb[1]), b: parseInt(rgb[2]), a: parseFloat(rgb[3]) };
            }
            if (namedColor().has(color.toUpperCase())) {
                var hexColor = namedColor().get(color.toUpperCase()) as string;
                this.color = hexToRGB(hexColor) as Color;
            }
        }
        if (typeof color === 'object'
            && color !== null
            && color !== undefined
            && color.hasOwnProperty('r')
            && color.hasOwnProperty('g')
            && color.hasOwnProperty('b')
            && color.hasOwnProperty('a')) {
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
    public setOpacity = (opacity: number): EndymionApi => {
        if (opacity < 0 || opacity > 1) throw new Error('Opacity must be between 0 and 1');
        this.color.a = opacity;
        return this;
    }

    /**
     * Renders an entity and returns an EntityMap object.
     * it must be called after all other methods have been called.
     * @returns {EntityMap} The rendered entity as an EntityMap object.
     */
    public render = (): EntityMap => {
        this.objectId += 1;
        this.entity = this.mapEntity(this);
        if (this.primitive === 'gltf') {
            this.core.importGltf(this.objectId, this.url);
            this.core.sendAction('update-transform', this.entity);
            this.core.setClickable(this.entity.id.toString(), this.isClickable);
            if (this.animation) {
                this.core.playAnimation(this.objectId, this.index, this.animationName);
                this.animation = false;
            }
            if (this.target) {
                this.core.setAimable(this.entity.id.toString(), this.target, this.radius);
            }

        } else if (this.primitive === 'webview') {
            this.core.createWebview({ id: this.objectId.toString(), url: this.url, parent: this.webViewParent });
            this.core.sendAction('update-transform', { scale: this.scale, id: this.objectId });
            this.core.actorSetActive({ id: this.objectId.toString(), activated: this.statusActivated });
        } else if (this.primitive == 'shape-line') {
            this.core.communicationInterface.postMessage(
                {
                    api: 2,
                    name: 'shape-line-create',
                    payload: {
                        id: this.objectId,
                        thickness: this.thickness,
                        color: this.color,
                        points: this.points,
                        transform: {
                            position: this.entity.position,
                            rotation: this.entity.rotation,
                            scale: this.entity.scale
                        }
                    }
                }
            );
        }
        else {
            this.core.sendAction('create-primitive', this.entity);
            this.core.setColor(this.entity.id, this.color);
            this.core.setAimable(this.entity.id.toString(), this.target, this.radius);
            this.core.setClickable(this.entity.id.toString(), this.isClickable);
        }
        this.renderedEntities.set(this.entity.id, { ...this.entity, color: this.color, url: this.url, parent: this.webViewParent });
        return { ...this.entity, color: this.color, parent: this.webViewParent, actorActivated: this.statusActivated, target: this.target, radius: this.radius };
    }

    /**
     * Applies the changes made to the entity and returns the updated entity map.
     * * it must be called after all other methods have been called and on rendered entity.
     * @returns {EntityMap} The updated entity map with the new color.
     */
    public apply = (): EntityMap => {
        this.entity = this.mapEntity(this);
        if (this.primitive === 'gltf') {
            this.core.sendAction('update-transform', this.entity);
            this.core.setClickable(this.entity.id.toString(), this.isClickable);
            if (this.animation) {
                this.core.playAnimation(this.objectId, this.index, this.animationName);
                this.animation = false;
            }
            if (this.target) {
                this.core.setAimable(this.entity.id.toString(), this.target, this.radius);
            }
        } else if (this.primitive === 'webview') {
            this.core.sendAction('update-transform', this.entity);
            if (this.statusActivated) {
                this.core.actorSetActive({ id: this.objectId.toString(), activated: this.statusActivated });
            }
        } else if (this.primitive == 'shape-line') {
            this.core.communicationInterface.postMessage(
                {
                    api: 2,
                    name: 'shape-line-create',
                    payload: {
                        id: this.objectId,
                        thickness: this.thickness,
                        color: this.color,
                        points: this.points,
                        transform: {
                            position: this.entity.position,
                            rotation: this.entity.rotation,
                            scale: this.entity.scale
                        }
                    }
                }
            );
        }
        else {
            this.core.sendAction('update-transform', this.entity);
            this.core.setColor(this.entity.id, this.color);
            this.core.setAimable(this.entity.id.toString(), this.target, this.radius);
            this.core.setClickable(this.entity.id.toString(), this.isClickable);
        }
        return { ...this.entity, color: this.color, parent: this.webViewParent, actorActivated: this.statusActivated, target: this.target, radius: this.radius };
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

    public shapeLine = (): EndymionApi => {
        this.primitive = 'shape-line';
        return this;
    }
    public setThickness = (thickness: number): EndymionApi => {
        this.thickness = thickness;
        return this;
    }
    setPoints = (points: Coordinate[]): EndymionApi => {
        this.points = points;
        return this;
    }
    addPoint = (point: Position): EndymionApi => {
        this.points.push(point);
        return this;
    }

    /**
     * Sets the properties of the EndymionApi instance based on the provided entity.
     * @param entity - The entity to set the properties from.
     * @returns The updated EndymionApi instance.
     */
    public with = (entity: EntityMap): EndymionApi => {
        if (entity !== undefined) {
            this.objectId = entity.id;
            var entityMap = this.renderedEntities.get(entity.id);
            if (entityMap) {
                this.primitive = entityMap.primitive;
                this.position = entityMap.position;
                this.rotation = entityMap.rotation;
                this.scale = entityMap.scale;
                this.color = entityMap.color;
                this.webViewParent = entityMap.parent;
                this.statusActivated = entityMap.actorActivated as boolean;
                this.target = entityMap.target as boolean;
                this.radius = entityMap.radius as number;
            }
        }
        return this;
    }

    /**
     * Loads an asset from the specified URL.
     * @param url The URL of the asset to load.
     * @returns The EndymionApi instance.
     */
    public loadAsset = (url: string): EndymionApi => {
        this.primitive = 'gltf';
        if (url.includes('http')) {
            this.url = url;
            return this;
        }
        this.url = `${this.win.getCurrentProtocol()}//${this.win.getCurrentHost()}/${url}`
        return this;
    }

    /**
     * Plays an animation on the specified entity.
     * @param index The index of the animation to play.
     * @returns The EndymionApi instance.
     */
    public playAnimation = (index: number): EndymionApi => {
        this.animation = true;
        this.index = index;
        this.animationName = "";
        return this;
    }

    public webView = (url: string): EndymionApi => {
        this.primitive = 'webview';
        this.url = url;
        return this;
    }

    public setWebViewParent = (parent: webViewParent): EndymionApi => {
        this.webViewParent = parent;
        return this;
    }

    /**
     * Destroys the EndymionApi object.
     * @returns The destroyed EndymionApi object.
     */
    public destroy = (): EndymionApi => {
        this.core.destroyObject(this.objectId.toString());
        return this;
    }
    /**
     * Destroys all objects in the Endymion API.
     */
    public destroyAll = (): void => {
        this.core.destroyAllObjects();
    }
    public actorSetStatus = (activated: boolean): EndymionApi => {
        this.statusActivated = activated;
        return this;
    }
    /**
     * Sets the active state of an actor.
     * 
     * @param id - The ID of the actor.
     * @param activated - The desired active state of the actor.
     */
    public actorSetActive = (id: string, activated: boolean): void => {
        this.core.actorSetActive({ id: id, activated: activated });
    }

    /**
     * Sets the aimable property of an object.
     * @param id - The ID of the object.
     * @param aimable - The aimable value to set.
     * @param radius - The radius value (optional, default is 0.1).
     */
    public setAimable = (id: string, aimable: boolean, radius: number = 0.1): void => {
        this.core.setAimable(id, aimable, radius);
    }

    /**
     * Makes the object targetable.
     * @param radius The radius of the targetable area.
     * @returns The modified EndymionApi object.
     */
    public targetable = (radius: number = 0.1): EndymionApi => {
        this.target = true;
        this.radius = radius;
        return this;
    }
    public setClickable = (clickable: boolean): EndymionApi => {
        this.isClickable = clickable;
        return this;
    }
    /**
     * Makes the EndymionApi instance untargatable.
     * @returns The modified EndymionApi instance.
     */
    public untargatable = (): EndymionApi => {
        this.target = false;
        return this;
    }
    private mapEntity = (config: EndymionApi): Entity => {
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