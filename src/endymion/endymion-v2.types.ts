/**
 * Represents a primitive shape that can be used in 3D modeling.
 * @typedef {('cube' | 'sphere' | 'cylinder' | 'capsule' | 'plane' | 'quad' | 'gltf' | 'webview' | 'shape-line')} Primitive
 * @memberof EndymionApi
 */
export type PrimitiveType = 'cube' | 'sphere' | 'cylinder' | 'capsule' | 'plane' | 'quad' | 'gltf' | 'webview' | 'shape-line';

/**
 * Represents a position in 3D space with x, y, and z coordinates.
 * @typedef {x:number, y:number, z:number} Position
 */
export type Position = { x: number, y: number, z: number };
/**
 * Represents a rotation in 3D space with x, y, and z coordinates.
 * @typedef {x:number, y:number, z:number} Rotation
 */
export type Rotation = { x: number, y: number, z: number };
/**
 * Represents a scale in 3D space with x, y, and z scale values.
 * @typedef {x:number, y:number, z:number} Scale
 */
export type Scale = { x: number, y: number, z: number };

/**
 * Represents a set of coordinates in 3D space.
 * @typedef {x:number, y:number, z:number} Coordinates
 */
export type Coordinates = { x: number, y: number, z: number };

/**
 * The type of transformation to be applied.
 * @typedef {'delta' | 'absolute'} TransformType
 */
export type TransformType = 'delta' | 'absolute';
export type Transform = {
    position: Position,
    rotation: Rotation,
    scale: Scale,
}
/**
 * Represents the possible types of transformations that can be applied to an object.
 * @typedef {'position' | 'rotation' | 'scale'} TransformGreatness
 */
export type TransformGreatness = 'position' | 'rotation' | 'scale';
/**
 * Represents a color with red, green, blue, and alpha values.
 * @typedef {r:number, g:number, b:number, a:number} Color
 */
export type Color = { r: number, g: number, b: number, a: number };

/**
 * Represents the name of an action that can be performed in Endymion.
 * @typedef {('api-multi-action' | 'actor-add-transform' | 'actor-set-transform' | 'actor-destroy' | 'actor-destroy-all' 
 * | 'actor-set-active' | 'actor-set-aimable' | 'actor-set-clickable'| 'device-play-haptic'| 'gltf-create'| 'gltf-play-anim'
 * | 'gltf-pause-anim' | 'gltf-stop-anim' | 'primitive-create'  | 'primitive-set-color' | 'shape-line-create' 
 * | 'webview-create' | 'imgtracker-add-image' | 'imgtracker-init' | 'imgtracker-reset' | 'webview-set-orientation' 
 * | 'webview-send-message' | 'qrctracker-init' | 'qrctracker-reset' | 'qrctracker-run' | 'actor-set-collidable')} ActionName
 */
export type ActionName = 'api-multi-action'
    | 'actor-add-transform'
    | 'actor-set-transform'
    | 'actor-destroy'
    | 'actor-destroy-all'
    | 'actor-set-active'
    | 'actor-set-aimable'
    | 'actor-set-clickable'
    | 'device-play-haptic'
    | 'gltf-create'
    | 'gltf-play-anim'
    | 'gltf-pause-anim'
    | 'gltf-stop-anim'
    | 'primitive-create'
    | 'primitive-set-color'
    | 'shape-line-create'
    | 'webview-create'
    | 'imgtracker-add-image'
    | 'imgtracker-init'
    | 'imgtracker-reset'
    | 'webview-set-orientation'
    | 'webview-send-message'
    | 'qrctracker-init'
    | 'qrctracker-reset'
    | 'actor-set-collidable'
    | 'qrctracker-run';

/**
 * Represents an entity in the Endymion system.
 * @typedef {id:number, primitive:Primitive, position:Position, rotation:Rotation, scale:Scale, color:Color} Entity
 */
export type Entity = {
    /** The unique identifier of the entity. */
    id: number,
    /** The primitive shape of the entity. */
    primitive: PrimitiveType,
    /** The position of the entity in 3D space. */
    position: Position,
    /** The rotation of the entity in 3D space. */
    rotation: Rotation,
    /** The scale of the entity in 3D space. */
    scale: Scale,
    /** define entity color */
    color: Color,
    /** define if entity is clickable */
    clickable: boolean,
    /** define if entity is active  */
    active: boolean,
    /** define if entity is aimable */
    aimable: boolean,
    /** define if on entity interaction haptic is acticve */
    playHaptic: boolean,
    /**define if entity interact with collisions */
    collidable: boolean,
    /** parent of entity, used for anchor to a qrcode or other entity */
    parent?: entityParent;
}

/**
 * Represents an action object with a name and payload.
 * @typedef {name:ActionName, payload:any} action
 */
export interface Action {
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
 * represent webview orientation
 * @typedef { 'device' | 'landscape' | 'landscape-reversed' | 'portrait' | 'portrait-reversed' } webviewOrientation
 */
export type webviewOrientation = 'device' | 'landscape' | 'landscape-reversed' | 'portrait' | 'portrait-reversed'
/**
 * Represents the possible transformations for a webview parent.
 * - 'p': Position transformation
 * - 'r': Rotation transformation
 * - 's': Scale transformation
 * - 'pr': Position and rotation to com
 * - 'ps': Position and scale transformations
 * - 'rs': Rotation and scale transformations
 * - 'prs': Position, rotation, and scale transformations
 */
export type webviewParentTransform = 'p' | 'r' | 's' | 'pr' | 'ps' | 'rs' | 'prs';

/**
 * Represents the parent of a web view.
 */
export type entityParent = { id: string, inherit_transform: webviewParentTransform | undefined } | undefined;
export type webViewType = 'persp' | 'flat-scaled' | 'flat-fixed' | 'screen-fixed';
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
    parent: entityParent
}

/**
 * Payload for setting the active state of an actor.
 */
export type actorSetActivePayload = {
    id: string,
    activated: boolean
}

/**
 * Payload for setting the aimable state of an object.
 * @typedef {'actor-on-aim' | 'actor-on-click' | 'webview-visible' | 'api-on-result' | 'imgtracker-on-image' | 'webview-on-message'} MessageName
 */
export type MessageName = 'actor-on-aim' | 'actor-on-click' | 'webview-visible' | 'api-on-result' | 'imgtracker-on-image' | 'webview-on-message' | 'actor-on-collision' | 'qrctracker-on-qrcode';

/**
 * Represents the payload for a message.
 */
export type MessagePayload = {
    id: string,
    url?: string,
    state?: string | boolean,
    content?: string
}

/**
 * Represents the incoming message from the Endymion system.
 */
export type IncomingMessage = {
    name: MessageName,
    type: string,
    payload: MessagePayload
}

/**
 * represent click policy on webview that is on other
 */
export type PolicyType = 'block' | 'pass' | 'pass_transparent';

export type TrackInit = {
    trackMode: "cv" | "anchor",
    maxActives: number,
    maxCached: number,
    refSize: number
}
