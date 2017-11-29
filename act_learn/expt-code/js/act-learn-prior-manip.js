/*Shows slides. We're using jQuery here the $ is the jQuery selector function, 
which takes as input either a DOM element or a CSS selector string. */
function showSlide(id) {

  $(".slide").hide();  //Hide all slides
  $("#"+id).show(); //Show just the slide we want to show
}

/*Get random integers. When called with no arguments, it returns either 0 or 1. 
When called with one argument, a, it returns a number in [0,a-1]. 
When called with two arguments, a and b, returns a random value in [a,b]. */

function random(a,b) {
  if (typeof b == "undefined") {
    a = a || 2;
    return Math.floor(Math.random()*a);
  } else {
    return Math.floor(Math.random()*(b-a+1)) + a;
  }
}

// returns selected elements and creates a new array with those elements (called 'foo')

function range(start, end)
{
    var foo = [];
    for (var i = start; i <= end; i++)
        foo.push(i);
    return foo;
}

/**
*  from
*  http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
* Randomize array element order in-place.
* Using Fisher-Yates shuffle algorithm.
*/
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function shuffleObjectArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

/*Randomly return an element from an array. Useful for condition randomization.*/
Array.prototype.random = function() {
  return this[random(this.length)];
};

/* loads all of the images into the cache so they don't need to be individually
 * loaded at time of presentation. Ensures that experiment time happens as intended
 */
$.fn.preload = function() {
  this.each(function(){
        $('<img/>')[0].src = this;
    });
};

/* gets the linear scale factor 
* inputs: mins and maxes for parameter and stimulus scales
* returns: linear scale factor = ratio of the length of scales
*/

scaleFactor = function(min_param, max_param, min_stim, max_stim) {
    range_param = max_param - min_param;
    range_stim = max_stim - min_stim;
    scale_factor = range_param / range_stim;
    return scale_factor;
};

/* convert array of parameter values to stimulus values 
* inputs: parameter value, scaling factor, and min value of stimulus scale
* returns: array of values on stimulus scale
*/

convertParamStim = function(param_array, scale_factor, min_stim_scale) {
    var stim_array = [];

    for(i=0; i < param_array.length; i++) {
      stim_value = Math.floor((param_array[i] / scale_factor) + min_stim_scale)
      stim_array.push(stim_value);
    }

    return stim_array;
};

/* convert stimulus values to parameter values 
* inputs: stimulus value, scaling factor, and min value of stimulus and param scale
* returns: value on parameter scale
*/

convertStimParam = function(stim_value, scale_factor, min_stim_scale, min_param_scale) {
    param_value = Math.floor(((stim_value - min_stim_scale) * scale_factor) + min_param_scale)
    return param_value
};

/* compute the perendicular distance from a point to a line */

perpDist = function(x_point, y_point, a_value, b_value, c_value) {
    distance = (a_value * x_point + b_value * y_point + c_value) / (Math.sqrt(Math.pow(a_value, 2) + Math.pow(b_value, 2)))
    return distance;
};


/* strips off the directory and suffix of image/sound/etc file names */
trim = function(item) {
  var tmp = item;
  return tmp.slice(tmp.lastIndexOf("/")+1,tmp.lastIndexOf(".")); 
};

/* Call Maker getter to get cond variables
 * Takes number and counts for each condition
 * Returns a condition number 
 */

var numConditions = 8

try { 
    var filename = "KM_act_learn_prior_manipulation_full_data_collection_good_2";
    var condCounts = "1,13;2,15;3,14;4,13;5,6;6,4;7,13;8,12";
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://langcog.stanford.edu/cgi-bin/KM/subject_equalizer_km/maker_getter.php?conds=" + condCounts + "&filename=" + filename, false );
    xmlHttp.send( null );
    var cond = xmlHttp.responseText; // For actual experimental runs
} catch (e) {
    var cond = random(1,numConditions); // if maker-getter fails, generate condition number randomly
}

var order, training_condition, flag = "true";

cond = cond.toString();

/* Set up experiment based on condition */

switch (cond) {
    case "1":
        experimental_condition = "match-rb-rb";
        training_condition = "active_active";
        framing_condition = "rule-based";
        order = "order1";
        category_type = "rule-based"
        break;
    case "2":
        experimental_condition = "mismatch-ii-rb";
        training_condition = "active_active";
        framing_condition = "information-integration";
        order = "order1";
        category_type = "rule-based"
        break;
    case "3":
        experimental_condition = "match-rb-rb";
        training_condition = "active_active";
        framing_condition = "rule-based";
        order = "order2";
        category_type = "rule-based"
        break;
    case "4":
        experimental_condition = "mismatch-ii-rb";
        training_condition = "active_active";
        framing_condition = "information-integration";
        order = "order2";
        category_type = "rule-based"
        break;
    case "5":
        experimental_condition = "match-ii-ii";
        training_condition = "active_active";
        framing_condition = "information-integration";
        order = "order1";
        category_type = "information-integration"
        break;
    case "6":
        experimental_condition = "mismatch-rb-ii";
        training_condition = "active_active";
        framing_condition = "rule-based";
        order = "order1";
        category_type = "information-integration"
        break
    case "7":
        experimental_condition = "match-ii-ii";
        training_condition = "active_active";
        framing_condition = "information-integration";
        order = "order2";
        category_type = "information-integration"
        break;
    case "8":
        experimental_condition = "mismatch-rb-ii";
        training_condition = "active_active";
        framing_condition = "rule-based";
        order = "order2";
        category_type = "information-integration"
        break
}


// Variable assignment for use later in experiment

/*Create raphael canvas and elements*/
var paper_width = 520;
var paper_height = 520;
var max_radius = (paper_width / 2) - 5;
var min_radius = 15;
var radius_range = max_radius - min_radius;
var third_radius_scale = radius_range / 3;
var min_orientation = 0;
var max_orientation = 150;
var orientation_range = max_orientation - min_orientation;
var third_orientation_scale = orientation_range / 3;

/* Experiment logic */
var num_correct_in_block = 0;
var num_blocks = 2;
var num_trials_block = 48;
var num_trials = num_trials_block * num_blocks;
var num_training_trials_block = 16;
var num_training_trials_experiment = num_training_trials_block * num_blocks
var num_test_trials_block = 32;
var num_trials_block = num_training_trials_block + num_test_trials_block;

