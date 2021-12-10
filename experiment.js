/*这是筛选ADHD倾向的蚂蚁测验*/


/* Global Variables */

const btn_html_timer =
    `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`

const feedback_right = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: green"> √ </span>`

const feedback_wrong = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: red"> X </span>`


/* Blocks: HTML DOM Settings */

var set_html_style = {
    type: jsPsychCallFunction,
    func: function() {
        document.body.style.backgroundColor = 'white' // background color
        document.body.style.color = 'black' // font color
        document.body.style.fontSize = '20pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'normal' // 'normal', 'bold'
        document.body.style.lineHeight = '1.6em' // line space
        document.body.style.cursor = 'default' // 'default', 'none', 'wait', ...
        document.body.onselectstart = function() { return false } // 禁止选中文字 <body oncontextmenu="return false">
        document.body.oncontextmenu = function() { return false } // 禁用鼠标右键 <body onselectstart="return false">
        document.onkeydown = function() {
            // 屏蔽键盘按键 (https://www.bejson.com/othertools/keycodes/)
            if ((event.keyCode in { 27: 'Esc', 116: 'F5', 123: 'F12' }) ||
                (event.ctrlKey && event.keyCode in { 85: 'U' })
            ) { return false }
        }
    },
}

var set_html_style_EAST = {
    type: jsPsychCallFunction,
    func: function() {
        document.body.style.backgroundColor = 'black'
        document.body.style.color = 'white'
        document.body.style.fontSize = '32pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'normal'
        document.body.style.lineHeight = '1.2em'
        document.body.style.cursor = 'none'
    },
}

/* Blocks: Basics */

var open_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: `
    <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
    <b>
    测验将在一个「全屏页面」开始，为确保最佳效果，请你：<br/>
    （1）在电脑上进行测验，并使用主流浏览器打开本网页<br/>
    &emsp;&emsp;（Chrome、Edge、Firefox、Safari等，不要用IE）<br/>
    （2）关掉电脑上其他正在运行的程序或将其最小化<br/>
    （3）将手机调至静音，并尽可能减少环境噪音干扰<br/>
    （4）在测验过程中不要退出全屏或刷新页面<br/>
    （5）务必认真作答<br/><br/>
    </b>
    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </p>`,
    button_label: '点击这里全屏开始',
    delay_after: 100
}

var ins_smw = {
    type:jsPsychInstructions,
    pages:['这是画画'],
    button_label_next:'开始',
    show_clickable_nav:true,
    allow_backward:false,
    }


var first_pic = {
      type: jsPsychHtmlButtonResponse,
      stimulus: function(){
        return '<canvas width="500" height="500" id="garabato" style="position: absolute;"></canvas><canvas width="500" height="500" id="zhen" style="position: absolute;visibility: hidden;"></canvas><canvas width="500" height="500" id="test1"></canvas><canvas width="500" height="500" id="test2" style="position: absolute;visibility: hidden;"></canvas><script src="main.js"></script>'},
      data: {task: 'first_pic'},
      choices:['完成'],
      button_html:'<button class="jspsych-btn" onclick="done()">%choice%</button>'

    };

/* Combine Timelines */

var main_timeline = [
    set_html_style,
    open_fullscreen,
    ins_smw,
    first_pic
    
]
/* Launch jsPsych */

var jsPsych = initJsPsych({
    on_finish: function() {
        var tim = new Date();
        jsPsych.data.get().localSave('csv', 'ant'+tim.getDate()+'_'+tim.getHours()+'.csv')
        document.getElementById('jspsych-content').innerHTML += '实验结束，请不要同未参加过本研究的人讨论实验内容，非常感谢您的参与与合作！'
    }
})
jsPsych.run(main_timeline)