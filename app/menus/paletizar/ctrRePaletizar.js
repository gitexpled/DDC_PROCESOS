appExpled.lazyController('ctrRePaletizar', function ($scope, $routeParams, $rootScope,$http) {
    console.log(234)
    $scope.datosPaletiza= {
        folioOrigen:'',
        alturaOrigen:'',
        folioDestino:'',
        alturaDestino:''
    }
    $scope.validaCalibre=function(){
        var arrCal=[];
        angular.forEach($scope.LT_HU_POSICION,function(val,key){
            if(arrCal.indexOf(val.CALIBRE)==-1){
                arrCal.push(val.CALIBRE)
            }
        })
        if(arrCal.length>1){
            $scope.tipoCalibre="MIXTO";
        }else{
            if(arrCal.length>0){
                $scope.tipoCalibre=arrCal[0];
            }else{
                $scope.tipoCalibre="";
            }
        }
    }
    $scope.POP_DATA = true;
    $scope.actualizaTotalCajas=function(){
        //$scope.LT_HU_CABECERA[0].TOTAL;
        var total=0;
        angular.forEach($scope.LT_HU_POSICION,function(val,key){
            total+=val.ngModel;
        })
        $scope.LT_HU_CABECERA[0].TOTAL=total;
    }
    $scope.clickearCheck = function (id) {
        if (!$scope.dataTable.LT_DETALLE[id].disable) {
            if ($scope.dataTable.LT_DETALLE[id].chek) {
                $scope.dataTable.LT_DETALLE[id].img = "img/check.png";
                $scope.dataTable.LT_DETALLE[id].chek = false;
            } else {
                $scope.dataTable.LT_DETALLE[id].img = "img/x.png";
                $scope.dataTable.LT_DETALLE[id].chek = true;
            }
        }
    };
    $scope.LT_HU_POSICION=[];
    $scope.codearLote = function () {
        if(APPMOVIL){
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    $scope.folioOrigen = result.text;
                    $rootScope.$apply();
                    $scope.ValidatePalletOrigen();
                },
                function (error) {
                    $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
                }
            );
        }else{
            $scope.ValidatePalletOrigen();
        }
    }
    $scope.validaCajas=function(item){
        if(item.ngModel>item.cajIni){
            $rootScope.alert.show({message:"No puede superar las "+item.cajIni+" cajas "});
            item.ngModel=0;
        }
    }
    $scope.codearLote2 = function () {
        if(APPMOVIL){
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    $scope.folioDestino = result.text;
                    $rootScope.$apply();
                    if($scope.LT_HU_POSICION.length>0){
                        $rootScope.alert.show({message:"Desea recargar la busqueda?"});
                        $rootScope.alert.buttons.cancel.show="block";
                        $rootScope.alert.buttons.cancel.text="Cancelar";
                        $rootScope.alert.buttons.accept.click=function(){
                            $scope.ValidatePalletsDestino();
                            $rootScope.alert.display="none";
                        }
                    }else{
                        $scope.ValidatePalletsDestino();
                    }
                    
                },
                function (error) {
                    $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
                }
            );
        }else{
            if($scope.LT_HU_POSICION.length>0){
                if(parseInt($scope.LT_HU_POSICION[0].EXIDV)!=parseInt($scope.folioDestino)){
                    $rootScope.alert.show({message:"Desea recargar la busqueda?"});
                    $rootScope.alert.buttons.cancel.show="block";
                    $rootScope.alert.buttons.cancel.text="Cancelar";
                    $rootScope.alert.buttons.accept.click=function(){
                        $scope.ValidatePalletsDestino();
                        $rootScope.alert.display="none";
                    }
                }
            }else{
                $scope.ValidatePalletsDestino();
            }
        }
    }
    $scope.ValidatePalletOrigen = function(){
        if($scope.folioDestino==="" || $scope.folioDestino==undefined){
            $rootScope.alert.show({message:"Debe ingresar el pallet destino"});
            $scope.folioOrigen="";
            return 0;
        }
        if($scope.folioDestino===$scope.folioOrigen){
            $rootScope.alert.show({message:"El folio ingresado, fue ingresado en destino"});
            $scope.folioOrigen="";
            return 0;
        }
        var existe=false
        angular.forEach($scope.LT_HU_POSICION2,function(val,key){
            if(parseInt(val.EXIDV)===parseInt($scope.folioOrigen)){
               existe=true; 
            }
        })
        
        if(existe){
            $rootScope.alert.show({message:"Pallet ya ingresado"});
            $scope.folioOrigen="";
            return 0;
        }
        $rootScope.loading.show();
        $http({
            method: 'POST',
            url: IPSERVER+'/JSON_ZMOV_QUERY_HU_INFO.aspx?IR_EXIDV='+angular.uppercase($scope.folioOrigen),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout:500000
        }).success(function(datos){
            console.log(datos);
            $rootScope.loading.hide();
            if(datos.LT_HU_CABECERA.length==0){
                $rootScope.alert.show({message:"El pallet ingresado no existe en SAP"});
                $scope.folioOrigen="";
                return 0;
            }
            if(datos.LT_HU_POSICION[0].WERKS!=$rootScope.userData.centro){
                $rootScope.alert.show({message:"El pallet ingresado no corresponde a su centro"});
                $scope.folioOrigen="";
                return 0;
            }
            if(datos.LT_HU_CABECERA[0].STATUS!="0020"){
                $rootScope.alert.show({message:"El pallet ingresado no habilitado para repaletizar"});
                $scope.folioOrigen="";
                return 0;
            }
            if($scope.LT_HU_POSICION.length>0){
                var valStockLib=false;
                angular.forEach($scope.LT_HU_POSICION,function(val,key){
                    if(val.BESTQ!="" && val.BESTQ!=null){
                        valStockLib=true;
                    }
                })
                if(valStockLib){
                    $rootScope.alert.show({message:"El pallet ingresado tiene lotes que no estan en libre utilización"});
                    $scope.folioOrigen="";
                    return 0;
                }
                if($scope.LT_HU_POSICION[0].MATNR!=datos.LT_HU_POSICION[0].MATNR){
                    $rootScope.alert.show({message:"El material del pallet de origen es distinto al del destino"});
                    $scope.folioOrigen="";
                    return 0;
                }
                if($scope.LT_HU_POSICION[0].CALIDAD!=datos.LT_HU_POSICION[0].CALIDAD){
                    $rootScope.alert.show({message:"La calidad del pallet de origen es distinto al del destino"});
                    $scope.folioOrigen="";
                    return 0;
                }
                var posOr = $scope.LT_HU_POSICION;
                $scope.LT_HU_POSICION=[];
                angular.forEach(posOr,function(val,key){
                    //if(!val.eliminaCaja){
                        $scope.LT_HU_POSICION.push(val)
                    //}
                })
            }
            //$scope.LT_HU_CABECERA = datos.LT_HU_CABECERA
            angular.forEach(datos.LT_HU_POSICION,function(val,key){
                val.type="number";
                val.cajIni=val.VEMNG;
                val.eliminaCaja=true;
                val.ngModel=val.VEMNG;
                val.validaCajas=function(item){
                    console.log(item)
                    if(item.ngModel>item.cajIni){
                        $rootScope.alert.show({message:"No puede superar las "+item.cajIni+" cajas "});
                        item.ngModel=0;
                    }
                }
                val.repaPallet=function(item){
                    console.log(item)
                    var jsonRepa=JSON.parse(JSON.stringify(item));
                    //item.VEMNG = val.cajIni;
                    var cant = item.VEMNG-item.ngModel;
                    if(cant<0){
                        $rootScope.alert.show({message:"No puede quitar mas cajas de las que tiene"});
                        return 0;
                    }
                    item.VEMNG = cant;
                    jsonRepa.type="label";
                    var valid=true;
                    angular.forEach($scope.LT_HU_POSICION,function(val,key){
                        if(val.CHARG == jsonRepa.CHARG && val.EXIDV==jsonRepa.EXIDV && val.VEPOS==jsonRepa.VEPOS){
                            val.ngModel +=item.ngModel;
                            valid=false
                        }
                    })
                    if(valid){
                        jsonRepa.eliminaPallet=function(item){
                            angular.forEach($scope.LT_HU_POSICION,function(val,key){
                                val.id=key;
                            })
                            console.log(item)
                            if(item.eliminaCaja){
                                angular.forEach($scope.LT_HU_POSICION2,function(val,key){
                                    if(val.CHARG == item.CHARG && val.EXIDV==item.EXIDV && val.VEPOS==item.VEPOS){
                                        val.VEMNG +=item.ngModel;
                                    }
                                })
                            }
                            $scope.LT_HU_POSICION.splice(item.id,1);
                            $scope.actualizaTotalCajas();
                            $scope.validaCalibre();
                        }
                        $scope.LT_HU_POSICION.push(jsonRepa)
                    }
                    $scope.actualizaTotalCajas();
                    $scope.validaCalibre();
                }
                val.EXIDV2 = val.EXIDV.substr(2,21);
                if($scope.LT_HU_POSICION2==undefined || $scope.LT_HU_POSICION2.length==0){
                    $scope.LT_HU_POSICION2=[];
                }
                $scope.LT_HU_POSICION2.push(val);
            })
            $rootScope.loading.hide();
            if($scope.LT_HU_CABECERA==undefined){
                $scope.LT_HU_CABECERA=[];
                if($scope.LT_HU_CABECERA[0]==undefined){
                    $scope.LT_HU_CABECERA[0]={};
                }
            }
            $scope.LT_HU_CABECERA[0].EXIDV=$scope.folioDestino;
            $scope.folioOrigen="";
        }).error($rootScope.httpRequest.error);
    }
    $scope.ValidatePalletsDestino = function(){
        if($scope.folioDestino==""){
            return 0;
        }
        
        
        $rootScope.loading.show();
        $http({
            method: 'POST',
            url: IPSERVER+'/JSON_ZMOV_QUERY_HU_INFO.aspx?IR_EXIDV='+angular.uppercase($scope.folioDestino),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout:500000
        }).success(function(datos){
            console.log(datos);
            $rootScope.loading.hide();
            if(datos.LT_HU_CABECERA.length!=0){
                if(datos.LT_HU_POSICION[0].WERKS!=$rootScope.userData.centro){
                    $rootScope.alert.show({message:"El pallet ingresado no corresponde a su centro"});
                    $scope.folioDestino="";
                    return 0;
                }
                if(datos.LT_HU_CABECERA[0].STATUS!="0020"){
                    $rootScope.alert.show({message:"El pallet ingresado no habilitado para repaletizar"});
                    $scope.folioDestino="";
                    return 0;
                }
            }else{
                return 0;
            }
            var valStockLib=false;
            angular.forEach($scope.LT_HU_POSICION,function(val,key){
                if(val.BESTQ!="" && val.BESTQ!=null){
                    valStockLib=true;
                }
            })
            if(valStockLib){
                $rootScope.alert.show({message:"El pallet ingresado tiene lotes que no estan en libre utilización"});
                $scope.folioOrigen="";
                return 0;
            }
            $scope.LT_HU_POSICION=[];
            $scope.LT_HU_POSICION2=[];
            $scope.LT_HU_CABECERA = datos.LT_HU_CABECERA;
            $scope.LT_HU_CABECERA[0].TOTAL =$scope.LT_HU_CABECERA[0].VEMNG;
            $scope.LT_HU_POSICION = datos.LT_HU_POSICION;
            angular.forEach(datos.LT_HU_POSICION,function(val,key){
                val.type="label";
                val.ngModel = val.VEMNG;
            })
            $rootScope.loading.hide();
            $scope.LT_HU_CABECERA[0].EXIDV=$scope.folioDestino;
            $scope.validaCalibre();
        }).error($rootScope.httpRequest.error);
    }
    $scope.Pop_Up_Material = function () {
        if ($scope.alturaDestino==undefined || $scope.alturaDestino.VEGR4=="") {
            $rootScope.alert.show({ message: "Favor agregar Almacen" });
            return;
        }
        if($scope.LT_HU_CABECERA.length==0){
            $rootScope.alert.show({ message: "Debe ingresar almenos un pallet a repaletizar" });
            return;
        }
        if($scope.palletCompleto!="X"){
            $scope.generaXML();
            return 0;
        }
        $rootScope.loading.show();
        var mat =$scope.LT_HU_POSICION[0].MATNR;
        if($scope.LT_HU_CABECERA[0].MATNR !=undefined){
            mat=$scope.LT_HU_CABECERA[0].MATNR;
        }
        $http({
            method: 'POST',
            url: IPSERVER + 'JSON_ZMOV_10020.aspx?IV_MATNR=' + mat + '&IV_WERKS=' + angular.uppercase($rootScope.userData.centro) + '&IV_HU_GRP4=' + $scope.alturaDestino.VEGR4 + '&IV_TIP_PACKING=' + (($rootScope.userData.mail === 'recepcionPallet') ? 'S' : 'C'),
            headers: { 'Content-Type': 'text/xml; charset=utf-8' },
            processData: false,
            dataType: 'json',
        }).success(function (data) {
            $rootScope.loading.hide();
            console.log(data);
            if (data.LT_DETALLE.length > 0) {
                $scope.POP_DATA = false;
                $scope.dataTable = data;
                angular.forEach($scope.dataTable.LT_DETALLE, function (v, k) {
                    v.img = "img/check.png";
                    v.chek = false;
                    v.Esquina = false;
                    if ($scope.Completo !== 'X') {
                        v.disable = false;
                    } else {
                        v.disable = true;
                    }
                })
                angular.forEach($scope.dataTable.LT_DETALLE, function (v, k) {
                    angular.forEach($scope.JSON_ESQUINERO, function (value, ley) {
                        if (value.MATNR == v.MATNR) {
                            v.Esquina = true;
                        }
                    })
                })
            } else {
                $rootScope.alert.show({ message: "Falta configurar lista 99, Componente Pallet" });
            }
        })
    }
    $scope.Get_XML = function () {
        var item = new Date();
        var dato = '';
        var year = item.getFullYear().toString();
        var month = ((item.getMonth() + 1) < 10) ? '0' + (item.getMonth() + 1).toString() : (item.getMonth() + 1).toString();
        var day = (item.getDate() < 10) ? '0' + item.getDate().toString() : item.getDate().toString();
        //dato = day + '.' + month + '.' + year;
        dato = year + month + day;
        var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
                    <soapenv:Header/>\
                    <soapenv:Body>\
                    <tem:ZMOV_20032>\
                        <tem:datos>\
                            <tem:ALMACEN_HU>'+ $scope.LT_HU_CABECERA[0].LGORT + '</tem:ALMACEN_HU>\
                            <tem:CENTRO_HU>'+ $scope.LT_HU_CABECERA[0].WERKS + '</tem:CENTRO_HU>\
                            <tem:EXIDV_HU>\
                                <tem:ZMOV_20032_EXIDV_HU>\
                                    <tem:EXIDV>'+ $scope.LT_HU_CABECERA[0].EXIDV + '</tem:EXIDV>\
                                </tem:ZMOV_20032_EXIDV_HU>\
                            </tem:EXIDV_HU>\
                            <tem:HEADER>\
                                <tem:BUKRS>' + $rootScope.userData.sociedad + '</tem:BUKRS>\
                                <tem:EKORG>' + $rootScope.userData.organizacion + '</tem:EKORG>\
                                <tem:EKGRP>' + $rootScope.userData.grupoCompra + '</tem:EKGRP>\
                                <tem:BSART>' + $rootScope.userData.clasePedido + '</tem:BSART>\
                                <tem:BUDAT>'+ dato + '</tem:BUDAT>\
                                <tem:LIFNR>'+ $scope.LT_HU_POSICION[0].PRODUCTOR_ET + '</tem:LIFNR>\
                                <tem:XBLNR>'+ $scope.LT_HU_POSICION[0].CHARG + '</tem:XBLNR>\
                                <tem:BKTXT>' + $rootScope.userData.usuario + '</tem:BKTXT>\
                            </tem:HEADER>\
                            <tem:HEADER_ADIC>\
                                <tem:TIP_PACKING>'+ (($rootScope.userData.mail === 'recepcionPallet') ? 'S' : 'C') + '</tem:TIP_PACKING>\
                                <tem:LGORT_TRASP>FR07</tem:LGORT_TRASP>\
                                <tem:STLAL_PALLET>99</tem:STLAL_PALLET>\
                            </tem:HEADER_ADIC>\
                            <tem:LT_ITEMS>';
            var qty=0;
            angular.forEach($scope.LT_HU_POSICION,function(val,key){
                qty+=val.VEMNG;
                if(key==($scope.LT_HU_POSICION.length-1)){
                    xml +='     <tem:ZMOV_20032_LT_ITEMS>\
                                <tem:STCK_TYPE></tem:STCK_TYPE>\
                                <tem:MATERIAL>'+ val.MATNR + '</tem:MATERIAL>\
                                <tem:QUANTITY>'+ qty+ '</tem:QUANTITY>\
                                <tem:PO_UNIT>'+ val.VEMEH + '</tem:PO_UNIT>\
                                <tem:HSDAT>'+ dato + '</tem:HSDAT>\
                                <tem:PLANT>'+ val.WERKS + '</tem:PLANT>\
                                <tem:STGE_LOC>FR07</tem:STGE_LOC>\
                                <tem:FREE_ITEM>X</tem:FREE_ITEM>\
                                <tem:ITEM_CAT>L</tem:ITEM_CAT>\
                                <tem:ACCTASSCAT>F</tem:ACCTASSCAT>\
                                <tem:ALMAC_TRASP></tem:ALMAC_TRASP>\
                                </tem:ZMOV_20032_LT_ITEMS>';
                }
            })
                
                 xml +='    </tem:LT_ITEMS>\
                            <tem:LT_LOG></tem:LT_LOG>\
                            <tem:LT_LOG_HU></tem:LT_LOG_HU>\
                            <tem:LT_MATNR_PALLET>';
        angular.forEach($scope.dataTable.LT_DETALLE, function (v, k) {
            if (v.img == 'img/x.png') {
                xml += '<tem:ZMOV_20032_LT_MATNR_PALLET>\
                            <tem:MATNR>'+ v.MATNR + '</tem:MATNR>\
                        </tem:ZMOV_20032_LT_MATNR_PALLET>';
            }
        })
        xml += '</tem:LT_MATNR_PALLET>\
                        </tem:datos>\
                    </tem:ZMOV_20032>\
                    </soapenv:Body>\
                </soapenv:Envelope>';
        xml = xml.split('>undefined<').join('><');
        console.log(xml);
        return xml;
    }
    $scope.Send_XML = function () {
        $rootScope.loading.show();
        var cadenaXML2='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
                <soapenv:Header/>\
                <soapenv:Body>\
                   <tem:ZMOV_50011>\
                      <tem:datos>\
                         <tem:IT_EXIDV>\
                            <tem:ZMOV_50011_IT_EXIDV>\
                               <tem:EXIDV>'+$scope.folioDestino+'</tem:EXIDV>\
                            </tem:ZMOV_50011_IT_EXIDV>\
                         </tem:IT_EXIDV>\
                         <tem:LT_HUM_UPDATE_HEADER>\
                            <tem:ZMOV_50011_LT_HUM_UPDATE_HEADER>\
                               <tem:EXIDV>'+$scope.folioDestino+'</tem:EXIDV>\
                               <tem:FIELD_NAME>KZGVH</tem:FIELD_NAME>\
                               <tem:FIELD_VALUE>'+$scope.palletCompleto+'</tem:FIELD_VALUE>\
                            </tem:ZMOV_50011_LT_HUM_UPDATE_HEADER>\
                            <tem:ZMOV_50011_LT_HUM_UPDATE_HEADER>\
                               <tem:EXIDV>'+$scope.folioDestino+'</tem:EXIDV>\
                               <tem:FIELD_NAME>VEGR4</tem:FIELD_NAME>\
                               <tem:FIELD_VALUE>'+$scope.alturaDestino.VEGR4+'</tem:FIELD_VALUE>\
                            </tem:ZMOV_50011_LT_HUM_UPDATE_HEADER>\
                         </tem:LT_HUM_UPDATE_HEADER>\
                      </tem:datos>\
                   </tem:ZMOV_50011>\
                </soapenv:Body>\
             </soapenv:Envelope>'
        $http({
            method: 'POST',
            url: IPSERVER + 'rfcNET.asmx?',
            headers:{
                'Content-Type': 'text/xml; charset=utf-8'
            },
            processData: false,
            dataType: 'xml',
            data:cadenaXML2
        }).success(function(data){
            $http({
                method: 'POST',
                url: IPSERVER + 'rfcNET.asmx?',
                headers: {
                    'Content-Type': 'text/xml; charset=utf-8'
                },
                processData: false,
                dataType: 'xml',
                data: $scope.Get_XML()
            }).success(function (data) {
                $rootScope.loading.hide();
                $rootScope.httpRequest.successRedirect = 'menuPaletizar';
                console.log(data);
                var print = data.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
                console.log(print);
                $rootScope.mostrarRespuesta(true);
                var parser = new DOMParser();
                var docXml = parser.parseFromString(print, "text/xml");
                var jsonRespuesta = xml2json(docXml, '');
                var json = JSON.parse(jsonRespuesta);
                console.log(json);
                var E_MATERIALDOCUMENT_PALLET = "";
                try {
                    if (docXml.getElementsByTagName("E_MATERIALDOCUMENT_PALLET")[0].firstChild != null && docXml.getElementsByTagName("E_MATERIALDOCUMENT_PALLET")[0].firstChild != undefined) {
                        E_MATERIALDOCUMENT_PALLET = docXml.getElementsByTagName("E_MATERIALDOCUMENT_PALLET")[0].firstChild.nodeValue;
                    }
                } catch (e) {

                }
                var E_MBLNR_311_PALLET = "";
                try {
                    if (docXml.getElementsByTagName("E_MBLNR_311_PALLET")[0].firstChild != null && docXml.getElementsByTagName("E_MBLNR_311_PALLET")[0].firstChild != undefined) {
                        E_MBLNR_311_PALLET = docXml.getElementsByTagName("E_MBLNR_311_PALLET")[0].firstChild.nodeValue;
                    }
                } catch (e) {

                }
                var E_MBLNR_541_PALLET = "";
                try {
                    if (docXml.getElementsByTagName("E_MBLNR_541_PALLET")[0].firstChild != null && docXml.getElementsByTagName("E_MBLNR_541_PALLET")[0].firstChild != undefined) {
                        E_MBLNR_541_PALLET = docXml.getElementsByTagName("E_MBLNR_541_PALLET")[0].firstChild.nodeValue;
                    }
                } catch (e) {

                }
                var PEDIDO_PALLET = '';
                try {
                    if (docXml.getElementsByTagName("PEDIDO_PALLET")[0].firstChild != null && docXml.getElementsByTagName("PEDIDO_PALLET")[0].firstChild != undefined) {
                        PEDIDO_PALLET = docXml.getElementsByTagName("PEDIDO_PALLET")[0].firstChild.nodeValue;
                    }
                } catch (e) {

                }
                var MESSAGE = "";
                try {
                    if (docXml.getElementsByTagName("MESSAGE")[0].firstChild != null && docXml.getElementsByTagName("MESSAGE")[0].firstChild != undefined) {
                        MESSAGE = docXml.getElementsByTagName("MESSAGE")[0].firstChild.nodeValue;
                    }
                } catch (e) {

                }
                var messages = [];
                try {
                    angular.forEach(json['soap:Envelope']['soap:Body'].ZMOV_20032Response.ZMOV_20032Result.LT_LOG.ZMOV_20032_LT_LOG, function (v, k) {
                        //(!isNaN(k))?document.getElementById('ERROR').innerHTML += '<h1>ERROR '+aux+': </h1><p>'+v.MESSAGE+'</p>':(k==='MESSAGE')?document.getElementById('ERROR').innerHTML += '<h1>ERROR : </h1><p>'+v+'</p>':'nada';
                        //  aux++;
                        //(!isNaN(k))?v.MESSAGE:(k=='MESSAGE')?v:''
                        messages.push((!isNaN(k)) ? v.MESSAGE : (k == 'MESSAGE') ? v : '');
                    })
                } catch (e) { console.log(e) }
                var messagesHU = [];
                try {
                    angular.forEach(json['soap:Envelope']['soap:Body'].ZMOV_20032Response.ZMOV_20032Result.LT_LOG_HU.ZMOV_20032_LT_LOG_HU, function (v, k) {
                        //(!isNaN(k))?document.getElementById('ERROR').innerHTML += '<h1>ERROR '+aux+': </h1><p>'+v.MESSAGE+'</p>':(k==='MESSAGE')?document.getElementById('ERROR').innerHTML += '<h1>ERROR : </h1><p>'+v+'</p>':'nada';
                        //  aux++;
                        //var algo = (!isNaN(k))?v.MESSAGE:(k==='MESSAGE')?v:'';
                        messagesHU.push((!isNaN(k)) ? v.MSGV1 : (k == 'MSGV1') ? v : '');
                    })
                } catch (e) { console.log(e) }
                var mensaje = '<div class="contabilizar-text">';
                if ($scope.LT_HU_CABECERA[0].ZCONS_PALLET != 'X') {
                    mensaje += '<h1>Pedido Pallet: </h1> <p>' + (PEDIDO_PALLET) + '</p>';
                    mensaje += '<h1>Comp. Pallets Mov 541: </h1> <p>' + (E_MBLNR_541_PALLET) + '</p>';
                    mensaje += '<h1>Consumo Comp. Pallet Mov 543: </h1> <p>' + (E_MATERIALDOCUMENT_PALLET) + '</p>';
                    mensaje += '<h1>Traslado de Almacen Mov 311: </h1> <p>' + (E_MBLNR_311_PALLET) + '</p>';
                }
                if (messages.length > 0) {
                    for (var i = 0; i < messages.length; i++) {
                        if (messages[i] != '') {
                            mensaje += '<h1>Mensaje ' + (i + 1) + ': </h1> <p>' + messages[i] + '</p>';
                        }
                    }
                }
                if (messagesHU.length > 0) {
                    for (var i = 0; i < messagesHU.length; i++) {
                        if (messagesHU[i] != '') {
                            mensaje += '<h1>Mensaje HU ' + (i + 1) + ': </h1> <p>' + messagesHU[i] + '</p>';
                        }
                    }
                }
                //mensaje += '<h1>Mensaje: </h1> <p>' + + '</p>';
                mensaje += '<div></div><div></div> </div>';
                console.log(mensaje);
                document.getElementById('popRespuestaLotesPaking').innerHTML = mensaje;
                $rootScope.btnContinuar = "block";
                $('#cargandoPopLotesPaking').hide('fade');
                //$rootScope.alert.show({message:"Documento Material: "+(material.firstChild.nodeValue)+", Pedido: "+(pedido.firstChild.nodeValue)})
            }).error(function (data) {
                $rootScope.loading.hide();
                console.log(data);
            });
        }).error($rootScope.httpRequest.error);
    }
    $scope.generaXML = function(){
        if ($scope.alturaDestino==undefined || $scope.alturaDestino.VEGR4=="") {
            $rootScope.alert.show({ message: "Favor agregar Almacen" });
            return;
        }
        var almacen="";
        if($scope.LT_HU_CABECERA[0].LGORT==undefined){
            almacen=$scope.LT_HU_POSICION[0].LGORT;
        }
        var cadenaXML='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
                        <soapenv:Header/>\
                        <soapenv:Body>\
                           <tem:ZMOV_50001>\
                              <tem:datos>\
                                <tem:IS_HEADER_HU_DEST>\
                                  <tem:PACK_MAT>P200</tem:PACK_MAT>\
                                  <tem:HU_EXID>'+$rootScope.parseLotePallet($scope.folioDestino)+'</tem:HU_EXID>\
                                  <tem:EXT_ID_HU_2>REPA</tem:EXT_ID_HU_2>\
                                  <tem:CONTENT></tem:CONTENT>\
                                  <tem:PACK_MAT_CUSTOMER></tem:PACK_MAT_CUSTOMER>\
                                  <tem:PACKAGE_CAT></tem:PACKAGE_CAT>\
                                  <tem:KZGVH></tem:KZGVH>\
                                  <tem:HU_GRP1></tem:HU_GRP1>\
                                  <tem:HU_GRP2></tem:HU_GRP2>\
                                  <tem:HU_GRP3></tem:HU_GRP3>\
                                  <tem:HU_GRP4>'+$scope.alturaDestino.VEGR4+'</tem:HU_GRP4>\
                                  <tem:HU_GRP5></tem:HU_GRP5>\
                                  <tem:LGORT_DS>'+(($scope.LT_HU_CABECERA.length==0)?$scope.LT_HU_CABECERA[0].LGORT:almacen)+'</tem:LGORT_DS>\
                                  <tem:MERCADO></tem:MERCADO>\
                                  <tem:TIP_BOLSA></tem:TIP_BOLSA>\
                                  <tem:TIP_PALLET></tem:TIP_PALLET>\
                                  <tem:CLAS_EXP></tem:CLAS_EXP>\
                                  <tem:CLIENT_ESP></tem:CLIENT_ESP>\
                               </tem:IS_HEADER_HU_DEST>\
                                 <tem:IV_EXIDV_DEST>'+$rootScope.parseLotePallet($scope.folioDestino)+'</tem:IV_EXIDV_DEST>\
                                 <tem:LT_ITEM_UNPACK>';
        angular.forEach($scope.LT_HU_POSICION,function(val,key){
            if(val.eliminaCaja){
                cadenaXML+='<tem:ZMOV_50001_LT_ITEM_UNPACK>\
                                <tem:EXIDV>'+val.EXIDV+'</tem:EXIDV>\
                                <tem:HU_ITEM_TYPE>1</tem:HU_ITEM_TYPE>\
                                <tem:HU_ITEM_NUMBER>'+val.VEPOS+'</tem:HU_ITEM_NUMBER>\
                                <tem:UNPACK_EXID></tem:UNPACK_EXID>\
                                <tem:MATERIAL>'+val.MATNR+'</tem:MATERIAL>\
                                <tem:BATCH>'+val.CHARG+'</tem:BATCH>\
                                <tem:PACK_QTY>'+val.ngModel+'</tem:PACK_QTY>\
                                <tem:BASE_UNIT_QTY_ISO>'+val.VEMEH+'</tem:BASE_UNIT_QTY_ISO>\
                                <tem:BASE_UNIT_QTY>'+val.VEMEH+'</tem:BASE_UNIT_QTY>\
                                <tem:PLANT>'+val.WERKS+'</tem:PLANT>\
                                <tem:STGE_LOC>'+almacen+'</tem:STGE_LOC>\
                                <tem:STOCK_CAT></tem:STOCK_CAT>\
                                <tem:SPEC_STOCK></tem:SPEC_STOCK>\
                                <tem:SP_STCK_NO></tem:SP_STCK_NO>\
                                <tem:MATERIAL_EXTERNAL></tem:MATERIAL_EXTERNAL>\
                                <tem:MATERIAL_GUID></tem:MATERIAL_GUID>\
                                <tem:MATERIAL_VERSION></tem:MATERIAL_VERSION>\
                             </tem:ZMOV_50001_LT_ITEM_UNPACK>';     
            }
        })
        cadenaXML+='    </tem:LT_ITEM_UNPACK>\
                        <tem:IT_EXIDV_ORI>';
        var arrNumPal=[];
        angular.forEach($scope.LT_HU_POSICION2,function(val,key){
            if(arrNumPal.indexOf(val.EXIDV)==-1){
                cadenaXML+='<tem:ZMOV_50001_IT_EXIDV_ORI>\
                                <tem:EXIDV>'+val.EXIDV+'</tem:EXIDV>\
                            </tem:ZMOV_50001_IT_EXIDV_ORI>\
                ';
                arrNumPal.push(val.EXIDV);
            }
        })
        cadenaXML+='        </tem:IT_EXIDV_ORI>\
                          </tem:datos>\
                       </tem:ZMOV_50001>\
                    </soapenv:Body>\
                 </soapenv:Envelope>';
        console.log(cadenaXML);
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml");
        console.log(docXml.firstChild);
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
            console.log(data)
            var print = data.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
            console.log(print);
            var parser = new DOMParser();
            var docXml = parser.parseFromString(print, "text/xml");
            var message= "";
            try{
                if(docXml.getElementsByTagName("MESSAGE")[0].firstChild != null && docXml.getElementsByTagName("MESSAGE")[0].firstChild != undefined){
                    message= docXml.getElementsByTagName("MESSAGE")[0].firstChild.nodeValue;
                }
            }catch(err){
                message="OK";
            }
            if(message!=""){
                if($scope.palletCompleto=="X"){
                    $scope.Send_XML(message);
                }else{
                    $rootScope.mostrarRespuesta(true);
                    $rootScope.loading.hide();
                }
                document.getElementById("cargandoPopLotesPaking").style.display="none";
                $rootScope.httpRequest.successRedirect="/menuPaletizar";
                var mensaje = '<div class="contabilizar-text">'+
                        '<h1>Mensaje: </h1> <p>' + (message) + '</p>';
                mensaje +='<div></div><div></div> </div>';
                
                $rootScope.LoadingMercados="none";
                $rootScope.btnContinuar="block";
                document.getElementById('popRespuestaLotesPaking').innerHTML = mensaje;
                
            }else{
                $rootScope.alert.show({message:"Repaletizaje realizado exitosamente"});
            }
            $rootScope.loading.hide();
            
        }).error($rootScope.httpRequest.error);
    }
})
