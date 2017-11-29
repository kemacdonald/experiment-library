function score_entity() {
  scores = {}
  for (q_shape of shapes) {
    scores[q_shape] = 0
    for (a_shape of shapes) {
      correct = exp["e_pretest"][`${q_shape}_${a_shape}`] == subset_shapes[q_shape][a_shape]
      scores[q_shape] += correct
    }
  }
  exp["e_scores"] = scores
  return scores
}

// Basic inputs
conditions = ["baseline", "active", "responsive"]
shapes = ["square", "rectangle", "rhombus", "parallelogram"];
num_examples_each_shape = 4;
max_num_blocks = 15;
trials_in_block = 16;
max_trials = max_num_blocks * trials_in_block;
num_correct_block = 0;
correct_blocks_counter = 0;

exp = {
  data: [],
  num_examples_to_show: 3,
  num_examples_clicked: 0,
  instruction_wait_time: 0, // this should be 3 seconds
  feedback_wait_time: 500
}

// urls are of the form: https://website.com/?shape=0&condition=0&assignmentId=123RVWYBAZW00EXAMPLE456RVWYBAZW00EXAMPLE&hitId=123RVWYBAZW00EXAMPLE&turkSubmitTo=https://www.mturk.com/&workerId=AZ3456EXAMPLE

// the shape parameter is either 0,1,2,3, or r for the items in the `shapes` list or random
// the condition parameter is either 0,1,2,3, or r for items in the `conditions` list or random

//set parameters based on url
url = $.url()
shape_param = url.attr('shape') || 'r'
cond_param = url.attr('condition') || 'r'
exp.shape =  shape_param == 'r' ? _.sample(shapes) : shapes[shape_param]
exp.condition =  cond_param == 'r' ? _.sample(conditions) : conditions[shape_param]


// now build some useful data
pluralize_shapes = {"square":"squares", "rectangle":"rectangles", "rhombus":"rhombuses", "parallelogram":"parallelograms"};
subset_shapes = {
  "parallelogram": {
    "square":true,
    "rhombus":true,
    "rectangle":true,
    "parallelogram":true},
  "rectangle": {
    "square":true,
    "rhombus":false,
    "rectangle":true,
    "parallelogram":false},
  "rhombus": {
    "square":true,
    "rhombus":true,
    "rectangle":false,
    "parallelogram":false},
  "square": {
    "square":true,
    "rhombus":false,
    "rectangle":false,
    "parallelogram":false},
}

shape_pairs = []; training_shape_pairs = [];
for (shape1 of shapes) {
  for (shape2 of shapes) {
      training_shape_pairs.push([shape1, shape2]);
    if (shape1 != shape2){
      shape_pairs.push([shape1, shape2])
    }
  }
}

// each of these should have a div in the html file
// here, we pair each slide with a constructor and check function

// SLIDES
// the way slides are going to work is that each slide will have a constructor that uses jquery to build it out of html and a destructor that runs after the constructor, sets the conditions for either destruction or the creation of a "next" button, and determines what goes into that button.
// the slide array is a stack. next_slide pops off the top and executes a constructor and destructor. the order the slides should be in might seem opposite of what's expected. like [last_slide, ..., second_slide, first_slide]
// we are going to build the stack to include a possible 256 training trials (16 trials in each block * 15 blocks)
// we also include a block summary trial at the end of each block

slides= [
  { name: "survey",
     constructor: survey_constructor,
     destructor: survey_destructor },
  { name: "relational_posttest",
    constructor: function() { relational_slide("posttest") },
    destructor: function () {return "boop"} },
  { name: "instructions_2",
    constructor: instructions_constructor_2,
    destructor: instructions_destructor_2 },
  { name: "relational_pretest",
    constructor: function() { relational_slide("pretest") },
    destructor: function () {return "boop"} },
  { name: "instructions_1",
    constructor: instructions_constructor,
    destructor: instructions_destructor },
  ]

// build the stack of training trials
// array with 256 training trials, and 16 summary trials at the end of each block
// keep separated from experiment slide stack because training can be of variable length
// for the active condition, length of training is not variable and is set to 6 blocks

