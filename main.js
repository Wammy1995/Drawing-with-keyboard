console.log(teclas);

var cuadrito =document.getElementById("garabato");
var papel = cuadrito.getContext("2d");
document.addEventListener("keydown",dibujarTeclado);
// document.addEventListener("click",tecladito);
var teclas =
{
   UP:38,
   DOWN:40,
   LEFT:65,
   RIGHT:68
};

var color = "red"
var y=150
var x= 150
var movimiento = 10
// function tecladito(evento)
// {
//    if (evento.click==true){
//       dibujarLinea("color",x,y,x+10,y+10,papel);
//       x=x+10;
//       y=y+10;
//    }
// }
function dibujarTeclado(evento)
{
   switch(evento.keyCode)
   {
      case teclas.UP:
         dibujarLinea("color",x,y,x,y-movimiento,papel);
         y=y-movimiento;
      break
      case teclas.DOWN:
         dibujarLinea("color",x,y,x,y+movimiento,papel);
         y=y+movimiento;
      break
      case teclas.LEFT:
         dibujarLinea("color",x,y,x-movimiento,y,papel);
         x=x-movimiento;
      break
      case teclas.RIGHT:
         dibujarLinea("color",x,y,x+movimiento,y,papel);
         x=x+movimiento;
      break
   }
   
}

dibujarLinea(color,149,149,151,151,papel)

function dibujarLinea(color,x_inicial,y_inicial,x_final,y_final,lienzo)
    {
        lienzo.beginPath();
        lienzo.strokeStyle = color;
        lienzo.moveTo(x_inicial,y_inicial);
        lienzo.lineTo(x_final,y_final);
        lienzo.stroke();
        lienzo.closePath();
    }


