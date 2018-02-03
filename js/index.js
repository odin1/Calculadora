// Objeto Calculadora
var Calculadora = {

	display: document.getElementById("display"),
	valorDisplay: "0",
	operacion: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0, 
	resultado: 0,
	auxTeclaIgual: false, // Para operaciones consecutivas

	init: (function(){
		this.agregarEventosTeclas(".tecla");
		this.agregarEventosFuncionesTeclas();
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
	},

	// Funciones de las teclas

	
	ingresarNumero: function(valor){
		if (this.valorDisplay.length < 8) {
		
			if (this.valorDisplay == "0") {
				this.valorDisplay = "";
				this.valorDisplay = this.valorDisplay + valor;
			} else {
				this.valorDisplay = this.valorDisplay + valor;
			}
		
			this.updateDisplay();
		}
	},

	updateDisplay: function(){
		this.display.innerHTML = this.valorDisplay;
	},
	
	borrarDisplay: function(){ 
	    this.valorDisplay = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.auxTeclaIgual = false;
		this.ultimoValor = 0;
		this.updateDisplay();
	},

	ingresarDecimal: function(){
		if (this.valorDisplay.indexOf(".") == -1) {
			if (this.valorDisplay == ""){
				this.valorDisplay = this.valorDisplay + "0.";
			} else {
				this.valorDisplay = this.valorDisplay + ".";
			}
			this.updateDisplay();
		}
	},

	cambiarSigno: function(){
		if (this.valorDisplay != "0") {
			var aux;

			if (this.valorDisplay.charAt(0) == "-") {
				aux = this.valorDisplay.slice(1);
			}	else {
				aux = "-" + this.valorDisplay;
			}

			this.valorDisplay = "";
			this.valorDisplay = aux;
			this.updateDisplay();
		}
	},

	realizarOperacion: function(primerValor, segundoValor, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(primerValor + segundoValor);
			break;

			case "-": 
				this.resultado = eval(primerValor - segundoValor);
			break;

			case "*": 
				this.resultado = eval(primerValor * segundoValor);
			break;

			case "/": 
				this.resultado = eval(primerValor / segundoValor);
			break;

			case "raiz":
				this.resultado = eval(Math.sqrt(primerValor));
		}
	},

	ingresarOperacion: function(operador){
		this.primerValor = parseFloat(this.valorDisplay);
		// Para que la pantalla quede vacía indicando que la calculadora está en medio de una operación
		this.valorDisplay = "";
		this.operacion = operador;
		this.auxTeclaIgual = false;
		this.updateDisplay();
	},

	
	verResultado: function(){ 
		if(!this.auxTeclaIgual){ 
			//Primera vez que presiono igual
			this.segundoValor = parseFloat(this.valorDisplay);
			this.ultimoValor = this.segundoValor;
		
			//Calcula el resultado
			this.realizarOperacion(this.primerValor, this.segundoValor, this.operacion);
		
		} else { 
			//Siguientes veces que presiono igual
			
			//Calcula el resultado
			this.realizarOperacion(this.primerValor, this.ultimoValor, this.operacion);
		}
	
		//Almacena el resultado como primer valor para poder seguir operando
		this.primerValor = this.resultado;
	
		//Borra el display y reemplaza por el resultado
		this.valorDisplay = "";
	
		//Verifica el largo del resultado para recortarlo si hace falta
		if (this.resultado.toString().length < 9){
			this.valorDisplay = this.resultado.toString();
		} else {
			this.valorDisplay = this.resultado.toString().slice(0,8);
		}
	
		//Auxiliar para indicar si ya se presionó la tecla igual, para calcular sobre el último valor
		this.auxTeclaIgual = true;		
		this.updateDisplay();
	
	},

	agregarEventosFuncionesTeclas: function(){
		document.getElementById("0").addEventListener("click", function() {Calculadora.ingresarNumero("0");});
		document.getElementById("1").addEventListener("click", function() {Calculadora.ingresarNumero("1");});
		document.getElementById("2").addEventListener("click", function() {Calculadora.ingresarNumero("2");});
		document.getElementById("3").addEventListener("click", function() {Calculadora.ingresarNumero("3");});
		document.getElementById("4").addEventListener("click", function() {Calculadora.ingresarNumero("4");});
		document.getElementById("5").addEventListener("click", function() {Calculadora.ingresarNumero("5");});
		document.getElementById("6").addEventListener("click", function() {Calculadora.ingresarNumero("6");});
		document.getElementById("7").addEventListener("click", function() {Calculadora.ingresarNumero("7");});
		document.getElementById("8").addEventListener("click", function() {Calculadora.ingresarNumero("8");});
		document.getElementById("9").addEventListener("click", function() {Calculadora.ingresarNumero("9");});
		document.getElementById("on").addEventListener("click", function() {Calculadora.borrarDisplay();});
		document.getElementById("punto").addEventListener("click", function() {Calculadora.ingresarDecimal();});
		document.getElementById("sign").addEventListener("click", function() {Calculadora.cambiarSigno();});
		document.getElementById("raiz").addEventListener("click", function() {Calculadora.ingresarOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {Calculadora.ingresarOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {Calculadora.ingresarOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {Calculadora.ingresarOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {Calculadora.ingresarOperacion("+");});
		document.getElementById("igual").addEventListener("click", function() {Calculadora.verResultado();});
	}
};

Calculadora.init();