appExpled.lazyController('SelectPrd', function ($scope, $rootScope, $http) {
    $scope.listaEspecies = [];
    angular.forEach($rootScope.ZMOV_QUERY_ESPECIE, function (value, key) {
        $scope.listaEspecies.push({ DESCRIPTION: value.ATNAM, VALUE_CHAR: value.ATNAM,ATBEZ:value.ATBEZ });         
    });
    $rootScope.Monitor = {
        Especie:"",
        Lote:""
    }
    $rootScope.Disponible = 0;
    $rootScope.MonitorPRD = "";
    $scope.Continuar = function(){
        //console.log(IPSERVER+'/JSON_ZDDCRP_PROCESO.ASPX?CHARG='+$rootScope.Monitor.Lote+'&MATNR=P-'+$rootScope.Monitor.Especie.DESCRIPTION)
        $http({
            method: 'POST',
            url: IPSERVER2+'/JSON_ZDDCRP_PROCESO.ASPX?CHARG='+$rootScope.Monitor.Lote+'&MATNR=P-'+$rootScope.Monitor.Especie.DESCRIPTION,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout:500000
        }).success(function(data){
            if(data.INGRESO_PROCESO.length <=0){
                $rootScope.alert.show({message:"No se encontro datos con la ESPECIE: "+$rootScope.Monitor.Especie.DESCRIPTION+" LOTE: "+$rootScope.Monitor.Lote}); 
            }else{
            console.log(data);
            $rootScope.MonitorPRD = data;
            //KILOS_DESCARTE
            $rootScope.MonitorPRD.EXPORT.KILOS_DESCARTE = $rootScope.MonitorPRD.EXPORT.KILOS_DESCARTE.replace(",",".");
            $rootScope.MonitorPRD.EXPORT.KILOS_DESCARTE = $rootScope.MonitorPRD.EXPORT.KILOS_DESCARTE*1;
            //KILOS_PROCESO
            $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO = $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO.replace(",",".");
            $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO = $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO*1;
            var num1 = $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO;
            $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO = $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
            $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO = $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO.split('').reverse().join('').replace(/^[\.]/,'');
            //KILOS_RESULTADO
            $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO = $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO.replace(",",".");
            $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO = $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO*1;
            var num2 = $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO;
            $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO = $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
            $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO = $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO.split('').reverse().join('').replace(/^[\.]/,'');
            //KILOS_DISPONIBLES
            $rootScope.Disponible = (num1 - num2);
            $rootScope.Disponible = $rootScope.Disponible.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
            $rootScope.Disponible = $rootScope.Disponible.split('').reverse().join('').replace(/^[\.]/,'');
             angular.forEach($rootScope.MonitorPRD.SALIDA_PROCESO,function(value,key){
                if(value.VARIEDAD_ET && value.VARIEDAD_ET!=='')value.showET=true;
                    else value.showETfalse;
            })
            angular.forEach($rootScope.MonitorPRD.INGRESO_PROCESO,function(value,key){
                value.ERFMG = value.ERFMG.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
                value.ERFMG = value.ERFMG.split('').reverse().join('').replace(/^[\.]/,'');
            })
            $rootScope.goToPage('/MenuProceso',{animation:"fadeInRight"});
        }
        }).error($rootScope.httpRequest.error);
    }
})
appExpled.lazyController('MonitorPRD', function ($scope, $rootScope,$interval,$http) {
    $rootScope.interval2 = $interval(function(){
     $http({
        method: 'POST',
        url: IPSERVER+'/JSON_ZDDCRP_PROCESO.ASPX?CHARG='+$rootScope.Monitor.Lote+'&MATNR=P-'+$rootScope.Monitor.Especie.DESCRIPTION,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        timeout:500000
    })
    .success(function(data){
        $rootScope.MonitorPRD = data;
            $rootScope.MonitorPRD.EXPORT.KILOS_DESCARTE = $rootScope.MonitorPRD.EXPORT.KILOS_DESCARTE.replace(",",".");
            $rootScope.MonitorPRD.EXPORT.KILOS_DESCARTE = $rootScope.MonitorPRD.EXPORT.KILOS_DESCARTE*1;
            $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO = $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO.replace(",",".");
            $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO = $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO*1;
            var num1 = $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO;
            $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO = $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
            $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO = $rootScope.MonitorPRD.EXPORT.KILOS_PROCESO.split('').reverse().join('').replace(/^[\.]/,'');
            $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO = $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO.replace(",",".");
            $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO = $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO*1;
            var num2 = $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO;
            $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO = $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
            $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO = $rootScope.MonitorPRD.EXPORT.KILOS_RESULTADO.split('').reverse().join('').replace(/^[\.]/,'');
            $rootScope.Disponible = (num1 - num2);
            $rootScope.Disponible = $rootScope.Disponible.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
            $rootScope.Disponible = $rootScope.Disponible.split('').reverse().join('').replace(/^[\.]/,'');
            
        //sfs
        angular.forEach($rootScope.MonitorPRD.SALIDA_PROCESO,function(value,key){
            if(value.VARIEDAD_ET && value.VARIEDAD_ET!=='')value.showET=true;
            else value.showETfalse;
        })
        angular.forEach($rootScope.MonitorPRD.INGRESO_PROCESO,function(value,key){
                value.ERFMG = value.ERFMG.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
                value.ERFMG = value.ERFMG.split('').reverse().join('').replace(/^[\.]/,'');
            })
    }).error($rootScope.httpRequest.error);
    console.log('1');
    },50000)  
})