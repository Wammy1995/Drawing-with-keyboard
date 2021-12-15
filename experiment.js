/*这是预期控制的猫鼠游戏*/


/* Global Variables */

const btn_html_timer =
    `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`

// const feedback_right = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: green"> √ </span>`

// const feedback_wrong = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: red"> X </span>`

var cheseno = 0
var subname
var ddline = quanzhong()

/* Blocks: HTML DOM Settings */

var set_html_style = {
    type: jsPsychCallFunction,
    func: function() {
        document.body.style.backgroundColor = 'rgb(150, 150, 150)' // background color
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
    type:jsPsychHtmlKeyboardResponse,
    stimulus:`<p>本实验主题是猫和老鼠，你将扮演老鼠快速地抓取奶酪。游戏开始后，屏幕中心将出现奶酪和猫爪。<br>当出现<strong style="color:yellow">奶酪</strong>时，你需要尽可能快地按<strong style="color:yellow">「空格键」</strong>去抓取。而随着你抓取奶酪数目的增加，猫爪出现的概率将增加。当猫爪出现时，你不能按任何键。<br>猫爪出现后，其出现概率将重新开始计算。</p><p>按「空格键」，进入练习阶段。</p>`,
    choices:' ',
    post_trial_gap:200,
}
var Aname = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<p>姓名</p>',
  html: '<p><input type="text" id="test-resp-box" name="response" size="10" /></p>',
  autofocus: 'test-resp-box',
  data:{task:'name'},
  button_label:'继续',
  on_finish:function(data){
    data.response = data.response['response'];
    subname = data.response;
  }
};
var reprc = {
    type:jsPsychHtmlKeyboardResponse,
    stimulus:`<p>练习阶段到此结束，如还需练习请按「G」键。<br>如果准备好进入正式阶段，请按「Q」键。正式阶段将<strong style="color:blue">不再提供反馈</strong>，反应需更快速。`,
    choices:['q','g'],
    data:{task:'ready'},
    post_trial_gap:800,
}

var feedback = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function(){
        var last_trial_rt = jsPsych.data.get().last(1).values()[0].rt;
        var last_trial_task = jsPsych.data.get().last(1).values()[0].task;
        if(last_trial_rt && last_trial_task != 'cat'){
          return '<p style="color:green">漂亮!</p>'; 
        } else if (last_trial_rt && last_trial_task == 'cat') {
          return '<p style="color:red">反应错误！</p>';
        }else if (!last_trial_rt && last_trial_task != 'cat'){
            return '<p style="color:red">反应慢了！</p>';
        }else if (!last_trial_rt && last_trial_task == 'cat'){
            return '<p style="color:green">漂亮!</p>';
        }
      },
      trial_duration:300,
      post_trial_gap:600,
} 

var brk = {
            type:jsPsychHtmlKeyboardResponse,
            stimulus:`<p>请稍事歇息、放松，还有一次测验。</p><p>如果准备好再次进入测验，请按「Q」键。</p>`,
            post_trial_gap:800,
            choices: ["q"],
        }


var catpc = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div style="width:110px;height:110px;margin:auto;position:relative;"><div><img src="img/paw.png" style="top: 2px;position:absolute;left:0px;"></div></div>',
      choices: " ",
      trial_duration:function () {
        return jsPsych.randomization.sampleWithoutReplacement([800, 900, 1000, 1100], 1)[0];
      },
      stimulus_duration:300,
      response_ends_trial:false,
      data: {task: 'cat'},
      on_finish:function(data){
        if (data.responses) {
            data.value = 0
        }
        cheseno = 0
      }
    };

var cheesepc = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div style="width:110px;height:110px;margin:auto;position:relative;"><div><img src="img/cheese.png"></div></div>',
      choices: " ",
      trial_duration:function () {
        return jsPsych.randomization.sampleWithoutReplacement([500, 600, 700, 800], 1)[0];
      },
      stimulus_duration:300,
      trial_duration:function () {
        return jsPsych.randomization.sampleWithoutReplacement([800, 900, 1000, 1100], 1)[0];
      },
      response_ends_trial:false,
      on_finish:function(data){
        cheseno+=1;
        data.task = cheseno
              }

    };

var catline = new Array();
    for (var a = 0 ; a < ddline.length ; a++) {
        for (var b = 0 ; b < ddline[a] ; b++) {
            catline.push(cheesepc)
        }
        catline.push(catpc)
    }

var loop_node = {
    timeline: [cheesepc,feedback,cheesepc,feedback,cheesepc,feedback,catpc,feedback,cheesepc,feedback,cheesepc,feedback,cheesepc,feedback,catpc,feedback,reprc],
    loop_function: function(data){
        if(jsPsych.data.get().last(1).values()[0].response == 'G'){
            return true;
        } else {
            return false;
        }
    }
}

/* Combine Timelines */

var main_timeline = [
    set_html_style,
    open_fullscreen,Aname,
    ins_smw,loop_node,
    {timeline:catline},brk,{timeline:catline}

]
/* Launch jsPsych */

var jsPsych = initJsPsych({
    on_finish: function() {
        jsPsych.data.get().localSave('csv', 'data_cat_'+subname+'.csv') // download from browser
        document.getElementById('jspsych-content').innerHTML += '实验结束，请不要同未参加过本研究的人讨论实验内容。非常感谢您的参与与合作！'
    }
})
jsPsych.run(main_timeline)