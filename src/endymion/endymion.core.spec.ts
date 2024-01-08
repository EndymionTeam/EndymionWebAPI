import { assert, expect } from "chai";
import { EndymionCore } from "../../lib/modules/endymion/endymion-core";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var sinon = require("sinon");

let window = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`).window;
let endymion:EndymionCore;
let spyOnCreateAction:any;
let spyOnSendAction:any;
let stubP = { x: 0, y: 0, z: 0 };

describe('Endymion Core', () => {
    it('should create an instance', () => {
        assert.isOk(new EndymionCore("vuplex", window));
        endymion = new EndymionCore("vuplex", window);
        spyOnCreateAction = sinon.spy(endymion, "createAction");
        spyOnSendAction = sinon.spy(endymion, "sendAction");
    });
    describe("crateAction Method", ()=>{

        it('should throw error if actPayload is empty', () => {
            assert.throws(()=>endymion.createAction("create-primitive", null), Error, "actPayload is not defined");
        });
    
        it('should return an action', () => {
            const endymion = new EndymionCore("vuplex", new JSDOM(`<!DOCTYPE html><p>Hello world</p>`).window);
            let action = endymion.createAction("create-primitive", {
                id: 1,
                primitive: "cube",
                position: {x:0, y:0, z:0},
                rotation: {x:0, y:0, z:0},
                scale: {x:1, y:1, z:1}
            });
            assert.isObject(action);
            assert.isTrue(action.name == "create-primitive");
            assert.isObject(action.payload);
            assert.isTrue(action.payload.id == 1);
            assert.isTrue(action.payload.primitive == "cube");
            assert.isObject(action.payload.position);
            assert.isTrue(action.payload.position.x == 0);
            assert.isTrue(action.payload.position.y == 0);
            assert.isTrue(action.payload.position.z == 0);
            assert.isObject(action.payload.rotation);
            assert.isTrue(action.payload.rotation.x == 0);
            assert.isTrue(action.payload.rotation.y == 0);
            assert.isTrue(action.payload.rotation.z == 0);
            assert.isObject(action.payload.scale);
            assert.isTrue(action.payload.scale.x == 1);
            assert.isTrue(action.payload.scale.y == 1);
            assert.isTrue(action.payload.scale.z == 1);
            
        });
    });
    describe("sendAction Method", ()=>{
        it('should throw error if payload is empty', () => {
            assert.throws(()=>endymion.sendAction("create-primitive", null), Error, "payload is not defined");
        });
    
        it('should createAction method called 1 time', () => {
    
            endymion.sendAction("create-primitive", {});
            assert.isTrue(spyOnCreateAction.called);
        });
    });
    describe("sendActions Method", ()=>{
        it('should throw error if actionArray is empty', () => {
            assert.throws(()=>endymion.sendActions([]), Error, "actionArray is not defined");
        });
        it('should createAction method called 1 time', () => {
            endymion.sendActions([{name:"create-primitive", payload:{}}]);
            assert.isTrue(spyOnCreateAction.called);
        });
    });
    
    describe("destroyObject Method", ()=>{
        it('should sendAction method called 1 time', () => {
            endymion.destroyObject(1);
            assert.isTrue(spyOnSendAction.called);
        });
    });
    describe('destroyAll Method', ()=>{
        it('should send action with action setted to "destroy-allobjects"', ()=>{
            endymion.destroyAllObjects();
            assert.isTrue(spyOnSendAction.calledWith("destroy-allobjects"));
        });
    });
    describe("createObject Method", ()=>{
        it('should throw error if object id is negative', () => {
            assert.throws(()=>endymion.createObject(-1, 'cube', stubP, stubP,stubP), Error, "objectId is not valid");
        });
        it('should sendAction method called 1 time', () => {
            endymion.createObject(1, 'cube', stubP, stubP,stubP);
            assert.isTrue(spyOnSendAction.called);
        });
    });
    describe("importGltf Method", ()=>{
        it('should throw error if object id is negative', () => {
            assert.throws(()=>endymion.importGltf(-1, ''), Error, "objectId is not valid");
        });
        it('should throw error if source is empty', () => {
            assert.throws(()=>endymion.importGltf(1, ''), Error, "source is not defined");
        });
        it('should sendAction method called 1 time', () => {
            endymion.importGltf(1, 'test/test');
            assert.isTrue(spyOnSendAction.called);
        });
    });
    describe("setColor Method", ()=>{
        it('should throw error if object id is negative', () => {
            assert.throws(()=>endymion.setColor(-1, {r:0, g:0, b:0, a:1}), Error, "objectId is not valid");
        });
        it('should sendAction method called 1 time', () => {
            endymion.setColor(1, {r:0, g:0, b:0, a:1});
            assert.isTrue(spyOnSendAction.called);
        });
        it('should throw error if color r value is negative', () => {
            assert.throws(()=>endymion.setColor(1, {r:-10, g:0, b:0, a:1}), Error, "r color value is not valid");
        });
        it('should throw error if color g value is negative', () => {
            assert.throws(()=>endymion.setColor(1, {r:0, g:-10, b:0, a:1}), Error, "g color value is not valid");
        });
        it('should throw error if color b value is negative', () => {
            assert.throws(()=>endymion.setColor(1, {r:0, g:0, b:-10, a:1}), Error, "b color value is not valid");
        });
        it('should throw error if color a value is negative', () => {
            assert.throws(()=>endymion.setColor(1, {r:0, g:0, b:0, a:-1}), Error, "a color value is not valid");
        });
    
        it('should throw error if color r value is major of 255', () => {
            assert.throws(()=>endymion.setColor(1, {r:256, g:0, b:0, a:1}), Error, "r color value must be minor or equal to 255");
        });
        it('should throw error if color g value is major of 255', () => {
            assert.throws(()=>endymion.setColor(1, {r:0, g:256, b:0, a:1}), Error, "g color value must be minor or equal to 255");
        });
        it('should throw error if color b value is major of 255', () => {
            assert.throws(()=>endymion.setColor(1, {r:0, g:0, b:256, a:1}), Error, "b color value must be minor or equal to 255");
        });
        it('should throw error if color a value is major of 1', () => {
            assert.throws(()=>endymion.setColor(1, {r:0, g:0, b:0, a:1.2}), Error, "a color value must be minor or equal to 1");
        });
    
        it('should throw error if color r value is float', () => {
            assert.throws(()=>endymion.setColor(1, {r:105.3, g:0, b:0, a:1}), Error, "r color value must be an integer");
        });
        it('should throw error if color g value is float', () => {
            assert.throws(()=>endymion.setColor(1, {r:0, g:105.3, b:0, a:1}), Error, "g color value must be an integer");
        });
        it('should throw error if color b value is float', () => {
            assert.throws(()=>endymion.setColor(1, {r:0, g:0, b:106.3, a:1}), Error, "b color value must be an integer");
        });
    
    });
    describe("playHaptic Method", ()=>{
        it('should sendAction method called 1 time', () => {
            endymion.playHaptic();
            assert.isTrue(spyOnSendAction.called);
        });
    });
});


