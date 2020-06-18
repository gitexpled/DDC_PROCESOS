appExpled.lazyController('numInspeccion', function ($scope, $rootScope, $http) {
   $rootScope.Inspeccion={
       numeroInspeccion:"",
       TODO:"",
       TablaInspeccion:[]
   };
   $scope.Continuar = function(){
       if($rootScope.Inspeccion.numeroInspeccion == ""){
            $rootScope.alert.show({message:"Debe ingresar una Inspección"});
        }else{   
       var envio = $rootScope.Inspeccion.numeroInspeccion.toUpperCase();
           var url='http://ddcprd.expled.cl/ddc/JSON_ZMOV_SAG_EXTRAE.aspx?EXIDV2='+envio;
            $http({
             method: 'POST',
                url: url,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
           })
            .success(function(data){
                if(data.IT_SAG.length == 0){
                    $rootScope.alert.show({message:"No se encontro ninguna inpeccion con: "+envio});  
                }
                else{
                     $rootScope.goToPage('/inspeccion',{animation:"fadeInRight"});
                     $rootScope.Inspeccion.TablaInspeccion= data.IT_SAG;
                      angular.forEach($rootScope.Inspeccion.TablaInspeccion, function(val,key){
                          if(val.VARIEDAD_ET==""){
                              val.VARIEDAD_ET = val.VARIEDAD;
                          }
                          val.envio="NO";
                      })
                 }

           })
            .error(function(){
                 $rootScope.alert.show({message:"No se encontro ninguna inpeccion con: "+envio});
            });
        }
   }
});
appExpled.lazyController('Inspeccion', function ($scope, $rootScope, $http) {
    $scope.eleccion = [{option:"USDA"},{option:"ORIGEN"},{option:"RECHAZADO"}]
    $scope.TODO = function(opt){
            angular.forEach($rootScope.Inspeccion.TablaInspeccion,function(val,key){
                val.envio = opt;
            });
    };
    angular.forEach($rootScope.Inspeccion.TablaInspeccion,function(valtabla,keytabla){
        valtabla.pais = "";
        if(valtabla.ZZPAIS_INSP1 !== ''){valtabla.pais +=$rootScope.paisarr[valtabla.ZZPAIS_INSP1]}
        if(valtabla.ZZPAIS_INSP2 !== ''){valtabla.pais +="-"+$rootScope.paisarr[valtabla.ZZPAIS_INSP2]}
        if(valtabla.ZZPAIS_INSP3 !== ''){valtabla.pais +="-"+$rootScope.paisarr[valtabla.ZZPAIS_INSP3]}
        if(valtabla.ZZPAIS_INSP4 !== ''){valtabla.pais +="-"+$rootScope.paisarr[valtabla.ZZPAIS_INSP4]}
        if(valtabla.ZZPAIS_INSP5 !== ''){valtabla.pais +="-"+$rootScope.paisarr[valtabla.ZZPAIS_INSP5]}
        if(valtabla.ZZPAIS_INSP6 !== ''){valtabla.pais +="-"+$rootScope.paisarr[valtabla.ZZPAIS_INSP6]}
        if(valtabla.ZZPAIS_INSP7 !== ''){valtabla.pais +="-"+$rootScope.paisarr[valtabla.ZZPAIS_INSP7]}
        if(valtabla.ZZPAIS_INSP8 !== ''){valtabla.pais +="-"+$rootScope.paisarr[valtabla.ZZPAIS_INSP8]}
        if(valtabla.ZZPAIS_INSP9 !== ''){valtabla.pais +="-"+$rootScope.paisarr[valtabla.ZZPAIS_INSP9]}
        if(valtabla.ZZPAIS_INSP10 !== ''){valtabla.pais +="-"+$rootScope.paisarr[valtabla.ZZPAIS_INSP10]}
    });
    $scope.Envio = function(){
         angular.forEach($rootScope.Inspeccion.TablaInspeccion,function(val,key){
		var cadenaXML='\
		<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
                    <soapenv:Header/>\
                    <soapenv:Body>\
                        <tem:ZMOV_UPDATE_HU_HEADER_N>\
                            <!--Optional:-->\
                            <tem:tipo>ESTADO</tem:tipo>\
                            <!--Optional:-->\
                             <tem:pallet>\
                            <!--Zero or more repetitions:-->\
                                <tem:string>'+val.EXIDV+'</tem:string>\
                            </tem:pallet>\
                             <!--Optional:-->\
                            <tem:valor>'+val.envio+'</tem:valor>\ \n\
                        </tem:ZMOV_UPDATE_HU_HEADER_N>\
                    </soapenv:Body>\
                 </soapenv:Envelope>';  
                       
        cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML);
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml");  
        console.log(docXml.firstChild);
		$rootScope.loading.show();
	$http({
            method: 'POST',
            url: IPSERVER + 'rfcNET.asmx?',
			//url: '/JSON_' + servicio + '.aspx?' + arguments,
            //contentType: 'text/xml; charset=utf-8',
			headers:{
				'Content-Type': 'text/xml; charset=utf-8'
			},
			processData: false,
            dataType: 'xml',
			data:cadenaXML
        })
        .success(function(data){
            console.log(data)
            $rootScope.loading.hide();
             $rootScope.alert.show({message:"Envio Correctamente del pallet: "+val.EXIDV});

           }).error(function(data){
			$rootScope.loading.hide();
			console.log(data);
		});  
            })
    }
});