# QR Code Experience  
##How to define a qr code based experience. 
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
        <script src="endymion.2.3.0"><script> <!-- ensure to  link the correct version -->
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
        <script src="endymion.2.3.0"><script> <!-- ensure to  link the correct version -->
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

