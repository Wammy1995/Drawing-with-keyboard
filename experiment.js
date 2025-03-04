/*这是作画*/


/* Global Variables */

const btn_html_timer =
    `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`

// const feedback_right = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: green"> √ </span>`

// const feedback_wrong = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: red"> X </span>`
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

var ins = {
    type: jsPsychInstructions,
    pages: [
    '指导语写这里。<br>br是换行'
    ],
    show_clickable_nav: true,
    allow_backward:false,
    button_label_next:"继续",
}

//以下是图形生成，按顶点顺序依次写在[]内，pse是最后的允许误差范围，同时也是起始处圆点直径。x_speed和y_speed是移动速度

var task_a = {
    timeline: [{
        type: jsPsychCanvasKeyboardDraw,
        stimulus:function(){return jsPsych.timelineVariable('s')},
        x_speed:5,
        y_speed:5,
        pse:10,
        canvas_size:[600,600]
    },],
    timeline_variables: [
        { s:[90,200,390,200,490,400,190,400] },
        { s:[390,200,490,400,190,400,90,200] },
        { s:[490,400,390,200,90,200,190,400] },
        { s:[190,400,490,400,390,200,90,200] }
    ],
    randomize_order: true,
    post_trial_gap: 200

}

var task1 = {
    type:jsPsychCanvasKeyboardDraw,
    stimulus:[30,30,330,30,430,230,130,230],
    post_trial_gap:200,
    x_speed:5,
    y_speed:5,
    pse:10,
}

var task3 = {
    type:jsPsychCanvasKeyboardDraw,
    stimulus:[330,30,430,230,130,230,30,30],
    post_trial_gap:200,
    x_speed:5,
    y_speed:5,
    pse:10,
}

var task2 = {
    type:jsPsychCanvasKeyboardDraw,
    stimulus:[250,10,315,185,490,250,315,315,250,490,185,315,10,250,185,185],
    post_trial_gap:200,
    x_speed:5,
    y_speed:5,
    pse:10,
}


/* Combine Timelines */

var main_timeline = [
    set_html_style,
    open_fullscreen,
    ins,
    task_a,
    // task2,task3,
    
]
/* Launch jsPsych */

var jsPsych = initJsPsych({
    on_finish: function() {
        jsPsych.data.get().localSave('csv', 'data_draw.csv') // download from browser
        document.getElementById('jspsych-content').innerHTML += '实验结束，请不要同未参加过本研究的人讨论实验内容。非常感谢您的参与与合作！'
    }
})
jsPsych.run(main_timeline)