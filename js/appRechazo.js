appRechazo=[];
appRechazo.clamshellsBajoPeso=[];
appRechazo.estado=false;
appRechazo.tipoRechazo=0;
appRechazo.rechazoTotalInspeccion=0;
appRechazo.clamshellBajoPeso=function(index,peso){
	if(appRechazo.checkClamshell){
		appConfig.cambiaControlClamshell(peso);
		return false;
	}
	var mensajeClamshell="¿Desea Rechazar Inspeccion por bajo peso?, si cancela debera pesar otro Clamshell";
	if(appConfig.tipoReporte==96)mensajeClamshell="¿Desea inspeccionar Clamshells por bajo peso ?, si cancela debera pesar otro Clamshell";
	jQuery.sap.require("sap.m.MessageBox");
	 //console.log(sap.m.MessageBox.Icon);
	 sap.m.MessageBox.show(
			 mensajeClamshell, {
		        icon: sap.m.MessageBox.Icon.QUESTION,
		        title:"Clamshell Bajo Peso" ,
		        actions: [
		                  sap.m.MessageBox.Action.OK
		                  ,sap.m.MessageBox.Action.CANCEL
		                  ],
		       onClose: function(oAction){
		    	   if(oAction==='OK'){
		    		   if(appConfig.tipoReporte!=96){
			    		   appRechazo.clamshellsBajoPeso.push({index:index,peso:peso})
			    		   appRechazo.paginaRechazo='clamshell';
			    		   appRechazo.tipoRechazo='bajopeso';
			    		   appRechazo.estado=true;
			    		   appRechazo.continueInspeccion();
		    		   }else{
		    			   //appConfig.cantClamshell=3;
		    			   appRechazo.checkClamshell=true;
		    			   appConfig.cambiaPagina("clamshellBajoPeso");
		    		   }
		    	   }else{
		    		   
		    	   }
		       }     
		      }
		    );
}


appRechazo.confirmForm=function(tiporechazo){
	appRechazo.tipoRechazo=tiporechazo;
	jQuery.sap.require("sap.m.MessageBox");
	 //console.log(sap.m.MessageBox.Icon);
	sap.m.MessageBox.show(
		      "¿Esta seguro que desea rechazar la inspeccion?", {
		        icon: sap.m.MessageBox.Icon.QUESTION,
		        title:"Rechazo de Inspeccion" ,
		        actions: [sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],
		        onClose: function(oAction){
		    	   if(oAction==='OK'){
		    		   appRechazo.paginaRechazo='form';
		    		   appRechazo.estado=true;
		    		   if(tiporechazo==='parcial'){
		    			   appRechazo.tipoRechazo=tiporechazo;
		    			   if(appConfig.tipoReporte==1){
		    		      		  appConfig.cambiaPagina("setClamshell");
		    		      		  //beginEventSetClamshell(controllerSetClamshell);
		    		      		  }
		    		      	  else if(appConfig.tipoReporte==2){
		    		      		  appConfig.cambiaPagina("pesoMuestra");
		    		      		  }
		    		   }
		    		   else {
		    			   appRechazo.tipoRechazo=tiporechazo;
		    			   appRechazo.continueInspeccion()
		    		   }
		    	   }else{
		    		   
		    	   }
		       }     
		      }
		    );
	 
};

appRechazo.continueInspeccion=function(){
	jQuery.sap.require("sap.m.MessageBox");
	 //console.log(sap.m.MessageBox.Icon);
	 sap.m.MessageBox.show(
		      "¿Desea realizar la inspeccion de todas maneras?", {
		        icon: sap.m.MessageBox.Icon.QUESTION,
		        title:"Inspeccion Recahzada" ,
		        actions: [
		                  sap.m.MessageBox.Action.OK
		                  ,"NO"
		                  ],
		       onClose: function(oAction){
		    	   if(oAction==='OK'){

		    		   if(appRechazo.paginaRechazo==='clamshell'){
		    			   
		    		   }else{
		    			   if(appConfig.tipoReporte==1){
		    		      		  appConfig.cambiaPagina("setClamshell");
		    		      		  //beginEventSetClamshell(controllerSetClamshell);
		    		      		  }
		    		      	  else if(appConfig.tipoReporte==2){
		    		      		  appConfig.cambiaPagina("pesoMuestra");
		    		      		  }
		    		   }
		    	   }else{
		    		   appRechazo.rechazoTotalInspeccion=1;
		    		   appConfig.cambiaPagina('reporte');
		    	   }
		       }     
		      }
		    );
};

