function parte(){

//document.getElementById('login').style.display='none';

//document.getElementById('MenuPrincipal').style.display='none';
//
//document.getElementById('TipoRecepcion').style.display='none';
// CAJA EMBALADA PRODUCTOR
//document.getElementById('PROD_FiltroProductor').style.display='none';
//document.getElementById('PROD_SelectProductor').style.display='none';
//document.getElementById('PROD_Embalajes').style.display='none';
//document.getElementById('PROD_SelectMercado').style.display='none';
//document.getElementById('PROD_Trazabilidad').style.display='none';
//document.getElementById('PROD_Resumen').style.display='none';
//document.getElementById('PROD_Contabilizar').style.display='none';
// CAJA EMBALADA PACK
//document.getElementById('PACK_FiltroProductor').style.display='none';
//document.getElementById('PACK_AsignarLotes').style.display='none';
//document.getElementById('PACK_Embalajes').style.display='none';
//document.getElementById('PACK_Trazabilidad').style.display='none';
//document.getElementById('PACK_Resumen').style.display='none';
//document.getElementById('PACK_Contabilizar').style.display='none';
//
//document.getElementById('ProductorGranel').style.display='none';
//document.getElementById('EmbalajesGranel').style.display='none';
//document.getElementById('RecepcionGranel').style.display='none';
//document.getElementById('ResumenGranel').style.display='none';
//document.getElementById('Historial').style.display='none';
//document.getElementById('ContraparteSag').style.display='none';
//document.getElementById('RecepcionesSag').style.display='none';
//document.getElementById('DetallerPallet').style.display='none';
//document.getElementById('ResumenSag').style.display='none';
//document.getElementById('Objetados').style.display='none';
//document.getElementById('RazonObjetados').style.display='none';

document.getElementById('login').style.display='block';
$('#login').addClass('animated fadeInDown');
}

function avanzar(destino, previo, animacion){
	
	document.getElementById(previo).style.display="none";
	document.getElementById(destino).style.display="block";
	$('#'+destino).addClass('animated '+animacion);
}
	
function volver(previo, actual, animacion, animacionAnterior){
	
	document.getElementById(actual).style.display="none";
	document.getElementById(previo).style.display="block";
	$('#'+previo).removeClass('animated '+animacionAnterior);
	$('#'+previo).addClass('animated '+animacion);	
}



// POP UP
function verPopup(destino, interior){
	$('#'+destino).show("fade");
	$('#'+interior).removeClass("animated fadeOutUp");
	$('#'+interior).removeClass("animated fadeInDownBig");
	$('#'+interior).addClass("animated fadeInDownBig");
}
function cerrarPopup(ocultar, interior){	
	$('#'+interior).removeClass("animated fadeInDownBig");
	$('#'+interior).removeClass("animated fadeOutUp");
	$('#'+interior).addClass("animated fadeOutUp");
	$('#'+ocultar).hide("fade");
		//function cerrarP(){
		//	$('#'+ocultar).hide("fade");
		//}
	//setInterval(cerrarP, 500);
}





