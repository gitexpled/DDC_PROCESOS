appExpled.lazyController('ctrExportacion', function($scope, $routeParams, $rootScope, $http) {
  $scope.clienteSeleccion = "none";
  if ($rootScope.userData.mail == "servicio") {
    $scope.clienteSeleccion = "";
  }
  console.log($rootScope.dataSeleccion);
  if ($rootScope.dataSeleccion.especie.VALUE_CHAR === "UVAS") {
    $scope.vistaUva = "";
  } else {
    $scope.vistaUva = "none";
  }
  $rootScope.datosPaletizaje = {
    detalle: []
  }
  console.log($rootScope.dataSeleccion,'hola');
  console.log($rootScope.switch_embalaje);
  
  $scope.listarColor = [];
  angular.forEach($rootScope.ZMOV_QUERY_COLOR, function(value, key) {
    if (value.ATBEZ === $rootScope.dataSeleccion.especie.DESCRIPTION) {
      $scope.listarColor.push({
        DESCRIPTION: value.DESCRIPTION,
        VALUE_CHAR: value.VALUE_CHAR,
        ATNAM: value.ATNAM
      });
    }
  });
  $scope.cargaDatos = function(idx) {
    $rootScope.datosPaletizaje.detalle[idx] = {
      fechaEmbalagePakingTab: '',
      altura: '',
      material: '',
      palletCompleto: '',
      codigoPallet: '',
      productorRotulado: '',
      selFechaContabilizacion: '',
      calibre: '',
      cantidad: '',
      ZPREDIO: '',
      lotePacking: '',
      variedadRotulada: '',
      IDG: '',
      tipificacion: '',
      PLU: '',
      color: '',
      IDP: ''
    }
  }
  if ($rootScope.sid == "new") {
    $scope.accion = "new";
    $scope.selMercadoDivTab1 = 'none';
    $scope.selKilosDivPakingTab = 'none';
    $rootScope.idxTab = 0;
    $rootScope.countTab = 0;
    $scope.selTab = [];
    $scope.selTab.push({
      idx: 0,
      nombre: "MAT 1",
      seleccionado: "on"
    });
    $scope.verBtnEliminar = "none";
    $rootScope.datosPaletizaje.detalle = [];
    $scope.cargaDatos(0);
    $scope.auxKilo = 0;
    //$rootScope.datosPaletizaje.kgLoteProcesoSaldo = (parseFloat($rootScope.datosLoteProcesoPaking.LBLAB)).toFixed(3);

  }
  console.log($rootScope.dataSeleccion.especie)
  if ($rootScope.dataSeleccion.especie.ATBEZ === "CAROZO") {
    $scope.campoCaroso = "block";
    $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].PLU = {
      DESCRIPTION: '',
      VALUE_CHAR: ''
    };
  } else {
    $scope.campoCaroso = "none";
  }
  $scope.validaLotePallet = function() {
    var jsonValidate = [{
      campo: "Codigo Pallet",
      value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].codigoPallet,
      type: "number",
      min: 8000000000,
      max: 99999999999999999999
    }];
    if (!$rootScope.validaForm(jsonValidate)) return 0;
  }

  function parseLotePallet(value) {
    console.log(value)
    var res
    if (!isNaN(parseInt(value))) {
      res = ("00000000000000000000" + value).slice(-20);
    } else {
      res = false;
    }
    return res;
  }
  $scope.codearLote = function(data, id) {
    if (APPMOVIL) {
      cordova.plugins.barcodeScanner.scan(
        function(result) {
          //alert(result.text)
          if (data == "codigoPallet") {
            document.getElementById('codigoPallet').value = parseLotePallet(result.text);
            $rootScope.datosPaletizaje.detalle[0].codigoPallet = parseLotePallet(result.text);
            $rootScope.$apply();
          } else {
            document.getElementById('embalajeLoteTab1').value = parseLotePallet(result.text);
            $rootScope.datosPaletizaje.detalle[0].lotePacking = parseLotePallet(result.text);
            $rootScope.$apply();
          }
        },
        function(error) {
          $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
        }
      );
    }
  }
  $rootScope.kiloInicial = $rootScope.dataSeleccion.totalKilo;
  $scope.selFechaContabilizacionOpciones = [{
    value: $scope.mostrarFecha(0),
    name: $scope.mostrarFecha2(0)
  }];
  $scope.selFechaContabilizacionOpciones2 = [
    {
      value: $scope.mostrarFecha(-6),
      name: $scope.mostrarFecha2(-6)
    },
    {
      value: $scope.mostrarFecha(-5),
      name: $scope.mostrarFecha2(-5)
    },
    {
      value: $scope.mostrarFecha(-4),
      name: $scope.mostrarFecha2(-4)
    },
    {
      value: $scope.mostrarFecha(-3),
      name: $scope.mostrarFecha2(-3)
    },
    {
      value: $scope.mostrarFecha(-2),
      name: $scope.mostrarFecha2(-2)
    },
    {
      value: $scope.mostrarFecha(-1),
      name: $scope.mostrarFecha2(-1)
    },
    {
      value: $scope.mostrarFecha(0),
      name: $scope.mostrarFecha2(0)
    }
  ];
  $rootScope.listarAltura = [];
  $scope.Carga_Altura = function() {
    $rootScope.listarAltura = [];
    angular.forEach($rootScope.ZMOV_QUERY_HU_DATOADICIONAL.VEGR4, function(value, key) {
      var auxALT = value.VEGR4.replace('ALT', '');
      auxALT = auxALT * 1;
      if ($rootScope.datosPaletizaje.detalle[0].palletCompleto != 'X') {
        if (auxALT > 95)
          $rootScope.listarAltura.push({
            DESCRIPTION: value.BEZEI,
            VALUE_CHAR: value.VEGR4
          });
      } else {
        if (auxALT < 95)
          $rootScope.listarAltura.push({
            DESCRIPTION: value.BEZEI,
            VALUE_CHAR: value.VEGR4
          });
      }

    })
  }
  $scope.Carga_Altura();
  $rootScope.listarCategoria = [];
  angular.forEach($rootScope.CATEGORIA, function(value, key) {
    if (value.ATBEZ == $rootScope.dataSeleccion.especie.VALUE_CHAR) {
      $scope.listarCategoria.push({
        DESCRIPTION: value.DESCRIPTION,
        VALUE_CHAR: value.VALUE_CHAR
      });
    }
  })
  $scope.listarMaterial = [];
  if ($rootScope.userData.mail == "servicio") {
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function(value, key) {
      if (value.MTART == "UNBW" &&
        value.ZMAT_ESPECIE == $rootScope.dataSeleccion.especie.VALUE_CHAR &&
        value.ZMAT_PROCESO == "SEXPORTACION" &&
        value.ZMAT_VIGENTE == "SI") {
        $scope.listarMaterial.push({
          MAKTG: value.MATNR,
          MATNR: value.MATNR,
          KG: value.NTGEW,
          MEINS: value.MEINS
        });
      }
    })
  } else {
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function(value, key) {
      if (value.MTART == "FERT" &&
        value.ZMAT_ESPECIE == $rootScope.dataSeleccion.especie.VALUE_CHAR &&
        value.ZMAT_VIGENTE == "SI") {
        $scope.listarMaterial.push({
          MAKTG: value.MATNR,
          MATNR: value.MATNR,
          KG: value.NTGEW,
          MEINS: value.MEINS
        });
      }
    })
  }
  $scope.controlDescarte = function() {
    //console.log(IPSERVER + 'JSON_ZMOV_QUERY_LIST_MATER.aspx?I_MATNR=' + $rootScope.datosPaletizaje.detalle[0].material.MATNR + '&I_WERKS=' + $rootScope.userData.centro)
    $scope.listarListaMateriales = [];
    $http({
      method: 'POST',
      url: IPSERVER + 'JSON_ZMOV_QUERY_LIST_MATER.aspx?I_MATNR=' + $rootScope.datosPaletizaje.detalle[0].material.MATNR + '&I_WERKS=' + $rootScope.userData.centro,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      timeout: 500000
    }).success(function(data) {
      console.log(data);
      angular.forEach(data.LT_LIST_MAT, function (val, key) {
        if(val.STLAL=="01"){
          $scope.listarListaMateriales.push({
            DESCRIPTION: val.STLAL + ' - ' + val.STKTX,
            VALUE_CHAR: val.STLAL
          });
        }
      })
      //console.log(data);
    }).error($rootScope.httpRequest.error);
    var kilos = $rootScope.kiloInicial;
    if ($rootScope.datosPaletizaje.detalle[0].cantidad == "" || $rootScope.datosPaletizaje.detalle[0].cantidad == 0 || $rootScope.datosPaletizaje.detalle[0].cantidad == undefined) {
      $rootScope.dataSeleccion.totalKilo = $rootScope.kiloInicial;
    } else {
      if (!isNaN($rootScope.datosPaletizaje.detalle[0].cantidad) && !isNaN($rootScope.datosPaletizaje.detalle[0].material.KG)) {
        kilos = kilos - ($rootScope.datosPaletizaje.detalle[0].cantidad * $rootScope.datosPaletizaje.detalle[0].material.KG);
        if (!isNaN(kilos)) {
          if (kilos >= 0)
            $rootScope.dataSeleccion.totalKilo = kilos.toFixed(3);
          else {
            $rootScope.alert.show({
              message: "Los kilos no pueden ser menor a cero"
            });
            $rootScope.datosPaletizaje.detalle[0].cantidad = 0;
            $rootScope.dataSeleccion.totalKilo = $rootScope.kiloInicial;
          }
        } else {
          $rootScope.dataSeleccion.totalKilo = $rootScope.kiloInicial;
        }
      } else {
        $rootScope.dataSeleccion.totalKilo = $rootScope.kiloInicial;
      }
    }
    console.log($rootScope.dataSeleccion.totalKilo)
  }
  $scope.getPredios = function() {
    $rootScope.listaPredio = []; //ZPRD_CSDP , NAME1=PRODUCTOR
    angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_SDP, function(value, key) {
      if (true &&
        value.ESPECIE === $rootScope.dataSeleccion.especie.VALUE_CHAR && value.LIFNR === $rootScope.datosPaletizaje.detalle[0].productorRotulado.VALUE_CHAR
      ) {

        if ($scope.listaPredio.indexOf(value.SDP) === -1 && value.ESPECIE === $rootScope.dataSeleccion.especie.VALUE_CHAR && value.LIFNR === $rootScope.datosPaletizaje.detalle[0].productorRotulado.VALUE_CHAR) {
          $scope.listaPredio.push({
            DESCRIPTION: value.SDP,
            VALUE_CHAR: value.SDP,
            MANDT: value.MANDT
          })
        }
      }
    });
  }
  $scope.listarProductor = [];
  angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PRODUCT, function(value, key) {
    if (value.ESPECIE == $rootScope.dataSeleccion.especie.VALUE_CHAR) {
      $scope.listarProductor.push({
        DESCRIPTION: value.LIFNR,
        VALUE_CHAR: value.LIFNR
      })
    }
    if ($rootScope.dataSeleccion.LIFNR == value.LIFNR) {
      $rootScope.datosPaletizaje.detalle[0].productorRotulado = {
        DESCRIPTION: value.LIFNR,
        VALUE_CHAR: value.LIFNR
      };
    }
    $scope.getPredios();
  })
  $scope.listarCalibre = [];
  angular.forEach($rootScope.ZMOV_QUERY_GRUPO_CATE, function(value, key) {
    if (value.ATBEZ == $rootScope.dataSeleccion.especie.VALUE_CHAR) {
      $scope.listarCalibre.push({
        DESCRIPTION: value.DESCRIPTION,
        VALUE_CHAR: value.VALUE_CHAR
      })
    }
  })
  $scope.listarVariedad = [];
  angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_VAR, function(value, key) {
    if (value.ESPECIE === $rootScope.dataSeleccion.especie.VALUE_CHAR &&
      $rootScope.dataSeleccion.LIFNR == value.LIFNR
    ) {
      $scope.listarVariedad.push({
        DESCRIPTION: value.VAR,
        VALUE_CHAR: value.COD_VAR
      })
    }
    if ($rootScope.dataSeleccion.variedad == value.VAR) {
      $rootScope.datosPaletizaje.detalle[0].variedadRotulada = {
        DESCRIPTION: value.VAR,
        VALUE_CHAR: value.COD_VAR
      };
    }
  });
  $rootScope.listaCuartel = [];
  angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_IDG, function(value, key) {
    if (true &&
      value.LIFNR === $rootScope.dataSeleccion.LIFNR && value.ESPECIE === $rootScope.dataSeleccion.especie.VALUE_CHAR
    ) {
      $scope.listaCuartel.push({
        DESCRIPTION: value.IDG,
        VALUE_CHAR: value.IDG,
        LIFNR: value.IDG
      })
    }
  });
  $rootScope.listaIDP = [];
  angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_IDP, function(value, key) {
    if (true &&
      value.LIFNR === $rootScope.dataSeleccion.LIFNR && value.ESPECIE === $rootScope.dataSeleccion.especie.VALUE_CHAR
    ) {
      $scope.listaIDP.push({
        DESCRIPTION: value.IDP,
        VALUE_CHAR: value.IDP
      })
    }
  });
  $scope.listarTipoPallet = [];
  angular.forEach($rootScope.ZMOV_QUERY_HU_DATOADICIONAL.INHALT, function(value, key) {
    $scope.listarTipoPallet.push({
      DESCRIPTION: value.INHALT,
      VALUE_CHAR: value.INHALT
    })
  });
  $scope.listarMercado = [];
  angular.forEach($rootScope.ZMOV_QUERY_HU_DATOADICIONAL.VEGR5, function(value, key) {
    $scope.listarMercado.push({
      DESCRIPTION: value.BEZEI,
      VALUE_CHAR: value.VEGR5
    });
  })
  //$rootScope.COLOR
  $scope.listarColor = [];
  angular.forEach($rootScope.COLOR, function(value, key) {
    if (value.ATBEZ == $rootScope.dataSeleccion.especie.VALUE_CHAR)
      $scope.listarColor.push({
        DESCRIPTION: value.DESCRIPTION,
        VALUE_CHAR: value.VALUE_CHAR
      });
  })
  //$rootScope.PLU
  $scope.listarPLU = [];
  angular.forEach($rootScope.PLU, function(value, key) {
    $scope.listarPLU.push({
      DESCRIPTION: value.DESCRIPTION,
      VALUE_CHAR: value.VALUE_CHAR
    });
  })

  $scope.listarTipificacion = [];
  angular.forEach($rootScope.TIPIFICACION, function(value, key) {
    if (value.ATBEZ === $rootScope.dataSeleccion.especie.VALUE_CHAR) {
      $scope.listarTipificacion.push({
        DESCRIPTION: value.DESCRIPTION,
        VALUE_CHAR: value.VALUE_CHAR,
        ATNAM: value.ATNAM
      });
    }
  });
  $scope.validaFormRecep = function() {
    console.log($rootScope.datosPaletizaje.detalle);
    var jsonValidate = [
      //{campo:"Codigo Pallet",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].codigoPallet,type:"input"},
      {
        campo: "Altura",
        value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].altura,
        type: "aSelect",
        index: "VALUE_CHAR"
      },
      {
        campo: "Fecha Contabilización",
        value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].selFechaContabilizacion,
        type: "aSelect",
        index: "value"
      },
      {
        campo: "Fecha de embalaje",
        value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].fechaEmbalagePakingTab,
        type: "aSelect",
        index: "value"
      },
      //{ campo: "Tipo de pallet", value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].tipoPallet, type: "aSelect", index: "VALUE_CHAR" },
      {
        campo: "Material",
        value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].material,
        type: "aSelect",
        index: "MATNR"
      },
      {
        campo: "Calibre",
        value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].calibre,
        type: "aSelect",
        index: "VALUE_CHAR"
      },
      {
        campo: "Productor Rotulado",
        value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].productorRotulado,
        type: "aSelect",
        index: "VALUE_CHAR"
      },
      {
        campo: "Variedad Rotulada",
        value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].variedadRotulada,
        type: "aSelect",
        index: "VALUE_CHAR"
      },
      //{campo:"Lote Packing",value:$rootScope.datosPaletizaje.detalle[$rootScope.idxTab].lotePacking,type:"input"},
      {
        campo: "Categoria",
        value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].categoria,
        type: "aSelect",
        index: "VALUE_CHAR"
      },
      //{ campo: "Lista de Materiales", value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].listaMateriales, type: "aSelect", index: "VALUE_CHAR" },
    ];
    if ($rootScope.dataSeleccion.especie.ATBEZ == "CAROZO") {
      jsonValidate.push({
        campo: "PLU",
        value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].PLU,
        type: "aSelect",
        index: "VALUE_CHAR"
      }, {
        campo: "Color",
        value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].color,
        type: "aSelect",
        index: "VALUE_CHAR"
      } );
    }
    if ($rootScope.dataSeleccion.especie.VALUE_CHAR === "UVAS") {
      jsonValidate.push([{
          campo: "IDG",
          value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].IDG,
          type: "aSelect",
          index: "VALUE_CHAR"
        },
        {
          campo: "IDP",
          value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].IDP,
          type: "aSelect",
          index: "VALUE_CHAR"
        },
        {
          campo: "Lote Packing",
          value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].tipificacion,
          type: "aSelect",
          index: "VALUE_CHAR"
        },
      ]);
    }
    if ($rootScope.userData.mail == "servicio") {
      jsonValidate.push({
        campo: "IDG",
        value: $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].cliente,
        type: "aSelect",
        index: "VALUE_CHAR"
      });
    }
    console.log(jsonValidate);
    if (!$rootScope.validaForm(jsonValidate)) return 0;

  }
  $scope.agregarTab = function() {
    if (!$scope.validaFormRecep()) {
      return 0;
    }
    $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].fechaEmbalagePakingTab = $('#fechaEmbalagePakingTab').datepicker({
      dateFormat: 'yy-mm-dd',
      onSelect: function(dateText) {
        $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].fechaEmbalagePakingTab = dateText;
      }
    }).val();
    $scope.selTab[$rootScope.idxTab].seleccionado = "off"
    $rootScope.countTab++;
    $rootScope.idxTab = $rootScope.countTab;
    $scope.selMercadoDivTab1 = 'none';
    try {
      if (($rootScope.datosPaletizaje.detalle[$rootScope.idxTab].material.MAKTG == '') || ($rootScope.datosPaletizaje.detalle[$rootScope.idxTab].material.MAKTG == undefined)) {
        $scope.selMercadoDivTab1 = 'none';
      } else {
        $scope.selMercadoDivTab1 = 'block';
      }
    } catch (e) {
      $scope.selMercadoDivTab1 = 'none';
    }
    $scope.selTab.push({
      idx: $rootScope.countTab,
      nombre: "MAT " + ($rootScope.countTab + 1),
      seleccionado: "on"
    })
    // si hay mas de un tab mostrar la opcion de poder eliminarlos
    if ($rootScope.countTab > 0) {
      $scope.verBtnEliminar = "block";
    } else {
      $scope.verBtnEliminar = "none";
    }
    $('.tab-embalajes').removeClass('animated fadeInUp');
    $('.tab-embalajes').hide();
    $('.tab-embalajes').show();
    $('.tab-embalajes').addClass('animated fadeInUp');
    $('#fechaEmbalagePakingTab').val('');
    $scope.cargaDatos($rootScope.idxTab);
    $scope.auxKilo = 0;
  }
  $scope.autoCompletaLote = function() {
    var lote = parseLotePallet($rootScope.datosPaletizaje.detalle[0].codigoPallet);
    if (lote) {
      $rootScope.datosPaletizaje.detalle[0].codigoPallet = lote;
    }
    console.log($rootScope.datosPaletizaje.detalle[0].codigoPallet)
  }
  $scope.irAlTab = function(idx) {
    if (!$scope.validaFormRecep()) {
      return 0;
    };
    var aux = 0;
    $rootScope.datosPaletizaje.detalle[$rootScope.idxTab].fechaEmbalagePakingTab = $('#fechaEmbalagePakingTab').datepicker({
      dateFormat: 'yy-mm-dd'
    }).val();
    angular.forEach($scope.selTab, function(value, key) {
      $scope.selTab[aux].seleccionado = "off";
      aux++;
    });
    $rootScope.idxTab = idx;
    $scope.selTab[idx].seleccionado = "on";
    $('.tab-embalajes').removeClass('animated fadeInUp');
    $('.tab-embalajes').hide();
    $('.tab-embalajes').show();
    $('.tab-embalajes').addClass('animated fadeInUp');
    $('#fechaEmbalagePakingTab').val($rootScope.datosPaletizaje.detalle[$rootScope.idxTab].fechaEmbalagePakingTab);
    //$('#embalajeLoteTab1').val($rootScope.datosPaletizaje.detalle[$rootScope.idxTab].lotePacking);
    $scope.selMercadoDivTab1 = 'none';
    //console.log($rootScope.datosLoteProcesoPaking)
    try {
      if (($rootScope.datosPaletizaje.detalle[$rootScope.idxTab].material.MAKTG == '') || ($rootScope.datosPaletizaje.detalle[$rootScope.idxTab].material.MAKTG == undefined)) {
        $scope.selMercadoDivTab1 = 'none';
      } else {
        $scope.selMercadoDivTab1 = 'block';
      }
    } catch (e) {
      $scope.selMercadoDivTab1 = 'none';
    };
    $scope.auxKilo = 0;
  }

  $scope.deshacerTab = function() {
    var aux = 0;
    angular.forEach($scope.selTab, function(value, key) {
      $scope.selTab[aux].seleccionado = "off";
      aux++;
    });
    $scope.selTab[$rootScope.countTab] = [];
    $rootScope.countTab--;
    $scope.selTab[$rootScope.countTab].seleccionado = "on";
    $rootScope.idxTab = $rootScope.countTab;
    // si hay mas de un tab mostrar la opcion de poder eliminarlos
    if ($rootScope.countTab > 0) {
      $scope.verBtnEliminar = "block";
    } else {
      $scope.verBtnEliminar = "none";
    }
    $('.tab-embalajes').removeClass('animated fadeInUp');
    $('.tab-embalajes').hide();
    $('.tab-embalajes').show();
    $('.tab-embalajes').addClass('animated fadeInUp');
    $('#fechaEmbalagePakingTab').val($rootScope.datosPaletizaje.detalle[$rootScope.idxTab].fechaEmbalagePakingTab);
    $scope.selTab.pop();
    $scope.restaKgTotal();
  }
  $scope.Changue_Tipo_Pallet = function(i) {
    console.log(i);
    $http({
      method: 'POST',
      url: IPSERVER + 'JSON_ZMOV_10021.aspx?IV_MATNR=' + $rootScope.datosPaletizaje.detalle[0].material.MATNR + '&IV_WERKS=' + $rootScope.userData.centro,
      headers: {
        'Content-Type': 'text/xml; charset=utf-8'
      },
      processData: false,
      dataType: 'json',
    }).success(function(data) {
      console.log(data);
      if (data.LT_DETALLE.length > 0) {
        $rootScope.datosPaletizaje.detalle[0].tipoPallet = data.LT_DETALLE[0].TIPO_PALLET;
      } else {
        $rootScope.datosPaletizaje.detalle[0].tipoPallet = '';
      }

    })
  }
  $scope.embalajePakingContinuar = function() {
    if ($scope.validaFormRecep() == 0) {
      return 0;
    } else {
      $rootScope.goToPage('/resumenPaletizar');
    }
  }
})
appExpled.lazyController('crtResumen', function($scope, $routeParams, $rootScope, $http) {
  //$rootScope.antiRefrescar();
  $scope.selTab = [];

  $scope.mostrarRespuesta = function(estado) {
    if (estado == true) {
      $scope.verPopRespuesta = "block";
    } else {
      $scope.verPopRespuesta = "none";
    }
  }
  // estableser oculto
  $scope.mostrarRespuesta(false);

  $scope.btnFinalizar = function() {
    $rootScope.goToPage('/resumenPaletizar');
  }

  $scope.irAlTab = function(idx) {
    var aux = 0;
    angular.forEach($scope.selTab, function(value, key) {
      $scope.selTab[aux].seleccionado = "off";
      aux++;
    });
    $rootScope.idxTab = idx;
    $scope.selTab[idx].seleccionado = "on";
    $('#div_tab_resumen').removeClass('animated fadeInUp');
    $('#div_tab_resumen').hide();
    $('#div_tab_resumen').show();
    $('#div_tab_resumen').addClass('animated fadeInUp');
  }

  for (i = 0; i <= $rootScope.countTab; i++) {
    $scope.selTab.push({
      idx: i,
      nombre: "RES " + (i + 1),
      seleccionado: "off",
      alerta: 'status-alert'
    });
  }
  $scope.selTab[$rootScope.idxTab].seleccionado = "on";


  $scope.selTab[$rootScope.idxTab].seleccionado = "on";

  //$scope.resumenEmbalajeTab1 = $rootScope.datosTabCajaEmbalada[$rootScope.idxTab].selMercadoTab1.descripcion;
  //$scope.resumenMercadoTab1 = $rootScope.datosTabCajaEmbalada[$rootScope.idxTab].selMercadoTab1.mercado;

  // recorrer y validar todos los tab
  for (i = 0; i <= $rootScope.countTab; i++) {
    $scope.irAlTab(i);
  }
  $scope.irAlTab($rootScope.idxTab);
  $scope.Get_XML = function() {
    var ListaMateriales_Aux = '';
    try {
      if ($rootScope.datosPaletizaje.detalle[0].listaMateriales) {
        console.log('existe');
        ListaMateriales_Aux = $rootScope.datosPaletizaje.detalle[0].listaMateriales.VALUE_CHAR;
        console.log($rootScope.datosPaletizaje.detalle[0].listaMateriales.VALUE_CHAR)
      } else {
        console.log('No existe');

      }
    } catch (e) {
      console.log(e);
    }
    var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
    cadenaXML += '   <soapenv:Header/>';
    cadenaXML += '   <soapenv:Body>';
    cadenaXML += '      <tem:ZMOV_20030>';
    cadenaXML += '         <tem:datos>';
    cadenaXML += '            <tem:HEADER>';
    cadenaXML += '               <tem:BUKRS>' + $rootScope.userData.sociedad + '</tem:BUKRS>'; // sociedad usuario
    cadenaXML += '               <tem:EKORG>' + $rootScope.userData.organizacion + '</tem:EKORG>'; // en duro
    cadenaXML += '               <tem:EKGRP>' + $rootScope.userData.grupoCompra + '</tem:EKGRP>'; // grupo compra
    cadenaXML += '               <tem:BSART>' + $rootScope.userData.clasePedido + '</tem:BSART>'; // clase pedido
    cadenaXML += '               <tem:BUDAT>' + $rootScope.datosPaletizaje.detalle[0].selFechaContabilizacion.value + '</tem:BUDAT>'; //
    cadenaXML += '               <tem:LIFNR>' + $rootScope.dataSeleccion.LIFNR + '</tem:LIFNR>'; //
    cadenaXML += '               <tem:XBLNR>' + angular.uppercase($rootScope.dataSeleccion.loteProceso) + '</tem:XBLNR>'; // guia de despacho
    cadenaXML += '               <tem:BKTXT>' + $rootScope.userData.usuario + '</tem:BKTXT>'; // usuario
    cadenaXML += '            </tem:HEADER>';
    cadenaXML += '            <tem:HEADER_ADIC>';
    cadenaXML += '               <tem:STLAL>' + ListaMateriales_Aux + '</tem:STLAL>';
    cadenaXML += '               <tem:EXTWG>' + $rootScope.dataSeleccion.COD_VARIEDAD.substring(0, 2) + '</tem:EXTWG>';
    cadenaXML += '               <tem:ZVARIEDAD>' + $rootScope.datosPaletizaje.detalle[0].variedadRotulada.VALUE_CHAR + '</tem:ZVARIEDAD>';
    cadenaXML += '               <tem:TIP_PACKING>' + (($rootScope.userData.mail === 'recepcionPallet') ? 'S' : 'C') + '</tem:TIP_PACKING>';
    cadenaXML += '               <tem:LGORT_TRASP>' + (($rootScope.userData.mail === 'recepcionPallet') ? '' : 'PA02') + '</tem:LGORT_TRASP>';
    cadenaXML += '               <tem:STLAL_PALLET></tem:STLAL_PALLET>';
    cadenaXML += '               <tem:SERVICIO>' + (($rootScope.userData.mail === 'servicio') ? 'X' : '') + '</tem:SERVICIO>';
    cadenaXML += '            </tem:HEADER_ADIC>';
    cadenaXML += '              <tem:IR_MTART_NOT_541>';
    cadenaXML += '              <tem:ZMOV_20030_IR_MTART_NOT_541>';
    cadenaXML += '                  <tem:SIGN>I</tem:SIGN>\
                                        <tem:OPTION>NE</tem:OPTION>\
                                        <tem:LOW>ROH</tem:LOW>\
                                        <tem:HIGH></tem:HIGH>\
                                        </tem:ZMOV_20030_IR_MTART_NOT_541>\
                                    </tem:IR_MTART_NOT_541>';
    cadenaXML += '            <tem:HEADER_HU>';
    cadenaXML += '               <tem:PACK_MAT>PALLET</tem:PACK_MAT>';
    cadenaXML += '               <tem:HU_EXID>' + $rootScope.datosPaletizaje.detalle[0].codigoPallet + '</tem:HU_EXID>';
    cadenaXML += '               <tem:EXT_ID_HU_2></tem:EXT_ID_HU_2>';
    cadenaXML += '               <tem:CONTENT>' + $rootScope.datosPaletizaje.detalle[0].tipoPallet + '</tem:CONTENT>';
    cadenaXML += '               <tem:PACK_MAT_CUSTOMER></tem:PACK_MAT_CUSTOMER>';
    cadenaXML += '               <tem:PACKAGE_CAT></tem:PACKAGE_CAT>';
    cadenaXML += '               <tem:KZGVH>' + $rootScope.datosPaletizaje.detalle[0].palletCompleto + '</tem:KZGVH>';
    cadenaXML += '               <tem:HU_GRP1></tem:HU_GRP1>';
    cadenaXML += '               <tem:HU_GRP2></tem:HU_GRP2>';
    cadenaXML += '               <tem:HU_GRP3></tem:HU_GRP3>';
    cadenaXML += '               <tem:HU_GRP4>' + $rootScope.datosPaletizaje.detalle[0].altura.VALUE_CHAR + '</tem:HU_GRP4>';
    cadenaXML += '               <tem:HU_GRP5></tem:HU_GRP5>';
    cadenaXML += '               <tem:LGORT_DS>' + $rootScope.userData.almacenPallet + '</tem:LGORT_DS>';
    cadenaXML += '            </tem:HEADER_HU>';
    cadenaXML += '            <tem:LOG></tem:LOG>';
    cadenaXML += '            <tem:LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>Z' + $rootScope.dataSeleccion.especie.VALUE_CHAR + '_VARIEDAD</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.variedad + '</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
    //if ($rootScope.userData.linea !== '') {
      cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.LINEA_PRD + '</tem:VALUE_CHAR>';
      cadenaXML += '               <tem:CHARACT>ZLINEA</tem:CHARACT>';
      cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
    //}
    //if ($rootScope.userData.turno !== '' && $rootScope.userData.turno !== 'PA02') {
      cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.TURNO_PRD + '</tem:VALUE_CHAR>';
      cadenaXML += '               <tem:CHARACT>ZTURNO</tem:CHARACT>';
      cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
    //}
    cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>Z' + $rootScope.dataSeleccion.especie.VALUE_CHAR + '_VARIEDAD_ET</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].variedadRotulada.VALUE_CHAR + '</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>Z' + $rootScope.dataSeleccion.especie.VALUE_CHAR + '_CALIBRE</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].calibre.VALUE_CHAR + '</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>Z' + $rootScope.dataSeleccion.especie.VALUE_CHAR + '_CALIDAD</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].categoria.VALUE_CHAR + '</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>ZEMBALA</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>DDC</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>ZPRODUCTOR_ET</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].productorRotulado.VALUE_CHAR + '</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>ZSAG_CSP</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.userData.CSP + '</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>ZFCOSECHA</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.HSDAT + '</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>ZNPARTIDA</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.NPARTIDA + '</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>ZPRODUCTOR</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.LIFNR + '</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>TIPIFICACION</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.TIPIFICACION + '</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    //cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_TDFRIO</tem:CHARACT>';
    cadenaXML += '               <tem:CHARACT>ZTFRIO</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.TDFRIO + '</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
    if ($rootScope.dataSeleccion.especie.ATBEZ === "CAROZO") {
      cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:CHARACT>ZPLU</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].PLU.VALUE_CHAR + '</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
      cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:CHARACT>Z' + $rootScope.dataSeleccion.especie.VALUE_CHAR + '_COLOR</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].color.VALUE_CHAR + '</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
    }
    if ($rootScope.dataSeleccion.especie.VALUE_CHAR == "UVAS") {
      cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:CHARACT>ZSAG_IDP</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].IDP.VALUE_CHAR + '</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
      cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:CHARACT>ZSAG_IDG</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].IDG.VALUE_CHAR + '</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
      /* cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
       cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
       cadenaXML += '               <tem:BATCH></tem:BATCH>';
       cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_T</tem:CHARACT>';
       cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].tipificacion.VALUE_CHAR+'</tem:VALUE_CHAR>';
       cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';*/
    }
    if ($rootScope.userData.mail == "servicio") {
      cadenaXML += '            <tem:ZMOV_20030_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:CHARACT>ZCLIENTE</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].cliente.VALUE_CHAR + '</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_20030_LT_CARACT>';
    }
    cadenaXML += '            </tem:LT_CARACT><tem:LT_ITEMS>';
    cadenaXML += '               <tem:ZMOV_20030_LT_ITEMS>';
    cadenaXML += '                  <tem:STCK_TYPE></tem:STCK_TYPE>';
    cadenaXML += '                  <tem:MATERIAL>' + $rootScope.datosPaletizaje.detalle[0].material.MATNR + '</tem:MATERIAL>';
    cadenaXML += '                  <tem:BATCH></tem:BATCH>';
    cadenaXML += '                  <tem:QUANTITY>' + $rootScope.datosPaletizaje.detalle[0].cantidad + '</tem:QUANTITY>';
    cadenaXML += '                  <tem:PO_UNIT>'+$rootScope.datosPaletizaje.detalle[0].material.MEINS+'</tem:PO_UNIT>';
    cadenaXML += '                  <tem:HSDAT>' + $rootScope.datosPaletizaje.detalle[0].fechaEmbalagePakingTab.value + '</tem:HSDAT>';
    cadenaXML += '                  <tem:PLANT>' + $rootScope.userData.centro + '</tem:PLANT>';
    cadenaXML += '                  <tem:STGE_LOC>' + $rootScope.userData.almacenGranel + '</tem:STGE_LOC>';
    cadenaXML += '                  <tem:FREE_ITEM>X</tem:FREE_ITEM>';
    cadenaXML += '                  <tem:ITEM_CAT>L</tem:ITEM_CAT>';
    cadenaXML += '                  <tem:MOVE_BATCH></tem:MOVE_BATCH>';
    cadenaXML += '                  <tem:BATCH_GRANEL>' + angular.uppercase($rootScope.dataSeleccion.loteProceso) + '</tem:BATCH_GRANEL>'; /**/
    cadenaXML += '                  <tem:ACCTASSCAT>' + $rootScope.dataSeleccion.ACCTASSCAT + '</tem:ACCTASSCAT>';
    cadenaXML += '                  <tem:ALMAC_TRASP>' + (($rootScope.userData.mail === 'recepcionPallet') ? '' : 'PA02') + '</tem:ALMAC_TRASP>'; //Cambie el turno por planta, ya que mas arriba se solicita el turno; cambie el almacen de traspaso al campo turno.
    cadenaXML += '                  <tem:AUFEX>' + (($rootScope.switch_embalaje)?'':'X')+ '</tem:AUFEX>';
    cadenaXML += '               </tem:ZMOV_20030_LT_ITEMS>';
    cadenaXML += '            </tem:LT_ITEMS>';
    cadenaXML += '            <tem:LT_ITEM_DEST>';
    cadenaXML += '            </tem:LT_ITEM_DEST>';
    cadenaXML += '         </tem:datos>';
    cadenaXML += '      </tem:ZMOV_20030>';
    cadenaXML += '   </soapenv:Body>';
    cadenaXML += '</soapenv:Envelope>';
    cadenaXML = cadenaXML.split('>undefined<').join('><');
    console.log(cadenaXML);
    return cadenaXML;
  }
  $scope.send_xml = function() {
    $rootScope.blockReEnvio = 1;

    document.getElementById('btnContinuar_').style.display = 'none';
    $scope.btnGeneraXML = 'none';
    document.getElementById('btnError').style.display = 'none';
    document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '';
    $('#cargandoDatosSAP').show();
    $rootScope.btnContinuar = 'none';
    $scope.mostrarRespuesta(true);
    $rootScope.httpRequest.successRedirect = "menuProceso";
    $http({
      method: 'POST',
      url: IPSERVER + 'rfcNET.asmx?',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8'
      },
      processData: false,
      dataType: 'xml',
      data: $scope.Get_XML()
    }).success(function(data) {
      console.log(data)
      document.getElementById('btnContinuar_').style.display = 'block';
      document.getElementById('loadingCajaEmabalda').style.display = 'none';
      $('#cargandoDatosSAP').hide('fade');
      var print = data.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
      var xmlData = $.parseXML(print);
      console.log(print);
      var mensajeRespuesta1;
      var mensajeRespuesta2;
      var mensajeHU;
      try {
        var thirdPartyNode = $(xmlData).find("E_MATERIALDOCUMENT")[0];
        var mensajeRespuesta4 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));

        var thirdPartyNode = $(xmlData).find("E_MBLNR_541")[0];
        var mensajeRespuesta5 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));

        var thirdPartyNode = $(xmlData).find("MATERIALDOCUMENT")[0];
        var mensajeRespuesta1 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));

        var thirdPartyNode = $(xmlData).find("PEDIDO")[0];
        mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));

        var thirdPartyNode = $(xmlData).find("E_EXIDV")[0];
        mensajeHU = (serializeXmlNode(thirdPartyNode).split("\t").join(""));

      } catch (e) {
        mensajeRespuesta1 = '"No se generó documento material, favor consultar en SAP';
      }

      if (mensajeRespuesta1 == '<MATERIALDOCUMENT xmlns="http://tempuri.org/"/>') {
        mensajeRespuesta1 = 'ERROR, No se generó documento material, favor consultar en SAP';
      }

      var thirdPartyNode = $(xmlData).find("MESSAGE")[0]; //MESSAGE
      var mensajeRespuesta3 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
      console.log(mensajeRespuesta4)
      mensaje = '<div class="contabilizar-text">' +
        '<h1>UM: </h1> <p>' + (mensajeHU) + '</p>' +
        '<h1>Pedido Cajas: </h1> <p>' + (mensajeRespuesta2) + '</p>' +
        '<h1>Comp. Cajas 541 : </h1> <p>' + (mensajeRespuesta5) + '</p>' +
        '<h1>Alta Mov. 543: </h1> <p>' + (mensajeRespuesta1) + '</p>' +
        '<h1>Alta Orden CO: </h1> <p>' + (mensajeRespuesta4) + '</p>' +
        '<h1>Mensaje : </h1> <p>' + (mensajeRespuesta3) + '</p>';
      $rootScope.btnContinuar = 'block';
      //'<div class="contabilizar-text"> <h1>Alta Mov. 543:</h1> <p>' + mensajeRespuesta1 + '</p><h1>Comp. Cajas Mov. 541:</h1> <p>' + mensajeRespuesta5 + '</p><h1>Alta Orden CO:</h1> <p>' + mensajeRespuesta4 + '</p><h1>Pedido Cajas:</h1><p>' + mensajeRespuesta2 + '</p><h1>UM</h1><p>' + mensajeHU + '</p><h1>Mensaje:</h1><p>' + mensajeRespuesta3 + '</p></div>';
      document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = mensaje;
    })
  }
  $scope.generaXML = function() {
    $rootScope.blockReEnvio = 1;

    document.getElementById('btnContinuar_').style.display = 'none';
    $scope.btnGeneraXML = 'none';
    document.getElementById('btnError').style.display = 'none';
    document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '';
    $('#cargandoDatosSAP').show();
    $scope.mostrarRespuesta(true);
    $rootScope.httpRequest.successRedirect = "menuProceso";
    var auxBUDAT;
    try {
      auxBUDAT = $rootScope.datoGeneralCajaEmbalada.fechaContabiliza.name;
    } catch (e) {
      auxBUDAT = "";
    }
    var cadenaXML = "";
    //if($rootScope.userData.mail=="servicio"){
    if (1 == 1) {
      cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
      cadenaXML += '   <soapenv:Header/>';
      cadenaXML += '   <soapenv:Body>';
      cadenaXML += '      <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR>';
      cadenaXML += '         <tem:datos>';
      cadenaXML += '            <tem:HEADER>';
      cadenaXML += '               <tem:BUKRS>' + $rootScope.userData.sociedad + '</tem:BUKRS>'; // sociedad usuario
      cadenaXML += '               <tem:EKORG>' + $rootScope.userData.organizacion + '</tem:EKORG>'; // en duro
      cadenaXML += '               <tem:EKGRP>' + $rootScope.userData.grupoCompra + '</tem:EKGRP>'; // grupo compra
      cadenaXML += '               <tem:BSART>' + $rootScope.userData.clasePedido + '</tem:BSART>'; // clase pedido
      cadenaXML += '               <tem:BUDAT>' + $rootScope.datosPaletizaje.detalle[0].selFechaContabilizacion.value + '</tem:BUDAT>'; //
      cadenaXML += '               <tem:LIFNR>' + $rootScope.dataSeleccion.LIFNR + '</tem:LIFNR>'; //
      cadenaXML += '               <tem:XBLNR>' + angular.uppercase($rootScope.dataSeleccion.loteProceso) + '</tem:XBLNR>'; // guia de despacho
      cadenaXML += '               <tem:BKTXT>' + $rootScope.userData.usuario + '</tem:BKTXT>'; // usuario
      cadenaXML += '            </tem:HEADER>';
      cadenaXML += '            <tem:HEADER_ADIC>';
      cadenaXML += '               <tem:STLAL>' + $rootScope.datosPaletizaje.detalle[0].listaMateriales.VALUE_CHAR + '</tem:STLAL>';
      cadenaXML += '            </tem:HEADER_ADIC>';
      cadenaXML += '              <tem:IR_MTART_NOT_541>';
      cadenaXML += '              <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_IR_MTART_NOT_541>';
      cadenaXML += '                  <tem:SIGN>I</tem:SIGN>\
                                            <tem:OPTION>NE</tem:OPTION>\
                                            <tem:LOW>ROH</tem:LOW>\
                                            <tem:HIGH></tem:HIGH>\
											</tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_IR_MTART_NOT_541>\
                                        </tem:IR_MTART_NOT_541>';
      cadenaXML += '            <tem:HEADER_HU>';
      cadenaXML += '               <tem:PACK_MAT>PALLET</tem:PACK_MAT>';
      cadenaXML += '               <tem:HU_EXID>' + $rootScope.datosPaletizaje.detalle[0].codigoPallet + '</tem:HU_EXID>';
      cadenaXML += '               <tem:EXT_ID_HU_2></tem:EXT_ID_HU_2>';
      cadenaXML += '               <tem:CONTENT>' + $rootScope.datosPaletizaje.detalle[0].tipoPallet.VALUE_CHAR + '</tem:CONTENT>';
      cadenaXML += '               <tem:PACK_MAT_CUSTOMER></tem:PACK_MAT_CUSTOMER>';
      cadenaXML += '               <tem:PACKAGE_CAT></tem:PACKAGE_CAT>';
      cadenaXML += '               <tem:KZGVH>' + $rootScope.datosPaletizaje.detalle[0].palletCompleto + '</tem:KZGVH>';
      cadenaXML += '               <tem:HU_GRP1></tem:HU_GRP1>';
      cadenaXML += '               <tem:HU_GRP2></tem:HU_GRP2>';
      cadenaXML += '               <tem:HU_GRP3></tem:HU_GRP3>';
      cadenaXML += '               <tem:HU_GRP4>' + $rootScope.datosPaletizaje.detalle[0].altura.VALUE_CHAR + '</tem:HU_GRP4>';
      cadenaXML += '               <tem:HU_GRP5></tem:HU_GRP5>';
      cadenaXML += '               <tem:LGORT_DS>' + $rootScope.userData.almacenPallet + '</tem:LGORT_DS>';
      cadenaXML += '            </tem:HEADER_HU>';
      cadenaXML += '            <tem:LOG></tem:LOG>';
      cadenaXML += '            <tem:LT_CARACT>';
      cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:CHARACT>Z' + $rootScope.dataSeleccion.especie.VALUE_CHAR + '_VARIEDAD</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.variedad + '</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      if ($rootScope.userData.linea !== '') {
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.userData.linea + '</tem:VALUE_CHAR>';
        cadenaXML += '               <tem:CHARACT>ZLINEA</tem:CHARACT>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      }
      if ($rootScope.userData.turno !== '' && $rootScope.userData.turno !== 'PA02') {
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.userData.turno + '</tem:VALUE_CHAR>';
        cadenaXML += '               <tem:CHARACT>ZTURNO</tem:CHARACT>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      }
      cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:CHARACT>Z' + $rootScope.dataSeleccion.especie.VALUE_CHAR + '_VARIEDAD_ET</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].variedadRotulada.VALUE_CHAR + '</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:CHARACT>Z' + $rootScope.dataSeleccion.especie.VALUE_CHAR + '_CALIBRE</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].calibre.VALUE_CHAR + '</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:CHARACT>Z' + $rootScope.dataSeleccion.especie.VALUE_CHAR + '_CALIDAD</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].categoria.VALUE_CHAR + '</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:CHARACT>ZEMBALA</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>DDC</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:CHARACT>ZPRODUCTOR_ET</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].productorRotulado.VALUE_CHAR + '</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:CHARACT>ZSAG_CSP</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.userData.CSP + '</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:CHARACT>ZFCOSECHA</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.HSDAT + '</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:CHARACT>ZNPARTIDA</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.NPARTIDA + '</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:CHARACT>ZPRODUCTOR</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.LIFNR + '</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:CHARACT>TIPIFICACION</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.TIPIFICACION + '</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      //cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_TDFRIO</tem:CHARACT>';
      cadenaXML += '               <tem:CHARACT>ZTFRIO</tem:CHARACT>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.TDFRIO + '</tem:VALUE_CHAR>';
      cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      if ($rootScope.dataSeleccion.especie.ATBEZ === "CAROZO") {
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>ZPLU</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].PLU.VALUE_CHAR + '</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>Z' + $rootScope.dataSeleccion.especie.VALUE_CHAR + '_COLOR</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].color.VALUE_CHAR + '</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      }
      if ($rootScope.dataSeleccion.especie.VALUE_CHAR == "UVAS") {
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>ZSAG_IDP</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].IDP.VALUE_CHAR + '</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>ZSAG_IDG</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].IDG.VALUE_CHAR + '</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
        /* cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
         cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR)+'</tem:MATERIAL>';
         cadenaXML += '               <tem:BATCH></tem:BATCH>';
         cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_T</tem:CHARACT>';
         cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosPaletizaje.detalle[0].tipificacion.VALUE_CHAR+'</tem:VALUE_CHAR>';
         cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';*/
      }
      if ($rootScope.userData.mail == "servicio") {
        cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
        cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosPaletizaje.detalle[0].material.MATNR) + '</tem:MATERIAL>';
        cadenaXML += '               <tem:BATCH></tem:BATCH>';
        cadenaXML += '               <tem:CHARACT>ZCLIENTE</tem:CHARACT>';
        cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosPaletizaje.detalle[0].cliente.VALUE_CHAR + '</tem:VALUE_CHAR>';
        cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_CARACT>';
      }
      cadenaXML += '            </tem:LT_CARACT><tem:LT_ITEMS>';
      cadenaXML += '               <tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_ITEMS>';
      cadenaXML += '                  <tem:STCK_TYPE></tem:STCK_TYPE>';
      cadenaXML += '                  <tem:MATERIAL>' + $rootScope.datosPaletizaje.detalle[0].material.MATNR + '</tem:MATERIAL>';
      cadenaXML += '                  <tem:BATCH></tem:BATCH>';
      cadenaXML += '                  <tem:QUANTITY>' + $rootScope.datosPaletizaje.detalle[0].cantidad + '</tem:QUANTITY>';
      cadenaXML += '                  <tem:PO_UNIT>'+$rootScope.datosPaletizaje.detalle[0].material.MEINS+'</tem:PO_UNIT>';
      cadenaXML += '                  <tem:HSDAT>' + $rootScope.datosPaletizaje.detalle[0].fechaEmbalagePakingTab.value + '</tem:HSDAT>';
      cadenaXML += '                  <tem:PLANT>' + $rootScope.userData.centro + '</tem:PLANT>';
      cadenaXML += '                  <tem:STGE_LOC>' + $rootScope.userData.almacenGranel + '</tem:STGE_LOC>';
      cadenaXML += '                  <tem:FREE_ITEM>X</tem:FREE_ITEM>';
      cadenaXML += '                  <tem:ITEM_CAT>L</tem:ITEM_CAT>';
      cadenaXML += '                  <tem:MOVE_BATCH></tem:MOVE_BATCH>';
      cadenaXML += '                  <tem:BATCH_GRANEL>' + angular.uppercase($rootScope.dataSeleccion.loteProceso) + '</tem:BATCH_GRANEL>'; /**/
      cadenaXML += '                  <tem:ACCTASSCAT>' + $rootScope.dataSeleccion.ACCTASSCAT + '</tem:ACCTASSCAT>';
      cadenaXML += '                  <tem:ALMAC_TRASP>' + $rootScope.userData.planta + '</tem:ALMAC_TRASP>'; //Cambie el turno por planta, ya que mas arriba se solicita el turno; cambie el almacen de traspaso al campo turno.
      cadenaXML += '               </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR_LT_ITEMS>';
      cadenaXML += '            </tem:LT_ITEMS>';
      cadenaXML += '            <tem:LT_ITEM_DEST>';
      cadenaXML += '            </tem:LT_ITEM_DEST>';
      cadenaXML += '         </tem:datos>';
      cadenaXML += '      </tem:ZMOV_CREATE_RECEP_PT_FRESCO_OR>';
      cadenaXML += '   </soapenv:Body>';
      cadenaXML += '</soapenv:Envelope>';
      cadenaXML = cadenaXML.split('>undefined<').join('><');
      console.log(cadenaXML);
    }
    /// VALIDAR ENVIO POR USUARIO DEMO OFLINE
    if ($rootScope.userData.idUsuario != "demo") {
      var xmlhttp = new XMLHttpRequest();
      var mensajeRespuesta1;
      var mensajeRespuesta2;
      xmlhttp.open('POST', IPSERVER + '/rfcNET.asmx', true);
      var sr = cadenaXML;
      xmlhttp.onreadystatechange = function() {

        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            document.getElementById('btnContinuar_').style.display = 'block';
            document.getElementById('loadingCajaEmabalda').style.display = 'none';
            $('#cargandoDatosSAP').hide('fade');

            var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
            var xmlData = $.parseXML(print);
            console.log(print);
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            var mensajeHU;
            try {
              var thirdPartyNode = $(xmlData).find("E_MATERIALDOCUMENT")[0];
              var mensajeRespuesta4 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));

              var thirdPartyNode = $(xmlData).find("E_MBLNR_541")[0];
              var mensajeRespuesta5 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));

              var thirdPartyNode = $(xmlData).find("MATERIALDOCUMENT")[0];
              var mensajeRespuesta1 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));

              var thirdPartyNode = $(xmlData).find("PEDIDO")[0];
              mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));

              var thirdPartyNode = $(xmlData).find("E_EXIDV")[0];
              mensajeHU = (serializeXmlNode(thirdPartyNode).split("\t").join(""));

            } catch (e) {
              mensajeRespuesta1 = '"No se generó documento material, favor consultar en SAP';
            }

            if (mensajeRespuesta1 == '<MATERIALDOCUMENT xmlns="http://tempuri.org/"/>') {
              mensajeRespuesta1 = 'ERROR, No se generó documento material, favor consultar en SAP';
            }

            var thirdPartyNode = $(xmlData).find("MESSAGE")[0]; //MESSAGE
            var mensajeRespuesta3 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
            console.log(mensajeRespuesta4)
            document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + mensajeRespuesta1 + '</p><h1>Mov. 541:</h1> <p>' + mensajeRespuesta5 + '</p><h1>Doc. Material Orden:</h1> <p>' + mensajeRespuesta4 + '</p><h1>Pedido:</h1><p>' + mensajeRespuesta2 + '</p><h1>E_EXIDV</h1><p>' + mensajeHU + '</p><h1>Mensaje:</h1><p>' + mensajeRespuesta3 + '</p></div>';

          }
          if (xmlhttp.status == 500) {
            document.getElementById('loadingCajaEmabalda').style.display = 'none';
            $('#cargandoDatosSAP').hide('fade');
            document.getElementById('btnError').style.display = 'block';
            document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = 'El servidor rechazó recepción de datos!'
            $rootScope.blockReEnvio = 0;
          }
        }
      }
      // Send the POST request
      xmlhttp.setRequestHeader('Content-Type', 'text/xml;charset=utf-8');
      xmlhttp.send(sr);
    } else {
      document.getElementById('loadingCajaEmabalda').style.display = 'none';
      document.getElementById('btnContinuar_').style.display = 'block';
      $('#cargandoDatosSAP').hide('fade');
      document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = "DATOS DEMOS CORRECTOS";
    }

  }
  $scope.btnAceptar = function() {
    //avanzar('','StockAlmacen','fadeInRight');
    $scope.btnGeneraXML = 'block';
    $scope.navegacionPagina('PROD_FiltroProductor', 'fadeInRight', '/reset');
  }

})
