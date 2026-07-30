let gastos =[];

let botonAgrgar = document.getElementById("agragarGasto");
let listaTodosGastos = document.getElementById("listaTodosGastos");
let gastosDeHoy = document.getElementById("gastosDeHoy");
let gastosDelMes = document.getElementById("gastosDeLMes");
let listaGastosCategoria = document.getElementById("listaGastosCategoria")


class Gasto {
    constructor (descripcion,monto,tipo,dia){
        this.descripcion = descripcion
        this.monto = monto
        this.tipo = tipo
        this.dia = dia
    }

}

function recuperargastos (){
    let gastosAnteriores = localStorage.getItem("misGastos")

    if ( gastosAnteriores != null){

    gastos = JSON.parse(gastosAnteriores);
    }

    console.log ("recuperados:" + gastosAnteriores)

}



function agragarGasto() {


    let campoDescripcion = document.getElementById("descripcionGastos");
    let campoMonto=document.getElementById("montoGast");
    let campoTipo =document.getElementById("tipoGasto");
    
    const unGasto = new Gasto (
        campoDescripcion.value, 
        campoMonto.value, 
        campoTipo.value ,
        new Date()
        
        
    );

    gastos.push(unGasto);

    console.log( gastos );
  localStorage.setItem("misGastos",JSON.stringify(gastos) )
  //console.log( localStorage.getItem("user"));

  pintarGastos();
  
}

function pintarGastos(){

  document.getElementById("listaTodosGastos").innerHTML = ""
  document.getElementById("listaGastosCategoria").innerHTML = ""

    if ( gastos == null){

    }else{

    for( let kListaGastos = 0; kListaGastos < gastos.length; kListaGastos++){

        let turnoLista = document.createElement("li");
        let descripcion =document.createElement("span");
        let monto =document.createElement("span");
        let tipo =document.createElement("span");
        let dia =document.createElement("span");

        let botonBorrar =document.createElement("span");

    botonBorrar.innerHTML = "<button class=\"boton-borrar\" data-id=\"" + kListaGastos +  "\" type=\"button\">Eliminar</button>"

        descripcion.textContent = gastos[kListaGastos].descripcion;
        monto.textContent = gastos[kListaGastos].monto;
        tipo.textContent = gastos[kListaGastos].tipo;
        

        turnoLista.appendChild( descripcion);
        turnoLista.appendChild( monto);
        turnoLista.appendChild( tipo);
        turnoLista.appendChild( botonBorrar );

        let objetoFecha = new Date(gastos[kListaGastos].dia);
        dia.textContent = objetoFecha;

        turnoLista.appendChild( dia);

       listaTodosGastos.appendChild (turnoLista);
    

    }
   
    let gastoHoy = gastos.filter(function(e){
     return esDeHoy(e)

    });
    let totalMontoHoy = 0;
    for (let ktotlMontoHoy= 0;ktotlMontoHoy < gastoHoy.length; ktotlMontoHoy ++) {
      
        totalMontoHoy =totalMontoHoy + parseInt( gastos[ktotlMontoHoy].monto)

    }

 gastosDeHoy.textContent = totalMontoHoy;

 let gastoMes = gastos.filter( function(e){
     return esDelMes(e)

    });
    let totalMontoMes = 0;
    for (let ktotlMontoMes= 0;ktotlMontoMes < gastoMes.length; ktotlMontoMes ++) {
      
        totalMontoMes =totalMontoMes + parseInt( gastos[ktotlMontoMes].monto)

    }

 gastosDelMes.textContent = totalMontoMes;
 

 

}

let categorias = ["Comida","Trasporte","Entretenimiento","Servicios","Otros"]

categorias.forEach((categoria,indece) => {


    let gastosCategoria = gastos.filter( function(e){
     return e.tipo === categoria;

    });

    let totalCategoria = gastosCategoria.reduce(function(acumulador, gasto){

        return acumulador + parseInt( gasto.monto);

    },0);

        let filaCategoria = document.createElement("li");
        let nombreCategoria =document.createElement("span");
        let totalesCategoria =document.createElement("span");

        nombreCategoria.textContent = categoria;
        totalesCategoria.textContent = totalCategoria;

        filaCategoria.appendChild(nombreCategoria);
        filaCategoria.appendChild(totalesCategoria);

    listaGastosCategoria.appendChild( filaCategoria);

});



}

botonAgrgar.addEventListener( "click", function(e){

    agragarGasto();

} );

listaTodosGastos.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('boton-borrar')) {
        const idGastoBorrar = parseInt( evento.target.dataset.id);
        
        console.log( "borrar:" + idGastoBorrar );

        gastos.splice(idGastoBorrar, 1); 
        pintarGastos();


    }
});

function esDeHoy(gastos) {
  const fechaGasto = new Date(gastos.dia);
  const hoy = new Date();
  return fechaGasto.getDate() === hoy.getDate() && 
         fechaGasto.getMonth() === hoy.getMonth() && 
         fechaGasto.getFullYear() === hoy.getFullYear();
}
function esDelMes(gastos) {
  const fechaGasto = new Date(gastos.dia);
  const hoy = new Date();
  return fechaGasto.getMonth() === hoy.getMonth() && 
         fechaGasto.getFullYear() === hoy.getFullYear();
}



recuperargastos();
pintarGastos();