import { assert, expect } from "chai";
import { Action } from '../endymion/endymion-v2.types';
import { En } from '../endymion/en';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var sinon = require("sinon");
let en: En;
let fakeWindow: Window;
describe('primitive', () => {
    before(() => {
        fakeWindow = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, { url: 'http://localhost:8000' }).window;
    });
    it('should create an istance', () => {
        assert.isOk(new En('vuplex', fakeWindow));
    });
    describe('cube create', () => {
        let expectedActions: Action[] = [
            {
                api: '2',
                name: 'primitive-create',
                payload: {
                    id: 1,
                    primitive: 'cube',
                    transform: {
                        position: { x: 0, y: 0, z: 0 },
                        rotation: { x: 0, y: 0, z: 0 },
                        scale: { x: 1, y: 1, z: 1 }
                    }
                }
            },
            {
                api: '2',
                name: 'primitive-set-color',
                payload: {
                    id: 1,
                    color: { r: 0, g: 0, b: 0, a: 1 }
                }
            }
        ]
        it('create should return correct action sequence', () => {
            let en = new En('vuplex', fakeWindow);
            let entity = en.cube();
            let actualActions: Action[] = [];
            entity.created$.subscribe((actions) => {
                actualActions = actions;
            }, error => { }
                , () => {
                    console.log(actualActions);

                    expect(actualActions).to.deep.equal(expectedActions);
                });
            entity.create();
        });
    });
    describe('cylinder create', () => {
        let expectedActions: Action[] = [
            {
                api: '2',
                name: 'primitive-create',
                payload: {
                    id: 1,
                    primitive: 'cylinder',
                    transform: {
                        position: { x: 0, y: 0, z: 0 },
                        rotation: { x: 0, y: 0, z: 0 },
                        scale: { x: 1, y: 1, z: 1 }
                    }
                }
            },
            {
                api: '2',
                name: 'primitive-set-color',
                payload: {
                    id: 1,
                    color: { r: 0, g: 0, b: 0, a: 1 }
                }
            }
        ]
        it('create should return correct action sequence', () => {
            let en = new En('vuplex', fakeWindow);
            let entity = en.cylinder();
            let actualActions: Action[] = [];
            entity.created$.subscribe((actions) => {
                actualActions = actions;
            }, error => { }
                , () => {
                    console.log(actualActions);

                    expect(actualActions).to.deep.equal(expectedActions);
                });
            entity.create();
        });
    });
    describe('sphere create', () => {
        let expectedActions: Action[] = [
            {
                api: '2',
                name: 'primitive-create',
                payload: {
                    id: 1,
                    primitive: 'sphere',
                    transform: {
                        position: { x: 0, y: 0, z: 0 },
                        rotation: { x: 0, y: 0, z: 0 },
                        scale: { x: 1, y: 1, z: 1 }
                    }
                }
            },
            {
                api: '2',
                name: 'primitive-set-color',
                payload: {
                    id: 1,
                    color: { r: 0, g: 0, b: 0, a: 1 }
                }
            }
        ]
        it('create should return correct action sequence', () => {
            let en = new En('vuplex', fakeWindow);
            let entity = en.sphere();
            let actualActions: Action[] = [];
            entity.created$.subscribe((actions) => {
                actualActions = actions;
            }, error => { }
                , () => {
                    console.log(actualActions);

                    expect(actualActions).to.deep.equal(expectedActions);
                });
            entity.create();
        });
    });
    describe('plane create', () => {
        let expectedActions: Action[] = [
            {
                api: '2',
                name: 'primitive-create',
                payload: {
                    id: 1,
                    primitive: 'plane',
                    transform: {
                        position: { x: 0, y: 0, z: 0 },
                        rotation: { x: 0, y: 0, z: 0 },
                        scale: { x: 1, y: 1, z: 1 }
                    }
                }
            },
            {
                api: '2',
                name: 'primitive-set-color',
                payload: {
                    id: 1,
                    color: { r: 0, g: 0, b: 0, a: 1 }
                }
            }
        ]
        it('create should return correct action sequence', () => {
            let en = new En('vuplex', fakeWindow);
            let entity = en.plane();
            let actualActions: Action[] = [];
            entity.created$.subscribe((actions) => {
                actualActions = actions;
            }, error => { }
                , () => {
                    console.log(actualActions);

                    expect(actualActions).to.deep.equal(expectedActions);
                });
            entity.create();
        });
    });
    describe('capsule create', () => {
        let expectedActions: Action[] = [
            {
                api: '2',
                name: 'primitive-create',
                payload: {
                    id: 1,
                    primitive: 'capsule',
                    transform: {
                        position: { x: 0, y: 0, z: 0 },
                        rotation: { x: 0, y: 0, z: 0 },
                        scale: { x: 1, y: 1, z: 1 }
                    }
                }
            },
            {
                api: '2',
                name: 'primitive-set-color',
                payload: {
                    id: 1,
                    color: { r: 0, g: 0, b: 0, a: 1 }
                }
            }
        ]
        it('create should return correct action sequence', () => {
            let en = new En('vuplex', fakeWindow);
            let entity = en.capsule();
            let actualActions: Action[] = [];
            entity.created$.subscribe((actions) => {
                actualActions = actions;
            }, error => { }
                , () => {
                    console.log(actualActions);

                    expect(actualActions).to.deep.equal(expectedActions);
                });
            entity.create();
        });
    });
    describe('quad create', () => {
        let expectedActions: Action[] = [
            {
                api: '2',
                name: 'primitive-create',
                payload: {
                    id: 1,
                    primitive: 'quad',
                    transform: {
                        position: { x: 0, y: 0, z: 0 },
                        rotation: { x: 0, y: 0, z: 0 },
                        scale: { x: 1, y: 1, z: 1 }
                    }
                }
            },
            {
                api: '2',
                name: 'primitive-set-color',
                payload: {
                    id: 1,
                    color: { r: 0, g: 0, b: 0, a: 1 }
                }
            }
        ]
        it('create should return correct action sequence', () => {
            let en = new En('vuplex', fakeWindow);
            let entity = en.quad();
            let actualActions: Action[] = [];
            entity.created$.subscribe((actions) => {
                actualActions = actions;
            }, error => { }
                , () => {
                    console.log(actualActions);

                    expect(actualActions).to.deep.equal(expectedActions);
                });
            entity.create();
        });
    });
    describe('shape-line create', () => {
        let expectedActions: Action[] = [
            {
                api: '2', name: 'shape-line-create', payload: {
                    id: 1,
                    color: { r: 0, g: 0, b: 0, a: 1 },
                    thickness: 4,
                    points: [
                        { x: 0, y: 0, z: 0 },
                        { x: 0, y: 2, z: 0 }
                    ],
                    transform: {
                        position: { x: 0, y: 0, z: 0 },
                        rotation: { x: 0, y: 0, z: 0 },
                        scale: { x: 0, y: 0, z: 0 }
                    }
                }
            }
        ]
        it('create should return correct action sequence', () => {
            let en = new En('vuplex', fakeWindow);
            let entity = en.line();
            let actualActions: Action[] = [];
            entity.created$.subscribe((actions) => {
                actualActions = actions;
            }, error => { }
                , () => {
                    console.log(actualActions);

                    expect(actualActions).to.deep.equal(expectedActions);
                });
            entity.setPoints([{ x: 0, y: 0, z: 0 }, { x: 0, y: 2, z: 0 }])
            .setThickness(4)
            .create();
        });
    });
});