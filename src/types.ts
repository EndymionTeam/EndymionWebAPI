export type primitive = 'cube' | 'sphere' | 'cylinder' | 'capsule' | 'plane' | 'quad';
export type position = { x:number, y:number, z:number };
export type rotation = { x:number, y:number, z:number };
export type scale = { x:number, y:number, z:number};
export type TransformType = 'delta' | 'absolute';
export type TransformGreatness = 'position' | 'rotation' | 'scale';