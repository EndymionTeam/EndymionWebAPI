export type Primitive = 'cube' | 'sphere' | 'cylinder' | 'capsule' | 'plane' | 'quad';
export type Position = { x:number, y:number, z:number };
export type Rotation = { x:number, y:number, z:number };
export type Scale = { x:number, y:number, z:number};
export type TransformType = 'delta' | 'absolute';
export type TransformGreatness = 'position' | 'rotation' | 'scale';
export type Color = { r:number, g:number, b:number, a:number };
export type ActionName = 'multi-action' | 'create-primitive' | 'create-object' | 'destroy-object' | 'import-gltf' | 'update-transform' | 'set-color' | 'play-haptic' | 'play-anim';
export type Entity = {
    id: number,
    primitive: Primitive,
    position: Position,
    rotation: Rotation,
    scale: Scale
}
export type EntityMap = {
    id: number,
    primitive: Primitive,
    position: Position,
    rotation: Rotation,
    scale: Scale
    color: Color    
}
export interface action {
    name: ActionName,
    payload: any
}