var jsPsychCategorizeImage = (function (jspsych) {
  'use strict';

  const info = {
      name: "categorize-image",
      parameters: {
          /** The image content to be displayed. */
          stimulus: {
              type: jspsych.ParameterType.IMAGE,
              pretty_name: "Stimulus",
              default: undefined,
          },
          /** The key to indicate the correct response. */
          key_answer: {
              type: jspsych.ParameterType.KEY,
              pretty_name: "Key answer",
              default: undefined,
          },
          /** Array containing the key(s) the subject is allowed to press to respond to the stimulus. */
          choices: {
              type: jspsych.ParameterType.KEYS,
              pretty_name: "Choices",
              default: "ALL_KEYS",
          },
          /** Label that is associated with the correct answer. */
          text_answer: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Text answer",
              default: null,
          },
          /** String to show when correct answer is given. */
          correct_text: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Correct text",
              default: "<p class='feedback'>Correct</p>",
          },
          /** String to show when incorrect answer is given. */
          incorrect_text: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Incorrect text",
          },
          /** Any content here will be displayed below the stimulus. */
          prompt: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Prompt",
              default: null,
          },
          /** If set to true, then the subject must press the correct response key after feedback in order to advance to next trial. */
          force_correct_button_press: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Force correct button press",
              default: false,
          },
          /** Whether or not the stimulus should be shown on the feedback screen. */
          show_stim_with_feedback: {
              type: jspsych.ParameterType.BOOL,
              default: true,
              no_function: false,
          },
          /** If true, stimulus will be shown during feedback. If false, only the text feedback will be displayed during feedback. */
          show_feedback_on_timeout: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Show feedback on timeout",
              default: false,
          },
          /** The message displayed on a timeout non-response. */
          timeout_message: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Timeout message",
              default: "<p>Please respond faster.</p>",
          },
          /** How long to show the stimulus. */
          stimulus_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Stimulus duration",
              default: null,
          },
          /** How long to show the trial. */
          trial_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Trial duration",
              default: null,
          },
          /** How long to show the feedback. */
          feedback_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Feedback duration",
              default: 2000,
          },
      },
  };
  /**
   * **categorize-image**
   *
   * jsPsych plugin for image categorization trials with feedback
   *
   * @author Josh de Leeuw
   * @see {@link https://www.jspsych.org/plugins/jspsych-categorize-image/ categorize-image plugin documentation on jspsych.org}
   */
  class CategorizeImagePlugin {
      constructor(jsPsych) {
          this.jsPsych = jsPsych;
      }
      trial(display_element, trial) {
          display_element.innerHTML =
              '<img id="jspsych-categorize-image-stimulus" class="jspsych-categorize-image-stimulus" src="' +
                  trial.stimulus +
                  '"></img>';
          // hide image after time if the timing parameter is set
          if (trial.stimulus_duration !== null) {
              this.jsPsych.pluginAPI.setTimeout(function () {
                  display_element.querySelector("#jspsych-categorize-image-stimulus").style.visibility = "hidden";
              }, trial.stimulus_duration);
          }
          // if prompt is set, show prompt
          if (trial.prompt !== null) {
              display_element.innerHTML += trial.prompt;
          }
          var trial_data = {};
          // create response function
          const after_response = (info) => {
              // kill any remaining setTimeout handlers
              this.jsPsych.pluginAPI.clearAllTimeouts();
              // clear keyboard listener
              this.jsPsych.pluginAPI.cancelAllKeyboardResponses();
              var correct = false;
              if (this.jsPsych.pluginAPI.compareKeys(trial.key_answer, info.key)) {
                  correct = true;
              }
              // save data
              trial_data = {
                  rt: info.rt,
                  correct: correct,
                  stimulus: trial.stimulus,
                  response: info.key,
              };
              display_element.innerHTML = "";
              var timeout = info.rt == null;
              doFeedback(correct, timeout);
          };
          this.jsPsych.pluginAPI.getKeyboardResponse({
              callback_function: after_response,
              valid_responses: trial.choices,
              rt_method: "performance",
              persist: false,
              allow_held_key: false,
          });
          if (trial.trial_duration !== null) {
              this.jsPsych.pluginAPI.setTimeout(function () {
                  after_response({
                      key: null,
                      rt: null,
                  });
              }, trial.trial_duration);
          }
          const endTrial = () => {
              display_element.innerHTML = "";
              this.jsPsych.finishTrial(trial_data);
          };
          const doFeedback = (correct, timeout) => {
              if (timeout && !trial.show_feedback_on_timeout) {
                  display_element.innerHTML += trial.timeout_message;
              }
              else {
                  // show image during feedback if flag is set
                  if (trial.show_stim_with_feedback) {
                      display_element.innerHTML =
                          '<img id="jspsych-categorize-image-stimulus" class="jspsych-categorize-image-stimulus" src="' +
                              trial.stimulus +
                              '"></img>';
                  }
                  // substitute answer in feedback string.
                  var atext = "";
                  if (correct) {
                      atext = trial.correct_text.replace("%ANS%", trial.text_answer);
                  }
                  else {
                      atext = trial.incorrect_text.replace("%ANS%", trial.text_answer);
                  }
                  // show the feedback
                  display_element.innerHTML += atext;
              }
              // check if force correct button press is set
              if (trial.force_correct_button_press &&
                  correct === false &&
                  ((timeout && trial.show_feedback_on_timeout) || !timeout)) {
                  var after_forced_response = function (info) {
                      endTrial();
                  };
                  this.jsPsych.pluginAPI.getKeyboardResponse({
                      callback_function: after_forced_response,
                      valid_responses: [trial.key_answer],
                      rt_method: "performance",
                      persist: false,
                      allow_held_key: false,
                  });
              }
              else {
                  this.jsPsych.pluginAPI.setTimeout(function () {
                      endTrial();
                  }, trial.feedback_duration);
              }
          };
      }
  }
  CategorizeImagePlugin.info = info;

  return CategorizeImagePlugin;

})(jsPsychModule);
