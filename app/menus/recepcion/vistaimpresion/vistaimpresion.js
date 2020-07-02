appExpled.lazyController('vistaimpresion', function ($scope, $rootScope) {
          //var lote = $rootScope.datosGranel.LOTE;
          $scope.mostrar = "Mostrar";
          $scope.Diccionario = true;
          $scope.diccionario = function(){
              $scope.mostrar = "ocultar"
               $scope.Diccionario = !$scope.Diccionario;
               if($scope.Diccionario){$scope.mostrar = "Mostrar";}
          }
         $scope.Vista = function(){
    if(isNaN($("#W").val()) || $("#W").val() == "" ){
         $rootScope.alert.show({message:"El Ancho debe contener un Numero"});
     }else if(isNaN($("#H").val()) || $("#H").val() == ""){
         $rootScope.alert.show({message:"El Alto debe contener un Numero"});
     }else if($('#Nom').val() == ""){
         $rootScope.alert.show({message:"Deve ingresar un Nombre"});
     }
     else{
        appConfig.ZPL.ZPL = $("#CZPL").val();
        appConfig.ZPL.dpmm = $("#dpmn").val();
        appConfig.ZPL.width = $("#W").val(); 
        appConfig.ZPL.height = $("#H").val();
        appConfig.DatosZPL.Tamanio= $("#W").val()+"x"+$("#H").val();
        appConfig.DatosZPL.Derivado = $("#der").val();
        appConfig.DatosZPL.IpZebra = $("#Zebra").val();
        appConfig.ZPL.nombre =  $("#Nom").val();
       
        $rootScope.goToPage('/zpl',{animation:"fadeInRight"});
        }
    };
});
appExpled.lazyController('vista', function ($scope,$http, $rootScope) {
     $scope.name=  appConfig.ZPL.nombre;
        var index = 0;
        var baseUrl = 'http://api.labelary.com/v1/printers/' + appConfig.ZPL.dpmm + '/labels/' + appConfig.ZPL.width + 'x' + appConfig.ZPL.height + '/' + index + '/'+appConfig.ZPL.ZPL;  
        var url = baseUrl;
        document.getElementById('image').src = url;
       $scope.Envio = function(){
          $.ajax({
              type:"POST",
              url:"http://ddcqas.expled.cl/ddc/JSON_ZPL_SAVE.aspx?key="+encodeURI(appConfig.ZPL.ZPL)+"&w="+appConfig.ZPL.width+"&h="+appConfig.ZPL.height+"&d="+appConfig.ZPL.dpmm,
              dataType:"text",
              success:function(dato){ 
                    appConfig.DatosZPL.Ruta = url;
          
                   $http({
                    method: 'POST',
                    url: 'http://ddcqas.expled.cl/ddc/JSON_DB_ZPL.aspx?z='+appConfig.ZPL.ZPL+'&d='+appConfig.ZPL.dpmm+'&t='+appConfig.DatosZPL.Tamanio+'&i='+appConfig.DatosZPL.IpZebra+'&r='+appConfig.DatosZPL.Ruta+'&n='+appConfig.ZPL.nombre,
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    timeout:500000
                })
                        .success(function(data){
                    $rootScope.alert.show({message:data.resp});
                }).error($rootScope.httpRequest.error);
                      },
                      error:function(dato){ 

                      }
          });

      }
});

