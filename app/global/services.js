
appExpled.factory('dataFactory', ['$http', function ($http) {

    var dataFactory = {};

    dataFactory.getServiceData = function (accesoUsuario, accesoPassword) {
        return $http({
            method: 'POST',
            url: 'http://' + IPSERVER + '/'+RUTASERVER+'/JSON_DB_LOGIN.aspx?User=' + accesoUsuario + '&Pass=' + accesoPassword + '',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success:success
        });
    };

    dataFactory.setXML = function (cadenaXML) {
        return $http({
            method: 'POST',
            url: 'http://' + IPSERVER + '/' + RUTASERVER + '/rfcNET.asmx',
            data:cadenaXML,
            headers: { 'Content-Type': 'text/xml', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST', 'Access-Control-Allow-Headers': 'Content-Type' }
        });
    };




    return dataFactory;
}])


.factory('localidadFactory', function () {

    var regiones = [
            {
                region: "ARICA Y PARINACOTA",
                numero: "15",
                idx: 1
            },
            {
                region: "TARAPACÁ",
                numero: "01",
                idx: 2
            },
            {
                region: "ANTOFAGASTA",
                numero: "02",
                idx: 3
            },
            {
                region: "ATACAMA",
                numero: "03",
                idx: 4
            },
            {
                region: "COQUIMBO",
                numero: "04",
                idx: 5
            },
            {
                region: "VALPARAÍSO",
                numero: "05",
                idx: 6
            },
            {
                region: "DEL LIBERTADOR GRAL. BERNARDO O'HIGGINS",
                numero: "06",
                idx: 7
            },
            {
                region: "DEL MAULE",
                numero: "07",
                idx: 8
            },
            {
                region: "DEL BIOBÍO",
                numero: "08",
                idx: 9
            },
            {
                region: "DE LA ARAUCANÍA",
                numero: "09",
                idx: 10
            },
            {
                region: "DE LOS RÍOS",
                numero: "14",
                idx: 11
            },
            {
                region: "DE LOS LAGOS",
                numero: "10",
                idx: 12
            },
            {
                region: "AISÉN DEL GRAL. CARLOS IBAÑEZ DEL CAMPO",
                numero: "11",
                idx: 13
            },
            {
                region: "MAGALLANES Y DE LA ANTÁRTICA CHILENA",
                numero: "12",
                idx: 14
            },
            {
                region: "REGIÓN METROPOLITANA DE SANTIAGO",
                numero: "13",
                idx: 15
            }
    ]


    var provincias = [
    {
        idProvincia: "1",
        idRegion: "1",
        nombre: "Arica"
    },
    {
        idProvincia: "2",
        idRegion: "1",
        nombre: "Parinacota"
    },
    {
        idProvincia: "3",
        idRegion: "2",
        nombre: "Iquique"
    },
    {
        idProvincia: "4",
        idRegion: "2",
        nombre: "Tamarugal"
    },
    {
        idProvincia: "5",
        idRegion: "3",
        nombre: "Antofagasta"
    },
    {
        idProvincia: "6",
        idRegion: "3",
        nombre: "El Loa"
    },
    {
        idProvincia: "7",
        idRegion: "3",
        nombre: "Tocopilla"
    },
    {
        idProvincia: "8",
        idRegion: "4",
        nombre: "Copiapó"
    },
    {
        idProvincia: "9",
        idRegion: "4",
        nombre: "Chañaral"
    },
    {
        idProvincia: "10",
        idRegion: "4",
        nombre: "Huasco"
    },
    {
        idProvincia: "11",
        idRegion: "5",
        nombre: "Elqui"
    },
    {
        idProvincia: "12",
        idRegion: "5",
        nombre: "Choapa"
    },
    {
        idProvincia: "13",
        idRegion: "5",
        nombre: "Limarí"
    },
    {
        idProvincia: "14",
        idRegion: "6",
        nombre: "Valparaíso"
    },
    {
        idProvincia: "15",
        idRegion: "6",
        nombre: "Isla de Pascua"
    },
    {
        idProvincia: "16",
        idRegion: "6",
        nombre: "Los Andes"
    },
    {
        idProvincia: "17",
        idRegion: "6",
        nombre: "Petorca"
    },
    {
        idProvincia: "18",
        idRegion: "6",
        nombre: "Quillota"
    },
    {
        idProvincia: "19",
        idRegion: "6",
        nombre: "San Antonio"
    },
    {
        idProvincia: "20",
        idRegion: "6",
        nombre: "San Felipe de Aconcagua"
    },
    {
        idProvincia: "21",
        idRegion: "6",
        nombre: "Marga Marga"
    },
    {
        idProvincia: "22",
        idRegion: "7",
        nombre: "Cachapoal"
    },
    {
        idProvincia: "23",
        idRegion: "7",
        nombre: "Cardenal Caro"
    },
    {
        idProvincia: "24",
        idRegion: "7",
        nombre: "Colchagua"
    },
    {
        idProvincia: "25",
        idRegion: "8",
        nombre: "Talca"
    },
    {
        idProvincia: "26",
        idRegion: "8",
        nombre: "Cauquenes"
    },
    {
        idProvincia: "27",
        idRegion: "8",
        nombre: "Curicó"
    },
    {
        idProvincia: "28",
        idRegion: "8",
        nombre: "Linares"
    },
    {
        idProvincia: "29",
        idRegion: "9",
        nombre: "Concepción"
    },
    {
        idProvincia: "30",
        idRegion: "9",
        nombre: "Arauco"
    },
    {
        idProvincia: "31",
        idRegion: "9",
        nombre: "Biobío"
    },
    {
        idProvincia: "32",
        idRegion: "9",
        nombre: "Ñuble"
    },
    {
        idProvincia: "33",
        idRegion: "10",
        nombre: "Cautín"
    },
    {
        idProvincia: "34",
        idRegion: "10",
        nombre: "Malleco"
    },
    {
        idProvincia: "35",
        idRegion: "11",
        nombre: "Valdivia"
    },
    {
        idProvincia: "36",
        idRegion: "11",
        nombre: "Del Ranco"
    },
    {
        idProvincia: "37",
        idRegion: "12",
        nombre: "Llanquihue"
    },
    {
        idProvincia: "38",
        idRegion: "12",
        nombre: "Chiloé"
    },
    {
        idProvincia: "39",
        idRegion: "12",
        nombre: "Osorno"
    },
    {
        idProvincia: "40",
        idRegion: "12",
        nombre: "Palena"
    },
    {
        idProvincia: "41",
        idRegion: "13",
        nombre: "Coihaique"
    },
    {
        idProvincia: "42",
        idRegion: "13",
        nombre: "Aisén"
    },
    {
        idProvincia: "43",
        idRegion: "13",
        nombre: "Capitán Prat"
    },
    {
        idProvincia: "44",
        idRegion: "13",
        nombre: "General Carrera"
    },
    {
        idProvincia: "45",
        idRegion: "14",
        nombre: "Magallanes"
    },
    {
        idProvincia: "46",
        idRegion: "14",
        nombre: "Antártica Chilena"
    },
    {
        idProvincia: "47",
        idRegion: "14",
        nombre: "Tierra del Fuego"
    },
    {
        idProvincia: "48",
        idRegion: "14",
        nombre: "Ultima Esperanza"
    },
    {
        idProvincia: "49",
        idRegion: "15",
        nombre: "Santiago"
    },
    {
        idProvincia: "50",
        idRegion: "15",
        nombre: "Cordillera"
    },
    {
        idProvincia: "51",
        idRegion: "15",
        nombre: "Chacabuco"
    },
    {
        idProvincia: "52",
        idRegion: "15",
        nombre: "Maipo"
    },
    {
        idProvincia: "53",
        idRegion: "15",
        nombre: "Melipilla"
    },
    {
        idProvincia: "54",
        idRegion: "15",
        nombre: "Talagante"
    }
    ]

    var comuna = [
    {
    idComuna:"1",
    idProvincia: "1",
    nombre:"Arica"
    },
    {
    idComuna:"2",
    idProvincia: "1",
    nombre:"Camarones"
    },
    {
    idComuna:"3",
    idProvincia: "2",
    nombre:"Putre"
    },
    {
    idComuna:"4",
    idProvincia: "2",
    nombre:"General Lagos"
    },
    {		
    idComuna:"5",
    idProvincia: "3",
    nombre:"Iquique"
    },
    {
    idComuna:"6",
    idProvincia: "3",
    nombre:"Alto Hospicio"
    },
    {
    idComuna:"7",
    idProvincia: "4",
    nombre:"Pozo Almonte"
    },
    {
    idComuna:"8",
    idProvincia: "4",
    nombre:"Camiña"
    },
    {
    idComuna:"9",
    idProvincia: "4",
    nombre:"Colchane"
    },
    {
    idComuna:"10",
    idProvincia: "4",
    nombre:"Huara"
    },
    {
    idComuna:"11",
    idProvincia: "4",
    nombre:"Pica"
    },
    {
    idComuna:"12",
    idProvincia: "5",
    nombre:"Antofagasta"
    },
    {
    idComuna:"13",
    idProvincia: "5",
    nombre:"Mejillones"
    },
    {
    idComuna:"14",
    idProvincia: "5",
    nombre:"Sierra Gorda"
    },
    {
    idComuna:"15",
    idProvincia: "5",
    nombre:"Taltal"
    },
    {
    idComuna:"16",
    idProvincia: "6",
    nombre:"Calama"
    },
    {
    idComuna:"17",
    idProvincia: "6",
    nombre:"Ollagüe"
    },
    {
    idComuna:"18",
    idProvincia: "6",
    nombre:"San Pedro de Atacama"
    },
    {
    idComuna:"19",
    idProvincia: "7",
    nombre:"Tocopilla"
    },
    {
    idComuna:"20",
    idProvincia: "7",
    nombre:"María Elena"
    },
    {
    idComuna:"21",
    idProvincia: "8",
    nombre:"Copiapó"
    },
    {
    idComuna:"22",
    idProvincia: "8",
    nombre:"Caldera"
    },
    {
    idComuna:"23",
    idProvincia: "8",
    nombre:"Tierra Amarilla"
    },
    {
    idComuna:"24",
    idProvincia: "9",
    nombre:"Chañaral"
    },
    {
    idComuna:"25",
    idProvincia: "9",
    nombre:"Diego de Almagro"
    },
    {
    idComuna:"26",
    idProvincia: "10",
    nombre:"Vallenar"
    },
    {
    idComuna:"27",
    idProvincia: "10",
    nombre:"Alto del Carmen"
    },
    {
    idComuna:"28",
    idProvincia: "10",
    nombre:"Freirina"
    },
    {
    idComuna:"29",
    idProvincia: "10",
    nombre:"Huasco"
    },
    {
    idComuna:"30",
    idProvincia: "11",
    nombre:"La Serena"
    },
    {
    idComuna:"31",
    idProvincia: "11",
    nombre:"Coquimbo"
    },
    {
    idComuna:"32",
    idProvincia: "11",
    nombre:"Andacollo"
    },
    {
    idComuna:"33",
    idProvincia: "11",
    nombre:"La Higuera"
    },
    {
    idComuna:"34",
    idProvincia: "11",
    nombre:"Paiguano"
    },
    {
    idComuna:"35",
    idProvincia: "11",
    nombre:"Vicuña"
    },
    {
    idComuna:"36",
    idProvincia: "12",
    nombre:"Illapel"
    },
    {
    idComuna:"37",
    idProvincia: "12",
    nombre:"Canela"
    },
    {
    idComuna:"38",
    idProvincia: "12",
    nombre:"Los Vilos"
    },
    {
    idComuna:"39",
    idProvincia: "12",
    nombre:"Salamanca"
    },
    {
    idComuna:"40",
    idProvincia: "13",
    nombre:"Ovalle"
    },
    {
    idComuna:"41",
    idProvincia: "13",
    nombre:"Combarbalá"
    },
    {
    idComuna:"42",
    idProvincia: "13",
    nombre:"Monte Patria"
    },
    {
    idComuna:"43",
    idProvincia: "13",
    nombre:"Punitaqui"
    },
    {
    idComuna:"44",
    idProvincia: "13",
    nombre:"Río Hurtado"
    },
    {
    idComuna:"45",
    idProvincia: "14",
    nombre:"Valparaíso"
    },
    {
    idComuna:"46",
    idProvincia: "14",
    nombre:"Casablanca"
    },
    {
    idComuna:"47",
    idProvincia: "14",
    nombre:"Concón"
    },
    {
    idComuna:"48",
    idProvincia: "14",
    nombre:"Juan Fernández"
    },
    {
    idComuna:"49",
    idProvincia: "14",
    nombre:"Puchuncaví"
    },
    {
    idComuna:"50",
    idProvincia: "14",
    nombre:"Quintero"
    },
    {
    idComuna:"51",
    idProvincia: "14",
    nombre:"Viña del Mar"
    },
    {
    idComuna:"52",
    idProvincia: "15",
    nombre:"Isla de Pascua"
    },
    {
    idComuna:"53",
    idProvincia: "16",
    nombre:"Los Andes"
    },
    {
    idComuna:"54",
    idProvincia: "16",
    nombre:"Calle Larga"
    },
    {
    idComuna:"55",
    idProvincia: "16",
    nombre:"Rinconada"
    },
    {
    idComuna:"56",
    idProvincia: "16",
    nombre:"San Esteban"
    },
    {
    idComuna:"57",
    idProvincia: "17",
    nombre:"La Ligua"
    },
    {
    idComuna:"58",
    idProvincia: "17",
    nombre:"Cabildo"
    },
    {
    idComuna:"59",
    idProvincia: "17",
    nombre:"Papudo"
    },
    {
    idComuna:"60",
    idProvincia: "17",
    nombre:"Petorca"
    },
    {
    idComuna:"61",
    idProvincia: "17",
    nombre:"Zapallar"
    },
    {
    idComuna:"62",
    idProvincia: "18",
    nombre:"Quillota"
    },
    {
    idComuna:"63",
    idProvincia: "18",
    nombre:"La Calera"
    },
    {
    idComuna:"64",
    idProvincia: "18",
    nombre:"Hijuelas"
    },
    {
    idComuna:"65",
    idProvincia: "18",
    nombre:"La Cruz"
    },
    {
    idComuna:"66",
    idProvincia: "18",
    nombre:"Nogales"
    },
    {
    idComuna:"67",
    idProvincia: "19",
    nombre:"San Antonio"
    },
    {
    idComuna:"68",
    idProvincia: "19",
    nombre:"Algarrobo"
    },
    {
    idComuna:"69",
    idProvincia: "19",
    nombre:"Cartagena"
    },
    {
    idComuna:"70",
    idProvincia: "19",
    nombre:"El Quisco"
    },
    {
    idComuna:"71",
    idProvincia: "19",
    nombre:"El Tabo"
    },
    {
    idComuna:"72",
    idProvincia: "19",
    nombre:"Santo Domingo"
    },
    {
    idComuna:"73",
    idProvincia: "20",
    nombre:"San Felipe"
    },
    {
    idComuna:"74",
    idProvincia: "20",
    nombre:"Catemu"
    },
    {
    idComuna:"75",
    idProvincia: "20",
    nombre:"Llaillay"
    },
    {
    idComuna:"76",
    idProvincia: "20",
    nombre:"Panquehue"
    },
    {
    idComuna:"77",
    idProvincia: "20",
    nombre:"Putaendo"
    },
    {
    idComuna:"78",
    idProvincia: "20",
    nombre:"Santa María"
    },
    {
    idComuna:"79",
    idProvincia: "21",
    nombre:"Limache"
    },
    {
    idComuna:"80",
    idProvincia: "21",
    nombre:"Quilpué"
    },
    {
    idComuna:"81",
    idProvincia: "21",
    nombre:"Villa Alemana"
    },
    {
    idComuna:"82",
    idProvincia: "21",
    nombre:"Olmué"
    },
    {
    idComuna:"83",
    idProvincia: "22",
    nombre:"Rancagua"
    },
    {
    idComuna:"84",
    idProvincia: "22",
    nombre:"Codegua"
    },
    {
    idComuna:"85",
    idProvincia: "22",
    nombre:"Coinco"
    },
    {
    idComuna:"86",
    idProvincia: "22",
    nombre:"Coltauco"
    },
    {
    idComuna:"87",
    idProvincia: "22",
    nombre:"Doñihue"
    },
    {
    idComuna:"88",
    idProvincia: "22",
    nombre:"Graneros"
    },
    {
    idComuna:"89",
    idProvincia: "22",
    nombre:"Las Cabras"
    },
    {
    idComuna:"90",
    idProvincia: "22",
    nombre:"Machalí"
    },
    {
    idComuna:"91",
    idProvincia: "22",
    nombre:"Malloa"
    },
    {
    idComuna:"92",
    idProvincia: "22",
    nombre:"Mostazal"
    },
    {
    idComuna:"93",
    idProvincia: "22",
    nombre:"Olivar"
    },
    {
    idComuna:"94",
    idProvincia: "22",
    nombre:"Peumo"
    },
    {
    idComuna:"95",
    idProvincia: "22",
    nombre:"Pichidegua"
    },
    {
    idComuna:"96",
    idProvincia: "22",
    nombre:"Quinta Tilcoco"
    },
    {
    idComuna:"97",
    idProvincia: "22",
    nombre:"Rengo"
    },
    {
    idComuna:"98",
    idProvincia: "22",
    nombre:"Requínoa"
    },
    {
    idComuna:"99",
    idProvincia: "22",
    nombre:"San Vicente Tagua Tagua"
    },
    {
    idComuna:"100",
    idProvincia: "23",
    nombre:"Pichilemu"
    },
    {
    idComuna:"101",
    idProvincia: "23",
    nombre:"La Estrella"
    },
    {
    idComuna:"102",
    idProvincia: "23",
    nombre:"Litueche"
    },
    {
    idComuna:"103",
    idProvincia: "23",
    nombre:"Marchihue"
    },
    {
    idComuna:"104",
    idProvincia: "23",
    nombre:"Navidad"
    },
    {
    idComuna:"105",
    idProvincia: "23",
    nombre:"Paredones"
    },
    {
    idComuna:"106",
    idProvincia: "24",
    nombre:"San Fernando"
    },
    {
    idComuna:"107",
    idProvincia: "24",
    nombre:"Chépica"
    },
    {
    idComuna:"108",
    idProvincia: "24",
    nombre:"Chimbarongo"
    },
    {
    idComuna:"109",
    idProvincia: "24",
    nombre:"Lolol"
    },
    {
    idComuna:"110",
    idProvincia: "24",
    nombre:"Nancagua"
    },
    {
    idComuna:"111",
    idProvincia: "24",
    nombre:"Palmilla"
    },
    {
    idComuna:"112",
    idProvincia: "24",
    nombre:"Peralillo"
    },
    {
    idComuna:"113",
    idProvincia: "24",
    nombre:"Placilla"
    },
    {
    idComuna:"114",
    idProvincia: "24",
    nombre:"Pumanque"
    },
    {
    idComuna:"115",
    idProvincia: "24",
    nombre:"Santa Cruz"
    },
    {
    idComuna:"116",
    idProvincia: "25",
    nombre:"Talca"
    },
    {
    idComuna:"117",
    idProvincia: "25",
    nombre:"Constitución"
    },
    {
    idComuna:"118",
    idProvincia: "25",
    nombre:"Curepto"
    },
    {
    idComuna:"119",
    idProvincia: "25",
    nombre:"Empedrado"
    },
    {
    idComuna:"120",
    idProvincia: "25",
    nombre:"Maule"
    },
    {
    idComuna:"121",
    idProvincia: "25",
    nombre:"Pelarco"
    },
    {
    idComuna:"122",
    idProvincia: "25",
    nombre:"Pencahue"
    },
    {
    idComuna:"123",
    idProvincia: "25",
    nombre:"Río Claro"
    },
    {
    idComuna:"124",
    idProvincia: "25",
    nombre:"San Clemente"
    },
    {
    idComuna:"125",
    idProvincia: "25",
    nombre:"San Rafael"
    },
    {
    idComuna:"126",
    idProvincia: "26",
    nombre:"Cauquenes"
    },
    {
    idComuna:"127",
    idProvincia: "26",
    nombre:"Chanco"
    },
    {
    idComuna:"128",
    idProvincia: "26",
    nombre:"Pelluhue"
    },
    {
    idComuna:"129",
    idProvincia: "27",
    nombre:"Curicó"
    },
    {
    idComuna:"130",
    idProvincia: "27",
    nombre:"Hualañé"
    },
    {
    idComuna:"131",
    idProvincia: "27",
    nombre:"Licantén"
    },
    {
    idComuna:"132",
    idProvincia: "27",
    nombre:"Molina"
    },
    {
    idComuna:"133",
    idProvincia: "27",
    nombre:"Rauco"
    },
    {
    idComuna:"134",
    idProvincia: "27",
    nombre:"Romeral"
    },
    {
    idComuna:"135",
    idProvincia: "27",
    nombre:"Sagrada Familia"
    },
    {
    idComuna:"136",
    idProvincia: "27",
    nombre:"Teno"
    },
    {
    idComuna:"137",
    idProvincia: "27",
    nombre:"Vichuquén"
    },
    {
    idComuna:"138",
    idProvincia: "28",
    nombre:"Linares"
    },
    {
    idComuna:"139",
    idProvincia: "28",
    nombre:"Colbún"
    },
    {
    idComuna:"140",
    idProvincia: "28",
    nombre:"Longaví"
    },
    {
    idComuna:"141",
    idProvincia: "28",
    nombre:"Parral"
    },
    {
    idComuna:"142",
    idProvincia: "28",
    nombre:"Retiro"
    },
    {
    idComuna:"143",
    idProvincia: "28",
    nombre:"San Javier"
    },
    {
    idComuna:"144",
    idProvincia: "28",
    nombre:"Villa Alegre"
    },
    {
    idComuna:"145",
    idProvincia: "28",
    nombre:"Yerbas Buenas"
    },
    {
    idComuna:"146",
    idProvincia: "29",
    nombre:"Concepción"
    },
    {
    idComuna:"147",
    idProvincia: "29",
    nombre:"Coronel"
    },
    {
    idComuna:"148",
    idProvincia: "29",
    nombre:"Chiguayante"
    },
    {
    idComuna:"149",
    idProvincia: "29",
    nombre:"Florida"
    },
    {
    idComuna:"150",
    idProvincia: "29",
    nombre:"Hualqui"
    },
    {
    idComuna:"151",
    idProvincia: "29",
    nombre:"Lota"
    },
    {
    idComuna:"152",
    idProvincia: "29",
    nombre:"Penco"
    },
    {
    idComuna:"153",
    idProvincia: "29",
    nombre:"San Pedro de la Paz"
    },
    {
    idComuna:"154",
    idProvincia: "29",
    nombre:"Santa Juana"
    },
    {
    idComuna:"155",
    idProvincia: "29",
    nombre:"Talcahuano"
    },
    {
    idComuna:"156",
    idProvincia: "29",
    nombre:"Tomé"
    },
    {
    idComuna:"157",
    idProvincia: "29",
    nombre:"Hualpén"
    },
    {
    idComuna:"158",
    idProvincia: "30",
    nombre:"Lebu"
    },
    {
    idComuna:"159",
    idProvincia: "30",
    nombre:"Arauco"
    },
    {
    idComuna:"160",
    idProvincia: "30",
    nombre:"Cañete"
    },
    {
    idComuna:"161",
    idProvincia: "30",
    nombre:"Contulmo"
    },
    {
    idComuna:"162",
    idProvincia: "30",
    nombre:"Curanilahue"
    },
    {
    idComuna:"163",
    idProvincia: "30",
    nombre:"Los Alamos"
    },
    {
    idComuna:"164",
    idProvincia: "30",
    nombre:"Tirúa"
    },
    {
    idComuna:"165",
    idProvincia: "31",
    nombre:"Los Angeles"
    },
    {
    idComuna:"166",
    idProvincia: "31",
    nombre:"Antuco"
    },
    {
    idComuna:"167",
    idProvincia: "31",
    nombre:"Cabrero"
    },
    {
    idComuna:"168",
    idProvincia: "31",
    nombre:"Laja"
    },
    {
    idComuna:"169",
    idProvincia: "31",
    nombre:"Mulchén"
    },
    {
    idComuna:"170",
    idProvincia: "31",
    nombre:"Nacimiento"
    },
    {
    idComuna:"171",
    idProvincia: "31",
    nombre:"Negrete"
    },
    {
    idComuna:"172",
    idProvincia: "31",
    nombre:"Quilaco"
    },
    {
    idComuna:"173",
    idProvincia: "31",
    nombre:"Quilleco"
    },
    {
    idComuna:"174",
    idProvincia: "31",
    nombre:"San Rosendo"
    },
    {
    idComuna:"175",
    idProvincia: "31",
    nombre:"Santa Bárbara"
    },
    {
    idComuna:"176",
    idProvincia: "31",
    nombre:"Tucapel"
    },
    {
    idComuna:"177",
    idProvincia: "31",
    nombre:"Yumbel"
    },
    {
    idComuna:"178",
    idProvincia: "31",
    nombre:"Alto Biobío"
    },
    {
    idComuna:"179",
    idProvincia: "32",
    nombre:"Chillán"
    },
    {
    idComuna:"180",
    idProvincia: "32",
    nombre:"Bulnes"
    },
    {
    idComuna:"181",
    idProvincia: "32",
    nombre:"Cobquecura"
    },
    {
    idComuna:"182",
    idProvincia: "32",
    nombre:"Coelemu"
    },
    {
    idComuna:"183",
    idProvincia: "32",
    nombre:"Coihueco"
    },
    {
    idComuna:"184",
    idProvincia: "32",
    nombre:"Chillán Viejo"
    },
    {
    idComuna:"185",
    idProvincia: "32",
    nombre:"El Carmen"
    },
    {
    idComuna:"186",
    idProvincia: "32",
    nombre:"Ninhue"
    },
    {
    idComuna:"187",
    idProvincia: "32",
    nombre:"Ñiquén"
    },
    {
    idComuna:"188",
    idProvincia: "32",
    nombre:"Pemuco"
    },
    {
    idComuna:"189",
    idProvincia: "32",
    nombre:"Pinto"
    },
    {
    idComuna:"190",
    idProvincia: "32",
    nombre:"Portezuelo"
    },
    {
    idComuna:"191",
    idProvincia: "32",
    nombre:"Quillón"
    },
    {
    idComuna:"192",
    idProvincia: "32",
    nombre:"Quirihue"
    },
    {
    idComuna:"193",
    idProvincia: "32",
    nombre:"Ránquil"
    },
    {
    idComuna:"194",
    idProvincia: "32",
    nombre:"San Carlos"
    },
    {
    idComuna:"195",
    idProvincia: "32",
    nombre:"San Fabián"
    },
    {
    idComuna:"196",
    idProvincia: "32",
    nombre:"San Ignacio"
    },
    {
    idComuna:"197",
    idProvincia: "32",
    nombre:"San Nicolás"
    },
    {
    idComuna:"198",
    idProvincia: "32",
    nombre:"Treguaco"
    },
    {
    idComuna:"199",
    idProvincia: "32",
    nombre:"Yungay"
    },
    {
    idComuna:"200",
    idProvincia: "33",
    nombre:"Temuco"
    },
    {
    idComuna:"201",
    idProvincia: "33",
    nombre:"Carahue"
    },
    {
    idComuna:"202",
    idProvincia: "33",
    nombre:"Cunco"
    },
    {
    idComuna:"203",
    idProvincia: "33",
    nombre:"Curarrehue"
    },
    {
    idComuna:"204",
    idProvincia: "33",
    nombre:"Freire"
    },
    {
    idComuna:"205",
    idProvincia: "33",
    nombre:"Galvarino"
    },
    {
    idComuna:"206",
    idProvincia: "33",
    nombre:"Gorbea"
    },
    {
    idComuna:"207",
    idProvincia: "33",
    nombre:"Lautaro"
    },
    {
    idComuna:"208",
    idProvincia: "33",
    nombre:"Loncoche"
    },
    {
    idComuna:"209",
    idProvincia: "33",
    nombre:"Melipeuco"
    },
    {
    idComuna:"210",
    idProvincia: "33",
    nombre:"Nueva Imperial"
    },
    {
    idComuna:"211",
    idProvincia: "33",
    nombre:"Padre Las Casas"
    },
    {
    idComuna:"212",
    idProvincia: "33",
    nombre:"Perquenco"
    },
    {
    idComuna:"213",
    idProvincia: "33",
    nombre:"Pitrufquén"
    },
    {
    idComuna:"214",
    idProvincia: "33",
    nombre:"Pucón"
    },
    {
    idComuna:"215",
    idProvincia: "33",
    nombre:"Saavedra"
    },
    {
    idComuna:"216",
    idProvincia: "33",
    nombre:"Teodoro Schmidt"
    },
    {
    idComuna:"217",
    idProvincia: "33",
    nombre:"Toltén"
    },
    {
    idComuna:"218",
    idProvincia: "33",
    nombre:"Vilcún"
    },
    {
    idComuna:"219",
    idProvincia: "33",
    nombre:"Villarrica"
    },
    {
    idComuna:"220",
    idProvincia: "33",
    nombre:"Cholchol"
    },
    {
    idComuna:"221",
    idProvincia: "34",
    nombre:"Angol"
    },
    {
    idComuna:"222",
    idProvincia: "34",
    nombre:"Collipulli"
    },
    {
    idComuna:"223",
    idProvincia: "34",
    nombre:"Curacautín"
    },
    {
    idComuna:"224",
    idProvincia: "34",
    nombre:"Ercilla"
    },
    {
    idComuna:"225",
    idProvincia: "34",
    nombre:"Lonquimay"
    },
    {
    idComuna:"226",
    idProvincia: "34",
    nombre:"Los Sauces"
    },
    {
    idComuna:"227",
    idProvincia: "34",
    nombre:"Lumaco"
    },
    {
    idComuna:"228",
    idProvincia: "34",
    nombre:"Purén"
    },
    {
    idComuna:"229",
    idProvincia: "34",
    nombre:"Renaico"
    },
    {
    idComuna:"230",
    idProvincia: "34",
    nombre:"Traiguén"
    },
    {
    idComuna:"231",
    idProvincia: "34",
    nombre:"Victoria"
    },
    {
    idComuna:"232",
    idProvincia: "35",
    nombre:"Valdivia"
    },
    {
    idComuna:"233",
    idProvincia: "35",
    nombre:"Corral"
    },
    {
    idComuna:"234",
    idProvincia: "35",
    nombre:"Lanco"
    },
    {
    idComuna:"235",
    idProvincia: "35",
    nombre:"Los Lagos"
    },
    {
    idComuna:"236",
    idProvincia: "35",
    nombre:"Máfil"
    },
    {
    idComuna:"237",
    idProvincia: "35",
    nombre:"Mariquina"
    },
    {
    idComuna:"238",
    idProvincia: "35",
    nombre:"Paillaco"
    },
    {
    idComuna:"239",
    idProvincia: "35",
    nombre:"Panguipulli"
    },
    {
    idComuna:"240",
    idProvincia: "36",
    nombre:"La Unión"
    },
    {
    idComuna:"241",
    idProvincia: "36",
    nombre:"Futrono"
    },
    {
    idComuna:"242",
    idProvincia: "36",
    nombre:"Lago Ranco"
    },
    {
    idComuna:"243",
    idProvincia: "36",
    nombre:"Río Bueno"
    },
    {
    idComuna:"244",
    idProvincia: "37",
    nombre:"Puerto Montt"
    },
    {
    idComuna:"245",
    idProvincia: "37",
    nombre:"Calbuco"
    },
    {
    idComuna:"246",
    idProvincia: "37",
    nombre:"Cochamó"
    },
    {
    idComuna:"247",
    idProvincia: "37",
    nombre:"Fresia"
    },
    {
    idComuna:"248",
    idProvincia: "37",
    nombre:"Frutillar"
    },
    {
    idComuna:"249",
    idProvincia: "37",
    nombre:"Los Muermos"
    },
    {
    idComuna:"250",
    idProvincia: "37",
    nombre:"Llanquihue"
    },
    {
    idComuna:"251",
    idProvincia: "37",
    nombre:"Maullín"
    },
    {
    idComuna:"252",
    idProvincia: "37",
    nombre:"Puerto Varas"
    },
    {
    idComuna:"253",
    idProvincia: "38",
    nombre:"Castro"
    },
    {
    idComuna:"254",
    idProvincia: "38",
    nombre:"Ancud"
    },
    {
    idComuna:"255",
    idProvincia: "38",
    nombre:"Chonchi"
    },
    {
    idComuna:"256",
    idProvincia: "38",
    nombre:"Curaco de Vélez"
    },
    {
    idComuna:"257",
    idProvincia: "38",
    nombre:"Dalcahue"
    },
    {
    idComuna:"258",
    idProvincia: "38",
    nombre:"Puqueldón"
    },
    {
    idComuna:"259",
    idProvincia: "38",
    nombre:"Queilén"
    },
    {
    idComuna:"260",
    idProvincia: "38",
    nombre:"Quellón"
    },
    {
    idComuna:"261",
    idProvincia: "38",
    nombre:"Quemchi"
    },
    {
    idComuna:"262",
    idProvincia: "38",
    nombre:"Quinchao"
    },
    {
    idComuna:"263",
    idProvincia: "39",
    nombre:"Osorno"
    },
    {
    idComuna:"264",
    idProvincia: "39",
    nombre:"Puerto Octay"
    },
    {
    idComuna:"265",
    idProvincia: "39",
    nombre:"Purranque"
    },
    {
    idComuna:"266",
    idProvincia: "39",
    nombre:"Puyehue"
    },
    {
    idComuna:"267",
    idProvincia: "39",
    nombre:"Río Negro"
    },
    {
    idComuna:"268",
    idProvincia: "39",
    nombre:"San Juan de la Costa"
    },
    {
    idComuna:"269",
    idProvincia: "39",
    nombre:"San Pablo"
    },
    {
    idComuna:"270",
    idProvincia: "40",
    nombre:"Chaitén"
    },
    {
    idComuna:"271",
    idProvincia: "40",
    nombre:"Futaleufú"
    },
    {
    idComuna:"272",
    idProvincia: "40",
    nombre:"Hualaihué"
    },
    {
    idComuna:"273",
    idProvincia: "40",
    nombre:"Palena"
    },
    {
    idComuna:"274",
    idProvincia: "41",
    nombre:"Coihaique"
    },
    {
    idComuna:"275",
    idProvincia: "41",
    nombre:"Lago Verde"
    },
    {
    idComuna:"276",
    idProvincia: "42",
    nombre:"Aisén"
    },
    {
    idComuna:"277",
    idProvincia: "42",
    nombre:"Cisnes"
    },
    {
    idComuna:"278",
    idProvincia: "42",
    nombre:"Guaitecas"
    },
    {
    idComuna:"279",
    idProvincia: "43",
    nombre:"Cochrane"
    },
    {
    idComuna:"280",
    idProvincia: "43",
    nombre:"O Higgins"
    },
    {
    idComuna:"281",
    idProvincia: "43",
    nombre:"Tortel"
    },
    {
    idComuna:"282",
    idProvincia: "44",
    nombre:"Chile Chico"
    },
    {
    idComuna:"283",
    idProvincia: "44",
    nombre:"Río Ibáñez"
    },
    {
    idComuna:"284",
    idProvincia: "45",
    nombre:"Punta Arenas"
    },
    {
    idComuna:"285",
    idProvincia: "45",
    nombre:"Laguna Blanca"
    },
    {
    idComuna:"286",
    idProvincia: "45",
    nombre:"Río Verde"
    },
    {
    idComuna:"287",
    idProvincia: "45",
    nombre:"San Gregorio"
    },
    {
    idComuna:"288",
    idProvincia: "46",
    nombre:"Cabo de Hornos (Ex-Navarino)"
    },
    {
    idComuna:"289",
    idProvincia: "46",
    nombre:"Antártica"
    },
    {
    idComuna:"290",
    idProvincia: "47",
    nombre:"Porvenir"
    },
    {
    idComuna:"291",
    idProvincia: "47",
    nombre:"Primavera"
    },
    {
    idComuna:"292",
    idProvincia: "47",
    nombre:"Timaukel"
    },
    {
    idComuna:"293",
    idProvincia: "48",
    nombre:"Natales"
    },
    {
    idComuna:"294",
    idProvincia: "48",
    nombre:"Torres del Paine"
    },
    {
    idComuna:"295",
    idProvincia: "49",
    nombre:"Santiago"
    },
    {
    idComuna:"296",
    idProvincia: "49",
    nombre:"Cerrillos"
    },
    {
    idComuna:"297",
    idProvincia: "49",
    nombre:"Cerro Navia"
    },
    {
    idComuna:"298",
    idProvincia: "49",
    nombre:"Conchalí"
    },
    {
    idComuna:"299",
    idProvincia: "49",
    nombre:"El Bosque"
    },
    {
    idComuna:"300",
    idProvincia: "49",
    nombre:"Estación Central"
    },
    {
    idComuna:"301",
    idProvincia: "49",
    nombre:"Huechuraba"
    },
    {
    idComuna:"302",
    idProvincia: "49",
    nombre:"Independencia"
    },
    {
    idComuna:"303",
    idProvincia: "49",
    nombre:"La Cisterna"
    },
    {
    idComuna:"304",
    idProvincia: "49",
    nombre:"La Florida"
    },
    {
    idComuna:"305",
    idProvincia: "49",
    nombre:"La Granja"
    },
    {
    idComuna:"306",
    idProvincia: "49",
    nombre:"La Pintana"
    },
    {
    idComuna:"307",
    idProvincia: "49",
    nombre:"La Reina"
    },
    {
    idComuna:"308",
    idProvincia: "49",
    nombre:"Las Condes"
    },
    {
    idComuna:"309",
    idProvincia: "Lo Barnechea49",
    nombre:""
    },
    {
    idComuna:"310",
    idProvincia: "49",
    nombre:"Lo Espejo"
    },
    {
    idComuna:"311",
    idProvincia: "49",
    nombre:"Lo Prado"
    },
    {
    idComuna:"312",
    idProvincia: "49",
    nombre:"Macul"
    },
    {
    idComuna:"313",
    idProvincia: "49",
    nombre:"Maipú"
    },
    {
    idComuna:"314",
    idProvincia: "49",
    nombre:"Ñuñoa"
    },
    {
    idComuna:"315",
    idProvincia: "49",
    nombre:"Pedro Aguirre Cerda"
    },
    {
    idComuna:"316",
    idProvincia: "49",
    nombre:"Peñalolén"
    },
    {
    idComuna:"317",
    idProvincia: "49",
    nombre:"Providencia"
    },
    {
    idComuna:"318",
    idProvincia: "49",
    nombre:"Pudahuel"
    },
    {
    idComuna:"319",
    idProvincia: "49",
    nombre:"Quilicura"
    },
    {
    idComuna:"320",
    idProvincia: "49",
    nombre:"Quinta Normal"
    },
    {
    idComuna:"321",
    idProvincia: "49",
    nombre:"Recoleta"
    },
    {
    idComuna:"322",
    idProvincia: "49",
    nombre:"Renca"
    },
    {
    idComuna:"323",
    idProvincia: "49",
    nombre:"San Joaquín"
    },
    {
    idComuna:"324",
    idProvincia: "49",
    nombre:"San Miguel"
    },
    {
    idComuna:"325",
    idProvincia: "49",
    nombre:"San Ramón"
    },
    {
    idComuna:"326",
    idProvincia: "49",
    nombre:"Vitacura"
    },
    {
    idComuna:"327",
    idProvincia: "50",
    nombre:"Puente Alto"
    },
    {
    idComuna:"328",
    idProvincia: "50",
    nombre:"Pirque"
    },
    {
    idComuna:"329",
    idProvincia: "50",
    nombre:"San José de Maipo"
    },
    {
    idComuna:"330",
    idProvincia: "51",
    nombre:"Colina"
    },
    {
    idComuna:"331",
    idProvincia: "51",
    nombre:"Lampa"
    },
    {
    idComuna:"332",
    idProvincia: "51",
    nombre:"Tiltil"
    },
    {
    idComuna:"333",
    idProvincia: "52",
    nombre:"San Bernardo"
    },
    {
    idComuna:"334",
    idProvincia: "52",
    nombre:"Buin"
    },
    {
    idComuna:"335",
    idProvincia: "52",
    nombre:"Calera de Tango"
    },
    {
    idComuna:"336",
    idProvincia: "52",
    nombre:"Paine"
    },
    {
    idComuna:"337",
    idProvincia: "53",
    nombre:"Melipilla"
    },
    {
    idComuna:"338",
    idProvincia: "53",
    nombre:"Alhué"
    },
    {
    idComuna:"339",
    idProvincia: "53",
    nombre:"Curacaví"
    },
    {
    idComuna:"340",
    idProvincia: "53",
    nombre:"María Pinto"
    },
    {
    idComuna:"341",
    idProvincia: "53",
    nombre:"San Pedro"
    },
    {
    idComuna:"342",
    idProvincia: "54",
    nombre:"Talagante"
    },
    {
    idComuna:"343",
    idProvincia: "54",
    nombre:"El Monte"
    },
    {
    idComuna:"344",
    idProvincia: "54",
    nombre:"Isla de Maipo"
    },
    {
    idComuna:"345",
    idProvincia: "54",
    nombre:"Padre Hurtado"
    },
    {
    idComuna:"346",
    idProvincia: "54",
    nombre:"Peñaflor"
    }
    ]


    var registro = {
        getRegion: function () {
            return regiones;
        },
        getProvincia: function () {
            return provincias;
        }
        ,
        getComuna: function () {
            return comuna;
        },
        filRegion: function (id) {
            var codigo;
            $.each(regiones, function (key, value) {
                //console.log("factory");
                //console.log(id+"="+value.idx);
                if (id == value.idx) {
                  //  console.log(value.numero)
                    codigo = value.numero;
                }
            });
            return codigo;
        },
        filProvincia: function (id) {
            var filtroProvincias = [];
            $.each(provincias, function (key, value) {
                //console.log(value.nombre);
                if (id == value.idRegion) {
                    filtroProvincias.push({ nombre: value.nombre, idProvincia: value.idProvincia });
                }
            });
            return filtroProvincias;
        }
        ,
        filComuna: function (id) {
            var filtroComuna = [];
            $.each(comuna, function (key, value) {
                //console.log(value.nombre);
                if (id == value.idProvincia) {
                    filtroComuna.push({ nombre: value.nombre, idComuna: value.idComuna });
                }
            });
            return filtroComuna;
        }
    }
    




    return registro;
})

/*	This work is licensed under Creative Commons GNU LGPL License.

	License: http://creativecommons.org/licenses/LGPL/2.1/
   Version: 0.9
	Author:  Stefan Goessner/2006
	Web:     http://goessner.net/ 
*/
function xml2json(xml, tab) {
   var X = {
      toObj: function(xml) {
         var o = {};
         if (xml.nodeType==1) {   // element node ..
            if (xml.attributes.length)   // element with attributes  ..
               for (var i=0; i<xml.attributes.length; i++)
                  o["@"+xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
            if (xml.firstChild) { // element has child nodes ..
               var textChild=0, cdataChild=0, hasElementChild=false;
               for (var n=xml.firstChild; n; n=n.nextSibling) {
                  if (n.nodeType==1) hasElementChild = true;
                  else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                  else if (n.nodeType==4) cdataChild++; // cdata section node
               }
               if (hasElementChild) {
                  if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                     X.removeWhite(xml);
                     for (var n=xml.firstChild; n; n=n.nextSibling) {
                        if (n.nodeType == 3)  // text node
                           o["#text"] = X.escape(n.nodeValue);
                        else if (n.nodeType == 4)  // cdata node
                           o["#cdata"] = X.escape(n.nodeValue);
                        else if (o[n.nodeName]) {  // multiple occurence of element ..
                           if (o[n.nodeName] instanceof Array)
                              o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                           else
                              o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                        }
                        else  // first occurence of element..
                           o[n.nodeName] = X.toObj(n);
                     }
                  }
                  else { // mixed content
                     if (!xml.attributes.length)
                        o = X.escape(X.innerXml(xml));
                     else
                        o["#text"] = X.escape(X.innerXml(xml));
                  }
               }
               else if (textChild) { // pure text
                  if (!xml.attributes.length)
                     o = X.escape(X.innerXml(xml));
                  else
                     o["#text"] = X.escape(X.innerXml(xml));
               }
               else if (cdataChild) { // cdata
                  if (cdataChild > 1)
                     o = X.escape(X.innerXml(xml));
                  else
                     for (var n=xml.firstChild; n; n=n.nextSibling)
                        o["#cdata"] = X.escape(n.nodeValue);
               }
            }
            if (!xml.attributes.length && !xml.firstChild) o = null;
         }
         else if (xml.nodeType==9) { // document.node
            o = X.toObj(xml.documentElement);
         }
         else
            alert("unhandled node type: " + xml.nodeType);
         return o;
      },
      toJson: function(o, name, ind) {
         var json = name ? ("\""+name+"\"") : "";
         if (o instanceof Array) {
            for (var i=0,n=o.length; i<n; i++)
               o[i] = X.toJson(o[i], "", ind+"\t");
            json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
         }
         else if (o == null)
            json += (name&&":") + "null";
         else if (typeof(o) == "object") {
            var arr = [];
            for (var m in o)
               arr[arr.length] = X.toJson(o[m], m, ind+"\t");
            json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
         }
         else if (typeof(o) == "string")
            json += (name&&":") + "\"" + o.toString() + "\"";
         else
            json += (name&&":") + o.toString();
         return json;
      },
      innerXml: function(node) {
         var s = ""
         if ("innerHTML" in node)
            s = node.innerHTML;
         else {
            var asXml = function(n) {
               var s = "";
               if (n.nodeType == 1) {
                  s += "<" + n.nodeName;
                  for (var i=0; i<n.attributes.length;i++)
                     s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                  if (n.firstChild) {
                     s += ">";
                     for (var c=n.firstChild; c; c=c.nextSibling)
                        s += asXml(c);
                     s += "</"+n.nodeName+">";
                  }
                  else
                     s += "/>";
               }
               else if (n.nodeType == 3)
                  s += n.nodeValue;
               else if (n.nodeType == 4)
                  s += "<![CDATA[" + n.nodeValue + "]]>";
               return s;
            };
            for (var c=node.firstChild; c; c=c.nextSibling)
               s += asXml(c);
         }
         return s;
      },
      escape: function(txt) {
         return txt.replace(/[\\]/g, "\\\\")
                   .replace(/[\"]/g, '\\"')
                   .replace(/[\n]/g, '\\n')
                   .replace(/[\r]/g, '\\r');
      },
      removeWhite: function(e) {
         e.normalize();
         for (var n = e.firstChild; n; ) {
            if (n.nodeType == 3) {  // text node
               if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                  var nxt = n.nextSibling;
                  e.removeChild(n);
                  n = nxt;
               }
               else
                  n = n.nextSibling;
            }
            else if (n.nodeType == 1) {  // element node
               X.removeWhite(n);
               n = n.nextSibling;
            }
            else                      // any other node
               n = n.nextSibling;
         }
         return e;
      }
   };
   if (xml.nodeType == 9) // document node
      xml = xml.documentElement;
   var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
   return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
}