var appMenuBut = new sap.m.Button("btnMenuInicio",{
	/*text:"Menu",*/
	icon:"img/logo-header.jpg",
	press:function(){
		var eDock = sap.ui.core.Popup.Dock;
		appMenu.open(false,this,eDock.BeginTop, eDock.BeginBottom, this);
	}
  }).addStyleClass("btnMenu");
var appMenuBut1 = new sap.m.Button("btnMenuReporte",{
	/*text:"Menu",*/
	icon:"img/logo-header.jpg",
	press:function(){
		var eDock = sap.ui.core.Popup.Dock;
		appMenu1.open(false,this,eDock.BeginTop, eDock.BeginBottom, this);
	}
  }).addStyleClass("btnMenu");
var appMenuBut2 = new sap.m.Button("btnMenuUpdate",{
	text:"Actualizar",
	icon:"img/logo-header.jpg",
	press:function(){
		var eDock = sap.ui.core.Popup.Dock;
		appMenu2.open(false,this,eDock.BeginTop, eDock.BeginBottom, this);
	}
  }).addStyleClass("btnMenu");
var appMenuBut3 = new sap.m.Button("btnMenuUpdateI",{
	text:"Actualizar",
	icon:"img/logo-header.jpg",
	press:function(){
		var eDock = sap.ui.core.Popup.Dock;
		appMenu3.open(false,this,eDock.BeginTop, eDock.BeginBottom, this);
	}
  }).addStyleClass("btnMenu");
var appMenuBut4 = new sap.m.Button("btnMenuSinc",{
	/*text:"Sincronizar lotes",*/
	icon:"img/logo-header.jpg",
	press:function(){
		var eDock = sap.ui.core.Popup.Dock;
		appMenu4.open(false,this,eDock.BeginTop, eDock.BeginBottom, this);
	}
  }).addStyleClass("btnMenu");
