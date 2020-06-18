
 
 /*
  * Welcome to the new js2coffee 2.0, now
  * rewritten to use the esprima parser.
  * try it out!
  */

 var Bluetooth, BluetoothState, Device, DeviceCollection, DeviceListView, DeviceView, onDeviceReady;

 $.fn.extend({
   enable: function() {
     return this.removeAttr("disabled");
   },
   disable: function() {
     return this.attr("disabled", "disabled");
   }
 });

 BluetoothState = Backbone.Model.extend({}, {
   Off: 1,
   Busy: 2,
   Ready: 3,
   Connected: 4
 });

 Bluetooth = new BluetoothState({
   state: BluetoothState.Busy
 });

 Device = Backbone.Model.extend({
   //defaults: {
     name: "name",
     address: "address",
     isConnected: "false"
   //}
 });

 DeviceCollection = Backbone.Collection.extend({
   model: Device
 });

 DeviceView = Backbone.View.extend({
   template: templates.device,
   events: {
     "click .btn-bt-connect": "connect",
     "click .btn-bt-disconnect": "disconnect"
   },
   initialize: function() {
     return this.model.on("change", this.render, this);
   },
   render: function() {
    // alert(this.template)
    // alert(this.model.get("name")+' <> '+this.model.get("isConnected"));
	 templates.name = this.model.get("name");
	 templates.isConnected = this.model.get("isConnected")
     this.$el.html(_.template(this.template, {
       name: this.model.get("name"),
       isConnected: this.model.get("isConnected")
     }));
     return this;
   },
   connect: function() {
	   try{
 	  //alert('conect')
     var gotUuids, onError;
     onError = (function(_this) {
       return function() {
         Bluetooth.set({
           state: BluetoothState.Ready
         });
         return _this.$(".btn-bt-connect").html("Reconectar");
       };
     })(this);
     gotUuids = (function(_this) {
       return function(device) {
         var onConnectionEstablished;
         onConnectionEstablished = function() {
           var onConnectionLost, onMessageReceived;
           onMessageReceived = function(msg) {
         	  //alert(msg)
        	   if(appConfig.getPesoBt==true ){
        		   try{
        		   msg = msg.split(" ").join("");
        		   msg = msg.split("\n").join("");
        		   msg=msg.trim();
        		   //var result;
        		   /*
        		   jQuery.each( msg, function( i, val ) {
						 // $( "#" + i ).append( document.createTextNode( " - " + val ) );
        			   result='<>'+val
						});
				*/		
	         	   if(msg.length>6 && appConfig.primerCaracter('numero',msg.charAt(0))){
	         		   //$('#status').html('<p>' + msg + ': </p>');
	         		  // alert('<'+msg+'>')
	         		   var input = sap.ui.getCore().byId("txtEPesoPolvo");
	         		   if(appConfig.PesoBt!=msg){
	         			   //alert('<'+appConfig.PesoBt+'> <'+msg+'>')
	         			   input.setValue(msg);
	         			   appConfig.PesoBt=input.getValue();
	         		   }else{
	         			   
	         		   }
	         	   }
        		   }catch(err){
        			   alert(err.message)
        		   }
        	   }
             return console.log(msg);
           };
           onConnectionLost = function() {
             _this.model.set({
               isConnected: false
             });
             return onError();
           };
           _this.model.set({
             isConnected: true
           });
           return window.bluetooth.startConnectionManager(onMessageReceived, onConnectionLost);
         };
         return window.bluetooth.connect(onConnectionEstablished, onError, {
           address: _this.model.get("address"),
           uuid: device.uuids[0]
         });
       };
     })(this);
     Bluetooth.set({
       state: BluetoothState.Busy
     });
     this.$(".btn-bt-connect").html("loading");
     appHf.onDeviceReady();
     return window.bluetooth.getUuids(gotUuids, onError, this.model.get("address"));
	   }catch(err){
		   alert(err.message)
	   }
   },
   disconnect: function() {
     var onDisconnected;
     onDisconnected = function() {
       this.model.set({
         isConnected: "false"
       });
       return Bluetooth.set({
         state: BluetoothState.Ready
       });
     };
     Bluetooth.set({
       state: BluetoothState.Busy
     });
     return window.bluetooth.disconnect(onDisconnected);
   }
 });

 DeviceListView = Backbone.View.extend({
   el: "#list-devices",
   initialize: function() {
     return this.collection.on("reset add", this.render, this);
   },
   render: function() {
     this.$el.html("");
     return this.collection.each((function(_this) {
       return function(device) {
    	 //alert('device: '+JSON.stringify(device))	
         return _this.$el.append(new DeviceView({
           model:device
         }).render().el);
       };
     })(this));
   }
 });

