/**
 * Represents a primitive shape that can be used in 3D modeling.
 * @typedef {('cube' | 'sphere' | 'cylinder' | 'capsule' | 'plane' | 'quad')} Primitive
 * @memberof EndymionApi
 */
export type Primitive = 'cube' | 'sphere' | 'cylinder' | 'capsule' | 'plane' | 'quad';

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
export type ActionName = 'multi-action' | 'create-primitive' | 'create-object' | 'destroy-object' | 'import-gltf' | 'update-transform' | 'set-color' | 'play-haptic' | 'play-anim';

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
    color: Color    
}
/**
 * Represents an action object with a name and payload.
 * @typedef {name:ActionName, payload:any} action
 */
export interface action {
    name: ActionName,
    payload: any
}