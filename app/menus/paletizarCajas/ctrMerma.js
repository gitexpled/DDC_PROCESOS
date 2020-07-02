//﻿angular.module('starter.controllersPaletizaje', [])

appExpled.lazyController('ctrMerma', function ($scope, $routeParams, $rootScope) {
    $scope.datosMerma ={
        material:'',
        kilos:''
    }
    $scope.listarMaterial=[];
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL,function(value,key){
        if(value.MTART=="FERT" && value.ZMAT_ESPECIE==$rootScope.dataSeleccion.especie.VALUE_CHAR){
            $scope.listarMaterial.push({MAKTG:value.MAKTG,MATNR:value.MATNR,KG:value.NTGEW});
        }
    })
    $scope.generaXML = function (){
        var jsonValidate=[
                {campo:"Material",value:$scope.datosMerma.material,type:"aSelect",index:"MATNR"},
                {campo:"Kilos",value:$scope.datosMerma.kilos,type:"input"},
            ];
        if(!$rootScope.validaForm(jsonValidate))return 0;
    }
})
