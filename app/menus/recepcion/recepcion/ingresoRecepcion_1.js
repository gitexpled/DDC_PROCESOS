appExpled.lazyController('ingresoRecepcion', function ($scope, $routeParams, $rootScope,$http) {
   
   $scope.verSelProductor = "none";
   $scope.verPopRespuesta = "none";
   $rootScope.totalNeto= "";
   $rootScope.kilosTotales =0;
   $scope.variedadOpciones=[];
   if($rootScope.new == true){
    $rootScope.datosGranel = {
            productor:[],
            detalle:[],
            LIFNR:[],
            BUDAT: '',
            HSDAT: '',
            MATERIAL: [],
            VARIEDAD: '',
            ZCUARTEL: '',
            ZPATENTE:'',
            ZCONDUCTOR:'',
            XBLNR: '',
            TRATAMIENTO:'',
            KILOS:'',
            ESPECIE:$rootScope.seleccionEspecie.DESCRIPTION,
            ZPREDIO:[],
            tipoBins:[],
            kilosBrutosCamion:'',
            kilosDestareCamion:'',
            CANTIDADBINS:'',
            LOTE:0,
            TIPOFRIO:'',
            observacion:'',
            fechaEntrada:'',
            fechaSalida:'',
        };
    }
   $scope.actualizaKilos = function(){
       if(isNaN($rootScope.datosGranel.kilosBrutosCamion)){
           if($rootScope.datosGranel.kilosBrutosCamion !=""){
                $rootScope.datosGranel.kilosBrutosCamion = "";
                $rootScope.alert.show({message:"Solo puede ingresar numeros en los Kilos Bruto Camion"});
                return 0;
            }
       }
       if(isNaN($rootScope.datosGranel.kilosDestareCamion)){
           if($rootScope.datosGranel.kilosDestareCamion!=""){
                $rootScope.datosGranel.kilosDestareCamion="";
                $rootScope.alert.show({message:"Solo puede ingresar numeros en los Kilos Destare Camion"});
                return 0;
           }
       }
       if(isNaN($rootScope.datosGranel.CANTIDADBINS) ){
           if($rootScope.datosGranel.CANTIDADBINS!=""){
                $rootScope.datosGranel.CANTIDADBINS ="";
                $rootScope.alert.show({message:"Solo puede ingresar numeros en los Kilos Destare Camion"});
                return 0;
           }
       }
       console.log($rootScope.datosGranel);
       var totalKilosBins = $rootScope.datosGranel.CANTIDADBINS*$rootScope.datosGranel.tipoBins.KILOS;
       var totalNeto = ($rootScope.datosGranel.kilosBrutosCamion-$rootScope.datosGranel.kilosDestareCamion-totalKilosBins).toFixed(2);
       if(totalNeto<0){
           $rootScope.kilosTotales= 0;
            $rootScope.alert.show({message:"El peso neto no puede ser inferior a 0"});
            return 0;
       }else{
           if(isNaN(totalNeto)){
                $rootScope.kilosTotales = 0;
           }else
                $rootScope.kilosTotales =totalNeto;
       }
       var t = $rootScope.formatNumber($rootScope.kilosTotales);
   $(function(){
    $("#KTotal").html("");
    $("#KTotal").html(String(t));
    })
    console.log(t)
   }
   $scope.selFechaContabilizacionOpciones = [
        { value: $scope.mostrarFecha(-6), name: $scope.mostrarFecha(-6) },
        { value: $scope.mostrarFecha(-5), name: $scope.mostrarFecha(-5) },
        { value: $scope.mostrarFecha(-4), name: $scope.mostrarFecha(-4) },
        { value: $scope.mostrarFecha(-3), name: $scope.mostrarFecha(-3) },
        { value: $scope.mostrarFecha(-2), name: $scope.mostrarFecha(-2) },
        { value: $scope.mostrarFecha(-1), name: $scope.mostrarFecha(-1) },
        { value: $scope.mostrarFecha(0), name: $scope.mostrarFecha(0) }
    ];
    $("#fechaCosecha").datepicker({ dateFormat: 'yy-mm-dd' });
    console.log($rootScope.ZMOV_QUERY_VARIEDAD);
    angular.forEach($rootScope.ZMOV_QUERY_VARIEDAD, function (value, key) {
       if(value.ATBEZ ===  $rootScope.seleccionEspecie.DESCRIPTION){
           $scope.variedadOpciones.push({DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR})
       }
    });
    
    $scope.listaTratamiento =[];
    angular.forEach($rootScope.ZMOV_QUERY_TRATAMIENTO, function (value, key) {
        $scope.listaTratamiento.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR });         
    });
    $scope.listaTipoFrio =[];
    angular.forEach($rootScope.ZMOV_QUERY_TIPO_FRIO, function (value, key) {
        $scope.listaTipoFrio.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR });         
    });
    $scope.materialesTipoBins = [];
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function (value, key) {
        if (//value.ZMAT_ESPECIE===$rootScope.datosExportadora.especie.DESCRIPTION
            value.ZMAT_VIGENTE==="SI" 
            &&value.ZMAT_PROCESO==="RECEPCION"
            &&value.ZMAT_TIPO === "DESTARE"
            ) {
                $scope.materialesTipoBins.push({ DESCRIPTION: value.MAKTG, VALUE_CHAR: value.MATNR ,KILOS:value.NTGEW}); 
				
            }        
    });
    $scope.materialesProductorOpciones =[];
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function (value, key) {
              if (
            value.ZMAT_ESPECIE===$rootScope.seleccionEspecie.DESCRIPTION
            &&value.ZMAT_VIGENTE==="SI" 
            &&value.ZMAT_PROCESO==="RECEPCION"
            &&value.ZMAT_FORMATO === "GRANEL"
            ) 
        {
            $scope.materialesProductorOpciones.push({ DESCRIPTION: value.MAKTG, VALUE_CHAR: value.MATNR });
        }
    });
    
    $scope.mostrarRespuesta = function (estado) {
        if (estado == true) {
            $scope.verPopRespuesta = "block";
            //$scope.verBtnFin = "none";
        } else {
            $scope.verPopRespuesta = "none";
            //$scope.verBtnFin = "block";
        }
    }
    $scope.listaProductores = [];
    var arrPrd =[];
    angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR, function (value, key) {
        if(true
                &&value.ZPRD_TIPO === "PRODUCTOR"
                && value.ZPRD_VIGENTE === "SI"
                &&value.ZPRD_ESPECIE=== $rootScope.seleccionEspecie.DESCRIPTION
            ){
            if(arrPrd.indexOf(value.NAME1)===-1){
                   $scope.listaProductores.push({text: value.NAME1,value:value.LIFNR,nombre:value.NAME1,LIFNR:value.LIFNR});
                   arrPrd.push(value.NAME1);
            }
        }
    });
    $(function () {
        $('#selProductor').immybox({
            choices: $scope.listaProductores
        });
    });
    $scope.showRecepcionesViewv = function(){
        $rootScope.listaCamionesRecepcionaAUX=[];
        var arguments = 'patente='+$rootScope.datosGranel.ZPATENTE+'&guia='+$rootScope.datosGranel.XBLNR+'&centro='+$rootScope.userData.centro+'&especie='+$rootScope.seleccionEspecie.DESCRIPTION+'&proceso=listaRecepcion';
        //console.log(arguments);
        var jsonUrl =  IPSERVER +  '/JSON_DB_RECEPCION.aspx?' + arguments;
        $http({
            method: 'GET',
            url: jsonUrl,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }).success(function(data){
            $rootScope.listaCamionesRecepcion=[];
            angular.forEach(data, function (value, key) {
                if ($rootScope.userData.centro == value.centro && value.especie == $rootScope.seleccionEspecie.DESCRIPTION) {
          
                    $rootScope.listaCamionesRecepcion.push(value.dataGranel);
                }
            });
            console.log($rootScope.listaCamionesRecepcion);
            $('#selectFormProductor').show();
            $('#formProductor').hide();
        }).error(function(data, status, headers, config){
            console.log(data);
        });        
    }
    $scope.showCamionViewv=function(){
        $rootScope.listaCamionesRecepcion=[];
        var arguments = 'patente='+$rootScope.datosGranel.ZPATENTE+'&guia='+$rootScope.datosGranel.XBLNR+'&centro='+$rootScope.userData.centro+'&especie='+$rootScope.seleccionEspecie.DESCRIPTION+'&proceso=listaRecepcion';
        var jsonUrl =  IPSERVER +  '/JSON_DB_RECEPCION.aspx?' + arguments;
        console.log(jsonUrl);
        if($rootScope.datosGranel.ZPATENTE===undefined){
            $rootScope.alert.show({message:"Seleccione patente"});
            return 0;
        }
        if($rootScope.datosGranel.XBLNR===undefined){
            $rootScope.alert.show({message:"Seleccione guía"});
            return 0;
        }
        var dg=[];
        dg = JSON.parse(JSON.stringify($rootScope.datosGranel))
        var listaCamionesRecepcionaAUX =[];
        $http({
        method: 'GET',
        url: jsonUrl,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
        }).success(function(data){
                angular.forEach(data, function (value, key) {
                        if (value.dataGranel.ZPATENTE !== $rootScope.datosGranel.ZPATENTE && value.dataGranel.ZPATENTE!='') {
                                listaCamionesRecepcionaAUX.push(JSON.parse(JSON.stringify(value.dataGranel)));
                        }
                });
                $rootScope.listaCamionesRecepcion=listaCamionesRecepcionaAUX;
                $rootScope.listaCamionesRecepcion.push(dg);
                $('#selectFormProductor').show();
                $('#formProductor').hide();

                $rootScope.getServicePost('DB_RECEPCION',$rootScope,'patente='+$rootScope.datosGranel.ZPATENTE+'&guia='+$rootScope.datosGranel.XBLNR+'&centro='+$rootScope.userData.centro+'&proceso=nuevaRecepcion&especie='+$rootScope.seleccionEspecie.DESCRIPTION+'&dataGranel='+encodeURI(JSON.stringify($rootScope.datosGranel)) ,null);
                $scope.actualizaKilos();
        }).error(function(data, status, headers, config){
            console.log(data);
        });
    };
    $scope.showSelectViewv=function(index){
        $('#selectFormProductor').hide();
        $('#formProductor').show();
        var dg=[];
        
        angular.forEach($rootScope.listaCamionesRecepcion, function (value, key) {
            //console.log(value.ZPATENTE,index);
            if (value.ZPATENTE === index) {
                dg= JSON.parse(JSON.stringify(value));
            }
        });
        $rootScope.datosGranel=dg;
        //console.log($rootScope.listaCamionesRecepcion);
        //console.log($rootScope.datosGranel);
        $rootScope.datoUsuario.dataGranel=JSON.stringify($rootScope.listaCamionesRecepcion);
        //$rootScope.getServicePost('DB_LOGIN',$rootScope,{User:$rootScope.datoUsuario.usuario,Pass:$rootScope.datoUsuario.clave,proceso:"setDataGranel",dataGranel:encodeURI(JSON.stringify($rootScope.listaCamionesRecepcion))} ,null);
        $rootScope.getServicePost('DB_RECEPCION',$rootScope,'patente='+$rootScope.datosGranel.ZPATENTE+'&guia='+$rootScope.datosGranel.XBLNR+'&centro='+$rootScope.userData.centro+'&dataGranel='+encodeURI(JSON.stringify($rootScope.listaCamionesRecepcion)) ,null)+'&proceso=nuevaRecepcion&especie='+$rootScope.seleccionEspecie.DESCRIPTION+'';
        $scope.actualizaKilos();
    };
    $scope.hideCamionViewv=function(){
        $('#selectFormProductor').hide();
        $('#formProductor').show();
        $rootScope.datoUsuario.dataGranel=JSON.stringify($rootScope.listaCamionesRecepcion);
        //$rootScope.getServicePost('DB_LOGIN',$rootScope,{User:$rootScope.datoUsuario.usuario,Pass:$rootScope.datoUsuario.clave,proceso:"setDataGranel",dataGranel:encodeURI(JSON.stringify($rootScope.listaCamionesRecepcion))} ,null);
        $rootScope.getServicePost('DB_RECEPCION',$rootScope,'patente='+$rootScope.datosGranel.ZPATENTE+'&guia='+$rootScope.datosGranel.XBLNR+'&centro='+$rootScope.userData.centro+'&dataGranel='+encodeURI(JSON.stringify($rootScope.listaCamionesRecepcion)) ,null)+'&proceso=nuevaRecepcion&especie='+$rootScope.seleccionEspecie.DESCRIPTION;
    
    };
    $scope.selPaletizaQuitar = function(data){
        $rootScope.getServicePost('DB_RECEPCION',$rootScope,'patente='+data.ZPATENTE+'&guia='+data.XBLNR+'&centro='+$rootScope.userData.centro+'&especie='+$rootScope.seleccionEspecie.DESCRIPTION+'&proceso=deleteRecepcion',null); 
        $rootScope.listaCamionesRecepcionaAUX=[];
        var arguments = 'centro='+$rootScope.userData.centro+'&proceso=listaRecepcion&especie='+$rootScope.seleccionEspecie.DESCRIPTION;
        var jsonUrl =  IPSERVER +  '/JSON_DB_RECEPCION.aspx?' + arguments;
        $rootScope.listaCamionesRecepcion =[];
        $http({
            method: 'GET',
            url: jsonUrl,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }).success(function(data){
            angular.forEach(data, function (value, key) {
                if ($rootScope.userData.centro == value.centro && value.especie == $rootScope.seleccionEspecie.DESCRIPTION) {
                    if(data.ZPATENTE !=value.dataGranel.ZPATENTE && data.XBLNR!=value.dataGranel.XBLNR)
                        $rootScope.listaCamionesRecepcion.push(JSON.parse(JSON.stringify(value.dataGranel)));
                }
            });
            $('#selectFormProductor').show();
            $('#formProductor').hide();
        }).error(function(data, status, headers, config){
            //console.log(data);
        })
    }
    $scope.mostrarProductores = function (estado) {
        if (estado == true) {
            $scope.verSelProductor = "block";
        } else {
            $scope.verSelProductor = "none";
        }
    }
    $scope.seleccionProductor = function () {
        angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR, function (value, key) {
            if (document.getElementById('selProductor').value == value.NAME1) {
                $rootScope.datosGranel.LIFNR={
                    VALUE_CHAR:value.LIFNR,
                    DESCRIPTION:value.NAME1,
                };
                $scope.getPredios();
            }
        });
        $scope.mostrarProductores(false);
        return;
    }
    $scope.getPredios=function(){
        $rootScope.listaPredio=[];//ZPRD_CSDP , NAME1=PRODUCTOR
        angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR, function (value, key) {
            if(true
                    &&value.NAME1 === $rootScope.datosGranel.LIFNR.DESCRIPTION
                ){

                if($scope.listaPredio.indexOf(value.ZPRD_SDP)===-1 && value.ZPRD_ESPECIE === $rootScope.seleccionEspecie.DESCRIPTION){
                       $scope.listaPredio.push({ DESCRIPTION: value.ZPRD_SDP,VALUE_CHAR:value.ZPRD_SDP,LIFNR:value.LIFNR,CSG:value.ZPRD_CSG})
                }
            }
        });
    }
    $scope.plp=function(){
        $rootScope.listaCuartel=[];
        angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR, function(value,key){
            if(true
                &&value.NAME1 === $rootScope.datosGranel.LIFNR.DESCRIPTION
                ){

                if($scope.listaPredio.indexOf(value.ZPRD_SDP)===-1 && value.ZPRD_ESPECIE === $rootScope.seleccionEspecie.DESCRIPTION){
                       $scope.listaCuartel.push({ DESCRIPTION: value.ZPRD_CSG,VALUE_CHAR:value.ZPRD_GGN,LIFNR:value.LIFNR})
                }
            }
        });
        //$rootScope.datosGranel.ZCUARTEL =$rootScope.datosGranel.ZPREDIO.CSG;
		
    }
    $scope.productorContinuear = function(){
        console.log($rootScope.seleccionEspecie.DESCRIPTION)
        var cam = $rootScope.datosGranel.kilosBrutosCamion;
        if($rootScope.datosGranel.LIFNR.VALUE_CHAR=="" || $rootScope.datosGranel.LIFNR.VALUE_CHAR == undefined){
            $rootScope.alert.show({message:"Campo PRODUCTOR se encuentra vacio"});//PRODUCTOR
        }
        else if($rootScope.datosGranel.ZPREDIO == ""){
            $rootScope.alert.show({message:"Campo PREDIO se encuentra vacio"});//PREDIO
        }
        else if($rootScope.datosGranel.BUDAT == ""){
            $rootScope.alert.show({message:"Campo FECHA CONTABILIZACION se encuentra vacio"});//FECHA_CONTABILIZACION
        }
        else if($rootScope.datosGranel.HSDAT == ""){
            $rootScope.alert.show({message:"Campo FECHA COSECHA se encuentra vacio"});//FECHA_COSECHA
        }
        /*else if($rootScope.datosGranel.MATERIAL == "" && $rootScope.seleccionEspecie.DESCRIPTION!="CEREZA"){
            $rootScope.alert.show({message:"Campo MATERIAL se encuentra vacio"});//MATERIAL
        }*/
        else if($rootScope.datosGranel.VARIEDAD === ""){
            console.log($rootScope.datosGranel.VARIEDAD);
            $rootScope.alert.show({message:"Campo VARIEDAD se encuentra vacio"});
        }
        else if($rootScope.datosGranel.XBLNR ==""){
             $rootScope.alert.show({message:"Campo GUIA DE DESPACHO se encuentra vacio"});//GUIA_DESPACHO
        }
        else if($rootScope.datosGranel.ZCONDUCTOR==""){
             $rootScope.alert.show({message:"Campo CONDUCTOR se encuentra vacio"});//CONDUCTOR
        }
        else if($rootScope.datosGranel.ZPATENTE==""){
             $rootScope.alert.show({message:"Campo PATENTE se encuentra vacio"});//PATENTE
        }
        else if($rootScope.datosGranel.TRATAMIENTO=="" && $rootScope.seleccionEspecie.DESCRIPTION!="CEREZA"){
             $rootScope.alert.show({message:"Campo TRATAMIENTO se encuentra vacio"});//TRATAMIENTO
        }
        else if($rootScope.datosGranel.TIPOFRIO=="" && $rootScope.seleccionEspecie.DESCRIPTION!="CEREZA"){
             $rootScope.alert.show({message:"Campo TIPO DE FRIO se encuentra vacio"});//TIPOFRIO
        }
        else if($rootScope.datosGranel.LOTE=="" && $rootScope.seleccionEspecie.DESCRIPTION!="CEREZA"){
            $rootScope.alert.show({message:"Debe imprimir la etiqueta para generar el número de lote"});//LOTE
        }
        /*else if($rootScope.datosGranel.kilosBrutosCamion< 0 ||$rootScope.datosGranel.kilosBrutosCamion==""){
             $rootScope.alert.show({message:"Campo KiLOS BRUTO CAMION no puede ser menor a 0"});//kilosBrutosCamion
        }
        else if($rootScope.datosGranel.kilosDestareCamion<=0 || $rootScope.datosGranel.kilosDestareCamion=="" || $rootScope.datosGranel.kilosDestareCamion>= cam){
             $rootScope.alert.show({message:"Campo KILOS DESTARE CAMION no puede se 0 o mayor o igual a KILOS BRUTO CAMION"});//kilosDestareCamion
        }
        else if($rootScope.datosGranel.CANTIDADBINS==""){
            $rootScope.alert.show({message:"Campo CANTIDAD DE BINS se encuentra vacio"});//BINS
        }
        else if($rootScope.datosGranel.tipoBins==""){
             $rootScope.alert.show({message:"Campo TIPO DE BINS se encuentra vacio"});//TIPO_BINS
        }*/
        else{
        var totalKilosBins = $rootScope.datosGranel.CANTIDADBINS*$rootScope.datosGranel.tipoBins.KILOS;
        $rootScope.resumenTotalNeto = ($rootScope.datosGranel.kilosBrutosCamion-$rootScope.datosGranel.kilosDestareCamion-totalKilosBins).toFixed(2);
        $rootScope.QUANTITY = ($rootScope.resumenTotalNeto/$rootScope.datosGranel.CANTIDADBINS).toFixed(2);
        if($rootScope.seleccionEspecie.VALUE_CHAR != "CIRUELA"){
            $rootScope.goToPage('/recepcionGranel',{animation:"fadeInRight"});
        }else    
            $rootScope.goToPage('/resumenRecepcionEspecie',{animation:"fadeInRight"});
    }
    };
    $scope.bluetoothopen = function(){
        $rootScope.displayBt = "";
    };
    $scope.hideBluetooth = function(){
        $rootScope.displayBt = "none";
    }
    $scope.btGetKilos= function(tipo){
        if(APPMOVIL){
            if(tipo === "camion"){
                $rootScope.datosGranel.kilosBrutosCamion = appConfig.blueTooth.data;
            }else{
                $rootScope.datosGranel.kilosDestareCamion= appConfig.blueTooth.data;
            }
        }
    }
})
appExpled.lazyController('recepcionGranel', function ($scope, $routeParams, $rootScope) {
    $scope.accion = "new";
    $rootScope.idxTab = 0;
    $rootScope.countTab = 0;
    $rootScope.datosGranel.KILOSBRUTO=0;
    $scope.CerezaCamion={
       view: "none",
       Camion:"NO",
       viewCam: "none",
       KILOS: "KILOS",
       bins:"none",
       RBines:"NO"
   };
   $rootScope.datosGranel.DetalleBase = {
            id:$rootScope.countTab,
            KILOSBRUTO: 0,
            selCantidadGranel:0,
            selTipoMaterialGranel:'',
            selTipoMaterialGranel2:'',
            Destare2:'',
            sumaNeto: 0.0,
            restaNeto: 0.0,
            totalNeto: 0.0,
            TotalNeto:0.0
   }
   $scope.AddItem = function(){
       $rootScope.datosGranel.detalle.push(JSON.parse(JSON.stringify($rootScope.datosGranel.DetalleBase)));
         console.log($rootScope.datosGranel.detalle);
   }
   if($rootScope.seleccionEspecie.DESCRIPTION == "CEREZA"){
        $scope.CerezaCamion.view = "block";
    }
    $scope.Chnge = function(){
        if($scope.CerezaCamion.Camion == "SI"){
            $scope.CerezaCamion.viewCam = "block";
            $scope.CerezaCamion.bins = "block";
            $scope.CerezaCamion.KILOS = "Kilos Bruto Camion";
        } else if($scope.CerezaCamion.Camion == "NO"){
            $rootScope.datosGranel.kilosBrutosCamion = 0;
            $scope.CerezaCamion.viewCam = "none";
            $scope.CerezaCamion.bins = "none";
            $scope.CerezaCamion.KILOS = "KILOS";
        }
    };
   $rootScope.datosGranel.detalle=[];
   $scope.AddItem();
   //$rootScope.datosGranel.detalle[0].totalNeto = $rootScope.datosGranel.detalle[0].BATCH - $rootScope.datosGranel.detalle[0].selCantidadGranel*43-$rootScope.datosGranel.detalle[0].selCantidadGranel2*2;
    //console.log($rootScope.ZMOV_QUERY_MATERIAL)
    $scope.materialesOpciones= [];
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL,function (value, key){
        if(value.ZMAT_TIPO=="DESTARE" && value.ZMAT_VIGENTE =="SI" && value.ZMAT_PROCESO=="RECEPCION")
        $scope.materialesOpciones.push({ DESCRIPTION: value.MATNR,VALUE_CHAR:value.MAKTG ,KILOS:value.NTGEW});
    });
    $scope.eliminarLoteGranel = function(id){
        var cont =0;
        var detalle = $rootScope.datosGranel.detalle;
        $rootScope.datosGranel.detalle = [];
        angular.forEach(detalle, function (value, key) {
            if(id != value.idx){
               ($rootScope.datosGranel.detalle).push(value);
               cont++;
            }
        })
        $rootScope.countTab = cont;
    }
    $scope.datosTabResumenGranel = function(){
        $rootScope.goToPage('/resumenRecepcionEspecie',{animation:"fadeInRight"});
    }
    $scope.generaXML_Granel=function(){
		var cadenaXML='';
		cadenaXML+='\
		<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
   <soapenv:Header/>\
   <soapenv:Body>\
      <tem:ZMOV_CREATE_RECEP_GR_FRESCO>\
         <tem:datos>\
            <tem:HEADER>\
               <tem:BUKRS>DC01</tem:BUKRS>\
               <tem:EKORG>1000</tem:EKORG>\
               <tem:EKGRP>902</tem:EKGRP>\
               <tem:BSART>ZFRT</tem:BSART>\
               <tem:BUDAT>'+$rootScope.datosGranel.BUDAT+'</tem:BUDAT>\
               <tem:LIFNR>'+$rootScope.datosGranel.LIFNR.VALUE_CHAR+'</tem:LIFNR>\
               <tem:XBLNR>133</tem:XBLNR>\
               <tem:BKTXT>USUARIO</tem:BKTXT>\
            </tem:HEADER>\
            <tem:LOG>\
               <!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_GR_FRESCO_LOG>\
                  <tem:TYPE></tem:TYPE>\
                  <tem:ID></tem:ID>\
                  <tem:NUMBER>0</tem:NUMBER>\
                  <tem:MESSAGE></tem:MESSAGE>\
                  <tem:LOG_NO></tem:LOG_NO>\
                  <tem:LOG_MSG_NO>0</tem:LOG_MSG_NO>\
                  <tem:MESSAGE_V1></tem:MESSAGE_V1>\
                  <tem:MESSAGE_V2></tem:MESSAGE_V2>\
                  <tem:MESSAGE_V3></tem:MESSAGE_V3>\
                  <tem:MESSAGE_V4></tem:MESSAGE_V4>\
                  <tem:PARAMETER></tem:PARAMETER>\
                  <tem:ROW>0</tem:ROW>\
                  <tem:FIELD>0</tem:FIELD>\
                  <tem:SYSTEM></tem:SYSTEM>\
               </tem:ZMOV_CREATE_RECEP_GR_FRESCO_LOG>\
            </tem:LOG><tem:LT_CARACT>';
			angular.forEach($rootScope.datosGranel.detalle,function(value,key){
				cadenaXML+='<!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
                  <tem:MATERIAL>'+value.selTipoMaterialGranel.VALUE_CHAR+'</tem:MATERIAL>\
                  <tem:BATCH>'+value.BATCH+'</tem:BATCH>\
                  <tem:CHARACT>0</tem:CHARACT>\
                  <tem:VALUE_CHAR>2220</tem:VALUE_CHAR>\
               </tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>';
			});
            cadenaXML+='</tem:LT_CARACT><tem:LT_ITEMS>'; 
            angular.forEach($rootScope.datosGranel.detalle,function(value,key){
				cadenaXML+='<!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_ITEMS>\
                  <tem:STCK_TYPE></tem:STCK_TYPE>\
                  <tem:MATERIAL>'+value.selTipoMaterialGranel.VALUE_CHAR+'</tem:MATERIAL>\
                  <tem:BATCH>'+value.BATCH+'</tem:BATCH>\
                  <tem:QUANTITY>1000</tem:QUANTITY>\
                  <tem:PO_UNIT>KG</tem:PO_UNIT>\
                  <tem:HSDAT>'+$rootScope.datosGranel.HSDAT+'</tem:HSDAT>\
                  <tem:PLANT>DC02</tem:PLANT>\
                  <tem:STGE_LOC>PA03</tem:STGE_LOC>\
                  <tem:FREE_ITEM>0</tem:FREE_ITEM>\
                  <tem:ITEM_CAT>0</tem:ITEM_CAT>\
                  <tem:MOVE_BATCH></tem:MOVE_BATCH>\
               </tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_ITEMS>';
			});
			cadenaXML+='</tem:LT_ITEMS><tem:LT_ITEM_DEST>';
			angular.forEach($rootScope.datosGranel.detalle,function(value,key){
				cadenaXML+='<!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_ITEM_DEST>\
                  <tem:LFPOS>0</tem:LFPOS>\
                  <tem:MATERIAL>'+value.selTipoMaterialGranel.VALUE_CHAR+'</tem:MATERIAL>\
                  <tem:QUANTITY>'+value.selTipoMaterialGranel.selCantidadGranel2+'</tem:QUANTITY>\
                  <tem:PO_UNIT></tem:PO_UNIT>\
                  <tem:WERKS>0/tem:WERKS>\
                  <tem:LGORT>0</tem:LGORT>\
               </tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_ITEM_DEST>';
			});
			cadenaXML+='</tem:LT_ITEMS><tem:LT_ITEM_DEST>\
            </tem:LT_ITEM_DEST>\
         </tem:datos>\
      </tem:ZMOV_CREATE_RECEP_GR_FRESCO>\
   </soapenv:Body>\
</soapenv:Envelope>';
	$rootScope.loading.show();
	$http({
            method: 'POST',
            url: IPSERVER + '/JSON_' + servicio + '.aspx',
			//url: '/JSON_' + servicio + '.aspx?' + arguments,
            contentType: 'text/xml; charset=UTF-8',
            dataType: 'xml',
			data:cadenaXML
        }).success(function(data){
			$rootScope.loading.hide();
			console.log(data);
		}).error(function(data){
			$rootScope.loading.hide();
			console.log(data)
		});
	}  
    $scope.materialesOpciones2=[{DESCRIPTION:'TOTEM-2KG',VALUE_CHAR:'TOTEM-2KG',KILOS:'2'}];
    $scope.cambioNeto = function(){
        console.log($rootScope.datosGranel.kilosBrutosCamion);
        var DestareTotal=0;
        var KilosCamion = 0;
           angular.forEach($rootScope.datosGranel.detalle ,function(value,key){
            KilosCamion = value.KILOSBRUTO - $rootScope.datosGranel.kilosBrutosCamion;
            DestareTotal = value.selCantidadGranel*value.selTipoMaterialGranel.KILOS+value.selCantidadGranel2*value.Destare2.KILOS;
            value.TotalNeto = KilosCamion-DestareTotal;
            DestareTotal = (KilosCamion-DestareTotal)/value.selCantidadGranel;
            if (isNaN(DestareTotal)) {
                value.totalNeto =0;
            }else{
            value.totalNeto = DestareTotal.toFixed(2);
            }
        });
        
        
    };    
    $scope.showCamionView2 = function(){
        
    }
});
