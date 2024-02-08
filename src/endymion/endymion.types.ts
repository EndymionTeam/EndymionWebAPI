/**
 * Represents a primitive shape that can be used in 3D modeling.
 * @typedef {('cube' | 'sphere' | 'cylinder' | 'capsule' | 'plane' | 'quad')} Primitive
 * @memberof EndymionApi
 */
export type Primitive = 'cube' | 'sphere' | 'cylinder' | 'capsule' | 'plane' | 'quad' | 'gltf' | 'webview';

/**
 * Represents a position in 3D space with x, y, and z coordinates.
 * @typedef {x:number, y:number, z:number} Position
 */
export type Position = { x:number, y:number, z:number };
/**
 * Represents a rotation in 3D space with x, y, and z coordinates.
 * @typedef {x:number, y:number, z:number} Rotation
 */
export type Rotation = { x:number, y:number, z:number };
/**
 * Represents a scale in 3D space with x, y, and z scale values.
 * @typedef {x:number, y:number, z:number} Scale
 */
export type Scale = { x:number, y:number, z:number};



/**
 * The type of transformation to be applied.
 * @typedef {'delta' | 'absolute'} TransformType
 */
export type TransformType = 'delta' | 'absolute';

/**
 * Represents the possible types of transformations that can be applied to an object.
 * @typedef {'position' | 'rotation' | 'scale'} TransformGreatness
 */
export type TransformGreatness = 'position' | 'rotation' | 'scale';
/**
 * Represents a color with red, green, blue, and alpha values.
 * @typedef {r:number, g:number, b:number, a:number} Color
 */
export type Color = { r:number, g:number, b:number, a:number };

/**
 * Represents the name of an action that can be performed in Endymion.
 * @typedef {'multi-action' | 'create-primitive' | 'create-object' | 'destroy-object' | 'import-gltf' | 'update-transform' | 'set-color' | 'play-haptic' | 'play-anim'} ActionName
 */
export type ActionName = 'multi-action' | 'create-primitive' | 'create-object' | 'destroy-object' | 'import-gltf' 
                        | 'update-transform' | 'set-color' | 'play-haptic' | 'play-anim' | 'destroy-allobjects'
                        | 'webview-create' | 'actor-setactive' | 'object-setaimable' | 'shape-line-create';

/**
 * Represents an entity in the Endymion system.
 * @typedef {id:number, primitive:Primitive, position:Position, rotation:Rotation, scale:Scale, color:Color} Entity
 */
export type Entity = {
    /** The unique identifier of the entity. */
    id: number,
    /** The primitive shape of the entity. */
    primitive: Primitive,
    /** The position of the entity in 3D space. */
    position: Position,
    /** The rotation of the entity in 3D space. */
    rotation: Rotation,
    /** The scale of the entity in 3D space. */
    scale: Scale
}
/**
 * Represents an entity map with its properties.
 * @typedef {id:number, primitive:Primitive, position:Position, rotation:Rotation, scale:Scale, color:Color} EntityMap
 */
export type EntityMap = {
    /** The unique identifier of the entity. */
    id: number,
    /** The primitive shape of the entity. */
    primitive: Primitive,
    /** The position of the entity in 3D space. */
    position: Position,
    /** The rotation of the entity in 3D space. */
    rotation: Rotation,
    /** The scale of the entity in 3D space. */
    scale: Scale,
    /** The color of the entity. */
    color: Color,
    /** The url of the gltf file to be imported. */
    url?: string    
    /** detail of parent of webview */
    parent?: webViewParent,
    /** detail of active state of actor */
    actorActivated?: boolean,
    /** detail of aimable state of object */
    target?: boolean
    /** radius of viewfinder */
    radius?: number
}
/**
 * Represents an action object with a name and payload.
 * @typedef {name:ActionName, payload:any} action
 */
export interface action {
    name: ActionName,
    payload: any
}

/**
 * Represents a message object with an origin and data.
 * @typedef {origin:string, data:any} message
 */
export type message = {
    origin: string,
    data: any
}

/**
 * Represents the possible transformations for a webview parent.
 * - 'p': Position transformation
 * - 'r': Rotation transformation
 * - 's': Scale transformation
 * - 'pr': Position and rotation transformations
 * - 'ps': Position and scale transformations
 * - 'rs': Rotation and scale transformations
 * - 'prs': Position, rotation, and scale transformations
 */
export type webviewParentTransform = 'p' | 'r' | 's' | 'pr' | 'ps' | 'rs' | 'prs';

/**
 * Represents the parent of a web view.
 */
export type webViewParent = { id:string, inherit_transform:webviewParentTransform } | undefined;

/**
 * Represents the payload for a web view.
 */
export type webViewPayload = {
    /**
     * The ID of the web view.
     */
    id: string,
    /**
     * The URL of the web view.
     */
    url: string,
    /**
     * The parent of the web view.
     */
    parent: webViewParent
}

/**
 * Payload for setting the active state of an actor.
 */
export type actorSetActivePayload = {
    id: string,
    activated: boolean
}
