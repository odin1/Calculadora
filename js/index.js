// Objeto Calculadora
var Calculadora = {

	init: (function(){
		this.agregarEventosTeclas(".tecla");
	}),

	// Formato de teclas

	reducirTecla(elemento){
		var x = elemento.id;

		if ( x == "0" ||  x == "punto" ||  x == "igual" || x == "1" || x == "2" || x == "3") {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
			elemento.style.width = "21%";
			elemento.style.height = "62px";
		}
	},

	aumentarTecla(elemento){
		var x = elemento.id;

		if ( x == "0" ||  x == "punto" ||  x == "igual" || x == "1" || x == "2" || x == "3") {
			elemento.style.width = "29%";
			elemento.style.height = "63px";
		} else if (x == "mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
			elemento.style.width = "22%";
			elemento.style.height = "63px";
		}
	},

	// Eventos a formato de teclas

	eventoReducirTecla: function(event){
		Calculadora.reducirTecla(event.target);
	},

	eventoAumentarTecla: function(event){
		Calculadora.aumentarTecla(event.target);
	},

	agregarEventosTeclas: function(selector){
		var teclas = document.querySelectorAll(selector);

		for ( var i = 0; i < teclas.length; i++) {
			teclas[i].onclick = this.eventoReducirTecla;
			teclas[i].onmouseleave = this.eventoAumentarTecla;
		};
	}


};

Calculadora.init();