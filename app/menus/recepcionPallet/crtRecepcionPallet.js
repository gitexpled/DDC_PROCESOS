appExpled.lazyController('recepPaletizadaProductor', function ($scope, $routeParams, $rootScope, $http) {
    $scope.mostrarUAT = "none";
    console.log($rootScope.TIPIFICACION);
    $rootScope.datosGranel = {
        fechaContabilizacion: '',
        HSDAT: '',
        material: [],
        ZPREDIO: '',
        ZCUARTEL: '',
        XBLNR: '',
        detalle: [],
        LIFNR: [],
        UAT: ''
    };
    if ($rootScope.dataSeleccionCaja.especie.VALUE_CHAR == "UVAS") {
        $scope.visibleIDG = "";
        $scope.visibleIDP = "";
    } else {
        $scope.visibleIDG = "none";
        $scope.visibleIDP = "none";
    }
    $scope.mostrarProductores = function (estado) {
        if (estado == true) {
            $scope.verSelProductor = "block";
        } else {
            $scope.verSelProductor = "none";
        }
    }
    // estableser oculto
    $scope.mostrarProductores(false);
    $scope.listaProductores = [];
    var arrPrd = [];
    angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PRODUCT, function (value, key) {
        if (true
            && value.ESPECIE === $rootScope.dataSeleccionCaja.especie.DESCRIPTION
        ) {
            if (arrPrd.indexOf(value.LIFNR) === -1) {
                $scope.listaProductores.push({ text: value.LIFNR, value: value.LIFNR, nombre: value.NAME1, LIFNR: value.LIFNR, MANDT: value.MANDT });
                arrPrd.push(value.LIFNR);
            }
        }
    });
    $(function () {
        $('#selProductor').immybox({
            choices: $scope.listaProductores
        });
    });
    $scope.seleccionProductor = function () {
        angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PRODUCT, function (value, key) {
            if (document.getElementById('selProductor').value == value.LIFNR) {
                console.log(value)
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
                    if (value.ESPECIE === $rootScope.dataSeleccionCaja.especie.DESCRIPTION && $rootScope.datosGranel.LIFNR.VALUE_CHAR == value.LIFNR) {
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
            if (value.CROP == $rootScope.dataSeleccionCaja.especie.DESCRIPTION && value.PRODUCTOR == $rootScope.datosGranel.LIFNR.VALUE_CHAR) {
                $scope.listarUAT.push({
                    DESCRIPTION: value.UAT, VALUE_CHAR: value.UAT, AUFNR_YM: value.AUFNR_YM, AUFNR_HM: value.AUFNR_HM,
                    HARVEST_MATERIAL: value.HARVEST_MATERIAL, HARVEST_MATERIAL: value.HARVEST_MATERIAL, RECEIVER_MATERIAL: value.RECEIVER_MATERIAL
                });
            }
        })

    }
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
                && value.ESPECIE === $rootScope.dataSeleccionCaja.especie.DESCRIPTION && value.LIFNR === $rootScope.datosGranel.LIFNR.VALUE_CHAR
            ) {

                if ($scope.listaPredio.indexOf(value.SDP) === -1 && value.ESPECIE === $rootScope.dataSeleccionCaja.especie.DESCRIPTION && value.LIFNR === $rootScope.datosGranel.LIFNR.VALUE_CHAR) {
                    $scope.listaPredio.push({ DESCRIPTION: value.SDP, VALUE_CHAR: value.SDP, MANDT: value.MANDT })
                }
            }
        });
    }
    console.log($rootScope.ZMOV_QUERY_PRODUCTOR)
    $scope.plp = function () {
        $rootScope.listaCuartel = [];
        angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_IDG, function (value, key) {
            if (true
                && value.LIFNR === $rootScope.datosGranel.LIFNR.VALUE_CHAR && value.ESPECIE === $rootScope.dataSeleccionCaja.especie.DESCRIPTION
            ) {
                console.log(value)
                $scope.listaCuartel.push({ DESCRIPTION: value.IDG, VALUE_CHAR: value.IDG, LIFNR: value.IDG })
            }
        });
        $rootScope.listaIDP = [];
        angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_IDP, function (value, key) {
            if (true
                && value.LIFNR === $rootScope.datosGranel.LIFNR.VALUE_CHAR && value.ESPECIE === $rootScope.dataSeleccionCaja.especie.DESCRIPTION
            ) {
                $scope.listaIDP.push({ DESCRIPTION: value.IDP, VALUE_CHAR: value.IDP })
            }
        });
    }

    $scope.selFechaContabilizacionOpciones = [
        { value: $scope.mostrarFecha(-6), name: $scope.mostrarFecha2(-6) },
        { value: $scope.mostrarFecha(-5), name: $scope.mostrarFecha2(-5) },
        { value: $scope.mostrarFecha(-4), name: $scope.mostrarFecha2(-4) },
        { value: $scope.mostrarFecha(-3), name: $scope.mostrarFecha2(-3) },
        { value: $scope.mostrarFecha(-2), name: $scope.mostrarFecha2(-2) },
        { value: $scope.mostrarFecha(-1), name: $scope.mostrarFecha2(-1) },
        { value: $scope.mostrarFecha(-0), name: $scope.mostrarFecha2(0) },
    ];
    $scope.selFechaCosechaOpciones = [
        { value: $scope.mostrarFecha(-6), name: $scope.mostrarFecha2(-6) },
        { value: $scope.mostrarFecha(-5), name: $scope.mostrarFecha2(-5) },
        { value: $scope.mostrarFecha(-4), name: $scope.mostrarFecha2(-4) },
        { value: $scope.mostrarFecha(-3), name: $scope.mostrarFecha2(-3) },
        { value: $scope.mostrarFecha(-2), name: $scope.mostrarFecha2(-2) },
        { value: $scope.mostrarFecha(-1), name: $scope.mostrarFecha2(-1) },
        { value: $scope.mostrarFecha(-0), name: $scope.mostrarFecha2(0) },
    ];
    $scope.productorContinuar = function () {
        var jsonValidate = [
            { campo: "Productor", value: $rootScope.datosGranel.LIFNR, type: "aSelect", index: "VALUE_CHAR" },
            { campo: "Predio", value: $rootScope.datosGranel.ZPREDIO, type: "aSelect", index: "VALUE_CHAR" },
            { campo: "Fecha Contabilizacion", value: $rootScope.datosGranel.selFechaContabilizacion, type: "aSelect", index: "value" },
            { campo: "Fecha Cosecha", value: $rootScope.datosGranel.HSDAT, type: "aSelect", index: "value" },
            { campo: "Guia Despacho", value: $rootScope.datosGranel.XBLNR, type: "input" }
        ];
        if ($rootScope.dataSeleccionCaja.especie.VALUE_CHAR == "UVAS") {
            jsonValidate.push([
                { campo: "IDP", value: $rootScope.datosGranel.IDP, type: "aSelect", index: "VALUE_CHAR" },
                { campo: "IDG", value: $rootScope.datosGranel.ZCUARTEL, type: "aSelect", index: "VALUE_CHAR" }
            ]);
        }
        if ($scope.mostrarUAT == "block") {
            jsonValidate.push({ campo: "UAT", value: $rootScope.datosGranel.UAT, type: "aSelect", index: "VALUE_CHAR" })
        }
        if ($rootScope.validaForm(jsonValidate)) $rootScope.goToPage("palletLote");
    }
})
appExpled.lazyController('recepPaletizadaPalletLote', function ($scope, $routeParams, $rootScope, localidadFactory, $http) {
    $scope.mostrarProductores = function (estado) {
        if (estado == true) {
            $scope.verSelProductor = "block";
        } else {
            $scope.verSelProductor = "none";
        }
    }
    if ($rootScope.dataSeleccionCaja.especie.VALUE_CHAR == "UVAS") {
        $scope.visibleColor = "";
        $scope.visibleTip = "none";
    } else {
        $scope.visibleColor = "none";
        $scope.visibleTip = "none";
    }
    
    $scope.listaRegion = localidadFactory.getRegion();
    $scope.listaProvincia = [];
    $scope.setProvincias = function (index) {
        $scope.listaProvincia = [];
        $scope.listaComuna = [];
        $scope.listaProvincia = localidadFactory.filProvincia(index);
    };
    $scope.Comuna = [];
    $scope.setComunas = function (index) {
        $scope.listaComuna = [];
        $scope.listaComuna = localidadFactory.filComuna(index);
    };
    $scope.pakingTipoMaterialOpciones = []
    angular.forEach($rootScope.ZMOV_QUERY_MATERIAL, function (value, key) {
        if (value.ZMAT_ESPECIE === $rootScope.dataSeleccionCaja.especie.DESCRIPTION
            && value.ZMAT_VIGENTE === "SI"
        ) {
            $scope.pakingTipoMaterialOpciones.push({ DESCRIPTION: value.MATNR, MATNR: value.MATNR, MEINS: value.MEINS })

        }
    });
    $scope.selFechaEmbalaje = [
        { value: $scope.mostrarFecha(-6), name: $scope.mostrarFecha2(-6) },
        { value: $scope.mostrarFecha(-5), name: $scope.mostrarFecha2(-5) },
        { value: $scope.mostrarFecha(-4), name: $scope.mostrarFecha2(-4) },
        { value: $scope.mostrarFecha(-3), name: $scope.mostrarFecha2(-3) },
        { value: $scope.mostrarFecha(-2), name: $scope.mostrarFecha2(-2) },
        { value: $scope.mostrarFecha(-1), name: $scope.mostrarFecha2(-1) },
        { value: $scope.mostrarFecha(-0), name: $scope.mostrarFecha2(0) },
    ];
    // console.log($scope.selFechaEmbalaje)
    $scope.agregarTab = function () {
        $scope.selTab[$rootScope.idxTab].seleccionado = "off";
        $rootScope.countTab++;
        $rootScope.idxTab = $rootScope.countTab;
        $scope.selTab.push({ idx: $rootScope.countTab, nombre: "MAT " + ($rootScope.countTab + 1), seleccionado: "on" });
        // si hay mas de un tab mostrar la opcion de poder eliminarlos
        if ($rootScope.countTab > 0) { $scope.verBtnEliminar = "block"; } else { $scope.verBtnEliminar = "none"; }
        $('.tab-embalajes').removeClass('animated fadeInUp');
        $('.tab-embalajes').hide();
        $('.tab-embalajes').show();
        $('.tab-embalajes').addClass('animated fadeInUp');
        $scope.cargaDatos($rootScope.idxTab);
        $scope.auxKilo = 0;
    }
    $scope.cargaDatos = function (idx) {
        $rootScope.datosGranel.detalle[idx] = {
            fechaEmbalagePakingTab: '',
            embalajePakingBarTab: '',
            embalajeLotePakingTab: '',
            selVariedadPakingTab: '',
            selCuartelTab: '',
            embalajeCajaPaking: '',
            embalajeKilosPaking: '',
            VARIEDAD: '',
            fechaEmbalagePakingTabx: '',
            numExportacion: '',
            material: [],
            lotePacking: '',
            tipificacion: '',
            color: '',
            embalajeKilos: 0,
            centro: '',
            almacenFumigacion: '',
            embalajeLoteProcesoPaking: '',
            ZCATEGORIA: [],
            calibre: [],
            ZNUM_PLU: 'NO',
            ZETIQUETADO: '',
            ZQUIMICO: '',
            ZPLU: '',
            ZNARANJA_VARIEDAD_ET: [],
            ZPRODUCTOR_ET: [],
            ZSAG_CSP_PROVINCIA: [],
            region: [],
            BATCH: ''
        }
    }
    if ($rootScope.datosGranel.detalle === undefined || $rootScope.datosGranel.detalle.length <= 0) {
        //console.log($scope.selTab)
        $rootScope.countTab = 0;
        $rootScope.idxTab = 0;
        $scope.selTab = [];
        $scope.selTab.push({ idx: 0, nombre: "MAT " + (0 + 1), seleccionado: (0 == 0) ? "on" : "off" });
        $rootScope.countTab = 0;
        $scope.cargaDatos(0);
        $rootScope.datosPaletiza = {
            HU_EXID: '',
            CONTENT: '',
            KZGVH: 'NO',
            HU_GRP3: '',
            altura: ''
        };
    } else {
        $scope.selTab = [];
        $rootScope.idxTab = 0;
        angular.forEach($rootScope.datosGranel.detalle, function (value, key) {
            $scope.selTab.push({ idx: key, nombre: "MAT " + (key + 1), seleccionado: (key === 0) ? "on" : "off" });
        });
        $rootScope.countTab = $rootScope.datosGranel.detalle.length - 1;
        console.log($rootScope.datosGranel.detalle);

    }
    $scope.POP_DATA = true;
    //ALTURA
    $rootScope.listarAltura = [];
    $scope.Carga_Altura = function () {
        $rootScope.listarAltura = [];
        angular.forEach($rootScope.ZMOV_QUERY_HU_DATOADICIONAL.VEGR4, function (value, key) {
            var auxALT = value.VEGR4.replace('ALT', '');
            auxALT = auxALT * 1;
            console.log(auxALT, isNaN(auxALT));
            if ($rootScope.datosPaletiza.KZGVH !== 'X') {
                if (auxALT > 97)
                    $scope.listarAltura.push({ DESCRIPTION: value.BEZEI, VALUE_CHAR: value.VEGR4 });
            } else {
                if (auxALT < 97)
                    $scope.listarAltura.push({ DESCRIPTION: value.BEZEI, VALUE_CHAR: value.VEGR4 });
            }

        })
    }
    $scope.Carga_Altura();
    // funcion para agregar nuevo tab
    $scope.deshacerTab = function () {
        var aux = 0;
        angular.forEach($scope.selTab, function (value, key) {
            $scope.selTab[aux].seleccionado = "off";
            aux++;
        });
        $rootScope.datosGranel.detalle.splice($rootScope.countTab);
        $rootScope.countTab--;
        console.log($rootScope.countTab);
        $scope.selTab[$rootScope.countTab].seleccionado = "on";
        $rootScope.idxTab = $rootScope.countTab;
        // si hay mas de un tab mostrar la opcion de poder eliminarlos
        if ($rootScope.countTab > 0) { $scope.verBtnEliminar = "block"; } else { $scope.verBtnEliminar = "none"; }
        $('.tab-embalajes').removeClass('animated fadeInUp');
        $('.tab-embalajes').hide();
        $('.tab-embalajes').show();
        $('.tab-embalajes').addClass('animated fadeInUp');
        $scope.selTab.pop();
        $scope.setProvincias($rootScope.datosGranel.detalle[$rootScope.idxTab].region.idx);
        $scope.setComunas($rootScope.datosGranel.detalle[$rootScope.idxTab].ZSAG_CSP_PROVINCIA.idProvincia);
    };

    $scope.codearLote = function (id) {
        if (APPMOVIL) {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    document.getElementById('embalajeLoteTab' + id).value = result.text;
                    $rootScope.datosGranel.detalle[id].BATCH = result.text;
                    $rootScope.$apply();
                },
                function (error) {
                    $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
                }
            );
        }
    }
    $scope.codearPalet = function () {
        if (APPMOVIL) {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    document.getElementById('paletizaCajaNumeroPalet').value = parseLotePallet(result.text);
                    $rootScope.datosPaletiza.HU_EXID = parseLotePallet(result.text);
                    $rootScope.$apply();
                },
                function (error) {
                    $rootScope.mostrarAlerta(true, "Error", "Scanning failed: " + error);
                }
            );
        }
    }
    $scope.autoCompletaNum = function () {
        $rootScope.datosPaletiza.HU_EXID = parseLotePallet($rootScope.datosPaletiza.HU_EXID);
    }
    function parseLotePallet(value) {
        var res = "";
        if (!isNaN(parseInt(value))) {
            res = ("00000000000000000000" + value).slice(-20);
        } else {
            res = false;
        }
        return res;
    }
    // cambiar de tab
    $scope.irAlTab = function (idx) {
        var aux = 0;
        angular.forEach($scope.selTab, function (value, key) {
            $scope.selTab[aux].seleccionado = "off";
            aux++;
        });
        $rootScope.idxTab = idx;
        $scope.selTab[idx].seleccionado = "on";
        $('.tab-embalajes').removeClass('animated fadeInUp');
        $('.tab-embalajes').hide();
        $('.tab-embalajes').show();
        $('.tab-embalajes').addClass('animated fadeInUp');
        $('#embalajeLoteTab1').val($rootScope.datosGranel.detalle[$rootScope.idxTab].lotePacking);
        $scope.selMercadoDivTab1 = 'none';
        //console.log($rootScope.datosGranel)
        $scope.auxKilo = 0;
        $scope.setProvincias($rootScope.datosGranel.detalle[$rootScope.idxTab].region.idx);
        $scope.setComunas($rootScope.datosGranel.detalle[$rootScope.idxTab].ZSAG_CSP_PROVINCIA.idProvincia);
    }

    $scope.listarColor = [];
    angular.forEach($rootScope.ZMOV_QUERY_COLOR, function (value, key) {
        if (value.ATBEZ === $rootScope.dataSeleccionCaja.especie.DESCRIPTION) {
            $scope.listarColor.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR, ATNAM: value.ATNAM });
        }
    });
    $scope.listarTipificacion = [];
    angular.forEach($rootScope.TIPIFICACION, function (value, key) {
        if (value.ATBEZ === $rootScope.dataSeleccionCaja.especie.DESCRIPTION) {
            $scope.listarTipificacion.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR, ATNAM: value.ATNAM });
        }
    });
    $rootScope.variedadOpciones = [];
    var arrVar = [];
    angular.forEach($rootScope.ZMOV_QUERY_VARIEDAD, function (value2, key) {
        if (value2.ESPECIE === $rootScope.dataSeleccionCaja.especie.DESCRIPTION && $rootScope.datosGranel.LIFNR.VALUE_CHAR == value2.LIFNR) {
            if (arrVar.indexOf(value2.COD_VAR) == -1) {
                $scope.variedadOpciones.push({ DESCRIPTION: value2.VAR, VALUE_CHAR: value2.COD_VAR })
                arrVar.push(value2.COD_VAR);
            }
        }
    });
    $scope.pakingCategoriaOpciones = [];
    angular.forEach($rootScope.CATEGORIA, function (value, key) {
        if (true
            && value.ATBEZ === $rootScope.dataSeleccionCaja.especie.DESCRIPTION
        ) {
            $scope.pakingCategoriaOpciones.push({ DESCRIPTION: value.DESCRIPTION, VALUE_CHAR: value.VALUE_CHAR });
        }
    });
    $scope.pakingCalibreOpciones = [];
    angular.forEach($rootScope.ZMOV_QUERY_GRUPO_CATE, function (value, key) {
        if (true
            && value.ATBEZ === $rootScope.dataSeleccionCaja.especie.DESCRIPTION
        ) {
            $scope.pakingCalibreOpciones.push({ VALUE_CHAR: value.VALUE_CHAR, DESCRIPTION: value.DESCRIPTION });
        }
    });
    function formattedDate(date) {
        var parts = date.split("-");
        return parts[2] + '.' + parts[1] + '.' + parts[0];
    }
    $scope.JSON_ESQUINERO = [
        { MATNR: '000002003002003706', MAKTX: 'ESQUINERO CTN. 2X2X100 S/IMP', CANTIDAD: '4', BOOL: '' },
        { MATNR: '000002003002003702', MAKTX: 'ESQUINERO CTN. 2X2X204 S/IMP', CANTIDAD: '4', BOOL: 'X' },
        { MATNR: '000002003002003705', MAKTX: 'ESQUINERO CTN. 2X2X230 S/IMP', CANTIDAD: '4', BOOL: '' }
    ]
    $scope.dataTable = [];
    $scope.clickearCheck = function (id) {
        /*var aux_esquinita = [false,''];
        if ($scope.dataTable.LT_DETALLE[id].Esquina) {
            if (!$scope.dataTable.LT_DETALLE[id].disable) {
                angular.forEach($scope.dataTable.LT_DETALLE, function (v, k) {
                    if(v.Esquina){
                        if(v.chek){
                            aux_esquinita[0] = true;
                            aux_esquinita[1] = v.MATNR;
                        }
                    }
                })
                console.log(aux_esquinita);
                if(aux_esquinita[0]){
                    if(aux_esquinita[1] == $scope.dataTable.LT_DETALLE[id].MATNR){
                        $scope.dataTable.LT_DETALLE[id].img = "img/check.png";
                        $scope.dataTable.LT_DETALLE[id].chek = false;
                    }
                }else{
                    $scope.dataTable.LT_DETALLE[id].img = "img/x.png";
                    $scope.dataTable.LT_DETALLE[id].chek = true;
                }
            }

        } else {*/
            if (!$scope.dataTable.LT_DETALLE[id].disable) {
                if ($scope.dataTable.LT_DETALLE[id].chek) {
                    $scope.dataTable.LT_DETALLE[id].img = "img/check.png";
                    $scope.dataTable.LT_DETALLE[id].chek = false;
                } else {
                    $scope.dataTable.LT_DETALLE[id].img = "img/x.png";
                    $scope.dataTable.LT_DETALLE[id].chek = true;
                }
            }
        //}
    };
    $scope.Changue_Tipo_Pallet = function (i) {
        console.log(i);
        $http({
            method: 'POST',
            url: IPSERVER + 'JSON_ZMOV_10021.aspx?IV_MATNR=' + $rootScope.datosGranel.detalle[i].material.MATNR + '&IV_WERKS=' + $rootScope.userData.centro,
            headers: { 'Content-Type': 'text/xml; charset=utf-8' },
            processData: false,
            dataType: 'json',
        }).success(function (data) {
            console.log(data);
            if (data.LT_DETALLE.length > 0) {
                $rootScope.datosPaletiza.CONTENT = data.LT_DETALLE[0].TIPO_PALLET;
            } else {
                $rootScope.datosPaletiza.CONTENT = '';
            }

        })
    }
    $scope.Pop_Up = function () {
        if ($rootScope.datosGranel.detalle.length > 0) {
            var jsonValidate = [
                { campo: "Codigo Pallet", value: $rootScope.datosPaletiza.HU_EXID, type: "input" },
                //{ campo: "Tipo Pallet", value: $rootScope.datosPaletiza.CONTENT, type: "aSelect", index: "INHALT" },
                { campo: "Altura", value: $rootScope.datosPaletiza.altura, type: "aSelect", index: "VALUE_CHAR" },
                { campo: "Material", value: $rootScope.datosGranel.detalle, type: "array", index: "material", subType: "aSelect", subIndex: "MATNR" },
                { campo: "Variedad", value: $rootScope.datosGranel.detalle, type: "array", index: 'VARIEDAD', subType: "aSelect", subIndex: "VALUE_CHAR" },
                { campo: "Categoria", value: $rootScope.datosGranel.detalle, type: "array", index: "ZCATEGORIA", subType: "aSelect", subIndex: "VALUE_CHAR" },
                { campo: "Calibre", value: $rootScope.datosGranel.detalle, type: "array", index: "calibre", subType: "aSelect", subIndex: "VALUE_CHAR" },
                { campo: "Cajas", value: $rootScope.datosGranel.detalle, type: "array", index: "QUANTITY", subType: "input" },
                { campo: "Nro PLU", value: $rootScope.datosGranel.detalle, type: "array", index: "ZNUM_PLU", subType: "input" }
            ];
            if ($rootScope.dataSeleccionCaja.especie.VALUE_CHAR == "UVAS") {
                jsonValidate.push([
                    { campo: "Color", value: $rootScope.datosGranel.detalle, type: "array", index: "color", subType: "aSelect", subIndex: "VALUE_CHAR" },
                    { campo: "Tipificación", value: $rootScope.datosGranel.detalle, type: "array", index: "tipificacion", subType: "aSelect", subIndex: "VALUE_CHAR" },
                ]);
            }
            if (!$rootScope.validaForm(jsonValidate)) return 0;
        } else {
            $rootScope.mostrarAlerta(true, "Advertencia", "Ingrese a lo menos un lote");
            return 0;
        }
        $http({
            method: 'POST',
            url: IPSERVER + 'JSON_ZMOV_10020.aspx?IV_MATNR=' + $rootScope.datosGranel.detalle[0].material.MATNR + '&IV_WERKS=' + $rootScope.userData.centro + '&IV_HU_GRP4=' + $rootScope.datosPaletiza.altura.VALUE_CHAR + '&IV_TIP_PACKING=' + (($rootScope.userData.mail === 'recepcionPallet') ? 'S' : 'C'),
            headers: { 'Content-Type': 'text/xml; charset=utf-8' },
            processData: false,
            dataType: 'json',
        }).success(function (data) {
            console.log(data);
            if(data.LT_DETALLE.length > 0){
                $scope.POP_DATA = false;
                $scope.dataTable = data;
                angular.forEach($scope.dataTable.LT_DETALLE, function (v, k) {
                    v.img = "img/check.png";
                    v.chek = false;
                    v.Esquina = false;
                    if ($rootScope.datosPaletiza.KZGVH !== 'X') {
                        v.disable = false;
                    } else {
                        v.disable = true;
                    }
                })
                angular.forEach($scope.dataTable.LT_DETALLE, function (v, k) {
                    angular.forEach($scope.JSON_ESQUINERO, function (value, ley) {
                        if (value.MATNR == v.MATNR) {
                            v.Esquina = true;
                        }
                    })
                })
            }else{
                $rootScope.alert.show({ message: "Falta configurar lista 99, Componente Pallet"});
            }
        })

    }
    $scope.Get_xml = function () {
        if($rootScope.datosPaletiza.KZGVH=='NO'){
            $rootScope.datosPaletiza.KZGVH='';
        }
        var xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
                        <soapenv:Header/>\
                        <soapenv:Body>\
                        <tem:ZMOV_20031>\
                            <tem:datos>\
                                <tem:HEADER>\
                                    <tem:BUKRS>' + $rootScope.userData.sociedad + '</tem:BUKRS>\
                                    <tem:EKORG>' + $rootScope.userData.organizacion + '</tem:EKORG>\
                                    <tem:EKGRP>' + $rootScope.userData.grupoCompra + '</tem:EKGRP>\
                                    <tem:BSART>' + $rootScope.userData.clasePedido + '</tem:BSART>\
                                    <tem:BUDAT>' + $rootScope.datosGranel.selFechaContabilizacion.value + '</tem:BUDAT>\
                                    <tem:LIFNR>' + $rootScope.datosGranel.LIFNR.VALUE_CHAR + '</tem:LIFNR>\
                                    <tem:XBLNR>' + angular.uppercase($rootScope.datosGranel.XBLNR) + '</tem:XBLNR>\
                                    <tem:BKTXT>' + $rootScope.userData.usuario + '</tem:BKTXT>\
                                </tem:HEADER>\
                                <tem:HEADER_ADIC>\
                                    <tem:STLAL></tem:STLAL>\
                                    <tem:EXTWG>'+ $rootScope.datosGranel.detalle[0].VARIEDAD.VALUE_CHAR.substring(0, 2) + '</tem:EXTWG>\
                                    <tem:ZVARIEDAD>'+ $rootScope.datosGranel.detalle[0].VARIEDAD.VALUE_CHAR + '</tem:ZVARIEDAD>\
                                    <tem:TIP_PACKING>'+ (($rootScope.userData.mail === 'recepcionPallet') ? 'S' : 'C') + '</tem:TIP_PACKING>\
                                    <tem:PALLET_COMPLE>'+ $rootScope.datosPaletiza.KZGVH + '</tem:PALLET_COMPLE>\
                                    <tem:TRASP_COMPL></tem:TRASP_COMPL>\
                                    <tem:LGORT_TRASP>FR02</tem:LGORT_TRASP>\
                                    <tem:STLAL_PALLET>99</tem:STLAL_PALLET>\
                                </tem:HEADER_ADIC>\
                                <tem:HEADER_HU>\
                                    <tem:PACK_MAT>PALLET</tem:PACK_MAT>\
                                    <tem:HU_EXID>'+ angular.uppercase($rootScope.datosPaletiza.HU_EXID) + '</tem:HU_EXID>\
                                    <tem:EXT_ID_HU_2></tem:EXT_ID_HU_2>\
                                    <tem:CONTENT>'+ $rootScope.datosPaletiza.CONTENT + '</tem:CONTENT>\
                                    <tem:PACK_MAT_CUSTOMER></tem:PACK_MAT_CUSTOMER>\
                                    <tem:PACKAGE_CAT></tem:PACKAGE_CAT>\
                                    <tem:KZGVH>'+ $rootScope.datosPaletiza.KZGVH + '</tem:KZGVH>\
                                    <tem:HU_GRP1></tem:HU_GRP1>\
                                    <tem:HU_GRP2></tem:HU_GRP2>\
                                    <tem:HU_GRP3></tem:HU_GRP3>\
                                    <tem:HU_GRP4>'+ $rootScope.datosPaletiza.altura.VALUE_CHAR + '</tem:HU_GRP4>\
                                    <tem:HU_GRP5></tem:HU_GRP5>\
                                    <tem:LGORT_DS>'+ $rootScope.userData.almacenPallet + '</tem:LGORT_DS>\
                                </tem:HEADER_HU>\
                                <tem:IR_MTART_NOT_541>\
                                    <tem:ZMOV_20031_IR_MTART_NOT_541>\
                                        <tem:SIGN>I</tem:SIGN>\
                                        <tem:OPTION>NE</tem:OPTION>\
                                        <tem:LOW>ROH</tem:LOW>\
                                        <tem:HIGH></tem:HIGH>\
                                    </tem:ZMOV_20031_IR_MTART_NOT_541>\
                                </tem:IR_MTART_NOT_541>\
                                <tem:LT_CARACT>';
        angular.forEach($rootScope.datosGranel.detalle, function (val, key) {
            xml += '<tem:ZMOV_20031_LT_CARACT>\
                                        <tem:MATERIAL>'+ val.material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>ZSAG_SDP</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.datosGranel.ZPREDIO.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                    </tem:ZMOV_20031_LT_CARACT>\
                                    <tem:ZMOV_20031_LT_CARACT>\
                                        <tem:MATERIAL>'+ val.material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>ZPRODUCTOR</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.datosGranel.LIFNR.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                    </tem:ZMOV_20031_LT_CARACT>\
                                    <tem:ZMOV_20031_LT_CARACT>\
                                        <tem:MATERIAL>'+ val.material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>ZPRODUCTOR_ET</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.datosGranel.LIFNR.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                    </tem:ZMOV_20031_LT_CARACT>';
            if ($rootScope.dataSeleccionCaja.especie.VALUE_CHAR == "UVAS") {
                xml += '<tem:ZMOV_20031_LT_CARACT>\
                                                <tem:MATERIAL>'+ val.material.MATNR + '</tem:MATERIAL>\
                                                <tem:BATCH></tem:BATCH>\
                                                <tem:CHARACT>ZSAG_IDP</tem:CHARACT>\
                                                <tem:VALUE_CHAR>'+ $rootScope.datosGranel.IDP.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                            </tem:ZMOV_20031_LT_CARACT>\
                                            <tem:ZMOV_20031_LT_CARACT>\
                                                <tem:MATERIAL>'+ val.material.MATNR + '</tem:MATERIAL>\
                                                <tem:BATCH></tem:BATCH>\
                                                <tem:CHARACT>ZSAG_IDG</tem:CHARACT>\
                                                <tem:VALUE_CHAR>'+ $rootScope.datosGranel.ZCUARTEL.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                            </tem:ZMOV_20031_LT_CARACT>\
                                            <tem:ZMOV_20031_LT_CARACT>\
                                                <tem:MATERIAL>'+ val.material.MATNR + '</tem:MATERIAL>\
                                                <tem:BATCH></tem:BATCH>\
                                                <tem:CHARACT>Z'+ $rootScope.dataSeleccionCaja.especie.DESCRIPTION + '_COLOR</tem:CHARACT>\
                                                <tem:VALUE_CHAR>'+ val.color.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                            </tem:ZMOV_20031_LT_CARACT>\
                                            <tem:ZMOV_20031_LT_CARACT>\
                                                <tem:MATERIAL>'+ val.material.MATNR + '</tem:MATERIAL>\
                                                <tem:BATCH></tem:BATCH>\
                                                <tem:CHARACT>Z'+ $rootScope.dataSeleccionCaja.especie.DESCRIPTION + '_T</tem:CHARACT>\
                                                <tem:VALUE_CHAR></tem:VALUE_CHAR>\
                                            </tem:ZMOV_20031_LT_CARACT>';
            }
            xml += '   <tem:ZMOV_20031_LT_CARACT>\
                                                <tem:MATERIAL>'+ val.material.MATNR + '</tem:MATERIAL>\
                                                <tem:BATCH></tem:BATCH>\
                                                <tem:CHARACT>ZFCOSECHA</tem:CHARACT>\
                                                <tem:VALUE_CHAR>'+ formattedDate($rootScope.datosGranel.HSDAT.value) + '</tem:VALUE_CHAR>\
                                            </tem:ZMOV_20031_LT_CARACT>\
                                            <tem:ZMOV_20031_LT_CARACT>\
                                                <tem:MATERIAL>'+ val.material.MATNR + '</tem:MATERIAL>\
                                                <tem:BATCH></tem:BATCH>\
                                                <tem:CHARACT>Z'+ $rootScope.dataSeleccionCaja.especie.DESCRIPTION + '_CALIBRE</tem:CHARACT>\
                                                <tem:VALUE_CHAR>'+ val.calibre.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                            </tem:ZMOV_20031_LT_CARACT>\
                                            <tem:ZMOV_20031_LT_CARACT>\
                                                <tem:MATERIAL>'+ val.material.MATNR + '</tem:MATERIAL>\
                                                <tem:BATCH></tem:BATCH>\
                                                <tem:CHARACT>Z'+ $rootScope.dataSeleccionCaja.especie.DESCRIPTION + '_CALIDAD</tem:CHARACT>\
                                                <tem:VALUE_CHAR>'+ val.ZCATEGORIA.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                                    </tem:ZMOV_20031_LT_CARACT>\
                                            <tem:ZMOV_20031_LT_CARACT>\
                                                <tem:MATERIAL>'+ val.material.MATNR + '</tem:MATERIAL>\
                                                <tem:BATCH></tem:BATCH>\
                                                <tem:CHARACT>ZLINEA</tem:CHARACT>\
                                                <tem:VALUE_CHAR>'+ $rootScope.userData.linea + '</tem:VALUE_CHAR>\
                                            </tem:ZMOV_20031_LT_CARACT>\
                                            <tem:ZMOV_20031_LT_CARACT>\
                                                <tem:MATERIAL>'+ val.material.MATNR + '</tem:MATERIAL>\
                                                <tem:BATCH></tem:BATCH>\
                                                <tem:CHARACT>ZTURNO</tem:CHARACT>\
                                                <tem:VALUE_CHAR>'+ $rootScope.userData.turno + '</tem:VALUE_CHAR>\
                                            </tem:ZMOV_20031_LT_CARACT>\
                                            <tem:ZMOV_20031_LT_CARACT>\
                                                <tem:MATERIAL>'+ val.material.MATNR + '</tem:MATERIAL>\
                                                <tem:BATCH></tem:BATCH>\
                                                <tem:CHARACT>ZSAG_CSP</tem:CHARACT>\
                                                <tem:VALUE_CHAR>'+ $rootScope.userData.CSP + '</tem:VALUE_CHAR>\
                                            </tem:ZMOV_20031_LT_CARACT>\
                                            <tem:ZMOV_20031_LT_CARACT>\
                                                <tem:MATERIAL>'+ val.material.MATNR + '</tem:MATERIAL>\
                                                <tem:BATCH></tem:BATCH>\
                                                <tem:CHARACT>ZPLU</tem:CHARACT>\
                                                <tem:VALUE_CHAR>'+ angular.uppercase(val.ZNUM_PLU) + '</tem:VALUE_CHAR>\
                                            </tem:ZMOV_20031_LT_CARACT>\
                                            <tem:ZMOV_20031_LT_CARACT>\
                                                <tem:MATERIAL>'+ val.material.MATNR + '</tem:MATERIAL>\
                                                <tem:BATCH></tem:BATCH>\
                                                <tem:CHARACT>Z'+ $rootScope.dataSeleccionCaja.especie.DESCRIPTION + '_VARIEDAD</tem:CHARACT>\
                                                <tem:VALUE_CHAR>'+ val.VARIEDAD.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                            </tem:ZMOV_20031_LT_CARACT>\
                                            <tem:ZMOV_20031_LT_CARACT>\
                                                <tem:MATERIAL>'+ val.material.MATNR + '</tem:MATERIAL>\
                                                <tem:BATCH></tem:BATCH>\
                                                <tem:CHARACT>Z'+ $rootScope.dataSeleccionCaja.especie.DESCRIPTION + '_VARIEDAD_ET</tem:CHARACT>\
                                                <tem:VALUE_CHAR>'+ val.VARIEDAD.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                            </tem:ZMOV_20031_LT_CARACT>';
        })
        xml += '</tem:LT_CARACT>\
                                        <tem:LT_ITEMS>';
        angular.forEach($rootScope.datosGranel.detalle, function (val, key) {
            xml += '<tem:ZMOV_20031_LT_ITEMS>\
                                                <tem:STCK_TYPE></tem:STCK_TYPE>\
                                                <tem:MATERIAL>' + val.material.MATNR + '</tem:MATERIAL>\
                                                <tem:BATCH></tem:BATCH>\
                                                <tem:QUANTITY>' + val.QUANTITY + '</tem:QUANTITY>\
                                                <tem:PO_UNIT>CS</tem:PO_UNIT>\
                                                <tem:HSDAT>' + $rootScope.datosGranel.selFechaContabilizacion.value + '</tem:HSDAT>\
                                                <tem:PLANT>' + $rootScope.userData.centro + '</tem:PLANT>\
                                                <tem:STGE_LOC>' + $rootScope.userData.almacenGranel + '</tem:STGE_LOC>\
                                                <tem:FREE_ITEM></tem:FREE_ITEM>\
                                                <tem:ITEM_CAT>L</tem:ITEM_CAT>\
                                                <tem:MOVE_BATCH></tem:MOVE_BATCH>\
                                                <tem:BATCH_GRANEL></tem:BATCH_GRANEL>\
                                                <tem:ACCTASSCAT>F</tem:ACCTASSCAT>\
                                            </tem:ZMOV_20031_LT_ITEMS>';
        })
        xml += '</tem:LT_ITEMS>\
                                        <tem:LT_ITEM_DEST></tem:LT_ITEM_DEST>\
                                        <tem:LT_MATNR_PALLET>';
        angular.forEach($scope.dataTable.LT_DETALLE, function (v, k) {
            if (v.img == 'img/x.png') {
                xml += '<tem:ZMOV_20031_LT_MATNR_PALLET>\
                                                        <tem:MATNR>'+ v.MATNR + '</tem:MATNR>\
                                                    </tem:ZMOV_20031_LT_MATNR_PALLET>';
            }
        });
        xml += '</tem:LT_MATNR_PALLET>\
                                        <tem:I_COPEQUEN>' + $rootScope.datosGranel.LIFNR.COPEQUEN + '</tem:I_COPEQUEN>\
                                        <tem:I_UAT>' + $rootScope.datosGranel.UAT.VALUE_CHAR + '</tem:I_UAT>\
                                        <tem:LOG></tem:LOG>\
                                    </tem:datos>\
                                </tem:ZMOV_20031>\
                                </soapenv:Body>\
                            </soapenv:Envelope>';
        xml = xml.split('>undefined<').join('><');
        return xml;
    }
    $scope.Send_xml = function () {
        $rootScope.httpRequest.successRedirect = "/palletProductor";
        $rootScope.loading.display = "";
        $rootScope.LoadingMercados = "";
        $('.LoadingMercados').show();
        if ($scope.dataTable.LT_DETALLE[0].chek) {
            $rootScope.datosPaletiza.CONTENT = '';
        }
        document.getElementById('popRespuestaLotesPaking').innerHTML = '';
        document.getElementById('loadingLotesPaking').style.display = '';
        $('#cargandoDatosSAP').show();
        $scope.mostrarRespuesta(true);
        console.log($scope.Get_xml());
        $http({
            method: 'POST',
            url: IPSERVER + 'rfcNET.asmx?',
            headers: { 'Content-Type': 'text/xml; charset=utf-8' },
            processData: false,
            dataType: 'xml',
            data: $scope.Get_xml()
        }).success(function (data) {
            console.log(data);
            $('#cargandoDatosSAP').hide('fade');
            var print = data.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
            var xmlData = $.parseXML(print);
            console.log(xmlData);
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            var mensaje = '';
            var parser = new DOMParser();
            var docXml = parser.parseFromString(print, "text/xml");
            var jsonRespuesta = xml2json(docXml, '');
            var json = JSON.parse(jsonRespuesta);
            console.log(json);
            var message = "";
            try {
                if (docXml.getElementsByTagName("MESSAGE")[0].firstChild != null && docXml.getElementsByTagName("MESSAGE")[0].firstChild != undefined) {
                    message = docXml.getElementsByTagName("MESSAGE")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var documentoRecepcion = "";
            try {
                if (docXml.getElementsByTagName("MATERIALDOCUMENT")[0].firstChild != null && docXml.getElementsByTagName("MATERIALDOCUMENT")[0].firstChild != undefined) {
                    documentoRecepcion = docXml.getElementsByTagName("MATERIALDOCUMENT")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var E_MATERIALDOCUMENT = "";
            try {
                if (docXml.getElementsByTagName("E_MATERIALDOCUMENT")[0].firstChild != null && docXml.getElementsByTagName("E_MATERIALDOCUMENT")[0].firstChild != undefined) {
                    E_MATERIALDOCUMENT = docXml.getElementsByTagName("E_MATERIALDOCUMENT")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }

            var documentoDestare = "";
            try {
                if (docXml.getElementsByTagName("MATERIALDOCUMENT_BD")[0].firstChild != null && docXml.getElementsByTagName("MATERIALDOCUMENT_BD")[0].firstChild != undefined) {
                    documentoDestare = docXml.getElementsByTagName("MATERIALDOCUMENT_BD")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var documentoCosecha = "";
            try {
                if (docXml.getElementsByTagName("E_MATDOC_COS")[0].firstChild != null && docXml.getElementsByTagName("E_MATDOC_COS")[0].firstChild != undefined) {
                    documentoCosecha = docXml.getElementsByTagName("E_MATDOC_COS")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var documentoFruto = "";
            if (docXml.getElementsByTagName("E_MATDOC_FRU")[0].firstChild != null && docXml.getElementsByTagName("E_MATDOC_FRU")[0].firstChild != undefined) {
                documentoFruto = docXml.getElementsByTagName("E_MATDOC_FRU")[0].firstChild.nodeValue;
            }
            var documentoTransformacion = "";
            try {
                if (docXml.getElementsByTagName("E_MATDOC_TRA")[0].firstChild != null && docXml.getElementsByTagName("E_MATDOC_TRA")[0].firstChild != undefined) {
                    documentoTransformacion = docXml.getElementsByTagName("E_MATDOC_TRA")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var ordenCompra = "";
            try {
                if (docXml.getElementsByTagName("PEDIDO")[0].firstChild != null && docXml.getElementsByTagName("PEDIDO")[0].firstChild != undefined) {
                    ordenCompra = docXml.getElementsByTagName("PEDIDO")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var E_EXIDV = "";
            try {
                if (docXml.getElementsByTagName("E_EXIDV")[0].firstChild != null && docXml.getElementsByTagName("PEDIDO")[0].firstChild != undefined) {
                    E_EXIDV = docXml.getElementsByTagName("E_EXIDV")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var E_MBLNR_541 = "";
            try {
                if (docXml.getElementsByTagName("E_MBLNR_541")[0].firstChild != null && docXml.getElementsByTagName("E_MBLNR_541")[0].firstChild != undefined) {
                    E_MBLNR_541 = docXml.getElementsByTagName("E_MBLNR_541")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var E_MBLNR_541_PALLET = "";
            try {
                if (docXml.getElementsByTagName("E_MBLNR_541_PALLET")[0].firstChild != null && docXml.getElementsByTagName("E_MBLNR_541_PALLET")[0].firstChild != undefined) {
                    E_MBLNR_541_PALLET = docXml.getElementsByTagName("E_MBLNR_541_PALLET")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var E_MATERIALDOCUMENT_PALLET = "";
            try {
                if (docXml.getElementsByTagName("E_MATERIALDOCUMENT_PALLET")[0].firstChild != null && docXml.getElementsByTagName("E_MATERIALDOCUMENT_PALLET")[0].firstChild != undefined) {
                    E_MATERIALDOCUMENT_PALLET = docXml.getElementsByTagName("E_MATERIALDOCUMENT_PALLET")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var PEDIDO_PALLET = "";
            try {
                if (docXml.getElementsByTagName("PEDIDO_PALLET")[0].firstChild != null && docXml.getElementsByTagName("PEDIDO_PALLET")[0].firstChild != undefined) {
                    PEDIDO_PALLET = docXml.getElementsByTagName("PEDIDO_PALLET")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var E_MBLNR_311_PALLET = "";
            try {
                if (docXml.getElementsByTagName("E_MBLNR_311_PALLET")[0].firstChild != null && docXml.getElementsByTagName("E_MBLNR_311_PALLET")[0].firstChild != undefined) {
                    E_MBLNR_311_PALLET = docXml.getElementsByTagName("E_MBLNR_311_PALLET")[0].firstChild.nodeValue;
                }
            } catch (e) {

            }
            var messages = [];
            try {
                angular.forEach(json['soap:Envelope']['soap:Body'].ZMOV_20031Response.ZMOV_20031Result.LOG.ZMOV_20031_LOG, function (v, k) {
                    //(!isNaN(k))?document.getElementById('ERROR').innerHTML += '<h1>ERROR '+aux+': </h1><p>'+v.MESSAGE+'</p>':(k==='MESSAGE')?document.getElementById('ERROR').innerHTML += '<h1>ERROR : </h1><p>'+v+'</p>':'nada';
                    //  aux++;
                    //(!isNaN(k))?v.MESSAGE:(k=='MESSAGE')?v:''
                    messages.push((!isNaN(k))?v.MESSAGE:(k=='MESSAGE')?v:'');
                })
            } catch (e) { console.log(e) }
            mensaje = '<div class="contabilizar-text">' +
                '<h1>UM: </h1> <p>' + (E_EXIDV) + '</p>' +
                '<h1>Pedido Cajas: </h1> <p>' + (ordenCompra) + '</p>' +
                '<h1>Comp. Cajas 541 : </h1> <p>' + (E_MBLNR_541) + '</p>'+
                '<h1>Alta Mov. 543: </h1> <p>' + (documentoRecepcion) + '</p>' +
                '<h1>Alta Orden CO: </h1> <p>' + (E_MATERIALDOCUMENT) + '</p>' +
                //'<h1>Documento Destare: </h1> <p>' + (documentoDestare) + '</p>' +
                '<h1>Pedido Pallet : </h1> <p>' + (PEDIDO_PALLET) + '</p>'+
                '<h1>Comp. Pallets Mov 541 : </h1> <p>' + (E_MBLNR_541_PALLET) + '</p>'+
                '<h1>Consumo Comp. Pallet Mov 543 : </h1> <p>' + (E_MATERIALDOCUMENT_PALLET) + '</p>'+
                '<h1>Traslado de almacen Mov 311 : </h1> <p>' + (E_MBLNR_311_PALLET) + '</p>';
            if ($rootScope.datosGranel.LIFNR.COPEQUEN != '') {
                mensaje += '<hr><h1>Copequen</h1>' +
                    '<h1>Documento Cosecha: </h1> <p>' + (documentoCosecha) + '</p>' +
                    '<h1>Documento Fruto: </h1> <p>' + (documentoFruto) + '</p>' +
                    '<h1>Orden de Transformación: </h1> <p>' + (documentoTransformacion) + '</p>';
            }
            if (messages.length > 0) {
                for (var i = 0; i < messages.length; i++) {
                    if(messages[i] !=''){
                         mensaje += '<h1>Mensaje ' + (i + 1) + ': </h1> <p>' + messages[i] + '</p>';
                    }
                }
            }
            //mensaje += '<h1>Mensaje: </h1> <p>' + (message) + '</p>';
            mensaje += '<div></div><div></div> </div>';

            if (mensajeRespuesta1 == '<MATERIALDOCUMENT xmlns="http://tempuri.org/"/>') {
                mensajeRespuesta1 = 'ERROR, No se generó documento material, favor consultar en SAP';
                mensaje = '<div class="contabilizar-text">';
                mensaje += '<h1>Mensaje: </h1> <p>' + (mensajeRespuesta1) + '</p>';
                mensaje += '<div></div><div></div> </div>';
            }

            document.getElementById('popRespuestaLotesPaking').innerHTML = mensaje;
            $('.LoadingMercados').hide();
            $rootScope.loading.hide();
            //$rootScope.LoadingMercados = "none";
            $rootScope.btnContinuar = "block";
        })
    }

    $scope.embalajePakingContinuar = function () {
        if ($rootScope.datosGranel.detalle.length > 0) {
            console.log($rootScope.datosGranel.detalle);
            var jsonValidate = [
                { campo: "Codigo Pallet", value: $rootScope.datosPaletiza.HU_EXID, type: "input" },
                //{ campo: "Tipo Pallet", value: $rootScope.datosPaletiza.CONTENT, type: "aSelect", index: "INHALT" },
                { campo: "Altura", value: $rootScope.datosPaletiza.altura, type: "aSelect", index: "VALUE_CHAR" },
                { campo: "Material", value: $rootScope.datosGranel.detalle, type: "array", index: "material", subType: "aSelect", subIndex: "MATNR" },
                { campo: "Variedad", value: $rootScope.datosGranel.detalle, type: "array", index: 'VARIEDAD', subType: "aSelect", subIndex: "VALUE_CHAR" },
                { campo: "Categoria", value: $rootScope.datosGranel.detalle, type: "array", index: "ZCATEGORIA", subType: "aSelect", subIndex: "VALUE_CHAR" },
                { campo: "Calibre", value: $rootScope.datosGranel.detalle, type: "array", index: "calibre", subType: "aSelect", subIndex: "VALUE_CHAR" },
                { campo: "Cajas", value: $rootScope.datosGranel.detalle, type: "array", index: "QUANTITY", subType: "input" },
                { campo: "Nro PLU", value: $rootScope.datosGranel.detalle, type: "array", index: "ZNUM_PLU", subType: "input" }
            ];
            if ($rootScope.dataSeleccionCaja.especie.VALUE_CHAR == "UVAS") {
                jsonValidate.push([
                    { campo: "Color", value: $rootScope.datosGranel.detalle, type: "array", index: "color", subType: "aSelect", subIndex: "VALUE_CHAR" },
                    { campo: "Tipificación", value: $rootScope.datosGranel.detalle, type: "array", index: "tipificacion", subType: "aSelect", subIndex: "VALUE_CHAR" },
                ]);
            }
            if (!$rootScope.validaForm(jsonValidate)) return 0;
        } else {
            $rootScope.mostrarAlerta(true, "Advertencia", "Ingrese a lo menos un lote");
            return 0;
        }
        $rootScope.httpRequest.successRedirect = "/palletProductor";
        $rootScope.loading.display = "";
        $rootScope.LoadingMercados = "";
        document.getElementById('popRespuestaLotesPaking').innerHTML = '';
        document.getElementById('loadingLotesPaking').style.display = '';
        $('#cargandoDatosSAP').show();
        $scope.mostrarRespuesta(true);
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '      <tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT>';
        cadenaXML += '         <tem:datos>';
        cadenaXML += '            <tem:HEADER>';
        cadenaXML += '               <tem:BUKRS>' + $rootScope.userData.sociedad + '</tem:BUKRS>'; // sociedad usuario
        cadenaXML += '               <tem:EKORG>' + $rootScope.userData.organizacion + '</tem:EKORG>'; // en duro
        cadenaXML += '               <tem:EKGRP>' + $rootScope.userData.grupoCompra + '</tem:EKGRP>';// grupo compra
        cadenaXML += '               <tem:BSART>' + $rootScope.userData.clasePedido + '</tem:BSART>';// clase pedido
        cadenaXML += '               <tem:BUDAT>' + $rootScope.datosGranel.selFechaContabilizacion.value + '</tem:BUDAT>';//
        cadenaXML += '               <tem:LIFNR>' + $rootScope.datosGranel.LIFNR.VALUE_CHAR + '</tem:LIFNR>';//
        cadenaXML += '               <tem:XBLNR>' + angular.uppercase($rootScope.datosGranel.XBLNR) + '</tem:XBLNR>';// guia de despacho
        cadenaXML += '               <tem:BKTXT>' + $rootScope.userData.usuario + '</tem:BKTXT>';// usuario
        cadenaXML += '            </tem:HEADER>';
        cadenaXML += '              <tem:HEADER_HU>';
        cadenaXML += '                  <tem:PACK_MAT>PALLET</tem:PACK_MAT>\
                                        <tem:HU_EXID>'+ angular.uppercase($rootScope.datosPaletiza.HU_EXID) + '</tem:HU_EXID>\
                                        <tem:EXT_ID_HU_2></tem:EXT_ID_HU_2>\
                                        <tem:CONTENT>'+ $rootScope.datosPaletiza.CONTENT + '</tem:CONTENT>\
                                        <tem:PACK_MAT_CUSTOMER></tem:PACK_MAT_CUSTOMER>\
                                        <tem:PACKAGE_CAT></tem:PACKAGE_CAT>\
                                        <tem:KZGVH>'+ $rootScope.datosPaletiza.KZGVH + '</tem:KZGVH>\
                                        <tem:HU_GRP1></tem:HU_GRP1>\
                                        <tem:HU_GRP2></tem:HU_GRP2>\
                                        <tem:HU_GRP3></tem:HU_GRP3>\
                                        <tem:HU_GRP4>'+ $rootScope.datosPaletiza.altura.VALUE_CHAR + '</tem:HU_GRP4>\
                                        <tem:HU_GRP5></tem:HU_GRP5>\
                                        <tem:LGORT_DS>'+ $rootScope.userData.almacenPallet + '</tem:LGORT_DS>\
                                    </tem:HEADER_HU>';
        cadenaXML += '               <tem:I_COPEQUEN>' + $rootScope.datosGranel.LIFNR.COPEQUEN + '</tem:I_COPEQUEN>';
        cadenaXML += '               <tem:I_UAT>' + $rootScope.datosGranel.UAT.VALUE_CHAR + '</tem:I_UAT>';
        cadenaXML += '              <tem:LOG></tem:LOG>';
        cadenaXML += '            <tem:LT_CARACT>';
        for (var inx = 0; inx <= $rootScope.countTab; inx++) {
            cadenaXML += '<tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                        <tem:MATERIAL>'+ $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>ZSAG_SDP</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.datosGranel.ZPREDIO.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                     </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                     <tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                        <tem:MATERIAL>'+ $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>ZPRODUCTOR</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.datosGranel.LIFNR.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                     </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                     <tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                        <tem:MATERIAL>'+ $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>ZPRODUCTOR_ET</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.datosGranel.LIFNR.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                     </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>';
            if ($rootScope.dataSeleccionCaja.especie.VALUE_CHAR == "UVAS") {
                cadenaXML += '<tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                        <tem:MATERIAL>'+ $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>ZSAG_IDP</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.datosGranel.IDP.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                     </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                     <tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                        <tem:MATERIAL>'+ $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>ZSAG_IDG</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.datosGranel.ZCUARTEL.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                     </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                     <tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                        <tem:MATERIAL>'+ $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>Z'+ $rootScope.dataSeleccionCaja.especie.DESCRIPTION + '_COLOR</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.datosGranel.detalle[inx].color.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                     </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                     <tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                        <tem:MATERIAL>'+ $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>Z'+ $rootScope.dataSeleccionCaja.especie.DESCRIPTION + '_T</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.datosGranel.detalle[inx].tipificacion.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                     </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                     ';
            }

            cadenaXML += '   <tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                        <tem:MATERIAL>'+ $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>ZFCOSECHA</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ formattedDate($rootScope.datosGranel.HSDAT.value) + '</tem:VALUE_CHAR>\
                                     </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                     <tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                        <tem:MATERIAL>'+ $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>Z'+ $rootScope.dataSeleccionCaja.especie.DESCRIPTION + '_CALIBRE</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.datosGranel.detalle[inx].calibre.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                     </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                     <tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                        <tem:MATERIAL>'+ $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>Z'+ $rootScope.dataSeleccionCaja.especie.DESCRIPTION + '_CALIDAD</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.datosGranel.detalle[inx].ZCATEGORIA.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                     </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                     <tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                        <tem:MATERIAL>'+ $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>ZLINEA</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.userData.linea + '</tem:VALUE_CHAR>\
                                     </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                     <tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                        <tem:MATERIAL>'+ $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>ZTURNO</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.userData.turno + '</tem:VALUE_CHAR>\
                                     </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                     <tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                        <tem:MATERIAL>'+ $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>ZSAG_CSP</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.userData.CSP + '</tem:VALUE_CHAR>\
                                     </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                     <tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                        <tem:MATERIAL>'+ $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>ZPLU</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ angular.uppercase($rootScope.datosGranel.detalle[inx].ZNUM_PLU) + '</tem:VALUE_CHAR>\
                                     </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                     <tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                        <tem:MATERIAL>'+ $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>Z'+ $rootScope.dataSeleccionCaja.especie.DESCRIPTION + '_VARIEDAD</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.datosGranel.detalle[inx].VARIEDAD.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                     </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                     <tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>\
                                        <tem:MATERIAL>'+ $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>\
                                        <tem:BATCH></tem:BATCH>\
                                        <tem:CHARACT>Z'+ $rootScope.dataSeleccionCaja.especie.DESCRIPTION + '_VARIEDAD_ET</tem:CHARACT>\
                                        <tem:VALUE_CHAR>'+ $rootScope.datosGranel.detalle[inx].VARIEDAD.VALUE_CHAR + '</tem:VALUE_CHAR>\
                                     </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_CARACT>';

        }
        cadenaXML += '            </tem:LT_CARACT><tem:LT_ITEMS>';
        for (var inx = 0; inx <= $rootScope.countTab; inx++) {
            cadenaXML += '               <tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_ITEMS>';
            cadenaXML += '                  <tem:STCK_TYPE></tem:STCK_TYPE>';
            cadenaXML += '                  <tem:MATERIAL>' + $rootScope.datosGranel.detalle[inx].material.MATNR + '</tem:MATERIAL>';
            cadenaXML += '                  <tem:BATCH></tem:BATCH>';
            cadenaXML += '                  <tem:QUANTITY>' + $rootScope.datosGranel.detalle[inx].QUANTITY + '</tem:QUANTITY>';
            cadenaXML += '                  <tem:PO_UNIT>CS</tem:PO_UNIT>';
            cadenaXML += '                  <tem:HSDAT>' + $rootScope.datosGranel.selFechaContabilizacion.value + '</tem:HSDAT>';
            cadenaXML += '                  <tem:PLANT>' + $rootScope.userData.centro + '</tem:PLANT>';
            cadenaXML += '                  <tem:STGE_LOC>' + $rootScope.userData.almacenGranel + '</tem:STGE_LOC>';
            cadenaXML += '                  <tem:FREE_ITEM></tem:FREE_ITEM>';
            cadenaXML += '                  <tem:ITEM_CAT></tem:ITEM_CAT>';
            cadenaXML += '                  <tem:MOVE_BATCH></tem:MOVE_BATCH>';
            cadenaXML += '                  <tem:BATCH_GRANEL></tem:BATCH_GRANEL>';
            cadenaXML += '                  <tem:ACCTASSCAT></tem:ACCTASSCAT>';
            cadenaXML += '               </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT_LT_ITEMS>';
        }
        cadenaXML += '            </tem:LT_ITEMS>';
        cadenaXML += '            <tem:LT_ITEM_DEST>';
        cadenaXML += '            </tem:LT_ITEM_DEST>';
        cadenaXML += '         </tem:datos>';
        cadenaXML += '      </tem:ZMOV_CREATE_RECEP_HU_FRESCOUAT>';
        cadenaXML += '   </soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';
        cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML);
        if ($rootScope.userData.idUsuario != "demo") {
            var xmlhttp = new XMLHttpRequest();
            var mensajeRespuesta1;
            var mensajeRespuesta2;
            xmlhttp.open('POST', IPSERVER + '/rfcNET.asmx', true);
            var sr = cadenaXML;
            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        $('#cargandoDatosSAP').hide('fade');

                        var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
                        var xmlData = $.parseXML(print);
                        console.log(xmlData);
                        var mensajeRespuesta1;
                        var mensajeRespuesta2;
                        var mensaje = '';
                        var parser = new DOMParser();
                        var docXml = parser.parseFromString(print, "text/xml");
                        var message = "";
                        try {
                            if (docXml.getElementsByTagName("MESSAGE")[0].firstChild != null && docXml.getElementsByTagName("MESSAGE")[0].firstChild != undefined) {
                                message = docXml.getElementsByTagName("MESSAGE")[0].firstChild.nodeValue;
                            }
                        } catch (e) {

                        }
                        var documentoRecepcion = "";
                        try {
                            if (docXml.getElementsByTagName("MATERIALDOCUMENT")[0].firstChild != null && docXml.getElementsByTagName("MATERIALDOCUMENT")[0].firstChild != undefined) {
                                documentoRecepcion = docXml.getElementsByTagName("MATERIALDOCUMENT")[0].firstChild.nodeValue;
                            }
                        } catch (e) {

                        }
                        var E_MATERIALDOCUMENT = "";
                        try {
                            if (docXml.getElementsByTagName("E_MATERIALDOCUMENT")[0].firstChild != null && docXml.getElementsByTagName("MATERIALDOCUMENT_BD")[0].firstChild != undefined) {
                                E_MATERIALDOCUMENT = docXml.getElementsByTagName("E_MATERIALDOCUMENT")[0].firstChild.nodeValue;
                            }
                        } catch (e) {

                        }

                        var documentoDestare = "";
                        try {
                            if (docXml.getElementsByTagName("MATERIALDOCUMENT_BD")[0].firstChild != null && docXml.getElementsByTagName("MATERIALDOCUMENT_BD")[0].firstChild != undefined) {
                                documentoDestare = docXml.getElementsByTagName("MATERIALDOCUMENT_BD")[0].firstChild.nodeValue;
                            }
                        } catch (e) {

                        }
                        var documentoCosecha = "";
                        try {
                            if (docXml.getElementsByTagName("E_MATDOC_COS")[0].firstChild != null && docXml.getElementsByTagName("E_MATDOC_COS")[0].firstChild != undefined) {
                                documentoCosecha = docXml.getElementsByTagName("E_MATDOC_COS")[0].firstChild.nodeValue;
                            }
                        } catch (e) {

                        }
                        var documentoFruto = "";
                        if (docXml.getElementsByTagName("E_MATDOC_FRU")[0].firstChild != null && docXml.getElementsByTagName("E_MATDOC_FRU")[0].firstChild != undefined) {
                            documentoFruto = docXml.getElementsByTagName("E_MATDOC_FRU")[0].firstChild.nodeValue;
                        }
                        var documentoTransformacion = "";
                        try {
                            if (docXml.getElementsByTagName("E_MATDOC_TRA")[0].firstChild != null && docXml.getElementsByTagName("E_MATDOC_TRA")[0].firstChild != undefined) {
                                documentoTransformacion = docXml.getElementsByTagName("E_MATDOC_TRA")[0].firstChild.nodeValue;
                            }
                        } catch (e) {

                        }
                        var ordenCompra = "";
                        try {
                            if (docXml.getElementsByTagName("PEDIDO")[0].firstChild != null && docXml.getElementsByTagName("PEDIDO")[0].firstChild != undefined) {
                                ordenCompra = docXml.getElementsByTagName("PEDIDO")[0].firstChild.nodeValue;
                            }
                        } catch (e) {

                        }
                        var E_EXIDV = "";
                        try {
                            if (docXml.getElementsByTagName("E_EXIDV")[0].firstChild != null && docXml.getElementsByTagName("PEDIDO")[0].firstChild != undefined) {
                                E_EXIDV = docXml.getElementsByTagName("E_EXIDV")[0].firstChild.nodeValue;
                            }
                        } catch (e) {

                        }
                        mensaje = '<div class="contabilizar-text">' +
                            '<h1>E_EXIDV: </h1> <p>' + (E_EXIDV) + '</p>' +
                            '<h1>Orden de Compra: </h1> <p>' + (ordenCompra) + '</p>' +
                            '<h1>Documento Recepción: </h1> <p>' + (documentoRecepcion) + '</p>' +
                            '<h1>E_MATERIALDOCUMENT : </h1> <p>' + (E_MATERIALDOCUMENT) + '</p>' +
                            '<h1>Documento Destare: </h1> <p>' + (documentoDestare) + '</p>';
                        mensaje += '<hr><h1>Copequen</h1>' +
                            '<h1>Documento Cosecha: </h1> <p>' + (documentoCosecha) + '</p>' +
                            '<h1>Documento Fruto: </h1> <p>' + (documentoFruto) + '</p>' +
                            '<h1>Orden de Transformación: </h1> <p>' + (documentoTransformacion) + '</p>';
                        mensaje += '<h1>Mensaje: </h1> <p>' + (message) + '</p>';
                        mensaje += '<div></div><div></div> </div>';

                        if (mensajeRespuesta1 == '<MATERIALDOCUMENT xmlns="http://tempuri.org/"/>') {
                            mensajeRespuesta1 = 'ERROR, No se generó documento material, favor consultar en SAP';
                            mensaje = '<div class="contabilizar-text">';
                            mensaje += '<h1>Mensaje: </h1> <p>' + (mensajeRespuesta1) + '</p>';
                            mensaje += '<div></div><div></div> </div>';
                        }

                        document.getElementById('popRespuestaLotesPaking').innerHTML = mensaje;
                        $rootScope.LoadingMercados = "none";
                        $rootScope.btnContinuar = "block";
                    }
                    if (xmlhttp.status == 500) {
                        $rootScope.LoadingMercados = "none";
                        $rootScope.btnContinuar = "block";
                        document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = 'El servidor rechazó recepción de datos!'
                        $rootScope.blockReEnvio = 0;
                    }
                }
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
        } else {
            document.getElementById('popRespuestaEnvioCajaEmbalada').innerHTML = "DATOS DEMOS CORRECTOS";
        }
        $rootScope.LoadingMercados = "none";
        $rootScope.btnContinuar = "block";
    }
    $scope.irMovimiento = function (mov) {
        if (mov === 'CONTINUAR') {
            $rootScope.datosPaletiza.HU_EXID = '';
            //$scope.navegacionPagina('recepcionPaletizadaProductor', 'fadeInLeft', '');
            $scope.mostrarRespuesta(false);

        } else {
            $scope.navegacionPagina('menuPrincipal2', 'fadeInLeft', '');
            $scope.mostrarRespuesta(false);
        }

    }
    // estableser oculto
    $scope.mostrarProductores(false);
    $scope.mostrarRespuesta(false);
})