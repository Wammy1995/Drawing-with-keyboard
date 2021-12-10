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
var no_cue = '<div style="width:120px;height:120px;margin:auto;position:relative;background-color: white;"><div><img src="img/cross.png" style="top: 50px;position:absolute;left:50px;"></div></div>'
var centre_cue = '<div style="width:120px;height:120px;margin:auto;position:relative;background-color: white;"><div><img src="img/star.png" style="top: 50px;position:absolute;left:50px;"></div></div>'
var double_cue = '<div style="width:120px;height:120px;margin:auto;position:relative;background-color: white;"><div><img src="img/hangstar.png" style="position: absolute;top: 15px;left: 14px;height: 20px;"><div><img src="img/cross.png" style="top: 50px;position:absolute;left:50px;"></div><img src="img/hangstar.png" style="position: absolute;bottom: 15px;left: 14px;height: 20px;"></div></div>'
var spup_cue =  '<div style="width:120px;height:120px;margin:auto;position:relative;background-color: white;"><div><img src="img/hangstar.png" style="position: absolute;top: 15px;left: 14px;height: 20px;"><div><img src="img/cross.png" style="top: 50px;position:absolute;left:50px;"></div></div></div>'
var spdn_cue = '<div style="width:120px;height:120px;margin:auto;position:relative;background-color: white;"><div><div><img src="img/cross.png" style="top: 50px;position:absolute;left:50px;"></div><img src="img/hangstar.png" style="position: absolute;bottom: 15px;left: 14px;height: 20px;"></div></div>'
// c代表：1无线索，2中心线索，3双线索，4上线索，5下线索
var cue = [no_cue,centre_cue,double_cue,spup_cue,spdn_cue]
var tim_var = []
for (var f = 1; f < 49 ; f++) {
    var lsg = {icn:'n',p:'k',c:5,v:2}
    switch(f%3){
        case 0:lsg.icn='i'
            break
        case 1:lsg.icn='c'
            break
        case 2:lsg.icn='n'
            break
    }
    switch(f%2){
        case 0:lsg.p ='s'
            break
        case 1:lsg.p='k'
            break
    }
    switch(f%8){
        case 0:lsg.c = 1;lsg.v=1
            break
        case 1:lsg.c = 1;lsg.v=2
            break
        case 2:lsg.c = 2;lsg.v=1
            break
        case 3:lsg.c = 2;lsg.v=2
            break
        case 4:lsg.c = 3;lsg.v=1
            break
        case 5:lsg.c = 3;lsg.v=2
            break
        case 6:lsg.c = 4;lsg.v=1
            break
        case 7:lsg.c = 4;lsg.v=2
            break
    }
    tim_var.push(lsg)
}

var calqtime = 0

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
    timeline:[
        {
            type:jsPsychHtmlKeyboardResponse,
            stimulus:`<p><strong>指导语</strong></p><p>接下来的实验中，将会有五个箭头出现在屏幕中央。<br>你的任务是判断最中心的箭头朝向</p><p>请按以下按键进行反应：<br>[S]如果中心箭头朝向左边<br>[K]如果中心箭头朝向右边</p><p style="margin-bottom:0px">例如在<img src="img/cs.png">情形中，你应该按[S]键</p><p style="margin-bottom:0px">而在<img src="img/ck.png">中，则应该按[K]键</p><small style="color:grey">按任意键继续</small>`,
            post_trial_gap:200,
        },
        {
            type:jsPsychHtmlKeyboardResponse,
            stimulus:`<p>有时中心箭头会和其它箭头的方向相反<br>你只需要关注中心的箭头！<br>例如在下图，你应该按[S]键：<br><img src="img/is.png"></p><small style="color:grey">按任意键继续</small>`,
            post_trial_gap:200,
        },
        {
            type:jsPsychHtmlKeyboardResponse,
            stimulus:`<p>在屏幕中央将出现一个十字注视点：<br><img src="img/cross.png"><br>箭头将出现在这个注视点的上方或下方<br>在本次实验中，你应该全程将注意力<strong>集中在注视点</strong>。</p><small style="color:grey">按任意键继续</small>`,
            post_trial_gap:200,
        },
        {
            type:jsPsychHtmlKeyboardResponse,
            stimulus:`<p><strong>练习阶段</strong></p><p>在正式实验开始前，你将先进行练习阶段。<br>请尽可能快地回答，同时保证正确率。<br>请将你双手的食指分别放在[S]键和[K]键上。<br>如果中心箭头向左，请按[S]<br>如果中心箭头向右，请按[K]</p><small style="color:grey">按任意键以开始练习</small>`,
            post_trial_gap:200,
        },

        ]
    }

// var pra_ag = {
//     type:jsPsychHtmlKeyboardResponse,
//     stimulus:`<p>练习阶段已结束。<br>如果需要再次练习，请按[C]键<br>如果不需要练习，请按[M]键开始正式测试阶段</p>`,
//     choices:['c','m'],
//     data:{task:'ready'},
//     post_trial_gap:200,
// }

var fixation = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div style="width:120px;height:120px;margin:auto;position:relative;background-color: white;"><div><img src="img/cross.png" style="top: 50px;position:absolute;left:50px;"></div></div>',
      choices: "NO_KEYS",
      trial_duration: function () {
        calqtime = jsPsych.randomization.sampleWithoutReplacement([400, 600, 800, 1000, 1200, 1400, 1600], 1)[0]
        return calqtime;
      },
      data: {task: 'fixation'}
    };

var cover = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div style="width:120px;height:120px;margin:auto;position:relative;background-color: white;"><div><img src="img/cross.png" style="top: 50px;position:absolute;left:50px;"></div></div>',
      choices: "NO_KEYS",
      trial_duration: 400,
      data: {task: 'fixation'}

    };

