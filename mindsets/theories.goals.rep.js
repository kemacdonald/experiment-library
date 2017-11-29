function caps(a) {return a.substring(0,1).toUpperCase() + a.substring(1,a.length);}
function uniform(a, b) { return ( (Math.random()*(b-a))+a ); }
function showSlide(id) { $(".slide").hide(); $("#"+id).show(); }
function shuffle(v) { newarray = v.slice(0);for(var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);return newarray;} // non-destructive.
function sample(v) {return(shuffle(v)[0]);}
function rm(v, item) {if (v.indexOf(item) > -1) { v.splice(v.indexOf(item), 1); }}
function rm_sample(v) {var item = sample(v); rm(v, item); return item;}
function sample_n(v, n) {var lst=[]; var v_copy=v.slice(); for (var i=0; i<n; i++) {lst.push(rm_sample(v_copy))}; return(lst);}
function rep(e, n) {var lst=[]; for (var i=0; i<n; i++) {lst.push(e);} return(lst);}
function b(string) {return "<b>" + string + "</b>";}
var startTime;

// returns selected elements and creates a new array with those elements (called 'foo')
function range(start, end)
{
    var foo = [];
    for (var i = start; i <= end; i++)
        foo.push(i);
    return foo;
}

//slider stuff used throughout
var slider_response = null;
function changeCreator(label) {
  return function(value) {
    $('#' + label).css({"background":"#99D6EB"});
    $('#' + label + ' .ui-slider-handle').css({
      "background":"#667D94",
      "border-color": "#001F29" });
    var slider_val = $("#" + label).slider("value");
    slider_response = slider_val;
  } 
}

//creator functions for theories expt
function slideCreator(label) {
  return function() {
    $('#' + label + ' .ui-slider-handle').css({
       "background":"#E0F5FF",
       "border-color": "#001F29"
    });
  }
}
function create_slider(label) {
  slider_response = null; //delete slider response from previous trial
  $("#" + label).slider({
    animate: true,
    orientation: "horizontal",
    max: 1 , min: 0, step: 0.01, value: 0.5,
    slide: slideCreator(label),
    change: changeCreator(label)
  })
}

//creator functions for goals section
var enough_responses;
var n_responses = 0;
var responses = {};

function changeCreatorGoals(i) {
  return function(value) {
    $('#goals_slider' + i).css({"background":"#99D6EB"});
    $('#goals_slider' + i + ' .ui-slider-handle').css({
      "background":"#667D94",
      "border-color": "#001F29" });
    if (responses["response" + i] == null) {
      n_responses++;
      responses["response" + i] = [];
    }
    var slider_val = $("#goals_slider"+i).slider("value");
    responses["response" + i] = slider_val;
  } 
}
function slideCreatorGoals(i) {
  return function() {
    $('#goals_slider' + i + ' .ui-slider-handle').css({
       "background":"#E0F5FF",
       "border-color": "#001F29"
    });
  }
}

//a or an
function article(difficulty) {
  return difficulty == "easy" ? "an" : "a";
}

// checks if radio buttons on Dweck Questionnaire are empty
function validateRadioButtonsDweck() {
    
    if ($('input[name="q0"]:checked').val()!=null &&
        $('input[name="q1"]:checked').val()!=null &&
        $('input[name="q2"]:checked').val()!=null &&
        $('input[name="q3"]:checked').val()!=null 
        ) {
        return true;
    } else {
        alert ( "Please answer all the questions." );
        return false;    
    }
}

// checks if radio buttons on Blackwell Questionnaire are empty
function validateRadioButtonsBlackwell() {
    
    if ($('input[name="q0"]:checked').val()!=null &&
        $('input[name="q1"]:checked').val()!=null &&
        $('input[name="q2"]:checked').val()!=null &&
        $('input[name="q3"]:checked').val()!=null &&
        $('input[name="q4"]:checked').val()!=null &&
        $('input[name="q5"]:checked').val()!=null 
        ) {
        return true;
    } else {
        alert ( "Please answer all the questions." );
        return false;    
    }
}