training_trials_slides = [];training_trials_array = [];
for (i = 0; i < max_num_blocks; i++) {
  // randomize order of shape pairs for each block
  training_shape_pairs = _.shuffle(training_shape_pairs)
  for (pair in training_shape_pairs) {
    // build array of training trial info
    training_trial = {
      shape_pair: training_shape_pairs[pair],
      trial_num_within_block: Number(pair) + 1,
      block: i + 1
    }
    training_trials_array.push(training_trial);
    // build slide stack
    training_trials_slides.unshift({ name: "training",
     constructor: training_constructor,
     destructor: training_destructor })
  }
  // add summary trial at the end of each block
  training_trials_slides.unshift({ name: "block_summary",
    constructor: block_summary_constructor,
    destructor: block_summary_destructor })
}

function show_next_slide(slides) {
  $( ".slide" ).remove();
  next_slide = slides.pop();
  next_slide.constructor()
  //next_slide.destructor()
}

show_next_slide(slides) // should be slides

// "entity_pretest", "relational_pretest", "training", "entity_posttest", "relational_posttest", "survey", "goodbye"]

function instructions_constructor() {
  slide = $("<div class='slide' id='instructions-slide' >")
  text = $("<div class='block-text' id='instructions-text'>"); slide.append(text)
  text.append($("<p>").html("In this experiment, we're interested in your judgments about the membership of shapes into geometric classes. First you will answer some questions, then you will be shown a series of examples, and then you will be asked to answer additional questions. It should take about 10 minutes."))
  text.append($("<p>").html("(Note: you won't be able to preview this HIT before accepting it.)"))
  text.append($("<p>").html("By answering the following questions, you are participating in a study being performed by cognitive scientists in the Stanford Department of Psychology. If you have questions about this research, please contact us at langcoglab@stanford.edu. You must be at least 18 years old to participate. Your participation in this research is voluntary. You may decline to answer any or all of the following questions. You may decline further participation, at any time, without adverse consequences. Your anonymity is assured; the researchers who have requested your participation will not receive any personal information about you."))
  text.append($("<p>").html("We have recently been made aware that your public Amazon.com profile can be accessed via your worker ID if you do not choose to opt out. If you would like to opt out of this feature, you may follow instructions available <a href ='http://www.amazon.com/gp/help/customer/display.html?nodeId=16465241'> here.  </a>"))
  text.append($("<p>").html("The button to proceed is delayed for 3 seconds to ensure that you have read these instructions."))
  $("body").append(slide)
  $(".slide").hide(); slide.show()
  instructions_destructor();
}

function instructions_destructor() {
  // wait x*1,000 milliseconds before showing next button
  if (turk.previewMode == false) {
    setTimeout(function(){
      $("#instructions-text").append(
        $("<p>").append(
          $("<button id='start_button'>").text("Next").click(function(){
            exp_start_time = new Date(); // log start time of experiment
            show_next_slide(training_trials_slides) // should be slides
          })))
     },1000*exp.instruction_wait_time)

  }
}

function instructions_constructor_2() {
  slide = $("<div class='slide' id='instructions2-slide' >")
  text = $("<div class='block-text' id='instructions2-text'>"); slide.append(text)
  // slide.append($("<img src='images/stanford.png' alt='Stanford University'>"))
  text.append($("<p>").html("Now you will see a series of squares, rhombuses, rectangles, and parallelograms. You will be asked to identify each example and given feedback to help you learn."))
  text.append($("<p>").html("<b>To respond to each question, you can either click the 'Yes' or 'No' buttons, or you can press the 'Z' or 'M' keys.</b>"))
  text.append($("<p>").html("You will advance to the final test questions once you correctly identify all the examples for 2 blocks in a row or you complete 15 total training blocks."))
  text.append($("<p>").html("You will see a summary of your performance after each block to see your progress."))
  text.append($("<p>").html("Note: We are interested in how people learn from examples. So please do not use any external aids (e.g., pen and paper or google). Thanks!"))
  $("body").append(slide)
  $(".slide").hide(); slide.show()
  instructions_destructor_2();
}

function instructions_destructor_2() {
  // wait x*1,000 milliseconds before showing next button
  setTimeout(function(){
    $("#instructions2-text").append(
      $("<p>").append(
        $("<button>").text("Next").click(function(){
          show_next_slide(training_trials_slides)
        })))
  },1000*exp.instruction_wait_time)
}