// var lastfix = {
//       type: jsPsychHtmlKeyboardResponse,
//       stimulus: '<div style="width:120px;height:120px;margin:auto;position:relative;background-color: white;"><div><img src="img/cross.png" style="top: 50px;position:absolute;left:50px;"></div></div>',
//       choices: "NO_KEYS",
//       trial_duration: function () {
//         return (3500-calqtime);
//       },
//       data: {task: 'fixation'}
//     };

var feedback = {
    timeline:[
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function(){
        var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
        if(last_trial_correct == 0){
          return '<p style="color:red">错误!</p>'; // the parameter value has to be returned from the function
        } else if (last_trial_correct == 2) {
          return '<p style="color:red">反应过慢！</p>';
        }
      },
      trial_duration:500,
    }
    ],
    conditional_function: function(){
        // get the data from the previous trial,
        // and check which key was pressed
        if(jsPsych.data.get().last(1).values()[0].correct==1){
            return false;
        } else {
            return true;
        }
    }
} 

var practice = {
    timeline:[
        fixation,
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function(){
                if (jsPsych.timelineVariable('c')<=3) {
                    return cue[jsPsych.timelineVariable('c')-1]
                }
                if (jsPsych.timelineVariable('c')==4) {
                    if (jsPsych.timelineVariable('v')==1) {
                        return cue[3]
                    }else{
                        return cue[4]
                    }
                }
        },
      choices: "NO_KEYS",
      trial_duration: 100,
      data: {task: 'warning cue'},
      randomize_order:true,
        },
        cover,
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function(){
                var hts = '<div style="width:120px;height:120px;margin:auto;position:relative;">'
                var pics = jsPsych.timelineVariable('icn')+jsPsych.timelineVariable('p')
                if (jsPsych.timelineVariable('v')=='1') {
                    hts+='<div><img src="img/'+pics+'.png" style="position: absolute;top: 15px;left: 14px;height: 20px;">'
                }
                hts += '<div><img src="img/cross.png" style="top: 50px;position:absolute;left:50px;"></div>';
                if (jsPsych.timelineVariable('v')=='2') {
                    hts+='<img src="img/'+pics+'.png" style="position: absolute;bottom: 15px;left: 14px;height: 20px;">'
                }
                hts += '</div></div>'
                return hts
            },
            choices: ["s",'k'],
            trial_duration: 1700,
            data:{task:'stimulus'},
            on_finish:function(data){
                calqtime+=data.rt;
                if (data.response) {
                    if(jsPsych.pluginAPI.compareKeys(data.response, jsPsych.timelineVariable('p'))){
                      data.correct = 1;
                    } else {
                      data.correct = 0; 
                    }   
                } else {
                    data.correct = 2;
                }
            }
        },feedback],
        timeline_variables:tim_var.slice(24),
        randomize_order:true,
        };

// var loop_node = {
//     timeline: [practice,pra_ag],
//     loop_function: function(data){
//         if(jsPsych.data.get().last(1).values()[0].response == 'c'){
//             return true;
//         } else {
//             return false;
//         }
//     }
// }

var lifespan = {
    timeline:[
        fixation,
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function(){
                if (jsPsych.timelineVariable('c')<=3) {
                    return cue[jsPsych.timelineVariable('c')-1]
                }
                if (jsPsych.timelineVariable('c')==4) {
                    if (jsPsych.timelineVariable('v')==1) {
                        return cue[3]
                    }else{
                        return cue[4]
                    }
                }
        },
      choices: "NO_KEYS",
      trial_duration: 100,
      data: {task: 'warning cue'},
      randomize_order:true,
        },
        cover,
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function(){
                var hts = '<div style="width:120px;height:120px;margin:auto;position:relative;">'
                var pics = jsPsych.timelineVariable('icn')+jsPsych.timelineVariable('p')
                if (jsPsych.timelineVariable('v')=='1') {
                    hts+='<img src="img/'+pics+'.png" style="position: absolute;top: 15px;left: 0px;">'
                }
                hts += '<div><img src="img/cross.png" style="top: 50px;position:absolute;left:50px;"></div>';
                if (jsPsych.timelineVariable('v')=='2') {
                    hts+='<img src="img/'+pics+'.png" style="position: absolute;bottom: 15px;left: 0px;">'
                }
                hts += '</div></div>'
                return hts
            },
            choices: ["s",'k'],
            trial_duration: 1800,
            on_finish:function(data){
                calqtime+=data.rt;
                data.flankers = jsPsych.timelineVariable('icn')
                data.cue = jsPsych.timelineVariable('c')
                if (data.response) {
                    if(jsPsych.pluginAPI.compareKeys(data.response, jsPsych.timelineVariable('p'))){
                      data.correct = 1;
                    } else {
                      data.correct = 0; 
                    }   
                } else {
                    data.correct = 2;
                }
            },
        },
        // lastfix,
        ],
        timeline_variables:tim_var,
        sample: {
        type: 'fixed-repetitions',
        size: 2}
        };

var brk = {
            type:jsPsychHtmlKeyboardResponse,
            stimulus:`<p>请稍事歇息，放松，测验还未结束。</p><p>如果准备好再次进入测验，请按[G]键。</p>`,
            post_trial_gap:200,
            choices: ["g"],
        }

/* Combine Timelines */

var main_timeline = [
    set_html_style,
    open_fullscreen,
    ins_smw,
    practice,
    // loop_node,
    lifespan,brk,lifespan,brk,lifespan,brk,
    lifespan
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