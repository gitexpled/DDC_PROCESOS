var appConfig={}
appConfig.testApp=true;
appConfig.urlhf="http://hortitest.hortifrut.com:8006/sap/xsmc/";
appConfig.urlhfReporte="http://200.68.4.145/hana/";
appConfig.rfcUrl="http://172.16.10.101/rfc2json/textResponse.html";
appConfig.qrResult="especie1||condicion1||lote444||productor1||cajas||guia12213123"
	
appConfig.useApp=true;
appConfig.useHadware=true;
appConfig.bluetooth=[];
appConfig.qrResult=[];
appConfig.rfc=[];

appConfig.poolImages="";
appConfig.toleranciaCondicion="{normal:{azul:10,verde:20,amarillo:25,rojo:30},especial:{azul:10,verde:12,amarillo:15,rojo:20}}";                           
appConfig.toleranciaCalidad="{normal:{azul:10,verde:12,amarillo:15,rojo:20},especial:{azul:10,verde:12,amarillo:15,rojo:20}}";
appConfig.evalTerminado=[];

appConfig.reporteValues=[];
appConfig.reporteValues.Ss=0;
appConfig.reporteValues.Ac=0;
appConfig.reporteValues.Cmi=0;
appConfig.reporteValues.Cma=0;
appConfig.reporteValues.Di=0;
appConfig.reporteValues.Cpr=0;

appConfig.pesoBaseClamshell=100;
appConfig.pesoBaseClamshellInitial=100;
appConfig.PesoClamshellTotal=0;
appConfig.cantClamshell=3;
appConfig.pesoEnvaseClamshell=0;
appConfig.pesoPorcentajeMuestra=0;

appConfig.nota=[];
appConfig.nota.Qc=1;
appConfig.nota.colorNotaQC="azul";
appConfig.nota.tipoToleranca="normal";
appConfig.nota.defectoCondicion=1;
appConfig.nota.colorDefectoCalidad="azul";
appConfig.nota.defectoCalidad=1;
appConfig.nota.colorDefectoCondicion="azul";
appConfig.nota.notaBaseReporte="azul";
appConfig.nota.QcPackage=1;
appConfig.nota.QcPackageColor="azul";

appConfig.sonidos=[];
appConfig.sonidos.click=[];
appConfig.sonidos.click.play = function(){if(appConfig.useHadware==true)try{window.plugins.NativeAudio.play( 'click' );}catch(err){/*alert(err.message)*/}}


/**************************variable para calidad por clamshels *******************************************/
appConfig.evalClamshell=[];
appConfig.evalClamshell.clamshellActual=0;
appConfig.evalClamshell.sumaClamshells=0;
appConfig.evalClamshell.evalTerminada=false;

appConfig.setKgToGr=1;

appConfig.primerCaracter = function(tipo,cadena){if(tipo==='numero'){return !isNaN(cadena);}};
appConfig.log=function (message,key) {
	var response="";
	if (typeof message == 'object'&& message!=null) {
		$.each( message, function( key, value ) {
			appConfig.log(value,key);
		})
		//response += '<p>'+(JSON && JSON.stringify ? JSON.stringify(message) : message) + '</p>';
	}else{
		if(key!==undefined)response += '<p>'+key+': '+message + '</p>';
		else response += '<p>'+message + '</p>';
	}
	$("#appLogsResult").prepend(response);
};
appConfig.pesoGr=function(peso){
	var numero = parseFloat(peso.replace("kg",""))*1;
	if(sap.ui.getCore().byId("checkTipoCalibracion")!==undefined && sap.ui.getCore().byId("checkTipoCalibracion").getSelected()===true){
		var nnumero = parseFloat(numero/10).toFixed(1);
	}else{
		var nnumero = numero*appConfig.setKgToGr;
	}
	return nnumero+"gr";
}