// make a slide for the relational test.
// Assumes that the HTML for the #relational_${test_id} div is already on page.
function relational_slide(test_id) {
  slide = $(`<div class='slide' id='relational_${test_id}' >`)
  text = $(`<div class='block-text' id='relational_text_${test_id}'>`); slide.append(text)
  table = $("<table align='center'>")
  for (pair of _.shuffle(shape_pairs)) {
    shape1 = pair[0]; shape2 = pair[1];
    shape1_plural = pluralize_shapes[shape1]; shape2_plural = pluralize_shapes[shape2];
    if (shape1 != shape2) {
      row = $("<tr>")
      q_id = `r_${test_id}_${shape1}_${shape2}`
      row.append(
        $("<td>").text(`Are all ${shape1_plural} also ${shape2_plural}?`),
        $(`<div class='btn-group' id=${q_id}>`).append(
          $(`<button class="btn btn-default">`)
            .text('Yes')
            .click( relational_click ),
          $(`<button class="btn btn-default">`)
            .text('No')
            .click( relational_click )
        )
      )
      table.append(row)
    }
  }
  text.append(
    $('<p>').html("Now for a few questions. (Note: The next button will appear once you have answered all the questions.)"),
    $('<p>').html("Please answer yes or no on each of the questions:"),
    table)
  $("body").append(slide)
  $(".slide").hide(); slide.show()
}

function relational_click() {
  // get id
  test_id = $(this).parents(".slide").attr("id").split("_").pop()
  // change which one is active
  $(this).addClass('active')
  $(this).siblings().removeClass( 'active' )
  $(this).blur();
  // grab data from elements using jquery-fu
  question_divs = $(this).parent().parent().siblings().addBack().children("div")
  exp["r_questions_" +test_id] = _.map(question_divs, function(q){ return $(q).attr("id")})
  exp["r_answers_" +test_id] = _.map(question_divs, function(q){
    return $(q).children(".active").text() })
  // make sure ss have answered all questions, then advance
  if (_.every(exp["r_answers_" +test_id]) && $('#r_button_' +test_id).length == 0) {
    $(this).parents(".block-text").append(
      $("<p>").append(
        $(`<button id='r_button_${test_id}'>`).text("Next").click(function(){
          score_relational_test(exp["r_questions_" +test_id], exp["r_answers_" +test_id])
          if (test_id == "pretest"){show_next_slide(slides)} // switch to training trials stack
          if (test_id == "posttest"){show_next_slide(slides)} // switch to training trials stack
        })))
  }
}

function score_relational_test(r_questions_array, r_answers_array) {
  counter = 0;
  for ( q in exp.r_questions_pretest ) {
    counter += 1;
    // get values we need to score trial
    q_shape = r_questions_array[q].split("_")[3];
    q_question = r_questions_array[q].split("_")[2];
    ss_response = r_answers_array[q];
    ss_response_bool = r_answers_array[q] == "Yes";
    correct_response = subset_shapes[q_shape][q_question];
    // score trial
    trial_correct = ss_response_bool == correct_response;
    // log data
    trial_data = {
      trial_type: "relational",
      block: test_id,
      trial_num_within_block: counter,
      response: ss_response,
      correct: trial_correct,
      shape: q_shape,
      question: q_question,
      trial_time: "NA"
    }
    exp.data.push(trial_data);
  }
}

function block_summary_constructor() {
  // update block counter
  if ( num_correct_block == 16 ) {
    correct_blocks_counter++;
  } else {
    correct_blocks_counter = 0; // reset block counter if ss doesn't answer all questions correctly
  }
  slide = $("<div class='slide' id='block-summary-slide' >")
  text = $("<div class='block-text' id='block-summary-text'>"); slide.append(text)
  text.append($("<p>").html(`You just finished training block ${trial.block}. And you got ${num_correct_block} out of 16 questions correct.`))
  if ( correct_blocks_counter == 2 ) {
    text.append($("<p>").html(`Since you answered all training questions correctly for 2 blocks in a row, you will now advance to the final test questions!`))
  } else {
    text.append($("<p>").html(`You currently have ${correct_blocks_counter} blocks in a row correct.`))
    text.append($("<p>").html("Remember, you will proceed to the final test questions once you correctly identify all the examples for 2 blocks in a row, or you complete 15 total training blocks."))
  }
  
  $("body").append(slide)
  $(".slide").hide(); slide.show()
  block_summary_destructor();
}

