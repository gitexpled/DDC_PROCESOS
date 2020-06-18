
function cargaCamara(){
	alert('carGacamara')
	//Nos aseguramos que estén definidas
	//algunas funciones básicas
	window.URL = window.URL || window.webkitURL;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia ||
	function() {
	  alert('Su navegador no soporta navigator.getUserMedia().');
	};
}

var pictureSource;   // picture source
var destinationType; // sets the format of returned value 

// Wait for PhoneGap to connect with the device
//
//document.addEventListener("deviceready",onDeviceReady,false);

// PhoneGap is ready to be used!
//
//function onDeviceReady() {
//}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
  var imageApp = sap.ui.getCore().byId("imgGrande");
  imageApp.setSrc("data:image/jpeg;base64,"+imageData);
  //smallImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  //alert(imageData)
  //imageData=encodeImageUri(imageData)
  //alert(imageData)
  //smallImage.src = "data:image/jpeg;base64," + imageData;
  //smallImage.src = "" + imageData;
  
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI 
  // console.log(imageURI);

  // Get image handle
  //
  var largeImage = document.getElementById('largeImage');

  // Unhide image elements
  //
  largeImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
	try{
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, 
		  { quality: 50,
  			destinationType : Camera.DestinationType.DATA_URL
	  		//,encodingType: camera.EncodingType.JPEG,
	  });
	}
  catch(err){
	  alert(err.message)
	  }
  
}

// A button will call this function
//
function capturePhotoEdit() {
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true }); 
}

// A button will call this function
//
function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}

// Called if something bad happens.
// 
function onFail(message) {
  alert('Failed because: ' + message);
}

function encodeImageUri(imageUri)
{
     var c=document.createElement('canvas');
     var ctx=c.getContext("2d");
     var img=new Image();
     img.onload = function(){
       c.width=this.width;
       c.height=this.height;
       ctx.drawImage(img, 0,0);
     };
     img.src=imageUri;
     var dataURL = c.toDataURL("image/jpeg");
     return dataURL;
}