/* parameter values for training trials: 
* generated from gaussians (done in R) 
*/

// Rule-based Order 1: optimal decision boundary = 300 converted to radius scale
var rb_catA1radii_param = [218,149,198,240,179,207,237,217,189,134,300,176,204,269,245,312];
var rb_catA1orientations_param = [439,143,319,231,284,369,265,299,355,272,167,291,234,226,465,343];
var rb_catB1radii_param = [374,454,328,378,428,447,419,394,464,361,339,404,343,403,397,369];
var rb_catB1orientations_param = [252,303,327,338,283,322,182,101,251,301,204,399,287,302,294,351];

// Rule-based Order 2: optimal decision boundary = 300 converted to orientation scale
var rb_catA2radii_param = [374,186,176,317,200,356,387,356,325,273,318,461,312,180,314,370];
var rb_catA2orientations_param = [216,190,170,130,254,269,292,245,147,188,275,297,226,243,191,203];
var rb_catB2radii_param = [271,494,292,548,219,301,75,381,431,381,321,298,276,357,396,198];
var rb_catB2orientations_param = [385,428,474,394,343,458,308,343,359,351,381,427,412,360,342,391];

// Information integration Order 1: optimal decision boundary is a function: y = x
var ii_catA1radii_param = [277,189,164,194,179,284,329,293,336,225,398,265,253,219,222,166];
var ii_catA1orientations_param = [381,285,255,311,285,385,418,389,440,325,500,332,369,335,318,262];
var ii_catB1radii_param = [329,299,379,388,426,299,283,379,315,427,223,280,472,324,423,347];
var ii_catB1orientations_param = [221,192,280,269,334,208,182,291,236,326,114,177,356,247,328,231];

// Information integration Order 2: optimal decision boundary is a function: y = -x
var ii_catA2radii_param = [288,148,179,163,299,251,236,201,156,252,334,336,325,217,266,341];
var ii_catA2orientations_param = [209,368,318,339,189,243,266,295,333,238,166,191,164,263,253,156];
var ii_catB2radii_param = [384,378,196,363,398,313,448,365,298,380,357,446,355,380,274,255];
var ii_catB2orientations_param = [306,306,509,332,292,398,268,328,378,331,349,266,328,322,435,444];


/* parameter values for test trials:
* generated from uniform grid (done in R)
* sampled 8 from each quadrant of parameter space
* w/o replacement
*/

var test_radii_param = [201,599,140,563,288,526,211,584,255,325,294,509,212,357,12,586,113,310,274,323,142,522,70,517,65,565,267,519,231,330,199,492,70,399,235,592,69,507,236,464,33,414,53,423,213,438,39,579,256,434,76,360,78,516,139,323,234,454,107,576,79,463,175,304];
var test_orientations_param = [504,334,214,229,476,409,200,295,387,434,264,108,356,528,279,123,357,412,38,48,526,581,212,184,317,467,122,160,573,418,255,289,360,373,166,177,595,367,95,169,456,521,248,86,310,410,295,226,355,505,160,249,328,506,174,90,441,333,82,195,433,565,216,12];

// set min and max for parameter scale
var min_param_scale = 1;
var max_param_scale = 600;

// set min and max for stimulus scales: radius and orientation
var radius_lower_limit = random(min_radius,third_radius_scale);                // randomize minimum radius value
var radius_upper_limit = max_radius;                                           // max radius is constrained by the bounding box
var rotation_lower_limit = random(min_orientation, max_orientation);   		   // randomize min orientation value
var rotation_upper_limit = rotation_lower_limit + 150;                         // max orientation is min value + 150
var rotation_midpoint = ((rotation_upper_limit - rotation_lower_limit) / 2) + rotation_lower_limit;


// get scaling factor to convert between scales
var scale_factor_radius = scaleFactor(min_param_scale, max_param_scale, radius_lower_limit, radius_upper_limit);
var scale_factor_orientation = scaleFactor(min_param_scale, max_param_scale, rotation_lower_limit, rotation_upper_limit);


// convert training trials parameter space values to stimulus space values 

// rule-based order 1
var rb_catA1radii_stim = shuffle(convertParamStim(rb_catA1radii_param, scale_factor_radius, radius_lower_limit));
var rb_catA1orientations_stim = shuffle(convertParamStim(rb_catA1orientations_param, scale_factor_orientation, rotation_lower_limit));
var rb_catB1radii_stim = shuffle(convertParamStim(rb_catB1radii_param, scale_factor_radius, radius_lower_limit));
var rb_catB1orientations_stim = shuffle(convertParamStim(rb_catB1orientations_param, scale_factor_orientation, rotation_lower_limit));

// information integration order 1
var ii_catA1radii_stim = shuffle(convertParamStim(ii_catA1radii_param, scale_factor_radius, radius_lower_limit));
var ii_catA1orientations_stim = shuffle(convertParamStim(ii_catA1orientations_param, scale_factor_orientation, rotation_lower_limit));
var ii_catB1radii_stim = shuffle(convertParamStim(ii_catB1radii_param, scale_factor_radius, radius_lower_limit));
var ii_catB1orientations_stim = shuffle(convertParamStim(ii_catB1orientations_param, scale_factor_orientation, rotation_lower_limit));

// convert test trials parameter space values to stimulus space values
var test_radii_stim = convertParamStim(test_radii_param, scale_factor_radius, radius_lower_limit);
var test_orientations_stim = convertParamStim(test_orientations_param, scale_factor_orientation, rotation_lower_limit);

// wrap in array of json objects for each antenna
var order1_antennas = [], order2_antennas = [], test_antennas = [], antenna_a, antenna_b;

// create passive training array Order 1 
// checking which category type: rule-based or information-integration
var antennas_block_passive = [];