var appMenu=new sap.ui.unified.Menu({
	items:[
			new sap.ui.unified.MenuItem({
				text:"Obtener Imagen",
				icon:"sap-icon://add-photo",
				select:function(){
					if(sap.ui.getCore().byId("idingresoImagenes1")!=undefined){
						var page = sap.ui.getCore().byId("idingresoImagenes1");
						page.oController.capture();
						//console.log(page)
						}
					}
			}),
			new sap.ui.unified.MenuItem({
				text:"Cancelar Inspeccion"
				,icon:"sap-icon://delete"
				,select:function(){
					jQuery.sap.require("sap.m.MessageBox");
					 //console.log(sap.m.MessageBox.Icon);
					 sap.m.MessageBox.show(
						      "¿Desea Cancelar la Inspeccion?", {
						        icon: sap.m.MessageBox.Icon.QUESTION,
						        title:"Cancelacion de Inspeccion" ,
						        actions: [
						                  sap.m.MessageBox.Action.OK
						                  ,"NO"
						                  ],
						       onClose: function(oAction){
						    	   if(oAction==='OK'){
						    		   appConfig.cambiaPagina("inicio","back");
						    	   }else{
						    		   appMenu.close();
						    	   }
						       }     
						      }
						    );
					appMenu.close();
					}
			}),
			
			new sap.ui.unified.MenuItem({
				text:"Cambio de Kg/Gr",
				icon:"sap-icon://sort",
				select:function(){
					if(appConfig.setKgToGr==1)appConfig.setKgToGr=1000;
					else if(appConfig.setKgToGr==1000)appConfig.setKgToGr=1;
					appConfig.PesoBt=0;
					}
			}),
			
			new sap.ui.unified.MenuItem({
				text:"Usar/no usar BT",
				icon:"sap-icon://locked",
				select:function(){
					if(appConfig.getPesaBtData==1)appConfig.getPesaBtData=0;
					else if(appConfig.getPesaBtData==0)appConfig.getPesaBtData=1;
					appConfig.PesoBt=0;
					}
			}),
			new sap.ui.unified.MenuItem({
				text:"Ver Logs",
				icon:"sap-icon://activity-items",
				select:function(){
					appConfig.cambiaPagina("logs")
					appMenu.close();
					}
			}),
			new sap.ui.unified.MenuItem({
				text:"Buscar Pesa BT",
				icon:"sap-icon://activity-items",
				select:function(){
					appConfig.cambiaPagina("selectBT");
					var page = sap.ui.getCore().byId("pagSelectBt");
					appConfig.blueBack=true;
					//page.setShowHeader(false);
					appMenu.close();
					}
			}),
			new sap.ui.unified.MenuItem({
				text:"Cerrar",
				icon:"sap-icon://decline",
				select:function(){
					appMenu.close();
					}
			})


	       ]
});
var appMenu1=new sap.ui.unified.Menu({
	items:[
			new sap.ui.unified.MenuItem({
				text:"Nueva Inspeccion"
				,icon:"sap-icon://expense-report"
				,select:function(){
					appMenu1.close();
					if(appInspeccion.reporteEnviado==0){
						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.show(
							      "Aun no envia el reporte, ¿desea realizar una nueva inspeccion sin enviar el reporte actual?", {
							        icon: sap.m.MessageBox.Icon.QUESTION,
							        title:"Reporte no enviado" ,
							        actions: [
							                  sap.m.MessageBox.Action.OK
							                  ,sap.m.MessageBox.Action.CANCEL
							                  ],
							       onClose: function(oAction){
							    	   if(oAction==='OK'){
											appConfig.cambiaPagina("inicio","back");
							    	   }else{
							    		   
							    	   }
							       }     
							      }
							    );
					}else{
						appConfig.cambiaPagina("inicio","back");
					}
					}
			}),
			new sap.ui.unified.MenuItem({
				text:"Ver Logs",
				icon:"sap-icon://activity-items",
				select:function(){
					appConfig.cambiaPagina("logs")
					appMenu1.close();
					}
			}),
			new sap.ui.unified.MenuItem({
				icon:"sap-icon://decline",
				text:"Cerrar",
				select:function(){
					appMenu1.close();
					}
			})
	       ]
});
var appMenu2=new sap.ui.unified.Menu({
	items:[
			new sap.ui.unified.MenuItem({
				text:"Actualizar Aplicacion",
				select:function(){
					jQuery.sap.require("sap.m.MessageBox");
					 sap.m.MessageBox.show(
						      "¿Desea Actualizar la aplicacion?", {
						        icon: sap.m.MessageBox.Icon.QUESTION,
						        title:"Actualizar APP Calidad" ,
						        actions: [
						                  sap.m.MessageBox.Action.OK
						                  ,"NO"
						                  ],
						       onClose: function(oAction){
						    	   if(oAction==='OK'){
						    		   setTimeout(function(){downloadApkAndroid();},1000)
						    	   }else{
						    		   appMenu2.close();
						    	   }
						       }     
						      }
						    );
					
					}
			})
			,
			/*
			new sap.ui.unified.MenuItem({
				text:"Ir a Inicio",
				select:function(){
					appMenu2.close();
					try{
						if(sap.ui.getCore().byId("appAfCalidad")==undefined){
				   			// var page = sap.ui.view({id:"idinicio1", viewName:"hfui51.inicio", type:sap.ui.core.mvc.ViewType.JS});
				   		    //else var page = sap.ui.getCore().byId("idinicio1");
				    	    app = new sap.m.App("appAfCalidad",{initialPage:"idlogin1"});
							//var page = sap.ui.view({id:"idlogin1", viewName:"hfui51.login", type:sap.ui.core.mvc.ViewType.JS});
				    	    appConfig.cambiaPagina("login")
							//app.addPage(page);
							app.placeAt("content");
							//$('.appSection').css("display","none");
				    		}else{
				    			appConfig.cambiaPagina("login");
				    		}
						}catch(err){alert(err.message)}
					}
			}),
			*/
			new sap.ui.unified.MenuItem({
				text:"Ver Logs",
				select:function(){
					appConfig.cambiaPagina("logs")
					appMenu1.close();
					}
			})

	       ]
});
var appMenu3=new sap.ui.unified.Menu({
	items:[
			new sap.ui.unified.MenuItem({
				text:"Actualizar Aplicacion",
				select:function(){
					jQuery.sap.require("sap.m.MessageBox");
					 //console.log(sap.m.MessageBox.Icon);
					 sap.m.MessageBox.show(
						      "¿Desea Actualizar la aplicacion?", {
						        icon: sap.m.MessageBox.Icon.QUESTION,
						        title:"Actualizar APP Calidad" ,
						        actions: [
						                  sap.m.MessageBox.Action.OK
						                  ,"NO"
						                  ],
						       onClose: function(oAction){
						    	   if(oAction==='OK'){
						    		   //app.setBusy(true);
						    		   $("#imgLoading").css("display","inline");
						    		   setTimeout(function(){downloadApkAndroid();},1000)
						    		   sap.m.MessageBox.alert("Esto puede tardar, por favor espere");
						    	   }else{
						    		   appMenu3.close();
						    	   }
						       }     
						      }
						    );
					}
			})
	       ]
});
var appMenu4=new sap.ui.unified.Menu({
	items:[/*
			new sap.ui.unified.MenuItem({
				text:"Sincronizar lotes",
				select:function(){
					jQuery.sap.require("sap.m.MessageBox");
					 //console.log(sap.m.MessageBox.Icon);
					 sap.m.MessageBox.show(
						      "¿Desea Sincronizar Inspecciones?", {
						        icon: sap.m.MessageBox.Icon.QUESTION,
						        title:"Sincronizacion" ,
						        actions: [
						                  sap.m.MessageBox.Action.OK
						                  ,"NO"
						                  ],
						       onClose: function(oAction){
						    	   if(oAction==='OK'){
						    		   appFile.createDirectory
						    		   sap.m.MessageBox.alert("Esto puede tardar, por favor espere");
						    	   }else{
						    		   appMenu4.close();
						    	   }
						       }     
						      }
						    );
					}
			}),
			*/
			new sap.ui.unified.MenuItem({
				text:"Subir Inspecciones",
				select:function(){
					jQuery.sap.require("sap.m.MessageBox");
					 //console.log(sap.m.MessageBox.Icon);
					 sap.m.MessageBox.show(
						      "¿Desea Sincronizar?", {
						        icon: sap.m.MessageBox.Icon.QUESTION,
						        title:"Sincronizacion" ,
						        actions: [
						                  sap.m.MessageBox.Action.OK
						                  ,"NO"
						                  ],
						       onClose: function(oAction){
						    	   if(oAction==='OK'){
						    		   appFile.fileTime=500;
						    		   appFile.uploadFileSyncImg('appHf/containerImgJpg',appConfig.urlhfReporte+'destino/destinoSaveContainerImgJpg.php')
						    		   appFile.uploadFileSyncImg('appHf/destinoImgJpg',appConfig.urlhfReporte+'destino/destinoSaveImgJpg.php')
						    		   
						    		   appFile.uploadFileSync("appHf/destinoData",appConfig.urlhfReporte+'destino/destinoSaveReporte.php');
									   appFile.uploadFileSync("appHf/destinoDataPallet",appConfig.urlhfReporte+'destino/destinoSaveNotaPallet.php');
									   appFile.uploadFileSync("appHf/destinoDataContiner",appConfig.urlhfReporte+'destino/destinoSaveContainer.php');
						    		   sap.m.MessageBox.alert("Esto puede tardar, por favor espere");
						    	   }else{
						    		   appMenu4.close();
						    	   }
						       }     
						      }
						    );
					}
			}),
			new sap.ui.unified.MenuItem({
				text:"Pallets Guardados",
				select:function(){
					
		    		   //try{appFile.listaPalletGuardados();}catch(err){appConfig.log(err)}
					    appConfig.deleteControls(["filesData.listaPallet"])
						appConfig.cambiaPagina("filesData.listaPallet")
		    		   
						appMenu4.close();
						    	
					}
			}),
			new sap.ui.unified.MenuItem({
				text:"Ver Logs",
				select:function(){
					appConfig.cambiaPagina("logs")
					appMenu1.close();
					}
			})
	       ]
});
//appMenu.setPagesize(100);





