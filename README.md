# EndymionWebApi 2.7.3
Easy interact with Endymion browser using HTML5 and javascript      

## Table of Contents

- [EndymionWebApi 2.7.3](#endymionwebapi-273)
  - [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Entity Classification](#entity-classification)
- [Create Primitives](#create-primitives)
  - [Creation](#creation)
  - [Modify](#modify)
    - [Available Primitives](#available-primitives)
    - [Available Methods](#available-methods)
    - [Avalilable Events Subscription](#avalilable-events-subscription)
- [Create Assets](#create-assets)
  - [Creating](#creating)
  - [Modify](#modify-1)
    - [Available Methods](#available-methods-1)
    - [Avalilable Events Subscription](#avalilable-events-subscription-1)
- [Create WebView](#create-webview)
    - [Available Methods](#available-methods-2)
- [Library General Methods and Events](#library-general-methods-and-events)
  - [General Methods](#general-methods)
    - [General Methods Examples](#general-methods-examples)
  - [Events](#events)
    - [General Events Examples](#general-events-examples)
- [Accessing to Entity State](#accessing-to-entity-state)
    - [Here an example](#here-an-example)
- [Image Tracking Scan Setup](#image-tracking-scan-setup)
    - [Here an example](#here-an-example-1)
- [QrCode Scan Setup](#qrcode-scan-setup)
    - [Here an example](#here-an-example-2)
- [Device collition with assets](#device-collition-with-assets)
    - [Here an example](#here-an-example-3)
- [Utilities](#utilities)
- [Create a QR Code Based Experience](#create-a-qr-code-based-experience)
  - [How to define a qr code based experience.](#how-to-define-a-qr-code-based-experience)
  - [HTML page settings](#html-page-settings)
  - [Endymion Library use](#endymion-library-use)
  - [Serve HTML page](#serve-html-page)
  - [Qr code](#qr-code)
  - [Enjoy with Endymion Browser](#enjoy-with-endymion-browser)
  - [Clone and Go](#clone-and-go)
- [Changelog](#changelog)



---

# Getting Started
## Installation
1 - download last version from repository [here](https://github.com/EndymionTeam/EndymionWebAPI/releases/tag/2.5.1) and set in script tag in html page in head tag
```HTML 
    <script src="<latest version of endymion browser>"></script>
```
1.1 - To ensure the transparency of the page so that the HTML content is visible as an overlay, the following meta tag must be added to <head> the page section
```HTML 
<head>
    ...
   <meta name="transparent" content="true">
</head>
```
## Entity Classification

| Type      | Description                                                 |   
|-----------|-------------------------------------------------------------|  
| Entity    | Are 3D standard objects and can be: cube, sphere, cylinder, |     
|           | quad, capsule, plane, shape-line                            |         
| Assets    | are 3D complex objects created with 3D modeling as gltf and |         
|           | glb files                                                   |     
| Webview   | A web page container rendered in space                      |  


---     


# Create Primitives
## Creation
Primitives are created in three phases        
- 1 Getting Intance by endymion library
- 2 Apply pre settings
- 3 Ask to Endymion Browser to create it

```javascript
    //get cube instance by endymion library
    let cube = en.cube();
    //set color
    cube.setColor('lime');
    //ask endymion browser to create it
    cube.create();
```

You can also chain settings methods ending them with create method
```javascript
    //get cube instance by endymion library
    let cube = en.cube();
    cube
    //set properties
    .setColor('lime')
    .setPos(0,1,0)
    .setRot(45,0,0)
    //ask endymion browser to create it
    .create();
```
Primitive "hello world!" is as simple cube create
```javascript
    let cube = en.cube();
    cube.create();
```
It create a white cube centered on the marker and with same marker dimensions.      

## Modify
After creation you can modify entity applying same methods used in creation phase ending chained        
methods with 'apply()'.

```javascript
    let cube = en.cube().create()
    cube.setColor('red')
    .setRot(45,0,0)
    .apply()
```
### Available Primitives
| Name       |  
|------------| 
| cube       |  
| sphere     |  
| cylinder   |  
| plane      |
| quad       |
| shape-line |

### Available Methods
On Entity you can use this methods
| Name                                              | Description                           | Details                                                    |   
| --------------------------------------------------| ------------------------------------- | ---------------------------------------------------------- |  
| setPos(x, y, z)                                   | set entity position                   | each axis accept a number, measure unit is lenght of       | 
|                                                   |                                       | marker side (all values must be provide otherwise          |
|                                                   |                                       | an error should throwned)                                  |
| addPos(x, y, z)                                   | add an offset to entity               | each axis accept a number, measure unit is lenght of       | 
|                                                   | position                              | marker side (all values must be provide otherwise          |
|                                                   |                                       | an error should throwned)                                  |
| setRot(x, y, z)                                   | set entity rotation                   | each axis accept a number, measure unit is degrees         | 
|                                                   |                                       | (all values must be provide otherwise an error should      |
|                                                   |                                       | throwned)                                                  |
| addRot(x, y, z)                                   | add an offset to entity               | each axis accept a number, measure unit is degrees         | 
|                                                   | rotation                              | (all values must be provide otherwise an error should      |
|                                                   |                                       | throwned)                                                  |
| setScale(x, y, z)                                 | set entity scale                      | each axis accept a number, measure unit is lenght of       | 
|                                                   |                                       | marker side (all values must be provide otherwise          |
|                                                   |                                       | an error should throwned)                                  |
| setScale(value)                                   | set entity scale                      | accept a number, all axis are setted to same value         | 
|                                                   |                                       | (a value must be provided otherwise an error should        |
|                                                   |                                       | throwned)                                                  |
| addScale(x, y, z)                                 | add an offset to entity               | each axis accept a number, measure unit is lenght of       | 
|                                                   | scale                                 | marker side (all values must be provide otherwise          |
|                                                   |                                       | an error should throwned)                                  |
| addScale(value)                                   | add an offset to entity               | accept a number, all axis are setted to same value         | 
|                                                   | scale                                 | (a value must be provided otherwise an error should        |
|                                                   |                                       | throwned)        
| setColor(Color or string)                         | set entity color                      | Color type = { r:number, g:number, b:number, a:number}     |
|                                                   |                                       | or string that can be:                                     |
|                                                   |                                       | 1 - HexColor prefixed by # (ex: #FFAADD)                   |
|                                                   |                                       | 2 - rgb string format like 'rgb(0,255,0)'                  |
|                                                   |                                       | 3 - rgba string format like 'rgba(255,0,0)'                |
|                                                   |                                       | 4 - named color like 'lime'                                |
| setOpacity(value:number)                          | set opacity of entity                 | set opacity of entity work on alpha value of color         |
|                                                   |                                       | values accepted >0 and < 1                                 |
| setAimable(value:boolean, radius:number = 0.1)    | define if entity is aimable by browser| radius define sensible area that aimed should emit event   |
| setActive(value:boolean)                          | define active state of primitive      | inactive state will not render by browser                  |
| setClickable(value:boolean)                       | define if primitive is clickable      | click event is emitted if value == true                    |
| setHapticFeedback(value:boolean)                  | define if haptic is activated         | if activated an haptic feedback is placed when entity is   |
|                                                   |                                       | aimed or clicked                                           |
| setCollidable(value:boolean)                      | define if entity is collidaable       | device must by setted as collidable with en.deviceCollition|
|                                                   |                                       | method                                                     |
| setParent(id:number)                              |  define entity parent                 | set the entity relative to a marker id                     |
|                                                   |                                       |                                                            |
| create()                                          | ask to endymion browser to create     | allowed only a time, if entity exists an error should      |
| build()                                           | build actions                         | list of actions that are necessary to create entity        |
| apply()                                           | ask to endymion browser to modify     | allowed after creation, end method like create             |
|                                                   | entity                                |                                                            |
| destroy()                                         | destroy entity                        |                                                            |

NB. create(), apply() and destroy() methods cannot be followed by settings methods.        
Them can only used as terminal methods.

### Avalilable Events Subscription

| Name                      | Description                              | type                                                                      |   
| --------------------------| -----------------------------------------| -------------------------                                                 |
| updated$                  | observable on update event               | action description                                                        |
| colorUpdated$             | observable on color update event         | color value                                                               |
| opacity$                  | observable on opacity update             | 0 <= number <= 1                                                          |
| positionUpdated$          | observable on position update event      | position value                                                            |
| posX$                     | observable on x coordinate on position   | number                                                                    |
| posY$                     | observable on y coordinate on position   | number                                                                    |
| posZ$                     | observable on z coordinate on position   | number                                                                    |
| rotationUpdated$          | observable on rotation update event      | rotation value                                                            |
| rotX$                     | observable on x angle on rotation        | number                                                                    |
| rotY$                     | observable on y angle on rotation        | number                                                                    |
| rotZ$                     | observable on z angle on rotation        | number                                                                    |
| scaleUpdated$             | observable on scale update event         | scale value                                                               |
| scaleX$                   | observable on x scale on scale           | number                                                                    |
| scaleY$                   | observable on y scale on scale           | number                                                                    |
| scaleZ$                   | observable on z scale on scale           | number                                                                    |
| setAimableUpdated$        | observable on aimable  value             | { enabled, radius }                                                       |
| setActivatedUpdated$      | observable on activate status value      | boolean                                                                   |
| created$                  | observable on create event               | actions list                                                              |
| createError$              | observable on create errors              | { method, error }                                                         |
| applyed$                  | observable on apply event                | actions list                                                              |
| applyError$               | observable on apply errors               | { method, error }                                                         |
| error$                    | observable on generic errors             | { method, error }                                                         |
| aimed$                    | observable on aim event                  | { name:'actor-on-aim', type:string, payload:{id : string, state: boolean}}|
| clicked$                  | observable on click event                | { name, payload }                                                         |
| webViewVisible$           | observable on webView visible event      | { name, payload }                                                         | 
| collition$                | observable on collition status of entity | { name: 'collition', state: boolean}                                      |
| isClickable$              | observable on clickable update event     | boolean                                                                   |
| hapticPlay$               | observable on haptic feedback play evt   | boolean                                                                   |
| destroyed$                | observable on destroyed event            | --                                                                        |



# Create Assets
## Creating
Assets are created in three phases        
- 1 Getting Intance by endymion library
- 2 Apply pre settings
- 3 Ask to Endymion Browser to load it

```javascript
    //get cube instance by endymion library
    let duck = en.asset();
    //set animation to use (optional)
    duck.setAnim(1);
    //ask endymion browser to load it
    duck.load('./assets/duck.glb');
```

## Modify
After creation you can modify entity applying same methods used in creation phase ending chained        
methods with 'apply()'.

```javascript
     let duck = en.asset();
    duck.load('./assets/duck.glb');

    duck.setRot(45,0,0)
    .apply();
```
### Available Methods
On Assets you can use all methods allowed for primitives with exclusion reported in table
| Name                                              | Description                                   | Details                                                    |   
| --------------------------------------------------| ----------------------------------------------| ---------------------------------------------------------- |  
| setColor(Color or string)                         | set entity color                              | NOT ALLOWED (an error is throwned)                         |
| setOpacity(value:number)                          | set opacity of entity                         | NOT ALLOWED (an error is throwned)                         |
| create()                                          | ask to endymion browser to create             | NOT ALLOWED (an error is throwned)                         |
| setAnim(animationIndex: number)                   | choose an animation                           | choose an animation available on asset                     |
| playAnim()                                        | play animation                                |                                                            |
| stopAnim()                                        | stop animation                                |                                                            |
| pauseAnim()                                       | pause animation                               |                                                            |
| load(url:string)                                  | load asset                                    | ask to Endymion Browser to load asset (relative/absolute)  |
| buildAsset(url:string)                            | get actions that are created in load method   | list of actions necessary for load asset                   |

NB. load(), apply() and destroy() methods cannot be followed by settings methods.        
Them can only used as terminal methods.

### Avalilable Events Subscription
All event subscription for entities are available with esclusion reported in table

| Name                      | Description                           | type                      |   
| --------------------------| ------------------------------------- | --------------------------|
| colorUpdated$             | observable on color update event      | NOT AVAILABLE             |
| created$                  | observable on create event            | NOT AVAILABLE             |
| animationUpdated$         | observable on animation update event  |                           |
| animationPlaying$         | observable on playing event           |                           |
| animationPaused$          | observable on pause event             |                           |
| animationStopped          | observable on stop event              |                           |
  
  
# Create WebView
A webView is a container for a web page that you can ask to create to Endymion Browser.     
WebView allow to render on same browser visualization more than one html content at same time.

You can ask Endymion browser to create it so:
```javascript
    //create an anchor to fix the webview
    let anchor = en.cube();
    //deactivate entity so it is not visible in page but it can still be used to anchor webview
    anchor.setActive(false);
    //you can position, rotation and scale anchor like you want
    anchor.create();

    let webView = en.webview();
    webView.setUrl('relative/absolute path to html page')
        //set type (can be  'persp', 'flat-scaled', 'flat-fixed', 'screen-fixed')
        .setType('persp')
        //ensure to anchor the webview
        //use entity.id property - anchor.id asc en library to generate a new index
        .setParent({id: anchor.entity.id})
        .create();
```

### Available Methods
On Assets you can use all methods allowed for primitives with exclusion reported in table
| Name                                                 | Description                           | Details                                                            |   
| -----------------------------------------------------| ------------------------------------- | ----------------------------------------------------------         |  
| setColor(Color or string)                            | set entity color                      | NOT ALLOWED (an error is throwned)                                 |
| setOpacity(value:number)                             | set opacity of entity                 | NOT ALLOWED (an error is throwned)                                 |
| setUrl(url:string)                                   | url of html page                      | url of html page to use in webview                                 |
| setParent(parent: WebViewParent)                     | { id: parentId,                       | parent id and inherith trasform by parent                          |
|                                                      |   inherit_transform: undefined | -> } | One of: ["prs", "p", "pr", "ps"] where: "p" = position,            |
|                                                      |                                       | "r" = rotation and "s" scale. Default "prs"                        |
| setType(type:, webViewType)                          | set webview type                      | can be 'persp', 'flat-scaled', 'flat-fixed', 'screen-fixed'        |
| setOrientation(orientation: webViewOrientation)      | set webview orientation               | can be 'device', 'landscape', 'landscape-reversed',                | 
|                                                      |                                       |  'portrait', 'portrait-reversed'                                   |  
| sendMessage(destinationId: number, message: string)  | send message to another webview       | destinationId of the child webview (message from parent to child), |
|                                                      |                                       | or "__PARENT__" (message from child to parent)                     |
|                                                      |                                       | message accept both string or JSON object. JSON object will be     |
|                                                      |                                       | automatically handled as string                                    |
| setClickPolicy(type: PolicyType)                     | set click policy of webview           | type may be 'block' = block click on object,  'pass' = propagate it|
|                                                      |                                       | to above objects, 'pass_transparent' = propagate it only if webview|
|                                                      |;                                      | is transparent                                                     |



# Library General Methods and Events
You can perform general action and subscribe general events to take control of environment
Here a list of available methods
## General Methods
| Name                                                  | Description                                                               |   
| ------------------------------------------------------| ------------------------------------------------------------------------- |  
| enableDebug()                                         | Allow to see action logged in a box sended to Endymion Browser            |
|                                                       | and message by Endymion Browset to library                                |
| disableDebug()                                        | Disable debug mode                                                        |
| addTrackingImage(url:string, refWidth: number = 0.05) | addTrackingImage allow to define an image that will be used like          |
|                                                       | experience activator. When Endymion Browser aim this library fire         |
|                                                       | a trakingImage event that you can use to start experience                 |
|                                                       | refWidth express in meter the image side length of a square image         |
| playHaptic()                                          | play an haptic feedback on device [deprecated see trackingImage methods]  |

### General Methods Examples

enable debug mode
```javascript
    en.enableDebug()
```
disable debug mode
```javascript
    en.disableDebug()
```
add tracking image
enable debug mode
```javascript
    // optional in this example but you should subscribe tracking event 
    // to add operations after endymion browser framed the image used to start the experience
    let imageId = en.trackImage$.subscribe(event=>{
        //event -> {name: 'imgtracker-on-image', type:'message', payload:any }
        if(event.payload.state == true){
            //operations to start experience
            //tracking image id is used to anchor webviews that effectly show experience
            let webView = en.webview();
            webView.setUrl('relative/absolute path to html page')
                //set type (can be  'persp', 'flat-scaled', 'flat-fixed', 'screen-fixed')
                .setType('flat-fixed')
                //ensure to anchor the webview to tracking image
                .setParent({id: imageId})
                .create();
        }
    })
    //effectly add image that is used to start experience
    en.addTrackingImage('/assets/image/tracking-image.jpg')

   
```

## Events

Here a list of available events that you can subscribe


| Name               | Description                                                                                 |   
| ------------------ | ------------------------------------------------------------------------------------------- |  
| message$           | {name: string, type:string = 'message', payload:any }  where name can be = 'api-on-result', | 
|                    | 'imgtracker-on-image', webview-on-message'                                                     |  
|                    | payload for 'api-on-result' is                                                              |  
|                    | {"uuid" : string, "success" : boolean, "message" : string }                                 |  
|                    | 'api-on-result' represent a status on action requested to Endymion Browser                  |  
|                    | payload for 'imgtracker-on-image' is {"id" : string | number, "state" : boolean }              |  
|                    | 'imgtracker-on-image' represent a status of tracking image,  state = true mean                 |    
|                    | that Endymion Browser framed the image used to start the experience (see                    |  
|                    | addTrackingImage method)                                                                    |  
|                    | payload for 'webview-on-message' is { id:string, url:string, message:string }               |  
|                    | id is identifier of webview sender, url url of the sender webview, message is message sent  |  
| actionResult$      | {name: 'api-on-result', type:'message', payload:any }                                       |  
|                    | payload for 'api-on-result' is                                                              |       
|                    | {"uuid": string, "success": boolean, "message": string }                                    |  
|                    | 'api-on-result' represent a status on action requested to Endymion Browser                  |  
| trackImage$        | {name: 'imgtracker-on-image', type:'message', payload:any }                                    |  
|                    | payload for 'imgtracker-on-image' is {"id" : string | number, "state" : boolean }              |  
|                    | 'imgtracker-on-image' represent a status of tracking image,  state = true mean                 |    
|                    | that Endymion Browser framed the image used to start the experience (see                    |  
|                    | addTrackingImage method)                                                                    |  

### General Events Examples
subscribe events
```javascript
    en.message$.subscribe(event=>{
        //event ->{name: string, type:'message', payload:any }
    });
    en.actionResult$.subscribe(event=>{
        //event ->{name: 'api-on-result', type:'message', payload:{"uuid": string, "success": boolean, "message": string } }
    });
    en.trackImage$.subscribe(event=>{
        //event ->{name: 'imgtracker-on-image', type:'message', payload:{"id" : string | number, "state" : boolean } }
    });
```

# Accessing to Entity State
It is possible to access the status of the entity that has been created through the following properties
| Name                      | Returned Type                   |   
| --------------------------| --------------------------------|
| state                     | {                               |
|                           |     id: number,                 |
|                           |     primitive: PrimitiveType,   |
|                           |     position: Position,         |
|                           |     rotation: Rotation,         |
|                           |     scale: Scale,               |
|                           |     color: Color,               |
|                           |     clickable: boolean,         |
|                           |     active: boolean,            |
|                           |     aimable: boolean,           |
|                           |     playHaptic: boolean         |
|                           |  }                              |
|                           |                                 |
| pos                       | { x: 0, y: 0, z: 0 }            |
| rot                       | { x: 0, y: 0, z: 0 }            |
| scale                     | { x: 0, y: 0, z: 0 }            |
| color                     | { r: 0, g: 0, b: 0, a: 1 }      |   
| clickable                 | boolean                         |
| active                    | boolean                         |
| aimable                   | boolean                         |
| playHaptic                | boolean                         |
| collidable                | boolean                         |


### Here an example
```javascript
    let cube = en.cube().create()
    let position = cube.pos;
    //position is { x: 0, y: 0, z: 0 }
```

# Image Tracking Scan Setup

| Name                                                      | Description                                                               |   
| --------------------------------------------------------- | --------------------------------------------------------------------------|  
| trackingImage.init()                                      | init tracking image system                                                |
| trackingImage.add(url:string, refWidth: number = 0.05)    | addTrackingImage allow to define an image that will be used like          |
|                                                           | experience activator. When Endymion Browser aim this library fire         |
|                                                           | a trakingImage event that you can use to start experience                 |
|                                                           | refWidth express in meter the image side length of a square image         |
| trackingImage.reset()                                     | reset tracking image system                                               |

### Here an example
```javascript
    //init tracking image system
    en.trackingImage.init();
    //add tracking image
    en.trackingImage.add('/assets/image/tracking-image.jpg');

    //if necessary you can use reset method to change image for example
    en.trackingImage.reset();
    
```
# QrCode Scan Setup

| Name                                                   | Description                      | Details                                                                         |   
| -------------------------------------------------------| -------------------------------- | --------------------------------------------------------------------------------|  
| qrcode.init(trackMode: 'cv' | 'anchor',                | init qr code scan system         | trackMode track mode to be used                                                 |
|        maxActives: number = 1, maxCached: number = 10, |                                  | maxActives max possible active qrcodes at same time                             |
|        refSize: number = 0.1)                          |                                  | maxCached max number of qrcode to keep in cache                                 |
|                                                        |                                  | refSize qrcode reference size in meters (only for "anchor" mode)                |
| qrcode.reset()                                         | reset qr code scan system        |                                                                                 |
| qrcode.run()                                           | start qr code scan               |                                                                                 |
| qrcode.stop()                                          | stop qr code scan                |                                                                                 |
| en.qrcodeDetected$                                     | observable on qrcode detected    | return this payload: {"id" : "qrcode-01", "content" : "https://endymion.tech" } |          
|                                                        |                                  | id as qrcode id and content show qrcode content                                 |


### Here an example
```javascript
    //init with anchor system and other values setted to default
    en.qrcode.init('anchor');
    //start run qr code scan
    en.qrcode.run();

    //stop after 5 seconds
    setTimeout(()=>en.qrcode.stop(), 5000);

    //react to qrcode detection
    en.qrcodeDetected$.subscribe(payload=>{
        //webwview creation hosted in url contained in qrcode content
        let url = payload.content;
        let webView = en.webview();
            webView.setUrl(url)
                .setType('flat-fixed')
                .create();
    })
    
```

# Device collition with assets
for use this functionality you have to set collidable property on asset with setCollidable method

| Name                                                   | Description                       
| -------------------------------------------------------| ------------------------------------------------------------------------------------------| 
| en.deviceCollition(enable: boolean: radius:number = 0) | enable or disable device collition with asset rendered [ radius in meter range 0 - 100]   |
| en.assetCollition$                                     | observable that return assets enabled collition status { name: 'actor-on-collision',      |
|                                                        |  type:'message', payload: { id: string, state: boolean}                                   |

### Here an example
```javascript
    // get a cube and set it collidable
    let cube = en.cube().create();
    cube.setCollidable(true).apply();

    //get as sphere and set it collidable
    let sphere = en.sphere().create();
    sphere.setCollidable(true).apply();

    //enable device to collition
    en.deviceCollition(true);

    //monitoring 
    en.assetCollition$.subscribe(collition=>{
        //collition = { name: 'actor-on-collision', type:'message', payload:{ id: string, state: boolean}}
        // here you can monitoring via id who is in collition state with device
    });

    cube.collition$.subscribe(collition=>{
        //collition = { name: collition, type: 'message', state: boolean }
        //here you can react if cube is in collition state
    });

    sphere.collition$.subscribe(collition=>{
        //collition = { name: collition, type: 'message', state: boolean }
        //here you can react if cube is in collition state
    });
    
```


# Utilities
There are a few utilities that can simplify the development process
| Name                      | Returned Type                         |   
| --------------------------| --------------------------------------|
| removeSupportStyle()      | remove style automatically added for  |
|                           | set transparent color to body         |


# Create a QR Code Based Experience
An augmented reality experience based on the QR code uses your smartphone or tablet to enjoy AR content that will only be displayed when the QR code is framed.  
Find detailed instructions for creating this type of experience here.  

## How to define a qr code based experience. 
A qr code based experience use a qrcode to activate and render objects and assets that is part of your experience.
Follow this simple istruction to create you first qr code base experience.

## HTML page settings 

dowload Endymion library [here](https://github.com/EndymionTeam/EndymionWebAPI/releases/tag/2.3.0) and put in the same folder of next html file

```HTML 
    <!DOCTYPE html>
    <html>
    <head>
        <title>QR Code Experience</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="endymion.2.4.3"><script> <!-- ensure to  link the correct version -->
    </head>
    <body>
        
    </body>
    </html>
```

## Endymion Library use  
Use the Endymion library creating your first entity ( a cube )
```HTML 
    <!DOCTYPE html>
    <html>
    <head>
        <title>QR Code Experience</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="endymion.2.4.3"><script> <!-- ensure to  link the correct version -->
    </head>
    <body>
        <script>
            //get cube instance by endymion library
            let cube = en.cube();
            //set color
            cube.setColor('lime');
            //ask endymion browser to create it
            cube.create();
        </script>
    </body>
    </html>
```

## Serve HTML page 
Now you have to serve this page with a webserver, the best choice for testing the page locally is certainly to use a docker.  
If you are not familiar with this technology, don't worry, at the end of the tutorial I will give you a link from which to download the complete environment for developing your experience.

##Dowload Endymion Browser App
 Download with your device (Android) the Endymion Browser apk scanning this qr code and clicking on "Download Beta"        
    (registration is required)   

![Endymion Browser](https://endymion.tech/qr-code-address/endymion.tech_300x300.png)   

## Qr code
Now you will have to tell Endymion Browser where it can find the HTML page containing your experience, in this case a cube. To do this we use a QR code. The information that the QR code must contain is the web address of the HTML page. So once you have it in view Endymion Browser will load and execute your instructions.  

## Enjoy with Endymion Browser  
Now when you scan the QR code with the Endymion Browser application, a cube will appear.    

## Clone and Go  
if you want to quickly and easily try augmented reality with Endymion, just clone the following repository and with a few operations you will finally be ready to experiment.  
[Cube-Demo](https://github.com/EndymionDemo/cube-demo)


# Changelog
2.5.3 removed auto debug mode on console.log         
2.5.5 added click policy method to webview, docs update     
2.5.6 google analitycs tag automatic        
2.5.7 update api to new version 3       
2.5.8 qrcode methods added, added api version setting and init, docs updated   
2.5.9 analytics added  
2.6.0 tracking image init and reset added, deprecated addTrackingImage method
2.7.0 added device asset collition capability, docs updated
2.7.1 qrcode detect evant implementation
2.7.2 added build method for defer send of actions to endymion
2.7.3 added setParent method to entity for anchor entity to a qrcode 