for(i = 0; i < num_blocks; i++) {

    for(j = 0; j < num_training_trials_block / 2; j++) {

        if(category_type == "rule-based") {

            antenna_a = {
                radius: rb_catA1radii_stim.shift(),
                angle: rb_catA1orientations_stim.shift(),
                radius_param: rb_catA1radii_param.shift(),
                angle_param: rb_catA1orientations_param.shift(),
                category: "A",
                training_block: "receptive"
              };  

            antenna_b = {
              radius: rb_catB1radii_stim.shift(),
              angle: rb_catB1orientations_stim.shift(),
              radius_param: rb_catB1radii_param.shift(),
              angle_param: rb_catB1orientations_param.shift(),
              category: "B",
              training_block: "receptive"
            };


        } else { // information integration condition

            antenna_a = {
                radius: ii_catA1radii_stim.shift(),
                angle: ii_catA1orientations_stim.shift(),
                radius_param: ii_catA1radii_param.shift(),
                angle_param: ii_catA1orientations_param.shift(),
                category: "A",
                training_block: "receptive"
              };  

            antenna_b = {
              radius: ii_catB1radii_stim.shift(),
              angle: ii_catB1orientations_stim.shift(),
              radius_param: ii_catB1radii_param.shift(),
              angle_param: ii_catB1orientations_param.shift(),
              category: "B",
              training_block: "receptive"
            };
        }
        antennas_block_passive.push(antenna_a);
        antennas_block_passive.push(antenna_b);
    }

    // randomize order of training trials within block
    antennas_block_passive = shuffle(antennas_block_passive); 

}


// create block of active training trials
var antennas_block_active = [];

for(i = 0; i < num_blocks; i ++) {

    for(j = 0; j < num_training_trials_block / 2; j++) {

      var radius_a = random(radius_lower_limit, radius_upper_limit);
      var angle_a = random(rotation_lower_limit, rotation_upper_limit);

      antenna_a = {
          radius: radius_a,
          angle: angle_a,
          radius_param: convertStimParam(radius_a, scale_factor_radius, radius_lower_limit, min_param_scale),
          angle_param: convertStimParam(angle_a, scale_factor_orientation, rotation_lower_limit, min_param_scale),
          category: "NA",
          training_block: "active"
      };


      var radius_b = random(radius_lower_limit, radius_upper_limit);
      var angle_b = random(rotation_lower_limit, rotation_upper_limit);

      antenna_b = {
          radius: radius_b,
          angle: angle_b,
          radius_param: convertStimParam(radius_b, scale_factor_radius, radius_lower_limit, min_param_scale),
          angle_param: convertStimParam(angle_b, scale_factor_orientation, rotation_lower_limit, min_param_scale),
          category: "NA",
          training_block: "active"
      };

      antennas_block_active.push(antenna_a);
      antennas_block_active.push(antenna_b);

    }

antennas_block_active = shuffle(antennas_block_active);

}

// create order of training blocks: in this experiment, we just have two blocks of active learning
order1_antennas.push(antennas_block_active);
order1_antennas.push(antennas_block_active);

// rule based order 2
var rb_catA2radii_stim = shuffle(convertParamStim(rb_catA2radii_param, scale_factor_radius, radius_lower_limit));
var rb_catA2orientations_stim = shuffle(convertParamStim(rb_catA2orientations_param, scale_factor_orientation, rotation_lower_limit));
var rb_catB2radii_stim = shuffle(convertParamStim(rb_catB2radii_param, scale_factor_radius, radius_lower_limit));
var rb_catB2orientations_stim = shuffle(convertParamStim(rb_catB2orientations_param, scale_factor_orientation, rotation_lower_limit));

// information integration order 2
var ii_catA2radii_stim = shuffle(convertParamStim(ii_catA2radii_param, scale_factor_radius, radius_lower_limit));
var ii_catA2orientations_stim = shuffle(convertParamStim(ii_catA2orientations_param, scale_factor_orientation, rotation_lower_limit));
var ii_catB2radii_stim = shuffle(convertParamStim(ii_catB2radii_param, scale_factor_radius, radius_lower_limit));
var ii_catB2orientations_stim = shuffle(convertParamStim(ii_catB2orientations_param, scale_factor_orientation, rotation_lower_limit));

// create active training stimuli for Order 2 
var antennas_block_active_order2 = [];

for(i = 0; i < num_blocks; i++) {

    for(j = 0; j < num_training_trials_block / 2; j++) {

    var radius_a = random(radius_lower_limit, radius_upper_limit);
    var angle_a = random(rotation_lower_limit, rotation_upper_limit);

          antenna_a = {
              radius: radius_a,
              angle: angle_a,
              radius_param: convertStimParam(radius_a, scale_factor_radius, radius_lower_limit, min_param_scale),
              angle_param: convertStimParam(angle_a, scale_factor_orientation, rotation_lower_limit, min_param_scale),
              category: "NA",
              training_block: "active"
          };

        var radius_b = random(radius_lower_limit, radius_upper_limit);
        var angle_b = random(rotation_lower_limit, rotation_upper_limit);

          antenna_b = {
              radius: radius_b,
              angle: angle_b,
              radius_param: convertStimParam(radius_b, scale_factor_radius, radius_lower_limit, min_param_scale),
              angle_param: convertStimParam(angle_b, scale_factor_orientation, rotation_lower_limit, min_param_scale),
              category: "NA",
              training_block: "active"
          };

    antennas_block_active_order2.push(antenna_a);
    antennas_block_active_order2.push(antenna_b);

}

antennas_block_active_order2 = shuffle(antennas_block_active_order2);


}
    


// create passive training for order 2
var antennas_block_passive_order2 = [];

for(i = 0; i < num_blocks; i++) {

  for(j = 0; j < num_training_trials_block / 2; j++) {

    if(category_type == "rule-based") {

            antenna_a = {
                radius: rb_catA2radii_stim.shift(),
                angle: rb_catA2orientations_stim.shift(),
                radius_param: rb_catA2radii_param.shift(),
                angle_param: rb_catA2orientations_param.shift(),
                category: "A",
                training_block: "receptive"
            };

            antenna_b = {
                radius: rb_catB2radii_stim.shift(),
                angle: rb_catB2orientations_stim.shift(),
                radius_param: rb_catB2radii_param.shift(),
                angle_param: rb_catB2orientations_param.shift(),
                category: "B",
                training_block: "receptive"
            };
        } else {

            antenna_a = {
                radius: ii_catA2radii_stim.shift(),
                angle: ii_catA2orientations_stim.shift(),
                radius_param: ii_catA2radii_param.shift(),
                angle_param: ii_catA2orientations_param.shift(),
                category: "A",
                training_block: "receptive"
            };

            antenna_b = {
                radius: ii_catB2radii_stim.shift(),
                angle: ii_catB2orientations_stim.shift(),
                radius_param: ii_catB2radii_param.shift(),
                angle_param: ii_catB2orientations_param.shift(),
                category: "B",
                training_block: "receptive"
            };
          }
        antennas_block_passive_order2.push(antenna_a);
        antennas_block_passive_order2.push(antenna_b);
}

// randomize order of training trials within block
antennas_block_passive_order2 = shuffle(antennas_block_passive_order2);  

}



