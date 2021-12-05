console.log(teclas);

var cuadrito =document.getElementById("garabato");
var papel = cuadrito.getContext("2d");
document.addEventListener("keydown",dibujarTeclado);
document.addEventListener("keyup",songshou);
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
var m_left = false;   
var m_right = false;
var m_down = false;
var m_up = false;
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
         m_up = true;
      break
      case teclas.DOWN:
         m_down = true;
      break
      case teclas.LEFT:
         m_left = true;
      break
      case teclas.RIGHT:
         m_right = true;
      break
   }
   
}

function shousong(evento)
{
   switch(evento.keyCode)
   {
      case teclas.UP:
         m_up = false;
      break
      case teclas.DOWN:
         m_down = false;
      break
      case teclas.LEFT:
         m_left = false;
      break
      case teclas.RIGHT:
         m_right = false;
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

setInterval(function(){   
    if(a_left){
      dibujarLinea("color",x,y,x,y-5,papel);
      y=y-5;
    }
    if(a_right){
      dibujarLinea("color",x,y,x,y+5,papel);
      y=y+5;
    }
    if(b_left){
      dibujarLinea("color",x,y,x-5,y,papel);
      x=x-5;
    }
    if(b_right){
      dibujarLinea("color",x,y,x+5,y,papel);
      x=x+5;
    }
},5)