function onDeviceReady() {
   try{

   
   var deviceList, onBluetoothStateChanged, onDiscover, onToggleOff, onToggleOn;
   deviceList = new DeviceListView({
     collection: new DeviceCollection
   });
   
   onBluetoothStateChanged = function() {
	   //alert(Bluetooth.get("state"))
     switch (Bluetooth.get("state")) {
       case BluetoothState.Off:
         $("#btn-bt-on").prop('disabled', false);
         $("#btn-bt-off").prop('disabled', true);
         $("#btn-bt-discover").prop('disabled', true);
         $(".btn-bt-connect").prop('disabled', true);
         return $(".btn-bt-disconnect").prop('disabled', true);
       case BluetoothState.Busy:
         $("#btn-bt-on").prop('disabled', true);
         $("#btn-bt-off").prop('disabled', true);
         $("#btn-bt-discover").prop('disabled', true);
         $(".btn-bt-connect").prop('disabled', true);
         return $(".btn-bt-disconnect").prop('disabled', true);
       case BluetoothState.Ready:
    	 try{
         $("#btn-bt-on").prop('disabled', true);
         $("#btn-bt-off").prop('disabled', false);
         $("#btn-bt-discover").prop('disabled', false);
         $(".btn-bt-connect").prop('disabled', false);
    	 }catch(err){
    		 alert(err.message)
    	 }
         return $(".btn-bt-disconnect").enable();
       case BluetoothState.Connected:
         $("#btn-bt-on").prop('disabled', true);
         $("#btn-bt-off").prop('disabled', true);
         $("#btn-bt-discover").prop('disabled', true);
         $(".btn-bt-connect").prop('disabled', true);
         return $(".btn-bt-disconnect").prop('disabled', false);
     }
   };
  
   onToggleOn = function() {
     var onBluetoothEnabled;
     onBluetoothEnabled = function() {
       return Bluetooth.set({
         state: BluetoothState.Ready
       });
     };
     Bluetooth.set({
       state: BluetoothState.Busy
     });
     return window.bluetooth.enable(onBluetoothEnabled);
   };
 
   onToggleOff = function() {
     var onBluetoothDisabled;
     onBluetoothDisabled = function() {
       return Bluetooth.set({
         state: BluetoothState.Off
       });
     };
     Bluetooth.set({
       state: BluetoothState.Busy
     });
     return window.bluetooth.disable(onBluetoothDisabled);
   };

   //listar dispositivo
   onDiscover = function() {
 	  
 	try{  
     var onDeviceDiscovered, onDiscoveryFinished;
     onDeviceDiscovered = function(device) {
     	 
     	//$('#status').append('<p>' + JSON.stringify(device) + '</p>');
 	      try{
 	    	  if(device.isConnected===null){
 	    		  device.isConnected=false;
 	    	  }
 	    	  device.isConnected=false;
 	    	  //alert(JSON.stringify(device))
 	    	  /*
 	    	  if (typeof console  != "undefined") 
 	    		    if (typeof console.log != 'undefined')
 	    		        console.olog = console.log;
 	    		    else
 	    		        console.olog = function() {};
 	    		        
 	    		    //alert(device)    
 	    		    console.log = function(device) {
 	    		    	//alert(device) 
 		    		    console.olog(device);
 		    		    $('#status').append('<p>' + device + '</p>');
 	    		    };
 	    		    console.log(device)
 	    		    console.error = console.debug = console.info =  console.log
 	    		    */
 	     // alert(JSON.stringify(device))	  ;
 	      //var newdevice=new Device(device);
 	      //alert(JSON.stringify(newdevice));
 	      
 	      return deviceList.collection.add(new Device(device));
 	      }catch(err){
 	  		alert('Error: '+err.message)
 	  	}
     };
     
     onDiscoveryFinished = function() {
     	//alert('termina')
       Bluetooth.set({
         state: BluetoothState.Ready
       });
       return $("#btn-bt-discover").html("reset");
     };
     Bluetooth.set({
       state: BluetoothState.Busy
     });
     $("#btn-bt-discover").html("loading");
     deviceList.collection.reset();
     return window.bluetooth.startDiscovery(onDeviceDiscovered, onDiscoveryFinished, onDiscoveryFinished);
 	}catch(err){
 		alert('Error: '+err.message)
 	}
   };
   
   $("#btn-bt-on").on("click", onToggleOn);
   $("#btn-bt-off").on("click", onToggleOff);
   $("#btn-bt-discover").on("click", onDiscover);
   Bluetooth.on("change", onBluetoothStateChanged);
   
  //alert('isenabled')
   return window.bluetooth.isEnabled(
 	 function(isEnabled) {
 	    if (isEnabled) {
 	      return Bluetooth.set({
 	        state: BluetoothState.Ready
 	      });
 	    } else {
 	      return Bluetooth.set({
 	        state: BluetoothState.Off
 	      });
 	    }
   }
 		  //isEnabledSuccess, isEnabledError  
   );
  }catch(err){
  	alert('error: '+err.message)
  }
 };

 function isEnabledSuccess(isEnabled)
 {
    var element = document.getElementById('status');
    element.innerHTML = "Enabled";
 }

 function isEnabledError(isEnabled)
 {
    var element = document.getElementById('status');
    element.innerHTML = "Disabled";
 }
 //$(document).on("deviceready", onDeviceReady());

 // ---
 // generated by coffee-script 1.9.2