function block_summary_destructor() {
  setTimeout(function(){
    $("#block-summary-text").append(
      $("<p>").append(
        $("<button>").text("Next").click(function(){
          // reset witihin block correct counter
          num_correct_block = 0;
          // check if ss got two blocks in a row, or if the training trials array is empty
          // if yes, proceed to relational posttest, otherwise, continue training
           if ( correct_blocks_counter == 2 || typeof training_trials_array[0] == 'undefined') {
              exp.training_complete = true
              show_next_slide(slides);
           } else {
              show_next_slide(training_trials_slides);
           }
        })))
  },1000)
}

/*function entity_slide(test_id) {
  slide = $(`<div class='slide' id='relational_${test_id}' >`)
  text = $(`<div class='block-text' id='relational_text_${test_id}'>`); slide.append(text)
  text.append(
      $("<p>").html("In the following questions please select <i>all</i> correct answers."))
  for (q_shape of _.shuffle(shapes)) {
    table = $("<table align='center'>"); row = $("<tr>")
    text.append(
      $("<p>").html(`Which is a ${q_shape}?`),
      table.append(row))
    for (a_shape of _.shuffle(shapes)) {
      a_id = `e_${test_id}_${q_shape}_${a_shape}`
      a_img_src = `shapes/${a_shape}_${_.random(1,3)}.png`
      row.append(
        $("<td>").append(
          $(`<img id="${a_id}" class="withoutHover objTable" width="100px" height="100px" src="${a_img_src}">`).click(
            entity_click)))
    }
  }
  text.append($("<p>").append($("<button>").text("Next").click(
    function(){ show_next_slide(slides) })))
  $("body").append(slide)
  $(".slide").hide(); slide.show()
}

function entity_click() {
  test_id = $(this).parents(".slide").attr("id").split("_").pop()
  $(this).toggleClass("highlighted")
  responses = {}
  for (q_shape of shapes) {
    for (a_shape of shapes) {
      responses[`${q_shape}_${a_shape}`] = $(`#e_${test_id}_${q_shape}_${a_shape}`).hasClass("highlighted")
    }
  }
  exp[`e_${test_id}`] = responses
}*/

/*function baseline_training (){
return ""
}

function active_training (){
return ""
}

function responsive_training (){
  scores = score_entity()
  min_score = _.min(score_entity()) // run code to score entity test
  min_shapes = _.filter(_.keys(scores))

return ""
}*/

// creates a randomized table that responds to clicks according quadmods logic
function example_table(shape_of_focus) {

  example_images = []
  for (shape of shapes) {
    for (i of _.range(3)) {
      example_images.push(`${shape}_${ i+1 }`)
    }
  }
  table = $("<table align=center>")
  for (i of _.range(4)) {
    row = $("<tr>")
    for (j of _.range(3)) {
      img = example_images[i]
      console.log(i)
      row.append( $("<td>").append(
        $(`<img width=100px height=100px id="${img}" class="unchosen" onclick="click_shape('${img}')" src="shapes/${img}.png">`)
      ))
    }
    table.append(row)
  }
  return table
}

function click_shape(img_id) {
  if (exp.num_examples_clicked == exp.num_examples_to_show) {
    return
  } else {
    shape = img_id.split("_")[0]
    correct = _.contains(exp.subset_shapes(),shape)
    $(`#${img_id}`).addClass(correct ? "chosenCorrect" : "chosenIncorrect").removeClass("unchosen")
    exp.num_examples_clicked += 1
  }
}

// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function training_constructor() {

  exp.training_complete = false
	training_start_time = new Date();
  slide = $("<div class='slide' id='training' >");
  // build string to display image
  trial = training_trials_array.shift();
  question = trial.shape_pair[0];
  shape = trial.shape_pair[1];
  img_index = String(getRandomIntInclusive(1,3));
  img = shape.concat("_", img_index);
  img_html = $(`<img width=300px height=300px id="${img}" src="shapes/${img}.png">`);
  // display image
  slide.append(img_html);
  // display question
  slide.append($("<p class='training_text'>").html(`Is this a ${question}?`));

  // display table
  slide.append($(example_table()));

  // display y/n buttons
  // here we use .one to only allow one response on each slide/trial
  // we then pass the event to the feedback function for scoring
  $(window).on("keypress", function (event) {
    if (exp.training_complete) { return }
    if (event.which == 122) {training_feedback($("button.yes"))}
    if (event.which == 109) {training_feedback($("button.no"))}
  })
  slide.append($(`<div class='btn-group' id="${img}">`),
          $(`<button class="btn btn-default yes" value='Yes'>`)
            .text('Yes (z)')
            .one("click", function(){ training_feedback($(this)) }),
          $(`<button class="btn btn-default no" value='No'>`)
            .text('No (m)')
            .one("click", function(){ training_feedback($(this)) }))
  $("body").append(slide)
  $(".slide").hide(); slide.show()
}