var names = ["Adam", "Bob", "Carl", "Dave", "Evan", "Fred", "George",
             "Hank", "Ivan", "John", "Kevin", "Luke", "Mark", "Nick",
             "Oscar", "Patrick", "Rick", "Steve", "Tom", "Vince",
             "Will", "Zach", "Ben", "Brian", "Colin", "Dan",
             "Edward", "Felix", "Gabe", "Greg", "Henry", "Jack", "Jeff",
             "Joe", "Josh", "Keith", "Kyle", "Matt", "Martin", "Max",
             "Mike", "Paul", "Phillip", "Toby", "Andrew", "Charles"];

var ability = ["high", "low"];
var effort = ["high", "medium", "low"];
var difficulty = ["difficult", "easy"];

var performance_combos = [];
var improvement_combos = [];
var performance_sanity = [
  {type:"sanity", correct:0},
  {type:"sanity", correct:1}
];

for  (var a=0; a<ability.length; a++) {
  for (var e=0; e<effort.length; e++) {
    for (var d=0; d<difficulty.length; d++) {
      performance_combos.push({
        type:"performance",
        ability:ability[a],
        effort:effort[e],
        difficulty:difficulty[d]
      });
      improvement_combos.push({
        type:"improvement",
        ability:ability[a],
        effort:effort[e],
        difficulty:difficulty[d]
      });
    }
  }
}

var goals = [
  "doing well on this test",
  "doing well on future tests",
  "being good at math",
  "improving at math",
  "showing your teacher that you have high math ability",
  "showing your teacher that you try at math",
  "doing badly on this test"
]

var dweck_prompts = ["You have a certain amount of intelligence, and you can’t really do much to change it:",
                      "You can learn new things, but you can’t really change your basic intelligence:",
                      "No matter who you are, you can significantly change your intelligence level:",
                      "You can always substantially change how intelligent you are:",
                    ];

var dweck_indices = range(0,dweck_prompts.length-1);

var blackwell_prompts = ["The harder you work at something, the better you will be at it",
                          "When I work hard at something, it makes me feel like I’m not very smart",
                          "If you’re not good at something, working hard won’t make you good at it",
                          "An important reason why I choose tasks is because I like to learn new things",
                          "I like tasks best when they make me think hard",
                          "I like tasks that I’ll learn from even if I make a lot of mistakes",
                         ]

var blackwell_indices = range(0,blackwell_prompts.length-1);

var randomization = {
  names: shuffle(names),
  slider_trials: shuffle([0, 6, 10]),
  performance_trials: shuffle(shuffle(performance_combos).slice(0,6).concat(performance_sanity)),
  improvement_trials: shuffle(improvement_combos).slice(0,6),
  dweck_indices: shuffle(dweck_indices),
  goals: shuffle(goals),
  blackwell_indices: shuffle(blackwell_indices),
  block_order: shuffle(["performance", "improvement", "goals"]),
}

n_trials = randomization.slider_trials.length +
           randomization.performance_trials.length +
           randomization.improvement_trials.length +
           1 + // goals trial
           1  // dweck trial

// WHERE ARE WE IN THE EXPERIMENT?
n_trials_completed = 0;
n_performance_trials_completed = 0;
n_improvement_trials_completed = 0;
n_slider_trials_completed = 0;
n_goals_trials_completed=0;

$(document).ready(function() {
  showSlide("consent");
  $("#mustaccept").hide();
  startTime = Date.now();
});

