appExpled.lazyController('asigancionCalidad', function ($scope, $routeParams, $rootScope) {
    
    $scope.datosAsignacionCalidad = {
        productor:[],
        guia:'',
        evaluacion1:'',
        evaluacion2:'',
        evaluacion3:''
    }
    $scope.mostrarRespuesta = function (estado) {
        if (estado == true) {
            $scope.verPopRespuesta = "block";
            //$scope.verBtnFin = "none";
        } else {
            $scope.verPopRespuesta = "none";
            //$scope.verBtnFin = "block";
        }
    }
    $scope.listaProductores = [];
    var arrPrd =[];
    angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR, function (value, key) {
        if(true
                &&value.ZPRD_TIPO === "PRODUCTOR"
                && value.ZPRD_VIGENTE === "SI"
            ){
            if(arrPrd.indexOf(value.NAME1)===-1){
                   $scope.listaProductores.push({DESCRIPTION: value.NAME1,VALUE_CHAR:value.LIFNR,LIFNR:value.LIFNR});
            }
        }
    });
    $scope.asignacionContinuar = function(){
        console.log($scope.datosAsignacionCalidad);
        if($scope.datosAsignacionCalidad.productor.length==0){
            $rootScope.alert.show({message:"Campo Productor se encuentra vacio"});
            return 0;
        }else if($scope.datosAsignacionCalidad.guia==""){
            $rootScope.alert.show({message:"Campo GUÍA se encuentra vacio"});
            return 0;
        }else if($scope.datosAsignacionCalidad.evaluacion1==""){
            $rootScope.alert.show({message:"Campo EVALUACIÓN 1 se encuentra vacio"});
            return 0;
        }else if($scope.datosAsignacionCalidad.evaluacion2==""){
            $rootScope.alert.show({message:"Campo EVALUACIÓN 2 se encuentra vacio"});
            return 0;
        }else if($scope.datosAsignacionCalidad.evaluacion3==""){
            $rootScope.alert.show({message:"Campo EVALUACIÓN 3 se encuentra vacio"});
            return 0;
        }
        
        var cadenaXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
        cadenaXML += '   <soapenv:Header/>';
        cadenaXML += '   <soapenv:Body>';
        cadenaXML += '      <tem:ZMOV_UPDATE_CRT_CALIDAD>';
        cadenaXML += '         <tem:datos>';
        cadenaXML += '            <tem:CONDICION1>'+$scope.datosAsignacionCalidad.evaluacion1+'</tem:CONDICION1>';
        cadenaXML += '            <tem:CONDICION2>'+$scope.datosAsignacionCalidad.evaluacion2+'</tem:CONDICION2>';
        cadenaXML += '            <tem:CONDICION3>'+$scope.datosAsignacionCalidad.evaluacion3+'</tem:CONDICION3>';
        cadenaXML += '            <tem:LIFNR>'+$scope.datosAsignacionCalidad.productor.VALUE_CHAR+'</tem:LIFNR>';
        cadenaXML += '            <tem:XBLNR>'+$scope.datosAsignacionCalidad.guia+'</tem:XBLNR>';
        cadenaXML += '         </tem:datos>';
        cadenaXML += '      </tem:ZMOV_UPDATE_CRT_CALIDAD>';
        cadenaXML += '   </soapenv:Body>';
        cadenaXML += '</soapenv:Envelope>';
        cadenaXML = cadenaXML.split('>undefined<').join('><');
        console.log(cadenaXML);
        var parser = new DOMParser();
        var docXml = parser.parseFromString(cadenaXML, "text/xml");  
        console.log(docXml.firstChild);
        $scope.mostrarRespuesta(true);
        if ($rootScope.datoUsuario.idUsuario != "demo") {
            var xmlhttp = new XMLHttpRequest();
            var mensajeRespuesta2;
            xmlhttp.open('POST', IPSERVER +'/rfcNET.asmx', true);
            var sr = cadenaXML;
            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        
                        document.getElementById('PROD_EnvioAsigCalidad').style.display = 'block';
                        document.getElementById('btnContinuar_').style.display = 'block';
                        //$('#PROD_EnvioFumigacion').hide('fade');

                        var print = xmlhttp.responseText.split("&lt;").join("<").split("&gt;").join(">").split("&quot;").join('"').split('"').join("'").split("<?xml version='1.0' encoding='ISO-8859-1' standalone='no' ?>").join("");
                        var xmlData = $.parseXML(print);
                        var parser = new DOMParser();
                        var docXml = parser.parseFromString(print, "text/xml");
                        console.log(print) 
                        try {
                            var thirdPartyNode = $(xmlData).find("MESSAGE")[0];
                            mensajeRespuesta2 = (serializeXmlNode(thirdPartyNode).split("\t").join(""));
                        } catch (e) {
                            mensajeRespuesta2 = 'NO HAY MENSAJES';
                        }
                        document.getElementById('popRespuestaEnvioAsigCal').innerHTML = '<div class="contabilizar-text"><h1>Mensajes:</h1><p>' + mensajeRespuesta2 + '</p></div>';

                        document.getElementById('loadingFumigacion').style.display = 'none';
						
                    }
                    if (xmlhttp.status == 500) {
                        //document.getElementById('loadingCajaEmabalda').style.display = 'none';
                        $('#PROD_EnvioAsigCalidad').hide('fade');
                        //document.getElementById('btnError').style.display = 'block';
                        document.getElementById('popRespuestaEnvioAsigCal').innerHTML = 'El servidor rechazó recepción de datos!';
                        $rootScope.blockReEnvio = 0;
                    }
                }
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
        } else {
            $scope.btnContinuar = false;
            document.getElementById('loadingLotesPaking').style.display = 'none';
            document.getElementById('popRespuestaLotesPaking').innerHTML = "DATOS DEMOS CORRECTOS";
            $('#cargandoDatosSAP').hide('fade');
        }
    }
})

