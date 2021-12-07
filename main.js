// var canvas = document.getElementById("test1");   
//     var cxt = canvas.getContext("2d");   
//     cxt.beginPath();   
//     //设置是个顶点的坐标，根据顶点制定路径   
//     for (var i = 0; i < 5; i++) {   
//         cxt.lineTo(Math.cos((18+i*72)/180*Math.PI)*200+200,   
//                         -Math.sin((18+i*72)/180*Math.PI)*200+200);   
//         cxt.lineTo(Math.cos((54+i*72)/180*Math.PI)*80+200,   
//                         -Math.sin((54+i*72)/180*Math.PI)*80+200);   
//     }   
//     cxt.closePath();   
//     //设置边框样式以及填充颜色   
//     cxt.lineWidth="3";
//     cxt.fillStyle = "#F6F152";
//     cxt.strokeStyle = "#F5270B"; 
//     cxt.fill();
//     cxt.stroke();
// 以上是五角星

var canvas = document.getElementById("test2");   
    var cxt = canvas.getContext("2d");   
    cxt.beginPath();   
    //设置是个顶点的坐标，根据顶点制定路径   
    cxt.lineTo(30,30);
    cxt.lineTo(130,30);
    cxt.lineTo(160,70);
    cxt.lineTo(60,70);
    cxt.closePath();   
    //设置边框样式以及填充颜色   
    cxt.lineWidth="3";
    cxt.fillStyle = "#F6F152";
    cxt.strokeStyle = "#F5270B"; 
    cxt.fill();
    cxt.stroke();
// 以上是五角星


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

var color = "black"
var y = 30
var x = 32
var xspeed = 1
var yspeed = 1
var newy = y
var newx = x
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

function songshou(evento)
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


dibujarLinea('blue',30,30,32,30,papel)

function dibujarLinea(color,x_inicial,y_inicial,x_final,y_final,lienzo)
    {
        lienzo.beginPath();
        lienzo.strokeStyle = color;
        lienzo.lineWidth="3";
        lienzo.moveTo(x_inicial,y_inicial);
        lienzo.lineTo(x_final,y_final);
        lienzo.stroke();
        lienzo.closePath();
    }

setInterval(function(){
    if(m_down){
      newy+=yspeed;
    }
    if(m_up){
      newy-=yspeed;
    }
    if(m_left){
      newx-=xspeed;
    }
    if(m_right){
      newx+=xspeed;
    }
    dibujarLinea("color",x,y,newx,newy,papel);
    x=newx;
    y=newy;
},50)

// papel.fill() 最后闭合图形
// papel.getImageData(0,0,400,400).data 获取数据点信息 4x-1
