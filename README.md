# EndymionWebApi 2.3.0
Easy interact with Endymion browser using HTML5 and javascript

## Table of Contents

- [EndymionWebApi 2.3.0](#endymionwebapi-230)
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
- [Create a QR Code Based Experience](#create-a-qr-code-based-experience)



---

# Getting Started
## Installation
1 - download last version from repository [here](https://github.com/EndymionTeam/EndymionWebAPI/releases/tag/2.3.0) and set in script tag in html page in head tag
```HTML 
    <script src="<latest version of endymion browser>"></script>
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
| addScale(x, y, z)                                 | add an offset to entity               | each axis accept a number, measure unit is lenght of       | 
|                                                   | scale                                 | marker side (all values must be provide otherwise          |
|                                                   |                                       | an error should throwned)                                  |
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
| create()                                          | ask to endymion browser to create     | allowed only a time, if entity exists an error should      |
|                                                   |                                       | throwned                                                   |
| apply()                                           | ask to endymion browser to modify     | allowed after creation, end method like create             |
|                                                   | entity                                |                                                            |
| destroy()                                         | destroy entity                        |                                                            |

NB. create(), apply() and destroy() methods cannot be followed by settings methods.        
Them can only used as terminal methods.

### Avalilable Events Subscription

| Name                      | Description                           | type                      |   
| --------------------------| ------------------------------------- | --------------------------|
| updated$                  | observable on update event            | action description        |
| colorUpdated$             | observable on color update event      | color value               |
| positionUpdated$          | observable on position update event   | position value            |
| rotationUpdated$          | observable on rotation update event   | rotation value            |
| scaleUpdated$             | observable on scale update event      | scale value               |
| setAimableUpdated$        | observable on aimable  value          | { enabled, radius }       |
| setActivatedUpdated$      | observable on activate status value   | boolean                   |
| created$                  | observable on create event            | actions list              |
| createError$              | observable on create errors           | { method, error }         |
| applyed$                  | observable on apply event             | actions list              |
| applyError$               | observable on apply errors            | { method, error }         |
| error$                    | observable on generic errors          | { method, error }         |
| aimed$                    | observable on aim event               | { name, payload }         |
| clicked$                  | observable on click event             | { name, payload }         |
| webViewVisible$           | observable on webView visible event   | { name, payload }         |    
| isClickable$              | observable on clickable update event  | boolean                   |
| hapticPlay$               | observable on haptic feedback play evt| boolean                   |
| destroyed$                | observable on destroyed event         | --                        |



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

    duck.setRot(45,0,0)
    .apply();
```
### Available Methods
On Assets you can use all methods allowed for primitives with exclusion reported in table
| Name                                              | Description                           | Details                                                    |   
| --------------------------------------------------| ------------------------------------- | ---------------------------------------------------------- |  
| setColor(Color or string)                         | set entity color                      | NOT ALLOWED (an error is throwned)                         |
| setOpacity(value:number)                          | set opacity of entity                 | NOT ALLOWED (an error is throwned)                         |
| create()                                          | ask to endymion browser to create     | NOT ALLOWED (an error is throwned)                         |
| setAnim(animationIndex: number)                   | choose an animation                   | choose an animation available on asset                     |
| playAnim()                                        | play animation                        |                                                            |
| stopAnim()                                        | stop animation                        |                                                            |
| pauseAnim()                                       | pause animation                       |                                                            |
| load(url:string)                                  | load asset                            | ask to Endymion Browser to load asset (relative/absolute)  |

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
    let webView = en.webview();
    webView.setUrl('relative/absolute path to html page');
    webView.create();
```

### Available Methods
On Assets you can use all methods allowed for primitives with exclusion reported in table
| Name                                              | Description                           | Details                                                   |   
| --------------------------------------------------| ------------------------------------- | --------------------------------------------------------- |  
| setColor(Color or string)                         | set entity color                      | NOT ALLOWED (an error is throwned)                        |
| setOpacity(value:number)                          | set opacity of entity                 | NOT ALLOWED (an error is throwned)                        |
| setUrl(url:string)                                | url of html page                      | url of html page to use in webview                        |
| setParent(parent: WebViewParent)                  | { id: parentId,                       | parent id and inherith trasform by parent                 |
|                                                   |   inherit_transform: undefined | -> } | One of: ["prs", "p", "pr", "ps"] where: "p" = position,   |
|                                                   |                                       | "r" = rotation and "s" scale. Default "prs"               |


# Library General Methods and Events
You can perform general action and subscribe general events to take control of environment
Here a list of available methods
## General Methods
| Name                                                  | Description                                                       |   
| ------------------------------------------------------| ----------------------------------------------------------------- |  
| enableDebug()                                         | Allow to see action logged in a box sended to Endymion Browser    |
|                                                       | and message by Endymion Browset to library                        |
| disableDebug()                                        | Disable debug mode                                                |
| addTrackingImage(url:string, refWidth: number = 0.05) | addTrackingImage allow to define an image that will be used like  |
|                                                       | experience activator. When Endymion Browser aim this library fire |
|                                                       | a trakingImage event that you can use to start experience         |
|                                                       | refWidth express in meter the image side length of a square image |
| playHaptic()                                          | play an haptic feedback on device                                 |

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
    en.trackImage$.subscribe(event=>{
        //event -> {name: 'tracker-on-image', type:'message', payload:any }
        if(event.payload.state == true){
            //operations to start experience
        }
    })
    en.addTrackingImage('/assets/image/tracking-image.jpg')
```

## Events

Here a list of available events that you can subscribe


| Name               | Description                                                                    |   
| ------------------ | ------------------------------------------------------------------------------ |  
| message$           | {name: string, type:string = 'message', payload:any }                          |  
|                    | where name can be = 'api-on-result'| 'tracker-on-image'                        |  
|                    | payload for 'api-on-result' is                                                 |  
|                    | {"uuid" : string, "success" : boolean, "message" : string }                    |  
|                    | 'api-on-result' represent a status on action requested to Endymion Browser     |  
|                    | payload for 'tracker-on-image' is {"id" : string | number, "state" : boolean } |  
|                    | 'tracker-on-image' represent a status of tracking image,  state = true mean    |    
|                    | that Endymion Browser framed the image used to start the experience (see       |  
|                    | addTrackingImage method)                                                       |  
| actionResult$      | {name: 'api-on-result', type:'message', payload:any }                          |  
|                    | payload for 'api-on-result' is                                                 |       
|                    | {"uuid": string, "success": boolean, "message": string }                       |  
|                    | 'api-on-result' represent a status on action requested to Endymion Browser     |  
| trackImage$        | {name: 'tracker-on-image', type:'message', payload:any }                       |  
|                    | payload for 'tracker-on-image' is {"id" : string | number, "state" : boolean } |  
|                    | 'tracker-on-image' represent a status of tracking image,  state = true mean    |    
|                    | that Endymion Browser framed the image used to start the experience (see       |  
|                    | addTrackingImage method)                                                       |  

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
        //event ->{name: 'tracker-on-image', type:'message', payload:{"id" : string | number, "state" : boolean } }
    });
```

# Create a QR Code Based Experience
An augmented reality experience based on the QR code uses your smartphone or tablet to enjoy AR content that will only be displayed when the QR code is framed.  
Find detailed instructions for creating this type of experience here.  

[QR code based experience](QR-code-experience.md)


