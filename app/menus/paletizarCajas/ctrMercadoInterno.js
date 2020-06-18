
appExpled.lazyController('ctrMercadoInterno', function ($scope, $routeParams, $rootScope) {
    $rootScope.datosMI = {
        selFechaContabilizacion:'',
        fechaEmbalagePakingTab:'',
        material:{MAKTG:'',MATNR:''},
        tipoEnvase:{MAKTG:'',MATNR:''},
        lotePacking:'',
        cantidadEnvase:'',
        kilos:''
    }
   $scope.listarMaterialFERT=[];
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL,function(value,key){
        if(value.MTART=="FERT" && value.ZMAT_ESPECIE==$rootScope.dataSeleccion.especie.VALUE_CHAR){
            $scope.listarMaterialFERT.push({MAKTG:value.MAKTG,MATNR:value.MATNR,KG:value.NTGEW});
        }
    })
    $scope.listarMaterialZVER=[];
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL,function(value,key){
        if(value.MTART=="ZVER" && value.ZMAT_ESPECIE==$rootScope.dataSeleccion.especie.VALUE_CHAR){
            $scope.listarMaterialZVER.push({MAKTG:value.MAKTG,MATNR:value.MATNR,KG:value.NTGEW});
        }
    })
    $scope.selFechaContabilizacionOpciones = [
        { value: $scope.mostrarFecha(-6), name: $scope.mostrarFecha(-6) },
        { value: $scope.mostrarFecha(-5), name: $scope.mostrarFecha(-5) },
        { value: $scope.mostrarFecha(-4), name: $scope.mostrarFecha(-4) },
        { value: $scope.mostrarFecha(-3), name: $scope.mostrarFecha(-3) },
        { value: $scope.mostrarFecha(-2), name: $scope.mostrarFecha(-2) },
        { value: $scope.mostrarFecha(-1), name: $scope.mostrarFecha(-1) },
        { value: $scope.mostrarFecha(0), name: $scope.mostrarFecha(0) }
    ];
    $("#fechaEmbalagePakingTab").datepicker({ dateFormat: 'yy-mm-dd' ,
    onSelect: function(dateText) {
        $rootScope.datosMI.fechaEmbalagePakingTab=dateText;
      }
    });
    $scope.embalajePakingContinuar = function(){
        var jsonValidate=[
                {campo:"Fecha Conatabolización",value:$rootScope.datosMI.selFechaContabilizacion,type:"aSelect",index:"value"},
                {campo:"Material",value:$rootScope.datosMI.material,type:"aSelect",index:"MATNR"},
                {campo:"Tipo Envase",value:$rootScope.datosMI.tipoEnvase,type:"aSelect",index:"MATNR"},
                {campo:"Fecha Embalaje",value:$rootScope.datosMI.fechaEmbalagePakingTab,type:"input"},
                {campo:"Kilos",value:$rootScope.datosMI.kilos,type:"input"},
                {campo:"Lote",value:$rootScope.datosMI.lotePacking,type:"input"},
            ];
        if(!$rootScope.validaForm(jsonValidate))return 0;
    }
})
