appExpled.lazyController('ctrLogin', function ($scope, $location, $http, $rootScope,$sce,$routeParams) {
    $rootScope.header.set({display:'none'});
    $scope.logearce = function(accesoUsuario, accesoPassword) {
    	//INICIAR CAMARA
    	window.URL = window.URL || window.webkitURL;
    	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia ||
    	function() {
    	  alert('Su navegador no soporta navigator.getUserMedia().');
    	};
    	if(APPMOVIL){
	    	pictureSource=navigator.camera.PictureSourceType;
	        destinationType=navigator.camera.DestinationType;
            try{onDeviceReady();}catch(e){alert(e.message);};

            //CEAR FILESYSTEM
            //if(APPMOVIL)window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, createFileSystem,function(error){alert("create fail" + error.code);});
    	}
    	$rootScope.totalNeto = "none";
        $rootScope.loading.show();
        //($rootScope.userData.length===0)?
        $http({
            method: 'POST',
            url: IPSERVER+'JSON_DB_LOGIN.aspx?User='+accesoUsuario+'&Pass='+accesoPassword,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout:500000
        }).success(function(data){
            console.log(data)
            if(!data.idUsuario){
                $rootScope.alert.show({message:"Datos Incorrectos"});
                $rootScope.loading.hide();
                return false;
            }else{
                $rootScope.userData=data;
                //$rootScope.goToPage('/menuBase',{animation:"fadeInRight"});
                //$rootScope.loading.hide();
                $rootScope.switch_embalaje = true;
                console.log($rootScope.userData);
              $scope.obtenerDatos();
            }
        }).error($rootScope.httpRequest.error);
        $scope.obtenerDatos = function(){
            //json usuario
           $rootScope.ZMF_GET_USER=[];
           $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMF_GET_USER.aspx?I_UNAME='+angular.uppercase($rootScope.userData.usuario)+'&WERKS='+angular.uppercase($rootScope.userData.centro),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.ZMF_GET_USER=data.LT_DET_USER;
            }).error($rootScope.httpRequest.error);
            //json uat
           $rootScope.JSON_ZMF_GET_UAT=[];
           $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMF_GET_UAT.aspx',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.JSON_ZMF_GET_UAT=data.ET_AUT;
            }).error($rootScope.httpRequest.error);

            //json uat
           $rootScope.ZMF_GET_CENTRO_APP=[];
           $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMF_GET_CENTRO_APP.aspx?IR_WERKS='+$rootScope.ZMF_GET_USER.centro,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.ZMF_GET_CENTRO_APP=data.LT_DET_CENTRO_APP;
            }).error($rootScope.httpRequest.error);
            //json especies
            $rootScope.ZMOV_QUERY_ESPECIE=[];
           $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_ESPECIE.aspx',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.ZMOV_QUERY_ESPECIE=data.ESPECIE;
            }).error($rootScope.httpRequest.error);
            //json tipo frio
            $rootScope.ZMOV_QUERY_TIPO_FRIO=[];
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_TIPO_FRIO.aspx?ATKLA=DDC_TPF',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.ZMOV_QUERY_TIPO_FRIO=data.TIPO_FRIO;
            }).error($rootScope.httpRequest.error);
            //json tipo frio
            $rootScope.JSON_ZMOV_QUERY_HU_ALMACEN=[];
            $http({
                method: 'POST',
                url: IPSERVER+'JSON_ZMOV_QUERY_HU_ALMACEN.aspx',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.JSON_ZMOV_QUERY_HU_ALMACEN=data.HU_ALMACEN;
            }).error($rootScope.httpRequest.error);
            //json categoria
            $rootScope.CATEGORIA=[];
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_GRUPO_CATE.aspx?ATKLA=DDC_QUA',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.CATEGORIA=data.ET_CARCAT;
            }).error($rootScope.httpRequest.error);
            //json color
            $rootScope.COLOR=[];
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_GRUPO_CATE.aspx?ATKLA=DDC_COL',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.COLOR=data.ET_CARCAT;
            }).error($rootScope.httpRequest.error);
            //json TIPIFICACION
            $rootScope.TIPIFICACION=[];
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_GRUPO_CATE.aspx?ATKLA=DDC_TIP',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.TIPIFICACION=data.ET_CARCAT;
            }).error($rootScope.httpRequest.error);
            //json PLU
            $rootScope.PLU=[];
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_GRUPO_CATE.aspx?ATKLA=DDC_PLU',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.PLU=data.ET_CARCAT;
            }).error($rootScope.httpRequest.error);
            //json variedad
            $rootScope.ZMOV_QUERY_VARIEDAD=[];
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMF_GET_DAT_PROD.aspx',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.ZMOV_QUERY_VARIEDAD=data.ET_PROD_VAR;
            }).error($rootScope.httpRequest.error);
            //json dato adicional
            $rootScope.ZMOV_QUERY_HU_DATOADICIONAL=[];
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_HU_DATOADICIONAL.aspx',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.ZMOV_QUERY_HU_DATOADICIONAL=data;
            }).error($rootScope.httpRequest.error);
            //json tratamiento
            $rootScope.ZMOV_QUERY_TRATAMIENTO =[];
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_TRATAMIENTO.aspx?ATKLA=DDC_TRA',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.ZMOV_QUERY_TRATAMIENTO=data.TRATAMIENTO;
            }).error($rootScope.httpRequest.error);
             //json materiales
             $rootScope.ZMOV_QUERY_MATERIAL =[];
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_MATERIAL.aspx?MTART=ROH',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
				console.log(data)
                angular.forEach(data.MATERIALES, function (value, key) {
                   var jsonArg = new Object();
                   angular.forEach(value, function (value, key) {
                       jsonArg[key]=value;
                   });
                   $rootScope.ZMOV_QUERY_MATERIAL.push(jsonArg);
               });
            }).error($rootScope.httpRequest.error);
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_MATERIAL.aspx?MTART=ZVER',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
               angular.forEach(data.MATERIALES, function (value, key) {
                   var jsonArg = new Object();
                   angular.forEach(value, function (value, key) {
                       jsonArg[key]=value;
                   });
                $rootScope.ZMOV_QUERY_MATERIAL.push(jsonArg);
               });
            }).error($rootScope.httpRequest.error);
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_MATERIAL.aspx?MTART=FERT',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
               angular.forEach(data.MATERIALES, function (value, key) {
                   var jsonArg = new Object();
                   angular.forEach(value, function (value, key) {
                       jsonArg[key]=value;
                   });
                $rootScope.ZMOV_QUERY_MATERIAL.push(jsonArg);
               });
            }).error($rootScope.httpRequest.error);
			$http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_MATERIAL.aspx?MTART=FERT',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
               angular.forEach(data.MATERIALES, function (value, key) {
                   var jsonArg = new Object();
                   angular.forEach(value, function (value, key) {
                       jsonArg[key]=value;
                   });
                $rootScope.ZMOV_QUERY_MATERIAL.push(jsonArg);
               });
            }).error($rootScope.httpRequest.error);
			$rootScope.CLIENTE=[];
			console.log(IPSERVER+'/JSON_ZMOV_QUERY_GRUPO_CATE.aspx?ATKLA=DDC_CLI');
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_GRUPO_CATE.aspx?ATKLA=DDC_CLI',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.CLIENTE=data.ET_CARCAT;
                $scope.contadorRfc++;
                // $scope.validaAcceso();
            }).error($rootScope.httpRequest.error);
            
			$rootScope.CAR_DDC=[];
			console.log(IPSERVER+'/JSON_ZMOV_QUERY_GRUPO_CATE.aspx?ATKLA=CAR_DDC');
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_GRUPO_CATE.aspx?ATKLA=CAR_DDC',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.CAR_DDC=data.ET_CARCAT;
                $scope.contadorRfc++;
                // $scope.validaAcceso();
            }).error($rootScope.httpRequest.error);
            $rootScope.listaVar=[];
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_GRUPO_CATE.aspx?ATKLA=DDC_VAR',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.listaVar=data.ET_CARCAT;
                $scope.contadorRfc++;
                // $scope.validaAcceso();
            }).error($rootScope.httpRequest.error);
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_MATERIAL.aspx?MTART=UNBW',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
               angular.forEach(data.MATERIALES, function (value, key) {
                   var jsonArg = new Object();
                   angular.forEach(value, function (value, key) {
                       jsonArg[key]=value;
                   });
                $rootScope.ZMOV_QUERY_MATERIAL.push(jsonArg);
               });
                $scope.contadorRfc++;
               // $scope.validaAcceso();
            }).error($rootScope.httpRequest.error);
            //json productores
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMF_GET_DAT_PROD.aspx',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.ZMOV_QUERY_PRODUCTOR=data;
                $rootScope.loading.hide();
                $rootScope.goToPage('/menuBase',{animation:"fadeInRight"});
            }).error($rootScope.httpRequest.error);
            //json ZMOV_QUERY_COLOR
            $rootScope.ZMOV_QUERY_COLOR = [];
            $http({
                method: 'POST',
                url: IPSERVER+'JSON_ZMOV_QUERY_GRUPO_CATE.aspx?ATKLA=DDC_COL',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.ZMOV_QUERY_COLOR=data.ET_CARCAT;
                $rootScope.goToPage('/menuBase',{animation:"fadeInRight"});
            }).error($rootScope.httpRequest.error);
            //JSON CALIBRE
            $rootScope.ZMOV_QUERY_GRUPO_CATE= [];
            $http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_GRUPO_CATE.aspx?ATKLA=DDC_CAL',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.ZMOV_QUERY_GRUPO_CATE=data.ET_CARCAT;
                $rootScope.goToPage('/menuBase',{animation:"fadeInRight"});
            }).error($rootScope.httpRequest.error);
			$http({
                method: 'POST',
                url: IPSERVER+'/JSON_ZMOV_QUERY_GRUPO_CATE.aspx?ATKLA=DDC_CLI',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            }).success(function(data){
                $rootScope.loading.hide();
            }).error($rootScope.httpRequest.error);
        };
    }
});