appConfig.cambiaPagina=function(pagina,tipocambio){
	//alert(sap.ui.getCore().byId("idqrScan1"))
	if(sap.ui.getCore().byId("id"+pagina+"1")==undefined){
		 var page = sap.ui.view({id:"id"+pagina+"1", viewName:"hfui51."+pagina, type:sap.ui.core.mvc.ViewType.JS});
		 app.addPage(page); 
	}
	else var page = sap.ui.getCore().byId("id"+pagina+"1");
	if(tipocambio==='back')
		app.backToPage("id"+pagina+"1");
	else app.to("id"+pagina+"1");
}
appConfig.addPagina=function(pagina){
	//alert(sap.ui.getCore().byId("idqrScan1"))
	if(sap.ui.getCore().byId("id"+pagina+"1")==undefined){
		 var page = sap.ui.view({id:"id"+pagina+"1", viewName:"hfui51."+pagina, type:sap.ui.core.mvc.ViewType.JS});
		 app.addPage(page); 
	}
}
appConfig.deleteControls=function(arrayControls){
	//var arrayControls=[pagina];
	$.each(arrayControls, function(index, value) {
		//var cap = value.charAt(0).toUpperCase() + value.substring(1);
		var idVista= "id"+value+"1";
		//alert(idPage)
		if(sap.ui.getCore().byId(idVista)==undefined){
			
		}else{
			//alert(idVista)
			
			var control = sap.ui.getCore().byId(idVista);
			control.destroyContent();
			control.destroyCustomData();
			control.destroyDependents();
			control.destroyLayoutData();
			control.destroyTooltip();
			control.removeAllContent();
			control.destroyCustomData();
			control.destroyDependents();
			control.destroyLayoutData();
			control.removeAggregation();
			control.removeAllAggregation();
			control.removeAllAssociation();
			control.removeAssociation();
			/*control.destroyCustomHeader();
			control.destroyFooter();
			control.destroySubHeader();*/
			control.destroy();
			
			//$('#'+idVista).remove();
		}

		});
}
appConfig.cambiaControlPeso=function(back){
	var dataPeso=appConfig.userData.pesoConfig;
	var cambioControl=false;
	
	var cantDataOb=0;
	var contData=0;
	var lastKey=-1;
	//calcular peso
	var itemBack=[];
	var getItemBack= true;
	$.each( dataPeso, function( key, value ) {
		if(value.tipoReporte==appConfig.tipoReporte){
			  var control = sap.ui.getCore().byId(value.idObjeto);
			  if(back=='back' && getItemBack && !control.getVisible()){itemBack=value;}else{getItemBack=false;}
			  appConfig.setNotaDefecto(value,control);
		}
	});
	
	//cambio atras

	$.each( dataPeso, function( key, value ) {
		if(value.tipoReporte==appConfig.tipoReporte){
			if(value.obligatorio==1)
				lastKey=key;
			if(back=='back'&&value.idObjeto==itemBack.idObjeto){
				itemBack.id=itemBack.idObjeto
				appConfig.selectPeso(itemBack);
			}
		}});
	if(back=='back')return;
	
	$.each( dataPeso, function( key, value ) {
		if(value.tipoReporte==appConfig.tipoReporte){
			  var control = sap.ui.getCore().byId(value.idObjeto);
			  var label =  sap.ui.getCore().byId(value.idObjeto+"Label");
			  var visible = control.getVisible();
			  if(value.obligatorio!=1 && visible==true){
				  control.setVisible(false);
				  label.setVisible(false);
				  //if(dataPeso.length-1==key){
					  appConfig.cambiaPagina("listaPesos");
					  appConfig.resetTablaPeso();
				  //}
			  }else{

				  contData++;
				  //alert(contData+' '+cantDataOb)
				  if(cambioControl==true){
					  control.setVisible(true);
					  appConfig.pesoBaseDefectoVisible=control.getValue();//control cancelar
					  label.setVisible(true);
					  cambioControl=false;
				  }else if(visible==true){
					  //appConfig.setNotaDefecto(value,control);
					  cambioControl=true;
					  control.setVisible(false);
					  label.setVisible(false);
					  if(lastKey===key){
						  appConfig.cambiaPagina("listaPesos");
						  appConfig.resetTablaPeso();
					  }
				  }
			   }
			}
		});
}
appConfig.resetTablaPeso=function(){
	data =[];// '[{"item":"Polvo","peso":"0,5kg"},{"item":"Otra Condicion","peso":"0,6kg"},{"item":"Bloom","peso":"1,98kg"},{"item":"Falta Bloom","peso":"2,55kg"},{"item":"RestosFlorales","peso":"0,005kg"}]'
	var dataPeso=appConfig.userData.pesoConfig;
	$.each( dataPeso, function( key, value ) {
		if(value.tipoReporte==appConfig.tipoReporte){
		  var control = sap.ui.getCore().byId(value.idObjeto);
		  var label =  sap.ui.getCore().byId(value.idObjeto+"Label");
		  var result ={
				  id:value.idObjeto,
				  item:label.getText(),
				  peso:control.getValue(),
				  nota:"",//appConfig.setDecripcionNota(value.colorNota),
				  color:value.colorNota,
				  frutos:value.cantFruto
		  }
		  data.push(result);
		  //console.log(result);
		}
	});

	//data = jQuery.parseJSON(data);
	//console.log(appConfig.userData.pesoConfig);
	var oModel = new sap.ui.model.json.JSONModel({"data":data});   
	if(sap.ui.getCore().byId("tblDataPesos")===undefined){
		 var oTable = new sap.m.Table("tblDataPesos",{
	        	growing:true,
	        	growingThreshold:100,
	            /*mode: sap.m.ListMode.MultiSelect,*/
	            columns: [
	              new sap.m.Column({ header: new sap.m.Label({text: "Item"}),width:"50%"}),
	              new sap.m.Column({ header: new sap.m.Label({text: "Gr"}),width:"20%"}),
	              new sap.m.Column({ header: new sap.m.Label({text: ""}),width:"10%"}),
	              new sap.m.Column({ header: new sap.m.Label({text: "Edit"}),width:"20%"})
	            ],
	            items: {
	              path: "/data",
	              template: new sap.m.ColumnListItem({
	                cells: [
	                  new sap.m.Label({ text: "{item}" }),
	                  new sap.m.Label({ text: "{peso}"}),
	                  new sap.m.Label({ text: "{nota}"}), //appConfig.setDecripcionNota("{peso}")
	                  new sap.m.Button({icon :"sap-icon://edit",text:"Editar",width:"40px",press: function(e){
                       	
                     	  var model = this.getModel();
	                      var path = e.getSource().getBindingContext().getPath();
	                      var obj = model.getProperty(path);
                          //console.log(obj);
                         appConfig.selectPeso(obj)
                         appConfig.cambiaPagina('pesoPolvo','back');
                           }
                         }) 
	                ]
	              })
	            },
	          });
	}else{
		var oTable = sap.ui.getCore().byId("tblDataPesos");
	}
	oTable.setModel(oModel);
	
	
	var itemTable = oTable.getItems()
	$.each( itemTable, function( key, value ) {
		$.each( data, function( keyd, valued ) {
			if(key===keyd){
				$.each( value.getCells(), function( keyc, valuec ) {
					if(keyc==2){
						//valuec.addStyleClass(valuec.getText());
						//valuec.setText(appConfig.setDecripcionNota(valuec.getText()));
						value.removeStyleClass("rojot");
						value.removeStyleClass("amarillot");
						value.removeStyleClass("verdet");
						value.removeStyleClass("verdebajot");
						value.removeStyleClass("azult");
						value.addStyleClass(valued.color+"t");
						//console.log(valued)
						return false;
					}
				})
				//value.addStyleClass(valued.color);
			}
		});
	});
	// model =oTable.getModel();
	// model.refresh();

}
appConfig.setDecripcionNota=function(color){switch(color){case"amarillo":return"Regular";break;case"azul":return"Excelente";break;case"verde":return"Bueno";break;case"verdebajo":return"Aceptado";break;case"rojo":return "Malo";break;}return "";}
appConfig.selectPeso=function(fila,estado){
	var dataPeso=appConfig.userData.pesoConfig;
	var firstItem=true;
	if(sap.ui.getCore().byId("labCantFrutos")!=undefined && fila.frutos!=undefined){sap.ui.getCore().byId("labCantFrutos").setText(fila.frutos)}
	//console.log(fila)
	$.each( dataPeso, function( key, value ) {
		if(value.tipoReporte==appConfig.tipoReporte){
			  var control = sap.ui.getCore().byId(value.idObjeto);
			  var label =  sap.ui.getCore().byId(value.idObjeto+"Label");
			  if(estado==='first'){
				  if(firstItem){
					  control.setVisible(true);
					  label.setVisible(true);
					  appConfig.pesoBaseDefectoVisible=control.getValue();
					  firstItem=false;
					  return;
				  }else{
					  control.setVisible(false);
					  label.setVisible(false);
					  return;
				  }
				}
			  if(fila.id===value.idObjeto){
				  control.setVisible(true);
				  label.setVisible(true);
				  appConfig.pesoBaseDefectoVisible=control.getValue();
			  }else{
				  control.setVisible(false);
				  label.setVisible(false);
			  }
		}
	})
}


