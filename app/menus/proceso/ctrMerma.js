//﻿angular.module('starter.controllersPaletizaje', [])

appExpled.lazyController('ctrMerma', function ($scope, $routeParams, $rootScope) {
    $scope.datosMerma ={
        material:'',
        kilos:'',
        selFechaContabilizacion:''
    }
    $rootScope.kiloInicial =$rootScope.dataSeleccion.totalKilo;
    $scope.controlDescarte = function(){
        var kilos = $rootScope.kiloInicial;
        if($scope.datosMerma.kilos=="" || $scope.datosMerma.kilos==0 || $scope.datosMerma.kilos==undefined){
            $rootScope.dataSeleccion.totalKilo = $rootScope.kiloInicial;
        }else{
            if(!isNaN($scope.datosMerma.kilos)){
                kilos=$rootScope.dataSeleccion.totalKilo-($scope.datosMerma.kilos);
                if(!isNaN(kilos)){
                    if(kilos>=0)
                        $rootScope.dataSeleccion.totalKilo = kilos.toFixed(3);
                    else{
                        $rootScope.alert.show({message:"Los kilos no pueden ser menor a cero"});
                        $scope.datosMerma.kilos=0;
                        $rootScope.dataSeleccion.totalKilo = $rootScope.kiloInicial;
                    }
                }else{
                    $rootScope.dataSeleccion.totalKilo = $rootScope.kiloInicial;
                }
            }else{
                $rootScope.dataSeleccion.totalKilo = $rootScope.kiloInicial;
            }
        }
    }
    $scope.mostrarRespuesta = function (estado) {
        if (estado == true) {
            $scope.verPopRespuesta = "block";
        } else {
            $scope.verPopRespuesta = "none";
        }
    }
    $scope.mostrarRespuesta(false);
    $scope.listarMaterial=[];
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL,function(value,key){
        if(value.MTART=="ROH" && 
          value.ZMAT_ESPECIE==$rootScope.dataSeleccion.especie.VALUE_CHAR
          && value.ZMAT_PROCESO=="MERMA"
          && value.ZMAT_VIGENTE=="SI"){
            $scope.listarMaterial.push({MAKTG:value.MAKTG,MATNR:value.MATNR,KG:value.NTGEW});
        }
    })
    $scope.selFechaContabilizacionOpciones = [
        { value: $scope.mostrarFecha(0), name: $scope.mostrarFecha2(0) }
    ];
    
    $scope.generaXML = function () {
        
        var jsonValidate=[
                {campo:"Material",value:$scope.datosMerma.material,type:"aSelect",index:"MATNR"},
                {campo:"Fecha Contabilización",value:$scope.datosMerma.selFechaContabilizacion,type:"aSelect",index:"value"},
                {campo:"Kilos",value:$scope.datosMerma.kilos,type:"input"},
            ];
        if(!$rootScope.validaForm(jsonValidate))return 0;
        $rootScope.blockReEnvio =1;

        document.getElementById('btnContinuar_').style.display = 'none';
        $scope.btnGeneraXML = 'none';
        document.getElementById('btnError').style.display = 'none';
        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '';
        $('#cargandoDatosSAP').show();
        $scope.mostrarRespuesta(true);
        var rfc = "";
        if ($rootScope.dataSeleccion.reembalaje) {
        rfc = "_R";
        }
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '    <soapenv:Header/>';
        cadenaXML += '    <soapenv:Body>';
        cadenaXML += '      <tem:ZMOV_CREATE_RECEP_PT_FRESCO'+rfc+'>';
        cadenaXML += '         <tem:datos>';
        cadenaXML += '            <tem:HEADER>';
        cadenaXML += '               <tem:BUKRS>' + $rootScope.userData.sociedad + '</tem:BUKRS>';
        cadenaXML += '               <tem:EKORG>' + $rootScope.userData.organizacion + '</tem:EKORG>';
        cadenaXML += '               <tem:EKGRP>' + $rootScope.userData.grupoCompra + '</tem:EKGRP>';
        cadenaXML += '               <tem:BSART>'+ $rootScope.userData.clasePedido+'</tem:BSART>';
        cadenaXML += '               <tem:BUDAT>'+ $scope.datosMerma.selFechaContabilizacion.value +'</tem:BUDAT>';
        cadenaXML += '               <tem:LIFNR>' + $rootScope.dataSeleccion.LIFNR + '</tem:LIFNR>';
        cadenaXML += '               <tem:XBLNR>'+$rootScope.dataSeleccion.loteProceso+'</tem:XBLNR>';
        cadenaXML += '               <tem:BKTXT>'+$rootScope.userData.usuario+'</tem:BKTXT>';
        cadenaXML += '            </tem:HEADER>';
        cadenaXML += '            <tem:LOG>';
        cadenaXML += '            </tem:LOG>';
        cadenaXML += '            <tem:LT_CARACT>';
        cadenaXML += '            </tem:LT_CARACT>';
        cadenaXML += '            <tem:LT_ITEMS>';
            cadenaXML += '               <tem:ZMOV_CREATE_RECEP_PT_FRESCO'+rfc+'_LT_ITEMS>';
            cadenaXML += '                  <tem:STCK_TYPE></tem:STCK_TYPE>';
            cadenaXML += '                  <tem:ITEM_CAT>L</tem:ITEM_CAT>';
            cadenaXML += '                  <tem:MATERIAL>' + $scope.datosMerma.material.MATNR+ '</tem:MATERIAL>';
            cadenaXML += '                  <tem:BATCH></tem:BATCH>';
            cadenaXML += '                  <tem:QUANTITY>' + $scope.datosMerma.kilos + '</tem:QUANTITY>';
            cadenaXML += '                  <tem:PO_UNIT>KG</tem:PO_UNIT>';
            cadenaXML += '                  <tem:HSDAT>' + $scope.datosMerma.selFechaContabilizacion.value + '</tem:HSDAT>';
            cadenaXML += '                  <tem:PLANT>' + $rootScope.userData.centro + '</tem:PLANT>';
            cadenaXML += '                  <tem:STGE_LOC>'+$rootScope.userData.almacenGranel+'</tem:STGE_LOC>';
            cadenaXML += '                  <tem:FREE_ITEM>X</tem:FREE_ITEM>';
            cadenaXML += '                  <tem:ITEM_CAT>L</tem:ITEM_CAT>';
            cadenaXML += '                  <tem:MOVE_BATCH></tem:MOVE_BATCH>';
            cadenaXML += '                  <tem:BATCH_GRANEL>'+angular.uppercase($rootScope.dataSeleccion.loteProceso)+'</tem:BATCH_GRANEL>';
            cadenaXML += '                  <tem:ACCTASSCAT>'+$rootScope.dataSeleccion.ACCTASSCAT+'</tem:ACCTASSCAT>';
            cadenaXML += '               </tem:ZMOV_CREATE_RECEP_PT_FRESCO'+rfc+'_LT_ITEMS>';
        cadenaXML += '            </tem:LT_ITEMS>';
        cadenaXML += '            <tem:LT_ITEM_DEST>';
        cadenaXML += '            </tem:LT_ITEM_DEST>';
        cadenaXML += '         </tem:datos>';
        cadenaXML += '      </tem:ZMOV_CREATE_RECEP_PT_FRESCO'+rfc+'>';
        cadenaXML += '   </soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';
        cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML)


        /// VALIDAR ENVIO POR USUARIO DEMO OFLINE
        if ($rootScope.userData.idUsuario != "demo") {
            var xmlhttp = new XMLHttpRequest();
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            xmlhttp.open('POST', IPSERVER +'/rfcNET.asmx', true);
            var sr = cadenaXML;
            xmlhttp.onreadystatechange = function () {
  
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        document.getElementById('btnContinuar_').style.display = 'block';
                        document.getElementById('loadingCajaEmabalda').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');
                        
                        var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
                        var xmlData = $.parseXML(print);
                        console.log(xmlData);
                        var mensajeRespuesta1;
                        var mensajeRespuesta2;
                        var mensajeRespuesta4;
                        try {
                            var thirdPartyNode = $(xmlData).find("E_MATERIALDOCUMENT")[0];
                             mensajeRespuesta4 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                            
                            var thirdPartyNode = $(xmlData).find("MATERIALDOCUMENT")[0];
                            mensajeRespuesta1 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                            
                            var thirdPartyNode = $(xmlData).find("PEDIDO")[0]; 
                            mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        } catch (e) {
                            mensajeRespuesta1 = '"No se generó documento material, favor consultar en SAP';
                        }

                        if (mensajeRespuesta1 == '<MATERIALDOCUMENT xmlns="http://tempuri.org/"/>') {
                            mensajeRespuesta1 = 'ERROR, No se generó documento material, favor consultar en SAP';
                        } 

                        var thirdPartyNode = $(xmlData).find("MESSAGE")[0]; //MESSAGE
                        var mensajeRespuesta3 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + mensajeRespuesta1 + '</p><h1>Material Document2:</h1> <p>' + mensajeRespuesta4 + '</p><h1>Pedido:</h1><p>' + mensajeRespuesta2 + '</p><h1>Mensaje:</h1><p>' + mensajeRespuesta3 + '</p></div>';
                        
                    }
                    if (xmlhttp.status == 500) {
                        document.getElementById('loadingCajaEmabalda').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');
                        document.getElementById('btnError').style.display = 'block';
                        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = 'El servidor rechazó recepción de datos!'
                        $rootScope.blockReEnvio = 0;
                    }
                } 
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
        } else {
            document.getElementById('loadingCajaEmabalda').style.display = 'none';
            document.getElementById('btnContinuar_').style.display = 'block';
            $('#cargandoDatosSAP').hide('fade');
            document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = "DATOS DEMOS CORRECTOS";
        }

    }
})
