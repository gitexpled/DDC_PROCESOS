appExpled.lazyController('gallery', function ($scope, $rootScope, $http, $interval,$location) {
    $rootScope.auxX = { aux1:0, aux2:0};
    $scope.procesos=[];
    $scope.etiquetaBase = {
        especie2:"@NOMESPECIE",
        especie:"",
        variedad2:"@NOMVARIEDAD",
        variedad:"",
        tipoemb2:"@TIPOEMB",
        tipoemb:"",
        grsmunit2:"@GRSMUNIT",
        grsmunit:"",
        countapp2:"@COUNTAPP",
        countapp:"",
        nom1calibre2:"@NOM1CALIBRE",
        nom1calibre:"",
        glosalibre2:"@GLOSALIBRE",
        glosalibre:"",
        prod:{
            DESCRIPTION:"",
            VALUE_CHAR:""
        },
        prod2:"@PROD",
        gglote:"",
        gglote2:"@GGLOTE",
        compprod:"",
        compprod2:"@COMPRODUCTOR",
        proproduc:"",
        proproduc2:"@PROPRODUCTOR",
        prodesc:"",
        prodesc2:"@PRODESCRIPCION2",
        CSG:"",
        CSG2:"@CSLOTE",
        IDG:"",
        IDG2:"@IDLOTE",
        SDP:"",
        SDP2:"@SDLOTE",
        envain14:"",
        envain142:"@ENVAEIN14",
        embasex14:"",
        embasex142:"@EMBASEX14",
        dun14:"",
        dun142:"@DUN14",
        lotegti:"",
        lotegti2:"@LOTEGTI",
        nomfrut:"",
        nomfrut2:"@NOMFRUT",
        comfrut:"",
        comfrut2:"@COMFRUT",
        provfrut:"",
        provfrut2:"@PROVFRUT",
        cspfrut:"",
        cspfrut2:"@CSPFRUT",
        idpfrut:"",
        idpfrut2:"@IDPFRUT",
        fdafrut:"",
        fdafrut2:"@FDAFRUT",
        kilos:"",
        kilos2:"@KILOS",
        diametro:"",
        diametro2:"@DIAMETRO",
        codmat:"",
        codmat2:"@CODMAT",
        nlote:"",
        nlote2:"@NUMLOTE",
        fechprd:"",
        fechprd2:"@FECHAAPROD_MM_DD_AA",
        fechapprd:"",
        fechapprd2:"@FECHAAPROD_MMMDDNORM",
        voickb:"",
        voickb2:"@VOICEPICKB",
        voicka:"",
        voicka2:"@VOICEPICKA",
        correlativo:"",
        correlativo2:"@CORRELATIVO",
        salida:"",
        salida2:"@SALIDA",
        turno:"",
        turno2:"@TURNO",
        lpack:"",
        lpack2:"@LINEAPACK"
    }
    $scope.procesosIndex=0;
    $scope.descprd = "";
    $scope.SENDD =[];
    $scope.Linea=[];
    $scope.displayTextCodeInput = 'none';
    $scope.IMG = 'none';
    $scope.Ocultar = "Ocultar";
    $scope.ocultar = false;
    $scope.listItems=[];
    $scope.procesoBase={
        id:Math.random(),
        filas:[],
        on:"on",
        productor:"-",
        especie:"-",
        variedad:"",
        material:"",
        kilosGranel:"",
        kilosPal:"",
        kilosEtiqueta:""
    }; 
    $scope.cantLineas = 0;
    $scope.cantFilas = 0;
    $scope.PantCentro = [];
    $scope.EtiquetaAuxiliar = [];
    //insert into pantallas values('149.60.2.15','149.60.2.16','DC02','1')
    $scope.LineaUsuario = $rootScope.userData.linea;
    $scope.Inicio = function(){
        $http({
            method: 'POST',
            url: IPSERVER+'JSON_ZMOV_PANTALLAS.aspx',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout:500000
         }).success(function(dataP){
             console.log(dataP)
             var linea = ($scope.LineaUsuario-1)*1;
             console.log(linea)
            angular.forEach(dataP,function(val,key){
                if($rootScope.userData.centro == val.centro && val.linea == linea){
                $scope.PantCentro.push({
                    pantalla: val.ip_pan,
                    impresora: val.ip_imp
                });
                 }
            });
            console.log($scope.PantCentro);
            $scope.countAux = 0;
            
            $http({
                    method: 'POST',
                    url: IPSERVER+'JSON_ZMOV_FILAS.aspx',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    timeout:500000
                }).success(function(data){
                    angular.forEach(data,function(val,key){
                    if(val.centro ==  $rootScope.userData.centro){
                        $scope.cantLineas = val.linea;
                        $scope.cantFilas = val.fila;
                    }
                });
                
                    for(var i=0;i<$scope.cantLineas;i++){
                        var auxHide = true;
                        if($scope.LineaUsuario == (i+1)){auxHide = false;}
                        $scope.Linea.push({index:i,procesos:[],procesosIndex:0,procesosTerminados:[],Eliminar:"none",EliminarT:"none",codigo:"",OcultarL:"Mostrar",LineaHide:true, FilaHide:true, LineaUsuario:auxHide});
                    }
                    var au = 0;
                    for(var j=0;j<$scope.cantFilas;j++){
                        var pan1 = $scope.PantCentro[au].pantalla;
                        var pan2 = $scope.PantCentro[au+1].pantalla;
                        $scope.countAux = $scope.countAux + 2;
                        $scope.procesoBase.filas.push({
                            index:j+""+j,
                            Pantalla1:[
                                {nombre:pan1, salida:(j*2)+1,ipImpresora:$scope.PantCentro[au].impresora,PanZPL:0,linea:0,fila:j,pantalla:'Pantalla1',etiqueta:$scope.etiquetaBase,Stock:-1,zplBase:"",aux:0},
                                {nombre:pan1, salida:(j*2)+1,ipImpresora:$scope.PantCentro[au].impresora,PanZPL:1,linea:0,fila:j,pantalla:'Pantalla1',etiqueta:$scope.etiquetaBase,Stock:-1,zplBase:"",aux:0},
                                {nombre:pan1, salida:(j*2)+1,ipImpresora:$scope.PantCentro[au].impresora,PanZPL:2,linea:0,fila:j,pantalla:'Pantalla1',etiqueta:$scope.etiquetaBase,Stock:-1,zplBase:"",aux:0},
                                {nombre:pan1, salida:(j*2)+1,ipImpresora:$scope.PantCentro[au].impresora,PanZPL:3,linea:0,fila:j,pantalla:'Pantalla1',etiqueta:$scope.etiquetaBase,Stock:-1,zplBase:"",aux:0}
                            ],
                            Pantalla2:[
                                {nombre:pan2,salida:(j*2)+2,ipImpresora:$scope.PantCentro[au+1].impresora,PanZPL:0,linea:0,fila:j,pantalla:'Pantalla2',etiqueta:$scope.etiquetaBase,Stock:-1,zplBase:"",aux:0},
                                {nombre:pan2,salida:(j*2)+2,ipImpresora:$scope.PantCentro[au+1].impresora,PanZPL:1,linea:0,fila:j,pantalla:'Pantalla2',etiqueta:$scope.etiquetaBase,Stock:-1,zplBase:"",aux:0},
                                {nombre:pan2,salida:(j*2)+2,ipImpresora:$scope.PantCentro[au+1].impresora,PanZPL:2,linea:0,fila:j,pantalla:'Pantalla2',etiqueta:$scope.etiquetaBase,Stock:-1,zplBase:"",aux:0},
                                {nombre:pan2,salida:(j*2)+2,ipImpresora:$scope.PantCentro[au+1].impresora,PanZPL:3,linea:0,fila:j,pantalla:'Pantalla2',etiqueta:$scope.etiquetaBase,Stock:-1,zplBase:"",aux:0}
                            ]
                        })
                        console.log($scope.procesoBase.filas);
                        au = au +2;
                    }
                });
        })
    }
    $rootScope.loading.show();
    $http({
            method: 'POST',
            url: IPSERVER+'/JSON_IMAGE_ZPL.aspx?req=ok',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout:500000
            })
                    .success(function(data){
        $scope.EtiquetasBase = data;
        $.each(data,function(key,value){
            $.each(value,function(key2,value2){
               if(key2 ==="url"){
                   //$("#gallery").append("<li class='ui-widget-content ui-corner-tr' style='z-index: 5'><a class='tit'>"+value.nombre+"</a><img src='"+value2+"' style='width:107px;height:120px;margin-top:28px'><a title='View larger image' class='ui-icon ui-icon-zoomin' zpl='"+value2+"' titulo='"+value.nombre+"'>View larger</a></li>");
                   $scope.listItems.push({id:value.id,name:value.nombre,url:value2,zpl:value.zpl});
               }
            });
         });
         $http({
            method: 'POST',
            url: IPSERVER+'/JSON_ZMOV_CONSULTA_ETIQUETA.aspx?c='+$rootScope.userData.centro,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout:500000
         }).success(function(dataEtiqueta){
                 if(dataEtiqueta.length == 0){
                     $scope.Inicio();
                     $rootScope.loading.hide();
                 }
                 else{
                    $scope.Inicio();
                    angular.forEach($scope.EtiquetasBase, function(val,key){
                        angular.forEach(dataEtiqueta, function(valEti,keyEti){
                            if(val.id == valEti.id_zpl){
                               $scope.EtiquetaAuxiliar.push({
                                   id:val.id,
                                   url:val.url,
                                   zpl:val.zpl,
                                   name:val.nombre,
                                   proc:"on",
                                   nombre:valEti.ip_pantalla,
                                   PanZPL:valEti.pantalla_zpl,
                                   fila:valEti.fila_zpl,
                                   linea:valEti.linea_zpl,
                                   pantalla:valEti.pantalla
                               }) 
                            }
                        });
                    });
                    $rootScope.loading.hide();
                  /*  console.log(dataEtiqueta)
                    console.log($scope.EtiquetaAuxiliar);*/
                 }
            }).error($rootScope.httpRequest.error);
    }).error($rootScope.httpRequest.error);
    $scope.separate = function(val){
        while(/(\d+)(\d{3})/.test(val.toString())){
            val = val.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2');
        }
        return val;
    }
    $scope.auxZPL={
        id:"",
        url:"",
        name:"",
        zpl:"",
    };
    $scope.onDragComplete = function(data, evt,obj) {
       console.log(data.name)
        $scope.auxZPL.id=data.id;
        $scope.auxZPL.url=data.url;
        $scope.auxZPL.name =data.name;
        $scope.auxZPL.zpl =data.zpl;
        data.url="";
      
    }
    $scope.onDropComplete = function(data, evt,obj) {
        //console.log(data);
        //console.log(obj);
        if($scope.auxZPL.url!==""){
          obj.id=$scope.auxZPL.id;
          obj.url=$scope.auxZPL.url;
          obj.name =$scope.auxZPL.name;
          obj.zpl =$scope.auxZPL.zpl;
          $scope.auxZPL.id="";
          $scope.auxZPL.url="";
          $scope.auxZPL.name="";
          $scope.auxZPL.zpl="";
          return;
        }
        obj.id=data.id;
        obj.url=data.url;
        obj.name =data.name;
        obj.zpl=data.zpl;
    }
    $scope.Imagen = function(img){
        $scope.imagen ={
            'imagen':img.url,
            'title':img.name
        };
        $scope.IMG = 'block';
    }
    $scope.hide = function(){
        $scope.Ocultar = "Mostrar";
        $scope.ocultar = !$scope.ocultar; 
        if(!$scope.ocultar){
           $scope.Ocultar = "Ocultar"; 
        }
    }
    $scope.hideLinea = function(item){
        item.OcultarL = "Ocultar";
            item.LineaHide = !item.LineaHide; 
            if(item.LineaHide)
                item.OcultarL = "Mostrar";
        
    }
    $scope.CargaMateriales = function(especie){
        $scope.materialesTerminado = [];
        $http({
            method: 'POST',
            url: IPSERVER+'/JSON_ZMOV_QUERY_MATERIAL.aspx?MTART=FERT',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout:500000
        }).success(function(data){
            angular.forEach(data.MATERIALES,function(val,key){
                if(val.ZMAT_ESPECIE == especie){
                    $scope.materialesTerminado.push({'DESCRIPTION':val.MATNR,VALUE_CHAR: val.MATNR, 'KILOS':val.NTGEW,'EMBALAJE':val.ZMAT_EMBALAJE});
                }
            });
        });
    }
    $scope.Productor=function(item){
        $http({
            method: 'POST',
            url: IPSERVER+'/JSON_ZMF_GET_DAT_PROD.aspx',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout:500000
        }).success(function(data){
            //console.log(data)
           $scope.listaProductores = [];
            var arrPrd =[];
            angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PRODUCT, function (value, key) {
                if(true
                        &&value.ESPECIE=== item
                    ){
                    if(arrPrd.indexOf(value.LIFNR)===-1){
                           $scope.listaProductores.push({DESCRIPTION:value.LIFNR, VALUE_CHAR:value.LIFNR});
                           arrPrd.push(value.LIFNR);
                    }
                }
            });
        });
    }
    $scope.cambio=function(){
        angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PRODUCT, function (value, key) {
                if(value.LIFNR=== $scope.etiqueta.etiqueta.prod.DESCRIPTION){
                    $scope.etiqueta.etiqueta.prodesc = value.REGION;
                    $scope.etiqueta.etiqueta.proproduc=value.PROVINCIA;
                    $scope.etiqueta.etiqueta.compprod = value.COMUNA;
                    $scope.etiqueta.etiqueta.gglote = value.NUM_GGN;
                    $scope.etiqueta.etiqueta.CSG = value.COD_CSG;
                }
            });
        $scope.listaVariedad = [];
        angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_VAR, function (value, key) {
            if(value.LIFNR=== $scope.etiqueta.etiqueta.prod.DESCRIPTION){
                $scope.listaVariedad.push({DESCRIPTION:value.VAR, VALUE_CHAR:value.COD_VAR})
            }
        });
        $scope.listaIDG = [];
        $scope.listaIDP = [];
        $scope.listaSDP = [];
        angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_IDG, function (value, key) {
                if(value.LIFNR=== $scope.etiqueta.etiqueta.prod.DESCRIPTION){
                    $scope.listaIDG.push({DESCRIPTION: value.IDG,VALUE_CHAR:value.IDG,LIFNR:value.IDG})
                }
        });
        angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_IDP, function (value, key) {
                if(value.LIFNR=== $scope.etiqueta.etiqueta.prod.DESCRIPTION){
                    $scope.listaIDP.push({DESCRIPTION: value.IDP,VALUE_CHAR:value.IDP})
                }
        });
        angular.forEach($rootScope.ZMOV_QUERY_PRODUCTOR.ET_PROD_SDP, function (value, key) {
                if(value.LIFNR=== $scope.etiqueta.etiqueta.prod.DESCRIPTION){
                    $scope.listaSDP.push({DESCRIPTION: value.SDP,VALUE_CHAR:value.SDP,MANDT:value.MANDT})
                }
        });
    }
    $scope.PopUP = function(obj,item){
        $scope.CargaMateriales(item.procesos[item.procesosIndex].especie);
        $scope.Productor(item.procesos[item.procesosIndex].especie);
        if(obj.url == undefined || obj.url == ""){
            return;
        }else{
             var f =  new Date();
                var mes = (f.getMonth()+1)*1;
                var dia = f.getDate();
                var MES = "";
                if(mes < 10){MES = '0'+(f.getMonth()+1);}
                if(dia < 10){dia = '0'+dia;}
                var year = f.getFullYear();
                year = year.toString().substr(2,2);
                var fecha =  MES+'/'+ dia+'/'+year;
                var mesI = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEPT','OCT','NOV','DEC'];
                //var mesE = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEPT','OCT','NOV','DIC'];
                var fpprd = mesI[f.getMonth()]+' '+f.getDate()
                $scope.displayTextCodeInput = 'block';
                $scope.etiqueta = obj;
            if($scope.etiqueta.aux == 0){
                //console.log($scope.etiqueta);
                $scope.etiqueta.etiqueta.especie = item.procesos[item.procesosIndex].especie;
                $scope.etiqueta.zplBase = $scope.etiqueta.zpl;
                $scope.etiqueta.etiqueta.nlote = item.procesos[item.procesosIndex].LOTE;
                $scope.etiqueta.proc = item.procesos[item.procesosIndex].on;
                $scope.etiqueta.proceso = item.procesos[item.procesosIndex].LOTE;
                $scope.etiqueta.etiqueta.turno = $rootScope.userData.turno;
                $scope.etiqueta.etiqueta.prod = {DESCRIPTION: item.procesos[item.procesosIndex].productor, VALUE_CHAR:item.procesos[item.procesosIndex].productor};
                $scope.etiqueta.etiqueta.fechprd = fecha;
                $scope.etiqueta.etiqueta.fechapprd = fpprd;
                $scope.etiqueta.etiqueta.cspfrut = $scope.DatosEtiqueta.LT_QUERY_LOTE[0].WERKS_CSP;
                $scope.etiqueta.etiqueta.fdafrut = $scope.DatosEtiqueta.LT_QUERY_LOTE[0].WERKS_FDA;
                $scope.etiqueta.etiqueta.provfrut = $scope.DatosEtiqueta.LT_QUERY_LOTE[0].WERKS_PROVINCIA;
                $scope.etiqueta.etiqueta.comfrut = $scope.DatosEtiqueta.LT_QUERY_LOTE[0].WERKS_COMUNA;
                $scope.etiqueta.etiqueta.nomfrut = $scope.DatosEtiqueta.LT_QUERY_LOTE[0].WERKS_NAME;
                $scope.etiqueta.etiqueta.CSG = $scope.DatosEtiqueta.LT_QUERY_LOTE[0].SAG_CSG;
                $scope.etiqueta.etiqueta.compprod = $scope.DatosEtiqueta.LT_QUERY_LOTE[0].SAG_CSP_COMUNA;
                $scope.etiqueta.etiqueta.proproduc = $scope.DatosEtiqueta.LT_QUERY_LOTE[0].SAG_CSP_PROVINCIA;
                $scope.etiqueta.etiqueta.idpfrut = $scope.DatosEtiqueta.LT_QUERY_LOTE[0].WERKS_IDP;
                $scope.etiqueta.etiqueta.salida = $scope.etiqueta.salida;
                $scope.etiqueta.etiqueta.lpack = ($scope.etiqueta.linea+1)*1;
                $scope.etiqueta.etiqueta.kilos = item.procesos[item.procesosIndex].kilosGranel;
                $scope.etiqueta.etiqueta.correlativo = item.procesos[item.procesosIndex].LOTE;
                $scope.cambio();
                $scope.etiqueta.aux = 1;
            }
        }
    }
    $scope.validate = function(){
            var urll = $scope.etiqueta.url;
            var zpl = $scope.etiqueta.zpl;
            var url = urll.replace(zpl,"");
            var trueZpl = $scope.etiqueta.zplBase;
                trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.especie2,$scope.etiqueta.etiqueta.especie);
            if($scope.etiqueta.etiqueta.variedad === ""){    
                trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.variedad2,$scope.etiqueta.etiqueta.variedad);
            }else{
                trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.variedad2,$scope.etiqueta.etiqueta.variedad.DESCRIPTION);
            }
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.grsmunit2,$scope.etiqueta.etiqueta.grsmunit);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.countapp2,$scope.etiqueta.etiqueta.countapp);
                 trueZpl = trueZpl.split($scope.etiqueta.etiqueta.nom1calibre2).join($scope.etiqueta.etiqueta.nom1calibre);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.glosalibre2,$scope.etiqueta.etiqueta.glosalibre);
            if($scope.etiqueta.etiqueta.prod === ""){     
                trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.prod2,$scope.etiqueta.etiqueta.prod);
            } else{
                trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.prod2,$scope.etiqueta.etiqueta.prod.DESCRIPTION);
            }
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.gglote2,$scope.etiqueta.etiqueta.gglote);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.compprod2,$scope.etiqueta.etiqueta.compprod);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.proproduc2,$scope.etiqueta.etiqueta.proproduc);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.prodesc2,$scope.etiqueta.etiqueta.prodesc);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.CSG2,$scope.etiqueta.etiqueta.CSG);
            if($scope.etiqueta.etiqueta.IDG === ''){
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.IDG2,$scope.etiqueta.etiqueta.IDG);       
            }
            else {
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.IDG2,$scope.etiqueta.etiqueta.IDG.DESCRIPTION);
                 $scope.etiqueta.etiqueta.IDG2 =$scope.etiqueta.etiqueta.IDG.DESCRIPTION;
            }
            if($scope.etiqueta.etiqueta.SDP === ''){
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.SDP2,$scope.etiqueta.etiqueta.SDP);
                     
            }else{
                  trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.SDP2,$scope.etiqueta.etiqueta.SDP.DESCRIPTION);
            }
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.envain142,$scope.etiqueta.etiqueta.envain14);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.embasex142,$scope.etiqueta.etiqueta.embasex14);
                 trueZpl = trueZpl.split($scope.etiqueta.etiqueta.dun142).join($scope.etiqueta.etiqueta.dun14);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.lotegti2,$scope.etiqueta.etiqueta.lotegti);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.nomfrut2,$scope.etiqueta.etiqueta.nomfrut);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.comfrut2,$scope.etiqueta.etiqueta.comfrut);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.cspfrut2,$scope.etiqueta.etiqueta.cspfrut);
           // if($scope.etiqueta.etiqueta.idpfrut == ''){
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.idpfrut2,$scope.etiqueta.etiqueta.idpfrut);  
           // }else{
             //   trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.idpfrut2,$scope.etiqueta.etiqueta.idpfrut.DESCRIPTION);
           // }
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.fdafrut2,$scope.etiqueta.etiqueta.fdafrut);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.kilos2,$scope.etiqueta.etiqueta.kilos);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.diametro2,$scope.etiqueta.etiqueta.diametro);
             if($scope.etiqueta.etiqueta.codmat == ''){    
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.codmat2,$scope.etiqueta.etiqueta.codmat);
             }else{
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.codmat2,$scope.etiqueta.etiqueta.codmat.DESCRIPTION);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.tipoemb2,$scope.etiqueta.etiqueta.codmat.EMBALAJE); 
            }    
                 trueZpl = trueZpl.replace("@BARRA",$scope.etiqueta.etiqueta.correlativo);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.nlote2,$scope.etiqueta.etiqueta.nlote);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.fechprd2,$scope.etiqueta.etiqueta.fechprd);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.fechapprd2,$scope.etiqueta.etiqueta.fechapprd);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.provfrut2,$scope.etiqueta.etiqueta.provfrut);
                 trueZpl = trueZpl.split($scope.etiqueta.etiqueta.voickb2).join($scope.etiqueta.etiqueta.voickb); 
                 trueZpl = trueZpl.split($scope.etiqueta.etiqueta.voicka2).join($scope.etiqueta.etiqueta.voicka);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.correlativo2,$scope.etiqueta.etiqueta.correlativo);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.salida2,$scope.etiqueta.etiqueta.salida);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.turno2,$scope.etiqueta.etiqueta.turno);
                 trueZpl = trueZpl.replace($scope.etiqueta.etiqueta.lpack2,$scope.etiqueta.etiqueta.lpack);
           url = url+trueZpl;
           $scope.etiqueta.zpl =trueZpl;
           $scope.etiqueta.url = url;
    }
    $scope.SaveVentana = function(obj){
       var id = "";
        $http({
            method: 'POST',
            url: IPSERVER+'/JSON_ZMOV_CONSULTA_ETIQUETA.aspx?c='+$rootScope.userData.centro,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout:500000
         }).success(function(dataEtiqueta){
             console.log(dataEtiqueta)
             var lin = ($scope.LineaUsuario - 1)*1;
             $scope.auxLin = true;
             $scope.DataEti = dataEtiqueta;
             angular.forEach(dataEtiqueta,function(val,key){
                 if(val.linea_zpl == lin){
                     $scope.auxLin = false;
                 };
             });
            if($scope.auxLin){
                   $rootScope.alert.show({message:"Por favor, Guarde la Estructura de las etiqueta de esta Linea"});
             }
            else{
                $scope.validate();
                angular.forEach(dataEtiqueta,function(val,key){
                   if(val.centro == $rootScope.userData.centro && val.fila_zpl == obj.fila && val.id_zpl == obj.id && val.ip_pantalla == obj.nombre && val.linea_zpl == obj.linea && val.pantalla == obj.pantalla && val.pantalla_zpl == obj.PanZPL){
                       id =  val.id;
                   }
                })
                console.log(id)
                if(obj.etiqueta.codmat == ""){
                    $rootScope.alert.show({message:"Es necesario la seleccion del material"});
                }
                else{
                      $http({
                            method: 'POST',
                            url: IPSERVER+'JSON_ZMOV_STOCK_CONSULTA.aspx?ok=ok',
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            timeout:500000
                    })
                            .success(function(dataZPL){
                         var auxZPL =  true;
                         angular.forEach(dataZPL,function(val,key){
                             if(val.ip_zebra = obj.ipImpresora && val.id_posicion == id){
                                 auxZPL = false;
                             };
                         });
                         angular.forEach(dataEtiqueta,function(val,key){
                            if(val.linea_zpl == lin && val.pantalla == obj.pantalla && obj.nombre == val.ip_pantalla){
                                $scope.auxLn = false;
                            };
                        });
                        if(auxZPL){
                            if(!$scope.auxLn){
                                $scope.AuxErr =  true;
                                if($scope.etiqueta.duplicateTag === "SI"){
                                    var url = "";
                                    var zpl = "";
                                    var linea=$scope.etiqueta.linea;
                                    var pantalla=$scope.etiqueta.pantalla;
                                    var panzpl=$scope.etiqueta.PanZPL;
                                     angular.forEach($scope.Linea,function(val,key){
                                        angular.forEach(val,function(valproc,key2){
                                            if(key2 === 'procesos'){
                                                angular.forEach(valproc,function(val2,key3){
                                                    angular.forEach(val2,function(val3,key4){
                                                        if(key4 === 'filas'){
                                                            angular.forEach(val3,function(val4,key5){
                                                                angular.forEach(val4,function(valPantalla,key6){
                                                                    if(key6 === 'Pantalla1'){
                                                                        angular.forEach(valPantalla,function(valp1,keyp){
                                                                            if(valp1.PanZPL == panzpl && valp1.linea == linea && valp1.pantalla == pantalla){
                                                                                valp1.name = $scope.etiqueta.name;
                                                                                url = $scope.etiqueta.url;
                                                                                valp1.url = url ;
                                                                                valp1.aux = $scope.etiqueta.aux;
                                                                                valp1.id = $scope.etiqueta.id;
                                                                                valp1.proc = $scope.etiqueta.proc;
                                                                                zpl = $scope.etiqueta.zpl;
                                                                                valp1.linea = $scope.etiqueta.linea;
                                                                                valp1.zpl = zpl;
                                                                                valp1.zplBase = $scope.etiqueta.zplBase;
                                                                                $scope.json = $scope.etiqueta.etiqueta;
                                                                                valp1.etiqueta = $scope.json;
                                                                                $scope.IdDupl = "";
                                                                                angular.forEach($scope.DataEti,function(valEtiquD,key){
                                                                                $scope.auxZ = true;
                                                                                    if(valEtiquD.centro == $rootScope.userData.centro 
                                                                                            && valEtiquD.fila_zpl == valp1.fila 
                                                                                            && valEtiquD.id_zpl == valp1.id 
                                                                                            && valEtiquD.ip_pantalla == valp1.nombre 
                                                                                            && valEtiquD.linea_zpl == valp1.linea 
                                                                                            && valEtiquD.pantalla == valp1.pantalla 
                                                                                            && valEtiquD.pantalla_zpl == valp1.PanZPL 
                                                                                            ){
                                                                                        if(valEtiquD.id != id){$scope.IdDupl = valEtiquD.id;}else{$scope.auxZ = false;}
                                                                                    }
                                                                                 });
                                                                                 //console.log($scope.auxZ);
                                                                                 $scope.AuxErr =  true;
                                                                                 if($scope.auxZ && $scope.IdDupl != "" ){
                                                                                    var datos = 'z='+obj.id+'&zpl='+obj.zpl+'&s='+obj.Stock+'&p='+$scope.IdDupl+'&pr='+obj.proceso+'&k='+$scope.etiqueta.etiqueta.codmat.KILOS+'&consul=insert'+'&l='+obj.linea+'&iz='+valp1.ipImpresora+'&sal='+valp1.salida+'&cal='+$scope.etiqueta.etiqueta.nom1calibre+'&TM='+$scope.etiqueta.etiqueta.codmat.EMBALAJE
                                                                                   $rootScope.loading.show();
                                                                                   $http({
                                                                                       method: 'POST',
                                                                                       url: IPSERVER+"JSON_ZMOV_STOCK_ZPL.aspx",
                                                                                       headers : { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                                                                                       dataType: 'json',
                                                                                       timeout:500000,
                                                                                       data:datos
                                                                                    }).success(function(data){ 
                                                                                        console.log(data)
                                                                                        $rootScope.loading.hide();
                                                                                        $rootScope.alert.show({message:data.resp}); 
                                                                                    }).error($rootScope.httpRequest.error);
                                                                                }
                                                                                else{
                                                                                     $rootScope.alert.show({message:"No se puede guardar, no se encuentra la estructura de los zpl duplicados"});
                                                                                     $scope.AuxErr =  false; 
                                                                                    return;
                                                                               }

                                                                            }
                                                                        });
                                                                    }
                                                                    if(key6 === 'Pantalla2'){
                                                                        angular.forEach(valPantalla,function(valp2,keyp){
                                                                            if(valp2.PanZPL == panzpl && valp2.linea == linea && valp2.pantalla == pantalla){
                                                                                valp2.name = $scope.etiqueta.name;
                                                                                url = $scope.etiqueta.url;
                                                                                valp2.url = url;
                                                                                valp2.linea = $scope.etiqueta.linea;
                                                                                valp2.aux = $scope.etiqueta.aux;
                                                                                valp2.id = $scope.etiqueta.id;
                                                                                valp2.proc = $scope.etiqueta.proc;
                                                                                zpl = $scope.etiqueta.zpl;
                                                                                valp2.zpl =  zpl;
                                                                                valp2.zplBase = $scope.etiqueta.zplBase;
                                                                                $scope.json = JSON.parse(JSON.stringify(($scope.etiqueta.etiqueta)));
                                                                                valp2.etiqueta = $scope.json;
                                                                                 var IdDupl = "";
                                                                                angular.forEach($scope.DataEti,function(valEtiquD,key){
                                                                                    $scope.auxZ = true;
                                                                                    if(valEtiquD.centro == $rootScope.userData.centro 
                                                                                            && valEtiquD.fila_zpl == obj.fila
                                                                                            && valEtiquD.id_zpl == valp2.id 
                                                                                            && valEtiquD.ip_pantalla == valp2.nombre 
                                                                                            && valEtiquD.linea_zpl == valp2.linea 
                                                                                            && valEtiquD.pantalla == valp2.pantalla 
                                                                                            && valEtiquD.pantalla_zpl == valp2.PanZPL){
                                                                                        if(valEtiquD.id != id){$scope.IdDupl = valEtiquD.id;}else{$scope.auxZ = false;}
                                                                                    }
                                                                                 });
                                                                                 if($scope.auxZ){
                                                                                 var datos = 'z='+obj.id+'&zpl='+obj.zpl+'&s='+obj.Stock+'&p='+IdDupl+'&pr='+obj.proceso+'&k='+$scope.etiqueta.etiqueta.codmat.KILOS+'&consul=insert'+'&l='+obj.linea+'&iz='+valp2.ipImpresora+'&sal='+valp2.salida+'&cal='+$scope.etiqueta.etiqueta.nom1calibre+'&TM='+$scope.etiqueta.etiqueta.codmat.EMBALAJE
                                                                                    $rootScope.loading.show();
                                                                                    $http({
                                                                                        method: 'POST',
                                                                                        url: IPSERVER+"JSON_ZMOV_STOCK_ZPL.aspx",
                                                                                        headers : { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                                                                                        dataType: 'json',
                                                                                        timeout:500000,
                                                                                        data:datos
                                                                                     }).success(function(data){ 
                                                                                         console.log(data)
                                                                                         $rootScope.loading.hide();
                                                                                         $rootScope.alert.show({message:data.resp}); 
                                                                                     }).error($rootScope.httpRequest.error);
                                                                                }else{
                                                                                     $rootScope.alert.show({message:"No se puede guardar, no se encuentra la estructura de los zpl duplicados"});
                                                                                     $scope.AuxErr =  false; 
                                                                                    return;
                                                                               }
                                                                            };
                                                                        });
                                                                    };
                                                                });
                                                            });
                                                        };
                                                    });
                                                });
                                            };
                                        });
                                    });
                                } 
                                if($scope.AuxErr){
                                    var datos = 'z='+obj.id+'&zpl='+obj.zpl+'&s='+obj.Stock+'&p='+id+'&pr='+obj.proceso+'&k='+$scope.etiqueta.etiqueta.codmat.KILOS+'&consul=insert'+'&l='+obj.linea+'&iz='+obj.ipImpresora+'&sal='+obj.salida+'&cal='+$scope.etiqueta.etiqueta.nom1calibre+'&TM='+$scope.etiqueta.etiqueta.codmat.EMBALAJE;
                                    console.log(datos)
                                     $rootScope.loading.show();
                                       $http({
                                           method: 'POST',
                                           url: IPSERVER+"JSON_ZMOV_STOCK_ZPL.aspx",
                                           headers : { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                                           dataType: 'json',
                                           timeout:500000,
                                           data:datos
                                        }).success(function(data){
                                            $rootScope.loading.hide();
                                            $rootScope.alert.show({message:data.resp}); 
                                        }).error($rootScope.httpRequest.error);
                                }    
                             }
                             else{
                                $rootScope.alert.show({message:"No se encontro esta estructura guardada"});
                            }
                        }
                        else{
                            $rootScope.alert.show({message:"Se modificara datos de esta ventana", type:"confirm",
                             acceptClick:function(){
                                 console.log('2')
                                 $rootScope.loading.show();
                                 var datosM = 'z='+obj.id+'&zpl='+obj.zpl+'&s='+obj.Stock+'&p='+id+'&pr='+obj.proceso+'&k='+$scope.etiqueta.etiqueta.codmat.KILOS+'&consul=modific'+'&l='+obj.linea+'&iz='+obj.ipImpresora+'&sal='+obj.salida+'&cal='+$scope.etiqueta.etiqueta.nom1calibre+'&TM='+$scope.etiqueta.etiqueta.codmat.EMBALAJE;
                                 console.log(datosM);   
                                 $http({
                                        method: 'POST',
                                        url: IPSERVER+"JSON_ZMOV_STOCK_ZPL.aspx",
                                        headers : { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                                        dataType: 'json',
                                        timeout:500000,
                                        data:datosM
                                    }).success(function(data){
                                        $rootScope.loading.hide();
                                        $rootScope.alert.show({message:data.resp});
                                    }).error($rootScope.httpRequest.error);
                                    $rootScope.alert.display='none';}
                            });
                        }
                    }).error($rootScope.httpRequest.error);
                }
            }
         });
    }
    $scope.Acept = function(){
        console.log($scope.etiqueta)
        var url = "";
        var zpl = "";
        var linea=$scope.etiqueta.linea;
        var fila=$scope.etiqueta.fila;
        var pantalla=$scope.etiqueta.pantalla;
        var panzpl=$scope.etiqueta.PanZPL;
        var ProOn=$scope.etiqueta.proc;
        if($scope.etiqueta.duplicateTag === "SI"){
             $scope.etiqueta.duplicateTag = 'NO';
            angular.forEach($scope.Linea,function(val,key){
                angular.forEach(val,function(valproc,key2){
                    if(key2 === 'procesos'){
                        angular.forEach(valproc,function(val2,key3){
                            angular.forEach(val2,function(val3,key4){
                                if(key4 === 'filas'){
                                    angular.forEach(val3,function(val4,key5){
                                        angular.forEach(val4,function(valPantalla,key6){
                                            if(key6 === 'Pantalla1'){
                                                angular.forEach(valPantalla,function(valp1,keyp){
                                                    if(valp1.PanZPL === panzpl && valp1.linea === linea && valp1.pantalla === pantalla){
                                                        valp1.name = $scope.etiqueta.name;
                                                         url = $scope.etiqueta.url;
                                                        valp1.url = url ;
                                                        valp1.linea =  $scope.etiqueta.linea;
                                                        valp1.aux = $scope.etiqueta.aux;
                                                        valp1.id = $scope.etiqueta.id;
                                                        valp1.proc = $scope.etiqueta.proc;
                                                        zpl = $scope.etiqueta.zpl;
                                                        valp1.zpl = zpl;
                                                        valp1.zplBase = $scope.etiqueta.zplBase;
                                                         $scope.json = JSON.parse(JSON.stringify(($scope.etiqueta.etiqueta)));
                                                        valp1.etiqueta = $scope.json;
                                                    }
                                                });
                                            }
                                            if(key6 === 'Pantalla2'){
                                                angular.forEach(valPantalla,function(valp2,keyp){
                                                    if(valp2.PanZPL === panzpl && valp2.linea === linea && valp2.pantalla === pantalla){
                                                        valp2.name = $scope.etiqueta.name;
                                                        url = $scope.etiqueta.url;
                                                        valp2.url = url;
                                                        valp2.linea = $scope.etiqueta.linea;
                                                        valp2.aux = $scope.etiqueta.aux;
                                                        valp2.id = $scope.etiqueta.id;
                                                        valp2.proc = $scope.etiqueta.proc;
                                                        zpl = $scope.etiqueta.zpl;
                                                        valp2.zpl =  zpl;
                                                        valp2.zplBase = $scope.etiqueta.zplBase;
                                                        $scope.json = JSON.parse(JSON.stringify(($scope.etiqueta.etiqueta)));
                                                        valp2.etiqueta = $scope.json;
                                                    };
                                                });
                                            };
                                        });
                                    });
                                };
                            });
                        });
                    };
                });
            });
        };
        $scope.displayTextCodeInput = 'none';
    };
    $scope.Generar = function(){
        $rootScope.goToPage('/vistaimpresion',{animation:"fadeInRight"});
    }
    $scope.eliminar = function(){
        $scope.etiqueta.url = "";
        $scope.etiqueta.zpl = "";
        $scope.etiqueta.Stock = "";
        $scope.etiqueta.cuartel = "";
        $scope.etiqueta.predio ="";
        $scope.etiqueta.codigo = "";
        $scope.etiqueta.duplicateTag = "NO";
        $scope.etiqueta.cuartel1 = "ALGO1";
        $scope.etiqueta.predio1 ="ALGO2";
        $scope.etiqueta.codigo1 = "CODIGO";
        $scope.displayTextCodeInput = 'none';
    };
    $scope.Save = function(obj){
        console.log($scope.LineaUsuario)
        var guardar = {pantalla1:[], pantalla2:[]};
        angular.forEach($scope.Linea,function(val,key){
            angular.forEach(val,function(valproc,key2){
                if(key2 === 'procesos'){
                    angular.forEach(valproc,function(val2,key3){
                        angular.forEach(val2,function(val3,key4){
                            if(key4 === 'filas'){
                                angular.forEach(val3,function(val4,key5){
                                    angular.forEach(val4,function(valPantalla,key6){
                                        if(key6 === 'Pantalla1'){
                                            angular.forEach(valPantalla,function(valp1,keyp){
                                                if(valp1.url === undefined || valp1.url === ""){
                                                }else{
                                                   guardar.pantalla1.push(valp1);
                                                }
                                            });
                                        }
                                        if(key6 === 'Pantalla2'){
                                            angular.forEach(valPantalla,function(valp2,keyp){
                                                if(valp2.url === undefined || valp2.url === ""){
                                                }else{
                                                   guardar.pantalla2.push(valp2);
                                                };
                                            });
                                        };
                                    });
                                });
                            };
                        });
                    });
                };
            });
        });
        var enviar ={
            Enviar:[]
        };
        angular.forEach(guardar,function(val,key){
            if(key == 'pantalla1'){
                angular.forEach(val,function(valPant1,key1){
                   enviar.Enviar.push({id_zpl:valPant1.id,ip_pantalla:valPant1.nombre,linea_zpl:valPant1.linea,fila_zpl:valPant1.fila,Pantalla_zpl:valPant1.PanZPL,Pantalla:valPant1.pantalla,centro:$rootScope.userData.centro})
                });
            }
             if(key == 'pantalla2'){
                angular.forEach(val,function(valPant2,key2){
                  enviar.Enviar.push({id_zpl:valPant2.id,ip_pantalla:valPant2.nombre,linea_zpl:valPant2.linea,fila_zpl:valPant2.fila,Pantalla_zpl:valPant2.PanZPL,Pantalla:valPant2.pantalla,centro:$rootScope.userData.centro})
                });
            }
        });
        $scope.jsonn = JSON.stringify(enviar);
        $http({
            method: 'POST',
            url: IPSERVER+'/JSON_ZMOV_CONSULTA_ETIQUETA.aspx?c='+$rootScope.userData.centro,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            timeout:500000
        }).success(function(data){
            console.log(data)
            $scope.lineaUsuario = ($scope.LineaUsuario - 1)*1 
            console.log($scope.lineaUsuario) 
            $scope.auxSave =  false;
            angular.forEach(data,function(val,key){
                if($scope.lineaUsuario == val.linea_zpl){$scope.auxSave = true;}
            })
            console.log($scope.auxSave);
            if(enviar.Enviar.length >0){
                if(data.length == 0 || !$scope.auxSave){ 
                   var datos = "&n="+encodeURI($scope.jsonn)+"&e=insert"+"&c="+$rootScope.userData.centrol+'&l='+$scope.lineaUsuario;
                   console.log(datos);
                   $rootScope.loading.show();
                    $http({
                        method: 'POST',
                        url: IPSERVER+"JSON_VISTA_ZPL.aspx",
                        headers : { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                        dataType: 'json',
                        timeout:500000,
                        data:datos
                    }).success(function(data){
                        console.log(data)
                        $rootScope.loading.hide();
                            $rootScope.alert.show({message:"Datos Guardados correctamente."});

                        }).error($rootScope.httpRequest.error);
                
                }else{
                    $rootScope.alert.show({message:"Ya hay un elemento guardado,¿Modificar?", type:"confirm",
                        cancelClick:function(){$rootScope.alert.display='none';},
                        acceptClick:function(){
                            //Agregar la Linea de usuario para modificar.....
                            //Agregar Linea en ZPL_Venatana
                            //Agregar IP_Impresora en ZPL_Ventana
                            var dat = "&n="+encodeURI($scope.jsonn)+"&e=modifi"+"&c="+$rootScope.userData.centro+'&l='+$scope.lineaUsuario;
                           // console.log(dat);
                           $rootScope.loading.show();
                            $http({
                                method: 'POST',
                                url: IPSERVER+"JSON_VISTA_ZPL.aspx",
                                headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                                dataType: 'json',
                                timeout:500000,
                                data: dat
                            }).success(function(data){
                                console.log(data);
                                $rootScope.loading.hide();
                                $rootScope.alert.show({message:"Datos Guardados correctamente."});
                            }).error(function(data){/*console.log(data);*/ $rootScope.httpRequest.error});
                        }
                    });
                }
            }
                else{$rootScope.alert.show({message:"No Hay datos que guardar"});}
        });
    };
    $scope.AgregarProceso = function(item){
        console.log(item)
        $scope.ItemCC = item;
        $scope.code =  item.codigo;
        //console.log($scope.Linea)
        var auxtrue = true;
        if(item.codigo === "" && item.procesos.length<3){
             $rootScope.alert.show({message:"Ingrese un Codgo de proceso"});
        }else{
            angular.forEach($scope.Linea, function(value,kyy){
                angular.forEach(value.procesos,function(val,key){
                    if(val.LOTE  == item.codigo){
                        $rootScope.alert.show({message:"Lote ya ingresado"});
                        auxtrue = false;
                        item.codigo="";
                    }
                });  
            });
            if(auxtrue){
                console.log(item)
                $rootScope.loading.show();
                $http({
                    method: 'POST',
                    url: IPSERVER+'/JSON_ZMOV_QUERY_STOCK_PROCESO.aspx?LOTEPROCESO='+angular.uppercase(item.codigo),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    timeout:500000
                }).success(function(data){
                    $rootScope.loading.hide();
                    //console.log(data)
                     $http({
                        method: 'POST',
                        url: IPSERVER+'JSON_ZMF_MOV_QUERY_LOTE.aspx?IR_CHARG='+angular.uppercase(item.codigo),
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        timeout:500000
                    }).success(function(data){
                        $scope.DatosEtiqueta =  data;
                        //console.log($scope.DatosEtiqueta)
                    });
                    if(data.STOCKPROCESO.length===0){
                        $rootScope.alert.show({message:"Lote no existente"});
                        $rootScope.alert.buttons.accept.show = "block";
                    }
                    else{
                        if(item.procesos.length<3){
                            console.log(item)
                            item.procesos.push(JSON.parse(JSON.stringify(($scope.procesoBase))));
                            $scope.procesoBase.id=Math.random();
                            angular.forEach(item.procesos,function(val,key){
                                val.on="off"; 
                            });
                            $scope.countAux = 0;
                          //  if(item.index == 1){$scope.countAux = $scope.cantFilas *2; /*console.log($scope.countAux)*/}
                          //  if(item.index == 2){$scope.countAux = $scope.cantFilas *4; /*console.log($scope.countAux)*/}
                
                            for (var i = 0; i < item.procesos.length; i++) {
                                for (var g = 0; g <item.procesos[i].filas.length; g++) {
                                    for (var r = 0; r < item.procesos[i].filas[g].Pantalla1.length; r++) {
                                        if($scope.EtiquetaAuxiliar.length>0){
                                            angular.forEach($scope.EtiquetaAuxiliar,function(val,key){
                                                 item.procesos[i].filas[g].Pantalla1[r].linea=item.index;
                                                 item.procesos[i].filas[g].Pantalla2[r].linea=item.index;
                                                if(item.index == val.linea){
                                                    if(val.pantalla == 'Pantalla1' && item.procesos[i].filas[g].Pantalla1[r].fila == val.fila && item.procesos[i].filas[g].Pantalla1[r].PanZPL == val.PanZPL){
                                                    item.procesos[i].filas[g].Pantalla1[r].nombre = val.nombre;
                                                    item.procesos[i].filas[g].Pantalla1[r].name = val.name;
                                                    item.procesos[i].filas[g].Pantalla1[r].linea = val.linea;
                                                    item.procesos[i].filas[g].Pantalla1[r].id = val.id;
                                                    item.procesos[i].filas[g].Pantalla1[r].proc = val.proc;
                                                    item.procesos[i].filas[g].Pantalla1[r].url = val.url;
                                                    item.procesos[i].filas[g].Pantalla1[r].zpl = val.zpl;
                                                }else{
                                                    if(item.index == 1){
                                                        item.procesos[i].filas[g].Pantalla1[r].nombre = $scope.PantCentro[$scope.countAux].pantalla;
                                                    };
                                                    if(item.index == 2){
                                                        item.procesos[i].filas[g].Pantalla1[r].nombre = $scope.PantCentro[$scope.countAux].pantalla;
                                                    };
                                                };
                                                if(val.pantalla == 'Pantalla2' && item.procesos[i].filas[g].Pantalla2[r].fila == val.fila && item.procesos[i].filas[g].Pantalla2[r].PanZPL == val.PanZPL){
                                                    item.procesos[i].filas[g].Pantalla2[r].name = val.name;
                                                    item.procesos[i].filas[g].Pantalla2[r].linea = val.linea;
                                                    item.procesos[i].filas[g].Pantalla2[r].id = val.id;
                                                    item.procesos[i].filas[g].Pantalla2[r].proc = val.proc;
                                                    item.procesos[i].filas[g].Pantalla2[r].url = val.url;
                                                    item.procesos[i].filas[g].Pantalla2[r].zpl = val.zpl;
                                                    item.procesos[i].filas[g].Pantalla2[r].nombre = val.nombre;
                                                }else{

                                                    if(item.index == 1){
                                                        item.procesos[i].filas[g].Pantalla2[r].nombre = $scope.PantCentro[($scope.countAux+1)].pantalla;
                                                    };
                                                    if(item.index == 2){
                                                        item.procesos[i].filas[g].Pantalla2[r].nombre = $scope.PantCentro[($scope.countAux+1)].pantalla;
                                                    };
                                                };
                                                };
                                            });
                                        }
                                        else{
                                            item.procesos[i].filas[g].Pantalla1[r].linea=item.index;
                                                item.procesos[i].filas[g].Pantalla2[r].linea=item.index;
                                            if(item.index == 1){
                                                item.procesos[i].filas[g].Pantalla1[r].nombre = $scope.PantCentro[$scope.countAux].pantalla;
                                                item.procesos[i].filas[g].Pantalla2[r].nombre = $scope.PantCentro[($scope.countAux+1)].pantalla;
                                            };
                                            if(item.index == 2){
                                                item.procesos[i].filas[g].Pantalla1[r].nombre = $scope.PantCentro[$scope.countAux].pantalla;
                                                item.procesos[i].filas[g].Pantalla2[r].nombre = $scope.PantCentro[($scope.countAux+1)].pantalla;
                                            };
                                        };
                                    }
                                    $scope.countAux = $scope.countAux +2
                                }
                            }
                            item.procesosIndex=item.procesos.length-1;
                            item.procesos[item.procesosIndex].on="on";
                            item.procesos[item.procesosIndex].LOTE =data.STOCKPROCESO[0].CHARG;
                            item.procesos[item.procesosIndex].productor=data.STOCKPROCESO[0].LIFNR;
                            item.procesos[item.procesosIndex].especie=data.STOCKPROCESO[0].ESPECIE;
                            item.procesos[item.procesosIndex].variedad=data.STOCKPROCESO[0].VARIEDAD;
                            item.procesos[item.procesosIndex].material=data.STOCKPROCESO[0].MATNR;
                            item.procesos[item.procesosIndex].kilosGranel=data.STOCKPROCESO[0].LBLAB;
                            $scope.descprd = data.STOCKPROCESO[0].NOMBRE_PRODUCTOR
                            //item.procesos[item.procesosIndex].kilosPal=data.STOCKPROCESO[0].ESPECIE;
                            
                            item.codigo="";
                            item.Eliminar="block";
                            item.FilaHide = false;
                            item.LineaHide = false;
                            item.OcultarL = "Ocultar";
                            $http({
                               method: 'POST',
                               url: IPSERVER+'JSON_ZMOV_CONSULTA_ETI.aspx?c='+$rootScope.userData.centro,
                               contentType: 'application/json; charset=utf-8',
                               dataType: 'json',
                               timeout:500000
                           })
                                   .success(function(datosET){
                               var auxT = true;
                               angular.forEach(datosET,function(val,key){
                                   if(val.proceso == angular.uppercase(item.procesos[item.procesosIndex].LOTE)){
                                       auxT = false;
                                   }
                               });
                              if(auxT){
                                   $scope.Estado = "VIGENTE";
                                  angular.forEach(item.procesos,function(val,key){
                                      if(val.ESTADO == "VIGENTE"){
                                          $scope.Estado= "PENDIENTE";
                                      }
                                  });
                                  /*Si un proceso esta Vegente Poner a Pendiente - Cuando se termine el otro proceso, Cambiar a Vigente*/
                                   $http({
                                     method: 'POST',
                                     url: IPSERVER+'/JSON_ZMOV_INS_ETI.aspx?c='+$rootScope.userData.centro+'&p='+angular.uppercase($scope.code)+'&e='+$scope.Estado+'&con=Insert',
                                     contentType: 'application/json; charset=utf-8',
                                     dataType: 'json',
                                     timeout:500000
                                 }).success(function(datoss){
                                     console.log(datoss)
                                 });
                               }else{
                                   console.log('Proceso ya guardado')
                               }
                           });
                           
                          /*  $rootScope.ConsultaK1 = $interval(function(){
                                if($location.path() === '/galeria' && item.procesos.length > 0){
                                    $http({
                                    method: 'POST',
                                    url: IPSERVER+'/JSON_ZMOV_QUERY_STOCK_PROCESO.aspx?LOTEPROCESO='+angular.uppercase(item.procesos[item.procesosIndex].LOTE),
                                    contentType: 'application/json; charset=utf-8',
                                    dataType: 'json',
                                    timeout:500000
                                    }).success(function(data){
                                        item.procesos[item.procesosIndex].kilosGranel=data.STOCKPROCESO[0].LBLAB;
                                    })
                                }else{
                                    $interval.cancel($rootScope.ConsultaK1);
                                    $rootScope.ConsultaK1 = undefined;
                               }
                            },10000);*/ 
                        } 
                        else{
                            $rootScope.alert.show({message:"Solamente 3 procesos por Linea"});
                        }
                    }
                });     
            }
        }
       
    };
    $scope.EliminarProceso = function(item, id,inx){
        var aux = item.procesos;
        for (var i = 0; i < aux.length; i++) {
            if(aux[i].id == id)
                aux.splice(i,1);
        }
        if(item.procesos.length === 0){
            item.Eliminar="none";
            item.FilaHide = true;
        }
        if ($rootScope.auxX.aux2 == 0) {$rootScope.auxX.aux1 = aux.length;}
        if($rootScope.auxX.aux1 == 0 && aux.length > 0){item.procesos[item.procesosIndex].on="on";}
        if($rootScope.auxX.aux1 === 1){ item.procesosIndex = 0;item.procesos[item.procesosIndex].on="on";}
        if($rootScope.auxX.aux1 == 2){ item.procesosIndex = 1;item.procesos[item.procesosIndex].on="on";}
    };
    $scope.selectProceso=function(item, index){
        $scope.ItemCC = item;
        $rootScope.auxX.aux2 =1;
        $rootScope.auxX.aux1 =index;
        angular.forEach(item.procesosTerminados,function(val,key){
            val.on="off";
        });
        angular.forEach(item.procesos,function(val,key){
            val.on="off";
        });
        item.procesosIndex=index;
        item.procesos[item.procesosIndex].on="on";
    };
    $scope.pantalla = function(){
        $rootScope.goToPage('/pantalla',{animation:"fadeInRight"});
    }
    $scope.consulta = function(item){
        if($location.path() === '/galeria' && item.procesos.length >0){
            $http({
                method: 'POST',
                url: IPSERVER+'JSON_ZMOV_CONSULTA_ETI.aspx?c='+$rootScope.userData.centro,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                timeout:500000
            })
            .success(function(data){
                if(item.procesos.length >0){
                    angular.forEach(data,function(val,ky){
                        if(val.proceso == item.procesos[item.procesosIndex].LOTE){
                            item.procesos[item.procesosIndex].kilosEtiqueta = val.Kilos_etiqueta;
                            item.procesos[item.procesosIndex].ESTADO = val.estado;
                        }
                    });
                }
                if(item.procesos[item.procesosIndex].LOTE == 'VIGENTE'){
                    $scope.loteProc = '';
                }
            })}else{
                $interval.cancel($rootScope.consulta);
                $rootScope.consulta = undefined;
            }
    };
    $scope.Terminado = function(item){
            if(item.procesos[item.procesosIndex].kilosEtiqueta >= item.procesos[item.procesosIndex].kilosGranel){
                   // item.procesos[item.procesosIndex].ESTADO = "TERMINADO";
                         $http({
                            method: 'POST',
                            url: IPSERVER+'/JSON_ZMOV_INS_ETI.aspx?c='+$rootScope.userData.centro+'&p='+angular.uppercase(item.procesos[item.procesosIndex].LOTE)+'&e=TERMINADO&con=Modific',
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            timeout:500000
                        }).success(function(datoss){
                           // console.log(datoss)
                            try {
                                document.getElementById("loteProc"+item.procesosIndex).style.color = 'red';
                            } catch (e) {

                            }
                            item.procesos[item.procesosIndex].ESTADO = 'TERMINADO';
                            var auxPrd = item.procesos[item.procesosIndex];
                            item.procesos.splice(item.procesosIndex,1);
                             item.procesos.push(auxPrd);
                             angular.forEach(item.procesos,function(val,key){
                                 val.on = 'off';
                             });
                             item.procesos[item.procesosIndex].on="on";
                              $http({
                                method: 'POST',
                                url: IPSERVER+'/JSON_ZMOV_INS_ETI.aspx?c='+$rootScope.userData.centro+'&p='+angular.uppercase(item.procesos[item.procesosIndex].LOTE)+'&e=VIGENTE&con=Modific',
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'json',
                                timeout:500000
                            }).success(function(datosss){});
                        });

                }
                else{
                    //item.procesos[item.procesosIndex].ESTADO = "VIGENTE";
                    $scope.loteProc = '';
                }
    };
    $rootScope.interval = $interval(function(){
        $scope.itemInterval = $scope.ItemCC;
         if( $scope.itemInterval.procesos[$scope.itemInterval.procesosIndex].ESTADO !== 'TERMINADO' || $scope.itemInterval.procesos[$scope.itemInterval.procesosIndex].ESTADO == "" ){
        $scope.Terminado($scope.itemInterval);
        $scope.consulta($scope.itemInterval);
         } 
    },5000)
});