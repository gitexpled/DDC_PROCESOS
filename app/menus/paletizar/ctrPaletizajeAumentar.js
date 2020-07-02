//﻿angular.module('starter.controllersPaletizaje', [])

appExpled.lazyController('ctrAumentarDigitar', function ($scope, $routeParams, $rootScope,$http) {
    $rootScope.datosPaletiza ={
        HUKEY:'',
        existente:'',
        numeroPallet:''
    }
    $scope.autocompletarCero = function(){
        if($scope.numeroPallet!=""){
            if($rootScope.parseLotePallet($scope.numeroPallet)!=0)
                $scope.numeroPallet = $rootScope.parseLotePallet($scope.numeroPallet);
            else{
                $rootScope.alert.show({message:"Solo números"});
                $scope.numeroPallet='';
            }
        }
    }
    
    $rootScope.mostrarRespuesta(false);
    $scope.buscarPallet = function(){
     $http({
            method: 'POST',
            url: IPSERVER+'/JSON_ZMOV_QUERY_HU_INFO.aspx?IR_EXIDV='+angular.uppercase($scope.numeroPallet),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout:500000
        }).success(function(datos){
            $rootScope.ZMOV_QUERY_HU_READ=datos;
            $rootScope.datosPaletiza.HUKEY=$scope.numeroPallet.toUpperCase();
            $rootScope.datosPaletiza.existente=datos;
            $rootScope.datosPaletiza.numeroPallet=$scope.numeroPallet.toUpperCase();
            $rootScope.datosPaletiza.numero= parseInt($scope.numeroPallet);
            if($rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA[0]!==undefined&&$rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA[0].EXIDV.toUpperCase()==$scope.numeroPallet.toUpperCase()){
                console.log($rootScope.ZMOV_QUERY_HU_READ.LT_HU_CABECERA)
                $rootScope.goToPage('aumentarLotes');
            }else{
                $rootScope.alert.show({message:"Codigo de Pallet no registrado"});
            }
        }).error($rootScope.httpRequest.error);
    }
    $scope.codearPalet = function () {
        cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text)         
            document.getElementById('numeroPallet').value = $rootScope.parseLotePallet(result.text);
            $scope.numeroPallet = $rootScope.parseLotePallet(result.text);
            $scope.$apply();
            $scope.buscarPallet();
        },
        function (error) {
            $rootScope.alert.show({message:"Error: "+error});
        }
      );
    }

})

