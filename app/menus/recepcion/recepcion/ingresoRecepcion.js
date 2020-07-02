appExpled.lazyController('ingresoRecepcion', function ($scope, $routeParams, $rootScope, $http, $window) {
    $scope.mostrarUAT = "none";
    $scope.verSelProductor = "none";
    $scope.verPopRespuesta = "none";
    $rootScope.totalNeto = "";
    $rootScope.kilosTotales = 0;
    if ($rootScope.new == true) {
        $rootScope.datosGranel = {
            productor: [],
            detalle: [],
            LIFNR: [],
            BUDAT: '',
            HSDAT: '',
            datosCer: [],
            UAT: { VALUE_CHAR: '' },
            MATERIAL: [],
            VARIEDAD: '',
            ZCUARTEL: '',
            ZPATENTE: '',
            ZCONDUCTOR: '',
            XBLNR: '',
            TRATAMIENTO: '',
            KILOS: '',
            TIPOMATERIAL: { VALUE_CHAR: '' },
            ESPECIE: $rootScope.seleccionEspecie.DESCRIPTION,
            ZPREDIO: [],
            tipoBins: [],
            kilosBrutosCamion: '',
            kilosDestareCamion: '',
            CANTIDADBINS: '',
            LOTE: 0,
            LOTE2: 0,
            TIPOFRIO: '',
            observacion: '',
            fechaEntrada: '',
            fechaSalida: '',
        };
    }
    $scope.actualizaKilos = function () {
        if (isNaN($rootScope.datosGranel.kilosBrutosCamion)) {
            if ($rootScope.datosGranel.kilosBrutosCamion != "") {
                $rootScope.datosGranel.kilosBrutosCamion = "";
                $rootScope.alert.show({ message: "Solo puede ingresar numeros en los Kilos Bruto Camion" });
                return 0;
            }
        }
        if (isNaN($rootScope.datosGranel.kilosDestareCamion)) {
            if ($rootScope.datosGranel.kilosDestareCamion != "") {
                $rootScope.datosGranel.kilosDestareCamion = "";
                $rootScope.alert.show({ message: "Solo puede ingresar numeros en los Kilos Destare Camion" });
                return 0;
            }
        }
        if (isNaN($rootScope.datosGranel.CANTIDADBINS)) {
            if ($rootScope.datosGranel.CANTIDADBINS != "") {
                $rootScope.datosGranel.CANTIDADBINS = "";
                $rootScope.alert.show({ message: "Solo puede ingresar numeros en los Kilos Destare Camion" });
                return 0;
            }
        }
        //console.log($rootScope.datosGranel);
        var totalKilosBins = $rootScope.datosGranel.CANTIDADBINS * $rootScope.datosGranel.tipoBins.KILOS;
        var totalNeto = ($rootScope.datosGranel.kilosBrutosCamion - $rootScope.datosGranel.kilosDestareCamion - totalKilosBins).toFixed(2);
        if (totalNeto < 0) {
            $rootScope.kilosTotales = 0;
            $rootScope.alert.show({ message: "El peso neto no puede ser inferior a 0" });
            return 0;
        } else {
            if (isNaN(totalNeto)) {
                $rootScope.kilosTotales = 0;
            } else
                $rootScope.kilosTotales = totalNeto;
        }
        var t = $rootScope.formatNumber($rootScope.kilosTotales);
        $(function () {
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
        { value: $scope.mostrarFecha(-0), name: $scope.mostrarFecha(0) },
    ];
    $scope.selFechaCosechaOpciones = [
        { value: $scope.mostrarFecha(-6), name: $scope.mostrarFecha(-6) },
        { value: $scope.mostrarFecha(-5), name: $scope.mostrarFecha(-5) },
        { value: $scope.mostrarFecha(-4), name: $scope.mostrarFecha(-4) },
        { value: $scope.mostrarFecha(-3), name: $scope.mostrarFecha(-3) },
        { value: $scope.mostrarFecha(-2), name: $scope.mostrarFecha(-2) },
        { value: $scope.mostrarFecha(-1), name: $scope.mostrarFecha(-1) },
        { value: $scope.mostrarFecha(-0), name: $scope.mostrarFecha(0) },
    ];
    $scope.listaTratamiento = [];
    angular.forEach($rootScope.ZMOV_QUERY_TRATAMIENTO, function (value, key) {
        $scope.listaTratamiento.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR });
    });
    $scope.listaTipoFrio = [];
    angular.forEach($rootScope.ZMOV_QUERY_TIPO_FRIO, function (value, key) {
        $scope.listaTipoFrio.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR });
    });
    $scope.materialesTipoBins = [];
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function (value, key) {
        if (//value.ZMAT_ESPECIE===$rootScope.datosExportadora.especie.DESCRIPTION
            value.ZMAT_VIGENTE === "SI"
            && value.ZMAT_PROCESO === "RECEPCION"
            && value.ZMAT_TIPO === "DESTARE"
        ) {
            $scope.materialesTipoBins.push({ DESCRIPTION: value.MAKTG, VALUE_CHAR: value.MATNR, KILOS: value.NTGEW });

        }
    });
    $scope.materialesProductorOpciones = [];
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function (value, key) {
        if ($rootScope.userData.mail == "servicio") {
            if (
                value.ZMAT_ESPECIE === $rootScope.seleccionEspecie.DESCRIPTION
                && value.ZMAT_VIGENTE === "SI"
                && value.ZMAT_PROCESO === "SRECEPCION"
                && value.MTART === "UNBW") {
                console.log(value)
                $scope.materialesProductorOpciones.push({ DESCRIPTION: value.MAKTG, VALUE_CHAR: value.MATNR });
            }

        } else {
            if (
                value.ZMAT_ESPECIE === $rootScope.seleccionEspecie.DESCRIPTION
                && value.ZMAT_VIGENTE === "SI"
                && value.ZMAT_PROCESO === "RECEPCION"
                && value.MTART === "ROH"
                //||($rootScope.userData.mail=="servicio"	&& value.MATNR==="MSE-MANZANAS")
            ) {
                console.log(value)
                $scope.materialesProductorOpciones.push({ DESCRIPTION: value.MAKTG, VALUE_CHAR: value.MATNR });
            }
        }
    });

    $scope.listaProductores = [];
    var arrPrd = [];
    angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PRODUCT, function (value, key) {
        if (true
            //&& value.ZPRD_VIGENTE === "SI"
            && value.ESPECIE === $rootScope.seleccionEspecie.DESCRIPTION
        ) {
            if (arrPrd.indexOf(value.LIFNR) === -1) {
                $scope.listaProductores.push({ text: value.LIFNR, value: value.LIFNR, nombre: value.NAME1, LIFNR: value.LIFNR, MANDT: value.MANDT });
                arrPrd.push(value.LIFNR);
            }
        }
    });
    console.log($scope.listaProductores);
    
    $(function () {
        $('#selProductor').immybox({
            choices: $scope.listaProductores
        });
    });
    $scope.showRecepcionesViewv = function () {
        $rootScope.listaCamionesRecepcionaAUX = [];
        var arguments = 'patente=' + $rootScope.datosGranel.ZPATENTE + '&guia=' + $rootScope.datosGranel.XBLNR + '&centro=' + $rootScope.userData.centro + '&especie=' + $rootScope.seleccionEspecie.DESCRIPTION + '&proceso=listaRecepcion';
        //console.log(arguments);
        var jsonUrl = IPSERVER + '/JSON_DB_RECEPCION.aspx?' + arguments;
        console.log(jsonUrl)
        $http({
            method: 'GET',
            url: jsonUrl,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }).success(function (data) {
            $rootScope.listaCamionesRecepcion = [];
            angular.forEach(data, function (value, key) {
                if ($rootScope.userData.centro == value.centro && value.especie == $rootScope.seleccionEspecie.DESCRIPTION) {
                    $rootScope.listaCamionesRecepcion.push(value.dataGranel);
                }
            });
            $('#selectFormProductor').show();
            $('#formProductor').hide();
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    }
    $scope.showCamionViewv = function () {
        $rootScope.listaCamionesRecepcion = [];
        var arguments = 'patente=' + $rootScope.datosGranel.ZPATENTE + '&guia=' + $rootScope.datosGranel.XBLNR + '&centro=' + $rootScope.userData.centro + '&especie=' + $rootScope.seleccionEspecie.DESCRIPTION + '&proceso=listaRecepcion';
        var jsonUrl = IPSERVER + '/JSON_DB_RECEPCION.aspx?' + arguments;
        console.log(jsonUrl);
        if ($rootScope.datosGranel.ZPATENTE === undefined) {
            $rootScope.alert.show({ message: "Seleccione patente" });
            return 0;
        }
        if ($rootScope.datosGranel.XBLNR === undefined) {
            $rootScope.alert.show({ message: "Seleccione guía" });
            return 0;
        }
        var dg = [];
        dg = JSON.parse(JSON.stringify($rootScope.datosGranel))
        var listaCamionesRecepcionaAUX = [];
        $http({
            method: 'GET',
            url: jsonUrl,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }).success(function (data) {
            angular.forEach(data, function (value, key) {
                if (value.dataGranel.ZPATENTE !== $rootScope.datosGranel.ZPATENTE && value.dataGranel.ZPATENTE != '') {
                    listaCamionesRecepcionaAUX.push(JSON.parse(JSON.stringify(value.dataGranel)));
                }
            });
            $rootScope.listaCamionesRecepcion = listaCamionesRecepcionaAUX;
            $rootScope.listaCamionesRecepcion.push(dg);
            $('#selectFormProductor').show();
            $('#formProductor').hide();

            $rootScope.getServicePost('DB_RECEPCION', $rootScope, 'patente=' + $rootScope.datosGranel.ZPATENTE + '&guia=' + $rootScope.datosGranel.XBLNR + '&centro=' + $rootScope.userData.centro + '&proceso=nuevaRecepcion&especie=' + $rootScope.seleccionEspecie.DESCRIPTION + '&dataGranel=' + encodeURI(JSON.stringify($rootScope.datosGranel)), null);
            $scope.actualizaKilos();
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    };
    $scope.showSelectViewv = function (index) {
        $('#selectFormProductor').hide();
        $('#formProductor').show();
        var dg = [];

        angular.forEach($rootScope.listaCamionesRecepcion, function (value, key) {
            //console.log(value.ZPATENTE,index);
            if (value.ZPATENTE === index) {
                dg = JSON.parse(JSON.stringify(value));
            }
        });
        $rootScope.datosGranel = dg;
        //console.log($rootScope.listaCamionesRecepcion);
        //console.log($rootScope.datosGranel);
        $rootScope.datoUsuario.dataGranel = JSON.stringify($rootScope.listaCamionesRecepcion);
        //$rootScope.getServicePost('DB_LOGIN',$rootScope,{User:$rootScope.datoUsuario.usuario,Pass:$rootScope.datoUsuario.clave,proceso:"setDataGranel",dataGranel:encodeURI(JSON.stringify($rootScope.listaCamionesRecepcion))} ,null);
        $rootScope.getServicePost('DB_RECEPCION', $rootScope, 'patente=' + $rootScope.datosGranel.ZPATENTE + '&guia=' + $rootScope.datosGranel.XBLNR + '&centro=' + $rootScope.userData.centro + '&dataGranel=' + encodeURI(JSON.stringify($rootScope.listaCamionesRecepcion)), null) + '&proceso=nuevaRecepcion&especie=' + $rootScope.seleccionEspecie.DESCRIPTION + '';
        $scope.actualizaKilos();
    };
    $scope.hideCamionViewv = function () {
        $('#selectFormProductor').hide();
        $('#formProductor').show();
        $rootScope.datoUsuario.dataGranel = JSON.stringify($rootScope.listaCamionesRecepcion);
        //$rootScope.getServicePost('DB_LOGIN',$rootScope,{User:$rootScope.datoUsuario.usuario,Pass:$rootScope.datoUsuario.clave,proceso:"setDataGranel",dataGranel:encodeURI(JSON.stringify($rootScope.listaCamionesRecepcion))} ,null);
        $rootScope.getServicePost('DB_RECEPCION', $rootScope, 'patente=' + $rootScope.datosGranel.ZPATENTE + '&guia=' + $rootScope.datosGranel.XBLNR + '&centro=' + $rootScope.userData.centro + '&dataGranel=' + encodeURI(JSON.stringify($rootScope.listaCamionesRecepcion)), null) + '&proceso=nuevaRecepcion&especie=' + $rootScope.seleccionEspecie.DESCRIPTION;

    };
    $scope.selPaletizaQuitar = function (data) {
        $rootScope.alert.show({
            type: "confirm",
            message: "¿Esta seguro de eliminar?",
            title: "Alerta",
            acceptButtonText: "Aceptar",
            acceptClick: function () {
                console.log("34");
                $rootScope.getServicePost('DB_RECEPCION', $rootScope, 'patente=' + data.ZPATENTE + '&guia=' + data.XBLNR + '&centro=' + $rootScope.userData.centro + '&especie=' + $rootScope.seleccionEspecie.DESCRIPTION + '&proceso=deleteRecepcion', null);
                $rootScope.listaCamionesRecepcionaAUX = [];
                var arguments = 'centro=' + $rootScope.userData.centro + '&proceso=listaRecepcion&especie=' + $rootScope.seleccionEspecie.DESCRIPTION;
                var jsonUrl = IPSERVER + '/JSON_DB_RECEPCION.aspx?' + arguments;
                $rootScope.listaCamionesRecepcion = [];
                $http({
                    method: 'GET',
                    url: jsonUrl,
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                }).success(function (data) {
                    angular.forEach(data, function (value, key) {
                        if ($rootScope.userData.centro == value.centro && value.especie == $rootScope.seleccionEspecie.DESCRIPTION) {
                            if (data.ZPATENTE != value.dataGranel.ZPATENTE && data.XBLNR != value.dataGranel.XBLNR)
                                $rootScope.listaCamionesRecepcion.push(JSON.parse(JSON.stringify(value.dataGranel)));
                        }
                    });
                    $rootScope.alert.display = "none";
                }).error(function (data, status, headers, config) {
                    //console.log(data);
                })
            },
            cancelButtonText: "Cancelar"
        });
    }
    $scope.mostrarProductores = function (estado) {
        if (estado == true) {
            $scope.verSelProductor = "block";
        } else {
            $scope.verSelProductor = "none";
        }
    }
    $scope.seleccionProductor = function () {
        angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PRODUCT, function (value, key) {
            if (document.getElementById('selProductor').value == value.LIFNR) {
                $rootScope.datosGranel.LIFNR = {
                    VALUE_CHAR: value.LIFNR,
                    DESCRIPTION: value.NAME1,
                    MANDT: value.MANDT,
                    COPEQUEN: value.REGSS,
                    COD_CSG: value.COD_CSG
                };
                if (value.REGSS == "X") {
                    $scope.mostrarREGSS();
                } else {
                    $scope.mostrarUAT = "none";
                }
                $scope.variedadOpciones = [];
                angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_VAR, function (value, key) {
                    if (value.ESPECIE === $rootScope.seleccionEspecie.DESCRIPTION && $rootScope.datosGranel.LIFNR.VALUE_CHAR == value.LIFNR) {
                        $scope.variedadOpciones.push({ DESCRIPTION: value.VAR, VALUE_CHAR: value.COD_VAR })
                    }
                });
                $scope.getPredios();
            }
        });
        $scope.mostrarProductores(false);
        return;
    }
    $scope.mostrarREGSS = function () {
        $scope.mostrarUAT = "block";
        $scope.listarUAT = [];
        angular.forEach($rootScope.JSON_ZMF_GET_UAT, function (value, key) {
            if (value.CROP == $rootScope.seleccionEspecie.VALUE_CHAR && value.PRODUCTOR == $rootScope.datosGranel.LIFNR.VALUE_CHAR) {
                $scope.listarUAT.push({
                    DESCRIPTION: value.UAT, VALUE_CHAR: value.UAT, AUFNR_YM: value.AUFNR_YM, AUFNR_HM: value.AUFNR_HM,
                    HARVEST_MATERIAL: value.HARVEST_MATERIAL, HARVEST_MATERIAL: value.HARVEST_MATERIAL, RECEIVER_MATERIAL: value.RECEIVER_MATERIAL
                });
            }
        })

    }
    /*[11-11-2016 18:56:09] Rodrigo Huenuman: AUFNR_YM
[11-11-2016 18:56:16] Rodrigo Huenuman: AUFNR_HM
[11-11-2016 18:56:28] Rodrigo Huenuman: HARVEST_MATERIAL
YARD_MATERIAL
 RECEIVER_MATERIAL*/
    $scope.validaUAT = function () {
        var msje = "Faltan los siguientes campos UAT: ";
        var count = 0;
        if ($rootScope.datosGranel.UAT.RECEIVER_MATERIAL == "") {
            count++;
            msje += "- Material Transformacion ";
        } if ($rootScope.datosGranel.UAT.YARD_MATERIAL == "") {
            count++;
            msje += "- Material Fruto ";
        }
        if ($rootScope.datosGranel.UAT.HARVEST_MATERIAL == "") {
            count++;
            msje += "- Material Cosecha ";
        }
        if ($rootScope.datosGranel.UAT.AUFNR_HM == "") {
            count++;
            msje += "- Orden CO Fruto ";
        }
        if ($rootScope.datosGranel.UAT.AUFNR_YM == "") {
            count++;
            msje += "- CO Cosecha";
        }

        if (count > 0) {
            $rootScope.datosGranel.UAT = {};
            $rootScope.alert.show({ message: msje });
        }
    }
    $scope.getPredios = function () {
        $rootScope.listaPredio = [];//ZPRD_CSDP , NAME1=PRODUCTOR
        angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_SDP, function (value, key) {
            if (true
                && value.ESPECIE === $rootScope.seleccionEspecie.DESCRIPTION && value.LIFNR === $rootScope.datosGranel.LIFNR.VALUE_CHAR
            ) {

                if ($scope.listaPredio.indexOf(value.SDP) === -1 && value.ESPECIE === $rootScope.seleccionEspecie.DESCRIPTION && value.LIFNR === $rootScope.datosGranel.LIFNR.VALUE_CHAR) {
                    $scope.listaPredio.push({ DESCRIPTION: value.SDP, VALUE_CHAR: value.SDP, MANDT: value.MANDT })
                }
            }
        });
    }
    $scope.plp = function () {
        $rootScope.listaCuartel = [];
        console.log($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_CU)
        angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_CU, function (value, key) {
            if (true
                && value.LIFNR === $rootScope.datosGranel.LIFNR.VALUE_CHAR && value.ESPECIE === $rootScope.seleccionEspecie.DESCRIPTION
            ) {
                $scope.listaCuartel.push({ DESCRIPTION: value.CU01, VALUE_CHAR: value.CU01, LIFNR: value.CU01 })
            }
        });

    }
    $scope.validarut = function () {
        console.log($('#rutCliente').val());
        if (!$.validateRut($('#rutCliente').val())) {
            $rootScope.alert.show({ message: "El Rut no es valido" });
            $rootScope.datosGranel.rut = '';
            /*$scope.alert = {
              show: true,
              message: "El Rut no es valido",
              title: "Mensaje",
              confirm: true
            }
            item.ngModel = '';*/
            return;
        }
        /*$('#rutCliente').rut({
                on_error: function () {
                  $timeout(function () {
                  }, 100);
                },
                format_on: 'keyup'
          })*/
    }
    $scope.changue_rut = function () {
        $('#rutCliente').rut({
            on_error: function () {
                $timeout(function () {
                }, 100);
            },
            format_on: 'keyup'
        })
    }
    $scope.productorContinuear = function () {

        var cam = $rootScope.datosGranel.kilosBrutosCamion;
        if ($rootScope.datosGranel.LIFNR.VALUE_CHAR == "" || $rootScope.datosGranel.LIFNR.VALUE_CHAR == undefined) {
            $rootScope.alert.show({ message: "Campo PRODUCTOR se encuentra vacio" });//PRODUCTOR
        }
        else if ($rootScope.datosGranel.ZPREDIO == "") {
            $rootScope.alert.show({ message: "Campo PREDIO se encuentra vacio" });//PREDIO
        }
        else if ($rootScope.datosGranel.BUDAT == "") {
            $rootScope.alert.show({ message: "Campo FECHA CONTABILIZACION se encuentra vacio" });//FECHA_CONTABILIZACION
        }
        else if ($rootScope.datosGranel.HSDAT == "") {
            $rootScope.alert.show({ message: "Campo FECHA COSECHA se encuentra vacio" });//FECHA_COSECHA
        }
        else if ($rootScope.datosGranel.TIPOMATERIAL == "") {
            $rootScope.alert.show({ message: "Campo TIPO MATERIAL se encuentra vacio" });//MATERIAL
        }
        else if ($rootScope.datosGranel.VARIEDAD === "") {
            console.log($rootScope.datosGranel.VARIEDAD);
            $rootScope.alert.show({ message: "Campo VARIEDAD se encuentra vacio" });
        }
        else if ($rootScope.datosGranel.XBLNR == "") {
            $rootScope.alert.show({ message: "Campo GUIA DE DESPACHO se encuentra vacio" });//GUIA_DESPACHO
        }
        else if ($rootScope.datosGranel.transporte == "") {
            $rootScope.alert.show({ message: "Campo TRANSPORTE se encuentra vacio" });//PATENTE
        }
        else if ($rootScope.datosGranel.ZPATENTE == "") {
            $rootScope.alert.show({ message: "Campo PATENTE se encuentra vacio" });//PATENTE
        }
        else if ($rootScope.datosGranel.ZCONDUCTOR == "") {
            $rootScope.alert.show({ message: "Campo CONDUCTOR se encuentra vacio" });//CONDUCTOR
        } else if ($rootScope.datosGranel.rut == "") {
            $rootScope.alert.show({ message: "Campo RUT se encuentra vacio" });//CONDUCTOR
        }

        else {
            var totalKilosBins = $rootScope.datosGranel.CANTIDADBINS * $rootScope.datosGranel.tipoBins.KILOS;
            $rootScope.resumenTotalNeto = ($rootScope.datosGranel.kilosBrutosCamion - $rootScope.datosGranel.kilosDestareCamion - totalKilosBins).toFixed(2);
            $rootScope.QUANTITY = ($rootScope.resumenTotalNeto / $rootScope.datosGranel.CANTIDADBINS).toFixed(2);
            if ($rootScope.seleccionEspecie.VALUE_CHAR != "CIRUELAS-OLD") {
                $rootScope.goToPage('/recepcionGranel', { animation: "fadeInRight" });
            } else
                $rootScope.goToPage('/resumenRecepcionEspecie', { animation: "fadeInRight" });
        }
    };

    $scope.bluetoothopen = function () {
        $rootScope.displayBt = "";
    };
    $scope.hideBluetooth = function () {
        $rootScope.displayBt = "none";
    }
    $scope.btGetKilos = function (tipo) {
        if (APPMOVIL) {
            if (tipo === "camion") {
                $rootScope.datosGranel.kilosBrutosCamion = appConfig.blueTooth.data;
            } else {
                $rootScope.datosGranel.kilosDestareCamion = appConfig.blueTooth.data;
            }
        }
    }
})
appExpled.lazyController('recepcionGranel', function ($scope, $routeParams, $rootScope, $http) {
    console.log($rootScope.datosGranel.LIFNR.COPEQUEN)
    $scope.accion = "new";
    $rootScope.idxTabSub = 0;
    $rootScope.imprimirCamion = "none";
    $rootScope.RecepDDC = "";
    $rootScope.countTab = 0;
    $rootScope.ListaGranel = [];
    $rootScope.datosCere = [];
    $rootScope.datosGranel.KILOSBRUTO = 0;
    $rootScope.datosGranel.CANTIDADLOTE = 0;
    $rootScope.datosGranel.UNIDADLOTE = 0;
    $rootScope.datosGranel.LOTE_FINAL = 0;
    $rootScope.datosGranel.selTipoMaterialGranel = 0;
    $rootScope.datosGranel.selCantidadGranel = 0;
    $rootScope.datosGranel.selCantidadGranel2 = 0;
    $rootScope.datosGranel.Destare2 = 0;
    $rootScope.datosGranel.selCantidadGranel3 = 0;
    $rootScope.datosGranel.selTipoMaterialGranel3 = 0;
    $rootScope.datosGranel.selCantidadGranel4 = 0;
    $rootScope.datosGranel.Destare4 = 0;
    $rootScope.datosGranel.TotalCantidadB = 0;
    $rootScope.datosGranel.pesoUltimoLote = 0;
    $rootScope.datosGranel.KILOSNETO = 0;

    $rootScope.xmlData = { aux: "NO", data: "" }
    $rootScope.CerezaCamion = {
        view: "none",
        Camion: "NO",
        idxTab: 0,
        reimprime: 'none',
        viewCam: "none",
        KILOS: "KILOS",
        bins: "none",
        RBines: "NO",
        Eliminar1: "block",
        Eliminar2: "none",
        save: "none",
        W: "100%"
    };
    $rootScope.CerezaCamion = {
        Camion: "SI",
        idxTab: 0,
        reimprime: 'none'
    }
    $rootScope.SubDetalleBase = {
        SubId: Math.random(),
        selCantidadGranel: 0,
        selCantidadGranel2: 0,
        formato_mat: '',
        selTipoMaterialGranel: { VALUE_CHAR: '' },
        selTipoMaterialGranel2: 0,
        Destare2: { VALUE_CHAR: '' }
    }
    $rootScope.datosGranel.DetalleBase = {
        id: Math.random(),
        KILOSBRUTO: 0,
        totalNeto: 0.0,
        TotalNeto: 0.0,
        subDetalle: [JSON.parse(JSON.stringify($rootScope.SubDetalleBase))]
    }
    $scope.materialesOpciones = [];
    $scope.materialesOpciones2 = [];
    $scope.materialesOpciones.push({ DESCRIPTION: 'SELECCIONE', VALUE_CHAR: '', KILOS: 0, ZMAT_FORMATO: '' });
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function (value, key) {
        if (value.ZMAT_TIPO == "DESTARE" &&
            value.ZMAT_VIGENTE == "SI" &&
            value.ZMAT_PROCESO == "RECEPCION" &&
            value.MTART == "ZVER" &&
            (value.ZMAT_CLASE == "PADRE" || value.ZMAT_CLASE == "HIJO")) {
            $scope.materialesOpciones.push({ DESCRIPTION: value.MATNR + ' ' + value.MAKTG + ' ' + value.NTGEW + ' ' + value.GEWEI, VALUE_CHAR: value.MATNR, KILOS: value.NTGEW, ZMAT_FORMATO: value.ZMAT_FORMATO });
        }
    });
    /*angular.forEach($rootScope.ZMOV_QUERY_MATERIAL,function (value, key){
        if(value.ZMAT_TIPO=="DESTARE" &&
                value.ZMAT_VIGENTE =="SI" &&
                value.ZMAT_PROCESO=="RECEPCION" &&
                value.MTART =="ZVER" &&
                value.ZMAT_CLASE =="HIJO"){
            console.log(value)
        $scope.materialesOpciones.push({ DESCRIPTION: value.MAKTG+' '+value.NTGEW+' '+value.GEWEI,VALUE_CHAR:value.MATNR ,KILOS:value.NTGEW,ZMAT_FORMATO:value.ZMAT_FORMATO});
    }
    });*/
    $scope.AddItemInicio = function () {
        $rootScope.datosGranel.detalle.push(JSON.parse(JSON.stringify($rootScope.datosGranel.DetalleBase)));
        $rootScope.datosGranel.DetalleBase.id = Math.random();
        console.log($rootScope.datosGranel.detalle);
    }
    //$scope.AddItems();
    $scope.AddItems = function () {
        if ($scope.validaFormRecep2() == 0) {
            return 0;
        }
        if ($rootScope.CerezaCamion.Camion == "SI") {
            $rootScope.SubDetalleBase.SubId = Math.random();
            $rootScope.datosGranel.detalle[0].subDetalle.push(JSON.parse(JSON.stringify($rootScope.SubDetalleBase)));
            $rootScope.SubDetalleBase.SubId++;
            $rootScope.idxTabSub++;
            console.log($rootScope.SubDetalleBase);
        }
        else {

            $rootScope.CerezaCamion.idxTab++;
            $rootScope.datosGranel.detalle.unshift(JSON.parse(JSON.stringify($rootScope.datosGranel.DetalleBase)));
            $rootScope.datosGranel.DetalleBase.id = Math.random();
        }
    }
    var arguments = 'especie=' + $rootScope.seleccionEspecie.DESCRIPTION + '&centro=' + $rootScope.userData.centro + '&proceso=listaRecepcion';
    var jsonUrl = IPSERVER + '/JSON_DB_RECEPCION.aspx?' + arguments;
    console.log(jsonUrl)
    $http({
        method: 'GET',
        url: jsonUrl,
        //contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    })
        .success(function (data) {
            var dg = [];
            var dg2 = [];
            angular.forEach(data, function (value, key) {
                if (value.especie == $rootScope.seleccionEspecie.DESCRIPTION
                    && value.patente == $rootScope.datosGranel.ZPATENTE) {
                    $rootScope.ListaGranel.push(value.dataGranel.detalle);
                    $rootScope.datosCere.push(value.datosCer);
                }
            });
            if ($rootScope.ListaGranel.length == 0) {
                $rootScope.datosGranel.detalle = [];
                $scope.AddItemInicio();
            }
            else if ($rootScope.ListaGranel[0].length == 0) {
                $rootScope.datosGranel.detalle = [];
                $scope.AddItemInicio();
            } else {
                $rootScope.datosGranel.detalle = [];
                angular.forEach($rootScope.ListaGranel, function (value, key) {
                    dg = JSON.parse(JSON.stringify(value));
                })
                console.log($rootScope.datosCere)
                if ($rootScope.datosCere[0].Camion == "SI" || $rootScope.datosCere[0].Camion == "NO") {
                    angular.forEach($rootScope.datosCere, function (value, key) {
                        dg2 = JSON.parse(JSON.stringify(value));
                    })
                    $rootScope.CerezaCamion = dg2;
                }
                $rootScope.datosGranel.detalle = dg;
                $scope.cambioNeto();
            }
        });
    $scope.Chnge = function () {
        console.log($rootScope.CerezaCamion)
        var detalle = $rootScope.datosGranel.detalle;
        var SubDetalle = $rootScope.datosGranel.detalle[0].subDetalle;
        if ($rootScope.CerezaCamion.Camion == "SI") {
            if (detalle.length < 2) {
                $rootScope.CerezaCamion.viewCam = "block";
                $rootScope.CerezaCamion.bins = "block";
                $rootScope.CerezaCamion.Eliminar2 = "block";
                $rootScope.CerezaCamion.Eliminar1 = "none";
                $rootScope.CerezaCamion.W = "80%";
                $rootScope.CerezaCamion.save = "block";
                $rootScope.CerezaCamion.KILOS = "Kilos Bruto Camion";
            } else {
                $rootScope.alert.show({
                    message: "Si confirma se borrara el progreso", type: "confirm",
                    cancelClick: function () {
                        $rootScope.CerezaCamion.Camion = "NO";
                        $rootScope.alert.display = 'none';
                    },
                    acceptClick: function () {
                        $rootScope.datosGranel.detalle = [];
                        $scope.AddItemInicio();
                        $rootScope.CerezaCamion.viewCam = "block";
                        $rootScope.CerezaCamion.bins = "block";
                        $rootScope.CerezaCamion.Eliminar2 = "block";
                        $rootScope.CerezaCamion.Eliminar1 = "none";
                        $rootScope.CerezaCamion.W = "80%";
                        $rootScope.CerezaCamion.save = "block";
                        $rootScope.CerezaCamion.KILOS = "Kilos Bruto Camion";
                        $rootScope.alert.display = 'none';
                        $rootScope.CerezaCamion = {
                            Camion: "SI",
                            idxTab: 0,
                            reimprime: 'none'
                        }
                        $rootScope.idxTabSub = 0;
                    }
                });
            }
        }
        else if ($rootScope.CerezaCamion.Camion == "NO") {
            if (SubDetalle.length < 2) {
                $rootScope.datosGranel.kilosBrutosCamion = 0;
                $rootScope.CerezaCamion.viewCam = "none";
                $rootScope.CerezaCamion.bins = "none";
                $rootScope.CerezaCamion.Eliminar2 = "none";
                $rootScope.CerezaCamion.Eliminar1 = "block";
                $rootScope.CerezaCamion.W = "100%";
                $rootScope.CerezaCamion.save = "none";
                $rootScope.CerezaCamion.KILOS = "KILOS";
            } else {
                $rootScope.alert.show({
                    message: "Si confirma se borrara el progreso", type: "confirm",
                    cancelClick: function () {
                        $rootScope.CerezaCamion.Camion = "NO";
                        $rootScope.alert.display = 'none';
                    },
                    acceptClick: function () {
                        $rootScope.datosGranel.detalle = [];
                        $scope.AddItemInicio();
                        $rootScope.datosGranel.kilosBrutosCamion = 0;
                        $rootScope.CerezaCamion.viewCam = "none";
                        $rootScope.CerezaCamion.bins = "none";
                        $rootScope.CerezaCamion.Eliminar2 = "none";
                        $rootScope.CerezaCamion.Eliminar1 = "block";
                        $rootScope.CerezaCamion.KILOS = "KILOS";
                        $rootScope.CerezaCamion.W = "100%";
                        $rootScope.CerezaCamion.save = "none";
                        $rootScope.alert.display = 'none';
                    }
                });
            }
        }
    };
    $scope.eliminarLoteGranel = function (id) {
        var detalle = $rootScope.datosGranel.detalle;
        var SubDetalle = $rootScope.datosGranel.detalle[0].subDetalle;
        if ($rootScope.CerezaCamion.Camion == "NO") {
            $rootScope.CerezaCamion.idxTab--;
            for (var i = 0; i < detalle.length; i++) {
                if (id == detalle[i].id) {
                    $rootScope.datosGranel.detalle.splice(i, 1);
                }
            }
        }
        else if ($rootScope.CerezaCamion.Camion == "SI") {
            $rootScope.idxTabSub--;
            for (var i = 0; i < SubDetalle.length; i++) {
                if (id == SubDetalle[i].SubId) {
                    $rootScope.datosGranel.detalle[0].subDetalle.splice(i, 1);
                    $scope.cambioNeto();
                }
            }
        }
    };


    $scope.validaFormRecep2 = function () {
        console.log($rootScope.CerezaCamion.Camion)
        if ($rootScope.datosGranel.detalle.length == 0) return 1;
        if ($rootScope.CerezaCamion.Camion == "SI") {
            var jsonValidate = [
                { campo: "Kilo Bruto", value: $rootScope.datosGranel.detalle[0].KILOSBRUTO, type: "number", min: 1, max: 999999999999999 },
                //{campo:"Material Destare",value:$rootScope.datosGranel.detalle[$rootScope.CerezaCamion.idxTab].subDetalle[$rootScope.idxTabSub].selTipoMaterialGranel,type:"aSelect",index:"VALUE_CHAR"},
                { campo: "Cantidad", value: $rootScope.datosGranel.detalle[$rootScope.CerezaCamion.idxTab].subDetalle[$rootScope.idxTabSub].selCantidadGranel, type: "number", min: 1, max: 999999999999999 },
            ];
            if (!$rootScope.validaForm(jsonValidate)) return 0;
        } else {
            var jsonValidate = [
                { campo: "Kilo Bruto", value: $rootScope.datosGranel.detalle[0].KILOSBRUTO, type: "number", min: 1, max: 999999999999999 },
                //{campo:"Material Destare",value:$rootScope.datosGranel.detalle[$rootScope.CerezaCamion.idxTab].subDetalle[$rootScope.idxTabSub].selTipoMaterialGranel,type:"aSelect",index:"VALUE_CHAR"},
                { campo: "Cantidad", value: $rootScope.datosGranel.detalle[$rootScope.CerezaCamion.idxTab].subDetalle[$rootScope.idxTabSub].selCantidadGranel, type: "number", min: 1, max: 999999999999999 },
            ];
            if (!$rootScope.validaForm(jsonValidate)) return 0;
        }
    }
    $scope.validaFormRecep = function () {
        console.log($rootScope.CerezaCamion.Camion)
        if ($rootScope.datosGranel.detalle.length == 0) return 1;
        if ($rootScope.CerezaCamion.Camion == "SI") {
            var jsonValidate = [
                { campo: "Kilo Bruto", value: $rootScope.datosGranel.detalle[0].KILOSBRUTO, type: "number", min: 1, max: 999999999999999 },
                { campo: "Kilo Destare", value: $rootScope.datosGranel.kilosBrutosCamion, type: "number", min: 1, max: 999999999999999 },
                //{campo:"Material Destare",value:$rootScope.datosGranel.detalle[$rootScope.CerezaCamion.idxTab].subDetalle[$rootScope.idxTabSub].selTipoMaterialGranel,type:"aSelect",index:"VALUE_CHAR"},
                // {campo:"Cantidad",value:$rootScope.datosGranel.detalle[$rootScope.CerezaCamion.idxTab].subDetalle[$rootScope.idxTabSub].selCantidadGranel,type:"number",min:1,max:999999999999999},
            ];
            if (!$rootScope.validaForm(jsonValidate)) return 0;
        } else {
            var jsonValidate = [
                { campo: "Kilo Bruto", value: $rootScope.datosGranel.detalle[0].KILOSBRUTO, type: "number", min: 1, max: 999999999999999 },
                // {campo:"Material Destare",value:$rootScope.datosGranel.detalle[$rootScope.CerezaCamion.idxTab].subDetalle[$rootScope.idxTabSub].selTipoMaterialGranel,type:"aSelect",index:"VALUE_CHAR"},
                //{campo:"Cantidad",value:$rootScope.datosGranel.detalle[$rootScope.CerezaCamion.idxTab].subDetalle[$rootScope.idxTabSub].selCantidadGranel,type:"number",min:1,max:999999999999999},
            ];
            if (!$rootScope.validaForm(jsonValidate)) return 0;
        }
    }
    $scope.datosTabResumenGranel = function () {

        if ($scope.validaFormRecep() == 0) {
            return 0;
        }
        $scope.GuardarRecepcion();
        if ($rootScope.seleccionEspecie.DESCRIPTION == "CEREZA" && $rootScope.CerezaCamion.Camion == "SI") {
            if ($rootScope.datosGranel.kilosBrutosCamion == "" || isNaN($rootScope.datosGranel.kilosBrutosCamion) || $rootScope.datosGranel.kilosBrutosCamion == null) {
                $rootScope.alert.show({ message: "El campo Destare Camion no puede estar vacioo ser letras" });

            }
            else {
                $rootScope.goToPage('/resumenRecepcionEspecie', { animation: "fadeInRight" });
            }
        }
        else {
            $rootScope.goToPage('/resumenRecepcionEspecie', { animation: "fadeInRight" });
        }
    }
    $scope.generaXML_Granel = function () {
        var cadenaXML = '';
        cadenaXML += '\
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
               <tem:BUDAT>'+ $rootScope.datosGranel.BUDAT + '</tem:BUDAT>\
               <tem:LIFNR>'+ $rootScope.datosGranel.LIFNR.VALUE_CHAR + '</tem:LIFNR>\
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
        angular.forEach($rootScope.datosGranel.detalle, function (value, key) {
            cadenaXML += '<!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
                  <tem:MATERIAL>'+ value.selTipoMaterialGranel.VALUE_CHAR + '</tem:MATERIAL>\
                  <tem:BATCH>'+ value.BATCH + '</tem:BATCH>\
                  <tem:CHARACT>0</tem:CHARACT>\
                  <tem:VALUE_CHAR>2220</tem:VALUE_CHAR>\
               </tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>';
            cadenaXML += '<!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>\
                  <tem:MATERIAL>'+ value.selTipoMaterialGranel.VALUE_CHAR + '</tem:MATERIAL>\
                  <tem:BATCH>'+ value.BATCH + '</tem:BATCH>\
                  <tem:CHARACT>ZUNIDAD_LOTE</tem:CHARACT>\
                  <tem:VALUE_CHAR>xxx</tem:VALUE_CHAR>\
               </tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_CARACT>';
        });

        cadenaXML += '</tem:LT_CARACT><tem:LT_ITEMS>';
        angular.forEach($rootScope.datosGranel.detalle, function (value, key) {
            cadenaXML += '<!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_ITEMS>\
                  <tem:STCK_TYPE></tem:STCK_TYPE>\
                  <tem:MATERIAL>'+ value.selTipoMaterialGranel.VALUE_CHAR + '</tem:MATERIAL>\
                  <tem:BATCH>'+ value.BATCH + '</tem:BATCH>\
                  <tem:QUANTITY>1000</tem:QUANTITY>\
                  <tem:PO_UNIT>KG</tem:PO_UNIT>\
                  <tem:HSDAT>'+ $rootScope.datosGranel.HSDAT + '</tem:HSDAT>\
                  <tem:PLANT>DC02</tem:PLANT>\
                  <tem:STGE_LOC>PA03</tem:STGE_LOC>\
                  <tem:FREE_ITEM>0</tem:FREE_ITEM>\
                  <tem:ITEM_CAT>0</tem:ITEM_CAT>\
                  <tem:MOVE_BATCH></tem:MOVE_BATCH>\
               </tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_ITEMS>';
        });
        cadenaXML += '</tem:LT_ITEMS><tem:LT_ITEM_DEST>';
        angular.forEach($rootScope.datosGranel.detalle, function (value, key) {
            cadenaXML += '<!--Zero or more repetitions:-->\
               <tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_ITEM_DEST>\
                  <tem:LFPOS>0</tem:LFPOS>\
                  <tem:MATERIAL>'+ value.selTipoMaterialGranel.VALUE_CHAR + '</tem:MATERIAL>\
                  <tem:QUANTITY>'+ value.selTipoMaterialGranel.selCantidadGranel2 + '</tem:QUANTITY>\
                  <tem:PO_UNIT></tem:PO_UNIT>\
                  <tem:WERKS>0/tem:WERKS>\
                  <tem:LGORT>0</tem:LGORT>\
               </tem:ZMOV_CREATE_RECEP_GR_FRESCO_LT_ITEM_DEST>';
        });
        cadenaXML += '</tem:LT_ITEMS><tem:LT_ITEM_DEST>\
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
            data: cadenaXML
        }).success(function (data) {
            $rootScope.loading.hide();
            console.log(data);
        }).error(function (data) {
            $rootScope.loading.hide();
            console.log(data)
        });
    }

    $scope.cambioNeto = function () {
        if ($rootScope.CerezaCamion.Camion == "SI") {
            if ($rootScope.datosGranel.kilosBrutosCamion > $rootScope.datosGranel.detalle[0].KILOSBRUTO) {
                $rootScope.alert.show({ message: "No puede ser mayor a KILOS BRUTO CAMION" });
                $rootScope.datosGranel.kilosBrutosCamion = 0;
            }
        }
        var DestareTotal = 0;
        var KilosCamion = 0;
        var SUMBINS = 0;
        var SUMMAT1 = 0;
        var SUMCANT = 0;
        var SUMMAT2 = 0;
        var selCantidadGranel = 0;
        var selCantidadGranel2 = 0;
        $rootScope.pesoEnvase = 0;
        var Destare2 = 0;
        var maxFilas = 0;
        $rootScope.SUMCANT = 0;
        if ($rootScope.CerezaCamion.Camion == "SI") {
            angular.forEach($rootScope.datosGranel.detalle, function (value, key) {
                angular.forEach(value.subDetalle, function (subValue, subKey) {
                    if (!isNaN(subValue.selCantidadGranel)) {
                        selCantidadGranel = subValue.selCantidadGranel;
                    }
                    if (!isNaN(subValue.selCantidadGranel2)) {
                        selCantidadGranel2 = subValue.selCantidadGranel2;
                    }
                    if (!isNaN(subValue.Destare2.KILOS)) {
                        Destare2 = subValue.Destare2.KILOS;
                    }
                    $rootScope.pesoEnvase = $rootScope.pesoEnvase + (selCantidadGranel * subValue.selTipoMaterialGranel.KILOS);
                    $rootScope.pesoEnvase = $rootScope.pesoEnvase + (selCantidadGranel2 * Destare2);
                    KilosCamion = value.KILOSBRUTO - $rootScope.datosGranel.kilosBrutosCamion;
                    value.selCantidadGranel = subValue.selCantidadGranel;
                    SUMBINS = SUMBINS + selCantidadGranel;
                    SUMMAT1 = SUMMAT1 + subValue.selTipoMaterialGranel.KILOS;
                    SUMCANT = SUMCANT + selCantidadGranel2;
                    SUMMAT2 = SUMMAT2 + Destare2;
                    subValue.totalselCantidadGranel = SUMBINS;
                    if (subValue.selCantidadGranel2 == 0) {
                        subValue.def_cant = 1;
                    } else {
                        subValue.def_cant = subValue.selCantidadGranel2;
                    }
                    if (subValue.Destare2.VALUE_CHAR != "") {
                        subValue.formato_mat = subValue.Destare2.VALUE_CHAR;
                    } else {
                        subValue.formato_mat = subValue.selTipoMaterialGranel.VALUE_CHAR;
                    }
                });
                console.log($rootScope.pesoEnvase)
                DestareTotal = SUMBINS * SUMMAT1 + SUMCANT * SUMMAT2;
                value.TotalNeto = (KilosCamion - DestareTotal).toFixed(3);
                DestareTotal = (KilosCamion - DestareTotal) / SUMBINS;
                if (isNaN(DestareTotal)) { value.totalNeto = 0; }
                else { value.totalNeto = DestareTotal.toFixed(2); }
            });
        }
        else if ($rootScope.CerezaCamion.Camion == "NO") {
            angular.forEach($rootScope.datosGranel.detalle, function (value, key) {
                angular.forEach(value.subDetalle, function (subValue, subKey) {
                    if (!isNaN(subValue.selCantidadGranel)) {
                        selCantidadGranel = subValue.selCantidadGranel;
                    }
                    if (!isNaN(subValue.Destare2.KILOS)) {
                        Destare2 = subValue.Destare2.KILOS;
                    }
                    if (!isNaN(subValue.selCantidadGranel2)) {
                        selCantidadGranel2 = subValue.selCantidadGranel2;
                    }
                    SUMBINS = SUMBINS + selCantidadGranel;
                    KilosCamion = value.KILOSBRUTO - $rootScope.datosGranel.kilosBrutosCamion;
                    DestareTotal = subValue.selCantidadGranel * subValue.selTipoMaterialGranel.KILOS + subValue.selCantidadGranel2 * Destare2;
                    value.TotalNeto = (KilosCamion - DestareTotal).toFixed(3);
                    DestareTotal = (KilosCamion - DestareTotal) / subValue.selCantidadGranel;
                    if (subValue.selCantidadGranel2 == 0) {
                        subValue.def_cant = 1;
                    } else {
                        subValue.def_cant = subValue.selCantidadGranel2;
                    }
                    if (subValue.Destare2.VALUE_CHAR != "") {
                        subValue.formato_mat = subValue.Destare2.VALUE_CHAR;
                    } else {
                        subValue.formato_mat = subValue.selTipoMaterialGranel.VALUE_CHAR;
                    }
                })
                value.SUMBINS = selCantidadGranel;
                value.fila = $rootScope.CerezaCamion.idxTab;
                if (isNaN(DestareTotal)) { value.totalNeto = 0; } else { value.totalNeto = DestareTotal.toFixed(2); }
            });
        }
        $rootScope.SUMCANT = SUMCANT;
        $rootScope.datosGranel.TotalCantidadB = SUMBINS;
        $rootScope.datosGranel.maxFilas = maxFilas;
        console.log(SUMBINS, maxFilas)

        var KILOSNETO = 0;
        var peso1 = 0;
        var peso2 = 0;
        var peso3 = 0;
        var peso4 = 0;

        if ($rootScope.datosGranel.selTipoMaterialGranel.KILOS > 0) {
            peso1 = $rootScope.datosGranel.selCantidadGranel * $rootScope.datosGranel.selTipoMaterialGranel.KILOS;
        }
        if ($rootScope.datosGranel.Destare2.KILOS > 0) {
            peso2 = $rootScope.datosGranel.selCantidadGranel2 * $rootScope.datosGranel.Destare2.KILOS;
        }
        if ($rootScope.datosGranel.selTipoMaterialGranel3.KILOS > 0) {
            peso3 = $rootScope.datosGranel.selCantidadGranel3 * $rootScope.datosGranel.selTipoMaterialGranel3.KILOS;
        }
        if ($rootScope.datosGranel.Destare4.KILOS > 0) {
            peso4 = $rootScope.datosGranel.selCantidadGranel4 * $rootScope.datosGranel.Destare4.KILOS;
        }
        if ($rootScope.CerezaCamion.Camion == "NO") {
            KILOSNETO = $rootScope.datosGranel.detalle[0].KILOSBRUTO - peso1 - peso2 - peso3 - peso4;
        } else {
            KILOSNETO = $rootScope.datosGranel.detalle[0].KILOSBRUTO - $rootScope.datosGranel.kilosBrutosCamion - peso1 - peso2 - peso3 - peso4;
        }
        if ($rootScope.datosGranel.selCantidadGranel > 0) {
            var PesoBins = KILOSNETO / $rootScope.datosGranel.selCantidadGranel;
            $rootScope.datosGranel.detalle[0].totalNeto = PesoBins.toFixed(2);
        }

        $rootScope.datosGranel.KILOSNETO = KILOSNETO;
    };

    $scope.CalculaUnidades = function () {
        console.log($rootScope.datosGranel.selCantidadGranel);
        console.log($rootScope);
        console.log($rootScope.datosGranel);
        var cantidad = 0;
        if ($rootScope.datosGranel.selCantidadGranel > 0 && $rootScope.datosGranel.CANTIDADLOTE > 0) {
            cantidad = $rootScope.datosGranel.selCantidadGranel / $rootScope.datosGranel.CANTIDADLOTE;
        }
        $rootScope.datosGranel.UNIDADLOTE = parseInt(cantidad);
        var ultimoLote = $rootScope.datosGranel.selCantidadGranel - (parseInt(cantidad) * ($rootScope.datosGranel.CANTIDADLOTE - 1));
        $rootScope.datosGranel.pesoUltimoLote = ultimoLote;

    };
    $scope.GuardarRecepcion = function () {
        console.log($rootScope.datosGranel.detalle)
        var arguments = 'centro=' + $rootScope.userData.centro + '&especie=' + $rootScope.seleccionEspecie.DESCRIPTION + '&dataGranel=' + encodeURI(JSON.stringify($rootScope.datosGranel)) + '&dato=' + encodeURI(JSON.stringify($rootScope.CerezaCamion)) + '&patente=' + $rootScope.datosGranel.ZPATENTE + '&guia=' + $rootScope.datosGranel.XBLNR + '&proceso=nuevaRecepcion';
        var jsonUrl = IPSERVER + '/JSON_DB_RECEPCION.aspx?' + arguments;
        $http({
            method: 'GET',
            url: jsonUrl,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }).success(function (data) { console.log(data) })
    };
    $scope.imprimir = function (reimprime) {
        console.log('hola');
        $rootScope.httpRequest.successRedirect = "imprime";
        $rootScope.loading.display = "";
        $rootScope.LoadingMercados = "";
        document.getElementById('popRespuestaLotesPaking').innerHTML = '';
        document.getElementById('loadingLotesPaking').style.display = '';
        var direccionImpresora = $rootScope.userData.ipZebra;
        var codP = $rootScope.datosGranel.LIFNR.VALUE_CHAR;
        var nomP = $rootScope.datosGranel.LIFNR.DESCRIPTION;
        nomP = nomP.substring(0, 19);
        var nomP2 = $rootScope.datosGranel.LIFNR.DESCRIPTION;
        nomP2 = nomP2.substring(20, 39);
        var COD_CSG = $rootScope.datosGranel.LIFNR.COD_CSG;
        var sdp = $rootScope.datosGranel.ZPREDIO.VALUE_CHAR;
        //var CodV = '2220/BROOKS';
        var FECHCOS = $rootScope.datosGranel.HSDAT.value;
        var especie = $rootScope.seleccionEspecie.DESCRIPTION;
        var codVar = $rootScope.datosGranel.VARIEDAD.VALUE_CHAR;
        var mantr = $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR;
        var nomVar = $rootScope.datosGranel.VARIEDAD.DESCRIPTION;

        var SUMCANT = $rootScope.SUMCANT;
        // var Material = $rootScope.datosMaterial.MATERIAL.DESCRIPTION;
        var cantt = $rootScope.datosGranel.CANTIDADLOTE;
        var dato = $rootScope.userData.zpl;
        dato = dato.split("{COD_PROD}").join(codP);
        dato = dato.split("{NOM_PROD}").join(nomP);
        dato = dato.split("{NOM_PROD2}").join(nomP2);
        dato = dato.split("{SDP}").join(sdp);
        dato = dato.split("{ENVASE}").join(SUMCANT);
        dato = dato.split("{ESPECIE}").join(especie);
        dato = dato.split("{MATNR}").join(mantr);
        dato = dato.split("{CSG}").join(COD_CSG);
        dato = dato.split("{FECH_COSECHA}").join(FECHCOS);
        dato = dato.split("{COD_VAR}").join(codVar);
        dato = dato.split("{VARIEDAD}").join(nomVar);
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '   <tem:print>';
        cadenaXML += '   <tem:cant>' + cantt + '</tem:cant>';
        cadenaXML += '   <tem:zpl>' + dato + '</tem:zpl>';
        cadenaXML += '   <tem:IP>' + direccionImpresora + '</tem:IP>';
        cadenaXML += '   <tem:centro>' + $rootScope.userData.centro + '</tem:centro>';
        cadenaXML += '   <tem:continuaLote>' + reimprime + '</tem:continuaLote>';
        cadenaXML += '   <tem:loteReimprime>' + $rootScope.datosGranel.LOTE + '</tem:loteReimprime>';
        cadenaXML += '   </tem:print>';
        cadenaXML += '   </soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';
        cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML);
        $rootScope.mostrarRespuesta(true);
        var parser = new DOMParser();;
        var docXml = parser.parseFromString(cadenaXML, "text/xml");
        if ($rootScope.datoUsuario.idUsuario != "demo") {
            var xmlhttp = new XMLHttpRequest();
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            xmlhttp.open('POST', $rootScope.userData.wsPrint, true);
            var sr = cadenaXML;
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        document.getElementById('btnContinuar_').style.display = 'block';
                        document.getElementById('loadingLotesPaking').style.display = 'none';
                        $rootScope.LoadingMercados = "none";
                        var mensajeRespuesta1;
                        var mensajeRespuesta2;
                        var MATERIALDOCUMENT;
                        var MATERIALDOCUMENT_BD;
                        var PEDIDO;
                        var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
                        //$("#response").text(print)
                        var xmlData = $.parseXML(print);
                        console.log('Hola Mario');
                        try {
                            var thirdPartyNode = $(xmlData).find("printResult")[0];
                            console.log(thirdPartyNode)
                            $rootScope.btnContinuar = "block";
                            MATERIALDOCUMENT = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                            var estadoImpresion = MATERIALDOCUMENT.split(";");
                            MATERIALDOCUMENT = estadoImpresion[0];
                            if (estadoImpresion[0] == '<printResult xmlns="http://tempuri.org/">OK') {
                                $rootScope.datosGranel.LOTE = (estadoImpresion[1]).replace("</printResult>", "");
                                $rootScope.datosGranel.fechaEntrada = $rootScope.getFechaHora();
                                var loteImpresa = $rootScope.datosGranel.LOTE;
                                loteImpresa = loteImpresa.split("-");
                                $rootScope.datosGranel.LOTE2 = loteImpresa[0];
                            }
                            console.log(estadoImpresion[0]);
                            mensajeRespuesta1 = estadoImpresion[1];
                            $scope.men = estadoImpresion[1]
                            var lot = $rootScope.datosGranel.LOTE;
                            $rootScope.datosGranel.detalle[0].aux = "SI";
                            $rootScope.datosGranel.detalle[0].btnGeneraXML = "none";
                            $rootScope.CerezaCamion.reimprime = "";
                            $rootScope.xmlData.data = lot;
                            $scope.GuardarRecepcion();
                        } catch (e) {
                            mensajeRespuesta1 = 'FALLA EN LA IMPRESIÓN';
                        }
                        try {
                            var thirdPartyNode = $(xmlData).find("MESSAGE")[0];
                            mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        } catch (e) {
                            mensajeRespuesta2 = 'NO HAY MENSAJES';
                        }
                        document.getElementById('popRespuestaLotesPaking').innerHTML = '<div class="contabilizar-text"> <h1>Estado impresión:</h1> <p>' + MATERIALDOCUMENT + '</p><h1>N°Partida:</h1> <p>' + mensajeRespuesta1 + '</p><div></div><div></div> </div>';
                        $('#cargandoPopLotesPaking').hide('fade');
                        //$scope.men = mensajeRespuesta1;
                    }
                    else if (xmlhttp.status == 500) {
                        document.getElementById('loadingLotesPaking').style.display = 'none';
                        $('#cargandoDatosSAP').hide('fade');
                        document.getElementById('btnError').style.display = 'block';
                        document.getElementById('popRespuestaLotesPaking').innerHTML = 'El servidor rechazó recepción de datos!';
                        $rootScope.blockReEnvio = 0;
                    } else {
                        console.log(xmlhttp);
                    }
                }
            }
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
        }
        else {
            $scope.btnContinuar = false;
            document.getElementById('loadingLotesPaking').style.display = 'none';
            document.getElementById('popRespuestaLotesPaking').innerHTML = "DATOS DEMOS CORRECTOS";
            $('#cargandoDatosSAP').hide('fade');
        }
    }
    $scope.showResumen = function () {
        $rootScope.imprimirCamion = "";
        $rootScope.RecepDDC = "none";
    }
    $scope.imprimirResumen = function () {
        $rootScope.imprimirCamion = "";
        $rootScope.RecepDDC = "none";
        //$scope.imprimir(false);
        if(APPMOVIL){
            $scope.printNewZPL();
        } else {
            $scope.imprimir(false);
        }
        

        /*if ($rootScope.CerezaCamion.Camion == "NO") {

        } else {
            $scope.printNewPdf();
        }*/
    }
    $scope.bluetoothopen = function () {
        $rootScope.displayBt = "";
    };
    $scope.hideBluetooth = function () {
        $rootScope.displayBt = "none";
    }
    $scope.btGetKilos = function (tipo) {
        if (APPMOVIL) {
            if (tipo === "camion") {
                $rootScope.datosGranel.kilosBrutosCamion = appConfig.blueTooth.data;
            } else {
                $rootScope.datosGranel.kilosDestareCamion = appConfig.blueTooth.data;
            }
        }
    };
    $scope.btGetKilos2 = function (id) {
        if (APPMOVIL) {
            $rootScope.datosGranel.detalle[$rootScope.CerezaCamion.idxTab].KILOSBRUTO = appConfig.blueTooth.data;
        }
    }

    $scope.printNewZPL = function () {
        var codP = $rootScope.datosGranel.LIFNR.VALUE_CHAR;
        var nomP = $rootScope.datosGranel.LIFNR.DESCRIPTION;
        nomP = nomP.substring(0, 19);
        var nomP2 = $rootScope.datosGranel.LIFNR.DESCRIPTION;
        nomP2 = nomP2.substring(20, 39);
        var COD_CSG = $rootScope.datosGranel.LIFNR.COD_CSG;
        var sdp = $rootScope.datosGranel.ZPREDIO.VALUE_CHAR;
        //var CodV = '2220/BROOKS';
        var FECHCOS = $rootScope.datosGranel.HSDAT.value;
        var especie = $rootScope.seleccionEspecie.DESCRIPTION;
        var codVar = $rootScope.datosGranel.VARIEDAD.VALUE_CHAR;
        var mantr = $rootScope.datosGranel.TIPOMATERIAL.VALUE_CHAR;
        var nomVar = $rootScope.datosGranel.VARIEDAD.DESCRIPTION;

        var SUMCANT = $rootScope.SUMCANT;
        var zpl = "";

        var contNumLote = 0;
        for (var i = 1; i <= $rootScope.datosGranel.CANTIDADLOTE; i++) {
            var lote = "";
            contNumLote++;
            lote = $rootScope.datosGranel.LOTE_FINAL + "-" + ("00" + contNumLote).slice(-2)

            var dato = $rootScope.userData.zpl;
            dato = dato.split("{COD_PROD}").join(codP);
            dato = dato.split("{NOM_PROD}").join(nomP);
            dato = dato.split("{NOM_PROD2}").join(nomP2);
            dato = dato.split("{SDP}").join(sdp);
            dato = dato.split("{ENVASE}").join(SUMCANT);
            dato = dato.split("{ESPECIE}").join(especie);
            dato = dato.split("{MATNR}").join(mantr);
            dato = dato.split("{CSG}").join(COD_CSG);
            dato = dato.split("{FECH_COSECHA}").join(FECHCOS);
            dato = dato.split("{COD_VAR}").join(codVar);
            dato = dato.split("{VARIEDAD}").join(nomVar);
            dato = dato.split("*VALORREMPLAZO*").join(lote);
            zpl += dato + "^PQ1,0,1,Y^XZ";
        }

        var config = { "ip": $rootScope.userData.ipZebra, "zpl": zpl };
        console.log(config);
        if (APPMOVIL) {
            cordova.plugins.ZplWifiPrinter.print(config, successCallback, errorCallback);
        }
        $rootScope.goToPage('/resumenRecepcionEspecie', { animation: "fadeInRight" });
    }
    $http({
        method: 'POST',
        url: IPSERVER + '/GET_LOTE_NEW.aspx?USER=' + $rootScope.userData.idUsuario + '&CENTRO=' + angular.uppercase($rootScope.userData.centro),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        timeout: 500000
    }).success(function (data) {
        console.log(data);
        $rootScope.datosGranel.LOTE_FINAL = data;
    }).error($rootScope.httpRequest.error);

    $scope.alert = {
        show: false
    };
    $rootScope.print = function (html) {
        cordova.plugins.printer.print(html, { duplex: 'long' }, function (res) {
            //alert(res ? 'Done' : 'Canceled');
        });
    };

});
var app = angular.module('plunker', []);
app.directive('ngConfirmClick', [
    function () {
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click', function (event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }])
