export type primitive = 'cube' | 'sphere' | 'cylinder' | 'capsule' | 'plane' | 'quad';
export type position = { x:number, y:number, z:number };
export type rotation = { x:number, y:number, z:number };
export type scale = { x:number, y:number, z:number};
export type TransformType = 'delta' | 'absolute';
export type TransformGreatness = 'position' | 'rotation' | 'scale';
export type Color = { r:number, g:number, b:number, a:number };
export type actionName = 'multi-action' | 'create-primitive' | 'create-object' | 'destroy-object' | 'import-gltf' | 'update-transform' | 'set-color' | 'play-haptic' | 'play-anim';

export interface action {
    name: actionName,
    payload: any
}