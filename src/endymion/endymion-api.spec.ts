import { assert, expect } from "chai";
import { EndymionApi } from "../../lib/modules/endymion/endymion-api";
import { EntityMap, webViewParent } from "../../lib/modules/endymion/endymion.types";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var sinon = require("sinon");
let endymion:EndymionApi;
let fakeWindow:Window;
let spyOnCoreSendAction:any;
let spyOnCoreSetColor: any;
let spyOnCoreGltf: any;
let spyOnCorePlayAnimation: any;
describe('Endymion Api', () => {
    before(()=>{
        fakeWindow = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, {url:'http://localhost:8000'}).window;
    });
    it('should create an istance', () => {
        assert.isOk(new EndymionApi('vuplex', fakeWindow));
    });

    describe("sendMessage method", ()=>{
        it('should call postMessage method', () => {
            endymion = new EndymionApi('vuplex', fakeWindow);
            spyOnCoreSendAction = sinon.spy(endymion.core, "sendMessage");
            endymion.core.sendMessage({ origin: "test", data: { test:"test" }});
            assert.isTrue(spyOnCoreSendAction.called);
        });
    });

    describe("render method", ()=>{
        it('should return an EntityMap object', () => {
            endymion = new EndymionApi('vuplex', fakeWindow);
            let actual = endymion.cube().render();
            let expected = {
                id: 1,
                primitive: 'cube',
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                color: { r: 255, g: 255, b: 255, a: 1}
              };
            assert.deepEqual(actual, expected);
        });

        describe("rendering entities", ()=>{
            var cube: EndymionApi;
            before(()=>{
                endymion = new EndymionApi('vuplex', fakeWindow);
                spyOnCoreSendAction = sinon.spy(endymion.core, "sendAction");
                spyOnCoreSetColor = sinon.spy(endymion.core, "setColor");
                spyOnCorePlayAnimation = sinon.spy(endymion.core, "playAnimation");
                spyOnCoreGltf = sinon.spy(endymion.core, "importGltf");
                cube = endymion.cube();
                cube.render();
            });
            it('should call sendAction method 1 time', () => {
                
                assert.isTrue(spyOnCoreSendAction.called);
            });
            it('should call sendAction method with parameter "create-primitive"', () => {
                assert.isTrue(spyOnCoreSendAction.calledWith("create-primitive"));
            });
            it('should call sendAction method with parameter payload', () => {
                let actual = spyOnCoreSendAction.args[0][1];
                let expected = {
                    id: 1,
                    primitive: 'cube',
                    position: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 }
                  }
                    assert.deepEqual(actual, expected);
            });
            it("should call setColor method with parameter color = {r:255, g:255, b:255, a:1}", ()=>{
                assert.isTrue(spyOnCoreSetColor.calledWith(1, {r:255, g:255, b:255, a:1}));
            });
        });
        describe("rendering assets", ()=>{
            var asset: EntityMap;
            before(()=>{
                endymion = new EndymionApi('vuplex', fakeWindow);
                spyOnCoreSendAction = sinon.spy(endymion.core, "sendAction");
                spyOnCoreSetColor = sinon.spy(endymion.core, "setColor");
                spyOnCorePlayAnimation = sinon.spy(endymion.core, "playAnimation");
                spyOnCoreGltf = sinon.spy(endymion.core, "importGltf");
                asset = endymion.loadAsset('test/test').render();
            });

            it('should call sendAction method 1 time', () => {
                assert.isTrue(spyOnCoreSendAction.called);
            });

            it('should call sendAction method with parameter "update-transform" and entity', () => {
                let expectedEntity = {
                            id: 1,
                            primitive: 'gltf',
                            position: { x: 0, y: 0, z: 0 },
                            rotation: { x: 0, y: 0, z: 0 },
                            scale: { x: 1, y: 1, z: 1 }
                          }
                assert.isTrue(spyOnCoreSendAction.calledWith("update-transform", expectedEntity));
                
            });

            it('should call playAnimation if animation is true', () => {
                endymion = new EndymionApi('vuplex', fakeWindow);
                spyOnCorePlayAnimation = sinon.spy(endymion.core, "playAnimation");
                endymion.loadAsset('test/test').playAnimation(1).render();
                assert.isTrue(spyOnCorePlayAnimation.called);
            });

            it('should not call playAnimation if animation is false', () => {
                endymion = new EndymionApi('vuplex', fakeWindow);
                spyOnCorePlayAnimation = sinon.spy(endymion.core, "playAnimation");
                endymion.loadAsset('test/test').render();
                assert.isTrue(spyOnCorePlayAnimation.notCalled);
            });

        });
    });

    describe("apply method", ()=>{
        it('should return an EntityMap object', () => {
            endymion = new EndymionApi('vuplex', fakeWindow);
            let actual = endymion.cube().apply();
            let expected = {
                id: 0,
                primitive: 'cube',
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                color: { r: 255, g: 255, b: 255, a: 1}
              };
            assert.deepEqual(actual, expected);
        });

        describe("applying entities", ()=>{
            var cube: EndymionApi;
            before(()=>{
                endymion = new EndymionApi('vuplex', fakeWindow);
                spyOnCoreSendAction = sinon.spy(endymion.core, "sendAction");
                spyOnCoreSetColor = sinon.spy(endymion.core, "setColor");
                spyOnCorePlayAnimation = sinon.spy(endymion.core, "playAnimation");
                spyOnCoreGltf = sinon.spy(endymion.core, "importGltf");
                cube = endymion.cube();
                cube.apply();
            });
            it('should call sendAction method 1 time', () => {
                
                assert.isTrue(spyOnCoreSendAction.called);
            });
            it('should call sendAction method with parameter "update-transform"', () => {
                assert.isTrue(spyOnCoreSendAction.calledWith("update-transform"));
            });
            it('should call sendAction method with parameter payload', () => {
                let actual = spyOnCoreSendAction.args[0][1];
                let expected = {
                    id: 0,
                    primitive: 'cube',
                    position: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 }
                  }
                    assert.deepEqual(actual, expected);
            });
            it("should call setColor method with parameter color = {r:255, g:255, b:255, a:1}", ()=>{
                let actuaColor = spyOnCoreSetColor.args[0][1];  
                let expectedColor = {r:255, g:255, b:255, a:1};
                assert.deepEqual(actuaColor, expectedColor);
            });
        });
        describe("applying assets", ()=>{
            var asset: EntityMap;
            before(()=>{
                endymion = new EndymionApi('vuplex', fakeWindow);
                spyOnCoreSendAction = sinon.spy(endymion.core, "sendAction");
                spyOnCoreSetColor = sinon.spy(endymion.core, "setColor");
                spyOnCorePlayAnimation = sinon.spy(endymion.core, "playAnimation");
                spyOnCoreGltf = sinon.spy(endymion.core, "importGltf");
                asset = endymion.loadAsset('test/test').apply();
            });

            it('should call sendAction method 1 time', () => {
                assert.isTrue(spyOnCoreSendAction.called);
            });

            it('should call sendAction method with parameter "update-transform" and entity', () => {
                let expectedEntity = {
                            id: 0,
                            primitive: 'gltf',
                            position: { x: 0, y: 0, z: 0 },
                            rotation: { x: 0, y: 0, z: 0 },
                            scale: { x: 1, y: 1, z: 1 }
                          }
                assert.isTrue(spyOnCoreSendAction.calledWith("update-transform", expectedEntity));
                
            });

            it('should call playAnimation if animation is true', () => {
                endymion = new EndymionApi('vuplex', fakeWindow);
                spyOnCorePlayAnimation = sinon.spy(endymion.core, "playAnimation");
                endymion.loadAsset('test/test').playAnimation(1).apply();
                assert.isTrue(spyOnCorePlayAnimation.called);
            });

            it('should not call playAnimation if animation is false', () => {
                endymion = new EndymionApi('vuplex', fakeWindow);
                spyOnCorePlayAnimation = sinon.spy(endymion.core, "playAnimation");
                endymion.loadAsset('test/test').apply();
                assert.isTrue(spyOnCorePlayAnimation.notCalled);
            });

        });
    });

    describe("setPrimitive Method", ()=>{
        it("should equal to 'cube' if primitive setted is 'cube'", ()=>{
            var actual = endymion.setPrimitive('cube');
            assert.isTrue(actual.primitive == 'cube');
        });
    });

    describe("setPosition Method", ()=>{
        it('should equal to {x:1, y:2, z:3} if position setted is {x:1, y:2, z:3}', ()=>{
            var actual = endymion.setPosition({x:1, y:2, z:3});
            assert.deepEqual(actual.position, {x:1, y:2, z:3});
        });
        it('should equal to {x:1, y:2, z:3} if position setted is (1, 2, 3)', ()=>{
            var actual = endymion.setPosition(1, 2, 3);
            assert.deepEqual(actual.position, {x:1, y:2, z:3});
        });
        it('should equal to {x:5, y:5, z:5} if position setted is 5', ()=>{
            var actual = endymion.setPosition(5);
            assert.deepEqual(actual.position, {x:5, y:5, z:5});
        });
    });    
    describe("setPosX Method", ()=>{
        it('should equal to 1 if position x setted is 1', ()=>{
            var actual = endymion.setPosX(1);
            assert.isTrue(actual.position.x == 1);
        });
    });
    describe("setPosY Method", ()=>{
        it('should equal to 1 if position y setted is 1', ()=>{
            var actual = endymion.setPosY(1);
            assert.isTrue(actual.position.y == 1);
        });
    });
    describe("setPosZ Method", ()=>{
        it('should equal to 1 if position z setted is 1', ()=>{
            var actual = endymion.setPosZ(1);
            assert.isTrue(actual.position.z == 1);
        });
    });
    
    describe("setRotation Method", ()=>{
        it('should equal to {x:1, y:2, z:3} if rotation setted is {x:1, y:2, z:3}', ()=>{
            var actual = endymion.setRotation({x:1, y:2, z:3});
            assert.deepEqual(actual.rotation, {x:1, y:2, z:3});
        });
        it('should equal to {x:1, y:2, z:3} if rotation setted is (1, 2, 3)', ()=>{
            var actual = endymion.setRotation(1, 2, 3);
            assert.deepEqual(actual.rotation, {x:1, y:2, z:3});
        });
        it('should equal to {x:5, y:5, z:5} if rotation setted is 5', ()=>{
            var actual = endymion.setRotation(5);
            assert.deepEqual(actual.rotation, {x:5, y:5, z:5});
        });
    });
    describe("setRotX Method", ()=>{
        it('should equal to 1 if rotation x setted is 1', ()=>{
            var actual = endymion.setRotX(1);
            assert.isTrue(actual.rotation.x == 1);
        });
    });
    describe("setRotY Method", ()=>{
        it('should equal to 1 if rotation y setted is 1', ()=>{
            var actual = endymion.setRotY(1);
            assert.isTrue(actual.rotation.y == 1);
        });
    });
    describe("setRotZ Method", ()=>{
        it('should equal to 1 if rotation z setted is 1', ()=>{
            var actual = endymion.setRotZ(1);
            assert.isTrue(actual.rotation.z == 1);
        });
    });
    
    describe("setScale Method", ()=>{
        it('should equal to {x:1, y:2, z:3} if scale setted is {x:1, y:2, z:3}', ()=>{
            var actual = endymion.setScale({x:1, y:2, z:3});
            assert.deepEqual(actual.scale, {x:1, y:2, z:3});
        });
        it('should equal to {x:1, y:2, z:3} if scale setted is (1, 2, 3)', ()=>{
            var actual = endymion.setScale(1, 2, 3);
            assert.deepEqual(actual.scale, {x:1, y:2, z:3});
        })
        it("should equal to {x:5, y:5, z:5} if scale setted is 5", ()=>{
            var actual = endymion.setScale(5);
            assert.deepEqual(actual.scale, {x:5, y:5, z:5});
        });
    });
    describe("setScaleX Method", ()=>{
        it('should equal to 1 if scale x setted is 1', ()=>{
            var actual = endymion.setScaleX(1);
            assert.isTrue(actual.scale.x == 1);
        });
    });
    describe("setScaleY Method", ()=>{
        it('should equal to 1 if scale y setted is 1', ()=>{
            var actual = endymion.setScaleY(1);
            assert.isTrue(actual.scale.y == 1);
        });
    });
    describe("setScaleZ Method", ()=>{
        it('should equal to 1 if scale z setted is 1', ()=>{
            var actual = endymion.setScaleZ(1);
            assert.isTrue(actual.scale.z == 1);
        });
    });

    describe("setColor Method", ()=>{
        it('should equal to {r:1, g:2, b:3} if color setted is {r:1, g:2, b:3}', ()=>{
            var actual = endymion.setColor({r:1, g:2, b:3, a:1});
            assert.deepEqual(actual.color, {r:1, g:2, b:3, a:1});
        });
        it('showlud return { r: 0, g: 0, b: 0, a: 1 } if color setted is rgba(0, 0, 0, 1)', ()=>{
            var actual = endymion.setColor('rgba(0, 0, 0, 1)');
            assert.deepEqual(actual.color, {r:0, g:0, b:0, a:1});
        });
        it('showlud return { r: 0, g: 0, b: 0, a: 1 } if color setted is rgb(0, 0, 0)', ()=>{
            var actual = endymion.setColor('rgb(0, 0, 0)');
            assert.deepEqual(actual.color, {r:0, g:0, b:0, a:1});
        });
        it('showlud return {r:51, g:102, b:255, a:1} if color setted is #3366ff', ()=>{
            var actual = endymion.setColor('#3366ff');
            assert.deepEqual(actual.color, {r:51, g:102, b:255, a:1});
        });
        it('showlud return {r:0, g:255, b:0, a:1} if color setted is lime', ()=>{
            var actual = endymion.setColor('lime');
            assert.deepEqual(actual.color, {r:0, g:255, b:0, a:1});
        });
    });

    describe('setOpacity Method', ()=>{
        it('should equal to 0.3 if opacity setted is 0.3', ()=>{
            var actual = endymion.setOpacity(0.3);
            assert.isTrue(actual.color.a == 0.3);
        });
    });
    
    describe("cube Method", ()=>{
        it('primitive should equal to {primitive: "cube"}', ()=>{
            var actual = endymion.cube();
            assert.equal(actual.primitive, "cube");
        });
    });
    describe("sphere Method", ()=>{
        it('primitive should equal to sphere', ()=>{
            var actual = endymion.sphere();
            assert.equal(actual.primitive, "sphere");
        });
    });
    describe("cylinder Method", ()=>{
        it('primitive should equal to cylinder', ()=>{
            var actual = endymion.cylinder();
            assert.equal(actual.primitive, "cylinder");
        });
    });
    describe("capsule Method", ()=>{
        it('primitive should equal to capsule', ()=>{
            var actual = endymion.capsule();
            assert.equal(actual.primitive, "capsule");
        });
    });
    describe("plane Method", ()=>{
        it('primitive should equal to plane', ()=>{
            var actual = endymion.plane();
            assert.equal(actual.primitive, "plane");
        });
    });
    describe("quad Method", ()=>{
        it('primitive should equal to quad', ()=>{
            var actual = endymion.quad();
            assert.equal(actual.primitive, "quad");
        });
    });
    describe("loadAsset Method", ()=>{
        it('should return primitive equal to gltf', ()=>{
            var actual = endymion.loadAsset('test/test');
            assert.equal(actual.primitive, "gltf");
        });
        it('should return url setted', ()=>{
            var actual = endymion.loadAsset('test/test');
            assert.equal(actual.url, "http://localhost:8000/test/test");
        });
        it('should return url setted also if it is empty', ()=>{
            var actual = endymion.loadAsset('');
            assert.equal(actual.url, "http://localhost:8000/");
        });
    });

    describe('playAnimation Method', ()=>{
        it('should return animation setted to true', ()=>{
            var actual = endymion.playAnimation(1);
            assert.equal(actual.animation, true);
        });
        it('should return index setted to 2 if 2 is setted', ()=>{
            var actual = endymion.playAnimation(2);
            assert.equal(actual.index, 2);
        });
    });
    describe('destroyWebView Method', ()=>{
        it('should send action with action setted to "destroy-object"', ()=>{
            let spyOnCoreSendAction = sinon.spy(endymion.core, "sendAction");
            endymion.destroyWebView('fakeId');
            let actual = spyOnCoreSendAction.args[0][1];
            assert.isTrue(spyOnCoreSendAction.calledWith("destroy-object"));
            assert.equal(actual.id, 'fakeId');
        });
    });

    describe("createWebView method", () => {
        it("should create a web view and return its ID", () => {
            const url = "https://example.com";
            const id = "webview1";
            const parent = { id: "parent1", transform: "p" } as webViewParent;
    
            const webViewId = endymion.createWebView(url, id, parent);
    
            assert.isString(webViewId);
            assert.isNotEmpty(webViewId);
    
            const webViewPayload = endymion.webView.get(webViewId);
            assert.isObject(webViewPayload);
            assert.propertyVal(webViewPayload, "id", id);
            assert.propertyVal(webViewPayload, "url", url);
            assert.deepEqual(webViewPayload?.parent, parent);
        });
    
        it("should create a web view with default ID if not provided", () => {
            const url = "https://example.com";
    
            const webViewId = endymion.createWebView(url);
    
            assert.isString(webViewId);
            assert.isNotEmpty(webViewId);
    
            const webViewPayload = endymion.webView.get(webViewId);
            assert.isObject(webViewPayload);
            assert.property(webViewPayload, "id");
            assert.propertyVal(webViewPayload, "url", url);
            assert.isUndefined(webViewPayload?.parent);
        });
    });
    describe("actorSetActive method", () => {
        it("should call core.actorSetActive method with correct parameters", () => {
            let spyOnCoreActorSetActive = sinon.spy(endymion.core, "actorSetActive");
            const id = "test-id";
            const activated = true;
            endymion.actorSetActive(id, activated);
            let actualArgs = spyOnCoreActorSetActive.args[0][0]
            assert.equal(actualArgs.id, id);
            assert.equal(actualArgs.activated, activated);

        });
    });
});