var experiment = {
  data: {
    "randomization": randomization,
    "trials": []
  },
  intro: function() {
    showSlide("introduction");
    $(".continue").click(function() {
      $(".continue").unbind("click");
      experiment.slider_practice_intro();
    });
  },

  slider_practice_intro: function() {
    showSlide("slider_practice_intro");
    $(".continue").click(function() {
      $(".continue").unbind("click");
      experiment.slider_practice();
    });
  },

  slider_practice: function() {
    $('.bar').css('width', ( (n_trials_completed / n_trials)*100 + "%"));
    $(".err").hide();
    // which display to show: how many out of 10?
    var how_many_target = randomization.slider_trials[n_slider_trials_completed];
    // data object
    var response_data = {
        type:"slider_practice",
        n_blue_dots:how_many_target
      }
    //get correct dot display
    switch(how_many_target) {
            case 0:
                $(".slider_practice")[0].children[0].src = "slider_practice/all_red.png";
                break;
            case 6:
                $(".slider_practice")[0].children[0].src = "slider_practice/60_blue.png";
                break;
            case 10:
                $(".slider_practice")[0].children[0].src = "slider_practice/all_blue.png";
                break;
            default:
    }

    showSlide("slider_practice");

    //get slider
    $("#slider_practice_container").html('<div id="practice_slider" class="slider">');
    create_slider("practice_slider");

    // continue button
    $(".continue").click(function() {
      if (slider_response != null) {
        n_slider_trials_completed++;
        n_trials_completed++;
        //push slider data 
        response_data["response"] = slider_response;
        experiment.data["trials"].push(response_data);
        if (n_slider_trials_completed < randomization.slider_trials.length) {
          //if more slider trials, keep going
          $(".continue").unbind("click");
          experiment.slider_practice();
        } else {
          //else start whatever experiment block is randomized to be first.
          $(".continue").unbind("click");
          experiment[randomization.block_order[0] + "_intro"]();
        }
      } else {
        $(".err").show();
      }
    });
  },

  goals_intro: function() {
    showSlide("goals_intro");
    var first_or_next = randomization.block_order[0] == "goals" ? "First" : "Next"
    $(".prompt").html(first_or_next + ", we will ask you to reason about <b>your</b> goals on a test in this class.");
     $(".continue").click(function() {
      $(".continue").unbind("click");
      experiment.goals();
    })
  },

  goals: function () {
    $('.bar').css('width', ( (n_trials_completed / n_trials)*100 + "%"));
    $(".err").hide();
    $(".prompt").html("How likely is it that you will have each of the following goals?")

    //loop to create sliders
    for (var i = 0; i<randomization.goals.length; i++) {
      // display goals prompt
      $("#ref" + i).html(randomization.goals[i]);
      responses["target" + i] = randomization.goals[i];
      $('#goals_slider' + i).slider({
        animate: true,
        orientation: "horizontal",
        max: 1 , min: 0, step: 0.01, value: 0.5,
        slide: slideCreatorGoals(i),
        change: changeCreatorGoals(i)
      });
    }
    
    showSlide("goals");

    // checks if subs answered all questions
    enough_responses = function() {
      return n_responses == randomization.goals.length;
    };

    // continue button
    $(".continue").click(function() {
      if (enough_responses()) {
        n_goals_trials_completed++;
        n_trials_completed++;
        experiment.data["goals_responses"] = responses;
        if (n_improvement_trials_completed == 0 & n_goals_trials_completed == 0) {
            //must be in the first block, so start whatever block is randomized to be second.
            $(".continue").unbind("click");
           experiment[randomization.block_order[1] + "_intro"]();
        } else if (n_improvement_trials_completed == 0) {
            $(".continue").unbind("click");
            experiment.improvement_intro();  
        } else if (n_performance_trials_completed == 0) {
            $(".continue").unbind("click");
            experiment.performance_intro();  
        } else {
          $(".continue").unbind("click");
          experiment.dweck_questionnaire();
        }
      } else {
        $(".err").show();
      }
    });
  },

  performance_intro: function() {
    showSlide("performance_intro");
    var first_or_next = randomization.block_order[0] == "performance" ? "First" : "Next"
    $(".prompt").html(first_or_next + ", we will ask you to predict students' performance on some tests in this class.");
    $(".continue").click(function() {
      $(".continue").unbind("click");
      experiment.performance();
    })
  },

  performance: function() {
    $('.bar').css('width', ( (n_trials_completed / n_trials)*100 + "%"));
    $(".err").hide();
    var response_data;
    var rand_name = randomization.names[n_trials_completed];
    showSlide("performance");
    var trial_data = randomization.performance_trials[n_performance_trials_completed];
    if (trial_data.type == "sanity") {
      if (trial_data.correct == 1) {
        var high_or_low = "high";
        var training_prompt = "He gets all of the questions right and does better than everyone else in his class.";
      } else {
        var high_or_low = "low";
        var training_prompt = "He gets all of the questions wrong and does worse than everyone else in his class.";
      }
      response_data = {type:trial_data.type, correct: trial_data.correct}
    } else {
      var high_or_low = trial_data.ability;
      var training_prompt = "He puts " + b(trial_data.effort) + " effort into "  + article(trial_data.difficulty) + 
                            " " + b(trial_data.difficulty) + " math test."
      response_data = {
        type:trial_data.type,
        ability: trial_data.ability,
        effort: trial_data.effort,
        difficulty: trial_data.difficulty
      }
    }
    var ability_prompt = rand_name + " has " + b(high_or_low) + " math ability."
    var question_prompt = "What score does " + rand_name + " get?";
    $(".ability_prompt").html(ability_prompt);
    $(".training_prompt").html(training_prompt);
    $(".question_prompt").html(question_prompt);

    //sliders
    $("#performance_slider_container").html('<div id="performance_slider" class="slider">');
    create_slider("performance_slider");

    //continue button
    $(".continue").click(function() {
      if (slider_response != null) {
        n_performance_trials_completed++;
        n_trials_completed++;
        response_data["response"] = slider_response;
        experiment.data["trials"].push(response_data);
        if (n_performance_trials_completed < randomization.performance_trials.length) {
          $(".continue").unbind("click");
          experiment.performance();
        } else if (n_improvement_trials_completed == 0 & n_goals_trials_completed == 0) {
            //must be in the first block, so start whatever block is randomized to be second.
            $(".continue").unbind("click");
           experiment[randomization.block_order[1] + "_intro"]();
        } else if (n_improvement_trials_completed == 0) {
            $(".continue").unbind("click");
            experiment.improvement_intro();  
        } else if (n_goals_trials_completed == 0) {
            $(".continue").unbind("click");
            experiment.goals_intro();  
        } else {
          $(".continue").unbind("click");
          experiment.dweck_questionnaire();
        }
      } else {
        $(".err").show();
      }
    });
  },

  improvement_intro: function() {
    showSlide("improvement_intro");
    var first_or_next = randomization.block_order[0] == "improvement" ? "First" : "Next";
    $(".prompt").html(first_or_next + ", we will ask you to predict students' improvement after practicing math problems.");
    $(".continue").click(function() {
      $(".continue").unbind("click");
      experiment.improvement();
    })
  },

  improvement: function() {
    $('.bar').css('width', ( (n_trials_completed / n_trials)*100 + "%"));
    $(".err").hide();
    var trial_data = randomization.improvement_trials[n_improvement_trials_completed];
    var rand_name = randomization.names[n_trials_completed];
    var ability_prompt = rand_name + " has " + b(trial_data.ability) + " math ability."
    var training_prompt = "He puts " + b(trial_data.effort) + " effort into doing some " + b(trial_data.difficulty) +
                          " practice problems."
    var question_prompt = "How much does " + rand_name + "'s math ability improve after practicing?";
    $(".ability_prompt").html(ability_prompt);
    $(".training_prompt").html(training_prompt);
    $(".question_prompt").html(question_prompt);
    var response_data = {
      type:trial_data.type,
      ability: trial_data.ability,
      effort: trial_data.effort,
      difficulty: trial_data.difficulty
    }
    showSlide("improvement");

    //sliders
    $("#improvement_slider_container").html('<div id="improvement_slider" class="slider">');
    create_slider("improvement_slider");

    //continue button
    $(".continue").click(function() {
      if (slider_response != null) {
        n_improvement_trials_completed++;
        n_trials_completed++;
        response_data["response"] = slider_response;
        experiment.data["trials"].push(response_data);
        if (n_improvement_trials_completed < randomization.improvement_trials.length) {
          $(".continue").unbind("click");
          experiment.improvement();
        } else if (n_performance_trials_completed == 0 & n_goals_trials_completed == 0) {
            //must be in the first block, so start whatever block is randomized to be second.
            $(".continue").unbind("click");
           experiment[randomization.block_order[1] + "_intro"]();
        } else if (n_performance_trials_completed == 0) {
            $(".continue").unbind("click");
            experiment.performance_intro();  
        } else if (n_goals_trials_completed == 0) {
            $(".continue").unbind("click");
            experiment.goals_intro();  
        } else {
          $(".continue").unbind("click");
          experiment.dweck_questionnaire();
        }
      } else {
        $(".err").show();
      }
    });
  },

  dweck_questionnaire: function() {
    showSlide("dweck_questionnaire");

    var num_prompts = randomization.dweck_indices.length;
    var responses = {}
    // loop to fill in dweck prompts
    for (i = 0; i < num_prompts; i++) {
      $(".dweck_prompt").eq(i).html(dweck_prompts[randomization.dweck_indices[i]]);
            responses["question" + i] = dweck_prompts[i];
    } 
    
    $(".continue").click(function() {
        if (validateRadioButtonsDweck()) {
        $(".continue").unbind("click");
        // push responses to experiment object
        response_data = {
          type:"dweck",
          order:randomization.dweck_indices,
          question_order: responses,
          q0: $('input[name="q0"]:checked').val(),
          q1: $('input[name="q1"]:checked').val(),
          q2: $('input[name="q2"]:checked').val(),
          q3: $('input[name="q3"]:checked').val(),
        }
        experiment.data["trials"].push(response_data);

        experiment.blackwell_questionnaire();
      }
    })
  },

  blackwell_questionnaire: function() {
    showSlide("blackwell_questionnaire");

    var num_prompts = randomization.blackwell_indices.length;
    var responses = {}
    // loop to fill in blackwell prompts
    for (i = 0; i < num_prompts; i++) {
      $(".blackwell_prompt").eq(i).html(blackwell_prompts[randomization.blackwell_indices[i]]);
      responses["question" + i] = blackwell_prompts[i];
    } 

    $(".continue").click(function() {
        if (validateRadioButtonsBlackwell()) {
        $(".continue").unbind("click");
        // push responses to experiment object
        response_data = {
          type:"blackwell",
          index_order:randomization.blackwell_indices,
          question_order: responses,
          q0: $('input[name="q0"]:checked').val(),
          q1: $('input[name="q1"]:checked').val(),
          q2: $('input[name="q2"]:checked').val(),
          q3: $('input[name="q3"]:checked').val(),
          q4: $('input[name="q4"]:checked').val(),
          q5: $('input[name="q5"]:checked').val(),
        }
        experiment.data["trials"].push(response_data);

        experiment.outgoing_questionnaire();
      }
    })
  },

  
  outgoing_questionnaire: function() {
    //disable return key
    $(document).keypress( function(event){
     if (event.which == '13') {
        event.preventDefault();
      }
    });
    //progress bar complete
    $('.bar').css('width', ( "100%"));
    showSlide("outgoing_questionnaire");
    $("#if_heard_of").hide();
    $( "#heard_of" ).change(function() {
      if ($("#heard_of").val() == "yes") {
        $("#if_heard_of").show();
      } else {
        $("#if_heard_of").hide();
      }
    });
    $(".err").hide();
    var what_is_fixed = "";
    //submit to turk (using mmturkey)
    $("#formsubmit").click(function() {
      var what_about = $("#what_about").val();
      var comments = $("#comments").val();
      var gender = $("#gender").val();
      var heard_of = $("#heard_of").val();
      var hear_more = $("#hear_more").val();
      what_is_fixed = $("#what_is_fixed").val();
      if (gender != "" && heard_of != "" && (heard_of == "no" || what_is_fixed != "")) {
        experiment.data["what_about"] = what_about;
        experiment.data["comments"] = comments;
        experiment.data["gender"] = gender;
        experiment.data["heard_of"] = heard_of;
        experiment.data["hear_more"] = hear_more;
        experiment.data["what_is_fixed"] = what_is_fixed;
        var endTime = Date.now();
        experiment.data["duration"] = endTime - startTime;
        showSlide("finished");
        setTimeout(function() { turk.submit(experiment.data) }, 1000);
      } else {
        $(".err").show();
      }
    });
  }
}