appExpled.lazyController('ctrAumentarLotes', function ($scope, $routeParams, $rootScope,$http) {
    console.log(2)
    $scope.ctrVerVentanaSelect = 0;
    $scope.idxP = 0;
    $scope.stockVisible = { selA: 'block', selO: 'none', selNC: 'none' };
    $scope.estadoTabSel = { ok: 'inactivo', obj: '', no: '' };
    $scope.agregaPalet = function (dato) {
        /*var css = '';
        var ESTADO_REC = ' ';
        switch (dato.ESTADO_REC) {
            case 'A':
                css = 'ok';
                ESTADO_REC='A';
                break;
            case 'O':
                css = 'obj';
                ESTADO_REC='O';
                break;
            case '':
                css = 'sn';
                ESTADO_REC='X';
                break;
        }*/
        $rootScope.datosPaletiza.manual[$scope.idxP] = {
            idx: $scope.idxP,
            MATNR: dato.MATNR,//"FFA0303",
            WERKS: dato.WERKS,//"1050",
            LGORT: dato.LGORT,//"0001",
            CHARG: dato.CHARG,//"123",
            MEINS: dato.MEINS,//"CS",
            CLABS: dato.CLABS,//0,
            CALIBRE: dato.CALIBRE,
            PRODUCTOR_ET: dato.PRODUCTOR_ET,
            CINS: dato.CINS,//0,
            CSPEM: dato.CSPEM,//516,
            LIFNR: dato.LIFNR,//"0000007016",
            ESTADO_REC: 'A'//"" A O '',
        }
        $scope.idxP++;

    }

    $scope.cargarStockSelect = function () {
        var idxA = 0; $rootScope.datosPaletiza.selA = [];
        var idxO = 0; $rootScope.datosPaletiza.selO = [];
        var idxNC = 0; $rootScope.datosPaletiza.selNC = [];
        $rootScope.datosPaletiza.manual = [];
        angular.forEach($rootScope.ZMOV_QUERY_STOCK_ALMACEN, function (value, key) {
            if(value.ESPECIE!==$rootScope.dataSeleccion.especie.DESCRIPTION
                    )return;//console.log(value);
            if ('A' == value.ESTADO_REC || 1==1) {
                $rootScope.datosPaletiza.selA[idxA] = {
                    idx: idxA,
                    MATNR: value.MATNR,
                    WERKS: value.WERKS,
                    LGORT: value.LGORT,
                    CHARG: value.CHARG,
                    MEINS: value.MEINS,
                    CLABS: value.CLABS,
                    CINS: value.CINS,
                    CSPEM: value.CSPEM,
                    LIFNR: value.LIFNR,
                    ESTADO_REC: value.ESTADO_REC,
                    CALIBRE: value.CALIBRE,
                    PRODUCTOR_ET:value.PRODUCTOR_ET,
                    seleccionado: 'false'
                };
                idxA++;
            }
            if ('O' == value.ESTADO_REC || 1==1) {
                $rootScope.datosPaletiza.selO[idxO] = {
                    idx: idxO,
                    MATNR: value.MATNR,
                    WERKS: value.WERKS,
                    LGORT: value.LGORT,
                    CHARG: value.CHARG,
                    MEINS: value.MEINS,
                    CLABS: value.CLABS,
                    CALIBRE: value.CALIBRE,
                    CINS: value.CINS,
                    CSPEM: value.CSPEM,
                    LIFNR: value.LIFNR,
                    ESTADO_REC: value.ESTADO_REC,
                    seleccionado: 'false'
                }
                idxO++;
            }
            if ('' == value.ESTADO_REC|| 1==1) {
                $rootScope.datosPaletiza.selNC[idxNC] = {
                    idx: idxNC,
                    MATNR: value.MATNR,
                    WERKS: value.WERKS,
                    LGORT: value.LGORT,
                    CHARG: value.CHARG,
                    MEINS: value.MEINS,
                    CLABS: value.CLABS,
                    CINS: value.CINS,
                    CSPEM: value.CSPEM,
                    CALIBRE: value.CALIBRE,
                    LIFNR: value.LIFNR,
                    ESTADO_REC: value.ESTADO_REC,
                    seleccionado: false
                }
                idxNC++;
            }
        });
    }

    $scope.cargarStockSelect();

    $scope.verVentanaSelect1 = function () {
        $('#btnAlamcenSelect').removeClass('inactivo');
        $('#VentanStock').hide();
        $('#VentanaSelect').removeClass('animated fadeOutLeft');
        $('#VentanaSelect').show();
        $('#VentanaSelect').addClass('animated fadeInLeft');
        $('#btnAlmacenStock').addClass('inactivo');
        $scope.ctrVerVentanaSelect = 0;
    }

    $scope.verVentanaSelect2 = function () {
        $('#btnAlmacenStock').removeClass('inactivo');
        $('#VentanaSelect').hide();
        $('#VentanStock').removeClass('animated fadeOutLeft');
        $('#VentanStock').show();
        $('#VentanStock').addClass('animated fadeInLeft');
        $('#btnAlamcenSelect').addClass('inactivo');
        $scope.ctrVerVentanaSelect = 1;

        //console.log($rootScope.datosPaletiza)

    }

    $scope.verVentanaSelect1();


    $scope.paletizajeIngreso = function () {
        var existe = 0;
        angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
            if (angular.uppercase($scope.inSelLotesManual) == value.CHARG) {
                existe = 1
            }
        });
        if (existe == 0) {
            var busqueda = 0;
            $rootScope.ZMOV_QUERY_STOCK_ALMACEN=[];
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_STOCK_LOTE.aspx?LOTE='+angular.uppercase($scope.inSelLotesManual),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
               angular.forEach(data.STOCKLOTES, function (value, key) {
                   console.log(value)
                   if(value.WERKS==$rootScope.userData.centro &&
                       value.ESPECIE==$rootScope.dataSeleccion.especie.DESCRIPTION
                      //&& value.XHUPF!="X"
                      ){
                            $scope.agregaPalet(value);
                            busqueda++;
                       }else{
                           if(busqueda==0)
                                $scope.mostrarAlerta();
                       }
                $scope.inSelLotesManual = '';
               });
            }).error(function (error){
                $rootScope.alert.show({message:"Número de lote no valido"});
            })
        } else {
            $rootScope.alert.show({message:'Lote:' + angular.uppercase($scope.inSelLotesManual) + ' ta se encuentra agregado.'});
        }
    }
    $scope.mostrarAlerta = function(){
        $rootScope.alert.show({message:"Número de lote no asociado, verifique centro y XHUPF"});
    }
    $scope.selPaletizaQuitar = function (idx) {
        var auxidx = 0;
        $scope.datosPaletizaAux = [];
        $scope.datosPaletizaAux = $rootScope.datosPaletiza.manual;
        $scope.datosPaletiza.manual = [];
        $scope.idxP--;
        angular.forEach($scope.datosPaletizaAux, function (value, key) {
            if (idx != value.idx) {
                var css = '';
                switch (value.ESTADO_REC) {
                    case 'A':
                        css = 'ok';
                        break;
                    case 'O':
                        css = 'obj';
                        break;
                    case '':
                        css = 'sn';
                        break;
                }
                $rootScope.datosPaletiza.manual[auxidx] = {
                    idx: auxidx,
                    MATNR: value.MATNR,
                    WERKS: value.WERKS,
                    LGORT: value.LGORT,
                    CHARG: value.CHARG,
                    MEINS: value.MEINS,
                    CLABS: value.CLABS,
                    CINS: value.CINS,
                    CALIBRE: value.CALIBRE,
                    PRODUCTOR_ET:value.PRODUCTOR_ET,
                    CSPEM: value.CSPEM,
                    LIFNR: value.LIFNR,
                    ESTADO_REC: value.ESTADO_REC,
                    inLotePaletizar: value.inLotePaletizar
                }
                auxidx++;
            }
        });

    }

    $scope.limpiarCargaScaner = function () {
        $rootScope.datosPaletiza.manual = []
        $scope.idxP = 0;
    }

    $scope.verAlmacenOk = function () {
        $scope.stockVisible = { selA: 'block', selO: 'none', selNC: 'none' };
        $scope.estadoTabSel = { ok: 'inactivo', obj: '', no: '' };
    }

    $scope.verAlmacenObj = function () {
        $scope.stockVisible = { selA: 'none', selO: 'block', selNC: 'none' };
        $scope.estadoTabSel = { ok: '', obj: 'inactivo', no: '' };
    }
    $scope.verAlmacenNC = function () {
        $scope.stockVisible = { selA: 'none', selO: 'none', selNC: 'block' };
        $scope.estadoTabSel = { ok: '', obj: '', no: 'inactivo' };
    }

    $scope.filtroPaletiza = "TODOS";
    $scope.filtroPaletiza = "";
    $scope.fCHARG="";    
    $scope.fLIFNR="";
    $scope.fVARIEDAD="";
    $scope.fCALIBRE="";
    $scope.fMATNR="";
    $scope.fLGORT="";
    $scope.fCLABS="";
    


    $scope.continuarPelatizaPaso2 = function () {
        if ($scope.ctrVerVentanaSelect == 0) { // lote manuel
            //console.log($rootScope.datosPaletiza.manual)
            if (($rootScope.datosPaletiza.manual.length == 0) || ($rootScope.datosPaletiza.manual == null)) {
                $rootScope.alert.show({message:'Ingrese a lo menos un lote'});
                
                return 0;
            }
        }
        if ($scope.ctrVerVentanaSelect == 1) { // lote stock filtro
            var idx = 0;
            $rootScope.datosPaletiza.manual = [];
            angular.forEach($rootScope.datosPaletiza.selA, function (value, key) {
                if (value.seleccionado == true) {
                    $rootScope.datosPaletiza.manual[idx] = {
                        idx: idx,
                        MATNR: value.MATNR,
                        WERKS: value.WERKS,
                        LGORT: value.LGORT,
                        CHARG: value.CHARG,
                        MEINS: value.MEINS,
                        CALIBRE: value.CALIBRE,
                        PRODUCTOR_ET:value.PRODUCTOR_ET,
                        CLABS: value.CLABS,
                        CINS: value.CINS,
                        CSPEM: value.CSPEM,
                        LIFNR: value.LIFNR,
                        ESTADO_REC: value.ESTADO_REC,
                        seleccionado: true,
                        inLotePaletizar: 0
                    }
                    idx++;
                }
            });
            angular.forEach($rootScope.datosPaletiza.selO, function (value, key) {
                if (value.seleccionado == true) {
                    $rootScope.datosPaletiza.manual[idx] = {
                        idx: idx,
                        MATNR: value.MATNR,
                        WERKS: value.WERKS,
                        LGORT: value.LGORT,
                        CHARG: value.CHARG,
                        CALIBRE: value.CALIBRE,
                        PRODUCTOR_ET:value.PRODUCTOR_ET,
                        MEINS: value.MEINS,
                        CLABS: value.CLABS,
                        CINS: value.CINS,
                        CSPEM: value.CSPEM,
                        LIFNR: value.LIFNR,
                        ESTADO_REC: value.ESTADO_REC,
                        seleccionado: true,
                        inLotePaletizar: 0
                    }
                    idx++;
                }
            });
            angular.forEach($rootScope.datosPaletiza.selNC, function (value, key) {
                if (value.seleccionado == true) {
                    $rootScope.datosPaletiza.manual[idx] = {
                        idx: idx,
                        MATNR: value.MATNR,
                        WERKS: value.WERKS,
                        LGORT: value.LGORT,
                        CHARG: value.CHARG,
                        MEINS: value.MEINS,
                        CLABS: value.CLABS,
                        CINS: value.CINS,
                        CSPEM: value.CSPEM,
                        CALIBRE: value.CALIBRE,
                        PRODUCTOR_ET:value.PRODUCTOR_ET,
                        LIFNR: value.LIFNR,
                        ESTADO_REC: 'X',
                        seleccionado: true,
                        inLotePaletizar: 0
                    }
                    idx++;
                }
            });
            if (idx == 0) {
                $rootScope.alert.show({message:"Error: "+error});
                return 0;
            }
        }
        $scope.goToPage('aumentarCajas');

    }

    $scope.codearPalet = function () {
        cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text)         
            document.getElementById('inSelLotesManual').value = result.text;
            $scope.inSelLotesManual = result.text;
            $scope.paletizajeIngreso();
            $("#btnAlamcenSelect").click();
        },
        function (error) {
            $rootScope.alert.show({message:"Error: "+error});
        }
      );
    }
})

