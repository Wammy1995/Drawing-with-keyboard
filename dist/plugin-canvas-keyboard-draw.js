var jsPsychCanvasKeyboardDraw = (function (jspsych) {
  'use strict';

  const info = {
      name: "canvas-keyboard-draw",
      parameters: {
          /** The drawing function to apply to the canvas. Should take the canvas object as argument. */
          stimulus: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Stimulus",
              default: undefined,
          },          /** Any content here will be displayed below the stimulus. */
          prompt: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Prompt",
              default: null,
          },
          /** How long to show the stimulus. */
          stimulus_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Stimulus duration",
              default: null,
          },
          /** How long to show trial before it ends. */
          trial_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Trial duration",
              default: 10000,
          },
          /** If true, trial will end when subject makes a response. */
          response_ends_trial: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Response ends trial",
              default: false,
          },
          /** Array containing the height (first value) and width (second value) of the canvas element. */
          canvas_size: {
              type: jspsych.ParameterType.INT,
              array: true,
              pretty_name: "Canvas size",
              default: [500, 500],
          },
          x_speed: {
              type: jspsych.ParameterType.INT,
              array: true,
              pretty_name: "x speed",
              default: 5,
          },
          y_speed: {
              type: jspsych.ParameterType.INT,
              array: true,
              pretty_name: "y speed",
              default: 5,
          },


      },
  };
  /**
   * **canvas-keyboard-response**
   *
   * jsPsych plugin for displaying a canvas stimulus and getting a keyboard response
   *
   * @author Chris Jungerius (modified from Josh de Leeuw)
   * @see {@link https://www.jspsych.org/plugins/jspsych-canvas-keyboard-response/ canvas-keyboard-response plugin documentation on jspsych.org}
   */
  class CanvasKeyboardDrawPlugin {
      constructor(jsPsych) {
          this.jsPsych = jsPsych;
      }
      trial(display_element, trial) {
          var new_html = '<div id="jspsych-canvas-stimulus" style="position: fixed;">' +
              '<canvas id="tuli" height="' +
              trial.canvas_size[0] +
              '" width="' +
              trial.canvas_size[1] +
              '"></canvas>' +
              "</div>";
          new_html +=  '<div style="position: fixed;">' +
              '<canvas style="visibility: hidden;" id="zhen" height="' +
              trial.canvas_size[0] +
              '" width="' +
              trial.canvas_size[1] +
              '"></canvas>' +
              "</div>";
          new_html +=  '<div style="position: fixed;">' +
              '<canvas id="lujing" height="' +
              trial.canvas_size[0] +
              '" width="' +
              trial.canvas_size[1] +
              '"></canvas>' +
              "</div>";
          new_html +=  '<div>' +
              '<canvas style="visibility: hidden;" id="gongju" height="' +
              trial.canvas_size[0] +
              '" width="' +
              trial.canvas_size[1] +
              '"></canvas>' +
              "</div>";


          new_html+='<button id="jspsych-html-button-response-button">完成点这里</button>'
          if (trial.prompt !== null) {
              new_html += trial.prompt;
          }
          // draw
          display_element.innerHTML = new_html;
          display_element.querySelector("#jspsych-html-button-response-button")
                  .addEventListener("click", function () {
                  done();
              })

          var cas2 = document.getElementById("gongju");   
          var cxt2 = cas2.getContext("2d");   
          var cas1 = document.getElementById("tuli");   
          var cxt1 = cas1.getContext("2d"); 
          cxt2.beginPath();
          cxt2.beginPath();
          for (var m = 0; m<trial.stimulus.length; m+=2) {
            cxt2.lineTo(trial.stimulus[m],trial.stimulus[m+1]);
            cxt1.lineTo(trial.stimulus[m],trial.stimulus[m+1]);
          }
          cxt2.closePath();   
          cxt2.lineWidth="4";
          cxt2.fillStyle = "aliceblue";
          cxt2.strokeStyle = "#F5270B"; 
          cxt2.fill();
          cxt2.stroke();
          cxt1.closePath();   
          cxt1.lineWidth="4";
          cxt1.fillStyle = "aliceblue";
          cxt1.strokeStyle = "#F5270B"; 
          cxt1.fill();
          cxt1.stroke();
          var cuadrito =document.getElementById("lujing");
          var papel = cuadrito.getContext("2d");
          document.addEventListener("keydown",dibujarTeclado);
          document.addEventListener("keyup",songshou);
          papel.beginPath();
          var zhenzhen =document.getElementById("zhen").getContext("2d");
          zhenzhen.beginPath();
          zhenzhen.lineTo(trial.stimulus[0],trial.stimulus[1])
          var teclas = {UP:38,DOWN:40,LEFT:65,RIGHT:68};
          var jishi = 0
          var chayi = 0
          var color = "black"
          var x = trial.stimulus[0]
          var y = trial.stimulus[1]
          var x_in = x
          var y_in = y
          var xspeed = trial.x_speed //横向移动速度
          var yspeed = trial.y_speed //纵向移动速度
          var pse = 6  //回到起点允许的误差值
          var newy = y
          var newx = x
          var m_left = false;   
          var m_right = false;
          var m_down = false;
          var m_up = false;
          var tac = false;
          var tts = true;
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
          dibujarLinea('blue',x,y,x_in,y_in,papel)
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

          function jisuan()
          {
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
          function done()
          {
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
             chayi = jisuan()
            response.value = chayi;
            response.rt = jishi;
            console.log(chayi);
            jsPsych.pluginAPI.setTimeout(function () {
                  end_trial();
              }, trial.trial_duration);
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
              if (ds<pse){
                tts = false; 
              }else{
                tts = true;
              }
              if (tac && tts) {
                jishi += 50
              }
              dibujarLinea(color,x,y,newx,newy,papel);
              xujia(newx,newy,zhenzhen)
              x=newx;
              y=newy;
            },50)
          // store response
          var response = {
              rt: null,
              value: null,
          };
          // function to end trial when it is time
          const end_trial = () => {
              // kill any remaining setTimeout handlers
              this.jsPsych.pluginAPI.clearAllTimeouts();
              // kill keyboard listeners
              if (typeof keyboardListener !== "undefined") {
                  this.jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
              }
              // gather the data to store for the trial
              var trial_data = {
                  rt: response.rt,
                  value: response.value,
              };
              // clear the display
              display_element.innerHTML = "";
              // move on to the next trial
              this.jsPsych.finishTrial(trial_data);
          };
          // function to handle responses by the subject
                
           // start the response listener
          // hide stimulus if stimulus_duration is set
          if (trial.stimulus_duration !== null) {
              this.jsPsych.pluginAPI.setTimeout(function () {
                  display_element.querySelector("#jspsych-canvas-keyboard-draw-stimulus").style.visibility = "hidden";
              }, trial.stimulus_duration);
          }
        }
  }
  CanvasKeyboardDrawPlugin.info = info;

  return CanvasKeyboardDrawPlugin;

})(jsPsychModule);
