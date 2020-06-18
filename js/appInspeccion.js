appInspeccion=[];
appInspeccion.reporte=[];
appInspeccion.reenviaInforme=function(sendData,lote){
	//alert('reenvia '+lote)
	//var url = appConfig.urlhfReporte+'reporteCache.php';
	var url = appConfig.urlhfReporte+'testReporte.php';
	try{
		 jQuery.ajax({   
		       url: url,  
		       async: true,
		       type: 'POST', 
		       dataType: 'text',
		       //data:JSON.stringify(appConfig.poolImages),
		       data:sendData,
		       contentType: "application/x-www-form-urlencoded;charset=UTF-8",			           
		       success:function(data, textStatus, jqXHR){
		    	 jQuery.sap.require("sap.m.MessageBox");
		  		 //sap.m.MessageBox.alert(data);
		    	 console.log(data);
		    	 //appConfig.log(data);
		    	 var result=[];
		    	try{result=jQuery.parseJSON(JSON.stringify(eval("(" + data+")")));}catch(err){appConfig.log(err);console.log(err);}
		        //result=jQuery.parseJSON(JSON.stringify(eval("(" + result+")")));
		    	console.log(result);
		    	appConfig.log(result);
		       	if(result.hana !== undefined && result.hana.idInforme!==undefined){
		       		jQuery.sap.require("sap.m.MessageToast");
		            sap.m.MessageToast.show("Sincronizacion: "+result.hana.response);
		            try{
			    	    appFileSystem.root.getFile("Lotes/"+lote, null, 
		    	    		function (fileEntry) {
		    		    		fileEntry.remove(function (file){
		    		    		appConfig.log("lote: "+remove)	 
		    		    		}, 
		    		    		appFile.failread);
		    				}, 
		    	    		appFile.failread);
			        	}catch(err){alert(err.message)}
		       		//setTimeout(function(){oController.sendInspeccion(result.hana,sendData);},10);
		       	}else{
		       		jQuery.sap.require("sap.m.MessageToast");
		       		sap.m.MessageToast.show("error en la creacion del informe intente nuevamente");
		       		
		       	}
		       },   
		       error: function(err){
		       	//alert(err.message);
		       	
		       	//alert(img);
		       	console.log(err);
		       	appConfig.log(err);
		       	} 
		       });
	}catch(err){
		alert(err.message)
		pageReporte.setBusy(false);
	 }
}

/*********************crear archivos************************************************/
var appFile={
	saveFileFail:function (data) {
		if(!appConfig.useApp==true)return;
		appConfig.failDataRequest=data;
	    try{window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,appFile.gotFS,appFile.fail);}catch(err){err.message;}
	    
	}
	,
	gotFS:function (fileSystem) {
		data=appConfig.failDataRequest;
	    //data.lote = Math.floor((Math.random() * 10) + 1);
	    //alert('gotFS')
		if(data.lote==undefined ||data.lote==null){data.lote="nolote";appConfig.failDataRequest.lote="nolote";}
	    try{
	    	fileSystem.root.getFile("Lotes/"+data.lote+".txt", {create: true, exclusive: false}, appFile.gotFileEntry,  appFile.fail);
	    }catch(err){
			alert(err.message);
		}
	},
	
	gotFileEntry:function (fileEntry) {
		//alert('gotFileEntry')
	    fileEntry.createWriter(appFile.gotFileWriter, appFile.fail);
	},
	
	gotFileWriter:function (writer) {
		//alert('gotFileWriter')
	    writer.write(data.sendData+data.image);
	    alert(data.sendData+data.image);
		//setTimeout(function(){window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, appFile.gotFSread, appFile.failread);},1000);
	},
	
	fail:function (error) {
		alert('fail')
	    alert(error.code);
	},
	/********************************************para lleer*********************************************************/
	gotFSread:function (fileSystem) {
		appConfig.failDataRequest=data;
	    try{fileSystem.root.getFile(data.lote+".txt", null, appFile.gotFileEntryread, appFile.failread);}catch(err){alert(err.message)}
	},
	
	gotFileEntryread:function (fileEntry) {
		
	    fileEntry.file(appFile.gotFileread, appFile.fail);
	},
	
	gotFileread:function (file){
		
	    //readDataUrl(file);
	    readAsText(file);
	},
	
	readDataUrl:function (file) {
	    var reader = new FileReader();
	    reader.onloadend = function(evt) {
	        console.log("Read as data URL");
	        console.log(evt.target.result);
	    };
	    reader.readAsDataURL(file);
	},
	
	readAsText:function (file) {
		
	    var reader = new FileReader();
	    reader.onloadend = function(evt) {
	        console.log("Read as text");
	        alert(evt.target.result);
	    };
	    reader.readAsText(file);
	},
	
	failread:function (evt) {
	    alert(evt.target.error.code);
	},
	/***********listar archivos****************************************************/
	successfile:function (entries) {
		//alert('successfile')
		try{
		    var i;
		    for (i=0; i<entries.length; i++) {
		        //alert(entries[i].name);
		        //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
		        	//function (fileSystem) {
		        	//alert('fileSystem')
		        	try{
		    	    appFileSystem.root.getFile("Lotes/"+entries[i].name, null, 
	    	    		function (fileEntry) {
		    	    		//alert(fileEntry.name);
	    		    		fileEntry.file(function (file){
	    		    			 var reader = new FileReader();
	    		    			 reader.onloadend = function(evt) {
	    		    				//alert('evt')
	    		    				try{
	    		    					//appConfig.log(evt);
				    			        //appConfig.log(entries[i].name+" Read as text");
	    		    					//alert(fileEntry.name);
				    			        appInspeccion.reenviaInforme(evt.target.result+"&FILELOTE="+fileEntry.name,fileEntry.name);
				    			        }catch(err){alert(err.message)}
	    		    			 };
	    		    			 //alert(fileEntry.name);
	    		    			 //appConfig.log(file);
	    		    			 reader.readAsText(file);
	    		    		}, 
	    		    		appFile.failread);
	    				}, 
	    	    		appFile.failread);
		        	}catch(err){alert(err.message)}
		    		//}
	       // 		,appFile.failread);
		    }
		}catch(err){alert(err.message)}
	},
	
	faildir:function (error) {
	    alert("Failed to list directory contents: " + error.code);
	},
	createDirectory:function(){
		//alert('createDirectory')
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, appFile.getFSdir, appFile.faildir);
		setTimeout(appFile.createDirectory,20000);
	},
	getFSdir:function(fileSystem){
		//var dirEntry= new DirectoryEntry();
		//alert('getFSdir')
		try{fileSystem.root.getDirectory("Lotes", {create: true, exclusive: false}, appFile.getFiledir, appFile.faildir);
		}catch(err){
				alert(err.message);
				}
		
	},
	getFiledir:function(dirEntry){
		//alert('getFiledir')
		try{
			var directoryReader=dirEntry.createReader();
			directoryReader.readEntries(appFile.successfile,appFile.faildir);
		}catch(err){
			alert(err.message);
		}
	}
	
	
	// Get a directory reader
	//directoryReader:dirEntry.createReader()
	
	// Get a list of all the entries in the directory
	//directoryReader.readEntries(success,fail);
};

var appFileSystem;
function createFileSystem(system){
	appFileSystem = system;
	setTimeout(appFile.createDirectory,300000);
	//alert(appFileSystem);
};