function training_feedback(click_event) {
  // disable event handlers, so user can only submit one response per trial
  $(':button').off("click");
  $(window).off("keypress");

  training_end_time = new Date();
  // change which one is active
  click_event.addClass('active')
  click_event.siblings().removeClass( 'active' )
  click_event.blur();
  // check response against key
  ss_response = click_event.val();
  ss_response_bool = click_event.val() == "Yes";
  correct_response = subset_shapes[question][shape];
  trial_correct = ss_response_bool == correct_response;
  // give feedback
  if ( trial_correct == true ) {
    slide.append($("<p class='feedback_text'>").html(`Correct`).css("color", "green"));
  } else {
    slide.append($("<p class='feedback_text'>").html(`Incorrect`).css("color", "red"));
  }
  score_training();
  training_destructor();
}

function score_training() {
  // store num correct on block
  if ( trial_correct == true ) {num_correct_block++};
  // get trial training time
  trial_training_time = training_end_time - training_start_time;
  // log training data (trial level data storage)
  trial_data = {
    trial_type: "training",
    block: trial.block,
    trial_num_within_block: trial.trial_num_within_block,
    response: ss_response,
    correct: trial_correct,
    shape: shape,
    question: question,
    trial_time: trial_training_time
  };
  exp.data.push(trial_data);
}

function training_destructor() {
  // wait some amount of time (defined above) before moving to the next training trial
  setTimeout(function(){ show_next_slide(training_trials_slides)}, exp.feedback_wait_time)
}

function survey_constructor() {
  slide = $("<div class='slide' id='final_survey' >")

  text = $("<div class='block-text' id='survey-text'>"); slide.append(text)
  text.append($("<p>").html("Thank you for taking our HIT. Please answer the following questions."))
  text.append($("<p>").html('What was this survey about? <br> <input type="text" id="about" name="about" size="70">'))
  text.append($("<p>").html('How can we make this experiment better? <br> <input type="text" id="better" name="better" size="70">'))
  text.append($("<p>").html('Was anything unclear? <br> <input type="text" id="unclear" name="unclear" size="70">'))
  text.append($("<p>").html('Did you use any external learning aids (e.g. pencil and paper)? <br> <input type="text" id="external_aid" name="external_aid" size="70">'))
  text.append($("<p>").html('Did you use any particular strategy to learn the shapes? <br> <input type="text" id="strategy" name="strategy" size="70">'))
  text.append($("<p>").html('Any other comments for us? <br> <input type="text" id="comments" name="comments" size="70">'))
  text.append($("<p>").html('What is your age? <br> <input type="text" id="age" name="age" size="20">'))
  text.append($("<p>").html('What is your gender? (m = male, f = female, o = other) <br> <input type="text" id="gender" name="gender" size="20">'))

  finished_button = $("<button>").text("Submit to Turk").click(function(){end_exp()});
  text.append(finished_button)

  $("body").append(slide)
  $(".slide").hide(); slide.show()
}

function survey_destructor() {
}

function end_exp() {
  // check survey data,then submit exp to turk
  if ($('#about').val().length != 0) {
    exp_end_time = new Date(); // log end time of experiment
    slide = $("<div class='slide' id='finished' >")
    text = $("<div class='block-text' id='finished_text'>"); slide.append(text)
    text.append($("<p>").html("You're finished - thanks for participating! Submitting to Mechanical Turk..."))
    $("body").append(slide)
    $(".slide").hide(); slide.show()
    // store survey data
    exp.about = $('#about').val();
    exp.better = $('#better').val();
    exp.unclear = $('#unclear').val();
    exp.comment = $('#comments').val();
    exp.external_aid = $('#external_aid').val();
    exp.strategy = $('#strategy').val();
    exp.age = $('#age').val();
    exp.gender = $('#gender').val();
    exp.exp_total_time = exp_end_time - exp_start_time;
    // submit to turk
    setTimeout(function () {
      turk.submit(exp);
    }, 500);
  } else {
    text.append($("<p style='color:red'>").html('Please answer the first question before submtting.'))
  }
}