// create order of training blocks based on condition assignment
order2_antennas.push(antennas_block_active_order2);
order2_antennas.push(antennas_block_active_order2);


// create array of test antennas
var num_test_trials = 32 * num_blocks, test_antenna_stim, test_antennas_stim = [];

for(i = 0; i < num_blocks; i++) {
  var test_antennas_block = [];
  for(j = 0; j < num_test_trials_block; j++) {
    // get antenna values
    var radius_stim = test_radii_stim.shift();
    var radius_param = test_radii_param.shift();
    var angle_stim = test_orientations_stim.shift();
    var angle_param = test_orientations_param.shift();

    // check which quadrant this trial is in 
    if(radius_param <= 300 && angle_param > 300) {
      var quadrant = 1;
    } else if(radius_param > 300 && angle_param > 300) {
      var quadrant = 2;
    } else if(radius_param <=300 && angle_param <= 300) {
      var quadrant = 3;
    } else {
      var quadrant = 4;
    }

    test_antenna_stim = {
      radius: radius_stim,
      radius_param: radius_param,
      angle: angle_stim,
      angle_param: angle_param,
      quadrant: quadrant
    }
    // push into block array
    test_antennas_block.push(test_antenna_stim);
  }
  test_antennas_stim.push(shuffle(test_antennas_block));
}

// randomize order of test blocks
test_antennas_stim = shuffle(test_antennas_stim);

//draw raphael canvas
var paper = Raphael("antenna", paper_width, paper_height);

//get center points of paper
var centerX = paper_width / 2;
var centerY = paper_height / 2;

//console.log("order is: " + order);

/* get optimal decision boundary 
* if you are in the II condition, then the optimal decision boundary 
* is a linear function, which we will use to compute the orthagonal distance
* of participants' samples later in the experiment.
*
* if you are in the order 1 condition, the slope is positive. 
* if you are in order 2 condition, the slope is negative.
*/

if(category_type == "rule-based") {
  var optimal_decision_boundary_param = [300];
} else {
  if(order == "order1") {
    var optimal_decision_boundary_param = "y>x"
  } else {
    var optimal_decision_boundary_param = "y<x"
  }
}

// this checks whether the optimal decision boundary is on the radius or orientation scale
// and computes the optimal decision boundary on the stimulus scale
if(category_type == "rule-based") {
    if(order == "order1") {
      var optimal_decision_boundary_type = "radius";
      var optimal_decision_boundary_stim = convertParamStim(optimal_decision_boundary_param, scale_factor_radius, radius_lower_limit);
    } else {
      var optimal_decision_boundary_type = "orientation";
      var optimal_decision_boundary_stim = convertParamStim(optimal_decision_boundary_param, scale_factor_orientation, rotation_lower_limit);
    }
} else {
    if(order == "order1") {
      var optimal_decision_boundary_type = "y=x";
      var optimal_decision_boundary_stim = "y=x";
    } else {
      var optimal_decision_boundary_type = "y=-x";
      var optimal_decision_boundary_stim = "y=-x";
    }
}

/* build trials array */
var trials = [], trial_radius, trial_angle, 
trial_info, trial_type, trial_number = 0, 
trial_category, test_trial, trial_quadrant;

// add 2 active learning traning examples
var numExamples = 2;

for(i = 0; i < numExamples; i++) {
  trial_type = "active_example"

    antenna = {
      radius: random(radius_lower_limit, radius_upper_limit),
      angle: random(rotation_lower_limit, rotation_upper_limit),
      category: "NA",
    };

    trial_number++; 

     trial_info = {
          trial_number_experiment: trial_number,
          trial_number_block: i+1,
          block: "example",
          trial_type: trial_type,
          antenna_category: antenna.category,
          radius: antenna.radius,
          radius_param: convertStimParam(antenna.radius, scale_factor_radius, radius_lower_limit, min_param_scale),
          angle: antenna.angle,
          angle_param: convertStimParam(antenna.angle, scale_factor_orientation, rotation_lower_limit, min_param_scale),
          quadrant: "NA"
     }

    trials.push(trial_info);

}

for(i = 0; i < num_blocks; i++) {

    for(j = 0; j < num_trials_block; j++) {

        // first check what kind of trial: training or test
        if(j < num_training_trials_block) {
          trial_type = "training";
        } else {
          trial_type = "test";
        }

        // if a training trial, grab radius and angle values from appropriate arrays
        if(trial_type == "training") {
          // order determines whether category is defined by radius or orientation
          if(order == "order1") {
            training_trial = order1_antennas[i].shift(); // using i to index into antennas array
            trial_radius = training_trial.radius;
            trial_radius_param = training_trial.radius_param;
            trial_angle = training_trial.angle;
            trial_angle_param = training_trial.angle_param;
            trial_category = training_trial.category;
            trial_training_block = training_trial.training_block
          } else { 
            training_trial = order2_antennas[i].shift();
            trial_radius_param = training_trial.radius_param;
            trial_radius = training_trial.radius;
            trial_angle = training_trial.angle;
            trial_angle_param = training_trial.angle_param;
            trial_category = training_trial.category;
            trial_training_block = training_trial.training_block
          }
          trial_number++; 
        } else { // get test trials
            test_trial = test_antennas_stim[i].shift()
            trial_radius = test_trial.radius;
            trial_angle =  test_trial.angle;
            trial_radius_param = test_trial.radius_param;
            trial_angle_param = test_trial.angle_param;
            trial_quadrant = test_trial.quadrant;
            // figure out which category type: rule-based vs. information integration
            // then, figure out which category test antenna is from 
            if (category_type == "rule-based") {
                if(order == "order1") { // order 1 you check radius 
                   if(trial_radius < optimal_decision_boundary_stim) {
                      trial_category = "A";
                    } else {
                      trial_category = "B";
                    }
                 } else { // order 2 you check orientation
                    if(trial_angle < optimal_decision_boundary_stim) {
                      trial_category = "A";
                    } else {
                      trial_category = "B";
                    }
                }
            } else { // otherwise you are in the information integration condition 
                if (order == "order1") {
                   if (trial_angle_param > trial_radius_param) { // y = x, if y value (radius) is bigger than x value then category A
                      trial_category = "A";
                    } else {
                      trial_category = "B";
                    }
                } else {
                    if (trial_angle_param < 600 - trial_radius_param) { // y = -x, if y value (radius) is smaller than x value then category A
                      trial_category = "A";
                    } else {
                      trial_category = "B";
                    }
                }
            }
          trial_number++; 
        }

        trial_info = {
          trial_number_experiment: trial_number,
          trial_number_block: j+1,
          block: i+1,
          trial_type: trial_type,
          antenna_category: trial_category,
          radius: trial_radius,
          radius_param: trial_radius_param,
          angle: trial_angle,
          angle_param: trial_angle_param,
          quadrant: trial_quadrant,
          training_block: trial_training_block
        }

        trials.push(trial_info);
    }

}

