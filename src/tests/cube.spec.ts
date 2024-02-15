import { assert, expect } from "chai";
import { Action } from '../endymion/endymion-v2.types';
import { En } from '../endymion/en';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var sinon = require("sinon");
let en:En;
let fakeWindow:Window;
describe('cube', () => {
    before(()=>{
        fakeWindow = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, {url:'http://localhost:8000'}).window;
    });
    it('should create an istance', () => {
        assert.isOk(new En('vuplex', fakeWindow));
    });
    describe('create', () => {
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
        it('cube.create should return correct action sequence', () => {
            let en = new En('vuplex', fakeWindow);
            let cube = en.cube();
            let actualActions: Action[] = [];
            cube.created$.subscribe((actions) => {
                actualActions = actions;
            }, error =>{}
            ,()=>{
                console.log(actualActions);
                
                expect(actualActions).to.deep.equal(expectedActions);
            });
            cube.create();
        });
    });
});