appExpled.lazyController('ctrAumentarCajas', function ($scope, $routeParams, $rootScope,$http) {
    $scope.HU_EXID = ($rootScope.datosPaletiza.existente.LT_HU_CABECERA[0].EXIDV);
    
    if ($rootScope.datosPaletiza.existente.LT_HU_CABECERA[0].STGE_LOC == '') {
        $scope.STGE_LOC = '----';
    } else {
        $scope.STGE_LOC = $rootScope.datosPaletiza.existente.LT_HU_CABECERA[0].STGE_LOC;
    }
    if ($rootScope.datosPaletiza.existente.LT_HU_CABECERA[0].HU_GRP5 == '' || $rootScope.datosPaletiza.existente.LT_HU_CABECERA[0].lenght==0) {
        $scope.HU_GRP5 = '----';
    }
    // estableser oculto
    $rootScope.mostrarRespuesta(false);

    $scope.countVerifica = 0;
    $scope.countRealizado = 0;

    $scope.aceptaPaletizarCajaEmbalada = function () {
        //document.getElementById('btnContinuar_').style.display = 'none';
        document.getElementById('popRespuestaEnvioFumigacion').innerHTML = '';
        $('#PROD_EnvioFumigacion').show();
        $rootScope.mostrarRespuesta(true);
        if ($rootScope.datoUsuario.idUsuario == "demo") {
            // stco OK
        } else {//$scope.pop.filtro
            // verificar stock disponible
            $scope.countVerifica = 0;
            $scope.countRealizado = 0;

            angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
                $scope.countVerifica++;
                //console.log($scope.countVerifica)
            });

            angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
                    var aux = $scope.verificaSaldo(value.CHARG, value.LGORT, value.idx);
            });

        }
    }

    $scope.verificaSaldo = function (CHARG, LGORT, idx) {
        //console.log(CHARG + " -*- " + LGORT)
        dataFactory.getDatos('ZMOV_QUERY_STOCK_ALMACEN', 'CHARG=' + CHARG + '&WERKS=' + $rootScope.datoUsuario.acopio)
            .success(function (datos) {
                //console.log(datos.STOCK_MCHB.length)
                for (i = 0; i < datos.STOCK_MCHB.length; i++) {
                    if (datos.STOCK_MCHB[i].LGORT == LGORT) {
                        $rootScope.datosPaletiza.manual[idx].CSPEM = datos.STOCK_MCHB[i].CSPEM;
                        //console.log(datos.STOCK_MCHB[i].CSPEM)
                        $scope.estadoObteniendo();
                        return 0;
                    }
                }
            })
            .error(function (datos) {
                $rootScope.mostrarRespuesta(false);
                $rootScope.alert.show({message:'No se puede conectar al servicio:ZMOV_QUERY_STOCK_ALMACEN '});
                return 0;
            })
    }

    $scope.estadoObteniendo = function () {
        $scope.countRealizado++;
        //console.log($scope.countRealizado +'>='+ $scope.countVerifica)
        if ($scope.countRealizado >= $scope.countVerifica) {
            // se actualizaron todos los saldos de stock

            //console.log($rootScope.datosPaletiza.manual);

            var estado = 0;

            angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
                    if (value.inLotePaletizar <= value.CSPEM) {
                        //console.log("OK Si existen saldos en todos los lotes se procede envio XML");
                        
                    } else {
                        //console.log("ya no hay disponible");
                        estado = -1;
                    }

            });

            if (estado == 0) {
                $scope.generaXML();
            } else {
                $rootScope.mostrarRespuesta(false);
                $rootScope.alert.show({message:'Ya no hay disponiblilidad de cajas en uno o mas lotes ingresados'});
            }


        }
    }

    $scope.generaXML = function () {
        var jsonValidate=[
                {campo:"Altura",value:$rootScope.datosPaletiza.altura,type:"aSelect",index:"VEGR4"},
            ];
        if(!$rootScope.validaForm(jsonValidate))return 0;
        $rootScope.httpRequest.successRedirect="menuPaletizar";
        $scope.mensaje="";
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '      <tem:ZMOV_CREATE_HU_PACK>';
        cadenaXML += '         <tem:datos>';
        cadenaXML += '            <tem:HUKEY>' + angular.uppercase($rootScope.datosPaletiza.numeroPallet) + '</tem:HUKEY>';
        cadenaXML += '            <tem:IT_ITEMPROPOSAL>';
        //               <!--Zero or more repetitions:-->
        var ValiAument = true;
        angular.forEach($rootScope.datosPaletiza.manual, function (value, key) {
            //if ($rootScope.varificaCero($rootScope.datosPaletiza.manual[value.idx].inLotePaletizar) > 0) {
                cadenaXML += '               <tem:ZMOV_CREATE_HU_PACK_IT_ITEMPROPOSAL>';
                cadenaXML += '                  <tem:HU_ITEM_TYPE>1</tem:HU_ITEM_TYPE>';
                cadenaXML += '                  <tem:LOWER_LEVEL_EXID></tem:LOWER_LEVEL_EXID>';
                cadenaXML += '                  <tem:PACK_QTY>' + $rootScope.varificaCero($rootScope.datosPaletiza.manual[value.idx].inLotePaletizar) + '</tem:PACK_QTY>';
                cadenaXML += '                  <tem:BASE_UNIT_QTY_ISO></tem:BASE_UNIT_QTY_ISO>';
                //cadenaXML += '                  <tem:BASE_UNIT_QTY>' + value.MEINS + '</tem:BASE_UNIT_QTY>';
                cadenaXML += '                  <tem:BASE_UNIT_QTY></tem:BASE_UNIT_QTY>';
                cadenaXML += '                  <tem:NUMBER_PACK_MAT>0</tem:NUMBER_PACK_MAT>';
                cadenaXML += '                  <tem:FLAG_SUPLMT_ITEM></tem:FLAG_SUPLMT_ITEM>';
                cadenaXML += '                  <tem:MATERIAL>' + value.MATNR + '</tem:MATERIAL>';
                cadenaXML += '                  <tem:BATCH>' + value.CHARG + '</tem:BATCH>';
                //cadenaXML += '                  <tem:PLANT>' + value.WERKS + '</tem:PLANT>';
                cadenaXML += '                  <tem:PLANT>'+$rootScope.userData.centro+'</tem:PLANT>';
                //cadenaXML += '                  <tem:STGE_LOC>' + value.LGORT + '</tem:STGE_LOC>';
                cadenaXML += '                  <tem:STGE_LOC>'+value.LGORT +'</tem:STGE_LOC>';
                cadenaXML += '                  <tem:STOCK_CAT></tem:STOCK_CAT>';
                cadenaXML += '                  <tem:SPEC_STOCK></tem:SPEC_STOCK>';
                cadenaXML += '                  <tem:SP_STCK_NO></tem:SP_STCK_NO>';
                cadenaXML += '                  <tem:NO_OF_SERIAL_NUMBERS>0</tem:NO_OF_SERIAL_NUMBERS>';
                cadenaXML += '                  <tem:MATERIAL_PARTNER></tem:MATERIAL_PARTNER>';
                cadenaXML += '                  <tem:EXPIRYDATE></tem:EXPIRYDATE>';
                cadenaXML += '                  <tem:GR_DATE></tem:GR_DATE>';
                cadenaXML += '                  <tem:MATERIAL_EXTERNAL></tem:MATERIAL_EXTERNAL>';
                cadenaXML += '                  <tem:MATERIAL_GUID></tem:MATERIAL_GUID>';
                cadenaXML += '                  <tem:MATERIAL_VERSION></tem:MATERIAL_VERSION>';
                cadenaXML += '               </tem:ZMOV_CREATE_HU_PACK_IT_ITEMPROPOSAL>';
                //cadenaXML += '                  <tem:PACK_QTY>' + value.inLotePaletizar + '</tem:PACK_QTY>';
           // }
          if ($rootScope.datosPaletiza.manual[value.idx].CLABS < $rootScope.datosPaletiza.manual[value.idx].inLotePaletizar && ValiAument == true) {
                            $rootScope.alert.show({message:'No puede aumentar cajas superando el stock'});      
                             ValiAument = false;
                    }
           if ($rootScope.datosPaletiza.manual[value.idx].inLotePaletizar <= 0 && ValiAument == true) {
                            $rootScope.alert.show({message: 'No puede aumentar en 0 o en numeros negativos'});      
                             ValiAument = false;
                    }
        });
                if (ValiAument == false) {
                    return 0;
                }


        cadenaXML += '            </tem:IT_ITEMPROPOSAL>';
        cadenaXML += '         </tem:datos>';
        cadenaXML += '      </tem:ZMOV_CREATE_HU_PACK>';
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
            $rootScope.loading.hide();
            //console.log(data);
            var print = data.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
            console.log(print);
            $rootScope.mostrarRespuesta(true);
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
            if(mensajeNum!=0){
                $scope.modificarAltura();
            }
            var mensaje = '<div class="contabilizar-text">';
            mensaje +='<h1>MESSAGE_V1: </h1> <p>' + (message) + '</p>';
            console.log(mensaje);
            $scope.mensaje= mensaje;
        //$rootScope.alert.show({message:"Documento Material: "+(material.firstChild.nodeValue)+", Pedido: "+(pedido.firstChild.nodeValue)})
            }).error(function(data){
                    $rootScope.loading.hide();
                    console.log(data);
            });

    }
    $scope.modificarAltura = function(){
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '      <tem:ZMOV_UPDATE_HU_HEADER>';
        cadenaXML += '      <tem:datos>';
        cadenaXML += '          <tem:HUCHANGED>';
        cadenaXML += '              <tem:CLIENT></tem:CLIENT>';
        cadenaXML += '              <tem:HU_ID></tem:HU_ID>';
        cadenaXML += '              <tem:HU_EXID></tem:HU_EXID>';
        cadenaXML += '              <tem:HU_EXID_TYPE></tem:HU_EXID_TYPE>';
        cadenaXML += '              <tem:SHIP_POINT></tem:SHIP_POINT>';
        cadenaXML += '              <tem:LOADING_POINT></tem:LOADING_POINT>';
        cadenaXML += '              <tem:TOTAL_WGHT>0</tem:TOTAL_WGHT>';
        cadenaXML += '              <tem:LOAD_WGHT>0</tem:LOAD_WGHT>';
        cadenaXML += '              <tem:TARE_WGHT>0</tem:TARE_WGHT>';
        cadenaXML += '              <tem:UNIT_OF_WT_ISO></tem:UNIT_OF_WT_ISO>';
        cadenaXML += '              <tem:UNIT_OF_WT></tem:UNIT_OF_WT>';
        cadenaXML += '              <tem:ALLOWED_WGHT>0</tem:ALLOWED_WGHT>';
        cadenaXML += '              <tem:MAX_UNIT_OF_WGHT_ISO></tem:MAX_UNIT_OF_WGHT_ISO>';
        cadenaXML += '              <tem:MAX_UNIT_OF_WGHT></tem:MAX_UNIT_OF_WGHT>';
        cadenaXML += '              <tem:TOTAL_VOL>0</tem:TOTAL_VOL>';
        cadenaXML += '              <tem:LOAD_VOL>0</tem:LOAD_VOL>';
        cadenaXML += '              <tem:TARE_VOL>0</tem:TARE_VOL>';
        cadenaXML += '              <tem:VOLUMEUNIT_ISO></tem:VOLUMEUNIT_ISO>';
        cadenaXML += '              <tem:VOLUMEUNIT></tem:VOLUMEUNIT>';
        cadenaXML += '              <tem:ALLOWED_VOL>0</tem:ALLOWED_VOL>';
        cadenaXML += '              <tem:MAX_VOL_UNIT_ISO></tem:MAX_VOL_UNIT_ISO>';
        cadenaXML += '              <tem:MAX_VOL_UNIT></tem:MAX_VOL_UNIT>';
        cadenaXML += '              <tem:NO_SIMILAR_PACK_MAT>0</tem:NO_SIMILAR_PACK_MAT>';
        cadenaXML += '              <tem:CREATED_BY></tem:CREATED_BY>';
        cadenaXML += '              <tem:CREATED_DATE></tem:CREATED_DATE>';
        cadenaXML += '              <tem:CREATED_TIME>00:00:00</tem:CREATED_TIME>';
        cadenaXML += '              <tem:CHANGED_BY></tem:CHANGED_BY>';
        cadenaXML += '              <tem:CHANGED_DATE></tem:CHANGED_DATE>';
        cadenaXML += '              <tem:CHANGED_TIME>00:00:00</tem:CHANGED_TIME>';
        cadenaXML += '              <tem:SORT_FLD></tem:SORT_FLD>';
        cadenaXML += '              <tem:HU_GRP1></tem:HU_GRP1>';
        cadenaXML += '              <tem:HU_GRP2></tem:HU_GRP2>';
        cadenaXML += '              <tem:HU_GRP3></tem:HU_GRP3>';
        cadenaXML += '              <tem:HU_GRP4>'+$rootScope.datosPaletiza.altura.VEGR4+'</tem:HU_GRP4>';
        cadenaXML += '              <tem:HU_GRP5></tem:HU_GRP5>';
        cadenaXML += '              <tem:PACK_MAT></tem:PACK_MAT>';
        cadenaXML += '              <tem:LENGHT>0</tem:LENGHT>';
        cadenaXML += '              <tem:WIDTH>0</tem:WIDTH>';
        cadenaXML += '              <tem:HEIGHT>0</tem:HEIGHT>';
        cadenaXML += '              <tem:UNIT_DIM_ISO></tem:UNIT_DIM_ISO>';
        cadenaXML += '              <tem:UNIT_DIM></tem:UNIT_DIM>';
        cadenaXML += '              <tem:STATUS_OBSOLET></tem:STATUS_OBSOLET>';
        cadenaXML += '              <tem:WGHT_TOL_HU>0</tem:WGHT_TOL_HU>';
        cadenaXML += '              <tem:VOL_TOL_HU>0</tem:VOL_TOL_HU>';
        cadenaXML += '              <tem:BASE_UOM_ISO></tem:BASE_UOM_ISO>';
        cadenaXML += '              <tem:BASE_UOM></tem:BASE_UOM>';
        cadenaXML += '              <tem:CONTENT></tem:CONTENT>';
        cadenaXML += '              <tem:PACK_MAT_TYPE></tem:PACK_MAT_TYPE>';
        cadenaXML += '              <tem:MAT_GRP_SM></tem:MAT_GRP_SM>';
        cadenaXML += '              <tem:PLANT></tem:PLANT>';
        cadenaXML += '              <tem:ITEM_CATEG></tem:ITEM_CATEG>';
        cadenaXML += '              <tem:SALESORG></tem:SALESORG>';
        cadenaXML += '              <tem:DC_CUSTOM_MAT></tem:DC_CUSTOM_MAT>';
        cadenaXML += '              <tem:LGTH_LOAD>0</tem:LGTH_LOAD>';
        cadenaXML += '              <tem:LGTH_LOAD_UNIT_ISO></tem:LGTH_LOAD_UNIT_ISO>';
        cadenaXML += '              <tem:LGTH_LOAD_UNIT></tem:LGTH_LOAD_UNIT>';
        cadenaXML += '              <tem:TRAVEL_TIME>0</tem:TRAVEL_TIME>';
        cadenaXML += '              <tem:TRAVEL_TIME_UNIT_ISO>0</tem:TRAVEL_TIME_UNIT_ISO>';
        cadenaXML += '              <tem:TRAVEL_TIME_UNIT></tem:TRAVEL_TIME_UNIT>';
        cadenaXML += '              <tem:DISTANCE>0</tem:DISTANCE>';
        cadenaXML += '              <tem:UNIT_OF_DIST_ISO></tem:UNIT_OF_DIST_ISO>';
        cadenaXML += '              <tem:UNIT_OF_DIST></tem:UNIT_OF_DIST>';
        cadenaXML += '              <tem:STGE_LOC></tem:STGE_LOC>';
        cadenaXML += '              <tem:WGHT_VOL_FIX></tem:WGHT_VOL_FIX>';
        cadenaXML += '              <tem:PACK_MAT_CAT></tem:PACK_MAT_CAT>';
        cadenaXML += '              <tem:EXT_ID_HU_2></tem:EXT_ID_HU_2>';
        cadenaXML += '              <tem:CNTRY_SHP_MAT_ISO></tem:CNTRY_SHP_MAT_ISO>';
        cadenaXML += '              <tem:CNTRY_SHP_MAT></tem:CNTRY_SHP_MAT>';
        cadenaXML += '              <tem:NATIONALITY_DRIVER_ISO></tem:NATIONALITY_DRIVER_ISO>';
        cadenaXML += '              <tem:NATIONALITY_DRIVER></tem:NATIONALITY_DRIVER>';
        cadenaXML += '              <tem:NAME_DRIVER></tem:NAME_DRIVER>';
        cadenaXML += '              <tem:NAME_CO_DRIVER></tem:NAME_CO_DRIVER>';
        cadenaXML += '              <tem:PACK_MAT_CUSTOMER></tem:PACK_MAT_CUSTOMER>';
        cadenaXML += '              <tem:PACK_MAT_OBJECT></tem:PACK_MAT_OBJECT>';
        cadenaXML += '              <tem:PACK_MAT_OBJ_KEY></tem:PACK_MAT_OBJ_KEY>';
        cadenaXML += '              <tem:HANDLE></tem:HANDLE>';
        cadenaXML += '              <tem:CONTAINER_STAT></tem:CONTAINER_STAT>';
        cadenaXML += '              <tem:WAREHOUSE_NUMBER></tem:WAREHOUSE_NUMBER>';
        cadenaXML += '              <tem:CLOSED_BOX></tem:CLOSED_BOX>';
        cadenaXML += '              <tem:FLAG_PACKG_LV_DANG_GOODS></tem:FLAG_PACKG_LV_DANG_GOODS>';
        cadenaXML += '              <tem:FLAG_PACKG_LV_PRINT></tem:FLAG_PACKG_LV_PRINT>';
        cadenaXML += '              <tem:HIGHER_LEVEL_HU></tem:HIGHER_LEVEL_HU>';
        cadenaXML += '              <tem:PACKG_INSTRUCT></tem:PACKG_INSTRUCT>';
        cadenaXML += '              <tem:L_PACKG_STATUS_HU></tem:L_PACKG_STATUS_HU>';
        cadenaXML += '              <tem:FLAG_NO_EXT_LABLE></tem:FLAG_NO_EXT_LABLE>';
        cadenaXML += '              <tem:PERMISS_WORKLOAD>0</tem:PERMISS_WORKLOAD>';
        cadenaXML += '              <tem:HU_STOR_LOC></tem:HU_STOR_LOC>';
        cadenaXML += '              <tem:PACK_MAT_NAME></tem:PACK_MAT_NAME>';
        cadenaXML += '              <tem:PACK_MAT_EXTERNAL></tem:PACK_MAT_EXTERNAL>';
        cadenaXML += '              <tem:PACK_MAT_GUID></tem:PACK_MAT_GUID>';
        cadenaXML += '              <tem:PACK_MAT_VERSION></tem:PACK_MAT_VERSION>';
        cadenaXML += '          </tem:HUCHANGED>';
        cadenaXML += '          <tem:HUKEY>'+angular.uppercase($rootScope.datosPaletiza.numeroPallet) +'</tem:HUKEY>';
        cadenaXML += '      </tem:datos>';
        cadenaXML += '      </tem:ZMOV_UPDATE_HU_HEADER>';
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
            $rootScope.loading.hide();
            //console.log(data);
            var print = data.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
            console.log(print);
            $rootScope.mostrarRespuesta(true);
            var parser = new DOMParser();
            var docXml = parser.parseFromString(print, "text/xml");
            var message= "";
            var mensajeNum=0;
            try{
                message= docXml.getElementsByTagName("TYPE")[0].childNodes[0].textContent;
                
            }catch (e){
                message ="OK";
            }
            try{
                mensajeNum = parseInt(message);
            }catch (e){
                mensajeNum =0;
            }
            var mensaje ='<h1>MENSAJE ALTURA: </h1> <p>' + (message) + '</p>';
            mensaje +='<div></div><div></div>';
            $scope.mensaje+= mensaje;
            console.log($scope.mensaje);
            document.getElementById('popRespuestaLotesPaking').innerHTML = $scope.mensaje;
            $('#cargandoPopLotesPaking').hide('fade');
            $rootScope.btnContinuar="block";
        //$rootScope.alert.show({message:"Documento Material: "+(material.firstChild.nodeValue)+", Pedido: "+(pedido.firstChild.nodeValue)})
            }).error(function(data){
                    $rootScope.loading.hide();
                    console.log(data);
            });
    }
    $scope.irMovimiento = function(mov){
       $rootScope.mostrarRespuesta(false); 
    }

})