function convertImgToBase64(url, callback, outputFormat){
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function(){
	    var canvas = document.createElement('CANVAS');
	    var ctx = canvas.getContext('2d');
		canvas.height = this.height;
		canvas.width = this.width;
	  	ctx.drawImage(this,0,0);
	  	var dataURL = canvas.toDataURL(outputFormat || 'image/png');
	  	callback(dataURL);
	  	canvas = null; 
	};
	img.src = url;
}


appConfig.cambiaControlClamshell=function(pesoNeto){


	/************************************cambio para calidad por clamshell***************************************************/
	if(appConfig.tipoReporte!=96){
    	appConfig.evalClamshell.sumaClamshells=appConfig.evalClamshell.sumaClamshells*1+pesoNeto*1
    	//appConfig.evalClamshell.clamshellActual=index;
    	appConfig.PesoClamshellTotal=pesoNeto*1;
    	appConfig.cambiaPagina("pesoPolvo");
    	return;
	}
	
	appConfig.PesoClamshellTotal=0;
	var dataPeso=appConfig.userData.pesoConfig;
	var cambioControl=false;
	
	var cantDataOb=0;
	var contData=0;
	var lastKey=appConfig.cantClamshell-1;
	
	//$.each( dataPeso, function( key, value ) {
	for(var i=0;i<appConfig.cantClamshell;i++){	
			  var control = sap.ui.getCore().byId("inpPesoClamshell"+i);
			  var label =  sap.ui.getCore().byId("laPesoClamshell"+i);
			  var visible = control.getVisible();
			  
			  var peso = parseFloat((control.getValue()).replace("kg","").replace("gr",""));
			  if(isNaN(peso))peso=0;
			  
			  //if(!isNaN(peso))
				  appConfig.PesoClamshellTotal=parseFloat(peso)*1+parseFloat(appConfig.PesoClamshellTotal)*1;
				  if(cambioControl==true){
					  control.setVisible(true);
					  label.setVisible(true);
					  cambioControl=false;
				  }else if(visible==true){
					  cambioControl=true;
					  //appConfig.setClamshellP(i);
					  control.setVisible(false);
					  label.setVisible(false);
					  if(lastKey===i){
						  //alert(appConfig.PesoClamshellTotal)
						  appConfig.cambiaPagina("pesoMuestra20");
						  //appConfig.cambiaPagina("pesoPolvo");
					  }
				  }
		//});
	}
}

