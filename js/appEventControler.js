var appEvent=[];
appEvent.eventTimeOut;
appEvent.eventTime;
appEvent.tiempoEspera = 300;
appEvent.tStart="touchstart";
appEvent.tEnd="touchend";
appEvent.eventBegin=function(instrucciones){
	var tiempoespera = appEvent.tiempoEspera;
	appEvent.eventTimeOut=function(){
		appEvent.eventTime=setTimeout(function(){
			instrucciones();
			if(tiempoespera>100)tiempoespera=tiempoespera-100;
			//else if(tiempoespera>100)tiempoespera=tiempoespera-10;
			else if(tiempoespera>50)tiempoespera=tiempoespera-3;
			else tiempoespera=15;
			appEvent.eventTimeOut();
			},tiempoespera);
	 }
	appEvent.eventTimeOut();
}
appEvent.eventFinish=function(){
	clearTimeout(appEvent.eventTime);
	appEvent.eventTimeOut=false;
}

appInspeccion=[];
appInspeccion.reporte=[];
appInspeccion.reenviaInforme=function(sendData,lote){
	//alert('reenvia '+lote)
	//var url = appConfig.urlhfReporte+'reporteCache.php';
	var url = appConfig.urlhfReporte+'testReporte.php';
	try{
		 jQuery.ajax({
			   timeout:300000,
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
		    		    		appConfig.log("lote: "+lote+" removido")	 
		    		    		}, 
		    		    		appFile.failread);
		    				}, 
		    	    		appFile.failread);
			        	}catch(err){alert(err.message)}
		       		//setTimeout(function(){oController.sendInspeccion(result.hana,sendData);},10);
		       	}else{
		       		//jQuery.sap.require("sap.m.MessageToast");
		       		//sap.m.MessageToast.show("error en la creacion del informe intente nuevamente");
		       		
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
appInspeccion.reenviaInformeGeneric=function(sendData,fileSync,carpeta,urlSync,renameFile){
	//alert('reenvia '+lote)
	//var url = appConfig.urlhfReporte+'reporteCache.php';
	var url = urlSync;
	try{
		 jQuery.ajax({
			   timeout:300000,
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
		    	 appConfig.log(data);
		    	 var result=[];
		    	try{result=jQuery.parseJSON(JSON.stringify(eval("(" + data+")")));}catch(err){appConfig.log(err);console.log(err);}
		        //result=jQuery.parseJSON(JSON.stringify(eval("(" + result+")")));
		    	console.log(result);
		    	appConfig.log(result);
		       	if(result.hana !== undefined && result.hana.idInforme!==undefined){
		       		jQuery.sap.require("sap.m.MessageToast");
		            sap.m.MessageToast.show("Sincronizacion: "+result.hana.response);
		            try{
		            	if(renameFile)
		            	appFile.renameFile(fileSync,carpeta+'/',fileSync,carpeta+'Respaldo/');
			    	    //appFileSystem.root.getFile(carpeta+"/"+fileSync, null,function (fileEntry) {//fileEntry.remove(function (file){appConfig.log(" "+fileSync+" removido");},appFile.failread);	},appFile.failread);
			        	}catch(err){alert(err.message)}
		       		//setTimeout(function(){oController.sendInspeccion(result.hana,sendData);},10);
		       	}else{
		       		//jQuery.sap.require("sap.m.MessageToast");
		       		appConfig.log(data);
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
	    writer.write(data.sendData+data.images);
	    //alert(data.sendData+data.image);
		//setTimeout(function(){window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, appFile.gotFSread, appFile.failread);},1000);
	},
	
	fail:function (error) {
		alert('error en archivo')
	    alert('codigo: '+error.code);
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
		 alert("error de Lectura: "+evt.target.error.code);
	},
	/***********listar archivos****************************************************/
	successfile:function (entries) {
		//alert('successfile')
		try{
		    var i;
		    if(entries.length>0)
		    for (i=0; i<1; i++) {
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
	    		    					if(appConfig.useApp&&!checkConnection()){
	    		    						return false;
	    		    					}
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
		setTimeout(appFile.createDirectory,300000);
	},
	getFSdir:function(fileSystem){
		//var dirEntry= new DirectoryEntry();
		//alert('getFSdir')
		try{
			fileSystem.root.getDirectory("Lotes", {create: true, exclusive: false}, appFile.getFiledir, appFile.faildir);
		    
		
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
	
	,saveFileForSync:function(carpeta,archivo,dataFile){
		if(!appConfig.useApp==true)return;
		//alert(carpeta+'/'+archivo)
	    try{
	    	window.requestFileSystem(LocalFileSystem.PERSISTENT, 
	    			0,
	    			function (fileSystem) {
	    		    fileSystem.root.getDirectory(carpeta, {create: true, exclusive: false}, appFile.getFiledir, appFile.faildir);
	    	    	setTimeout(function(){fileSystem.root.getFile(
	    	    		carpeta+"/"+archivo, {create: true, exclusive: false},
	    	    		function (fileEntry) {
	    	    		    fileEntry.createWriter(
	    	    		    		function (writer) {
	    	    		    			//alert(dataFile)
	    	    		    		    writer.write(dataFile);
	    	    		    		},
	    	    		    		function(err){alert('error al escribir archivo')}
	    	    		    		);
	    	    		},
	    	    		function(err){alert('error al crear carpeta')}
		    	    	);},500);
	    			},
	    			function(err){alert('error al iniciar sistema de archivos')});
	    	}catch(err){
	    		alert(err.message);
	    }
	},
	uploadFileSync:function(carpeta,urlupload){
		if(!appConfig.useApp==true)return;
		window.requestFileSystem(
				LocalFileSystem.PERSISTENT, 
    			0,
				function(fileSystem){
					try{
						//alert(1)
						fileSystem.root.getDirectory(
								carpeta,
								{create: true, exclusive: false},
								function(dirEntry){
									try{
										//alert(2)
										var directoryReader=dirEntry.createReader();
										directoryReader.readEntries(
											function (entries) {
												try{
													//alert(3)
												    var i;
												    if(entries.length>0)
												    for (i=0; i<30 && i<entries.length; i++) {
												    	    appFileSystem.root.getFile(carpeta+"/"+entries[i].name, null, 
											    	    		function (fileEntry) {
											    		    		fileEntry.file(function (file){
											    		    			 var reader = new FileReader();
											    		    			 reader.onloadend = function(evt) {
											    		    				try{
											    		    					if(appConfig.useApp&&!checkConnection()){
											    		    						return false;
											    		    					}
											    		    					//alert('inspeccionSync')
											    		    					appFile.fileTime=appFile.fileTime+500;
											    		    					setTimeout(function(){appInspeccion.reenviaInformeGeneric(evt.target.result,fileEntry.name,carpeta,urlupload,true);},appFile.fileTime)
														    			        }catch(err){alert(err.message)}
											    		    			 };
											    		    			 reader.readAsText(file);
											    		    		}, 
											    		    		appFile.failread);
											    				}, 
											    	    		appFile.failread);
												    }
												}catch(err){alert(err.message)}
											},
											appFile.faildir);
									}catch(err){
										alert(err.message);
									}
								},
								appFile.faildir);
					}catch(err){
							alert(err.message);
					}
				},
				appFile.faildir);
	},
	
	setSyncUpload:function(){
		return;
		//alert('sync1')
		try{
			setTimeout(function(){
			//alert('sync2')
			try{
				appFile.setSyncUpload();
				appFile.uploadFileSync("preEmbarqueData",appConfig.urlhfReporte+'preEmbarque/preEmbarqueSaveReporte.php');
				appFile.uploadFileSync("preEmbarqueImg",appConfig.urlhfReporte+'preEmbarque/preEmbarqueSaveImg.php');
				appFile.uploadFileSync("preEmbarqueDataPallet",appConfig.urlhfReporte+'preEmbarque/preEmbarqueSaveNotaPallet.php');
				
				appFile.uploadFileSync("destinoData",appConfig.urlhfReporte+'destino/destinoSaveReporte.php');
				appFile.uploadFileSync("destinoImg",appConfig.urlhfReporte+'destino/destinoSaveImg.php');
				appFile.uploadFileSync("destinoDataPallet",appConfig.urlhfReporte+'destino/destinoSaveNotaPallet.php');
				
				appFile.uploadFileSync("destinoDataContiner",appConfig.urlhfReporte+'destino/destinoSaveContainer.php');
				appFile.uploadFileSync("containerImg",appConfig.urlhfReporte+'destino/destinoSaveContainerImg.php');
				
			}catch(err){alert(err.message)}
		},220000)
		}catch(err){alert(err.message)}
	},
	
	readLocalFile:function(archivo,carpeta,functionEvent){
		appFileSystem.root.getFile(carpeta+"/"+archivo, null, 
	    		function (fileEntry) {
		    		fileEntry.file(function (file){
		    			 var reader = new FileReader();
		    			 reader.onloadend = function(evt) {
		    				try{
		    					//if(appConfig.useApp&&!checkConnection()){return false;}
		    					//alert(evt.target.result)
		    					functionEvent(evt.target.result);
		    			        }catch(err){alert(err.message)}
		    			 };
		    			 reader.readAsText(file);
		    		}, 
		    		appFile.failread);
				}, 
	    		appFile.failread);
	},
	
	renameFile:function (currentName, currentDir, newName, newDir,successFunction) {
		appFileSystem.root.getFile(currentDir + currentName, null, function (fileEntry) {
			appFileSystem.root.getDirectory(newDir, {create: true}, function (dirEntry) {
	            	try{
	            		fileEntry.moveTo(dirEntry, newName, function () {
	            			appConfig.log('archivo '+newName+' movido correctamente');
	                }, appFile.failread);
	            	}catch(err){alert(err.message)}}, appFile.failread);
	        }, appFile.failread);
	},
	copyFile:function (currentName, currentDir, newName, newDir,successFunction) {
	        appFileSystem.root.getFile(currentDir + currentName, null, function (fileEntry) {
	        	appFileSystem.root.getDirectory(newDir, {create: true}, function (dirEntry) {
	            	try{
		                fileEntry.copyTo(dirEntry, newName, function () {
		                	appConfig.log('archivo '+newName+' copiado correctamente');
	                }, appFile.failread);
	            	}catch(err){alert(err.message)}}, appFile.failread);
	        }, appFile.failread);
	},
	uploadFile:function(fileURI,urlUpload,successU){
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
		options.mimeType = "text/plain";

		var params = {};
		params.value1 = "test";
		params.value2 = "param";

		options.params = params;
		var ft = new FileTransfer();
		try{
			ft.upload(fileURI, encodeURI(urlUpload),
					function(r){
							//appConfig.log(r);
							var result=  JSON.parse(r.response);
							successU(result);
						
						
				}, function(r){appConfig.log(r)}, options);}catch(err){alert(err.message)}
	},
	uploadFileSyncImg:function(carpeta,urlupload){
		if(!appConfig.useApp==true)return;
		try{
			//alert(1)
			appFileSystem.root.getDirectory(
					carpeta,
					{create: true, exclusive: false},
					function(dirEntry){
						try{
							//alert(2)
							var directoryReader=dirEntry.createReader();
							directoryReader.readEntries(
								function (entries) {
									try{
										//alert(3)
									    var i;
									    if(entries.length>0)
									    for (i=0;  i<entries.length; i++) {
									    	    appFileSystem.root.getFile(carpeta+"/"+entries[i].name, null, 
								    	    		function (fileEntry) {
								    		    		fileEntry.file(function (file){
								    		    			//appConfig.log(file);
								    		    			var successUpload=function(result){
								    		    				//alert('hola')
								    		    				appConfig.log(result);
								    		    				//appConfig.log(file);
								    		    				if(result.hana!=undefined && result.hana.error==0){
								    		    					//appConfig.log(result.response);
								    		    					appFile.renameFile(file.name,carpeta+'/',file.name,carpeta+'Respaldo/');
								    		    				}else if(result.hana!=undefined && result.hana.error==1){
								    		    					//appConfig.log(result.response);
								    		    					appFile.renameFile(file.name,carpeta+'/',file.name,carpeta+'RespaldoNoSubido/');
								    		    				}else if(result.hana!=undefined && result.hana.error==2){
								    		    					
								    		    				}
								    		    			}
								    		    			appFile.fileTime=appFile.fileTime+500;
								    		    			setTimeout(function(){appFile.uploadFile(file.localURL,urlupload,successUpload)},appFile.fileTime)
								    		    		}, 
								    		    		appFile.failread);
								    				}, 
								    	    		appFile.failread);
									    }
									}catch(err){alert(err.message)}
								},
								appFile.faildir);
						}catch(err){
							alert(err.message);
						}
					},
					appFile.faildir);
		}catch(err){
				alert(err.message);
		}
				
	},
	listaPalletGuardados:function(){
		appFileSystem.root.getDirectory(
				"appHf/destinoDataPalletRespaldo",
				{create: true, exclusive: false},
				function(dirEntry){
					try{
						//alert(2)
						var directoryReader=dirEntry.createReader();
						directoryReader.readEntries(
							function (entries) {
								try{
									//alert(3)
								    var i;
									//appConfig.log(entries)
								    if(entries.length>0)
								    for (i=0;  i<entries.length; i++) {
								    	    appConfig.log(entries[i].name)
								    }
								    appConfig.cambiaPagina("logs")
								}catch(err){alert(err.message)}
							},
							appFile.faildir);
					}catch(err){
						alert(err.message);
					}
				},
				appFile.faildir);
	}
	
};

var appFileSystem;
function createFileSystem(system){
	appFileSystem = system;
	appFileSystem.root.getDirectory(
			"appHf",
			{create: true, exclusive: false},
			function(dirEntry){},
			appFile.faildir);
	//alert('filesystem')
	//setTimeout(appFile.setSyncUpload,10)
	//setTimeout(appFile.createDirectory,100000)
	
	//alert(appFileSystem);
};
