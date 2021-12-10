/**
 * Author:
 * Bao H.-W.-S. (https://psychbruce.github.io)
 */


/* Custom JS Functions */

// NOTE: When using JS functions, parameters should be defined in order!

function keyCode(character) {
    return jsPsych.pluginAPI.convertKeyCharacterToKeyCode(character)
}

function inputDialog(title, default_text) {
    var input = prompt(msg = title, defaultText = default_text)
    return input
}

function countdown(){
    var a = document.getElementById('timelimit');
    var minutes = Math.floor(mt/60);
    var seconds = Math.floor(mt%60);
    var str = '剩余时间：'+minutes+'分'+seconds+'秒';
    a.innerHTML=str;
    --mt;
    if (mt<=0) {
        alert("时间到，当前测验已结束！确定以继续实验流程，谢谢。")
        document.getElementById('jspsych-test-multi-select-next').click();
    }
}

//survey text 字数限制
function word_length() {
    var n = document.querySelector("#input-0").textLength;
    var btn = document.querySelector("#jspsych-survey-text-next")
    if(n<100){
      btn.disabled = true;
      } else {
      btn.disabled = false;
      }
}
    
function nextquestion(){
    var nowq = parseInt(document.querySelector("#nextq").getAttribute("index"));
    var nowid = 'jspsych-test-multi-select-'+nowq;
    var newid = 'jspsych-test-multi-select-'+(nowq+1);
    document.getElementById(nowid).classList.add('hidden');
    document.getElementById(newid).classList.remove('hidden');
    document.querySelector("#preq").classList.remove('hidden');
    document.querySelector("#nextq").setAttribute('index',(nowq+1));
    if ((nowq+2) == parseInt(document.querySelector("#jspsych-test-multi-select-form").getAttribute("index"))) {
        document.querySelector("#nextq").classList.add('hidden');
        document.getElementById('jspsych-test-multi-select-next').classList.remove("hidden");
    }
}

function prequestion(){
    var nowq = parseInt(document.querySelector("#nextq").getAttribute("index"));
    var nowid = 'jspsych-test-multi-select-'+nowq;
    var newid = 'jspsych-test-multi-select-'+(nowq-1);
    document.getElementById(nowid).classList.add('hidden');
    document.getElementById(newid).classList.remove('hidden');
    document.querySelector("#nextq").classList.remove('hidden');
    document.querySelector("#nextq").setAttribute('index',(nowq-1));
    if (nowq == 1) {
        document.querySelector("#preq").classList.add('hidden');
    }
}

function timer() {
    var second = document.getElementById('timer')
    var button = document.getElementsByClassName('jspsych-btn')[0]
    if (second != null) {
        if (second.innerHTML > 1) {
            second.innerHTML = second.innerHTML - 1
        } else {
            button.innerHTML = '继续'
            button.disabled = false
        }
    }
}

function addRespFromButton(data) {
    // compute variables from button-plugin response (for simple item)
    data.response = parseInt(data.button_pressed) + 1 // raw: 0, 1, 2, ...
}

function addRespFromButtonScale(data, scale_name, var_i = 'i') {
    // compute variables from button-plugin response (for likert scale)
    data.scale = scale_name
    data.varname = scale_name + data[var_i]
    data.response = parseInt(data.button_pressed) + 1 // raw: 0, 1, 2, ...
}

function addRespFromSurvey(data, parse_int = false) {
    // only for single response ('Q0' in survey-plugin responses)
    var resp = String(JSON.parse(data.responses).Q0)
    data.responses = resp
    data.response = (parse_int) ? resp.match(/\d+/) : resp
}

function replaceComma(data, sep = '|') {
    // only for single response ('Q0' in survey-plugin responses)
    data.responses = String(JSON.parse(data.responses).Q0).split(',').join(sep)
}

function setSliderAttr(event = 'onmouseup') {
    document.getElementById('jspsych-html-slider-response-response').setAttribute(event, 'addSliderValue()')
}

function addSliderValue(element_id = 'slider-value') {
    var sss = "aj" + (parseInt(document.getElementById('jspsych-html-slider-response-response').value)-1)
    document.getElementById(element_id).innerHTML = document.getElementById(sss).getAttribute("ans")
    document.getElementById('jspsych-html-slider-response-next').disabled = false
}

function MEAN(scale_name, rev = [0], likert = [1, 7], var_i = 'i', var_response = 'response') {
    var df = jsPsych.data.get().filter({ scale: scale_name }).values() // raw data array (modifiable)
    var sum = 0
    for (var i in df) { // or: for (var i = 0; i < df.length; i++) {...}
        // df[i][j] or df[i]['varname'] or df[i].varname
        if (rev.includes(df[i][var_i]) == false) {
            sum += df[i][var_response]
        } else {
            sum += likert[0] + likert[1] - df[i][var_response]
        }
    }
    return sum / df.length
}

function changersm(n){
    var imgs=["https://z3.ax1x.com/2021/03/22/6TAq81.png","https://z3.ax1x.com/2021/03/22/6TAbCR.png","https://z3.ax1x.com/2021/03/22/6TA759.png"];
    document.getElementById("imgShow").src=imgs[n-1];
}


/* JS Functions from the R package 'jspsychr' */

save_locally = function() {
    var data = jsPsych.data.get().csv()
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'submit')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ filedata: data }))
};