appConfig.selectPesoClamshell=function(index){
	if(index>=appConfig.cantClamshell){
		appConfig.evalClamshell.clamshellActual--;
		index--;
	}
	for(var i=0;i<appConfig.cantClamshell;i++){	
		  var control = sap.ui.getCore().byId("inpPesoClamshell"+i);
		  var label =  sap.ui.getCore().byId("laPesoClamshell"+i);
		  control.setVisible(false);
		  label.setVisible(false);
	}
	var control = sap.ui.getCore().byId("inpPesoClamshell"+index);
	var label =  sap.ui.getCore().byId("laPesoClamshell"+index);
	control.setVisible(true);
	label.setVisible(true);


}
/*appConfig.PesoClamshellTotal=100;*/
appConfig.setClamshellP=function(index){
	//alert(index)
	var control = sap.ui.getCore().byId("inpPesoClamshell"+index);
	var label =  sap.ui.getCore().byId("laPesoClamshell"+index);
	//var control2 = sap.ui.getCore().byId("inpPesoClamshellP"+index);
	var label2 =  sap.ui.getCore().byId("laPesoClamshellP");
	
	var peso = parseFloat(control.getValue().replace("kg","").replace("gr",""));
	if(isNaN(peso))peso=0;
	var pesoNeto = peso*1
	if(pesoNeto<appConfig.pesoBaseClamshell){
		label2.setText("Peso Minimo: "+appConfig.pesoBaseClamshell+"gr, Peso Neto:"+pesoNeto+"gr, Reprobado");
		if(!appRechazo.estado)appRechazo.clamshellBajoPeso(index+1,pesoNeto);
		else{
			label2.setText("Peso Minimo: "+appConfig.pesoBaseClamshell+"gr, Peso Neto:"+pesoNeto+"gr, Reprobado");
			appConfig.cambiaControlClamshell(pesoNeto);
		}
		 
	}else{
		label2.setText("Peso Minimo: "+appConfig.pesoBaseClamshell+"gr, Peso Neto:"+pesoNeto+"gr, Aprobado");
		appConfig.cambiaControlClamshell(pesoNeto);
	}
}
//tolerancias por material

