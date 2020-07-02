//﻿angular.module('starter.controllersLoteNuevoPP', [])

starter.lazyController('ctrPPNuevo', function ($scope, $routeParams, $rootScope,dataFactory) {
    $('#PACK_AsignarLotes').addClass('animated ' + $routeParams.animacion);
     $scope.mostrarRespuesta = function (estado) {
        if (estado == true) {
            $scope.verPopRespuesta = "block";
        } else {
            $scope.verPopRespuesta = "none";
        }
    }
    // estableser oculto
    $scope.mostrarRespuesta(false);
    $scope.listaAsignado = [];
    var idxAsignado = 0;
    
    //EDIT MCN
    $scope.materialesPackingOpciones=[]
    //console.log($rootScope.datosExportadora.especie.DESCRIPTION);
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function (value, key) {
        if (//value.ZMAT_AGR_NAR=="SI" &&
            value.ZMAT_ESPECIE==$rootScope.datosExportadora.especie.DESCRIPTION&&
            //value.ZMAT_TIPO=="AGRUPACION"&&
            value.ZMAT_VIGENTE=="SI") {
            $scope.materialesPackingOpciones.push({ DESCRIPTION: value.MAKTG + '  ' + value.MATNR, VALUE_CHAR: value.MATNR , KILOS:value.NTGEW})
         }
    });
     
    $scope.materialesProductorOpciones=[]
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function (value, key) {
        if (
            //value.ZMAT_AGR_NAR=="SI" &&
            value.ZMAT_ESPECIE==$rootScope.datosExportadora.especie.DESCRIPTION&&
            //value.ZMAT_TIPO=="AGRUPACION"&&
            value.ZMAT_VIGENTE=="SI") {
            $scope.materialesProductorOpciones.push({ DESCRIPTION: value.MAKTG + '  ' + value.MATNR, VALUE_CHAR: value.MATNR , KILOS:value.NTGEW})
         }
    });
    
    var f = new Date();
    $scope.selFechaContabilizacionOpciones = [
        { value: $scope.mostrarFecha(-6), name: $scope.mostrarFecha2(-6) },
        { value: $scope.mostrarFecha(-5), name: $scope.mostrarFecha2(-5) },
        { value: $scope.mostrarFecha(-4), name: $scope.mostrarFecha2(-4) },
        { value: $scope.mostrarFecha(-3), name: $scope.mostrarFecha2(-3) },
        { value: $scope.mostrarFecha(-2), name: $scope.mostrarFecha2(-2) },
        { value: $scope.mostrarFecha(-1), name: $scope.mostrarFecha2(-1) },
        { value: $scope.mostrarFecha(0), name: $scope.mostrarFecha2(0) }
    ];
    $scope.fechaContabilizacionAgrupaLote="";
    $scope.referenciaAgrupaLote="";
    $scope.tipoMaterialPacking="";
    $scope.validaMaxKilosAcopio=function(index){
        if($scope.listaAsignado[index].kilosMax<$scope.listaAsignado[index].kilos){
                $scope.listaAsignado[index].kilos=0;
                $rootScope.mostrarAlerta(true, "Advertencia", "Kilos Maximos Permitidos " + ($scope.listaAsignado[index].kilosMax));
        }
        return;
        if($scope.listaAsignado[index].LGORTobj.kilos<$scope.listaAsignado[index].kilos){
                $scope.listaAsignado[index].kilos=0;
                $rootScope.mostrarAlerta(true, "Advertencia", "Kilos Maximos Permitidos " + ($scope.listaAsignado[index].LGORTobj.kilos));
        }
    }
    $scope.actualizaAcopioValue=function(index){
        $scope.listaAsignado[index].kilos=$scope.listaAsignado[index].LGORTobj.kilos;
        $scope.listaAsignado[index].LGORT=$scope.listaAsignado[index].LGORTobj.LGORT;
	}
    $scope.validaLotePack = function(index){
        //console.log($rootScope.stockLotes,$scope.listaAsignado[index].lote);
        $scope.listaAsignado[index].comboAcopio=[];
        $scope.listaAsignado[index].kilos='';
        $scope.listaAsignado[index].LGORT='A020';
        $scope.listaAsignado[index].MATNR='';

        $.each($rootScope.ZMOV_QUERY_STOCK_ALMACEN, function (key,value) {
            //console.log(value.CHARG,$scope.listaAsignado[index].lote);
            if(value.CHARG.toUpperCase()===$scope.listaAsignado[index].lote.toUpperCase()
               &&value.WERKS === $rootScope.datoUsuario.WERKS){
                //$scope.listaAsignado[index].kilos=value.CLABS //kilos
                //$scope.listaAsignado[index].LGORT=value.LGORT;
                //$('#codeLotePakingKilos'+index).val(value.CLABS)
                //$('#codeLotePakingLGORT'+index).val(value.LGORT)
                console.log(value.CLABS);
                $scope.listaAsignado[index].kilos=value.CLABS;
                $scope.listaAsignado[index].kilosMax=value.CLABS;
                $scope.listaAsignado[index].MATNR=value.MATNR;

                document.getElementById('codeLotePakingKilos'+index).value = value.CLABS;
                document.getElementById('codeLotePakingMATNR'+index).value = value.MATNR;

		        $scope.listaAsignado[index].comboAcopio.push({kilos:value.CLABS,LGORT:value.LGORT});
            }
        });
    }
    $scope.asignarLotesPaking = function () {
        //console.log("entra agrega bryan")
        $scope.listaAsignado[idxAsignado] = { id: idxAsignado, lote: '', tipoMaterial: $scope.tipoMaterialPacking,clasificacion:'',kilos:0,LGORT:'',comboAcopio:[] };
        idxAsignado++;
        $scope.totalLoteAsignadoPaking = idxAsignado;
        if(APPMOVIL)$scope.codearLote(idxAsignado-1);
    }
    $scope.remueveLotePaking = function (id) {
        //console.log("entra renueva")
        //console.log($scope.listaAsignado)
        //console.log(id);
        var idxAsignadoAux = 0;
        $scope.listaAsignadoAux = [];
        for (aux = 0; aux < idxAsignado; aux++) {
            if (id != $scope.listaAsignado[aux].id) {
                $scope.listaAsignadoAux[idxAsignadoAux] = {
                    id: idxAsignadoAux,
                    lote: $scope.listaAsignado[aux].lote,
                    tipoMaterial: $scope.listaAsignado[aux].tipoMaterial
                };
                idxAsignadoAux++;
            }
        }
        idxAsignado--;
        $scope.listaAsignado = [];
        $scope.listaAsignado = $scope.listaAsignadoAux;
        //console.log($scope.listaAsignado)
        $scope.totalLoteAsignadoPaking = idxAsignado;
    }

    
       $scope.recargaStock = function(){
       $rootScope.verLoading_(true, "Obteniendo datos...");
            //Stock sub cat
       $rootScope.ZMOV_QUERY_STOCK_ALMACEN=[];
       dataFactory.getDatos('ZMOV_QUERY_STOCK_ALMACEN','WERKS='+$rootScope.datoUsuario.WERKS)
       .success(function (datos) {
           angular.forEach(datos.STOCKLOTES, function (value, key) {
               var jsonArg = new Object();
               angular.forEach(value, function (value, key) {
                   jsonArg[key]=value;
               });
               $rootScope.ZMOV_QUERY_STOCK_ALMACEN.push(jsonArg);
           });
           //console.log("Obtiene variedades OK:");
           //$scope.preloadMsg = $scope.preloadMsg+ "<br>Obtiene variedades OK";
           document.getElementById('preloadMsg').innerHTML = document.getElementById('preloadMsg').innerHTML + "<br>ZMOV_QUERY_VARIEDAD OK";
           $scope.estadoObteniendo();
           //listarProductores(); >>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<
           //console.log($rootScope.ZMOV_QUERY_VARIEDAD)
       })
       .error(function (datos) {
           $rootScope.verLoading_(false, "");
           $rootScope.mostrarAlerta(true, 'Error', 'No se puede conectar al servicio: ZMOV_QUERY_VARIEDAD');
       })
            }
    $scope.codearProceso = function () {
        cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text)         
            document.getElementById('numeroLoteProcesoPaking').value = result.text;
            $scope.numeroLoteProcesoPaking = result.text;
        },
        function (error) {
            $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
        }
      );
    }


    $scope.codearLote = function (idx) {
        cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text)         
            document.getElementById('codeLotePaking'+idx).value = result.text;
            $scope.listaAsignado[idx].lote = result.text;
            $scope.validaLotePack(idx);
        },
        function (error) {
            $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
        }
      );
    }
    
     $scope.finalizarEnvioLotePakingEspecie = function () {
        if (idxAsignado > 0) {
            var jsonValidate=[
                {campo:"Lote Proceso",value:$scope.numeroLoteProcesoPaking,type:"input"},
                {campo:"Numero Referencia",value:$scope.referenciaAgrupaLote,type:"input"},
                {campo:"Fecha Contabilizacion",value:$scope.fechaContabilizacionAgrupaLote,type:"input"},
                {campo:"Lote ",value:$scope.listaAsignado,type:"array",index:"lote",subType:"input"},
                //{campo:"Tipo Material ",value:$scope.listaAsignado,type:"array",index:"tipoMaterial",subType:"aSelect",subIndex:"VALUE_CHAR"},
                {campo:"Acopio ",value:$scope.listaAsignado,type:"array",index:"LGORT",subType:"input"},
                {campo:"Kilos ",value:$scope.listaAsignado,type:"array",index:"kilos",subType:"input"},
            ]
           if(!$rootScope.validaForm(jsonValidate))return 0;
        }else{
            $rootScope.mostrarAlerta(true, "Advertencia", "Ingrese a lo menos un lote");
            return 0;
        }
        var tagEspecie=$rootScope.datosExportadora.especie.DESCRIPTION;
        var tagItemEspecie=$rootScope.datosExportadora.especie.DESCRIPTION;
        console.log($rootScope.datoUsuario)
        var cadenaXML ='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
                        <soapenv:Header/>\
                        <soapenv:Body>\
                           <tem:ZMOV_CREATE_AGRUPAPREP_'+tagEspecie+'>\
                              <tem:datos>\
                                 <tem:HEADER>\
                                    <tem:PSTNG_DATE>'+$scope.fechaContabilizacionAgrupaLote.value+'</tem:PSTNG_DATE>\
                                    <tem:DOC_DATE>'+$scope.fechaContabilizacionAgrupaLote.value+'</tem:DOC_DATE>\
                                    <tem:REF_DOC_NO>'+$scope.referenciaAgrupaLote+'</tem:REF_DOC_NO>\
                                    <tem:BILL_OF_LADING></tem:BILL_OF_LADING>\
                                    <tem:GR_GI_SLIP_NO></tem:GR_GI_SLIP_NO>\
                                    <tem:PR_UNAME></tem:PR_UNAME>\
                                    <tem:HEADER_TXT>'+$rootScope.datoUsuario.usuario+'</tem:HEADER_TXT>\
                                    <tem:VER_GR_GI_SLIP></tem:VER_GR_GI_SLIP>\
                                    <tem:VER_GR_GI_SLIPX></tem:VER_GR_GI_SLIPX>\
                                    <tem:EXT_WMS></tem:EXT_WMS>\
                                    <tem:REF_DOC_NO_LONG></tem:REF_DOC_NO_LONG>\
                                    <tem:BILL_OF_LADING_LONG></tem:BILL_OF_LADING_LONG>\
                                    <tem:BAR_CODE></tem:BAR_CODE>\
                                 </tem:HEADER>\
                                 <tem:ITEMS>';
         //'+$scope.listaAsignado[inx].tipoMaterial.VALUE_CHAR+'
        for (var inx = 0; inx < idxAsignado; inx++) {
            cadenaXML+='<tem:ZMOV_CREATE_AGRUPAPREP_'+tagEspecie+'_ITEMS>\
                        <tem:MATERIAL>'+$scope.listaAsignado[inx].MATNR+'</tem:MATERIAL>\
                        <tem:PLANT>' + $rootScope.datoUsuario.PLANT + '</tem:PLANT>\
                        <tem:STGE_LOC>' + $scope.listaAsignado[inx].LGORT + '</tem:STGE_LOC>\
                        <tem:BATCH>' + angular.uppercase($scope.listaAsignado[inx].lote) + '</tem:BATCH>\
                        <tem:MOVE_TYPE></tem:MOVE_TYPE>\
                        <tem:STCK_TYPE></tem:STCK_TYPE>\
                        <tem:SPEC_STOCK></tem:SPEC_STOCK>\
                        <tem:VENDOR></tem:VENDOR>\
                        <tem:CUSTOMER></tem:CUSTOMER>\
                        <tem:SALES_ORD></tem:SALES_ORD>\
                        <tem:S_ORD_ITEM>000000</tem:S_ORD_ITEM>\
                        <tem:SCHED_LINE>0000</tem:SCHED_LINE>\
                        <tem:VAL_TYPE></tem:VAL_TYPE>\
                        <tem:ENTRY_QNT>'+$scope.listaAsignado[inx].kilos+'</tem:ENTRY_QNT>\
                        <tem:ENTRY_UOM>KG</tem:ENTRY_UOM>\
                        <tem:ENTRY_UOM_ISO></tem:ENTRY_UOM_ISO>\
                        <tem:PO_PR_QNT>0</tem:PO_PR_QNT>\
                        <tem:ORDERPR_UN></tem:ORDERPR_UN>\
                        <tem:ORDERPR_UN_ISO></tem:ORDERPR_UN_ISO>\
                        <tem:PO_NUMBER></tem:PO_NUMBER>\
                        <tem:PO_ITEM>00000</tem:PO_ITEM>\
                        <tem:SHIPPING></tem:SHIPPING>\
                        <tem:COMP_SHIP></tem:COMP_SHIP>\
                        <tem:NO_MORE_GR></tem:NO_MORE_GR>\
                        <tem:ITEM_TEXT></tem:ITEM_TEXT>\
                        <tem:GR_RCPT></tem:GR_RCPT>\
                        <tem:UNLOAD_PT></tem:UNLOAD_PT>\
                        <tem:COSTCENTER></tem:COSTCENTER>\
                        <tem:ORDERID></tem:ORDERID>\
                        <tem:ORDER_ITNO>0000</tem:ORDER_ITNO>\
                        <tem:CALC_MOTIVE></tem:CALC_MOTIVE>\
                        <tem:ASSET_NO></tem:ASSET_NO>\
                        <tem:SUB_NUMBER></tem:SUB_NUMBER>\
                        <tem:RESERV_NO>0000000000</tem:RESERV_NO>\
                        <tem:RES_ITEM>0000</tem:RES_ITEM>\
                        <tem:RES_TYPE></tem:RES_TYPE>\
                        <tem:WITHDRAWN></tem:WITHDRAWN>\
                        <tem:MOVE_MAT>'+tagItemEspecie+'_PREPROCESO</tem:MOVE_MAT>\
                        <tem:MOVE_PLANT>' + $rootScope.datoUsuario.PLANT + '</tem:MOVE_PLANT>\
                        <tem:MOVE_STLOC>'+$scope.listaAsignado[inx].LGORT+'</tem:MOVE_STLOC>\
                        <tem:MOVE_BATCH>' + angular.uppercase($scope.numeroLoteProcesoPaking) + '</tem:MOVE_BATCH>\
                        <tem:MOVE_VAL_TYPE></tem:MOVE_VAL_TYPE>\
                        <tem:MVT_IND></tem:MVT_IND>\
                        <tem:MOVE_REAS>0000</tem:MOVE_REAS>\
                        <tem:RL_EST_KEY></tem:RL_EST_KEY>\
                        <tem:REF_DATE></tem:REF_DATE>\
                        <tem:COST_OBJ></tem:COST_OBJ>\
                     </tem:ZMOV_CREATE_AGRUPAPREP_'+tagEspecie+'_ITEMS>';
        }
        cadenaXML+='</tem:ITEMS>\
                    </tem:datos>\
                 </tem:ZMOV_CREATE_AGRUPAPREP_'+tagEspecie+'>\
              </soapenv:Body>\
           </soapenv:Envelope>';
        console.log(cadenaXML);
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml");  
        console.log(docXml.firstChild);
         var jsonXmlNodes=[
            {node:"MATERIALDOCUMENT309",h1:"Material Document 309"},
            {node:"MATERIALDOCUMENT541",h1:"Material Document 541"},
            //{node:"PEDIDO",h1:"Pedido"},
            {node:"MESSAGE",h1:"Message"}
         ];
        $rootScope.sendDataService(cadenaXML,$rootScope,$scope,jsonXmlNodes,dataFactory);
    }

})

