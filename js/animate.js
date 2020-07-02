// JavaScript Document

/*
ANIMACIONES INPUT
*/
	
	// MENU PRINCIPAL
	function menuPrincipal(){
		$('#nav-recepcion').addClass('animated fadeInRightBig');
		$('#nav-despacho').addClass('animated fadeInLeftBig');
	}
	
	
	// DIA
	$('#dia').focus(function(){
		$('#dia').addClass('animated pulse');
	})					
	$('#dia').focusout(function(){
		$('#dia').removeClass('animated pulse');
	})
	
	// CANTIDAD
	$('#cantidad').focus(function(){
		$('#cantidad').addClass('animated pulse');
	})					
	$('#cantidad').focusout(function(){
		$('#cantidad').removeClass('animated pulse');
	})
	
	// CUARTEL
	$('#cuartel').focus(function(){
		$('#cuartel').addClass('animated pulse');
	})					
	$('#cuartel').focusout(function(){
		$('#cuartel').removeClass('animated pulse');
		/*$('#btn-continuar').addClass('animated bounce');*/
	})
	
	
	// SAFETY EXITO
	function exito(){
		$('#img-exito').addClass('animated slideInDown');
	}					
	
	// SAFETY ERROR
	function error(){
		$('#img-error').addClass('animated slideInDown');
	}
	
	// CLIENTE
	function formApp(){
		$('.box-inp-slect, .box-inp-slect02').addClass('animated fadeInUpBig');
	}
	
	
	
	
	
	
