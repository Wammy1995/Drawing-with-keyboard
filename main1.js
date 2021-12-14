var cas2 = document.getElementById("test2");   
var cxt2 = cas2.getContext("2d");   
cxt2.beginPath();   
cxt2.lineTo(30,30);
cxt2.lineTo(330,30);
cxt2.lineTo(430,230);
cxt2.lineTo(130,230);
cxt2.closePath();   
cxt2.lineWidth="4";
cxt2.fillStyle = "aliceblue";
cxt2.strokeStyle = "#F5270B"; 
cxt2.fill();
cxt2.stroke();
// 只是工具画板

var cas1 = document.getElementById("test1");   
var cxt1 = cas1.getContext("2d"); 
cxt1.beginPath();   
//设置是个顶点的坐标，根据顶点制定路径   
cxt1.lineTo(30,30);
cxt1.lineTo(330,30);
cxt1.lineTo(430,230);
cxt1.lineTo(130,230);
cxt1.closePath();   
//设置边框样式以及填充颜色   
cxt1.lineWidth="4";
cxt1.fillStyle = "aliceblue";
cxt1.strokeStyle = "#F5270B"; 
cxt1.fill();
cxt1.stroke();
// // 以上是平行四边形  

// var cas2 = document.getElementById("test2");   
// var cxt2 = cas2.getContext("2d");
// cxt2.fillStyle = "aliceblue";
// cxt2.strokeStyle = "#F5270B"; 
// cxt2.lineWidth="4";
// cxt2.translate(250,250);
// cxt2.fillRect(-170,-170,340,340);
// cxt2.strokeRect(-170,-170,340,340);
// cxt2.save();
// cxt2.rotate(45*Math.PI/180);
// cxt2.fillRect(-170,-170,340,340);
// cxt2.strokeRect(-170,-170,340,340);
// cxt2.translate(-250,-250);
// cxt2.restore();
// // 只是工具画板

var cas1 = document.getElementById("test1");   
var cxt1 = cas1.getContext("2d"); 
cxt1.beginPath();   
//设置是个顶点的坐标，根据顶点制定路径   
cxt1.lineTo(30,30);
cxt1.lineTo(330,30);
cxt1.lineTo(430,230);
cxt1.lineTo(130,230);
cxt1.closePath();   
//设置边框样式以及填充颜色   
cxt1.lineWidth="4";
cxt1.fillStyle = "aliceblue";
cxt1.strokeStyle = "#F5270B"; 
cxt1.fill();
cxt1.stroke();
// // 以上是平行四边形  

var cuadrito =document.getElementById("garabato");
var papel = cuadrito.getContext("2d");
document.addEventListener("keydown",dibujarTeclado);
document.addEventListener("keyup",songshou);
papel.beginPath();
var zhenzhen =document.getElementById("zhen").getContext("2d");
zhenzhen.beginPath();
zhenzhen.lineTo(30,30)
// document.addEventListener("click",tecladito);
var teclas =
{
   UP:38,
   DOWN:40,
   LEFT:65,
   RIGHT:68
};
var jishi = 0
var color = "black"
var y = 28
var x = 30
var x_in = x
var y_in = y
var xspeed = 5
var yspeed = 5
var newy = y
var newx = x
var m_left = false;   
var m_right = false;
var m_down = false;
var m_up = false;
var tac = false;
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
   };
   tac = true;
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


dibujarLinea('blue',30,30,x_in,y_in,papel)
xujia(x_in,y_in,zhenzhen)
function xujia(x,y,lienzo)
    {
      lienzo.strokeStyle = "blue";
      lienzo.lineWidth="4";
      lienzo.lineTo(x,y);
    }

function dibujarLinea(color,x_inicial,y_inicial,x_final,y_final,lienzo)
    {
        lienzo.strokeStyle = color;
        lienzo.lineWidth="4";
        lienzo.moveTo(x_inicial,y_inicial);
        lienzo.lineTo(x_final,y_final);
        lienzo.stroke();
    }

function done(){
   papel.strokeStyle = 'blue';
   papel.lineWidth="4";
   papel.moveTo(x,y);
   papel.lineTo(x_in,y_in);
   papel.stroke();
   zhenzhen.fillStyle='black';
   zhenzhen.stroke();
   zhenzhen.fill();
   papel.closePath();
   zhenzhen.globalCompositeOperation="source-out";
   cxt2.globalCompositeOperation='source-out';
   clearInterval(ick)
   cxt2.drawImage(document.getElementById("zhen"),0,0)
   zhenzhen.drawImage(cas1,0,0)
   console.log('差异面积为'+jisuan())
   console.log('用时'+jishi+'ms')
}

function jisuan() {
   var shuzhi = 0;
   var todo1 = zhenzhen.getImageData(0,0,500,500).data;
   var todo2 = cxt2.getImageData(0,0,500,500).data;
   for (var i = 1; i < 250001; i++) {
         if(todo1[4*i-1]>0.7){
            shuzhi += 1
         }
   }
   for (var j = 1; j < 250001; j++) {
         if(todo2[4*j-1]>0.7){
            shuzhi += 1
         }
   }
      return shuzhi
   }

var ick = setInterval(function(){
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
    var ds = Math.sqrt(Math.pow((newx-x_in),2)+Math.pow((newy-y_in),2))
    if (tac && ds>4) {
      jishi += 50
    }
    dibujarLinea(color,x,y,newx,newy,papel);
    xujia(newx,newy,zhenzhen)
    x=newx;
    y=newy;
},50)

// papel.fill() 最后闭合图形
// papel.getImageData(0,0,400,400).data 获取数据点信息 4x-1 lighter重合部分颜色相加
