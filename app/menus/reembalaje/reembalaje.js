appExpled.lazyController('reembalajeEntrada', function($scope, $routeParams, $rootScope,$http) {
    $scope.listaEspecies = [];
    $scope.dataSeleccion={
        especie:'',
        productor:{
            VALUE_CHAR:"",
            DESCRIPTION:""
        }
    };
    $scope.detalleLote=[];
    $scope.verPopRespuesta="none";
    $scope.arraProd=[];
    angular.forEach($rootScope.ZMOV_QUERY_ESPECIE, function(value, key) {
        $scope.listaEspecies.push({
        DESCRIPTION: value.ATNAM,
        VALUE_CHAR: value.ATNAM,
        ATBEZ: value.ATBEZ
        });
    });
    $scope.listaMotivo=[];
    $scope.listaResponsable=[];
    $scope.listaCuenta=[];
    angular.forEach($rootScope.CAR_DDC,function(val,key){
        if(val.ATNAM==="ZMOTIVOREEM"){
            $scope.listaMotivo.push(val);
        }
        else if(val.ATNAM==="ZAUTORIZAREEM"){
            $scope.listaResponsable.push(val);
        }
        else if(val.ATNAM==="ZACUENTAREEM"){
            $scope.listaCuenta.push(val);
        }
    })
    //JSON_ZMOV_QUERY_HU_INFO.aspx?IR_EXIDV=30867676767676700
    $scope.codearPallet=function(){
        if(APPMOVIL){
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    $scope.codPallet = result.text;
                    $rootScope.$apply();
                    $scope.validaPallet();
                },
                function (error) {
                    $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
                }
            );
        }else{
            if($scope.detalleLote==undefined){
                $scope.arrayProd=[];
            }else if($scope.detalleLote.length==0){
                $scope.arrayProd=[];
            }
            $scope.validaPallet();
        }
    }
    $scope.detalleLote =[];
    $scope.arrP=[];
    $scope.validaPallet=function(){
        if($scope.dataSeleccion.especie==''){
            $rootScope.alert.show({message:"Debe ingresar la especie"});
            return 0;
        }
        $scope.especie=$scope.dataSeleccion.especie.VALUE_CHAR;
        if($scope.detalleLote.length>0){
            var validaLote=false;
            angular.forEach($scope.detalleLote,function(val,key){
                if(parseInt($scope.codPallet)==parseInt(val.EXIDV)){
                    validaLote=true;
                }
            })
            if(validaLote){
                $rootScope.alert.show({message:"El pallet ya fue ingresado"});
                $scope.codPallet="";
                return 0;
            }
        }
        $rootScope.loading.show();
        $http({
            method: 'POST',
            url: IPSERVER + 'JSON_ZMOV_QUERY_HU_INFO.aspx?IR_EXIDV=' + angular.uppercase($scope.codPallet),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout: 500000
        }).success(function(datos) {
            console.log(datos);
            if(datos.LT_HU_CABECERA.length==0){
                $rootScope.alert.show({message:"El pallet ingresado no existe en SAP"});
				$rootScope.loading.hide();
                $scope.codPallet="";
                return 0;
            }
            if(datos.LT_HU_POSICION.length==0){
                $rootScope.alert.show({message:"El pallet ingresado no tiene lotes asociados"});
                $scope.codPallet="";
				$rootScope.loading.hide();
                return 0;
            }
            if(datos.LT_HU_POSICION[0].WERKS!=$rootScope.userData.centro){
                $rootScope.alert.show({message:"El pallet ingresado no corresponde a su centro"});
                $scope.codPallet="";
				$rootScope.loading.hide();
                return 0;
            }
            $scope.dataLoteProceso=datos.LT_HU_POSICION[0];
            if(datos.LT_HU_CABECERA[0].STATUS!="0020"){
                $rootScope.alert.show({message:"El pallet ingresado no habilitado para repaletizar"});
                $scope.codPallet="";
				$rootScope.loading.hide();
                return 0;
            }
            if(datos.LT_HU_CABECERA[0].LGORT!="PA04" && datos.LT_HU_CABECERA[0].LGORT!="FR01"){
                $rootScope.alert.show({message:"El pallet no pertenece al almacen PA04 o al FR01"});
                $scope.codPallet="";
				$rootScope.loading.hide();
                return 0;
            }
            var validaEspecie = false;
            angular.forEach($rootScope.ZMOV_QUERY_MATERIAL,function(val,key){
                if(val.MATNR==datos.LT_HU_CABECERA[0].MATNR){
                    if(val.ZMAT_ESPECIE!=$scope.especie){
                        validaEspecie = true;
                    }
                }
            })
            if(validaEspecie){
                $rootScope.alert.show({message:"La especie no corresponde al pallet ingresado"});
                $scope.codPallet="";
				$rootScope.loading.hide();
                return 0;
            }
            /*if($scope.detalleLote.length>0){
                if($scope.detalleLote[0][0].PRODUCTOR!=datos.LT_HU_POSICION[0].PRODUCTOR){
                    $rootScope.alert.show({message:"El productor ingresado no corresponde"});
                    $rootScope.loading.hide();
                    return 0;
                }
            }*/
            if($scope.arrP.length==0){
                $scope.listaProductor=[];
                $scope.arrP=[];
            }
            $scope.num=0;
            $scope.cargatTipoFrio(datos);
        }).error($rootScope.httpRequest.error);
    }
    $scope.cargatTipoFrio=function(datos){
        $http({
            method: 'POST',
            url: IPSERVER + 'JSON_ZMOV_QUERY_STOCK_LOTE.aspx?LOTE=' + angular.uppercase(datos.LT_HU_POSICION[$scope.num].CHARG),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout: 500000
        }).success(function(datos2) {
            angular.forEach(datos.LT_HU_POSICION,function(val2,key2){
                if($scope.arrP.indexOf(val2.PRODUCTOR)==-1){
                    $scope.arrP.push(val2.PRODUCTOR);
                    $scope.listaProductor.push({DESCRIPTION:val2.PRODUCTOR,VALUE_CHAR:val2.PRODUCTOR})
                }
                val2.totalCajas=function(item,id){
                    if(item.reembalaCaja=="X"){
                        item.readonly=true;
                        item.cantidadRembala =item.VEMNG;
                    }else{
                        item.readonly=false;
                    }
                    item.PESOSIS=item.NTGEW*item.cantidadRembala;
                    item.pesoR=item.NTGEW*item.cantidadRembala;
                    console.log(item);
                }
                val2.validaCantidad=function(item){
                    if(item.cantidadRembala>item.VEMNG){
                        item.cantidadRembala=0;
                        $rootScope.alert.show({message:"No puede superar la cantidad de "+item.VEMNG+" cajas"});
                        return;
                    }
                    item.PESOSIS=item.NTGEW*item.cantidadRembala;
                    item.pesoR=item.NTGEW*item.cantidadRembala;
                }
                val2.EliminarLote=function(id){
                    $scope.detalleLote.splice(id,1);
                    angular.forEach($scope.detalleLote,function(val2,key2){
                        angular.forEach(val2,function(val,key){
                            val.id=key;
                        })
                    })
                }
                $scope.dataLoteProceso=[];
                $scope.arrayProd=[];
                val2.validaLoteProceso=function(item,id){
                    console.log(2)
                    if(item.loteProceso==""){
                        return 0;
                    }
					angular.forEach($scope.detalleLote,function(val,key2){
						val.loteProceso=angular.uppercase(val.loteProceso);
						if(val.PRODUCTOR==$scope.dataSeleccion.productor.VALUE_CHAR){
							val.loteProceso=item.loteProceso
						}
					})
                    if($scope.detalleLote.length>0){
                        var validaLote=false;
                        var validaProcesoProd=false;
                        angular.forEach($scope.detalleLote,function(val2,key2){
                            angular.forEach(val2,function(val,key){
                                val.loteProceso=angular.uppercase(item.loteProceso);
                                if(val.PRODUCTOR==$scope.dataSeleccion.productor.VALUE_CHAR){
                                    if(item.loteProceso!=val.loteProceso && val.loteProceso!="" && val.loteProceso!=undefined){
                                        validaLote=true;
                                    }
                                    if($scope.arrayProd[val.loteProceso]==undefined){
                                        if($scope.arrayProd[val.loteProceso]!=val.PRODUCTOR){
                                            $scope.arrayProd[val.loteProceso]=item.PRODUCTOR;
                                        }
                                    }else{
                                        if($scope.arrayProd[val.loteProceso]!=val.PRODUCTOR && val.loteProceso!="" && val.loteProceso!=undefined){
                                            validaProcesoProd=true;
                                        }
                                    }
                                }
                            })
                        })
                        if(validaLote){
                            $rootScope.alert.show({message:"Solo puede haber 1 lote de proceso"});
                            $rootScope.loading.hide();
                            val2.loteProceso="";
                            return;
                        }
                        if(validaProcesoProd){
                            $rootScope.alert.show({message:"El lote de proceso ya fue asignado a otro productor"});
                            $rootScope.loading.hide();
                            val2.loteProceso="";
                            return;
                        }
                    }else{
                        $scope.arrayProd[$scope.detalleLote[id].loteProceso]=$scope.detalleLote[id].PRODUCTOR;
                    }
                    //JSON_ZMOV_QUERY_STOCK_PROCESO.aspx?LOTEPROCESO=item.loteProceso
                    $http({
                        method: 'POST',
                        url: IPSERVER + 'JSON_ZMOV_QUERY_STOCK_PROCESO.aspx?LOTEPROCESO=' + angular.uppercase(item.loteProceso),
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        timeout: 500000
                    }).success(function(datos) {
                        if(datos.STOCKPROCESO.length==0){
                            if($scope.arraProd.length==0){
                                if($scope.arraProd[item.loteProceso]==undefined){
                                    $scope.arraProd[item.loteProceso]=item.PRODUCTOR
                                }
                            }
                        }else{
                            var validaLotePro=true;
							angular.forEach(datos.STOCKPROCESO,function(val,key){
								if(val.LIFNR ==$scope.dataSeleccion.productor.VALUE_CHAR){
									validaLotePro=false;
								}
							})
                            if(validaLotePro){
                                $rootScope.alert.show({message:"El productor no corresponde a el lote de proceso"});
                                $rootScope.loading.hide();
								item.loteProceso="";
                                return 0;
                            }
                        }
                    }).error($rootScope.httpRequest.error);
                }
                angular.forEach($rootScope.ZMOV_QUERY_MATERIAL,function(val,key){
                    if(val2.MATNR==val.MATNR && val.MTART=="FERT"){
                        val2.PESOSIS= 0;
                        val2.pesoR= 0;
                        val2.NTGEW =val.NTGEW;
                    }
                })
            })
            console.log(datos.LT_HU_POSICION)
            datos.LT_HU_POSICION[$scope.num].TDFRIO = datos2.STOCKLOTES[0].TIPO_FRIO;
            datos.LT_HU_POSICION[$scope.num].TIPIFICACION = datos2.STOCKLOTES[0].TIPIFICACION;
            datos.LT_HU_POSICION[$scope.num].VARIEDAD = datos2.STOCKLOTES[0].VARIEDAD;
            $scope.detalleLote.push(datos.LT_HU_POSICION[$scope.num]);
            $scope.num++;
            if($scope.num==datos.LT_HU_POSICION.length){
                console.log($scope.detalleLote);
                $rootScope.loading.hide();
            }else{
                $scope.cargatTipoFrio(datos);
            }
            console.log($scope.detalleLote)
            $scope.codPallet="";
        }).error($rootScope.httpRequest.error);
    }
    $scope.asignacionContinuar=function(){
        if($scope.dataSeleccion.motivo==undefined){
            $rootScope.alert.show({message:"Debe ingresar el motivo"});
            return 0;
        }else if($scope.dataSeleccion.cuenta==undefined){
            $rootScope.alert.show({message:"Debe ingresar a cuenta de"});
            return 0;
        }else if($scope.dataSeleccion.responzable==undefined){
            $rootScope.alert.show({message:"Debe ingresar el responsable"});
            return 0;
        }
        if($scope.detalleLote.length==0){
            $rootScope.alert.show({message:"Debe ingresar almenos un productor"});
            $scope.detalleLote=$scope.detalleLote2;
            return 0;
        }
        if($scope.detalleLote.length==0){
            $rootScope.alert.show({message:"Debe ingresar almenos 1 pallet"});
            $scope.detalleLote=$scope.detalleLote2;
            return 0;
        }
        var contador=0;
        angular.forEach($scope.detalleLote,function(val,key2){
            if(val.PRODUCTOR==$scope.dataSeleccion.productor.VALUE_CHAR){
                if(val.cantidadRembala=="" || val.cantidadRembala==undefined || val.loteProceso=="" || val.loteProceso==undefined){
                    contador++;
                }
            }
        })
        if(contador>0){
            $rootScope.alert.show({message:"Debe ingresar todas las cantidades y el lote de proceso"});
            return 0;
        }
        $rootScope.loading.show();
        $scope.arrHU = [];
        $scope.arrPallet=[];
        var hu = [];
        angular.forEach($scope.detalleLote,function(val,key2){
            if(val.PRODUCTOR==$scope.dataSeleccion.productor.VALUE_CHAR){
                var jsonMateriales={}
                if($scope.arrPallet.indexOf(val.EXIDV)==-1){
                    $scope.arrPallet.push(val.EXIDV);
                }
                if ($scope.arrHU[val.EXIDV] == undefined) {
                    $scope.arrHU[val.EXIDV] = {};
                    $scope.arrHU[val.EXIDV].items = [];
                }
                if (hu.indexOf(val.EXIDV) == -1) {
                    hu.push(val.EXIDV);
                }
                $scope.arrHU[val.EXIDV].items.push({
                    LOTE: val.CHARG,
                    MATERIAL: val.MATNR,
                    CENTRO: $rootScope.userData.centro,
                    ALMACEN: val.LGORT,
                    CANTIDAD: val.cantidadRembala,
                    HU_ITEM_NUMBER: val.VEPOS
                })
            }
        })
        $scope.contadorHU=0;
        $scope.arrayAlmacenLote=[];
        //$scope.pruebaResta($scope.arrHU[$scope.arrPallet[0]].items, $scope.arrPallet[0], $scope.arrPallet.length);
        $scope.restaPTHU($scope.arrHU[$scope.arrPallet[0]].items, $scope.arrPallet[0], $scope.arrPallet.length);
    }
	$scope.pruebaResta=function(arr, hu, num){
		if(($scope.contadorHU+1)==$scope.arrPallet.length){
			console.log(2)
		}else{
			$scope.contadorHU++;
			$scope.pruebaResta($scope.arrHU[$scope.arrPallet[$scope.contadorHU]].items,  hu, num);
			console.log($scope.arrHU[$scope.arrPallet[$scope.contadorHU]].items)
		}
	}
    $scope.asignacionContinuar2=function(){
        if($scope.dataSeleccion.motivo==undefined){
            $rootScope.alert.show({message:"Debe ingresar el motivo"});
            return 0;
        }else if($scope.dataSeleccion.cuenta==undefined){
            $rootScope.alert.show({message:"Debe ingresar a cuenta de"});
            return 0;
        }else if($scope.dataSeleccion.responzable==undefined){
            $rootScope.alert.show({message:"Debe ingresar el responsable"});
            return 0;
        }
        if($scope.detalleLote.length==0){
            $rootScope.alert.show({message:"Debe ingresar almenos un productor"});
            $scope.detalleLote=$scope.detalleLote2;
            return 0;
        }
        if($scope.detalleLote.length==0){
            $rootScope.alert.show({message:"Debe ingresar almenos 1 pallet"});
            $scope.detalleLote=$scope.detalleLote2;
            return 0;
        }
        var contador=0;
        angular.forEach($scope.detalleLote,function(val,key2){
            if(val.PRODUCTOR==$scope.dataSeleccion.productor.VALUE_CHAR){
                if(val.cantidadRembala=="" || val.cantidadRembala==undefined || val.loteProceso=="" || val.loteProceso==undefined){
                    contador++;
                }
            }
        })
        if(contador>0){
            $rootScope.alert.show({message:"Debe ingresar todas las cantidades y el lote de proceso"});
            return 0;
        }
        $rootScope.loading.show();
        var kilosTotales=0;
        var caracteristicas=[];
        var componentes=[];
        var arrayComponentes=[];
        var arrMat = [];
        var productor ="";
        var materiales=[];
        var materiales2=[];
        var detalleLote=[];
        var arrLoteSE=[];
        var arrHU = [];
        var arrPallet=[];
        var hu = [];
        var materialesProveedor=[];
        var jsonLote={};
		var arrayMat=[];
        angular.forEach($scope.detalleLote,function(val,key2){
            if(val.PRODUCTOR==$scope.dataSeleccion.productor.VALUE_CHAR){
                var jsonMateriales={}
                if(arrPallet.indexOf(val.EXIDV)==-1){
                    arrPallet.push(val.EXIDV);
                }
                if (arrHU[val.EXIDV] == undefined) {
                    arrHU[val.EXIDV] = {};
                    arrHU[val.EXIDV].items = [];
                }
                if (hu.indexOf(val.EXIDV) == -1) {
                    hu.push(val.EXIDV);
                }
                $scope.detalleLote = val.data;
                arrHU[val.EXIDV].items.push({
                    LOTE: val.CHARG,
                    MATERIAL: val.MATNR,
                    CENTRO: $rootScope.userData.centro,
                    ALMACEN: val.LGORT,
                    CANTIDAD: val.cantidadRembala,
                    HU_ITEM_NUMBER: val.VEPOS
                })
                productor = val.PRODUCTOR;
                kilosTotales+=parseFloat(val.pesoR);
                if(arrayComponentes[val.MATNR]==undefined){
                    arrayComponentes[val.MATNR] ={};
                    arrayComponentes[val.MATNR].CANTIDAD =0;
                    arrMat.push({MATERIAL:val.MATNR});
                }
                if(detalleLote[val.loteProceso]==undefined){
                    detalleLote[val.loteProceso]={};
                    arrLoteSE.push(angular.uppercase(val.loteProceso));
                }
                detalleLote[val.loteProceso].CANTIDAD+=val.cantidadRembala;
                detalleLote[val.loteProceso].UNIDAD=val.VEMEH;
                detalleLote[val.loteProceso].ALMACEN=val.LGORT;
                detalleLote[val.loteProceso].PRODUCTOR=val.PRODUCTOR;
                detalleLote[val.loteProceso].MATERIAL=val.MATNR;

                arrayComponentes[val.MATNR].CANTIDAD+=val.cantidadRembala;
                arrayComponentes[val.MATNR].UNIDAD=val.VEMEH;
                arrayComponentes[val.MATNR].ALMACEN=val.LGORT;
                arrayComponentes[val.MATNR].PRODUCTOR=val.PRODUCTOR;
                jsonLote.TDFRIO=val.TDFRIO;
                jsonLote.TIPIFICACION=val.TIPIFICACION;
                jsonLote.VARIEDAD=val.VARIEDAD;
                jsonMateriales.CANTIDAD = val.cantidadRembala;
                jsonMateriales.PRODUCTOR = val.PRODUCTOR;
                jsonMateriales.COD = val.MATNR;
                jsonMateriales.LOTE = val.CHARG;
                jsonMateriales.UNIDAD = val.VEMEH;
                materiales.push(jsonMateriales);
                jsonMateriales.MOVIMIENTO = 543;
                jsonMateriales.ITEM_TEXT = val.pesoR;
                jsonMateriales.ALMACEN = $scope.arrayAlmacenLote[val.CHARG];
                arrayMat.push(val.MATNR)
                materiales2.push(jsonMateriales);
            }
        })
        $scope.almacenSE ="PA03";
        var especieSE= "R-"+$scope.especie;
        var material2 ={
            "COD": especieSE,
            "CANTIDAD": kilosTotales.toString().replace(".",","),
            "LOTE": arrLoteSE[0],
            "MOVIMIENTO": 101,
            "ITEM_TEXT":"",
            "UNIDAD":"KG"
        }
        var matTraspProv={
            "MATERIAL":especieSE,
            "CANTIDAD": kilosTotales.toString().replace(".",","),
            "LOTE": arrLoteSE[0],
            "UNIDAD":"KG",
            "PRODUCTOR":productor,
            "CENTRO":$rootScope.userData.centro,
            "ALMACEN":$scope.almacenSE
        }
        materialesProveedor.push(matTraspProv);
        materiales2.unshift(material2);
        var arrayMaterialSE =[];
        angular.forEach(arrMat,function(val,key){
            componentes.push({
                "COD": val.MATERIAL,
                "CANTIDAD": arrayComponentes[val.MATERIAL].CANTIDAD,
                "UNIDAD": arrayComponentes[val.MATERIAL].UNIDAD,
                "ALMACEN": arrayComponentes[val.MATERIAL].ALMACEN,
                "PRODUCTOR": arrayComponentes[val.MATERIAL].PRODUCTOR
            })
        })
        angular.forEach(arrLoteSE,function(val,key){
            if(key>0){
                return;
            }
            arrayMaterialSE.push({
                "COD": especieSE,
                "CANTIDAD":  kilosTotales.toString().replace(".",","),
                "UNIDAD": "KG",
                "ALMACEN": $scope.almacenSE ,
                "PRODUCTOR": productor,
                "MOVIMIENTO": 101,
                "LOTE":val,
            })
        })
        var codVar="";
        angular.forEach($rootScope.listaVar,function(val,key){
            if(val.ATNAM=="Z"+$scope.especie+"_VARIEDAD" && val.DESCRIPTION==$scope.dataLoteProceso.VARIEDAD){
                codVar=val.VALUE_CHAR;
            }
        })
        caracteristicas.push(
            {LOTE:arrLoteSE[0],CARACTERISTICA:"ZPRODUCTOR",VALOR:productor},
            {LOTE:arrLoteSE[0],CARACTERISTICA:"Z"+$scope.especie+"_VARIEDAD",VALOR:jsonLote.VARIEDAD},
            {LOTE:arrLoteSE[0],CARACTERISTICA:"ZTFRIO",VALOR:jsonLote.TDFRIO},
            {LOTE:arrLoteSE[0],CARACTERISTICA:"TIPIFICACION",VALOR:jsonLote.TDFRIO},
            {LOTE:arrLoteSE[0],CARACTERISTICA:"ZFCOSECHA",VALOR:$rootScope.getFechaSeparado(".")},
            {LOTE:arrLoteSE[0],CARACTERISTICA:"ZLINEA",VALOR:"REEMBALAJE"},
            {LOTE:arrLoteSE[0],CARACTERISTICA:"ZTURNO",VALOR:"1"},
            {LOTE:arrLoteSE[0],CARACTERISTICA:"ZMOTIVOREEM",VALOR:$scope.dataSeleccion.motivo.VALUE_CHAR},
            {LOTE:arrLoteSE[0],CARACTERISTICA:"ZACUENTAREEM",VALOR:$scope.dataSeleccion.cuenta.VALUE_CHAR},
            {LOTE:arrLoteSE[0],CARACTERISTICA:"ZAUTORIZAREEM",VALOR:$scope.dataSeleccion.responzable.VALUE_CHAR},
			{LOTE:arrLoteSE[0],CARACTERISTICA:"Z_TIPO_PROCESO",VALOR:"REEMBALAJE"},
        )
        $scope.parametro={
            "OBJETOENTRADA": [{
                "BAPI": "BAPI_PO_CREATE1",
                "RUNTEST": "false",
                "COMERCIAL":false,
                "PARAMETROS": {
                    //"USUARIO":{"USUARIO":"MNAVA","PASS":"Wultu@2018."},
                    "FECHA": $rootScope.getFechaBapi(),
                    "MATERIALES":[{
                        "COD": especieSE,
                        "CANTIDAD": kilosTotales.toString().replace(".",",")
                    }],
                    "COMPONENTES": componentes,
                    "CENTRO": $rootScope.userData.centro,
                    "SOCIEDAD": $rootScope.userData.sociedad,
                    "CLASE_PEDIDO": $rootScope.userData.clasePedido,
                    "ORG_COMPRA": $rootScope.userData.organizacion,
                    "GRUPO_COMPRA": $rootScope.userData.grupoCompra,
                    "SUBCONTRATACION": "true",
                    "PRODUCTOR": productor
                }
            },
            {
                "BAPI": "BAPI_MIGO_541",
                "RUNTEST": "false",
                "PARAMETROS": {
                    //"USUARIO":{"USUARIO":"MNAVA","PASS":"Wultu@2018."},
                    "FECHA": $rootScope.getFechaBapi(),
                    "MATERIALES": materiales,
                    "CENTRO": $rootScope.userData.centro,
                    "ALMACEN": $scope.almacenSE,
                    "MOVIMIENTO": 541,
                    "PRODUCTOR": productor
                }
            },
            {
                "BAPI": "BAPI_GOODSMVT_CREATE",
                "RUNTEST": "false",
                "PARAMETROS": {
                    //"USUARIO":{"USUARIO":"MNAVA","PASS":"Wultu@2018."},
                    "FECHA": $rootScope.getFechaBapi(),
                    "MATERIALES": materiales2,
                    "TIPO_STOCK": "",
                    "CONTRAPEDIDO": "true",
                    "CONTRAORDEN": "false",
                    "CENTRO": $rootScope.userData.centro,
                    "ALMACEN":  $scope.almacenSE,
                    "MOVIMIENTO": 101,
                    "PRODUCTOR": productor
                }
            },
            {
                "BAPI": "BAPI_GOODSMVT_CREATE",
                "RUNTEST": "false",
                "PARAMETROS": {
                    "FECHA": $rootScope.getFechaBapi(),
                    "TIPO_STOCK": "",
                    "MATERIALES": arrayMaterialSE,
                    //"USUARIO":{"USUARIO":"MNAVA","PASS":"Wultu@2018."},
                    "CONTRAPEDIDO": "false",
                    "CONTRAORDEN": "true",
                    "CARACT_LOTE":caracteristicas,
                    "CENTRO": $rootScope.userData.centro,
                    "ALMACEN": $scope.almacenSE,
                    "MOVIMIENTO": 101
                }
            },
            {
                "BAPI": "BAPI_GOODSMVT_CREATE_541",
                "RUNTEST": "false",
                "PARAMETROS": {
                    "FECHA": $rootScope.getFechaBapi(),
                    "MATERIALES":materialesProveedor
                }
            },
            {
                "BAPI": "BAPI_ACTUALIZA_LOTE",
                "RUNTEST": "false",
                "PARAMETROS": {
                    //"USUARIO":{"USUARIO":"MNAVA","PASS":"Wultu@2018."},
                    "LOTES": [{"LOTE":arrLoteSE[0]}],
                    "CARACTERISTICAS": caracteristicas
                }
            }
            ]
        }
        console.log($scope.parametro);
        console.log(JSON.stringify($scope.parametro));
        //return 0;
        $http({
            method: 'GET',
            url: IPSERVER+"JSON_REEMBALAJE_EX.aspx?PARAMETRO="+JSON.stringify($scope.parametro),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }).success(function(data){
			$rootScope.loading.hide();
            document.getElementById('btnContinuar_2').style.display = 'block';
            document.getElementById('loadingCajaEmabalda2').style.display = 'none';
			document.getElementById('PACK_EnvioCajaEmbalada').style.display ='block';
            console.log(data.MENSAJES);
            var mensaje='<div class="contabilizar-text">';
            var conErr=0;
            try{
                var result1 = JSON.parse(data.MENSAJES[0].MENSAJES);
                //var EXPPURCHASEORDER = result1.EXPPURCHASEORDER;
                if(data.MENSAJES[0].RESULTADO==false){
                    angular.forEach(result1.RETURN,function(val,key){
                        if(val.TYPE=="E"){
                            mensaje+='<h1>ERROR PEDIDO: </h1> <p>' + val.MESSAGE+ '</p>';
                            //$scope.opopup.arrResumen.row.push([{type:"label",value:"ERROR PEDIDO"},{type:"label",value:val.MESSAGE}]);
                            conErr++;
                        }
                    })
                }
            }catch(e){
                conErr++;
            }
            try{
                var result = JSON.parse(data.MENSAJES[1].MENSAJES);
                var DOCUMENTO = result.DOCUMENTO;
                if(data.MENSAJES[1].RESULTADO==false){
                    angular.forEach(result.RETURN,function(val,key){
                        if(val.TYPE=="E"){
                            mensaje+='<h1>ERROR SUBCONTRATACIÓN: </h1> <p>' + val.MESSAGE+ '</p>';
                            //$scope.opopup.arrResumen.row.push([{type:"label",value:"ERROR RECEPCIÓN CONTRA PEDIDO"},{type:"label",value:val.MESSAGE}]);
                            conErr++;
                        }
                    })
                }
            }catch(e){
                conErr++;
            }
            try{
                var result2 = JSON.parse(data.MENSAJES[2].MENSAJES);
                var DOCUMENTO2 = result2.DOCUMENTO;
                if(data.MENSAJES[2].RESULTADO==false){
                    angular.forEach(result2.RETURN,function(val,key){
                        if(val.TYPE=="E"){
                            mensaje+='<h1>ERROR RECEPCIÓN CONTRA PEDIDO: </h1> <p>' + val.MESSAGE+ '</p>';
                            //$scope.opopup.arrResumen.row.push([{type:"label",value:"ERROR RECEPCIÓN CONTRA ORDEN"},{type:"label",value:val.MESSAGE}]);
                            conErr++;
                        }
                    })
                }
            }catch(e){
                conErr++;
            }
            try{
                var result3 = JSON.parse(data.MENSAJES[3].MENSAJES);
                var MATERIALDOCUMENT3 = result3.MATERIALDOCUMENT;
                if(data.MENSAJES[3].RESULTADO==false){
                    angular.forEach(result3.RETURN,function(val,key){
                        if(val.TYPE=="E"){
                            mensaje+='<h1>ERROR RECEPCIÓN CONTRA ORDEN: </h1> <p>' + val.MESSAGE+ '</p>';
                            //$scope.opopup.arrResumen.row.push([{type:"label",value:"ERROR CTA. CTE. ENVASES"},{type:"label",value:val.MESSAGE}]);
                            conErr++;
                        }
                    })
                }
            }catch(e){
                conErr++;
            }
            
            try{
                var result4 = JSON.parse(data.MENSAJES[4].MENSAJES);
                var MATERIALDOCUMENT3 = result4.MATERIALDOCUMENT;
                if(data.MENSAJES[4].RESULTADO==false){
                    angular.forEach(result4.RETURN,function(val,key){
                        if(val.TYPE=="E"){
                            mensaje+='<h1>ERROR TRASPASO PROVEEDOR: </h1> <p>' + val.MESSAGE+ '</p>';
                            //$scope.opopup.arrResumen.row.push([{type:"label",value:"ERROR CTA. CTE. ENVASES"},{type:"label",value:val.MESSAGE}]);
                            conErr++;
                        }
                    })
                }
            }catch(e){
                conErr++;
            }
            if(conErr>0){
                document.getElementById("cargandoDatosSAP").style.display="none";
                $rootScope.loading.hide();
                $scope.verPopRespuesta="block";
            }else{
                mensaje+='<h1>PEDIDO: </h1> <p>' + JSON.parse(data.MENSAJES[0].MENSAJES).EXPPURCHASEORDER + '</p>' +
                            '<h1>SUBCONTRATACIÓN: </h1> <p>' + (data.MENSAJES[1].DOCUMENTO) + '</p>' +
                            '<h1>RECEPCIÓN CONTRA PEDIDO : </h1> <p>' + (data.MENSAJES[2].DOCUMENTO) + '</p>' +
                            '<h1>RECEPCIÓN CONTRA ORDEN: </h1> <p>' + (data.MENSAJES[3].DOCUMENTO) + '</p>'+
                            '<h1>TRASPASO PROVEEDOR: </h1> <p>' + (data.MENSAJES[4].DOCUMENTO) + '</p>';
                mensaje+='</div>';
                /*var arrHUResta = [];
                $scope.contadorHU=0;
                angular.forEach(arrPallet, function(val, key) {
                    if (arrHUResta.indexOf(val) == -1) {
                    $scope.restaPTHU(arrHU[val].items, val, arrPallet.length);
                    arrHUResta.push(val);
                    }
                })*/
            }
            $rootScope.btnContinuar = 'block';
            document.getElementById('popRespuestaEnvioCajaEmbalada2').innerHTML = mensaje;
        }).error($rootScope.httpRequest.error);
    }
    $scope.restaPTHU= function(arr, hu, num) {
		var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
		cadenaXML += '   <soapenv:Header/>';
		cadenaXML += '   <soapenv:Body>';
		cadenaXML += '      <tem:ZMOV_CREATE_HU_UNPACK>';
		cadenaXML += '         <tem:datos>';
		cadenaXML += '            <tem:HUKEY>' + hu + '</tem:HUKEY>';
		cadenaXML += '            <tem:IT_ITEMUNPACK>';
        var itemsLotes=[];
		angular.forEach(arr,function(value,key){
            if($scope.arrayAlmacenLote[value.LOTE]==undefined){
                $scope.arrayAlmacenLote[value.LOTE]= (value.ALMACEN=="FR01")?"FR02":"PA03";
            }
			var itemLote={"MATERIAL":value.MATERIAL,
                "LOTE":value.LOTE,
                "CENTRO":$rootScope.userData.centro,
                "ALMACEM":(value.ALMACEN=="FR01")?"FR02":"PA03",
                "CANTIDAD":value.CANTIDAD,
                "ENTRY_UOM_ISO":"CJ",
                "ALMACEN_DESTINO":(value.ALMACEN=="FR01")?"FR02":"PA03"};
			itemsLotes.push(itemLote);
			cadenaXML += '               <tem:ZMOV_CREATE_HU_UNPACK_IT_ITEMUNPACK>';
			cadenaXML += '                  <tem:HU_ITEM_TYPE>1</tem:HU_ITEM_TYPE>';
			cadenaXML += '                  <tem:HU_ITEM_NUMBER>'+value.HU_ITEM_NUMBER+'</tem:HU_ITEM_NUMBER>';
			cadenaXML += '                  <tem:MATERIAL></tem:MATERIAL>';
			cadenaXML += '                  <tem:UNPACK_EXID></tem:UNPACK_EXID>';
			cadenaXML += '                  <tem:BATCH>' + value.LOTE + '</tem:BATCH>';
			cadenaXML += '                  <tem:PACK_QTY>' + value.CANTIDAD + '</tem:PACK_QTY>';
			cadenaXML += '                  <tem:BASE_UNIT_QTY_ISO></tem:BASE_UNIT_QTY_ISO>';
			cadenaXML += '                  <tem:BASE_UNIT_QTY></tem:BASE_UNIT_QTY>';
			cadenaXML += '                  <tem:PLANT></tem:PLANT>';
			cadenaXML += '                  <tem:STGE_LOC></tem:STGE_LOC>';
			cadenaXML += '                  <tem:STOCK_CAT></tem:STOCK_CAT>';
			cadenaXML += '                  <tem:SPEC_STOCK></tem:SPEC_STOCK>';
			cadenaXML += '                  <tem:SP_STCK_NO></tem:SP_STCK_NO>';
			cadenaXML += '                  <tem:EXPIRYDATE></tem:EXPIRYDATE>';
			cadenaXML += '                  <tem:MATERIAL_EXTERNAL></tem:MATERIAL_EXTERNAL>';
			cadenaXML += '                  <tem:MATERIAL_GUID></tem:MATERIAL_GUID>';
			cadenaXML += '                  <tem:MATERIAL_VERSION></tem:MATERIAL_VERSION>';
			cadenaXML += '               </tem:ZMOV_CREATE_HU_UNPACK_IT_ITEMUNPACK>';
		})
		cadenaXML += '            </tem:IT_ITEMUNPACK>';
		cadenaXML += '            <tem:RETURN_UNPACK>';
		cadenaXML += '            </tem:RETURN_UNPACK>';
		cadenaXML += '         </tem:datos>';
		cadenaXML += '      </tem:ZMOV_CREATE_HU_UNPACK>';
		cadenaXML += '   </soapenv:Body>';
		cadenaXML += '</soapenv:Envelope>';
		cadenaXML = cadenaXML.split('>undefined<').join('><');
		console.log(cadenaXML);
		var parser = new DOMParser();
		var docXml = parser.parseFromString(cadenaXML, "text/xml");
		console.log(docXml);
		$rootScope.loading.show();
		$http({
			method: 'POST',
			url: IPSERVER + 'rfcNET.asmx?',
			headers:{
				'Content-Type': 'text/xml; charset=utf-8'
			},
			processData: false,
			dataType: 'xml',
			data:cadenaXML
		}).success(function(data){
            if(($scope.contadorHU+1)==$scope.arrPallet.length){
                if($scope.contadorHU==num){
                    document.getElementById("cargandoDatosSAP").style.display="none";
                    $rootScope.loading.hide();
                    $rootScope.btnContinuar = 'block';
                    $scope.verPopRespuesta="block";
                }
                $scope.asignacionContinuar2();
            }else{
                $scope.contadorHU++;
                $scope.restaPTHU($scope.arrHU[$scope.arrPallet[$scope.contadorHU]].items,  $scope.arrPallet[$scope.contadorHU], num);
            }
		//$rootScope.alert.show({message:"Documento Material: "+(material.firstChild.nodeValue)+", Pedido: "+(pedido.firstChild.nodeValue)})
		}).error($rootScope.httpRequest.error);
    }
})