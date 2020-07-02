appExpled.lazyController('ReImprimir', function ($scope, $routeParams, $rootScope, $http) {
    console.log(111);
 /*   $scope.printNewPDF = function (){
        
        myEl = angular.element(document.querySelector('#LOTE_FINAL'));
        myEl.text($rootScope.datosGranel.LOTE_FINAL);
        myEl = angular.element(document.querySelector('#XBLNR'));
        myEl.text($rootScope.datosGranel.XBLNR);
        myEl = angular.element(document.querySelector('rut'));
        myEl.text($rootScope.datosGranel.rut);
        myEl = angular.element(document.querySelector('#transporte'));
        myEl.text($rootScope.datosGranel.transporte);
        myEl = angular.element(document.querySelector('#ZCONDUCTOR'));
        myEl.text($rootScope.datosGranel.ZCONDUCTOR);
        myEl = angular.element(document.querySelector('#KILOSBRUTO'));
        myEl.text($rootScope.datosGranel.detalle[0].KILOSBRUTO);
        myEl = angular.element(document.querySelector('#kilosBrutosCamion'));
        myEl.text($rootScope.datosGranel.kilosBrutosCamion);
        myEl = angular.element(document.querySelector('rut2'));
        myEl.text($rootScope.datosGranel.rut);
        myEl = angular.element(document.querySelector('ZPATENTE'));
        myEl.text($rootScope.datosGranel.ZPATENTE);
        myEl = angular.element(document.querySelector('BUDAT'));
        myEl.text($rootScope.datosGranel.BUDAT.value);
        myEl = angular.element(document.querySelector('BUDAT2'));
        myEl.text($rootScope.datosGranel.BUDAT.value);
        myEl = angular.element(document.querySelector('tenvase1'));
        myEl.text($rootScope.datosGranel.selTipoMaterialGranel.DESCRIPTION);
        myEl = angular.element(document.querySelector('cenvase1'));
        myEl.text($rootScope.datosGranel.selCantidadGranel);
        myEl = angular.element(document.querySelector('tenvase2'));
        myEl.text($rootScope.datosGranel.Destare2.DESCRIPTION);
        myEl = angular.element(document.querySelector('cenvase2'));
        myEl.text($rootScope.datosGranel.selCantidadGranel2);
        myEl = angular.element(document.querySelector('totalNeto'));
        myEl.text($rootScope.datosGranel.detalle[0].totalNeto);
        myEl = angular.element(document.querySelector('KILOSNETO'));
        myEl.text( $rootScope.datosGranel.KILOSNETO);
        myEl = angular.element(document.querySelector('LIFNRD'));
        myEl.text($rootScope.datosGranel.LIFNR.DESCRIPTION);
        myEl = angular.element(document.querySelector('LIFNR'));
        myEl.text($rootScope.datosGranel.LIFNR.VALUE_CHAR);
        myEl = angular.element(document.querySelector('ESPECIE'));
        myEl.text($rootScope.datosGranel.ESPECIE);
        myEl = angular.element(document.querySelector('VARIEDAD'));
        myEl.text($rootScope.datosGranel.VARIEDAD.DESCRIPTION);
        myEl = angular.element(document.querySelector('observacion'));
        myEl.text($rootScope.datosGranel.observacion);
        console.log($('#printableArea').html());
        if (APPMOVIL) {
            $rootScope.print($('#printableArea').html());
        }
    }*/
    $scope.printNewZPL = function (){
        var zpl = "";
        var contNumLote = 0;
        console.log(LOTES );
        angular.forEach(LOTES , function (value, key) {
        //for (var i = 1; i <= $rootScope.datosGranel.CANTIDADLOTE; i++) {
            var dato = $rootScope.userData.zpl;
            dato = dato.split("{COD_PROD}").join(value.PRODUCTOR);
            dato = dato.split("{NOM_PROD}").join(value.NOMBRE_PRODUCTOR);
            dato = dato.split("{NOM_PROD2}").join(value.PRODUCTOR_ET);
            dato = dato.split("{SDP}").join("");
            dato = dato.split("{ENVASE}").join(value.DDC_NEN);
            dato = dato.split("{ESPECIE}").join(value.ESPECIE);
            dato = dato.split("{MATNR}").join(value.MATNR);
            dato = dato.split("{CSG}").join(value.SAG_CSG);
            dato = dato.split("{FECH_COSECHA}").join(value.FCOSECHA);
            dato = dato.split("{COD_VAR}").join(value.COD_VARIEDAD);
            dato = dato.split("{VARIEDAD}").join(value.VARIEDAD);
            dato = dato.split("*VALORREMPLAZO*").join(value.CHARG);
            zpl += dato + "^PQ1,0,1,Y^XZ";
        });
       
        
        var config={"ip":$rootScope.userData.ipZebra,"zpl":zpl};
        console.log(config);
        if(APPMOVIL){
           
            cordova.plugins.ZplWifiPrinter.print(config,successCallback,errorCallback);
        }
    }
    var LOTES = [];
    $rootScope.datosGranel = {
        PARTIDA : 0
    };
    var cod = 0;
    $scope.getDataLote = function(){
        var count = 0;
        cod++;
        var lote = $rootScope.datosGranel.PARTIDA+"-"+cod;
        if(cod < 10){
            lote = $rootScope.datosGranel.PARTIDA +"-0"+ cod;
        }
        console.log(IPSERVER + 'JSON_ZMF_MOV_QUERY_LOTE.aspx?IR_CHARG='+lote);
        $http({
            method: 'GET',
            url: IPSERVER + 'JSON_ZMF_MOV_QUERY_LOTE.aspx?IR_CHARG='+lote,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout:500000
        }).success(function (data) {
            console.log(data);
            angular.forEach(data.LT_QUERY_LOTE, function (value, key) {
                console.log(value);
                LOTES.push(value);
                count++;
				
            });
            if(count > 0){
                $scope.getDataLote();
            } else {
                $scope.printNewZPL();
            }
        }).error($rootScope.httpRequest.error);

        
    }
    $scope.alert = {
        show: false
    };
    $rootScope.print = function (html) {
        cordova.plugins.printer.print(html, { duplex: 'long' }, function (res) {
            //alert(res ? 'Done' : 'Canceled');
        });
    };
    $rootScope.successCallback = function(){
        alert("ok");
    };
    $rootScope.errorCallback = function(){
        alert("no ok");
    };
});
   