// console.log("order is: " + optimal_decision_boundary_stim);
// console.log(trials);


//initialize progress bar 
$(".progress").progressbar();
$(".progress").progressbar( "option", "max", num_trials);


//Show instruction slide
showSlide("instructions"); 

//disable accept button if in turk preview mode
$("#start_button").click(function() {
    if (BrowserDetect.browser != 'Chrome' && turk.previewMode) {
       showSlide("instructions");
       alert("Warning this HIT will only work in Google Chrome. Please switch to if you would like to accept this HIT. Thanks!")
    } else if (turk.previewMode) {
      showSlide("instructions");
      alert("Please accept HIT to view");
    } else if (BrowserDetect.browser != 'Chrome') {
          showSlide("instructions");
          alert("Warning this HIT will only work in Google Chrome. Please switch to if you would like to accept this HIT. Thanks!")
    } else {
      
      // check which framing condition we are in and show the corresponding task framing

      if (framing_condition == "rule-based") {
          $("#instructions_text_rb").attr("style", "display: block");
          $("#instructions_text_ii").attr("style", "display: none");
      } else {
          $("#instructions_text_rb").attr("style", "display: none");
          $("#instructions_text_ii").attr("style", "display: block");
      }

      // show instructions slide
      showSlide('instructions2')

    }
});


// This is where we define the experiment variable, 
// which tracks all the information we want to know about the experiment.

var experiment = {
  condition: training_condition,
  framing_condition: framing_condition,
  experimental_condition: experimental_condition,
  order: order,
  data: [],
  subj_data: "",
  odb_scale: optimal_decision_boundary_type,
  odb_param: optimal_decision_boundary_param,
  odb_stim: optimal_decision_boundary_stim,
  category_type: category_type,
  num_trials: num_trials,
  num_blocks: num_blocks,
  browser: BrowserDetect.browser,
  screen_width: $( window ).width(),
  screen_height: $( window ).height(),
  scale_factor_radius: scale_factor_radius,
  scale_factor_orientation: scale_factor_orientation,

  /*The function that gets called when the sequence is finished. */
  end: function() {

    // decrement maker-getter if this is a turker 
    if (turk.workerId.length > 0) {
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest()
        xmlHttp.open("GET", "https://langcog.stanford.edu/cgi-bin/KM/subject_equalizer_km/decrementer.php?filename=" + filename + "&to_decrement=" + cond, false);
        xmlHttp.send(null)

    }

    // store values from q and a 
    experiment.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
      };

    // show finished slide
    showSlide("finished"); 
    // Submit to turk
    setTimeout(function() {   
      turk.submit(experiment)
        }, 1500);
    },

  /*shows a blank screen*/
  blank: function() {
    // update progress bar
    $(".progress").progressbar("option", "value", ($(".progress").progressbar( "option", "value")+1));
    // hide category label
    $(".category_label").attr("style", "visibility: hidden") 
    // clear borders
    $("#channel_1").css("border", "3px solid white")
    $("#channel_2").css("border", "3px solid white")
    
    /*$( "#single_slider" ).slider({ // reset slider
        range : "min",
        min : 0,
        max : 1,
        step: 0.01,
        value : 0.5,
        change: function( event, ui ) {}
    });
    var slider_check = false;*/

    //show blank slide
    showSlide("blankSlide");
    // next trial
    setTimeout(experiment.next, 500);  
  },

  instructionsSlide: function() {
      if(training_condition == "active_receptive" || training_condition == "active_active") {
        showSlide("active_instructions");
      } else {
        showSlide("receptive_instructions_slide");
      }
  },

  summarySlide: function(num_correct_in_block, trial_number_experiment) {
    var prop_correct = num_correct_in_block / num_test_trials_block;
    prop_correct = prop_correct * 100;
    $("#block_acc").text(prop_correct + "%");

    // show either passive or active instructions depending on condition
    if(training_condition == "active_receptive" && trial_number_experiment != 96) {
    	$("#instructions_text_receptive_summary").attr("style", "display: block");
    	$("#instructions_text_active_summary").attr("style", "display: none");
    } else if (training_condition == "receptive_active" && trial_number_experiment != 96) {
        $("#instructions_text_active_summary").attr("style", "display: block");
        $("#instructions_text_receptive_summary").attr("style", "display: none");
    } else if (training_condition == "receptive_receptive" && trial_number_experiment != 96)  {
    	 $("#instructions_text_receptive_summary").attr("style", "display: block");
       $("#instructions_text_active_summary").attr("style", "display: none");
    } else if (training_condition == "active_active" && trial_number_experiment != 96) {
        $("#instructions_text_active_summary").attr("style", "display: block");
        $("#instructions_text_receptive_summary").attr("style", "display: none");
    } else {
      $("#instructions_text_receptive_summary").attr("style", "display: none");
      $("#instructions_text_active_summary").attr("style", "display: none");
    }


    showSlide("summarySlide");
  },