appConfig.setToleranciaAtributo = function(sjson,tipoTolerancia){
	var tolerancia;
	$.each( sjson,function(key,item){
		if(tipoTolerancia===key){
			//tolerancia=JSON.stringify(item);
			tolerancia=item;
			//console.log(key)
			return;
		}
		
		//console.log(item)
	})
	//console.log(tolerancia)
	return tolerancia;
	//return jQuery.parseJSON(JSON.stringify(eval("(" + tolerancia + ")")));
}

appConfig.getVerde=function(toleranciaCampo,porcentaje){
	var limiteVerde=appConfig.setToleranciaAtributo(jQuery.parseJSON(JSON.stringify(eval("(" + toleranciaCampo + ")"))),"verdebajo");
	if(limiteVerde==undefined||porcentaje*1<=limiteVerde*1)return true;
	else return false;
}

appConfig.setNotaDefecto=function(value,item1){
	 item1.setValue(item1.getValue());
		
	//************notabajopeso*********************************************************//
	  if(appConfig.cantClamshellBajoPeso>1 && appConfig.nota.Qc<3){
		  columnaqc=sap.ui.getCore().byId("tblPesoNotaC4");
		  columnaqc.setStyleClass("amarillo");
		  appConfig.nota.Qc=3;
		  appConfig.nota.colorNotaQC="amarillo"
	  }
	  //******************fin nota bajo peso************************************************//
	  var toleranciaCampo = appConfig.setToleranciaAtributo(jQuery.parseJSON(JSON.stringify(eval("(" + value.tolerancia + ")"))),appConfig.nota.tipoToleranca);
	  var toleranciaReporte = appConfig.setToleranciaAtributo(jQuery.parseJSON(JSON.stringify(eval("(" + appConfig.toleranciaReporte + ")"))),appConfig.userData.especie);

	  var toleranciaCondicion = appConfig.setToleranciaAtributo(jQuery.parseJSON(JSON.stringify(eval("(" + appConfig.toleranciaCondicion + ")"))),appConfig.nota.tipoToleranca);
	  var toleranciaCalidad = appConfig.setToleranciaAtributo(jQuery.parseJSON(JSON.stringify(eval("(" + appConfig.toleranciaCalidad + ")"))),appConfig.nota.tipoToleranca);
	  var peso= parseFloat(item1.getValue()).toFixed(2)*1;

	  if(isNaN(peso))peso=0;
	  var lastkey;
	  var lastkeyr;
	  var lastkeycon;
	  var lastkeycal;
	  $.each( toleranciaCampo, function( keyt, valuet ) {lastkey=keyt;})
	  $.each( toleranciaReporte, function( keyt, valuet ) {lastkeyr=keyt;})
	  $.each( toleranciaCondicion, function( keyt, valuet ) {lastkeycon=keyt;})
	  $.each( toleranciaCalidad, function( keyt, valuet ) {lastkeycal=keyt;});
	  var tabla = sap.ui.getCore().byId("tblPesoNota");
	  var footer ="";
	  
	  var nota=1;
	  //TOLERANCIA INDIVIDUAL
	  var inpSD = sap.ui.getCore().byId("inpSD");
	  var porcantajeActual = parseFloat((inpSD.getValue()).replace("%","")).toFixed(2)*1;
	  var porcentaje = (peso*100/parseFloat(appConfig.PesoClamshellTotal)).toFixed(2)*1;
	  if(!isFinite(porcentaje)){
		  porcentaje=100;
		  
	  }
	  $.each( toleranciaCampo, function( keyt, valuet ) {
		  //console.log(key);
		  if(porcentaje<=valuet || lastkey===keyt){
			 
			  //console.log(porcentaje);
			  var nuevoporcentaje = parseFloat(parseFloat(porcantajeActual).toFixed(2)*1 - parseFloat(porcentaje).toFixed(2)*1).toFixed(2);
			  if(nuevoporcentaje<0)nuevoporcentaje=0;
			  inpSD.setValue(nuevoporcentaje+"%");
			  //var keyname =  Object.keys(toleranciaCampo)[key];
			  footer +="Individual =>limite: "+valuet+", pesoActual: "+peso+", nota: "+keyt+"\n";
			  value.nota=nota;
			  value.colorNota=keyt;
			  //if(nota>appConfig.nota.defectoIndividual){
				  if(keyt==="verde" && (appConfig.tipoReporte==1 || appConfig.tipoReporte==28 )){//**********buscar verdebajo ***************************************************************
					  if(!appConfig.getVerde(value.tolerancia,porcentaje)){
						  nota=nota+0.5*1;
						  keyt="verdebajo";
						  value.nota=nota;
						  value.colorNota=keyt;
					  }
				  }
				  
				  appConfig.nota.defectoIndividual=nota;
				  if(appConfig.nota.Qc<appConfig.nota.defectoIndividual){
					  columnaqc=sap.ui.getCore().byId("tblPesoNotaC4");
					  columnaqc.setStyleClass(keyt);
					  appConfig.nota.Qc=appConfig.nota.defectoIndividual;
					  appConfig.nota.colorNotaQC=keyt
				  }
				  //condicion
				  if(appConfig.nota.defectoCondicion<nota && value.tipoDefecto==2){
					  columnaqc=sap.ui.getCore().byId("tblPesoNotaC3");
					  columnaqc.setStyleClass(keyt);
					  appConfig.nota.colorDefectoCondicion=keyt;
					  appConfig.nota.defectoCondicion=nota;
				  }
				//calidad
				  if(appConfig.nota.defectoCalidad<nota && value.tipoDefecto==1){
					  columnaqc=sap.ui.getCore().byId("tblPesoNotaC2");
					  columnaqc.setStyleClass(keyt);
					  appConfig.nota.colorDefectoCalidad=keyt;
					  appConfig.nota.defectoCalidad=nota;
				  }
			  //}
			  //$('.sapMListFtr').addClass(keyt);
			  return false;
		  }
		  nota++;
	  });
	  //console.log(toleranciaCampo);
	  //tolerancia condicion
	  nota=1;
	  if(value.tipoDefecto==2){
		  var inpDCN = sap.ui.getCore().byId("inpDCN");
		  var pesodcn = parseFloat((inpDCN.getValue()).replace("%","").replace("gr","")).toFixed(2)*1;
		  if(isNaN(pesodcn))pesodcn=0;
		  var nuevoDcd = parseFloat(porcentaje*1+pesodcn*1).toFixed(2);
		  inpDCN.setValue(nuevoDcd+"%");
		  $.each( toleranciaCondicion, function( keyt, valuet ) {

				  if(nuevoDcd<=valuet || keyt===lastkeycon){
					  if(keyt==="verde" && (appConfig.tipoReporte==1 || appConfig.tipoReporte==28 )){//**********buscar verdebajo ***************************************************************
						  if(!appConfig.getVerde(appConfig.userData.verdebajoCondicion,nuevoDcd)){
							  nota=nota+0.5*1;
							  keyt="verdebajo";
						  }
					  }
					  //console.log(nuevoDcd+"  "+valuet+" "+keyt);
					  columna=sap.ui.getCore().byId("tblPesoNotaC3");
					  if(nota>appConfig.nota.defectoCondicion){
						  columna.setStyleClass(keyt);
						  appConfig.nota.colorDefectoCondicion=keyt;
						  appConfig.nota.defectoCondicion=nota;
					   }
					  if(appConfig.nota.defectoCondicion>appConfig.nota.Qc){
						  columnaqc=sap.ui.getCore().byId("tblPesoNotaC4");
						  columnaqc.setStyleClass(keyt);
						  appConfig.nota.Qc=appConfig.nota.defectoCondicion;
						  appConfig.nota.colorNotaQC=keyt
					  	}
					  footer +="Condicion =>limite: "+valuet+", pesoActual: "+peso+", nota: "+keyt+"\n";
					  return false;
					}
			  nota++;
		  });
	  }
	  //tolerancia calidad
	  nota=1
	  if(value.tipoDefecto==1){
		  var inpDCD = sap.ui.getCore().byId("inpDCD");
		  var pesodf = parseFloat((inpDCD.getValue()).replace("%","")).toFixed(2)*1;
		  if(isNaN(pesodf))pesodf=0;
		  var nuevoDcd =parseFloat(porcentaje*1+pesodf*1).toFixed(2);
		  inpDCD.setValue(nuevoDcd+"%");
		  $.each( toleranciaCalidad, function( keyt, valuet ) {
			  
				  if(nuevoDcd<=valuet || keyt===lastkeycal){
					  if(keyt==="verde" && (appConfig.tipoReporte==1 || appConfig.tipoReporte==28)){//**********buscar verdebajo ***************************************************************
						  if(!appConfig.getVerde(appConfig.userData.verdebajoCalidad,nuevoDcd)){
							  nota=nota+0.5*1;
							  keyt="verdebajo";
						  }
					  }
					  columna=sap.ui.getCore().byId("tblPesoNotaC2");
					  if(nota>appConfig.nota.defectoCalidad){
						  columna.setStyleClass(keyt);
						  appConfig.nota.defectoCalidad=nota;
						  appConfig.nota.colorDefectoCalidad=keyt;
						  //console.log(appConfig.nota);
					  }
					  if(appConfig.nota.defectoCalidad>appConfig.nota.Qc){
						  columnaqc=sap.ui.getCore().byId("tblPesoNotaC4");
						  columnaqc.setStyleClass(keyt);
						  appConfig.nota.Qc=appConfig.nota.defectoCalidad;
						  appConfig.nota.colorNotaQC=keyt
					  }
					  footer +="Calidad =>limite: "+valuet+", pesoActual: "+peso+", nota: "+keyt+"\n";
					  return false;
				  }
				  
			  
			  nota++;
		  });
	  }
	  //tolerancia reporte
	  nota=1;
	  appConfig.pesoAtributosTotal=parseFloat(appConfig.pesoAtributosTotal*1+porcentaje*1).toFixed(2);
	  $.each( toleranciaReporte, function( keyt, valuet ) {
		  if(appConfig.pesoAtributosTotal<=valuet || keyt==lastkeyr){
			  //console.log(toleranciaReporte);
			  if(keyt==="verde" && (appConfig.tipoReporte==1 || appConfig.tipoReporte==28 )){//**********buscar verdebajo ***************************************************************
				  if(!appConfig.getVerde(appConfig.toleranciaReporte,appConfig.pesoAtributosTotal)){
					  nota=nota+0.5*1;
					  keyt="verdebajo";
				  }
			  }
			  //console.log(nota+" "+appConfig.nota.Qc)
			  if(nota>appConfig.nota.Qc){
				  columnaqc=sap.ui.getCore().byId("tblPesoNotaC4");
				  columnaqc.setStyleClass(keyt);
				  appConfig.nota.Qc=nota;
				  appConfig.nota.colorNotaQC=keyt
				  footer +="QC =>limite: "+valuet+", pesoActual: "+peso+", nota: "+keyt+"\n";
				  //return false;
			  }
			  
			  return false;
		  }
	  nota++;
	  });
	  //console.log(appConfig.nota)
	  //console.log(appConfig.nota.QCAtributo)
	//tolerancia calidad
	  if(value.tipoDefecto==1){
		  var columna=sap.ui.getCore().byId("tblPesoNotaC2");
		  if(appConfig.nota.CalidadAtributo>appConfig.nota.defectoCalidad){
			  columna.setStyleClass(appConfig.nota.CalidadAtributoColor);
			  appConfig.nota.defectoCalidad=appConfig.nota.CalidadAtributo;
			  appConfig.nota.colorDefectoCalidad=appConfig.nota.CalidadAtributoColor;
			  //console.log(appConfig.nota);
		  }
	  }
	  
	  //tolerancia condicion
	  if(value.tipoDefecto==2){
		  var columna=sap.ui.getCore().byId("tblPesoNotaC3");
		  if(appConfig.nota.CondicionAtributo>appConfig.nota.defectoCondicion){
			  columna.setStyleClass(appConfig.nota.CondicionAtributoColor);
			  appConfig.nota.colorDefectoCondicion=appConfig.nota.CondicionAtributoColor;
			  appConfig.nota.defectoCondicion=appConfig.nota.CondicionAtributo;
		   }
	  }
	  if(appConfig.nota.QCAtributo>appConfig.nota.Qc){
	      columnaqc=sap.ui.getCore().byId("tblPesoNotaC4");
		  columnaqc.setStyleClass(appConfig.nota.QCAtributoColor);
		  appConfig.nota.Qc=appConfig.nota.QCAtributo;
		  appConfig.nota.colorNotaQC=appConfig.nota.QCAtributoColor
		 // footer +="QC =>limite: "+valuet+", pesoActual: "+peso+", nota: "+keyt+"\n";
	  }
	//qc package
	  if(appConfig.nota.QcPackage>appConfig.nota.Qc){
	      columnaqc=sap.ui.getCore().byId("tblPesoNotaC4");
		  columnaqc.setStyleClass(appConfig.nota.QcPackageColor);
		  appConfig.nota.Qc=appConfig.nota.QcPackage;
		  appConfig.nota.colorNotaQC=appConfig.nota.QcPackageColor;
		 // footer +="QC =>limite: "+valuet+", pesoActual: "+peso+", nota: "+keyt+"\n";
	  }
	  var inpQC = sap.ui.getCore().byId("inpQC")
	  inpQC.setValue(appConfig.pesoAtributosTotal+"%");
	  
	  //tabla.setFooterText(footer);
	  //alert(footer);
	  
	  value.notaFactor=appConfig.setFactorDefecto(value,item1);
	  //console.log(appConfig.nota.defectoCondicion);
	  
}

