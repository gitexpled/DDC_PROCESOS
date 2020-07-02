

function scanQr(oController) {
	//alert('scan')
	try{
        //var scanner = cordova.require("cordova/plugin/BarcodeScanner");
		 cordova.plugins.barcodeScanner.scan(function (result) { 
        //scanner.scan( function (result) { 
		appConfig.qrResult=result.text;
		
			
			try{
             console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
            //document.getElementById("info").innerHTML = result.text;
             console.log(result);
            /*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */
             oController.goToQrScanForm();
             oController.setQrForm();
        	}catch(err){
	    		alert('errorScan: '+err.message)
	    		return 0;
    		}
        	return 1;
        }, function (error) { 
            console.log("Scanning failed: ", error); 
            return 0;
        } 
        );
	}catch(err){
		alert('errorScan: '+err.message)
		return 0;
	}
	return 1;
}

 function encodeQr() {
    var scanner = cordova.require("cordova/plugin/BarcodeScanner");

    scanner.encode(scanner.Encode.TEXT_TYPE, "http://www.nhl.com", function(success) {
        alert("encode success: " + success);
      }, function(fail) {
        alert("encoding failed: " + fail);
      }
    );

};
 
 