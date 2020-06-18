appExpled.lazyController('reembalajeEntrada', function($scope, $routeParams, $rootScope,$http) {
    $scope.listaEspecies = [];
    $scope.dataSeleccion={
        especie:''
    };
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
            $scope.validaPallet();
        }
    }
    $scope.detalleLote =[];
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
            $rootScope.loading.hide();
            if(datos.LT_HU_CABECERA.length==0){
                $rootScope.alert.show({message:"El pallet ingresado no existe en SAP"});
                $scope.codPallet="";
                return 0;
            }
            if(datos.LT_HU_POSICION[0].WERKS!=$rootScope.userData.centro){
                $rootScope.alert.show({message:"El pallet ingresado no corresponde a su centro"});
                $scope.codPallet="";
                return 0;
            }
            $scope.dataLoteProceso=datos.LT_HU_POSICION[0];
            if(datos.LT_HU_CABECERA[0].STATUS!="0020"){
                $rootScope.alert.show({message:"El pallet ingresado no habilitado para repaletizar"});
                $scope.codPallet="";
                return 0;
            }
            if(datos.LT_HU_CABECERA[0].LGORT!="PA03" && datos.LT_HU_CABECERA[0].LGORT!="FR01"){
                $rootScope.alert.show({message:"El pallet no pertenece al almacen PA04 o al FR01"});
                $scope.codPallet="";
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
                return 0;
            }
            if($scope.detalleLote.length>0){
                if($scope.detalleLote[0][0].PRODUCTOR!=datos.LT_HU_POSICION[0].PRODUCTOR){
                    $rootScope.alert.show({message:"El productor ingresado no corresponde"});
                    $rootScope.loading.hide();
                    return 0;
                }
            }
            angular.forEach(datos.LT_HU_POSICION,function(val2,key2){
                val2.totalCajas=function(item,id){
                    console.log(item.cantidadRembala,id)
                    if(item.reembalaCaja=="X"){
                        item.readonly=true;
                        item.cantidadRembala =item.VEMNG;
                    }else{
                        item.readonly=false;
                    }
                    console.log(item);
                }
                val2.validaCantidad=function(item){
                    console.log(item);
                    if(item.cantidadRembala>item.VEMNG){
                        item.cantidadRembala=0;
                        $rootScope.alert.show({message:"No puede superar la cantidad de "+item.VEMNG+" cajas"});
                    }
                }
                val2.EliminarLote=function(id){
                    $scope.detalleLote[0].splice(id,1);
                    angular.forEach($scope.detalleLote,function(val2,key2){
                        angular.forEach(val2,function(val,key){
                            val.id=key;
                        })
                    })
                }
                $scope.dataLoteProceso=[];
                val2.validaLoteProceso=function(item,id){
                    if(item.loteProceso==""){
                        return 0;
                    }
                    if($scope.detalleLote.length>0){
                        var validaLote=false;
                        angular.forEach($scope.detalleLote,function(val2,key2){
                            angular.forEach(val2,function(val,key){
                                if(item.loteProceso!=val.loteProceso && val.loteProceso!=""){
                                    validaLote=true;
                                }
                            })
                        })
                        if(validaLote){
                            $rootScope.alert.show({message:"Solo puede haber 1 lote de proceso"});
                        }
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
                            }else{
                                if(datos.STOCKPROCESO[0].LIFNR!=item.PRODUCTOR){
                                    $rootScope.alert.show({message:"El productor no corresponde a el lote de proceso"});
                                    return 0;
                                }
                                if($scope.arraProd[item.loteProceso]!=undefined && $scope.arraProd[item.loteProceso]!=""){
                                    if($scope.arraProd[item.loteProceso]!=item.PRODUCTOR){
                                        $rootScope.alert.show({message:"El productor no corresponde a el lote de proceso"});
                                    }
                                }
                            }
                        }else{
                            var validaLotePro=false;
                            angular.forEach($scope.detalleLote,function(val2,key2){
                                angular.forEach(val2,function(val,key){
                                    if(key2!=id){
                                        if(item.PRODUCTOR!=val.PRODUCTOR && val.loteProceso==item.loteProceso){
                                            validaLotePro=true;
                                        }
                                    }
                                })
                            })
                            if(validaLotePro){
                                $rootScope.alert.show({message:"El productor no corresponde a el lote de proceso"});
                                return 0;
                            }
                        }
                    }).error($rootScope.httpRequest.error);
                }
                angular.forEach($rootScope.ZMOV_QUERY_MATERIAL,function(val,key){
                    if(val2.MATNR==val.MATNR && val.MTART=="FERT"){
                        val2.PESOSIS= val.NTGEW*val2.VEMNG
                        val2.pesoR= val.NTGEW*val2.VEMNG;
                    }
                })
            })
            $scope.detalleLote.push(datos.LT_HU_POSICION);
            angular.forEach($scope.detalleLote,function(val2,key2){
                angular.forEach(val2,function(val,key){
                    val.id=key;
                })
            })
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
            $rootScope.alert.show({message:"Debe ingresar almenos 1 pallet"});
            return 0;
        }
        var contador=0;
        angular.forEach($scope.detalleLote,function(val2,key2){
            angular.forEach(val2,function(val,key){
                if(val.cantidadRembala=="" || val.loteProceso==""){
                    contador6++;
                }
            })
        })
        if(contador>0){
            $rootScope.alert.show({message:"Debe ingresar todas las cantidades y el lote de proceso"});
            return 0;
        }
        $rootScope.loading.show();
        console.log($scope.detalleLote);
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
        angular.forEach($scope.detalleLote,function(val2,key2){
            angular.forEach(val2,function(val,key){
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
                kilosTotales+=val.cantidadRembala*val.pesoR;
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
                jsonMateriales.CANTIDAD = val.cantidadRembala;
                jsonMateriales.PRODUCTOR = val.PRODUCTOR;
                jsonMateriales.COD = val.MATNR;
                jsonMateriales.LOTE = val.CHARG;
                jsonMateriales.UNIDAD = val.VEMEH;
                materiales.push(jsonMateriales);
                jsonMateriales.MOVIMIENTO = 543;
                jsonMateriales.ALMACEN = val.LGORT;
                materiales2.push(jsonMateriales);
            })
        })
        var especieSE= "P-"+$scope.especie;
        var material2 ={
            "COD": especieSE,
            "CANTIDAD": kilosTotales.toString().replace(".",","),
            "LOTE": arrLoteSE[0],
            "MOVIMIENTO": 101,
            "UNIDAD":"KG"
        }
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
        $scope.almacenSE ="PA03";
        angular.forEach(arrLoteSE,function(val,key){
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
            {LOTE:arrLoteSE[0],CARACTERISTICA:"ZMANZANAS_VARIEDAD",VALOR:codVar},
            {LOTE:arrLoteSE[0],CARACTERISTICA:"ZFCOSECHA",VALOR:$rootScope.getFechaSeparado(".")},
            {LOTE:arrLoteSE[0],CARACTERISTICA:"ZLINEA",VALOR:"REEMBALAJE"},
            {LOTE:arrLoteSE[0],CARACTERISTICA:"ZTURNO",VALOR:"1"},
            {LOTE:arrLoteSE[0],CARACTERISTICA:"ZMOTIVOREEM",VALOR:$scope.dataSeleccion.motivo.VALUE_CHAR},
            {LOTE:arrLoteSE[0],CARACTERISTICA:"ZACUENTAREEM",VALOR:$scope.dataSeleccion.cuenta.VALUE_CHAR},
            {LOTE:arrLoteSE[0],CARACTERISTICA:"ZAUTORIZAREEM",VALOR:$scope.dataSeleccion.responzable.VALUE_CHAR},
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
            document.getElementById('btnContinuar_2').style.display = 'block';
            document.getElementById('loadingCajaEmabalda2').style.display = 'none';
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
            if(conErr>0){
                document.getElementById("cargandoDatosSAP").style.display="none";
                $rootScope.loading.hide();
                $scope.verPopRespuesta="block";
            }else{
                mensaje+='<h1>PEDIDO: </h1> <p>' + JSON.parse(data.MENSAJES[0].MENSAJES).EXPPURCHASEORDER + '</p>' +
                            '<h1>SUBCONTRATACIÓN: </h1> <p>' + (data.MENSAJES[1].DOCUMENTO) + '</p>' +
                            '<h1>RECEPCIÓN CONTRA PEDIDO : </h1> <p>' + (data.MENSAJES[2].DOCUMENTO) + '</p>' +
                            '<h1>RECEPCIÓN CONTRA ORDEN: </h1> <p>' + (data.MENSAJES[3].DOCUMENTO) + '</p>';
                mensaje+='</div>';
                var arrHUResta = [];
                $scope.contadorHU=0;
                angular.forEach(arrPallet, function(val, key) {
                    if (arrHUResta.indexOf(val) == -1) {
                    $scope.restaPTHU(arrHU[val].items, val, arrPallet.length);
                    arrHUResta.push(val);
                    }
                })
            }
            $rootScope.btnContinuar = 'block';
            document.getElementById('popRespuestaEnvioCajaEmbalada2').innerHTML = mensaje;
        }).error($rootScope.httpRequest.error);
    }
    $scope.restaPTHU= function(arr, hu, num) {
        setTimeout(function() {
            var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
            cadenaXML += '   <soapenv:Header/>';
            cadenaXML += '   <soapenv:Body>';
            cadenaXML += '      <tem:ZMOV_CREATE_HU_UNPACK>';
            cadenaXML += '         <tem:datos>';
            cadenaXML += '            <tem:HUKEY>' + hu + '</tem:HUKEY>';
            cadenaXML += '            <tem:IT_ITEMUNPACK>';
            //               <!--Zero or more repetitions:-->
            var ValiQuitar = true;
            angular.forEach(arr, function (value, key) {
                cadenaXML += '               <tem:ZMOV_CREATE_HU_UNPACK_IT_ITEMUNPACK>';
                cadenaXML += '                  <tem:HU_ITEM_TYPE>1</tem:HU_ITEM_TYPE>';
                cadenaXML += '                  <tem:HU_ITEM_NUMBER>'+value.HU_ITEM_NUMBER+'</tem:HU_ITEM_NUMBER>';
                cadenaXML += '                  <tem:MATERIAL></tem:MATERIAL>';
                cadenaXML += '                  <tem:UNPACK_EXID></tem:UNPACK_EXID>';
                cadenaXML += '                  <tem:BATCH>' + value.CHARG + '</tem:BATCH>';
                cadenaXML += '                  <tem:PACK_QTY>' + value.CANTIDAD + '</tem:PACK_QTY>';
                cadenaXML += '                  <tem:BASE_UNIT_QTY_ISO></tem:BASE_UNIT_QTY_ISO>';
                cadenaXML += '                  <tem:BASE_UNIT_QTY></tem:BASE_UNIT_QTY>';
                cadenaXML += '                  <tem:PLANT>'+value.ALMACEN+'</tem:PLANT>';
                cadenaXML += '                  <tem:STGE_LOC></tem:STGE_LOC>';
                cadenaXML += '                  <tem:STOCK_CAT></tem:STOCK_CAT>';
                cadenaXML += '                  <tem:SPEC_STOCK></tem:SPEC_STOCK>';
                cadenaXML += '                  <tem:SP_STCK_NO></tem:SP_STCK_NO>';
                cadenaXML += '                  <tem:EXPIRYDATE></tem:EXPIRYDATE>';
                cadenaXML += '                  <tem:MATERIAL_EXTERNAL></tem:MATERIAL_EXTERNAL>';
                cadenaXML += '                  <tem:MATERIAL_GUID></tem:MATERIAL_GUID>';
                cadenaXML += '                  <tem:MATERIAL_VERSION></tem:MATERIAL_VERSION>';
                cadenaXML += '               </tem:ZMOV_CREATE_HU_UNPACK_IT_ITEMUNPACK>';
            });
            if(ValiQuitar == false){
                return 0;
                
            }
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
                $scope.contadorHU++;
                $rootScope.loading.hide();
                //console.log(data);
                var print = data.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
                console.log(print);
                try{
                    var parser = new DOMParser();
                    var docXml = parser.parseFromString(print, "text/xml");
                    console.log(docXml.getElementsByTagName("MESSAGE_V1")[0].childNodes[0].textContent)
                    var message= "";
                    var mensajeNum=0;
                    try{
                        message= docXml.getElementsByTagName("MESSAGE_V1")[0].childNodes[0].textContent;
                        
                    }catch (e){
                        message ="NO HAY MENSAJE";
                    }
                    try{
                        mensajeNum = parseInt(message);
                    }catch (e){
                        mensajeNum =0;
                    }
                }catch(err){

                }
                if($scope.contadorHU==num){
                    document.getElementById("cargandoDatosSAP").style.display="none";
                    $rootScope.loading.hide();
                    $rootScope.btnContinuar = 'block';
                    $scope.verPopRespuesta="block";
                }
                var mensaje = '<div class="contabilizar-text">';
                mensaje +='<h1>MESSAGE_V1: </h1> <p>' + (message) + '</p>';
                console.log(mensaje);
                $scope.mensaje= mensaje;
            //$rootScope.alert.show({message:"Documento Material: "+(material.firstChild.nodeValue)+", Pedido: "+(pedido.firstChild.nodeValue)})
            }).error($rootScope.httpRequest.error);
        }, 1900 * num);
    }
})