appConfig.sortResults=function(json,prop, asc) {
        json = json.sort(function(a, b) {
        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
    return json;
}

appConfig.setBusy=function(pagina,setBusy){
	var pageReporte = sap.ui.getCore().byId(pagina);
	pageReporte.setBusy(setBusy);
	setTimeout(function(){pageReporte.setBusy(false);},180000)
}


appConfig.setFactorDefecto=function(value,item1){
	//if(value.mensaje!=="Restos Florales"){return;}
	var peso= parseFloat(item1.getValue()).toFixed(2)*1;
	if(isNaN(peso))peso=0;
	var toleranciaCampo = appConfig.setToleranciaAtributo(jQuery.parseJSON(JSON.stringify(eval("(" + value.tolerancia + ")"))),appConfig.nota.tipoToleranca);
	var porcentaje = (peso*100/parseFloat(appConfig.PesoClamshellTotal)).toFixed(2)*1;
	if(!isFinite(porcentaje))porcentaje=100;
	var pmin=-1;
	var pmax=0;
	var factorA;
	var factorB;

	if(porcentaje==0){
		 return  100;
	 }
	
	 $.each( toleranciaCampo, function( keyt, valuet ) {
		 //console.log(valuet);
		 //console.log(keyt);
		 if(pmin>=0 && valuet>0 && porcentaje<valuet){

			 pmax=valuet;
			 var factorAB=appConfig.getFactorAB(keyt);
			 factorA=factorAB.factorA;
			 factorB=factorAB.factorB;
			 return false;
		 }
		 if(porcentaje>=valuet){
			 pmin=valuet+0.01;
		 }else if(keyt=='azul' && porcentaje<valuet){
			 pmin=0.00;
			 pmax=valuet;
			 var factorAB=appConfig.getFactorAB(keyt);
			 factorA=factorAB.factorA;
			 factorB=factorAB.factorB;
			 return false;
		 }
		 
	 });
	 if(factorB == undefined && factorA== undefined)return 0;

	 var factorF=(factorB-factorA)/(pmax-pmin);
	 
	 var puntaje = (factorF*pmax+factorA)-(factorF*porcentaje);
	 
	 //console.log(factorA,factorB,pmax,pmin,porcentaje,peso);
	 //console.log(value.mensaje,puntaje);
	 return puntaje.toFixed(2);
	 
	
}
appConfig.getFactorAB=function(color){
	switch(color){
		case 'azul':return {factorA:80.01,factorB:100};break;
		case 'verde':return {factorA:60.01,factorB:80};break;
		case 'amarillo':return {factorA:40.01,factorB:60};break;
		case 'naranjo':return {factorA:20.01,factorB:40};break;
		case 'rojo':return {factorA:0,factorB:20};break;
	}
}
window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    appConfig.log('{"Error":"' + errorMsg + '","Script:"' + url + '","Line:"' + lineNumber  + '","Column:' + column + '","StackTrace:"' +  errorObj+'"}');
}
