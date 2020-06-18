appExpled.lazyController('crtRecepPallet', function ($scope, $routeParams, $rootScope) {
  $scope.listaEspecies = [];
  angular.forEach($rootScope.ZMOV_QUERY_ESPECIE, function (value, key) {
    $scope.listaEspecies.push({
      DESCRIPTION: value.ATNAM,
      VALUE_CHAR: value.ATNAM,
      ATBEZ: value.ATBEZ
    });
  });
  $rootScope.dataSeleccionCaja = {
    loteProceso: ''
  }
  $scope.Continuar = function () {
    var jsonValidate = [{
      campo: "Lote Proceso",
      value: $rootScope.dataSeleccionCaja.especie,
      type: "aSelect",
      index: "VALUE_CHAR"
    },];

    if (!$rootScope.validaForm(jsonValidate)) return 0;
    $rootScope.goToPage('/palletProductor');
  }
})
appExpled.lazyController('menuBase', function ($scope, $routeParams, $rootScope) {
  $scope.acceso = function (value) {
    $rootScope.acceso = value;
    $rootScope.goToPage('/seleccionEspecie', {
      animation: "fadeInRight"
    });
  }
  var accesos = ['', 'proceso', 'recepcionPallet', 'etiquetas', 'servicio', 'paletizar', 'monitor'];

  if (accesos.indexOf($rootScope.userData.mail) > 0) {
    $scope.menuRecepcionGranel = "none";
    $scope.menuProceso = "none";
    $scope.inspeccion = "none";
    $scope.asignacion = "none";
    $scope.mantenedorEt = "none";
    $scope.paletizar = "none";
    $scope.monitor = "none";
    $scope.recepcionPallet = "none";
    $scope.repaletizar = "block";
    if ($rootScope.userData.mail == "proceso") {
      console.log($rootScope.userData.mail);
      $scope.menuProceso = "block";
    } else if ($rootScope.userData.mail == "recepcionPallet") {
      $scope.recepcionPallet = "block";
    } else if ($rootScope.userData.mail == "etiquetas") {
      $scope.mantenedorEt = "block"
    } else if ($rootScope.userData.mail == "servicio") {
      $scope.paletizar = "block";
      $scope.menuRecepcionGranel = "block";
      $scope.menuProceso = "block";
    } else if ($rootScope.userData.mail == "paletizar") {
      $scope.paletizar = "block";
    } else if ($rootScope.userData.mail == "monitor") {
      $scope.monitor = "block";
    }
  }
  $scope.cambiaMenu = function () {
    $rootScope.goToPage('/listaServicios');
  }
  $scope.cambiaMenu2 = function () {
    $rootScope.goToPage('/calidad');
  };
  $scope.Envio_reembalaje_Salida = function (x) {
    $rootScope.switch_embalaje = false;
    $rootScope.goToPage(x);
  }
  $scope.goToPageProceso = function(x){
    $rootScope.switch_embalaje = true;
    $rootScope.goToPage(x);
  }
})
appExpled.lazyController('seleccionEspecie', function ($scope, $routeParams, $rootScope) {
  $rootScope.totalNeto = "none";
  $scope.clienteSeleccion = "none";
  if ($rootScope.userData.mail == "servicio") {
    $scope.clienteSeleccion = "";
  }
  $scope.listaEspecies = [];
  angular.forEach($rootScope.ZMOV_QUERY_ESPECIE, function (value, key) {
    $scope.listaEspecies.push({
      DESCRIPTION: value.ATNAM,
      VALUE_CHAR: value.ATNAM,
      ATBEZ: value.ATBEZ
    });
  });
  $rootScope.datosMaterial = {
    MATERIAL: {
      DESCRIPTION: '',
      VALUE_CHAR: ''
    }
  }

  $scope.cargaCliente = function () {
    console.log(IPSERVER + '/JSON_ZMOV_QUERY_GRUPO_CATE.aspx?ATKLA=DDC_CLI');
  }

  $scope.navegacionEspecies = function () {
    var jsonValidate = [{
      campo: "Especie",
      value: $scope.dataSeleccion.especie,
      type: "aSelect",
      index: "VALUE_CHAR"
    },];
    if ($rootScope.userData.mail == "servicio") {
      jsonValidate.push({
        campo: "Cliente",
        value: $scope.dataSeleccion.cliente,
        type: "aSelect",
        index: "VALUE_CHAR"
      })
    }
    if (!$rootScope.validaForm(jsonValidate)) return 0;
    $rootScope.new = true;
    $rootScope.seleccionEspecie = $scope.dataSeleccion.especie;
    $rootScope.cliente = $scope.dataSeleccion.cliente;
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function (value, key) {
      if (value.ZMAT_ESPECIE == $scope.dataSeleccion.especie.VALUE_CHAR && value.MTART == "ROH") {
        $rootScope.datosMaterial.MATERIAL = ({
          DESCRIPTION: value.MAKTG,
          VALUE_CHAR: value.MATNR
        })
      }
    })
    console.log($rootScope.datosMaterial.MATERIAL)
	console.log($rootScope.seleccionEspecie.DESCRIPTION);
    if ($rootScope.seleccionEspecie.VALUE_CHAR != "CIRUELAS-OLD") {
      $rootScope.vistaDesate = "none";
    } else {
      $rootScope.vistaDesate = "";
    }

    if ($rootScope.acceso == "recepcionGranel")
      $rootScope.goToPage('/ingresoRecepcion');
    else {
      if ($rootScope.acceso == "proceso")
        $rootScope.goToPage('/menuPaking');
    }
  };
});
appExpled.lazyController('menuPaking', function ($scope, $routeParams, $rootScope) {

})
appExpled.lazyController('menuProceso', function ($scope, $routeParams, $rootScope, $http) {
  $scope.verSelProductor = "none";
  $scope.listaEspecies = [];
  $rootScope.dataSeleccion = {
    especie: {
      VALUE_CHAR: ''
    },
    loteProceso: '',
    CHARG: '',
    material: '',
    nombreProductor: '',
    totalKilo: '',
    ACCTASSCAT: '',
    HSDAT: ''
  }
  $scope.codearLote = function (data, id) {
    if (APPMOVIL) {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          //alert(result.text)
          document.getElementById('loteProceso').value = result.text;
          $rootScope.dataSeleccion.loteProceso = result.text;
          $rootScope.$apply();
        },
        function (error) {
          $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
        }
      );
    }
  }
  angular.forEach($rootScope.ZMOV_QUERY_ESPECIE, function (value, key) {
    $scope.listaEspecies.push({
      DESCRIPTION: value.ATNAM,
      VALUE_CHAR: value.ATNAM,
      ATBEZ: value.ATBEZ
    });
  });
  $scope.actualizaPallet = function (dir) {
    $rootScope.mostrarComponente=false;
    if(dir=="/exportacion"){
      $rootScope.dataSeleccion.loteProceso=angular.uppercase($rootScope.dataSeleccion.loteProceso);
      var letP=$rootScope.dataSeleccion.loteProceso.charAt();
      if(letP=="R"){
        $rootScope.mostrarComponente=true;
      }
    }
    //console.log($rootScope.dataSeleccion.especie.VALUE_CHAR)
    if ($rootScope.dataSeleccion.especie.VALUE_CHAR == "CEREZAS") {
      $rootScope.dataSeleccion.CHARG = "M-CEREZAS";
    }
    $rootScope.ZMOV_QUERY_VARIEDAD = [];
    var jsonValidate = [{
      campo: "Especie",
      value: $rootScope.dataSeleccion.especie,
      type: "aSelect",
      index: "VALUE_CHAR"
    },
    {
      campo: "Lote Proceso",
      value: $rootScope.dataSeleccion.loteProceso,
      type: "input"
    },
    ];

    if (!$rootScope.validaForm(jsonValidate)) return 0;
    $rootScope.alert.show({
      message: "Verificando información"
    });
    $rootScope.alert.buttons.accept.show = "none";
    $http({
      method: 'POST',
      url: IPSERVER + '/JSON_ZMOV_QUERY_STOCK_PROCESO.aspx?LOTEPROCESO=' + angular.uppercase($rootScope.dataSeleccion.loteProceso),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      timeout: 500000
    }).success(function (data) {
      if (data.STOCKPROCESO.length == 0) {
        $rootScope.alert.show({
          message: "Lote no existente"
        });
        $rootScope.alert.buttons.accept.show = "block";
      } else {
        if (data.STOCKPROCESO[0].ESPECIE == $rootScope.dataSeleccion.especie.VALUE_CHAR) {
          if (data.STOCKPROCESO[0].ESTADO_PROCESO == 'Cerrado') {
            $rootScope.alert.show({
              message: "El lote de proceso se encuentra CERRADO"
            });
            $rootScope.alert.buttons.accept.show = "block";
          } else {
            $rootScope.dataSeleccion.reembalaje=false;
            if(data.STOCKPROCESO[0].MATNR.charAt()=="R"){
              $rootScope.dataSeleccion.reembalaje=true;
            }
            //console.log(data.STOCKPROCESO[0]);
            $rootScope.dataSeleccion.nombreProductor = data.STOCKPROCESO[0].NOMBRE_PRODUCTOR;
            $rootScope.dataSeleccion.LIFNR = data.STOCKPROCESO[0].LIFNR;
			$rootScope.dataSeleccion.totalKilo = 0;
			if($rootScope.dataSeleccion.reembalaje)
			{
			angular.forEach(data.STOCKPROCESO, function (value, key) {
				$rootScope.dataSeleccion.totalKilo = +$rootScope.dataSeleccion.totalKilo + +value.LBLAB;
			});
			}
			else
			{
				$rootScope.dataSeleccion.totalKilo = data.STOCKPROCESO[0].LBLAB;
			}
			
            //$rootScope.dataSeleccion.HSDAT = formattedDate(data.STOCKPROCESO[0].HSDAT);
            $rootScope.dataSeleccion.HSDAT = data.STOCKPROCESO[0].FCOSECHA;
            $rootScope.dataSeleccion.ACCTASSCAT = "F";
            $rootScope.dataSeleccion.variedad = data.STOCKPROCESO[0].VARIEDAD;
            $rootScope.dataSeleccion.COD_VARIEDAD = data.STOCKPROCESO[0].COD_VARIEDAD;
            $rootScope.dataSeleccion.TIPIFICACION = data.STOCKPROCESO[0].TIPIFICACION;
            $rootScope.dataSeleccion.NPARTIDA = data.STOCKPROCESO[0].NPARTIDA;
            $rootScope.dataSeleccion.TDFRIO = data.STOCKPROCESO[0].TDFRIO;
            $rootScope.dataSeleccion.LINEA_PRD = data.STOCKPROCESO[0].LINEA_PRD;
            $rootScope.dataSeleccion.TURNO_PRD = data.STOCKPROCESO[0].TURNO_PRD;
            $rootScope.dataSeleccion.MOTIVO_REEM = data.STOCKPROCESO[0].MOTIVO_REEM;
            $rootScope.dataSeleccion.ACUENTA_REEM = data.STOCKPROCESO[0].ACUENTA_REEM;
            $rootScope.dataSeleccion.AUTORIZA_REEM = data.STOCKPROCESO[0].AUTORIZA_REEM;
            $rootScope.dataSeleccion.CAMARA = data.STOCKPROCESO[0].CAMARA;
            $rootScope.dataSeleccion.SAG_SDP = data.STOCKPROCESO[0].SAG_SDP;
            $rootScope.dataSeleccion.TIPO_PROCESO = data.STOCKPROCESO[0].TIPO_PROCESO;
            $rootScope.alert.show({
              message: "Carga finalizada"
            });
            $rootScope.alert.buttons.accept.show = "block";
            $rootScope.sid = "new";
            $rootScope.goToPage(dir);
          }
        } else {
          $rootScope.alert.show({
            message: "El lote de proceso no pertenece a la especie"
          });
          $rootScope.alert.buttons.accept.show = "block";
        }
      }
    }).error($rootScope.httpRequest.error);
  }

  function formattedDate(date) {
    var parts = date.split("-");
    return parts[2] + '.' + parts[1] + '.' + parts[0];
  }
})
appExpled.lazyController('menuPaletizar', function ($scope, $routeParams, $rootScope) {
  $rootScope.dataSeleccion = {
    especie: ''
  }
  $scope.listaEspecies = [];
  angular.forEach($rootScope.ZMOV_QUERY_ESPECIE, function (value, key) {
    $scope.listaEspecies.push({
      DESCRIPTION: value.ATNAM,
      VALUE_CHAR: value.ATNAM,
      ATBEZ: value.ATBEZ
    });
  });
  $scope.irPallet = function (dir) {
    var jsonValidate = [{
      campo: "Especie",
      value: $rootScope.dataSeleccion.especie,
      type: "aSelect",
      index: "VALUE_CHAR"
    },];

    if (!$rootScope.validaForm(jsonValidate)) return 0;
    $rootScope.goToPage(dir);
  }
})
appExpled.lazyController('menuPraletizar', function ($scope, $routeParams, $rootScope) {
})
