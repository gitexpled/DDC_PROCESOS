appExpled.lazyController('ctrMercadoInterno', function($scope, $routeParams, $rootScope) {
  $rootScope.datosMI = {
    selFechaContabilizacion: '',
    fechaEmbalagePakingTab: '',
    material: {
      MAKTG: '',
      MATNR: ''
    },
    tipoEnvase: {
      MAKTG: '',
      MATNR: ''
    },
    lotePacking: '',
    cantidadEnvase: '',
    kilos: '',
    cantidad: '',
    tipoBins: '',
    cantidadEnvase: ''
  }
  $scope.mostrarRespuesta = function(estado) {
    if (estado == true) {
      $scope.verPopRespuesta = "block";
    } else {
      $scope.verPopRespuesta = "none";
    }
  }
  $scope.clienteSeleccion = "none";
  if ($rootScope.userData.mail == "servicio") {
    $scope.clienteSeleccion = "";
  }
  $scope.mostrarRespuesta(false);
  $rootScope.kiloInicial = $rootScope.dataSeleccion.totalKilo;
  $scope.controlDescarte = function() {
    var kilos = $rootScope.kiloInicial;
    if ($rootScope.datosMI.cantidad == "" || $rootScope.datosMI.cantidad == 0 || $rootScope.datosMI.cantidad == undefined) {
      $rootScope.dataSeleccion.totalKilo = $rootScope.kiloInicial;
    } else {
      if (!isNaN($rootScope.datosMI.cantidad)) {
        kilos = $rootScope.dataSeleccion.totalKilo - ($rootScope.datosMI.cantidad);
        if (!isNaN(kilos)) {
          if (kilos >= 0)
            $rootScope.dataSeleccion.totalKilo = kilos.toFixed(3);
          else {
            $rootScope.alert.show({
              message: "Los kilos no pueden ser menor a cero"
            });
            $rootScope.datosDesecho.kilos = 0;
            $rootScope.dataSeleccion.totalKilo = $rootScope.kiloInicial;
          }
        } else {
          $rootScope.dataSeleccion.totalKilo = $rootScope.kiloInicial;
        }
      } else {
        $rootScope.dataSeleccion.totalKilo = $rootScope.kiloInicial;
      }
    }
  }
  if ($rootScope.dataSeleccion.especie.VALUE_CHAR === "ARANDANOS") {
    $scope.campoCarozo = "block";
  } else {
    $scope.campoCarozo = "none";
  }
  $scope.listarMaterial = [];
  if ($rootScope.userData.mail == "servicio") {
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function(value, key) {
      if (value.MTART == "UNBW" &&
        value.ZMAT_ESPECIE == $rootScope.dataSeleccion.especie.VALUE_CHAR &&
        value.ZMAT_VIGENTE == "SI" &&
        value.ZMAT_PROCESO == "SMNACIONAL") {
        $scope.listarMaterial.push({
          MAKTG: value.MAKTG,
          MATNR: value.MATNR,
          KG: value.NTGEW
        });
      }
    })
  } else {
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function(value, key) {
      if (value.MTART == "FERT" &&
        value.ZMAT_ESPECIE == $rootScope.dataSeleccion.especie.VALUE_CHAR &&
        value.ZMAT_VIGENTE == "SI" &&
        value.ZMAT_PROCESO == "MNACIONAL") {
        $scope.listarMaterial.push({
          MAKTG: value.MAKTG,
          MATNR: value.MATNR,
          KG: value.NTGEW
        });
      }
    })
  }
  $scope.listarMaterialZVER = [];
  angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function(value, key) {
    if (value.MTART == "ZVER" &&
      value.ZMAT_VIGENTE == "SI" &&
      value.ZMAT_FORMATO == "BINS") {
      $scope.listarMaterialZVER.push({
        MAKTG: value.MAKTG,
        MATNR: value.MATNR,
        KG: value.NTGEW
      });
    }
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
  $scope.selFechaContabilizacionOpciones = [{
    value: $scope.mostrarFecha(0),
    name: $scope.mostrarFecha2(0)
  }];
  $scope.embalajePakingContinuar = function() {
    if ($rootScope.userData.mail == "servicio") {
      $scope.ContinuarServicio();
      return;
    }
    var jsonValidate = [{
        campo: "Fecha Conatabolización",
        value: $rootScope.datosMI.selFechaContabilizacion,
        type: "aSelect",
        index: "value"
      },
      {
        campo: "Cantidad",
        value: $rootScope.datosMI.cantidad,
        type: "input"
      },
      {
        campo: "Cantidad Envase",
        value: $rootScope.datosMI.cantidadEnvase,
        type: "input"
      },
      {
        campo: "Material",
        value: $rootScope.datosMI.material,
        type: "aSelect",
        index: "MATNR"
      },
      {
        campo: "Tipo Bins",
        value: $rootScope.datosMI.tipoBins,
        type: "aSelect",
        index: "MATNR"
      },
      {
        campo: "Calibre",
        value: $rootScope.datosMI.calibre,
        type: "aSelect",
        index: "VALUE_CHAR"
      },
    ];
    if ($rootScope.userData.mail == "servicio") {
      jsonValidate.push({
        campo: "Cliente",
        value: $rootScope.datosMI.cliente,
        type: "aSelect",
        index: "VALUE_CHAR"
      })
    }
    if (!$rootScope.validaForm(jsonValidate)) return 0;
    $rootScope.blockReEnvio = 1;

    document.getElementById('btnContinuar_').style.display = 'none';
    $scope.btnGeneraXML = 'none';
    document.getElementById('btnError').style.display = 'none';
    document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '';
    $('#cargandoDatosSAP').show();
    $scope.mostrarRespuesta(true);
    var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
    cadenaXML += '    <soapenv:Header/>';
    cadenaXML += '    <soapenv:Body>';
    cadenaXML += '      <tem:ZMOV_CREATE_RECEP_PT_FRESCO>';
    cadenaXML += '         <tem:datos>';
    cadenaXML += '            <tem:HEADER>';
    cadenaXML += '               <tem:BUKRS>' + $rootScope.userData.sociedad + '</tem:BUKRS>';
    cadenaXML += '               <tem:EKORG>' + $rootScope.userData.organizacion + '</tem:EKORG>';
    cadenaXML += '               <tem:EKGRP>' + $rootScope.userData.grupoCompra + '</tem:EKGRP>';
    cadenaXML += '               <tem:BSART>' + $rootScope.userData.clasePedido + '</tem:BSART>';
    cadenaXML += '               <tem:BUDAT>' + $rootScope.datosMI.selFechaContabilizacion.value + '</tem:BUDAT>';
    cadenaXML += '               <tem:LIFNR>' + $rootScope.dataSeleccion.LIFNR + '</tem:LIFNR>';
    cadenaXML += '               <tem:XBLNR>' + $rootScope.dataSeleccion.loteProceso + '</tem:XBLNR>';
    cadenaXML += '               <tem:BKTXT>' + $rootScope.userData.usuario + '</tem:BKTXT>';
    cadenaXML += '            </tem:HEADER>';
    cadenaXML += '            <tem:LOG>';
    cadenaXML += '            </tem:LOG>';
    cadenaXML += '            <tem:LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>Z' + $rootScope.dataSeleccion.especie.VALUE_CHAR + '_CALIBRE</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosMI.calibre.VALUE_CHAR + '</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>ZEMBALA</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>DDC</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    /*cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosMI.material.MATNR)+'</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.datosMI.tipoBins.MATNR+'</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>Z'+$rootScope.dataSeleccion.especie.VALUE_CHAR+'_SENVASES</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';*/
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosMI.tipoBins.MAKTG + '</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>ZTIPOENVASE</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.COD_VARIEDAD + '</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>Z' + $rootScope.dataSeleccion.especie.VALUE_CHAR + '_VARIEDAD</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.LIFNR + '</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>ZPRODUCTOR</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.userData.CSP + '</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>ZSAG_CSP</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.HSDAT + '</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>ZFCOSECHA</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosMI.cantidadEnvase + '</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>ZNENVASES</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    /******NUEVOOOOOO*****/
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosMI.material.MATNR)+'</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.TDFRIO + '</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>ZTFRIO</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosMI.material.MATNR)+'</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.TURNO_PRD + '</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>ZTURNO</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosMI.material.MATNR)+'</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.LINEA_PRD + '</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>ZLINEA</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosMI.material.MATNR)+'</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.dataSeleccion.TIPIFICACION+'</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>TIPIFICACION</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
/******NUEVOOOOOO*****/
    if ($rootScope.userData.mail == "servicio") {
      cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosMI.cliente.VALUE_CHAR + '</tem:VALUE_CHAR>';
      cadenaXML += '               <tem:CHARACT>ZCLIENTE</tem:CHARACT>';
      cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_CARACT>';
    }
    cadenaXML += '            </tem:LT_CARACT>';
    cadenaXML += '            <tem:LT_ITEMS>';
    cadenaXML += '               <tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_ITEMS>';
    cadenaXML += '                  <tem:STCK_TYPE></tem:STCK_TYPE>';
    cadenaXML += '                  <tem:ITEM_CAT>L</tem:ITEM_CAT>';
    cadenaXML += '                  <tem:MATERIAL>' + $rootScope.datosMI.material.MATNR + '</tem:MATERIAL>';
    cadenaXML += '                  <tem:BATCH>' + angular.uppercase($rootScope.datosMI.lotePacking) + '</tem:BATCH>';
    cadenaXML += '                  <tem:QUANTITY>' + $rootScope.datosMI.cantidad + '</tem:QUANTITY>';
    cadenaXML += '                  <tem:PO_UNIT>KG</tem:PO_UNIT>';
    cadenaXML += '                  <tem:HSDAT>' + $rootScope.datosMI.selFechaContabilizacion.value + '</tem:HSDAT>';
    cadenaXML += '                  <tem:PLANT>' + $rootScope.userData.centro + '</tem:PLANT>';
    cadenaXML += '                  <tem:STGE_LOC>' + $rootScope.userData.almacenGranel + '</tem:STGE_LOC>';
    cadenaXML += '                  <tem:FREE_ITEM>X</tem:FREE_ITEM>';
    cadenaXML += '                  <tem:ITEM_CAT>L</tem:ITEM_CAT>';
    cadenaXML += '                  <tem:MOVE_BATCH></tem:MOVE_BATCH>';
    cadenaXML += '                  <tem:BATCH_GRANEL>' + angular.uppercase($rootScope.dataSeleccion.loteProceso) + '</tem:BATCH_GRANEL>';
    if ($rootScope.userData.mail == "servicio") {
      cadenaXML += '                  <tem:ACCTASSCAT>F</tem:ACCTASSCAT>';
    } else {
      cadenaXML += '                  <tem:ACCTASSCAT>' + $rootScope.dataSeleccion.ACCTASSCAT + '</tem:ACCTASSCAT>';
    }
    cadenaXML += '               </tem:ZMOV_CREATE_RECEP_PT_FRESCO_LT_ITEMS>';
    cadenaXML += '            </tem:LT_ITEMS>';
    cadenaXML += '            <tem:LT_ITEM_DEST>';
    cadenaXML += '            </tem:LT_ITEM_DEST>';
    cadenaXML += '         </tem:datos>';
    cadenaXML += '      </tem:ZMOV_CREATE_RECEP_PT_FRESCO>';
    cadenaXML += '   </soapenv:Body>';
    cadenaXML += '</soapenv:Envelope>';
    cadenaXML = cadenaXML.split('>undefined<').join('><');
    console.log(cadenaXML);


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
            console.log(xmlData);
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            var mensajeRespuesta3;
            var mensajeRespuesta4;
            var mensajeRespuesta5;
            try {
              var thirdPartyNode = $(xmlData).find("MATERIALDOCUMENT")[0];
              var mensajeRespuesta1 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));

              var thirdPartyNode = $(xmlData).find("PEDIDO")[0];
              mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));

              var thirdPartyNode = $(xmlData).find("E_MATERIALDOCUMENT")[0];
              mensajeRespuesta4 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
              var thirdPartyNode = $(xmlData).find("BATCH")[0];
              mensajeRespuesta5 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
              console.log(mensajeRespuesta5);
            } catch (e) {
              mensajeRespuesta1 = '"No se generó documento material, favor consultar en SAP';
            }

            if (mensajeRespuesta1 == '<MATERIALDOCUMENT xmlns="http://tempuri.org/"/>') {
              mensajeRespuesta1 = 'ERROR, No se generó documento material, favor consultar en SAP';
            }

            var thirdPartyNode = $(xmlData).find("MESSAGE")[0]; //MESSAGE
            var mensajeRespuesta3 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
            document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + mensajeRespuesta1 + '</p><h1>Material Document2:</h1> <p>' + mensajeRespuesta4 + '</p><h1>Pedido:</h1><p>' + mensajeRespuesta2 + '</p><h1>Lote:</h1><p>' + mensajeRespuesta5 + '</p><h1>Mensaje:</h1><p>' + mensajeRespuesta3 + '</p></div>';

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
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.send(sr);
    } else {
      document.getElementById('loadingCajaEmabalda').style.display = 'none';
      document.getElementById('btnContinuar_').style.display = 'block';
      $('#cargandoDatosSAP').hide('fade');
      document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = "DATOS DEMOS CORRECTOS";
    }
  }

  $scope.ContinuarServicio = function() {
    var jsonValidate = [{
        campo: "Fecha Conatabolización",
        value: $rootScope.datosMI.selFechaContabilizacion,
        type: "aSelect",
        index: "value"
      },
      {
        campo: "Cantidad",
        value: $rootScope.datosMI.cantidad,
        type: "input"
      },
      {
        campo: "Cantidad Envase",
        value: $rootScope.datosMI.cantidadEnvase,
        type: "input"
      },
      {
        campo: "Material",
        value: $rootScope.datosMI.material,
        type: "aSelect",
        index: "MATNR"
      },
      {
        campo: "Tipo Bins",
        value: $rootScope.datosMI.tipoBins,
        type: "aSelect",
        index: "MATNR"
      },
      {
        campo: "Calibre",
        value: $rootScope.datosMI.calibre,
        type: "aSelect",
        index: "VALUE_CHAR"
      },
    ];
    if ($rootScope.userData.mail == "servicio") {
      jsonValidate.push({
        campo: "Cliente",
        value: $rootScope.datosMI.cliente,
        type: "aSelect",
        index: "VALUE_CHAR"
      })
    }
    if (!$rootScope.validaForm(jsonValidate)) return 0;
    $rootScope.blockReEnvio = 1;

    document.getElementById('btnContinuar_').style.display = 'none';
    $scope.btnGeneraXML = 'none';
    document.getElementById('btnError').style.display = 'none';
    document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '';
    $('#cargandoDatosSAP').show();
    $scope.mostrarRespuesta(true);
    var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
    cadenaXML += '    <soapenv:Header/>';
    cadenaXML += '    <soapenv:Body>';
    cadenaXML += '      <tem:ZMOV_CREATE_RECEP_PT_FRCO_C>'; //ZMOV_CREATE_RECEP_PT_FRCO_C
    cadenaXML += '         <tem:datos>';
    cadenaXML += '            <tem:HEADER>';
    cadenaXML += '               <tem:BUKRS>' + $rootScope.userData.sociedad + '</tem:BUKRS>';
    cadenaXML += '               <tem:EKORG>' + $rootScope.userData.organizacion + '</tem:EKORG>';
    cadenaXML += '               <tem:EKGRP>' + $rootScope.userData.grupoCompra + '</tem:EKGRP>';
    cadenaXML += '               <tem:BSART>' + $rootScope.userData.clasePedido + '</tem:BSART>';
    cadenaXML += '               <tem:BUDAT>' + $rootScope.datosMI.selFechaContabilizacion.value + '</tem:BUDAT>';
    cadenaXML += '               <tem:LIFNR>' + $rootScope.dataSeleccion.LIFNR + '</tem:LIFNR>';
    cadenaXML += '               <tem:XBLNR>' + $rootScope.dataSeleccion.loteProceso + '</tem:XBLNR>';
    cadenaXML += '               <tem:BKTXT>' + $rootScope.userData.usuario + '</tem:BKTXT>';
    cadenaXML += '            </tem:HEADER>';
    cadenaXML += '            <tem:LOG>';
    cadenaXML += '            </tem:LOG>';
    cadenaXML += '            <tem:LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>Z' + $rootScope.dataSeleccion.especie.VALUE_CHAR + '_CALIBRE</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosMI.calibre.VALUE_CHAR + '</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>ZEMBALA</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>DDC</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosMI.tipoBins.MATNR + '</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>Z' + $rootScope.dataSeleccion.especie.VALUE_CHAR + '_SENVASES</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.COD_VARIEDAD + '</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>Z' + $rootScope.dataSeleccion.especie.VALUE_CHAR + '_VARIEDAD</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.LIFNR + '</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>ZPRODUCTOR</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.userData.CSP + '</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>ZSAG_CSP</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.HSDAT + '</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>ZFCOSECHA</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosMI.cantidadEnvase + '</tem:VALUE_CHAR>';
    cadenaXML += '               <tem:CHARACT>ZNENVASES</tem:CHARACT>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';

    /*NUEVOS */
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosMI.material.MATNR)+'</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>ZTURNO</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>'+ $rootScope.dataSeleccion.TURNO_PRD +'</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosMI.material.MATNR)+'</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>ZLINEA</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.LINEA_PRD + '</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosMI.material.MATNR)+'</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>ZTFRIO</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.dataSeleccion.TDFRIO + '</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    cadenaXML += '               <tem:MATERIAL>'+angular.uppercase($rootScope.datosMI.material.MATNR)+'</tem:MATERIAL>';
    cadenaXML += '               <tem:BATCH></tem:BATCH>';
    cadenaXML += '               <tem:CHARACT>TIPIFICACION</tem:CHARACT>';
    cadenaXML += '               <tem:VALUE_CHAR>'+$rootScope.dataSeleccion.TIPIFICACION+'</tem:VALUE_CHAR>';
    cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    /*NUEVOS */

    if ($rootScope.userData.mail == "servicio") {
      cadenaXML += '            <tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
      cadenaXML += '               <tem:MATERIAL>' + angular.uppercase($rootScope.datosMI.material.MATNR) + '</tem:MATERIAL>';
      cadenaXML += '               <tem:BATCH></tem:BATCH>';
      cadenaXML += '               <tem:VALUE_CHAR>' + $rootScope.datosMI.cliente.VALUE_CHAR + '</tem:VALUE_CHAR>';
      cadenaXML += '               <tem:CHARACT>ZCLIENTE</tem:CHARACT>';
      cadenaXML += '            </tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_CARACT>';
    }
    cadenaXML += '            </tem:LT_CARACT>';
    cadenaXML += '            <tem:LT_ITEMS>';
    cadenaXML += '               <tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_ITEMS>';
    cadenaXML += '                  <tem:STCK_TYPE></tem:STCK_TYPE>';
    cadenaXML += '                  <tem:ITEM_CAT>L</tem:ITEM_CAT>';
    cadenaXML += '                  <tem:MATERIAL>' + $rootScope.datosMI.material.MATNR + '</tem:MATERIAL>';
    cadenaXML += '                  <tem:BATCH>' + angular.uppercase($rootScope.datosMI.lotePacking) + '</tem:BATCH>';
    cadenaXML += '                  <tem:QUANTITY>' + $rootScope.datosMI.cantidad + '</tem:QUANTITY>';
    cadenaXML += '                  <tem:PO_UNIT>KG</tem:PO_UNIT>';
    cadenaXML += '                  <tem:HSDAT>' + $rootScope.datosMI.selFechaContabilizacion.value + '</tem:HSDAT>';
    cadenaXML += '                  <tem:PLANT>' + $rootScope.userData.centro + '</tem:PLANT>';
    cadenaXML += '                  <tem:STGE_LOC>' + $rootScope.userData.almacenGranel + '</tem:STGE_LOC>';
    cadenaXML += '                  <tem:FREE_ITEM>X</tem:FREE_ITEM>';
    cadenaXML += '                  <tem:ITEM_CAT>L</tem:ITEM_CAT>';
    cadenaXML += '                  <tem:MOVE_BATCH></tem:MOVE_BATCH>';
    cadenaXML += '                  <tem:BATCH_GRANEL>' + angular.uppercase($rootScope.dataSeleccion.loteProceso) + '</tem:BATCH_GRANEL>';
    if ($rootScope.userData.mail == "servicio") {
      cadenaXML += '                  <tem:ACCTASSCAT>F</tem:ACCTASSCAT>';
    } else {
      cadenaXML += '                  <tem:ACCTASSCAT>' + $rootScope.dataSeleccion.ACCTASSCAT + '</tem:ACCTASSCAT>';
    }
    cadenaXML += '               </tem:ZMOV_CREATE_RECEP_PT_FRCO_C_LT_ITEMS>';
    cadenaXML += '            </tem:LT_ITEMS>';
    cadenaXML += '            <tem:LT_ITEM_DEST>';
    cadenaXML += '            </tem:LT_ITEM_DEST>';
    cadenaXML += '         </tem:datos>';
    cadenaXML += '      </tem:ZMOV_CREATE_RECEP_PT_FRCO_C>';
    cadenaXML += '   </soapenv:Body>';
    cadenaXML += '</soapenv:Envelope>';
    cadenaXML = cadenaXML.split('>undefined<').join('><');
    console.log(cadenaXML);


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
            console.log(xmlData);
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            var mensajeRespuesta3;
            var mensajeRespuesta4;
            var mensajeRespuesta5;
            try {
              var thirdPartyNode = $(xmlData).find("MATERIALDOCUMENT")[0];
              var mensajeRespuesta1 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));

              var thirdPartyNode = $(xmlData).find("PEDIDO")[0];
              mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));

              var thirdPartyNode = $(xmlData).find("E_MATERIALDOCUMENT")[0];
              mensajeRespuesta4 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
              var thirdPartyNode = $(xmlData).find("BATCH")[0];
              mensajeRespuesta5 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
              console.log(mensajeRespuesta5);
            } catch (e) {
              mensajeRespuesta1 = '"No se generó documento material, favor consultar en SAP';
            }

            if (mensajeRespuesta1 == '<MATERIALDOCUMENT xmlns="http://tempuri.org/"/>') {
              mensajeRespuesta1 = 'ERROR, No se generó documento material, favor consultar en SAP';
            }

            var thirdPartyNode = $(xmlData).find("MESSAGE")[0]; //MESSAGE
            var mensajeRespuesta3 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
            document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = '<div class="contabilizar-text"> <h1>Material Document:</h1> <p>' + mensajeRespuesta1 + '</p><h1>Material Document2:</h1> <p>' + mensajeRespuesta4 + '</p><h1>Pedido:</h1><p>' + mensajeRespuesta2 + '</p><h1>Lote:</h1><p>' + mensajeRespuesta5 + '</p><h1>Mensaje:</h1><p>' + mensajeRespuesta3 + '</p></div>';

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
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.send(sr);
    } else {
      document.getElementById('loadingCajaEmabalda').style.display = 'none';
      document.getElementById('btnContinuar_').style.display = 'block';
      $('#cargandoDatosSAP').hide('fade');
      document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = "DATOS DEMOS CORRECTOS";
    }
  }
})