/*The work horse of the sequence: what to do on every trial.*/
  next: function() {

    // get trial information from trial array
    trial = trials.shift();
 

  		// remove category label text from previous trial
  		$("#category").text("");

        //disable default spacebar functionality 
        $(document).keyup(function(event) {
            if(event.which == 32){
                return false;
            }
        });
        /*some slider functionality stuff*/
        /*$(function() {
            $( "#single_slider" ).slider({
              range : "min",
              min : 0,
              max : 1,
              step: 0.01,
              value : 0.5,
              change: function( event, ui ) {}
            });
        }); 

        var slider_check = false;

        $( "#single_slider" ).on( "slidechange", function( event, ui ) {
          slider_check = true;
        });*/

        // put blue box around svg element
        var rect = paper.rect(0,0,paper_width, paper_height);
        rect.attr({
          stroke: "blue", 
          'stroke-width': 4
        });
        // start clock for RT
        var startTime = (new Date()).getTime(), trial_type, trial;
        // create null variable for tracking x coordinate for rotating object
        var prevDx = null;
        // show progress bar
        $(".progress").attr("style", "visibility: visible")

        // if trial is undefined, we are done - go to q and a slide
        if (typeof trial == "undefined") {
            $(".progress").attr("style", "visibility: hidden")
            // unbind keyboard event
            $(document).unbind("keyup")
            return showSlide("qanda");
        }
       
        // if between blocks we need to display cumulative accuracy during the block they just completed, 
        // as well as their accuracy during the preceding test block

        // set up slide depending on trial type
        if (trial.trial_type == "training" &  // this should be training
          trial.training_block == "active" || trial.trial_type == "active_example") {
                $("#task_instructions").attr("style", "display: block");
                $("#channel_label").attr("style", "display: block");
                $("#channel_label").css("border", "3px solid white")
                $("#receptive_instructions").attr("style", "display: none");
                $("#category_table").attr("style", "display: none");
               // $("#slider_table").attr("style", "display: none");
                $("#test_instructions").attr("style", "display: none");
               // $("#slider_instructions").attr("style", "display: none");
               // $("#slider_instructions2").attr("style", "display: none");
        } else if (trial.trial_type == "training" & // this should be "training"
          trial.training_block == "receptive") {
          		$('.category_label').hide();
                $("#task_instructions").attr("style", "display: none");
                $("#channel_label").attr("style", "display: block");
                $("#channel_label").css("border", "3px solid white")
                $("#receptive_instructions").attr("style", "display: block");
                $("#category_table").attr("style", "display: none");
               // $("#slider_table").attr("style", "display: none");
                $("#test_instructions").attr("style", "display: none");
               // $("#slider_instructions").attr("style", "display: none");
               // $("#slider_instructions2").attr("style", "display: none");
        } else {
        		$('.category_label').hide()
                $("#task_instructions").attr("style", "display: none");
                $("#channel_label").attr("style", "display: none");
                $("#channel_label").css("border", "3px solid white")
                $("#receptive_instructions").attr("style", "display: none");
               // $("#slider_table").attr("style", "display: none");
               // $("#slider_instructions").attr("style", "display: none");
               // $("#slider_instructions2").attr("style", "display: none");
                $("#test_instructions").attr("style", "display: block");
                $("#category_table").attr("style", "display: block");
        };

        if (trial.trial_type == "training" &
          trial.training_block == "receptive") {
             var circle = paper.circle(centerX,centerY,trial.radius).attr({
                        fill: "white", 
                        stroke: "rgb(0,0,0)",
                        "stroke-width": 5,
                      });

              var linePath = [ ['M', centerX - trial.radius, centerX], ['L', centerX + trial.radius, centerX] ];
              var line = paper.path( linePath ).attr({
                            stroke: "rgb(0,0,0)",
                            "stroke-width": 5,
                          });

              line.animate({transform: line.attr("transform") + "r" + trial.angle});  

            setTimeout(function() {
                // check which category the antenna is in
                  if (trial.antenna_category == "A") {
                      $("#category").text("Channel 1");
                      $(".category_label").attr("style", "visibility: visible"); 
                      category_response = "1";
                  } else {
                      $("#category").text("Channel 2");
                      $(".category_label").attr("style", "visibility: visible"); 
                      category_response = "2";
                  } 
            }, 1500);

        } else {
          var circle = paper.circle(centerX,centerY,trial.radius).attr({
                        fill: "white", 
                        stroke: "rgb(0,0,0)",
                        "stroke-width": 5,
                      });

              var linePath = [ ['M', centerX - trial.radius, centerX], ['L', centerX + trial.radius, centerX] ];
              var line = paper.path( linePath ).attr({
                            stroke: "rgb(0,0,0)",
                            "stroke-width": 5,
                          });

              line.animate({transform: line.attr("transform") + "r" + trial.angle}); 
        }

        // make drag functions so antenna is interactive
        var start = function (x, y) {
          flag = "false";
          this.r = this.attr("r");
          this.cx = this.attr("cx");
          },

        scaleAntenna = function(dx) {
                var R = this.r + dx;
                // constrain scaling to the canvas
                if (R <= radius_lower_limit) {
                    R = radius_lower_limit;
                    dx = radius_lower_limit;
                } else if (R >= radius_upper_limit) {
                    R = radius_upper_limit;
                    dx = radius_upper_limit;
                } else {
                    R = R;
                }
                // get x coordinates for line
                var X1 = this.cx - R;
                var X2 = this.cx + R;
                // animate circle
                circle.attr({r: R});
                // animate line
                linePath[0][1] = X1;
                linePath[1][1] = X2;
                line.attr({path: linePath});
        },

        rotateAntenna = function(dx) {
            var angleDiff = dx - prevDx,
            rot_angle = Math.round(line.matrix.split().rotate)


            // transfrom degree values between 0 and -90 degrees to make all angle values positive
            if(rot_angle < 0 & rot_angle >= -90) {
              rot_angle = rot_angle + 360;
            }

            //console.log("transformed angle value is: " + rot_angle);

            // Constrain rotation based on rotation scale for that subject
              if(angleDiff + rot_angle > rotation_upper_limit || angleDiff + rot_angle < rotation_lower_limit) {
                      angleDiff = 0;
              }

            line.animate({transform: line.attr("transform") + "R" + angleDiff})
            prevDx = dx;
        },

        up = function () {
             flag = "true";
             this.dx = this.dy = 0;
             prevDx = null;
        },

        logDataTraining = function(category_response, radius_response, orientation_response, radius_param, orientation_param) {
              $(document).unbind("keyup")

                             //console.log("radius value: " + trial.radius);
                            // console.log("radius value is: " + radius_response)
                             //console.log(radius_param);
                             //console.log("----")
                            // console.log(trial.angle);
                             //console.log("angle value is: " + orientation_response);
                             // console.log(orientation_param);

                            // console.log("change is: " + Math.abs(trial.radius - radius_response));

                  // store information from the trial
                  var endTime = (new Date()).getTime();

                  // check which training condition, if in active log interaction data
                  if(trial.training_block == "active") {
                    radius_param = radius_param,
                    orientation_param = orientation_param,
                    radius_response_stim = radius_response;
                    radius_response_param = radius_param,
                    radius_change_stim = Math.abs(trial.radius - radius_response);
                    radius_change_param = Math.abs(radius_param - radius_response_param);
                    orientation_response_stim = orientation_response;
                    orientation_response_param = orientation_param;
                    orientation_change_stim = Math.abs(trial.angle - orientation_response);
                    orientation_change_param = Math.abs(orientation_param - orientation_response_param);
                    trial_category = category_response;
                  } else {
                    radius_param = convertStimParam(trial.radius, scale_factor_radius, radius_lower_limit, min_param_scale),
                    orientation_param = convertStimParam(trial.angle, scale_factor_orientation, rotation_lower_limit, min_param_scale),
                    radius_response_stim = "NA";
                    radius_response_param = "NA";
                    radius_change_stim = "NA";
                    radius_change_param = "NA";
                    orientation_response_stim = "NA";
                    orientation_response_param = "NA";
                    orientation_change_stim = "NA";
                    orientation_change_param = "NA";
                    category_response = "NA";
                    trial_category = trial.antenna_category;
                  }

                  //console.log("radius response is: " + radius_response);
                  //console.log("orientation response is: " + orientation_response);

                  data = {
                    trial_number: trial.trial_number_experiment,
                    trial_type: trial.trial_type,
                    block: trial.block,
                    within_block_trial_number: trial.trial_number_block,
                    radius_trial_stim: trial.radius,
                    radius_trial_param: radius_param,
                    radius_response_stim: radius_response_stim,
                    radius_response_param: radius_response_param,
                    radius_change_stim: radius_change_stim,
                    radius_change_param: radius_change_param,
                    orientation_response_stim: orientation_response_stim,
                    orientation_response_param: orientation_response_param,
                    orientation_trial_stim: trial.angle,
                    orientation_trial_param: orientation_param,
                    orientation_change_stim: orientation_change_stim,
                    orientation_change_param: orientation_change_param,
                    rt: endTime - startTime,
                    trial_category: trial_category,
                    test_response: "NA",
                    correct: "NA",
                   // confidence: "NA"
                  };

                  /*console.log("Data training is: ")
                  console.log(data);
                  console.log("---------------------")*/

                  experiment.data.push(data);

                  if (trial.trial_number_experiment == 2 && trial.trial_type == "active_example") {
                      
                      if (framing_condition == "rule-based") {
                          $("#rb_framing").attr("style", "display: block"); 
                          $("#ii_framing").attr("style", "display: none");    
                      } else {
                          $("#rb_framing").attr("style", "display: none"); 
                          $("#ii_framing").attr("style", "display: block");
                      }

                      paper.clear();

                      showSlide("framing_instructions");

                  } else {

                    // move on to the next trial
                    setTimeout(function() {
                      paper.clear();
                      setTimeout(experiment.blank,1);
                    }, 500);

                  }
                  
        },


        logDataTest = function(test_response) {
                  //unbind event handlers
                  $("#channel_1").unbind();
                  $("#channel_2").unbind();
                  $(document).unbind("keyup")

                  // store information from the trial
                //  var confidence = $('#single_slider').slider("option", "value");
                  var endTime = (new Date()).getTime();

                  data = {
                    trial_number: trial.trial_number_experiment,
                    trial_type: trial.trial_type,
                    trial_training_block: trial.training_block,
                    block: trial.block,
                    within_block_trial_number: trial.trial_number_block,
                    radius_trial_stim: trial.radius,
                    radius_trial_param: trial.radius_param,
                    radius_response: "NA",
                    radius_change: "NA",
                    orientation_response: "NA",
                    orientation_trial: trial.angle,
                    orientation_trial_param: trial.angle_param,
                    orientation_change: "NA",
                    rt: endTime - startTime,
                    trial_category: trial.antenna_category,
                    test_response: test_response,
                    correct: test_response == trial.antenna_category,
                   // confidence: confidence,
                    quadrant: trial.quadrant
                  };

                  //console.log("Data test is: ")
                  //console.log(data);
                  //console.log("---------------------")

                  //reset correct counter on the first trial of the test block
                  if(trial.trial_number_experiment == 67 || trial.trial_number_experiment == 115) {
                    num_correct_in_block = 0;
                  }
                  // track number of correct in the block 
                  if(test_response == trial.antenna_category) {
                    num_correct_in_block++;
                  };

                  //console.log(test_response == trial.antenna_category);
                  //console.log(num_correct_in_block);

                  experiment.data.push(data);

                  // move on to the next trial, show summary slide if on the last trial of test block
                  if(trial.trial_number_experiment == 50 || trial.trial_number_experiment == 98) { 

                    setTimeout(function() {
                      paper.clear();
                      setTimeout(experiment.summarySlide(num_correct_in_block, trial.trial_number_experiment), 1);
                    }, 500);

                  } else {
                    
                    setTimeout(function() {
                      paper.clear();
                      setTimeout(experiment.blank, 1);
                    }, 500);

                  }
        };

/* SET UP USER INTERACTIVITY */

    if(trial.trial_type == "training" & // this should be "training"
       trial.training_block == "active" || trial.trial_type == "active_example") { 
       /* Set up keypress event
        * While the z key is pressed user can scale antenna
        * After the x key is pressed user can rotate antenna 
        */  

        $(document).keyup(function(event){
              var keys = {"z": 90, "x": 88, "c": 67};
              switch(event.which) {
                case keys["z"]:        
                    if(flag == "true") {
                      $("#adjust").text("Size Mode");
                      $(".category_label").attr("style", "visibility: visible");
                      circle.undrag(); // unbinds any prior event listener 
                      circle.drag(scaleAntenna, start, up);
                    }
                    break;
                case keys["x"]:
                    if (flag == "true") {
                      $("#adjust").text("Angle Mode");
                      $(".category_label").attr("style", "visibility: visible");
                      circle.undrag(); // unbinds any prior event listener 
                      circle.drag(rotateAntenna, start, up);
                    }
                    break;
                case keys["c"]:
                    //add check to make sure user has interacted with antenna
                    if(trial.radius == Math.round(circle.attr("r")) &
                       trial.angle == Math.round(line.matrix.split().rotate)) {
                        alert("Please adjust the antenna to learn the station")
                    } else {
                        flag = "true";
                        $("#channel_label").css("border", "3px solid green");
                        $(document).unbind("keyup") // remove other event listeners

                        // KM note: for some reason, unbinding the drag event listener creates a bug. if the user is still pressing the mouse button when they press C to submit their angle. On 11/10/15, I commented this out, and it seemed to fix that bug.
                       // circle.undrag() // unbind the ability to modify the antenna, 


                        var radius_response = Math.round(circle.attr("r"));
                        var radius_param = convertStimParam(radius_response, scale_factor_radius, radius_lower_limit, min_param_scale);
                      
                        //  transform negative angle values
                        var orientation_response = Math.round(line.matrix.split().rotate);
                        if(orientation_response < 0 & orientation_response >= -90) {
                				orientation_response = orientation_response + 360;
            		  }

                      var orientation_param = convertStimParam(orientation_response, scale_factor_orientation, rotation_lower_limit, min_param_scale);
                      var category_response;
                      // check if we are in the rule-based condition
                      if(category_type == "rule-based") {
                        // if order1 then check antenna radius, else check orientation
                        if(order == "order1") {
                           if (radius_param < optimal_decision_boundary_param) {
                            $("#category").text("Channel 1");
                            $(".category_label").attr("style", "visibility: visible"); 
                            category_response = "A";
                            } else {
                                $("#category").text("Channel 2");
                                $(".category_label").attr("style", "visibility: visible"); 
                                category_response = "B";
                            }
                        } else { // otherwise we are in the radius order
                            if (orientation_param < optimal_decision_boundary_param) {
                            $("#category").text("Channel 1");
                            $(".category_label").attr("style", "visibility: visible"); 
                            category_response = "A";
                            } else {
                                $("#category").text("Channel 2");
                                $(".category_label").attr("style", "visibility: visible"); 
                                category_response = "B";
                            }
                        }
                      } else {  // otherwise we are in the information integration condition 
                      	
                      	//console.log("radius param: " + radius_param);
                      	//console.log("angle param: " + orientation_param);

                        if(order == "order1") { // check order. here order determines the slope of the diagonal decision boundary
                          if(orientation_param > radius_param) { 
                            $("#category").text("Channel 1");
                            $(".category_label").attr("style", "visibility: visible");
                             category_response = "A";
                          } else {
                            $("#category").text("Channel 2");
                            $(".category_label").attr("style", "visibility: visible"); 
                            category_response = "B";
                          }
                        } else {
                          if(orientation_param < 600 - radius_param) { 
                            $("#category").text("Channel 1");
                            $(".category_label").attr("style", "visibility: visible");
                             category_response = "A";
                          } else {
                            $("#category").text("Channel 2");
                            $(".category_label").attr("style", "visibility: visible"); 
                            category_response = "B";
                        }
                      }
                    }
                      
                      

                      setTimeout(function(){
                        logDataTraining(category_response, radius_response, orientation_response, radius_param, orientation_param);
                      }, 1000)
                      
                    }
                    break;
                default:
                break;
              }
          });
    } else if(trial.trial_type == "training" & // this should be "training"
              trial.training_block == "receptive") {

    		$(".category_label").attr("style", "visibility: visible"); 
            // delay the timing of event handler so user can't respond before seeing the channel label
            setTimeout(function(){
              // user must press Z for channel 1 and X for channel 2
            $(document).keyup(function(event){
                  var keys = {"z": 90, "x": 88, "space_bar": 32};
                   switch(event.which) {
                    case keys["z"]:
                        if(trial.antenna_category == "A") {
                          $("#channel_label").css("border", "3px solid green")
                          logDataTraining();
                        } else {
                          alert("Press Z for Channel 1 and X for Channel 2");
                        }
                        break;
                    case keys["x"]:
                        if(trial.antenna_category == "B") {
                          $("#channel_label").css("border", "3px solid green")
                          logDataTraining();
                        } else {
                          alert("Press Z for Channel 1 and X for Channel 2");
                        }
                        break;
                    default:
                    } 
              });       
            }, 1600)
            

    } else {
        //add event listeners to table so user can select a channel
        $("#channel_1").click(function() {
          var test_response = "A"; // store response
          logDataTest(test_response); // submit response to logDataTest function
          /*// hide channel table and show slider bar
            setTimeout(function() {
              $("#test_instructions").attr("style", "display: none");
              $("#category_table").attr("style", "display: none");
             // $("#slider_instructions").attr("style", "display: block");
             // $("#slider_instructions2").attr("style", "display: block");
             // $("#slider_table").attr("style", "display: block");
            }, 250);
          // add keypress event listener, so user can submit confidence response
            $(document).keyup(function(event){
                var keys = {"space_bar": 32};
                if(event.which == keys['space_bar']) {
                        
                   /* if(slider_check == true) {
                      logDataTest(test_response);
                     } else {
                      alert("Please adjust the slider to report your confidence")
                     }
                }
            });*/

        });

        //add event listeners to table so user can select a channel
        $("#channel_2").click(function() {
          var test_response = "B"; // store response
          logDataTest(test_response);
          /*// hide channel table and show slider bar
            setTimeout(function() {
              $("#test_instructions").attr("style", "display: none");
              $("#category_table").attr("style", "display: none");
             // $("#slider_instructions").attr("style", "display: block");
             // $("#slider_instructions2").attr("style", "display: block");
             // $("#slider_table").attr("style", "display: block");
            }, 250);
          // add keypress event listener, so user can submit confidence response
            $(document).keydown(function(event){
                //event.preventDefault;
                var keys = {"space_bar": 32};
                if(event.which == keys['space_bar']) {
                    if(slider_check == true) {
                      logDataTest(test_response);
                     } else {
                      alert("Please adjust the slider to report your confidence")
                     }
                }
            });*/

        });
    };

    // display slide
    showSlide("stage");
  }
};