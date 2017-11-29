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

function range(start, end) {
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

try { 
    var filename = "KM_act_learn_yoked_final_good";
    var condCounts = "0,1;1,1;2,1;3,1;4,1;5,1;6,1;7,1;8,1;9,1;10,1;11,1;12,1;13,1;14,1;15,1;16,1;17,1;18,1;19,1;20,1;21,1;22,1;23,1;24,1;25,1;26,1;27,1;28,1;29,1;30,1;31,1;32,1;33,1;34,1;35,1;36,1;37,1;38,1;39,1;40,1;41,1;42,1;43,1;44,1;45,1;46,1;47,1;48,1;49,1;50,1;51,1;52,1;53,1;54,1";
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://langcog.stanford.edu/cgi-bin/subject_equalizer/maker_getter.php?conds=" + condCounts + "&filename=" + filename, false );
    xmlHttp.send( null );
    var cond = xmlHttp.responseText; // For actual experimental runs
} catch (e) {
    var cond = 1;
}

// decrement maker-getter if this is a turker 
if (turk.workerId.length > 0) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", "https://langcog.stanford.edu/cgi-bin/subject_equalizer/decrementer.php?filename=" + filename + "&to_decrement=" + cond, false);
    xmlHttp.send(null)
}

var order, training_condition = "yoked", flag = "true";

// Yoked Antenna parameter vals: Taken from actual sampling behavior in II and RB conditions
var yoked_param_vals = [{"cond_indicator":1,"subids":7,"category_type":"information-integration","order":"order1","antenna_vals":[{"radii":600,"angles":600,"radii_stim":255,"angles_stim":260,"category":"B"},{"radii":222,"angles":600,"radii_stim":120,"angles_stim":260,"category":"A"},{"radii":600,"angles":100,"radii_stim":255,"angles_stim":135,"category":"B"},{"radii":600,"angles":284,"radii_stim":255,"angles_stim":181,"category":"B"},{"radii":1,"angles":284,"radii_stim":41,"angles_stim":181,"category":"A"},{"radii":118,"angles":600,"radii_stim":83,"angles_stim":260,"category":"A"},{"radii":362,"angles":188,"radii_stim":170,"angles_stim":157,"category":"B"},{"radii":406,"angles":280,"radii_stim":186,"angles_stim":180,"category":"B"},{"radii":474,"angles":280,"radii_stim":210,"angles_stim":180,"category":"B"},{"radii":208,"angles":280,"radii_stim":115,"angles_stim":180,"category":"A"},{"radii":378,"angles":276,"radii_stim":176,"angles_stim":179,"category":"B"},{"radii":586,"angles":276,"radii_stim":250,"angles_stim":179,"category":"B"},{"radii":1,"angles":1,"radii_stim":41,"angles_stim":110,"category":"B"},{"radii":308,"angles":600,"radii_stim":151,"angles_stim":260,"category":"A"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":260,"category":"B"},{"radii":286,"angles":600,"radii_stim":143,"angles_stim":260,"category":"A"},{"radii":432,"angles":260,"radii_stim":195,"angles_stim":175,"category":"B"},{"radii":574,"angles":528,"radii_stim":246,"angles_stim":242,"category":"B"},{"radii":390,"angles":284,"radii_stim":180,"angles_stim":181,"category":"B"},{"radii":395,"angles":532,"radii_stim":182,"angles_stim":243,"category":"A"},{"radii":586,"angles":372,"radii_stim":250,"angles_stim":203,"category":"B"},{"radii":482,"angles":432,"radii_stim":213,"angles_stim":218,"category":"B"},{"radii":423,"angles":188,"radii_stim":192,"angles_stim":157,"category":"B"},{"radii":275,"angles":92,"radii_stim":139,"angles_stim":133,"category":"B"},{"radii":258,"angles":248,"radii_stim":133,"angles_stim":172,"category":"B"},{"radii":594,"angles":480,"radii_stim":253,"angles_stim":230,"category":"B"},{"radii":566,"angles":524,"radii_stim":243,"angles_stim":241,"category":"B"},{"radii":98,"angles":492,"radii_stim":76,"angles_stim":233,"category":"A"},{"radii":507,"angles":368,"radii_stim":222,"angles_stim":202,"category":"B"},{"radii":126,"angles":192,"radii_stim":86,"angles_stim":158,"category":"A"},{"radii":384,"angles":540,"radii_stim":178,"angles_stim":245,"category":"A"},{"radii":552,"angles":508,"radii_stim":238,"angles_stim":237,"category":"B"}]},{"cond_indicator":2,"subids":10,"category_type":"information-integration","order":"order2","antenna_vals":[{"radii":600,"angles":400,"radii_stim":255,"angles_stim":180,"category":"B"},{"radii":513,"angles":112,"radii_stim":226,"angles_stim":108,"category":"B"},{"radii":600,"angles":12,"radii_stim":255,"angles_stim":83,"category":"B"},{"radii":1,"angles":144,"radii_stim":55,"angles_stim":116,"category":"A"},{"radii":447,"angles":340,"radii_stim":204,"angles_stim":165,"category":"B"},{"radii":300,"angles":40,"radii_stim":155,"angles_stim":90,"category":"A"},{"radii":375,"angles":452,"radii_stim":180,"angles_stim":193,"category":"B"},{"radii":96,"angles":480,"radii_stim":87,"angles_stim":200,"category":"A"},{"radii":510,"angles":516,"radii_stim":225,"angles_stim":209,"category":"B"},{"radii":543,"angles":232,"radii_stim":236,"angles_stim":138,"category":"B"},{"radii":483,"angles":424,"radii_stim":216,"angles_stim":186,"category":"B"},{"radii":600,"angles":100,"radii_stim":255,"angles_stim":105,"category":"B"},{"radii":1,"angles":36,"radii_stim":55,"angles_stim":89,"category":"A"},{"radii":576,"angles":256,"radii_stim":247,"angles_stim":144,"category":"B"},{"radii":348,"angles":392,"radii_stim":171,"angles_stim":178,"category":"B"},{"radii":597,"angles":16,"radii_stim":254,"angles_stim":84,"category":"B"},{"radii":600,"angles":204,"radii_stim":255,"angles_stim":131,"category":"B"},{"radii":459,"angles":1,"radii_stim":208,"angles_stim":80,"category":"A"},{"radii":525,"angles":1,"radii_stim":230,"angles_stim":80,"category":"A"},{"radii":165,"angles":124,"radii_stim":110,"angles_stim":111,"category":"A"},{"radii":126,"angles":568,"radii_stim":97,"angles_stim":222,"category":"B"},{"radii":243,"angles":164,"radii_stim":136,"angles_stim":121,"category":"A"},{"radii":258,"angles":204,"radii_stim":141,"angles_stim":131,"category":"A"},{"radii":348,"angles":348,"radii_stim":171,"angles_stim":167,"category":"B"},{"radii":246,"angles":160,"radii_stim":137,"angles_stim":120,"category":"A"},{"radii":474,"angles":292,"radii_stim":213,"angles_stim":153,"category":"B"},{"radii":480,"angles":508,"radii_stim":215,"angles_stim":207,"category":"B"},{"radii":267,"angles":428,"radii_stim":144,"angles_stim":187,"category":"B"},{"radii":219,"angles":44,"radii_stim":128,"angles_stim":91,"category":"A"},{"radii":243,"angles":580,"radii_stim":136,"angles_stim":225,"category":"B"},{"radii":408,"angles":72,"radii_stim":191,"angles_stim":98,"category":"A"},{"radii":249,"angles":600,"radii_stim":138,"angles_stim":230,"category":"B"}]},{"cond_indicator":3,"subids":11,"category_type":"information-integration","order":"order1","antenna_vals":[{"radii":275,"angles":276,"radii_stim":137,"angles_stim":89,"category":"A"},{"radii":25,"angles":276,"radii_stim":46,"angles_stim":89,"category":"A"},{"radii":286,"angles":280,"radii_stim":141,"angles_stim":90,"category":"B"},{"radii":281,"angles":232,"radii_stim":139,"angles_stim":78,"category":"B"},{"radii":242,"angles":360,"radii_stim":125,"angles_stim":110,"category":"A"},{"radii":385,"angles":296,"radii_stim":177,"angles_stim":94,"category":"B"},{"radii":55,"angles":288,"radii_stim":57,"angles_stim":92,"category":"A"},{"radii":352,"angles":4,"radii_stim":165,"angles_stim":21,"category":"B"},{"radii":168,"angles":272,"radii_stim":98,"angles_stim":88,"category":"A"},{"radii":369,"angles":288,"radii_stim":171,"angles_stim":92,"category":"B"},{"radii":440,"angles":476,"radii_stim":197,"angles_stim":139,"category":"A"},{"radii":141,"angles":32,"radii_stim":88,"angles_stim":28,"category":"B"},{"radii":363,"angles":420,"radii_stim":169,"angles_stim":125,"category":"A"},{"radii":174,"angles":1,"radii_stim":100,"angles_stim":20,"category":"B"},{"radii":143,"angles":212,"radii_stim":89,"angles_stim":73,"category":"A"},{"radii":245,"angles":160,"radii_stim":126,"angles_stim":60,"category":"B"},{"radii":88,"angles":1,"radii_stim":69,"angles_stim":20,"category":"B"},{"radii":382,"angles":52,"radii_stim":176,"angles_stim":33,"category":"B"},{"radii":31,"angles":260,"radii_stim":48,"angles_stim":85,"category":"A"},{"radii":388,"angles":284,"radii_stim":178,"angles_stim":91,"category":"B"},{"radii":520,"angles":1,"radii_stim":226,"angles_stim":20,"category":"B"},{"radii":119,"angles":568,"radii_stim":80,"angles_stim":162,"category":"A"},{"radii":9,"angles":1,"radii_stim":40,"angles_stim":20,"category":"B"},{"radii":174,"angles":132,"radii_stim":100,"angles_stim":53,"category":"B"},{"radii":86,"angles":4,"radii_stim":68,"angles_stim":21,"category":"B"},{"radii":281,"angles":244,"radii_stim":139,"angles_stim":81,"category":"B"},{"radii":1,"angles":360,"radii_stim":37,"angles_stim":110,"category":"A"},{"radii":399,"angles":256,"radii_stim":182,"angles_stim":84,"category":"B"},{"radii":91,"angles":448,"radii_stim":70,"angles_stim":132,"category":"A"},{"radii":6,"angles":1,"radii_stim":39,"angles_stim":20,"category":"B"},{"radii":402,"angles":600,"radii_stim":183,"angles_stim":170,"category":"A"},{"radii":556,"angles":596,"radii_stim":239,"angles_stim":169,"category":"A"}]},{"cond_indicator":4,"subids":14,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":600,"angles":492,"radii_stim":255,"angles_stim":180,"category":"B"},{"radii":396,"angles":128,"radii_stim":191,"angles_stim":89,"category":"B"},{"radii":584,"angles":120,"radii_stim":250,"angles_stim":87,"category":"B"},{"radii":1,"angles":1,"radii_stim":67,"angles_stim":57,"category":"A"},{"radii":1,"angles":500,"radii_stim":67,"angles_stim":182,"category":"A"},{"radii":600,"angles":136,"radii_stim":255,"angles_stim":91,"category":"B"},{"radii":1,"angles":124,"radii_stim":67,"angles_stim":88,"category":"A"},{"radii":1,"angles":492,"radii_stim":67,"angles_stim":180,"category":"A"},{"radii":587,"angles":128,"radii_stim":251,"angles_stim":89,"category":"B"},{"radii":580,"angles":488,"radii_stim":249,"angles_stim":179,"category":"B"},{"radii":138,"angles":124,"radii_stim":110,"angles_stim":88,"category":"A"},{"radii":478,"angles":500,"radii_stim":217,"angles_stim":182,"category":"B"},{"radii":115,"angles":500,"radii_stim":103,"angles_stim":182,"category":"A"},{"radii":392,"angles":488,"radii_stim":190,"angles_stim":179,"category":"B"},{"radii":590,"angles":168,"radii_stim":252,"angles_stim":99,"category":"B"},{"radii":188,"angles":128,"radii_stim":126,"angles_stim":89,"category":"A"},{"radii":227,"angles":484,"radii_stim":138,"angles_stim":178,"category":"A"},{"radii":265,"angles":120,"radii_stim":150,"angles_stim":87,"category":"A"},{"radii":600,"angles":472,"radii_stim":255,"angles_stim":175,"category":"B"},{"radii":600,"angles":120,"radii_stim":255,"angles_stim":87,"category":"B"},{"radii":268,"angles":4,"radii_stim":151,"angles_stim":58,"category":"A"},{"radii":67,"angles":120,"radii_stim":88,"angles_stim":87,"category":"A"},{"radii":262,"angles":156,"radii_stim":149,"angles_stim":96,"category":"A"},{"radii":494,"angles":120,"radii_stim":222,"angles_stim":87,"category":"B"},{"radii":182,"angles":132,"radii_stim":124,"angles_stim":90,"category":"A"},{"radii":278,"angles":32,"radii_stim":154,"angles_stim":65,"category":"A"},{"radii":348,"angles":360,"radii_stim":176,"angles_stim":147,"category":"B"},{"radii":335,"angles":48,"radii_stim":172,"angles_stim":69,"category":"B"},{"radii":271,"angles":84,"radii_stim":152,"angles_stim":78,"category":"A"},{"radii":325,"angles":376,"radii_stim":169,"angles_stim":151,"category":"B"},{"radii":287,"angles":600,"radii_stim":157,"angles_stim":207,"category":"A"},{"radii":526,"angles":248,"radii_stim":232,"angles_stim":119,"category":"B"}]},{"cond_indicator":5,"subids":17,"category_type":"information-integration","order":"order2","antenna_vals":[{"radii":274,"angles":1,"radii_stim":143,"angles_stim":91,"category":"A"},{"radii":477,"angles":352,"radii_stim":213,"angles_stim":179,"category":"B"},{"radii":1,"angles":172,"radii_stim":49,"angles_stim":134,"category":"A"},{"radii":600,"angles":328,"radii_stim":255,"angles_stim":173,"category":"B"},{"radii":349,"angles":1,"radii_stim":169,"angles_stim":91,"category":"A"},{"radii":230,"angles":600,"radii_stim":128,"angles_stim":241,"category":"B"},{"radii":506,"angles":552,"radii_stim":223,"angles_stim":229,"category":"B"},{"radii":137,"angles":600,"radii_stim":96,"angles_stim":241,"category":"B"},{"radii":355,"angles":1,"radii_stim":171,"angles_stim":91,"category":"A"},{"radii":294,"angles":524,"radii_stim":150,"angles_stim":222,"category":"B"},{"radii":285,"angles":56,"radii_stim":147,"angles_stim":105,"category":"A"},{"radii":600,"angles":356,"radii_stim":255,"angles_stim":180,"category":"B"},{"radii":434,"angles":536,"radii_stim":198,"angles_stim":225,"category":"B"},{"radii":181,"angles":1,"radii_stim":111,"angles_stim":91,"category":"A"},{"radii":358,"angles":180,"radii_stim":172,"angles_stim":136,"category":"A"},{"radii":361,"angles":488,"radii_stim":173,"angles_stim":213,"category":"B"},{"radii":600,"angles":360,"radii_stim":255,"angles_stim":181,"category":"B"},{"radii":1,"angles":380,"radii_stim":49,"angles_stim":186,"category":"A"},{"radii":233,"angles":260,"radii_stim":129,"angles_stim":156,"category":"A"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":91,"category":"B"},{"radii":114,"angles":192,"radii_stim":88,"angles_stim":139,"category":"A"},{"radii":472,"angles":132,"radii_stim":211,"angles_stim":124,"category":"B"},{"radii":219,"angles":496,"radii_stim":124,"angles_stim":215,"category":"B"},{"radii":1,"angles":1,"radii_stim":49,"angles_stim":91,"category":"A"},{"radii":486,"angles":176,"radii_stim":216,"angles_stim":135,"category":"B"},{"radii":457,"angles":248,"radii_stim":206,"angles_stim":153,"category":"B"},{"radii":126,"angles":4,"radii_stim":92,"angles_stim":92,"category":"A"},{"radii":1,"angles":476,"radii_stim":49,"angles_stim":210,"category":"A"},{"radii":204,"angles":164,"radii_stim":119,"angles_stim":132,"category":"A"},{"radii":573,"angles":416,"radii_stim":246,"angles_stim":195,"category":"B"},{"radii":306,"angles":336,"radii_stim":154,"angles_stim":175,"category":"B"},{"radii":364,"angles":516,"radii_stim":174,"angles_stim":220,"category":"B"}]},{"cond_indicator":6,"subids":20,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":132,"angles":88,"radii_stim":88,"angles_stim":90,"category":"A"},{"radii":191,"angles":444,"radii_stim":109,"angles_stim":179,"category":"A"},{"radii":76,"angles":600,"radii_stim":68,"angles_stim":218,"category":"A"},{"radii":600,"angles":264,"radii_stim":255,"angles_stim":134,"category":"B"},{"radii":600,"angles":540,"radii_stim":255,"angles_stim":203,"category":"B"},{"radii":600,"angles":180,"radii_stim":255,"angles_stim":113,"category":"B"},{"radii":1,"angles":84,"radii_stim":41,"angles_stim":89,"category":"A"},{"radii":591,"angles":92,"radii_stim":252,"angles_stim":91,"category":"B"},{"radii":230,"angles":88,"radii_stim":123,"angles_stim":90,"category":"A"},{"radii":140,"angles":84,"radii_stim":91,"angles_stim":89,"category":"A"},{"radii":600,"angles":88,"radii_stim":255,"angles_stim":90,"category":"B"},{"radii":258,"angles":88,"radii_stim":133,"angles_stim":90,"category":"A"},{"radii":530,"angles":92,"radii_stim":230,"angles_stim":91,"category":"B"},{"radii":216,"angles":448,"radii_stim":118,"angles_stim":180,"category":"A"},{"radii":185,"angles":444,"radii_stim":107,"angles_stim":179,"category":"A"},{"radii":28,"angles":180,"radii_stim":51,"angles_stim":113,"category":"A"},{"radii":303,"angles":124,"radii_stim":149,"angles_stim":99,"category":"B"},{"radii":275,"angles":156,"radii_stim":139,"angles_stim":107,"category":"A"},{"radii":247,"angles":152,"radii_stim":129,"angles_stim":106,"category":"A"},{"radii":26,"angles":600,"radii_stim":50,"angles_stim":218,"category":"A"},{"radii":96,"angles":220,"radii_stim":75,"angles_stim":123,"category":"A"},{"radii":468,"angles":600,"radii_stim":208,"angles_stim":218,"category":"B"},{"radii":504,"angles":192,"radii_stim":221,"angles_stim":116,"category":"B"},{"radii":280,"angles":84,"radii_stim":141,"angles_stim":89,"category":"A"},{"radii":583,"angles":88,"radii_stim":249,"angles_stim":90,"category":"B"},{"radii":465,"angles":228,"radii_stim":207,"angles_stim":125,"category":"B"},{"radii":502,"angles":388,"radii_stim":220,"angles_stim":165,"category":"B"},{"radii":59,"angles":84,"radii_stim":62,"angles_stim":89,"category":"A"},{"radii":152,"angles":180,"radii_stim":95,"angles_stim":113,"category":"A"},{"radii":331,"angles":440,"radii_stim":159,"angles_stim":178,"category":"B"},{"radii":182,"angles":444,"radii_stim":106,"angles_stim":179,"category":"A"},{"radii":597,"angles":440,"radii_stim":254,"angles_stim":178,"category":"B"}]},{"cond_indicator":7,"subids":21,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":463,"angles":368,"radii_stim":214,"angles_stim":216,"category":"B"},{"radii":267,"angles":212,"radii_stim":155,"angles_stim":177,"category":"A"},{"radii":543,"angles":600,"radii_stim":238,"angles_stim":274,"category":"B"},{"radii":470,"angles":1,"radii_stim":216,"angles_stim":124,"category":"B"},{"radii":596,"angles":600,"radii_stim":254,"angles_stim":274,"category":"B"},{"radii":1,"angles":308,"radii_stim":75,"angles_stim":201,"category":"A"},{"radii":573,"angles":568,"radii_stim":247,"angles_stim":266,"category":"B"},{"radii":600,"angles":184,"radii_stim":255,"angles_stim":170,"category":"B"},{"radii":327,"angles":580,"radii_stim":173,"angles_stim":269,"category":"B"},{"radii":160,"angles":208,"radii_stim":123,"angles_stim":176,"category":"A"},{"radii":600,"angles":316,"radii_stim":255,"angles_stim":203,"category":"B"},{"radii":1,"angles":572,"radii_stim":75,"angles_stim":267,"category":"A"},{"radii":373,"angles":592,"radii_stim":187,"angles_stim":272,"category":"B"},{"radii":307,"angles":204,"radii_stim":167,"angles_stim":175,"category":"B"},{"radii":197,"angles":592,"radii_stim":134,"angles_stim":272,"category":"A"},{"radii":64,"angles":372,"radii_stim":94,"angles_stim":217,"category":"A"},{"radii":600,"angles":176,"radii_stim":255,"angles_stim":168,"category":"B"},{"radii":1,"angles":436,"radii_stim":75,"angles_stim":233,"category":"A"},{"radii":290,"angles":52,"radii_stim":162,"angles_stim":137,"category":"A"},{"radii":450,"angles":584,"radii_stim":210,"angles_stim":270,"category":"B"},{"radii":287,"angles":192,"radii_stim":161,"angles_stim":172,"category":"A"},{"radii":187,"angles":556,"radii_stim":131,"angles_stim":263,"category":"A"},{"radii":390,"angles":180,"radii_stim":192,"angles_stim":169,"category":"B"},{"radii":257,"angles":584,"radii_stim":152,"angles_stim":270,"category":"A"},{"radii":174,"angles":432,"radii_stim":127,"angles_stim":232,"category":"A"},{"radii":194,"angles":232,"radii_stim":133,"angles_stim":182,"category":"A"},{"radii":67,"angles":576,"radii_stim":95,"angles_stim":268,"category":"A"},{"radii":230,"angles":364,"radii_stim":144,"angles_stim":215,"category":"A"},{"radii":170,"angles":380,"radii_stim":126,"angles_stim":219,"category":"A"},{"radii":100,"angles":1,"radii_stim":105,"angles_stim":124,"category":"A"},{"radii":117,"angles":600,"radii_stim":110,"angles_stim":274,"category":"A"},{"radii":100,"angles":316,"radii_stim":105,"angles_stim":203,"category":"A"}]},{"cond_indicator":8,"subids":23,"category_type":"information-integration","order":"order2","antenna_vals":[{"radii":1,"angles":596,"radii_stim":75,"angles_stim":299,"category":"A"},{"radii":174,"angles":304,"radii_stim":127,"angles_stim":226,"category":"A"},{"radii":1,"angles":560,"radii_stim":75,"angles_stim":290,"category":"A"},{"radii":240,"angles":1,"radii_stim":147,"angles_stim":150,"category":"A"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":150,"category":"B"},{"radii":600,"angles":4,"radii_stim":255,"angles_stim":151,"category":"B"},{"radii":1,"angles":600,"radii_stim":75,"angles_stim":300,"category":"B"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":150,"category":"B"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":300,"category":"B"},{"radii":1,"angles":480,"radii_stim":75,"angles_stim":270,"category":"A"},{"radii":600,"angles":480,"radii_stim":255,"angles_stim":270,"category":"B"},{"radii":1,"angles":480,"radii_stim":75,"angles_stim":270,"category":"A"},{"radii":600,"angles":476,"radii_stim":255,"angles_stim":269,"category":"B"},{"radii":600,"angles":124,"radii_stim":255,"angles_stim":181,"category":"B"},{"radii":1,"angles":120,"radii_stim":75,"angles_stim":180,"category":"A"},{"radii":1,"angles":1,"radii_stim":75,"angles_stim":150,"category":"A"},{"radii":600,"angles":488,"radii_stim":255,"angles_stim":272,"category":"B"},{"radii":600,"angles":120,"radii_stim":255,"angles_stim":180,"category":"B"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":300,"category":"B"},{"radii":600,"angles":280,"radii_stim":255,"angles_stim":220,"category":"B"},{"radii":270,"angles":468,"radii_stim":156,"angles_stim":267,"category":"B"},{"radii":353,"angles":192,"radii_stim":181,"angles_stim":198,"category":"A"},{"radii":213,"angles":512,"radii_stim":139,"angles_stim":278,"category":"B"},{"radii":330,"angles":492,"radii_stim":174,"angles_stim":273,"category":"B"},{"radii":1,"angles":500,"radii_stim":75,"angles_stim":275,"category":"A"},{"radii":267,"angles":600,"radii_stim":155,"angles_stim":300,"category":"B"},{"radii":184,"angles":388,"radii_stim":130,"angles_stim":247,"category":"A"},{"radii":1,"angles":456,"radii_stim":75,"angles_stim":264,"category":"A"},{"radii":1,"angles":120,"radii_stim":75,"angles_stim":180,"category":"A"},{"radii":1,"angles":60,"radii_stim":75,"angles_stim":165,"category":"A"},{"radii":1,"angles":600,"radii_stim":75,"angles_stim":300,"category":"B"},{"radii":144,"angles":96,"radii_stim":118,"angles_stim":174,"category":"A"}]},{"cond_indicator":9,"subids":24,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":436,"angles":1,"radii_stim":197,"angles_stim":70,"category":"B"},{"radii":396,"angles":388,"radii_stim":183,"angles_stim":167,"category":"B"},{"radii":57,"angles":68,"radii_stim":63,"angles_stim":87,"category":"A"},{"radii":600,"angles":100,"radii_stim":255,"angles_stim":95,"category":"B"},{"radii":1,"angles":440,"radii_stim":43,"angles_stim":180,"category":"A"},{"radii":221,"angles":12,"radii_stim":121,"angles_stim":73,"category":"A"},{"radii":221,"angles":432,"radii_stim":121,"angles_stim":178,"category":"A"},{"radii":388,"angles":432,"radii_stim":180,"angles_stim":178,"category":"B"},{"radii":393,"angles":244,"radii_stim":182,"angles_stim":131,"category":"B"},{"radii":334,"angles":288,"radii_stim":161,"angles_stim":142,"category":"B"},{"radii":303,"angles":296,"radii_stim":150,"angles_stim":144,"category":"B"},{"radii":1,"angles":84,"radii_stim":43,"angles_stim":91,"category":"A"},{"radii":600,"angles":328,"radii_stim":255,"angles_stim":152,"category":"B"},{"radii":379,"angles":496,"radii_stim":177,"angles_stim":194,"category":"B"},{"radii":464,"angles":1,"radii_stim":207,"angles_stim":70,"category":"B"},{"radii":399,"angles":468,"radii_stim":184,"angles_stim":187,"category":"B"},{"radii":334,"angles":568,"radii_stim":161,"angles_stim":212,"category":"B"},{"radii":294,"angles":440,"radii_stim":147,"angles_stim":180,"category":"A"},{"radii":255,"angles":80,"radii_stim":133,"angles_stim":90,"category":"A"},{"radii":495,"angles":356,"radii_stim":218,"angles_stim":159,"category":"B"},{"radii":580,"angles":1,"radii_stim":248,"angles_stim":70,"category":"B"},{"radii":600,"angles":592,"radii_stim":255,"angles_stim":218,"category":"B"},{"radii":173,"angles":564,"radii_stim":104,"angles_stim":211,"category":"A"},{"radii":416,"angles":284,"radii_stim":190,"angles_stim":141,"category":"B"},{"radii":467,"angles":264,"radii_stim":208,"angles_stim":136,"category":"B"},{"radii":9,"angles":188,"radii_stim":46,"angles_stim":117,"category":"A"},{"radii":470,"angles":176,"radii_stim":209,"angles_stim":114,"category":"B"},{"radii":413,"angles":352,"radii_stim":189,"angles_stim":158,"category":"B"},{"radii":390,"angles":320,"radii_stim":181,"angles_stim":150,"category":"B"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":70,"category":"B"},{"radii":351,"angles":260,"radii_stim":167,"angles_stim":135,"category":"B"},{"radii":492,"angles":312,"radii_stim":217,"angles_stim":148,"category":"B"}]},{"cond_indicator":10,"subids":27,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":349,"angles":1,"radii_stim":179,"angles_stim":8,"category":"B"},{"radii":1,"angles":180,"radii_stim":73,"angles_stim":53,"category":"A"},{"radii":600,"angles":524,"radii_stim":255,"angles_stim":139,"category":"B"},{"radii":524,"angles":600,"radii_stim":232,"angles_stim":158,"category":"B"},{"radii":264,"angles":516,"radii_stim":153,"angles_stim":137,"category":"A"},{"radii":211,"angles":600,"radii_stim":137,"angles_stim":158,"category":"A"},{"radii":600,"angles":8,"radii_stim":255,"angles_stim":10,"category":"B"},{"radii":422,"angles":264,"radii_stim":201,"angles_stim":74,"category":"B"},{"radii":339,"angles":544,"radii_stim":176,"angles_stim":144,"category":"B"},{"radii":455,"angles":136,"radii_stim":211,"angles_stim":42,"category":"B"},{"radii":471,"angles":600,"radii_stim":216,"angles_stim":158,"category":"B"},{"radii":461,"angles":444,"radii_stim":213,"angles_stim":119,"category":"B"},{"radii":1,"angles":1,"radii_stim":73,"angles_stim":8,"category":"A"},{"radii":405,"angles":4,"radii_stim":196,"angles_stim":9,"category":"B"},{"radii":1,"angles":152,"radii_stim":73,"angles_stim":46,"category":"A"},{"radii":280,"angles":600,"radii_stim":158,"angles_stim":158,"category":"A"},{"radii":162,"angles":120,"radii_stim":122,"angles_stim":38,"category":"A"},{"radii":567,"angles":460,"radii_stim":245,"angles_stim":123,"category":"B"},{"radii":600,"angles":252,"radii_stim":255,"angles_stim":71,"category":"B"},{"radii":297,"angles":104,"radii_stim":163,"angles_stim":34,"category":"A"},{"radii":497,"angles":456,"radii_stim":224,"angles_stim":122,"category":"B"},{"radii":583,"angles":300,"radii_stim":250,"angles_stim":83,"category":"B"},{"radii":600,"angles":440,"radii_stim":255,"angles_stim":118,"category":"B"},{"radii":106,"angles":168,"radii_stim":105,"angles_stim":50,"category":"A"},{"radii":20,"angles":232,"radii_stim":79,"angles_stim":66,"category":"A"},{"radii":7,"angles":176,"radii_stim":75,"angles_stim":52,"category":"A"},{"radii":471,"angles":376,"radii_stim":216,"angles_stim":102,"category":"B"},{"radii":162,"angles":36,"radii_stim":122,"angles_stim":17,"category":"A"},{"radii":330,"angles":516,"radii_stim":173,"angles_stim":137,"category":"B"},{"radii":600,"angles":132,"radii_stim":255,"angles_stim":41,"category":"B"},{"radii":494,"angles":580,"radii_stim":223,"angles_stim":153,"category":"B"},{"radii":1,"angles":600,"radii_stim":73,"angles_stim":158,"category":"A"}]},{"cond_indicator":11,"subids":29,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":396,"angles":412,"radii_stim":178,"angles_stim":208,"category":"B"},{"radii":404,"angles":348,"radii_stim":181,"angles_stim":192,"category":"B"},{"radii":143,"angles":1,"radii_stim":82,"angles_stim":105,"category":"A"},{"radii":69,"angles":1,"radii_stim":54,"angles_stim":105,"category":"A"},{"radii":534,"angles":264,"radii_stim":230,"angles_stim":171,"category":"B"},{"radii":333,"angles":1,"radii_stim":154,"angles_stim":105,"category":"B"},{"radii":14,"angles":220,"radii_stim":33,"angles_stim":160,"category":"A"},{"radii":85,"angles":232,"radii_stim":60,"angles_stim":163,"category":"A"},{"radii":90,"angles":452,"radii_stim":62,"angles_stim":218,"category":"A"},{"radii":600,"angles":412,"radii_stim":255,"angles_stim":208,"category":"B"},{"radii":320,"angles":412,"radii_stim":149,"angles_stim":208,"category":"B"},{"radii":175,"angles":536,"radii_stim":94,"angles_stim":239,"category":"A"},{"radii":307,"angles":296,"radii_stim":144,"angles_stim":179,"category":"B"},{"radii":45,"angles":272,"radii_stim":45,"angles_stim":173,"category":"A"},{"radii":32,"angles":304,"radii_stim":40,"angles_stim":181,"category":"A"},{"radii":460,"angles":164,"radii_stim":202,"angles_stim":146,"category":"B"},{"radii":1,"angles":76,"radii_stim":28,"angles_stim":124,"category":"A"},{"radii":600,"angles":64,"radii_stim":255,"angles_stim":121,"category":"B"},{"radii":330,"angles":312,"radii_stim":153,"angles_stim":183,"category":"B"},{"radii":69,"angles":264,"radii_stim":54,"angles_stim":171,"category":"A"},{"radii":130,"angles":336,"radii_stim":77,"angles_stim":189,"category":"A"},{"radii":85,"angles":288,"radii_stim":60,"angles_stim":177,"category":"A"},{"radii":510,"angles":300,"radii_stim":221,"angles_stim":180,"category":"B"},{"radii":246,"angles":1,"radii_stim":121,"angles_stim":105,"category":"A"},{"radii":394,"angles":16,"radii_stim":177,"angles_stim":109,"category":"B"},{"radii":367,"angles":48,"radii_stim":167,"angles_stim":117,"category":"B"},{"radii":600,"angles":508,"radii_stim":255,"angles_stim":232,"category":"B"},{"radii":183,"angles":1,"radii_stim":97,"angles_stim":105,"category":"A"},{"radii":328,"angles":552,"radii_stim":152,"angles_stim":243,"category":"B"},{"radii":396,"angles":600,"radii_stim":178,"angles_stim":255,"category":"B"},{"radii":373,"angles":396,"radii_stim":169,"angles_stim":204,"category":"B"},{"radii":1,"angles":552,"radii_stim":28,"angles_stim":243,"category":"A"}]},{"cond_indicator":12,"subids":36,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":600,"angles":348,"radii_stim":255,"angles_stim":176,"category":"B"},{"radii":463,"angles":1,"radii_stim":203,"angles_stim":89,"category":"B"},{"radii":312,"angles":1,"radii_stim":145,"angles_stim":89,"category":"B"},{"radii":565,"angles":356,"radii_stim":242,"angles_stim":178,"category":"B"},{"radii":45,"angles":464,"radii_stim":43,"angles_stim":205,"category":"A"},{"radii":113,"angles":516,"radii_stim":69,"angles_stim":218,"category":"A"},{"radii":500,"angles":256,"radii_stim":217,"angles_stim":153,"category":"B"},{"radii":398,"angles":356,"radii_stim":178,"angles_stim":178,"category":"B"},{"radii":152,"angles":436,"radii_stim":84,"angles_stim":198,"category":"A"},{"radii":403,"angles":1,"radii_stim":180,"angles_stim":89,"category":"B"},{"radii":40,"angles":356,"radii_stim":41,"angles_stim":178,"category":"A"},{"radii":542,"angles":420,"radii_stim":233,"angles_stim":194,"category":"B"},{"radii":312,"angles":480,"radii_stim":145,"angles_stim":209,"category":"B"},{"radii":466,"angles":148,"radii_stim":204,"angles_stim":126,"category":"B"},{"radii":254,"angles":116,"radii_stim":123,"angles_stim":118,"category":"A"},{"radii":157,"angles":144,"radii_stim":86,"angles_stim":125,"category":"A"},{"radii":505,"angles":116,"radii_stim":219,"angles_stim":118,"category":"B"},{"radii":220,"angles":124,"radii_stim":110,"angles_stim":120,"category":"A"},{"radii":511,"angles":172,"radii_stim":221,"angles_stim":132,"category":"B"},{"radii":356,"angles":592,"radii_stim":162,"angles_stim":237,"category":"B"},{"radii":50,"angles":228,"radii_stim":45,"angles_stim":146,"category":"A"},{"radii":445,"angles":252,"radii_stim":196,"angles_stim":152,"category":"B"},{"radii":600,"angles":224,"radii_stim":255,"angles_stim":145,"category":"B"},{"radii":178,"angles":588,"radii_stim":94,"angles_stim":236,"category":"A"},{"radii":341,"angles":336,"radii_stim":156,"angles_stim":173,"category":"B"},{"radii":220,"angles":40,"radii_stim":110,"angles_stim":99,"category":"A"},{"radii":330,"angles":1,"radii_stim":152,"angles_stim":89,"category":"B"},{"radii":157,"angles":372,"radii_stim":86,"angles_stim":182,"category":"A"},{"radii":307,"angles":232,"radii_stim":143,"angles_stim":147,"category":"B"},{"radii":58,"angles":332,"radii_stim":48,"angles_stim":172,"category":"A"},{"radii":482,"angles":424,"radii_stim":210,"angles_stim":195,"category":"B"},{"radii":424,"angles":240,"radii_stim":188,"angles_stim":149,"category":"B"}]},{"cond_indicator":13,"subids":42,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":77,"angles":28,"radii_stim":98,"angles_stim":90,"category":"A"},{"radii":460,"angles":28,"radii_stim":213,"angles_stim":90,"category":"B"},{"radii":1,"angles":28,"radii_stim":75,"angles_stim":90,"category":"A"},{"radii":1,"angles":28,"radii_stim":75,"angles_stim":90,"category":"A"},{"radii":600,"angles":28,"radii_stim":255,"angles_stim":90,"category":"B"},{"radii":600,"angles":432,"radii_stim":255,"angles_stim":191,"category":"B"},{"radii":1,"angles":512,"radii_stim":75,"angles_stim":211,"category":"A"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":233,"category":"B"},{"radii":17,"angles":452,"radii_stim":80,"angles_stim":196,"category":"A"},{"radii":124,"angles":596,"radii_stim":112,"angles_stim":232,"category":"A"},{"radii":1,"angles":600,"radii_stim":75,"angles_stim":233,"category":"A"},{"radii":596,"angles":472,"radii_stim":254,"angles_stim":201,"category":"B"},{"radii":523,"angles":248,"radii_stim":232,"angles_stim":145,"category":"B"},{"radii":223,"angles":4,"radii_stim":142,"angles_stim":84,"category":"A"},{"radii":217,"angles":144,"radii_stim":140,"angles_stim":119,"category":"A"},{"radii":17,"angles":516,"radii_stim":80,"angles_stim":212,"category":"A"},{"radii":600,"angles":160,"radii_stim":255,"angles_stim":123,"category":"B"},{"radii":237,"angles":116,"radii_stim":146,"angles_stim":112,"category":"A"},{"radii":470,"angles":8,"radii_stim":216,"angles_stim":85,"category":"B"},{"radii":333,"angles":192,"radii_stim":175,"angles_stim":131,"category":"B"},{"radii":260,"angles":240,"radii_stim":153,"angles_stim":143,"category":"A"},{"radii":290,"angles":424,"radii_stim":162,"angles_stim":189,"category":"A"},{"radii":297,"angles":12,"radii_stim":164,"angles_stim":86,"category":"A"},{"radii":397,"angles":312,"radii_stim":194,"angles_stim":161,"category":"B"},{"radii":280,"angles":360,"radii_stim":159,"angles_stim":173,"category":"A"},{"radii":380,"angles":228,"radii_stim":189,"angles_stim":140,"category":"B"},{"radii":393,"angles":192,"radii_stim":193,"angles_stim":131,"category":"B"},{"radii":446,"angles":560,"radii_stim":209,"angles_stim":223,"category":"B"},{"radii":330,"angles":220,"radii_stim":174,"angles_stim":138,"category":"B"},{"radii":370,"angles":120,"radii_stim":186,"angles_stim":113,"category":"B"},{"radii":297,"angles":28,"radii_stim":164,"angles_stim":90,"category":"A"},{"radii":94,"angles":168,"radii_stim":103,"angles_stim":125,"category":"A"}]},{"cond_indicator":14,"subids":53,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":390,"angles":600,"radii_stim":181,"angles_stim":254,"category":"B"},{"radii":1,"angles":592,"radii_stim":43,"angles_stim":252,"category":"A"},{"radii":600,"angles":68,"radii_stim":255,"angles_stim":121,"category":"B"},{"radii":1,"angles":48,"radii_stim":43,"angles_stim":116,"category":"A"},{"radii":153,"angles":1,"radii_stim":97,"angles_stim":104,"category":"A"},{"radii":181,"angles":92,"radii_stim":107,"angles_stim":127,"category":"A"},{"radii":130,"angles":600,"radii_stim":89,"angles_stim":254,"category":"A"},{"radii":597,"angles":188,"radii_stim":254,"angles_stim":151,"category":"B"},{"radii":438,"angles":600,"radii_stim":198,"angles_stim":254,"category":"B"},{"radii":68,"angles":208,"radii_stim":67,"angles_stim":156,"category":"A"},{"radii":125,"angles":300,"radii_stim":87,"angles_stim":179,"category":"A"},{"radii":433,"angles":220,"radii_stim":196,"angles_stim":159,"category":"B"},{"radii":334,"angles":360,"radii_stim":161,"angles_stim":194,"category":"B"},{"radii":580,"angles":212,"radii_stim":248,"angles_stim":157,"category":"B"},{"radii":503,"angles":208,"radii_stim":221,"angles_stim":156,"category":"B"},{"radii":184,"angles":204,"radii_stim":108,"angles_stim":155,"category":"A"},{"radii":133,"angles":424,"radii_stim":90,"angles_stim":210,"category":"A"},{"radii":280,"angles":292,"radii_stim":142,"angles_stim":177,"category":"A"},{"radii":26,"angles":412,"radii_stim":52,"angles_stim":207,"category":"A"},{"radii":125,"angles":268,"radii_stim":87,"angles_stim":171,"category":"A"},{"radii":238,"angles":4,"radii_stim":127,"angles_stim":105,"category":"A"},{"radii":419,"angles":164,"radii_stim":191,"angles_stim":145,"category":"B"},{"radii":481,"angles":80,"radii_stim":213,"angles_stim":124,"category":"B"},{"radii":190,"angles":336,"radii_stim":110,"angles_stim":188,"category":"A"},{"radii":597,"angles":124,"radii_stim":254,"angles_stim":135,"category":"B"},{"radii":588,"angles":596,"radii_stim":251,"angles_stim":253,"category":"B"},{"radii":272,"angles":224,"radii_stim":139,"angles_stim":160,"category":"A"},{"radii":97,"angles":232,"radii_stim":77,"angles_stim":162,"category":"A"},{"radii":458,"angles":180,"radii_stim":205,"angles_stim":149,"category":"B"},{"radii":167,"angles":440,"radii_stim":102,"angles_stim":214,"category":"A"},{"radii":255,"angles":136,"radii_stim":133,"angles_stim":138,"category":"A"},{"radii":410,"angles":16,"radii_stim":188,"angles_stim":108,"category":"B"}]},{"cond_indicator":15,"subids":55,"category_type":"information-integration","order":"order2","antenna_vals":[{"radii":593,"angles":576,"radii_stim":253,"angles_stim":283,"category":"B"},{"radii":1,"angles":344,"radii_stim":60,"angles_stim":225,"category":"A"},{"radii":596,"angles":184,"radii_stim":254,"angles_stim":185,"category":"B"},{"radii":1,"angles":88,"radii_stim":60,"angles_stim":161,"category":"A"},{"radii":600,"angles":520,"radii_stim":255,"angles_stim":269,"category":"B"},{"radii":600,"angles":168,"radii_stim":255,"angles_stim":181,"category":"B"},{"radii":1,"angles":512,"radii_stim":60,"angles_stim":267,"category":"A"},{"radii":600,"angles":356,"radii_stim":255,"angles_stim":228,"category":"B"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":139,"category":"B"},{"radii":1,"angles":348,"radii_stim":60,"angles_stim":226,"category":"A"},{"radii":311,"angles":524,"radii_stim":161,"angles_stim":270,"category":"B"},{"radii":513,"angles":524,"radii_stim":227,"angles_stim":270,"category":"B"},{"radii":274,"angles":528,"radii_stim":149,"angles_stim":271,"category":"B"},{"radii":120,"angles":520,"radii_stim":99,"angles_stim":269,"category":"B"},{"radii":13,"angles":520,"radii_stim":64,"angles_stim":269,"category":"A"},{"radii":44,"angles":528,"radii_stim":74,"angles_stim":271,"category":"A"},{"radii":123,"angles":160,"radii_stim":100,"angles_stim":179,"category":"A"},{"radii":381,"angles":160,"radii_stim":184,"angles_stim":179,"category":"A"},{"radii":332,"angles":516,"radii_stim":168,"angles_stim":268,"category":"B"},{"radii":314,"angles":524,"radii_stim":162,"angles_stim":270,"category":"B"},{"radii":1,"angles":516,"radii_stim":60,"angles_stim":268,"category":"A"},{"radii":240,"angles":520,"radii_stim":138,"angles_stim":269,"category":"B"},{"radii":1,"angles":288,"radii_stim":60,"angles_stim":211,"category":"A"},{"radii":600,"angles":348,"radii_stim":255,"angles_stim":226,"category":"B"},{"radii":1,"angles":348,"radii_stim":60,"angles_stim":226,"category":"A"},{"radii":194,"angles":396,"radii_stim":123,"angles_stim":238,"category":"A"},{"radii":600,"angles":156,"radii_stim":255,"angles_stim":178,"category":"B"},{"radii":1,"angles":584,"radii_stim":60,"angles_stim":285,"category":"A"},{"radii":206,"angles":400,"radii_stim":127,"angles_stim":239,"category":"B"},{"radii":163,"angles":524,"radii_stim":113,"angles_stim":270,"category":"B"},{"radii":206,"angles":432,"radii_stim":127,"angles_stim":247,"category":"B"},{"radii":206,"angles":476,"radii_stim":127,"angles_stim":258,"category":"B"}]},{"cond_indicator":16,"subids":56,"category_type":"information-integration","order":"order1","antenna_vals":[{"radii":600,"angles":428,"radii_stim":255,"angles_stim":180,"category":"B"},{"radii":1,"angles":428,"radii_stim":44,"angles_stim":180,"category":"A"},{"radii":247,"angles":424,"radii_stim":131,"angles_stim":179,"category":"A"},{"radii":600,"angles":64,"radii_stim":255,"angles_stim":89,"category":"B"},{"radii":154,"angles":64,"radii_stim":98,"angles_stim":89,"category":"B"},{"radii":1,"angles":56,"radii_stim":44,"angles_stim":87,"category":"A"},{"radii":529,"angles":244,"radii_stim":230,"angles_stim":134,"category":"B"},{"radii":225,"angles":212,"radii_stim":123,"angles_stim":126,"category":"B"},{"radii":1,"angles":216,"radii_stim":44,"angles_stim":127,"category":"A"},{"radii":77,"angles":232,"radii_stim":71,"angles_stim":131,"category":"A"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":73,"category":"B"},{"radii":159,"angles":1,"radii_stim":100,"angles_stim":73,"category":"B"},{"radii":1,"angles":52,"radii_stim":44,"angles_stim":86,"category":"A"},{"radii":148,"angles":332,"radii_stim":96,"angles_stim":156,"category":"A"},{"radii":213,"angles":376,"radii_stim":119,"angles_stim":167,"category":"A"},{"radii":213,"angles":236,"radii_stim":119,"angles_stim":132,"category":"A"},{"radii":375,"angles":600,"radii_stim":176,"angles_stim":223,"category":"A"},{"radii":446,"angles":600,"radii_stim":201,"angles_stim":223,"category":"A"},{"radii":509,"angles":1,"radii_stim":223,"angles_stim":73,"category":"B"},{"radii":77,"angles":248,"radii_stim":71,"angles_stim":135,"category":"A"},{"radii":1,"angles":1,"radii_stim":44,"angles_stim":73,"category":"B"},{"radii":100,"angles":584,"radii_stim":79,"angles_stim":219,"category":"A"},{"radii":600,"angles":56,"radii_stim":255,"angles_stim":87,"category":"B"},{"radii":333,"angles":180,"radii_stim":161,"angles_stim":118,"category":"B"},{"radii":194,"angles":260,"radii_stim":112,"angles_stim":138,"category":"A"},{"radii":347,"angles":516,"radii_stim":166,"angles_stim":202,"category":"A"},{"radii":40,"angles":524,"radii_stim":58,"angles_stim":204,"category":"A"},{"radii":401,"angles":600,"radii_stim":185,"angles_stim":223,"category":"A"},{"radii":449,"angles":36,"radii_stim":202,"angles_stim":82,"category":"B"},{"radii":228,"angles":600,"radii_stim":124,"angles_stim":223,"category":"A"},{"radii":137,"angles":600,"radii_stim":92,"angles_stim":223,"category":"A"},{"radii":350,"angles":388,"radii_stim":167,"angles_stim":170,"category":"A"}]},{"cond_indicator":17,"subids":58,"category_type":"information-integration","order":"order2","antenna_vals":[{"radii":327,"angles":244,"radii_stim":170,"angles_stim":105,"category":"A"},{"radii":583,"angles":256,"radii_stim":250,"angles_stim":108,"category":"B"},{"radii":340,"angles":544,"radii_stim":174,"angles_stim":180,"category":"B"},{"radii":423,"angles":544,"radii_stim":200,"angles_stim":180,"category":"B"},{"radii":600,"angles":188,"radii_stim":255,"angles_stim":91,"category":"B"},{"radii":1,"angles":360,"radii_stim":68,"angles_stim":134,"category":"A"},{"radii":84,"angles":348,"radii_stim":94,"angles_stim":131,"category":"A"},{"radii":1,"angles":524,"radii_stim":68,"angles_stim":175,"category":"A"},{"radii":600,"angles":540,"radii_stim":255,"angles_stim":179,"category":"B"},{"radii":1,"angles":356,"radii_stim":68,"angles_stim":133,"category":"A"},{"radii":1,"angles":148,"radii_stim":68,"angles_stim":81,"category":"A"},{"radii":1,"angles":192,"radii_stim":68,"angles_stim":92,"category":"A"},{"radii":199,"angles":356,"radii_stim":130,"angles_stim":133,"category":"A"},{"radii":1,"angles":572,"radii_stim":68,"angles_stim":187,"category":"A"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":44,"category":"B"},{"radii":167,"angles":468,"radii_stim":120,"angles_stim":161,"category":"B"},{"radii":1,"angles":184,"radii_stim":68,"angles_stim":90,"category":"A"},{"radii":49,"angles":388,"radii_stim":83,"angles_stim":141,"category":"A"},{"radii":298,"angles":388,"radii_stim":161,"angles_stim":141,"category":"B"},{"radii":551,"angles":368,"radii_stim":240,"angles_stim":136,"category":"B"},{"radii":148,"angles":108,"radii_stim":114,"angles_stim":71,"category":"A"},{"radii":478,"angles":1,"radii_stim":217,"angles_stim":44,"category":"A"},{"radii":600,"angles":252,"radii_stim":255,"angles_stim":107,"category":"B"},{"radii":7,"angles":364,"radii_stim":70,"angles_stim":135,"category":"A"},{"radii":382,"angles":600,"radii_stim":187,"angles_stim":194,"category":"B"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":194,"category":"B"},{"radii":1,"angles":540,"radii_stim":68,"angles_stim":179,"category":"A"},{"radii":414,"angles":144,"radii_stim":197,"angles_stim":80,"category":"A"},{"radii":13,"angles":532,"radii_stim":72,"angles_stim":177,"category":"A"},{"radii":385,"angles":288,"radii_stim":188,"angles_stim":116,"category":"B"},{"radii":321,"angles":600,"radii_stim":168,"angles_stim":194,"category":"B"},{"radii":513,"angles":68,"radii_stim":228,"angles_stim":61,"category":"A"}]},{"cond_indicator":18,"subids":61,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":373,"angles":140,"radii_stim":181,"angles_stim":71,"category":"B"},{"radii":471,"angles":212,"radii_stim":213,"angles_stim":89,"category":"B"},{"radii":22,"angles":144,"radii_stim":66,"angles_stim":72,"category":"A"},{"radii":600,"angles":492,"radii_stim":255,"angles_stim":159,"category":"B"},{"radii":1,"angles":172,"radii_stim":59,"angles_stim":79,"category":"A"},{"radii":184,"angles":460,"radii_stim":119,"angles_stim":151,"category":"A"},{"radii":554,"angles":548,"radii_stim":240,"angles_stim":173,"category":"B"},{"radii":86,"angles":400,"radii_stim":87,"angles_stim":136,"category":"A"},{"radii":532,"angles":1,"radii_stim":233,"angles_stim":36,"category":"B"},{"radii":379,"angles":80,"radii_stim":183,"angles_stim":56,"category":"B"},{"radii":1,"angles":1,"radii_stim":59,"angles_stim":36,"category":"A"},{"radii":98,"angles":340,"radii_stim":91,"angles_stim":121,"category":"A"},{"radii":401,"angles":576,"radii_stim":190,"angles_stim":180,"category":"B"},{"radii":300,"angles":184,"radii_stim":157,"angles_stim":82,"category":"B"},{"radii":199,"angles":588,"radii_stim":124,"angles_stim":183,"category":"A"},{"radii":190,"angles":360,"radii_stim":121,"angles_stim":126,"category":"A"},{"radii":548,"angles":464,"radii_stim":238,"angles_stim":152,"category":"B"},{"radii":379,"angles":220,"radii_stim":183,"angles_stim":91,"category":"B"},{"radii":129,"angles":216,"radii_stim":101,"angles_stim":90,"category":"A"},{"radii":361,"angles":180,"radii_stim":177,"angles_stim":81,"category":"B"},{"radii":162,"angles":132,"radii_stim":112,"angles_stim":69,"category":"A"},{"radii":257,"angles":140,"radii_stim":143,"angles_stim":71,"category":"A"},{"radii":331,"angles":200,"radii_stim":167,"angles_stim":86,"category":"B"},{"radii":187,"angles":232,"radii_stim":120,"angles_stim":94,"category":"A"},{"radii":263,"angles":432,"radii_stim":145,"angles_stim":144,"category":"A"},{"radii":297,"angles":220,"radii_stim":156,"angles_stim":91,"category":"A"},{"radii":395,"angles":284,"radii_stim":188,"angles_stim":107,"category":"B"},{"radii":349,"angles":280,"radii_stim":173,"angles_stim":106,"category":"B"},{"radii":276,"angles":24,"radii_stim":149,"angles_stim":42,"category":"A"},{"radii":257,"angles":244,"radii_stim":143,"angles_stim":97,"category":"A"},{"radii":300,"angles":368,"radii_stim":157,"angles_stim":128,"category":"B"},{"radii":367,"angles":456,"radii_stim":179,"angles_stim":150,"category":"B"}]},{"cond_indicator":19,"subids":62,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":391,"angles":600,"radii_stim":189,"angles_stim":259,"category":"B"},{"radii":549,"angles":284,"radii_stim":239,"angles_stim":180,"category":"B"},{"radii":35,"angles":432,"radii_stim":76,"angles_stim":217,"category":"A"},{"radii":265,"angles":396,"radii_stim":149,"angles_stim":208,"category":"A"},{"radii":174,"angles":600,"radii_stim":120,"angles_stim":259,"category":"A"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":259,"category":"B"},{"radii":1,"angles":1,"radii_stim":65,"angles_stim":109,"category":"A"},{"radii":600,"angles":368,"radii_stim":255,"angles_stim":201,"category":"B"},{"radii":205,"angles":1,"radii_stim":130,"angles_stim":109,"category":"A"},{"radii":1,"angles":84,"radii_stim":65,"angles_stim":130,"category":"A"},{"radii":600,"angles":200,"radii_stim":255,"angles_stim":159,"category":"B"},{"radii":10,"angles":228,"radii_stim":68,"angles_stim":166,"category":"A"},{"radii":600,"angles":228,"radii_stim":255,"angles_stim":166,"category":"B"},{"radii":1,"angles":448,"radii_stim":65,"angles_stim":221,"category":"A"},{"radii":600,"angles":44,"radii_stim":255,"angles_stim":120,"category":"B"},{"radii":1,"angles":120,"radii_stim":65,"angles_stim":139,"category":"A"},{"radii":600,"angles":244,"radii_stim":255,"angles_stim":170,"category":"B"},{"radii":303,"angles":20,"radii_stim":161,"angles_stim":114,"category":"B"},{"radii":1,"angles":352,"radii_stim":65,"angles_stim":197,"category":"A"},{"radii":164,"angles":184,"radii_stim":117,"angles_stim":155,"category":"A"},{"radii":395,"angles":68,"radii_stim":190,"angles_stim":126,"category":"B"},{"radii":268,"angles":544,"radii_stim":150,"angles_stim":245,"category":"A"},{"radii":287,"angles":384,"radii_stim":156,"angles_stim":205,"category":"A"},{"radii":473,"angles":576,"radii_stim":215,"angles_stim":253,"category":"B"},{"radii":281,"angles":288,"radii_stim":154,"angles_stim":181,"category":"A"},{"radii":385,"angles":204,"radii_stim":187,"angles_stim":160,"category":"B"},{"radii":281,"angles":136,"radii_stim":154,"angles_stim":143,"category":"A"},{"radii":369,"angles":272,"radii_stim":182,"angles_stim":177,"category":"B"},{"radii":461,"angles":600,"radii_stim":211,"angles_stim":259,"category":"B"},{"radii":328,"angles":216,"radii_stim":169,"angles_stim":163,"category":"B"},{"radii":243,"angles":288,"radii_stim":142,"angles_stim":181,"category":"A"},{"radii":221,"angles":180,"radii_stim":135,"angles_stim":154,"category":"A"}]},{"cond_indicator":20,"subids":65,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":600,"angles":452,"radii_stim":255,"angles_stim":161,"category":"B"},{"radii":488,"angles":296,"radii_stim":212,"angles_stim":122,"category":"B"},{"radii":347,"angles":1,"radii_stim":158,"angles_stim":48,"category":"B"},{"radii":524,"angles":528,"radii_stim":226,"angles_stim":180,"category":"B"},{"radii":336,"angles":1,"radii_stim":154,"angles_stim":48,"category":"B"},{"radii":89,"angles":312,"radii_stim":59,"angles_stim":126,"category":"A"},{"radii":493,"angles":264,"radii_stim":214,"angles_stim":114,"category":"B"},{"radii":251,"angles":320,"radii_stim":121,"angles_stim":128,"category":"A"},{"radii":237,"angles":344,"radii_stim":116,"angles_stim":134,"category":"A"},{"radii":154,"angles":328,"radii_stim":84,"angles_stim":130,"category":"A"},{"radii":290,"angles":348,"radii_stim":136,"angles_stim":135,"category":"A"},{"radii":349,"angles":600,"radii_stim":159,"angles_stim":198,"category":"B"},{"radii":222,"angles":344,"radii_stim":110,"angles_stim":134,"category":"A"},{"radii":477,"angles":296,"radii_stim":208,"angles_stim":122,"category":"B"},{"radii":258,"angles":344,"radii_stim":124,"angles_stim":134,"category":"A"},{"radii":16,"angles":600,"radii_stim":31,"angles_stim":198,"category":"A"},{"radii":529,"angles":328,"radii_stim":228,"angles_stim":130,"category":"B"},{"radii":232,"angles":468,"radii_stim":114,"angles_stim":165,"category":"A"},{"radii":336,"angles":548,"radii_stim":154,"angles_stim":185,"category":"B"},{"radii":240,"angles":60,"radii_stim":117,"angles_stim":63,"category":"A"},{"radii":329,"angles":12,"radii_stim":151,"angles_stim":51,"category":"B"},{"radii":368,"angles":280,"radii_stim":166,"angles_stim":118,"category":"B"},{"radii":326,"angles":520,"radii_stim":150,"angles_stim":178,"category":"B"},{"radii":303,"angles":392,"radii_stim":141,"angles_stim":146,"category":"B"},{"radii":300,"angles":488,"radii_stim":140,"angles_stim":170,"category":"B"},{"radii":261,"angles":444,"radii_stim":125,"angles_stim":159,"category":"A"},{"radii":331,"angles":416,"radii_stim":152,"angles_stim":152,"category":"B"},{"radii":287,"angles":44,"radii_stim":135,"angles_stim":59,"category":"A"},{"radii":110,"angles":344,"radii_stim":67,"angles_stim":134,"category":"A"},{"radii":383,"angles":244,"radii_stim":172,"angles_stim":109,"category":"B"},{"radii":269,"angles":272,"radii_stim":128,"angles_stim":116,"category":"A"},{"radii":188,"angles":200,"radii_stim":97,"angles_stim":98,"category":"A"}]},{"cond_indicator":21,"subids":68,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":253,"angles":1,"radii_stim":140,"angles_stim":8,"category":"A"},{"radii":1,"angles":1,"radii_stim":56,"angles_stim":8,"category":"A"},{"radii":160,"angles":600,"radii_stim":109,"angles_stim":158,"category":"A"},{"radii":431,"angles":1,"radii_stim":199,"angles_stim":8,"category":"B"},{"radii":1,"angles":1,"radii_stim":56,"angles_stim":8,"category":"A"},{"radii":229,"angles":388,"radii_stim":132,"angles_stim":105,"category":"A"},{"radii":600,"angles":316,"radii_stim":255,"angles_stim":87,"category":"B"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":158,"category":"B"},{"radii":82,"angles":360,"radii_stim":83,"angles_stim":98,"category":"A"},{"radii":277,"angles":556,"radii_stim":148,"angles_stim":147,"category":"A"},{"radii":52,"angles":328,"radii_stim":73,"angles_stim":90,"category":"A"},{"radii":593,"angles":180,"radii_stim":253,"angles_stim":53,"category":"B"},{"radii":235,"angles":4,"radii_stim":134,"angles_stim":9,"category":"A"},{"radii":494,"angles":136,"radii_stim":220,"angles_stim":42,"category":"B"},{"radii":600,"angles":292,"radii_stim":255,"angles_stim":81,"category":"B"},{"radii":401,"angles":280,"radii_stim":189,"angles_stim":78,"category":"B"},{"radii":600,"angles":516,"radii_stim":255,"angles_stim":137,"category":"B"},{"radii":600,"angles":4,"radii_stim":255,"angles_stim":9,"category":"B"},{"radii":1,"angles":540,"radii_stim":56,"angles_stim":143,"category":"A"},{"radii":1,"angles":196,"radii_stim":56,"angles_stim":57,"category":"A"},{"radii":479,"angles":1,"radii_stim":215,"angles_stim":8,"category":"B"},{"radii":350,"angles":516,"radii_stim":172,"angles_stim":137,"category":"B"},{"radii":497,"angles":1,"radii_stim":221,"angles_stim":8,"category":"B"},{"radii":7,"angles":600,"radii_stim":58,"angles_stim":158,"category":"A"},{"radii":85,"angles":1,"radii_stim":84,"angles_stim":8,"category":"A"},{"radii":82,"angles":416,"radii_stim":83,"angles_stim":112,"category":"A"},{"radii":545,"angles":232,"radii_stim":237,"angles_stim":66,"category":"B"},{"radii":326,"angles":328,"radii_stim":164,"angles_stim":90,"category":"B"},{"radii":401,"angles":4,"radii_stim":189,"angles_stim":9,"category":"B"},{"radii":512,"angles":376,"radii_stim":226,"angles_stim":102,"category":"B"},{"radii":298,"angles":508,"radii_stim":155,"angles_stim":135,"category":"A"},{"radii":253,"angles":596,"radii_stim":140,"angles_stim":157,"category":"A"}]},{"cond_indicator":22,"subids":70,"category_type":"information-integration","order":"order1","antenna_vals":[{"radii":305,"angles":192,"radii_stim":168,"angles_stim":156,"category":"B"},{"radii":1,"angles":360,"radii_stim":78,"angles_stim":198,"category":"A"},{"radii":217,"angles":40,"radii_stim":142,"angles_stim":118,"category":"B"},{"radii":231,"angles":476,"radii_stim":146,"angles_stim":227,"category":"A"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":258,"category":"B"},{"radii":7,"angles":296,"radii_stim":80,"angles_stim":182,"category":"A"},{"radii":21,"angles":600,"radii_stim":84,"angles_stim":258,"category":"A"},{"radii":1,"angles":152,"radii_stim":78,"angles_stim":146,"category":"A"},{"radii":305,"angles":324,"radii_stim":168,"angles_stim":189,"category":"A"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":258,"category":"B"},{"radii":275,"angles":564,"radii_stim":159,"angles_stim":249,"category":"A"},{"radii":1,"angles":1,"radii_stim":78,"angles_stim":108,"category":"B"},{"radii":1,"angles":516,"radii_stim":78,"angles_stim":237,"category":"A"},{"radii":600,"angles":68,"radii_stim":255,"angles_stim":125,"category":"B"},{"radii":271,"angles":600,"radii_stim":158,"angles_stim":258,"category":"A"},{"radii":1,"angles":600,"radii_stim":78,"angles_stim":258,"category":"A"},{"radii":14,"angles":152,"radii_stim":82,"angles_stim":146,"category":"A"},{"radii":31,"angles":516,"radii_stim":87,"angles_stim":237,"category":"A"},{"radii":352,"angles":356,"radii_stim":182,"angles_stim":197,"category":"A"},{"radii":275,"angles":140,"radii_stim":159,"angles_stim":143,"category":"B"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":108,"category":"B"},{"radii":600,"angles":512,"radii_stim":255,"angles_stim":236,"category":"B"},{"radii":61,"angles":456,"radii_stim":96,"angles_stim":222,"category":"A"},{"radii":1,"angles":216,"radii_stim":78,"angles_stim":162,"category":"A"},{"radii":237,"angles":600,"radii_stim":148,"angles_stim":258,"category":"A"},{"radii":231,"angles":244,"radii_stim":146,"angles_stim":169,"category":"A"},{"radii":518,"angles":596,"radii_stim":231,"angles_stim":257,"category":"A"},{"radii":373,"angles":600,"radii_stim":188,"angles_stim":258,"category":"A"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":258,"category":"B"},{"radii":600,"angles":20,"radii_stim":255,"angles_stim":113,"category":"B"},{"radii":21,"angles":396,"radii_stim":84,"angles_stim":207,"category":"A"},{"radii":386,"angles":4,"radii_stim":192,"angles_stim":109,"category":"B"}]},{"cond_indicator":23,"subids":73,"category_type":"information-integration","order":"order2","antenna_vals":[{"radii":327,"angles":440,"radii_stim":152,"angles_stim":154,"category":"B"},{"radii":600,"angles":232,"radii_stim":255,"angles_stim":102,"category":"B"},{"radii":22,"angles":216,"radii_stim":37,"angles_stim":98,"category":"A"},{"radii":130,"angles":132,"radii_stim":78,"angles_stim":77,"category":"A"},{"radii":91,"angles":140,"radii_stim":63,"angles_stim":79,"category":"A"},{"radii":99,"angles":52,"radii_stim":66,"angles_stim":57,"category":"A"},{"radii":541,"angles":64,"radii_stim":233,"angles_stim":60,"category":"B"},{"radii":202,"angles":44,"radii_stim":105,"angles_stim":55,"category":"A"},{"radii":289,"angles":328,"radii_stim":138,"angles_stim":126,"category":"B"},{"radii":422,"angles":540,"radii_stim":188,"angles_stim":179,"category":"B"},{"radii":260,"angles":596,"radii_stim":127,"angles_stim":193,"category":"B"},{"radii":146,"angles":272,"radii_stim":84,"angles_stim":112,"category":"A"},{"radii":122,"angles":548,"radii_stim":75,"angles_stim":181,"category":"B"},{"radii":1,"angles":600,"radii_stim":29,"angles_stim":194,"category":"B"},{"radii":91,"angles":128,"radii_stim":63,"angles_stim":76,"category":"A"},{"radii":207,"angles":396,"radii_stim":107,"angles_stim":143,"category":"B"},{"radii":128,"angles":320,"radii_stim":77,"angles_stim":124,"category":"A"},{"radii":114,"angles":1,"radii_stim":72,"angles_stim":44,"category":"A"},{"radii":488,"angles":1,"radii_stim":213,"angles_stim":44,"category":"A"},{"radii":14,"angles":1,"radii_stim":34,"angles_stim":44,"category":"A"},{"radii":46,"angles":1,"radii_stim":46,"angles_stim":44,"category":"A"},{"radii":435,"angles":404,"radii_stim":193,"angles_stim":145,"category":"B"},{"radii":167,"angles":380,"radii_stim":92,"angles_stim":139,"category":"A"},{"radii":1,"angles":1,"radii_stim":29,"angles_stim":44,"category":"A"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":44,"category":"B"},{"radii":88,"angles":308,"radii_stim":62,"angles_stim":121,"category":"A"},{"radii":1,"angles":1,"radii_stim":29,"angles_stim":44,"category":"A"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":44,"category":"B"},{"radii":202,"angles":464,"radii_stim":105,"angles_stim":160,"category":"B"},{"radii":1,"angles":348,"radii_stim":29,"angles_stim":131,"category":"A"},{"radii":77,"angles":1,"radii_stim":58,"angles_stim":44,"category":"A"},{"radii":292,"angles":316,"radii_stim":139,"angles_stim":123,"category":"B"}]},{"cond_indicator":24,"subids":74,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":600,"angles":220,"radii_stim":255,"angles_stim":179,"category":"B"},{"radii":600,"angles":404,"radii_stim":255,"angles_stim":225,"category":"B"},{"radii":600,"angles":460,"radii_stim":255,"angles_stim":239,"category":"B"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":274,"category":"B"},{"radii":130,"angles":224,"radii_stim":110,"angles_stim":180,"category":"A"},{"radii":1,"angles":388,"radii_stim":70,"angles_stim":221,"category":"A"},{"radii":1,"angles":32,"radii_stim":70,"angles_stim":132,"category":"A"},{"radii":587,"angles":72,"radii_stim":251,"angles_stim":142,"category":"B"},{"radii":353,"angles":572,"radii_stim":179,"angles_stim":267,"category":"B"},{"radii":357,"angles":184,"radii_stim":180,"angles_stim":170,"category":"B"},{"radii":1,"angles":48,"radii_stim":70,"angles_stim":136,"category":"A"},{"radii":515,"angles":224,"radii_stim":229,"angles_stim":180,"category":"B"},{"radii":23,"angles":416,"radii_stim":77,"angles_stim":228,"category":"A"},{"radii":43,"angles":36,"radii_stim":83,"angles_stim":133,"category":"A"},{"radii":600,"angles":196,"radii_stim":255,"angles_stim":173,"category":"B"},{"radii":266,"angles":220,"radii_stim":152,"angles_stim":179,"category":"A"},{"radii":337,"angles":420,"radii_stim":174,"angles_stim":229,"category":"B"},{"radii":263,"angles":44,"radii_stim":151,"angles_stim":135,"category":"A"},{"radii":269,"angles":580,"radii_stim":153,"angles_stim":269,"category":"A"},{"radii":272,"angles":400,"radii_stim":154,"angles_stim":224,"category":"A"},{"radii":289,"angles":144,"radii_stim":159,"angles_stim":160,"category":"A"},{"radii":315,"angles":304,"radii_stim":167,"angles_stim":200,"category":"B"},{"radii":373,"angles":36,"radii_stim":185,"angles_stim":133,"category":"B"},{"radii":363,"angles":1,"radii_stim":182,"angles_stim":124,"category":"B"},{"radii":308,"angles":208,"radii_stim":165,"angles_stim":176,"category":"B"},{"radii":308,"angles":524,"radii_stim":165,"angles_stim":255,"category":"B"},{"radii":272,"angles":468,"radii_stim":154,"angles_stim":241,"category":"A"},{"radii":266,"angles":224,"radii_stim":152,"angles_stim":180,"category":"A"},{"radii":276,"angles":400,"radii_stim":155,"angles_stim":224,"category":"A"},{"radii":331,"angles":392,"radii_stim":172,"angles_stim":222,"category":"B"},{"radii":282,"angles":40,"radii_stim":157,"angles_stim":134,"category":"A"},{"radii":328,"angles":36,"radii_stim":171,"angles_stim":133,"category":"B"}]},{"cond_indicator":25,"subids":77,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":499,"angles":300,"radii_stim":225,"angles_stim":90,"category":"B"},{"radii":158,"angles":260,"radii_stim":123,"angles_stim":80,"category":"A"},{"radii":188,"angles":496,"radii_stim":132,"angles_stim":139,"category":"A"},{"radii":295,"angles":260,"radii_stim":164,"angles_stim":80,"category":"A"},{"radii":342,"angles":260,"radii_stim":178,"angles_stim":80,"category":"B"},{"radii":563,"angles":132,"radii_stim":244,"angles_stim":48,"category":"B"},{"radii":255,"angles":316,"radii_stim":152,"angles_stim":94,"category":"A"},{"radii":255,"angles":580,"radii_stim":152,"angles_stim":160,"category":"A"},{"radii":600,"angles":244,"radii_stim":255,"angles_stim":76,"category":"B"},{"radii":600,"angles":36,"radii_stim":255,"angles_stim":24,"category":"B"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":15,"category":"B"},{"radii":600,"angles":4,"radii_stim":255,"angles_stim":16,"category":"B"},{"radii":512,"angles":368,"radii_stim":229,"angles_stim":107,"category":"B"},{"radii":362,"angles":216,"radii_stim":184,"angles_stim":69,"category":"B"},{"radii":181,"angles":456,"radii_stim":130,"angles_stim":129,"category":"A"},{"radii":302,"angles":444,"radii_stim":166,"angles_stim":126,"category":"B"},{"radii":111,"angles":84,"radii_stim":109,"angles_stim":36,"category":"A"},{"radii":492,"angles":108,"radii_stim":223,"angles_stim":42,"category":"B"},{"radii":195,"angles":420,"radii_stim":134,"angles_stim":120,"category":"A"},{"radii":272,"angles":48,"radii_stim":157,"angles_stim":27,"category":"A"},{"radii":298,"angles":24,"radii_stim":165,"angles_stim":21,"category":"A"},{"radii":111,"angles":588,"radii_stim":109,"angles_stim":162,"category":"A"},{"radii":345,"angles":564,"radii_stim":179,"angles_stim":156,"category":"B"},{"radii":338,"angles":452,"radii_stim":177,"angles_stim":128,"category":"B"},{"radii":322,"angles":292,"radii_stim":172,"angles_stim":88,"category":"B"},{"radii":262,"angles":296,"radii_stim":154,"angles_stim":89,"category":"A"},{"radii":338,"angles":568,"radii_stim":177,"angles_stim":157,"category":"B"},{"radii":375,"angles":392,"radii_stim":188,"angles_stim":113,"category":"B"},{"radii":288,"angles":272,"radii_stim":162,"angles_stim":83,"category":"A"},{"radii":272,"angles":20,"radii_stim":157,"angles_stim":20,"category":"A"},{"radii":600,"angles":408,"radii_stim":255,"angles_stim":117,"category":"B"},{"radii":282,"angles":316,"radii_stim":160,"angles_stim":94,"category":"A"}]},{"cond_indicator":26,"subids":81,"category_type":"information-integration","order":"order1","antenna_vals":[{"radii":380,"angles":232,"radii_stim":172,"angles_stim":70,"category":"B"},{"radii":330,"angles":4,"radii_stim":153,"angles_stim":13,"category":"B"},{"radii":344,"angles":1,"radii_stim":158,"angles_stim":12,"category":"B"},{"radii":1,"angles":284,"radii_stim":28,"angles_stim":83,"category":"A"},{"radii":518,"angles":356,"radii_stim":224,"angles_stim":101,"category":"B"},{"radii":1,"angles":288,"radii_stim":28,"angles_stim":84,"category":"A"},{"radii":267,"angles":600,"radii_stim":129,"angles_stim":162,"category":"A"},{"radii":119,"angles":60,"radii_stim":73,"angles_stim":27,"category":"B"},{"radii":95,"angles":600,"radii_stim":64,"angles_stim":162,"category":"A"},{"radii":486,"angles":308,"radii_stim":212,"angles_stim":89,"category":"B"},{"radii":507,"angles":600,"radii_stim":220,"angles_stim":162,"category":"A"},{"radii":320,"angles":600,"radii_stim":149,"angles_stim":162,"category":"A"},{"radii":80,"angles":1,"radii_stim":58,"angles_stim":12,"category":"B"},{"radii":1,"angles":1,"radii_stim":28,"angles_stim":12,"category":"B"},{"radii":470,"angles":80,"radii_stim":206,"angles_stim":32,"category":"B"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":162,"category":"B"},{"radii":351,"angles":600,"radii_stim":161,"angles_stim":162,"category":"A"},{"radii":336,"angles":328,"radii_stim":155,"angles_stim":94,"category":"B"},{"radii":40,"angles":432,"radii_stim":43,"angles_stim":120,"category":"A"},{"radii":119,"angles":336,"radii_stim":73,"angles_stim":96,"category":"A"},{"radii":462,"angles":356,"radii_stim":203,"angles_stim":101,"category":"B"},{"radii":505,"angles":560,"radii_stim":219,"angles_stim":152,"category":"A"},{"radii":428,"angles":392,"radii_stim":190,"angles_stim":110,"category":"B"},{"radii":507,"angles":496,"radii_stim":220,"angles_stim":136,"category":"B"},{"radii":568,"angles":600,"radii_stim":243,"angles_stim":162,"category":"A"},{"radii":1,"angles":352,"radii_stim":28,"angles_stim":100,"category":"A"},{"radii":43,"angles":244,"radii_stim":44,"angles_stim":73,"category":"A"},{"radii":11,"angles":140,"radii_stim":32,"angles_stim":47,"category":"A"},{"radii":600,"angles":500,"radii_stim":255,"angles_stim":137,"category":"B"},{"radii":600,"angles":116,"radii_stim":255,"angles_stim":41,"category":"B"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":162,"category":"B"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":162,"category":"B"}]},{"cond_indicator":27,"subids":86,"category_type":"information-integration","order":"order2","antenna_vals":[{"radii":427,"angles":272,"radii_stim":204,"angles_stim":180,"category":"B"},{"radii":193,"angles":264,"radii_stim":135,"angles_stim":178,"category":"A"},{"radii":393,"angles":260,"radii_stim":194,"angles_stim":177,"category":"B"},{"radii":539,"angles":268,"radii_stim":237,"angles_stim":179,"category":"B"},{"radii":488,"angles":1,"radii_stim":222,"angles_stim":112,"category":"A"},{"radii":271,"angles":52,"radii_stim":158,"angles_stim":125,"category":"A"},{"radii":126,"angles":16,"radii_stim":115,"angles_stim":116,"category":"A"},{"radii":420,"angles":8,"radii_stim":202,"angles_stim":114,"category":"A"},{"radii":1,"angles":292,"radii_stim":78,"angles_stim":185,"category":"A"},{"radii":468,"angles":448,"radii_stim":216,"angles_stim":224,"category":"B"},{"radii":376,"angles":356,"radii_stim":189,"angles_stim":201,"category":"B"},{"radii":119,"angles":424,"radii_stim":113,"angles_stim":218,"category":"A"},{"radii":187,"angles":1,"radii_stim":133,"angles_stim":112,"category":"A"},{"radii":359,"angles":588,"radii_stim":184,"angles_stim":259,"category":"B"},{"radii":68,"angles":580,"radii_stim":98,"angles_stim":257,"category":"B"},{"radii":437,"angles":528,"radii_stim":207,"angles_stim":244,"category":"B"},{"radii":82,"angles":408,"radii_stim":102,"angles_stim":214,"category":"A"},{"radii":112,"angles":548,"radii_stim":111,"angles_stim":249,"category":"B"},{"radii":58,"angles":504,"radii_stim":95,"angles_stim":238,"category":"A"},{"radii":244,"angles":200,"radii_stim":150,"angles_stim":162,"category":"A"},{"radii":427,"angles":136,"radii_stim":204,"angles_stim":146,"category":"A"},{"radii":515,"angles":296,"radii_stim":230,"angles_stim":186,"category":"B"},{"radii":434,"angles":364,"radii_stim":206,"angles_stim":203,"category":"B"},{"radii":51,"angles":348,"radii_stim":93,"angles_stim":199,"category":"A"},{"radii":400,"angles":320,"radii_stim":196,"angles_stim":192,"category":"B"},{"radii":495,"angles":144,"radii_stim":224,"angles_stim":148,"category":"B"},{"radii":390,"angles":416,"radii_stim":193,"angles_stim":216,"category":"B"},{"radii":275,"angles":380,"radii_stim":159,"angles_stim":207,"category":"B"},{"radii":122,"angles":60,"radii_stim":114,"angles_stim":127,"category":"A"},{"radii":173,"angles":360,"radii_stim":129,"angles_stim":202,"category":"A"},{"radii":75,"angles":20,"radii_stim":100,"angles_stim":117,"category":"A"},{"radii":498,"angles":60,"radii_stim":225,"angles_stim":127,"category":"A"}]},{"cond_indicator":28,"subids":87,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":600,"angles":600,"radii_stim":255,"angles_stim":255,"category":"B"},{"radii":594,"angles":508,"radii_stim":253,"angles_stim":232,"category":"B"},{"radii":267,"angles":1,"radii_stim":133,"angles_stim":105,"category":"A"},{"radii":115,"angles":304,"radii_stim":77,"angles_stim":181,"category":"A"},{"radii":1,"angles":4,"radii_stim":35,"angles_stim":106,"category":"A"},{"radii":600,"angles":540,"radii_stim":255,"angles_stim":240,"category":"B"},{"radii":25,"angles":184,"radii_stim":44,"angles_stim":151,"category":"A"},{"radii":1,"angles":12,"radii_stim":35,"angles_stim":108,"category":"A"},{"radii":600,"angles":588,"radii_stim":255,"angles_stim":252,"category":"B"},{"radii":545,"angles":1,"radii_stim":235,"angles_stim":105,"category":"B"},{"radii":226,"angles":180,"radii_stim":118,"angles_stim":150,"category":"A"},{"radii":371,"angles":280,"radii_stim":171,"angles_stim":175,"category":"B"},{"radii":398,"angles":332,"radii_stim":181,"angles_stim":188,"category":"B"},{"radii":58,"angles":600,"radii_stim":56,"angles_stim":255,"category":"A"},{"radii":431,"angles":1,"radii_stim":193,"angles_stim":105,"category":"B"},{"radii":270,"angles":200,"radii_stim":134,"angles_stim":155,"category":"A"},{"radii":172,"angles":324,"radii_stim":98,"angles_stim":186,"category":"A"},{"radii":237,"angles":236,"radii_stim":122,"angles_stim":164,"category":"A"},{"radii":1,"angles":412,"radii_stim":35,"angles_stim":208,"category":"A"},{"radii":534,"angles":200,"radii_stim":231,"angles_stim":155,"category":"B"},{"radii":197,"angles":112,"radii_stim":107,"angles_stim":133,"category":"A"},{"radii":352,"angles":252,"radii_stim":164,"angles_stim":168,"category":"B"},{"radii":474,"angles":420,"radii_stim":209,"angles_stim":210,"category":"B"},{"radii":74,"angles":432,"radii_stim":62,"angles_stim":213,"category":"A"},{"radii":311,"angles":208,"radii_stim":149,"angles_stim":157,"category":"B"},{"radii":248,"angles":280,"radii_stim":126,"angles_stim":175,"category":"A"},{"radii":237,"angles":292,"radii_stim":122,"angles_stim":178,"category":"A"},{"radii":531,"angles":316,"radii_stim":230,"angles_stim":184,"category":"B"},{"radii":281,"angles":48,"radii_stim":138,"angles_stim":117,"category":"A"},{"radii":360,"angles":148,"radii_stim":167,"angles_stim":142,"category":"B"},{"radii":333,"angles":320,"radii_stim":157,"angles_stim":185,"category":"B"},{"radii":232,"angles":260,"radii_stim":120,"angles_stim":170,"category":"A"}]},{"cond_indicator":29,"subids":90,"category_type":"information-integration","order":"order1","antenna_vals":[{"radii":194,"angles":148,"radii_stim":127,"angles_stim":119,"category":"B"},{"radii":219,"angles":124,"radii_stim":135,"angles_stim":113,"category":"B"},{"radii":311,"angles":1,"radii_stim":164,"angles_stim":82,"category":"B"},{"radii":1,"angles":600,"radii_stim":66,"angles_stim":232,"category":"A"},{"radii":1,"angles":208,"radii_stim":66,"angles_stim":134,"category":"A"},{"radii":1,"angles":1,"radii_stim":66,"angles_stim":82,"category":"B"},{"radii":600,"angles":24,"radii_stim":255,"angles_stim":88,"category":"B"},{"radii":574,"angles":392,"radii_stim":247,"angles_stim":180,"category":"B"},{"radii":222,"angles":1,"radii_stim":136,"angles_stim":82,"category":"B"},{"radii":1,"angles":600,"radii_stim":66,"angles_stim":232,"category":"A"},{"radii":156,"angles":28,"radii_stim":115,"angles_stim":89,"category":"B"},{"radii":305,"angles":196,"radii_stim":162,"angles_stim":131,"category":"B"},{"radii":1,"angles":24,"radii_stim":66,"angles_stim":88,"category":"A"},{"radii":349,"angles":1,"radii_stim":176,"angles_stim":82,"category":"B"},{"radii":143,"angles":196,"radii_stim":111,"angles_stim":131,"category":"A"},{"radii":289,"angles":68,"radii_stim":157,"angles_stim":99,"category":"B"},{"radii":232,"angles":1,"radii_stim":139,"angles_stim":82,"category":"B"},{"radii":229,"angles":204,"radii_stim":138,"angles_stim":133,"category":"B"},{"radii":108,"angles":236,"radii_stim":100,"angles_stim":141,"category":"A"},{"radii":194,"angles":168,"radii_stim":127,"angles_stim":124,"category":"B"},{"radii":121,"angles":136,"radii_stim":104,"angles_stim":116,"category":"A"},{"radii":143,"angles":160,"radii_stim":111,"angles_stim":122,"category":"A"},{"radii":149,"angles":1,"radii_stim":113,"angles_stim":82,"category":"B"},{"radii":600,"angles":348,"radii_stim":255,"angles_stim":169,"category":"B"},{"radii":153,"angles":412,"radii_stim":114,"angles_stim":185,"category":"A"},{"radii":292,"angles":392,"radii_stim":158,"angles_stim":180,"category":"A"},{"radii":149,"angles":460,"radii_stim":113,"angles_stim":197,"category":"A"},{"radii":229,"angles":148,"radii_stim":138,"angles_stim":119,"category":"B"},{"radii":197,"angles":296,"radii_stim":128,"angles_stim":156,"category":"A"},{"radii":153,"angles":376,"radii_stim":114,"angles_stim":176,"category":"A"},{"radii":260,"angles":528,"radii_stim":148,"angles_stim":214,"category":"A"},{"radii":210,"angles":472,"radii_stim":132,"angles_stim":200,"category":"A"}]},{"cond_indicator":30,"subids":92,"category_type":"rule-based","order":"order2","antenna_vals":[{"radii":241,"angles":300,"radii_stim":139,"angles_stim":88,"category":"B"},{"radii":362,"angles":1,"radii_stim":178,"angles_stim":13,"category":"A"},{"radii":374,"angles":296,"radii_stim":182,"angles_stim":87,"category":"A"},{"radii":544,"angles":1,"radii_stim":237,"angles_stim":13,"category":"A"},{"radii":25,"angles":308,"radii_stim":69,"angles_stim":90,"category":"B"},{"radii":424,"angles":1,"radii_stim":198,"angles_stim":13,"category":"A"},{"radii":44,"angles":304,"radii_stim":75,"angles_stim":89,"category":"B"},{"radii":399,"angles":600,"radii_stim":190,"angles_stim":163,"category":"B"},{"radii":297,"angles":304,"radii_stim":157,"angles_stim":89,"category":"B"},{"radii":340,"angles":296,"radii_stim":171,"angles_stim":87,"category":"A"},{"radii":352,"angles":232,"radii_stim":175,"angles_stim":71,"category":"A"},{"radii":173,"angles":312,"radii_stim":117,"angles_stim":91,"category":"B"},{"radii":105,"angles":300,"radii_stim":95,"angles_stim":88,"category":"B"},{"radii":161,"angles":1,"radii_stim":113,"angles_stim":13,"category":"A"},{"radii":309,"angles":308,"radii_stim":161,"angles_stim":90,"category":"B"},{"radii":365,"angles":532,"radii_stim":179,"angles_stim":146,"category":"B"},{"radii":121,"angles":80,"radii_stim":100,"angles_stim":33,"category":"A"},{"radii":343,"angles":560,"radii_stim":172,"angles_stim":153,"category":"B"},{"radii":158,"angles":256,"radii_stim":112,"angles_stim":77,"category":"A"},{"radii":164,"angles":340,"radii_stim":114,"angles_stim":98,"category":"B"},{"radii":226,"angles":208,"radii_stim":134,"angles_stim":65,"category":"A"},{"radii":229,"angles":1,"radii_stim":135,"angles_stim":13,"category":"A"},{"radii":235,"angles":96,"radii_stim":137,"angles_stim":37,"category":"A"},{"radii":300,"angles":308,"radii_stim":158,"angles_stim":90,"category":"B"},{"radii":204,"angles":540,"radii_stim":127,"angles_stim":148,"category":"B"},{"radii":186,"angles":444,"radii_stim":121,"angles_stim":124,"category":"B"},{"radii":68,"angles":256,"radii_stim":83,"angles_stim":77,"category":"A"},{"radii":285,"angles":444,"radii_stim":153,"angles_stim":124,"category":"B"},{"radii":248,"angles":36,"radii_stim":141,"angles_stim":22,"category":"A"},{"radii":176,"angles":108,"radii_stim":118,"angles_stim":40,"category":"A"},{"radii":109,"angles":1,"radii_stim":96,"angles_stim":13,"category":"A"},{"radii":485,"angles":4,"radii_stim":218,"angles_stim":14,"category":"A"}]},{"cond_indicator":31,"subids":94,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":460,"angles":1,"radii_stim":212,"angles_stim":113,"category":"B"},{"radii":1,"angles":484,"radii_stim":71,"angles_stim":234,"category":"A"},{"radii":411,"angles":184,"radii_stim":197,"angles_stim":159,"category":"B"},{"radii":359,"angles":600,"radii_stim":181,"angles_stim":263,"category":"B"},{"radii":1,"angles":524,"radii_stim":71,"angles_stim":244,"category":"A"},{"radii":131,"angles":456,"radii_stim":111,"angles_stim":227,"category":"A"},{"radii":310,"angles":1,"radii_stim":166,"angles_stim":113,"category":"B"},{"radii":525,"angles":200,"radii_stim":232,"angles_stim":163,"category":"B"},{"radii":66,"angles":332,"radii_stim":91,"angles_stim":196,"category":"A"},{"radii":202,"angles":340,"radii_stim":133,"angles_stim":198,"category":"A"},{"radii":414,"angles":300,"radii_stim":198,"angles_stim":188,"category":"B"},{"radii":46,"angles":36,"radii_stim":85,"angles_stim":122,"category":"A"},{"radii":573,"angles":236,"radii_stim":247,"angles_stim":172,"category":"B"},{"radii":95,"angles":212,"radii_stim":100,"angles_stim":166,"category":"A"},{"radii":580,"angles":200,"radii_stim":249,"angles_stim":163,"category":"B"},{"radii":69,"angles":128,"radii_stim":92,"angles_stim":145,"category":"A"},{"radii":346,"angles":236,"radii_stim":177,"angles_stim":172,"category":"B"},{"radii":1,"angles":532,"radii_stim":71,"angles_stim":246,"category":"A"},{"radii":10,"angles":428,"radii_stim":74,"angles_stim":220,"category":"A"},{"radii":131,"angles":452,"radii_stim":111,"angles_stim":226,"category":"A"},{"radii":554,"angles":452,"radii_stim":241,"angles_stim":226,"category":"B"},{"radii":137,"angles":264,"radii_stim":113,"angles_stim":179,"category":"A"},{"radii":173,"angles":536,"radii_stim":124,"angles_stim":247,"category":"A"},{"radii":346,"angles":448,"radii_stim":177,"angles_stim":225,"category":"B"},{"radii":404,"angles":352,"radii_stim":195,"angles_stim":201,"category":"B"},{"radii":489,"angles":92,"radii_stim":221,"angles_stim":136,"category":"B"},{"radii":456,"angles":208,"radii_stim":211,"angles_stim":165,"category":"B"},{"radii":437,"angles":540,"radii_stim":205,"angles_stim":248,"category":"B"},{"radii":193,"angles":436,"radii_stim":130,"angles_stim":222,"category":"A"},{"radii":411,"angles":236,"radii_stim":197,"angles_stim":172,"category":"B"},{"radii":105,"angles":424,"radii_stim":103,"angles_stim":219,"category":"A"},{"radii":303,"angles":1,"radii_stim":164,"angles_stim":113,"category":"B"}]},{"cond_indicator":32,"subids":95,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":476,"angles":472,"radii_stim":213,"angles_stim":146,"category":"B"},{"radii":470,"angles":600,"radii_stim":211,"angles_stim":178,"category":"B"},{"radii":1,"angles":244,"radii_stim":52,"angles_stim":89,"category":"A"},{"radii":600,"angles":324,"radii_stim":255,"angles_stim":109,"category":"B"},{"radii":600,"angles":256,"radii_stim":255,"angles_stim":92,"category":"B"},{"radii":446,"angles":380,"radii_stim":203,"angles_stim":123,"category":"B"},{"radii":502,"angles":1,"radii_stim":222,"angles_stim":28,"category":"B"},{"radii":496,"angles":412,"radii_stim":220,"angles_stim":131,"category":"B"},{"radii":396,"angles":272,"radii_stim":186,"angles_stim":96,"category":"B"},{"radii":1,"angles":144,"radii_stim":52,"angles_stim":64,"category":"A"},{"radii":600,"angles":384,"radii_stim":255,"angles_stim":124,"category":"B"},{"radii":600,"angles":92,"radii_stim":255,"angles_stim":51,"category":"B"},{"radii":484,"angles":380,"radii_stim":216,"angles_stim":123,"category":"B"},{"radii":600,"angles":148,"radii_stim":255,"angles_stim":65,"category":"B"},{"radii":358,"angles":264,"radii_stim":173,"angles_stim":94,"category":"B"},{"radii":1,"angles":600,"radii_stim":52,"angles_stim":178,"category":"A"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":178,"category":"B"},{"radii":1,"angles":264,"radii_stim":52,"angles_stim":94,"category":"A"},{"radii":77,"angles":368,"radii_stim":78,"angles_stim":120,"category":"A"},{"radii":540,"angles":160,"radii_stim":235,"angles_stim":68,"category":"B"},{"radii":68,"angles":80,"radii_stim":75,"angles_stim":48,"category":"A"},{"radii":369,"angles":572,"radii_stim":177,"angles_stim":171,"category":"B"},{"radii":600,"angles":88,"radii_stim":255,"angles_stim":50,"category":"B"},{"radii":600,"angles":256,"radii_stim":255,"angles_stim":92,"category":"B"},{"radii":420,"angles":412,"radii_stim":194,"angles_stim":131,"category":"B"},{"radii":172,"angles":448,"radii_stim":110,"angles_stim":140,"category":"A"},{"radii":358,"angles":504,"radii_stim":173,"angles_stim":154,"category":"B"},{"radii":346,"angles":200,"radii_stim":169,"angles_stim":78,"category":"B"},{"radii":529,"angles":180,"radii_stim":231,"angles_stim":73,"category":"B"},{"radii":254,"angles":364,"radii_stim":138,"angles_stim":119,"category":"A"},{"radii":275,"angles":452,"radii_stim":145,"angles_stim":141,"category":"A"},{"radii":65,"angles":192,"radii_stim":74,"angles_stim":76,"category":"A"}]},{"cond_indicator":33,"subids":97,"category_type":"information-integration","order":"order1","antenna_vals":[{"radii":411,"angles":372,"radii_stim":185,"angles_stim":180,"category":"B"},{"radii":265,"angles":1,"radii_stim":131,"angles_stim":87,"category":"B"},{"radii":141,"angles":428,"radii_stim":85,"angles_stim":194,"category":"A"},{"radii":413,"angles":228,"radii_stim":186,"angles_stim":144,"category":"B"},{"radii":600,"angles":288,"radii_stim":255,"angles_stim":159,"category":"B"},{"radii":1,"angles":4,"radii_stim":33,"angles_stim":88,"category":"A"},{"radii":413,"angles":556,"radii_stim":186,"angles_stim":226,"category":"A"},{"radii":1,"angles":496,"radii_stim":33,"angles_stim":211,"category":"A"},{"radii":600,"angles":20,"radii_stim":255,"angles_stim":92,"category":"B"},{"radii":1,"angles":540,"radii_stim":33,"angles_stim":222,"category":"A"},{"radii":448,"angles":1,"radii_stim":199,"angles_stim":87,"category":"B"},{"radii":540,"angles":268,"radii_stim":233,"angles_stim":154,"category":"B"},{"radii":241,"angles":600,"radii_stim":122,"angles_stim":237,"category":"A"},{"radii":230,"angles":424,"radii_stim":118,"angles_stim":193,"category":"A"},{"radii":313,"angles":236,"radii_stim":149,"angles_stim":146,"category":"B"},{"radii":378,"angles":400,"radii_stim":173,"angles_stim":187,"category":"A"},{"radii":600,"angles":380,"radii_stim":255,"angles_stim":182,"category":"B"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":237,"category":"B"},{"radii":600,"angles":120,"radii_stim":255,"angles_stim":117,"category":"B"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":87,"category":"B"},{"radii":265,"angles":1,"radii_stim":131,"angles_stim":87,"category":"B"},{"radii":324,"angles":360,"radii_stim":153,"angles_stim":177,"category":"A"},{"radii":297,"angles":452,"radii_stim":143,"angles_stim":200,"category":"A"},{"radii":308,"angles":264,"radii_stim":147,"angles_stim":153,"category":"B"},{"radii":1,"angles":376,"radii_stim":33,"angles_stim":181,"category":"A"},{"radii":1,"angles":560,"radii_stim":33,"angles_stim":227,"category":"A"},{"radii":1,"angles":356,"radii_stim":33,"angles_stim":176,"category":"A"},{"radii":1,"angles":204,"radii_stim":33,"angles_stim":138,"category":"A"},{"radii":305,"angles":368,"radii_stim":146,"angles_stim":179,"category":"A"},{"radii":265,"angles":112,"radii_stim":131,"angles_stim":115,"category":"B"},{"radii":319,"angles":508,"radii_stim":151,"angles_stim":214,"category":"A"},{"radii":289,"angles":4,"radii_stim":140,"angles_stim":88,"category":"B"}]},{"cond_indicator":34,"subids":100,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":372,"angles":308,"radii_stim":169,"angles_stim":125,"category":"B"},{"radii":154,"angles":104,"radii_stim":87,"angles_stim":74,"category":"A"},{"radii":448,"angles":244,"radii_stim":198,"angles_stim":109,"category":"B"},{"radii":30,"angles":84,"radii_stim":40,"angles_stim":69,"category":"A"},{"radii":64,"angles":472,"radii_stim":53,"angles_stim":166,"category":"A"},{"radii":464,"angles":532,"radii_stim":204,"angles_stim":181,"category":"B"},{"radii":1,"angles":572,"radii_stim":29,"angles_stim":191,"category":"A"},{"radii":300,"angles":160,"radii_stim":142,"angles_stim":88,"category":"B"},{"radii":499,"angles":1,"radii_stim":217,"angles_stim":48,"category":"B"},{"radii":154,"angles":332,"radii_stim":87,"angles_stim":131,"category":"A"},{"radii":160,"angles":1,"radii_stim":89,"angles_stim":48,"category":"A"},{"radii":207,"angles":48,"radii_stim":107,"angles_stim":60,"category":"A"},{"radii":531,"angles":416,"radii_stim":229,"angles_stim":152,"category":"B"},{"radii":292,"angles":1,"radii_stim":139,"angles_stim":48,"category":"A"},{"radii":356,"angles":32,"radii_stim":163,"angles_stim":56,"category":"B"},{"radii":289,"angles":1,"radii_stim":138,"angles_stim":48,"category":"A"},{"radii":531,"angles":356,"radii_stim":229,"angles_stim":137,"category":"B"},{"radii":597,"angles":52,"radii_stim":254,"angles_stim":61,"category":"B"},{"radii":69,"angles":600,"radii_stim":55,"angles_stim":198,"category":"A"},{"radii":1,"angles":156,"radii_stim":29,"angles_stim":87,"category":"A"},{"radii":258,"angles":508,"radii_stim":126,"angles_stim":175,"category":"A"},{"radii":319,"angles":560,"radii_stim":149,"angles_stim":188,"category":"B"},{"radii":287,"angles":348,"radii_stim":137,"angles_stim":135,"category":"A"},{"radii":327,"angles":56,"radii_stim":152,"angles_stim":62,"category":"B"},{"radii":385,"angles":324,"radii_stim":174,"angles_stim":129,"category":"B"},{"radii":303,"angles":292,"radii_stim":143,"angles_stim":121,"category":"B"},{"radii":234,"angles":496,"radii_stim":117,"angles_stim":172,"category":"A"},{"radii":287,"angles":596,"radii_stim":137,"angles_stim":197,"category":"A"},{"radii":433,"angles":600,"radii_stim":192,"angles_stim":198,"category":"B"},{"radii":303,"angles":28,"radii_stim":143,"angles_stim":55,"category":"B"},{"radii":146,"angles":164,"radii_stim":84,"angles_stim":89,"category":"A"},{"radii":369,"angles":272,"radii_stim":168,"angles_stim":116,"category":"B"}]},{"cond_indicator":35,"subids":101,"category_type":"information-integration","order":"order2","antenna_vals":[{"radii":1,"angles":304,"radii_stim":78,"angles_stim":89,"category":"A"},{"radii":143,"angles":600,"radii_stim":120,"angles_stim":163,"category":"B"},{"radii":600,"angles":176,"radii_stim":255,"angles_stim":57,"category":"B"},{"radii":1,"angles":316,"radii_stim":78,"angles_stim":92,"category":"A"},{"radii":508,"angles":12,"radii_stim":228,"angles_stim":16,"category":"A"},{"radii":600,"angles":320,"radii_stim":255,"angles_stim":93,"category":"B"},{"radii":600,"angles":12,"radii_stim":255,"angles_stim":16,"category":"B"},{"radii":1,"angles":360,"radii_stim":78,"angles_stim":103,"category":"A"},{"radii":505,"angles":304,"radii_stim":227,"angles_stim":89,"category":"B"},{"radii":600,"angles":400,"radii_stim":255,"angles_stim":113,"category":"B"},{"radii":393,"angles":600,"radii_stim":194,"angles_stim":163,"category":"B"},{"radii":1,"angles":44,"radii_stim":78,"angles_stim":24,"category":"A"},{"radii":1,"angles":432,"radii_stim":78,"angles_stim":121,"category":"A"},{"radii":139,"angles":160,"radii_stim":119,"angles_stim":53,"category":"A"},{"radii":281,"angles":116,"radii_stim":161,"angles_stim":42,"category":"A"},{"radii":1,"angles":484,"radii_stim":78,"angles_stim":134,"category":"A"},{"radii":1,"angles":380,"radii_stim":78,"angles_stim":108,"category":"A"},{"radii":1,"angles":1,"radii_stim":78,"angles_stim":13,"category":"A"},{"radii":545,"angles":88,"radii_stim":239,"angles_stim":35,"category":"B"},{"radii":105,"angles":308,"radii_stim":109,"angles_stim":90,"category":"A"},{"radii":600,"angles":312,"radii_stim":255,"angles_stim":91,"category":"B"},{"radii":146,"angles":92,"radii_stim":121,"angles_stim":36,"category":"A"},{"radii":99,"angles":324,"radii_stim":107,"angles_stim":94,"category":"A"},{"radii":143,"angles":40,"radii_stim":120,"angles_stim":23,"category":"A"},{"radii":1,"angles":420,"radii_stim":78,"angles_stim":118,"category":"A"},{"radii":308,"angles":52,"radii_stim":169,"angles_stim":26,"category":"A"},{"radii":495,"angles":280,"radii_stim":224,"angles_stim":83,"category":"B"},{"radii":1,"angles":444,"radii_stim":78,"angles_stim":124,"category":"A"},{"radii":600,"angles":424,"radii_stim":255,"angles_stim":119,"category":"B"},{"radii":95,"angles":120,"radii_stim":106,"angles_stim":43,"category":"A"},{"radii":1,"angles":40,"radii_stim":78,"angles_stim":23,"category":"A"},{"radii":1,"angles":512,"radii_stim":78,"angles_stim":141,"category":"A"}]},{"cond_indicator":36,"subids":107,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":14,"angles":360,"radii_stim":32,"angles_stim":145,"category":"A"},{"radii":66,"angles":488,"radii_stim":52,"angles_stim":177,"category":"A"},{"radii":1,"angles":1,"radii_stim":27,"angles_stim":55,"category":"A"},{"radii":395,"angles":480,"radii_stim":177,"angles_stim":175,"category":"B"},{"radii":292,"angles":128,"radii_stim":138,"angles_stim":87,"category":"A"},{"radii":581,"angles":600,"radii_stim":248,"angles_stim":205,"category":"B"},{"radii":234,"angles":400,"radii_stim":116,"angles_stim":155,"category":"A"},{"radii":600,"angles":80,"radii_stim":255,"angles_stim":75,"category":"B"},{"radii":1,"angles":600,"radii_stim":27,"angles_stim":205,"category":"A"},{"radii":121,"angles":204,"radii_stim":73,"angles_stim":106,"category":"A"},{"radii":289,"angles":220,"radii_stim":137,"angles_stim":110,"category":"A"},{"radii":276,"angles":312,"radii_stim":132,"angles_stim":133,"category":"A"},{"radii":187,"angles":1,"radii_stim":98,"angles_stim":55,"category":"A"},{"radii":316,"angles":548,"radii_stim":147,"angles_stim":192,"category":"B"},{"radii":1,"angles":552,"radii_stim":27,"angles_stim":193,"category":"A"},{"radii":137,"angles":4,"radii_stim":79,"angles_stim":56,"category":"A"},{"radii":1,"angles":268,"radii_stim":27,"angles_stim":122,"category":"A"},{"radii":563,"angles":208,"radii_stim":241,"angles_stim":107,"category":"B"},{"radii":3,"angles":508,"radii_stim":28,"angles_stim":182,"category":"A"},{"radii":381,"angles":264,"radii_stim":172,"angles_stim":121,"category":"B"},{"radii":534,"angles":504,"radii_stim":230,"angles_stim":181,"category":"B"},{"radii":169,"angles":236,"radii_stim":91,"angles_stim":114,"category":"A"},{"radii":508,"angles":600,"radii_stim":220,"angles_stim":205,"category":"B"},{"radii":466,"angles":600,"radii_stim":204,"angles_stim":205,"category":"B"},{"radii":69,"angles":1,"radii_stim":53,"angles_stim":55,"category":"A"},{"radii":211,"angles":96,"radii_stim":107,"angles_stim":79,"category":"A"},{"radii":571,"angles":600,"radii_stim":244,"angles_stim":205,"category":"B"},{"radii":40,"angles":124,"radii_stim":42,"angles_stim":86,"category":"A"},{"radii":271,"angles":432,"radii_stim":130,"angles_stim":163,"category":"A"},{"radii":71,"angles":508,"radii_stim":54,"angles_stim":182,"category":"A"},{"radii":247,"angles":384,"radii_stim":121,"angles_stim":151,"category":"A"},{"radii":124,"angles":376,"radii_stim":74,"angles_stim":149,"category":"A"}]},{"cond_indicator":37,"subids":108,"category_type":"information-integration","order":"order1","antenna_vals":[{"radii":231,"angles":500,"radii_stim":130,"angles_stim":271,"category":"A"},{"radii":366,"angles":132,"radii_stim":176,"angles_stim":179,"category":"B"},{"radii":1,"angles":500,"radii_stim":52,"angles_stim":271,"category":"A"},{"radii":1,"angles":120,"radii_stim":52,"angles_stim":176,"category":"A"},{"radii":576,"angles":128,"radii_stim":247,"angles_stim":178,"category":"B"},{"radii":121,"angles":140,"radii_stim":93,"angles_stim":181,"category":"A"},{"radii":570,"angles":504,"radii_stim":245,"angles_stim":272,"category":"B"},{"radii":600,"angles":296,"radii_stim":255,"angles_stim":220,"category":"B"},{"radii":1,"angles":116,"radii_stim":52,"angles_stim":175,"category":"A"},{"radii":1,"angles":260,"radii_stim":52,"angles_stim":211,"category":"A"},{"radii":290,"angles":1,"radii_stim":150,"angles_stim":146,"category":"B"},{"radii":154,"angles":172,"radii_stim":104,"angles_stim":189,"category":"A"},{"radii":213,"angles":56,"radii_stim":124,"angles_stim":160,"category":"B"},{"radii":172,"angles":424,"radii_stim":110,"angles_stim":252,"category":"A"},{"radii":1,"angles":132,"radii_stim":52,"angles_stim":179,"category":"A"},{"radii":1,"angles":492,"radii_stim":52,"angles_stim":269,"category":"A"},{"radii":1,"angles":256,"radii_stim":52,"angles_stim":210,"category":"A"},{"radii":600,"angles":296,"radii_stim":255,"angles_stim":220,"category":"B"},{"radii":1,"angles":136,"radii_stim":52,"angles_stim":180,"category":"A"},{"radii":600,"angles":140,"radii_stim":255,"angles_stim":181,"category":"B"},{"radii":204,"angles":68,"radii_stim":121,"angles_stim":163,"category":"B"},{"radii":142,"angles":16,"radii_stim":100,"angles_stim":150,"category":"B"},{"radii":77,"angles":216,"radii_stim":78,"angles_stim":200,"category":"A"},{"radii":145,"angles":500,"radii_stim":101,"angles_stim":271,"category":"A"},{"radii":160,"angles":144,"radii_stim":106,"angles_stim":182,"category":"B"},{"radii":151,"angles":492,"radii_stim":103,"angles_stim":269,"category":"A"},{"radii":133,"angles":152,"radii_stim":97,"angles_stim":184,"category":"A"},{"radii":186,"angles":496,"radii_stim":115,"angles_stim":270,"category":"A"},{"radii":585,"angles":500,"radii_stim":250,"angles_stim":271,"category":"B"},{"radii":269,"angles":500,"radii_stim":143,"angles_stim":271,"category":"A"},{"radii":296,"angles":140,"radii_stim":152,"angles_stim":181,"category":"B"},{"radii":331,"angles":500,"radii_stim":164,"angles_stim":271,"category":"A"}]},{"cond_indicator":38,"subids":109,"category_type":"rule-based","order":"order2","antenna_vals":[{"radii":600,"angles":24,"radii_stim":255,"angles_stim":90,"category":"A"},{"radii":600,"angles":384,"radii_stim":255,"angles_stim":180,"category":"B"},{"radii":1,"angles":384,"radii_stim":73,"angles_stim":180,"category":"B"},{"radii":1,"angles":24,"radii_stim":73,"angles_stim":90,"category":"A"},{"radii":600,"angles":204,"radii_stim":255,"angles_stim":135,"category":"A"},{"radii":600,"angles":588,"radii_stim":255,"angles_stim":231,"category":"B"},{"radii":1,"angles":224,"radii_stim":73,"angles_stim":140,"category":"A"},{"radii":1,"angles":564,"radii_stim":73,"angles_stim":225,"category":"B"},{"radii":372,"angles":240,"radii_stim":186,"angles_stim":144,"category":"A"},{"radii":231,"angles":572,"radii_stim":143,"angles_stim":227,"category":"B"},{"radii":132,"angles":140,"radii_stim":113,"angles_stim":119,"category":"A"},{"radii":366,"angles":232,"radii_stim":184,"angles_stim":142,"category":"A"},{"radii":152,"angles":236,"radii_stim":119,"angles_stim":143,"category":"A"},{"radii":570,"angles":216,"radii_stim":246,"angles_stim":138,"category":"A"},{"radii":550,"angles":428,"radii_stim":240,"angles_stim":191,"category":"B"},{"radii":112,"angles":540,"radii_stim":107,"angles_stim":219,"category":"B"},{"radii":527,"angles":160,"radii_stim":233,"angles_stim":124,"category":"A"},{"radii":326,"angles":256,"radii_stim":172,"angles_stim":148,"category":"A"},{"radii":50,"angles":496,"radii_stim":88,"angles_stim":208,"category":"B"},{"radii":135,"angles":252,"radii_stim":114,"angles_stim":147,"category":"A"},{"radii":465,"angles":92,"radii_stim":214,"angles_stim":107,"category":"A"},{"radii":162,"angles":436,"radii_stim":122,"angles_stim":193,"category":"B"},{"radii":491,"angles":404,"radii_stim":222,"angles_stim":185,"category":"B"},{"radii":573,"angles":332,"radii_stim":247,"angles_stim":167,"category":"B"},{"radii":521,"angles":248,"radii_stim":231,"angles_stim":146,"category":"A"},{"radii":297,"angles":136,"radii_stim":163,"angles_stim":118,"category":"A"},{"radii":484,"angles":208,"radii_stim":220,"angles_stim":136,"category":"A"},{"radii":511,"angles":548,"radii_stim":228,"angles_stim":221,"category":"B"},{"radii":382,"angles":1,"radii_stim":189,"angles_stim":84,"category":"A"},{"radii":445,"angles":304,"radii_stim":208,"angles_stim":160,"category":"B"},{"radii":478,"angles":340,"radii_stim":218,"angles_stim":169,"category":"B"},{"radii":438,"angles":36,"radii_stim":206,"angles_stim":93,"category":"A"}]},{"cond_indicator":39,"subids":111,"category_type":"information-integration","order":"order2","antenna_vals":[{"radii":1,"angles":244,"radii_stim":18,"angles_stim":70,"category":"A"},{"radii":420,"angles":1,"radii_stim":184,"angles_stim":9,"category":"A"},{"radii":572,"angles":12,"radii_stim":244,"angles_stim":12,"category":"A"},{"radii":430,"angles":1,"radii_stim":188,"angles_stim":9,"category":"A"},{"radii":180,"angles":332,"radii_stim":89,"angles_stim":92,"category":"A"},{"radii":412,"angles":600,"radii_stim":181,"angles_stim":159,"category":"B"},{"radii":549,"angles":148,"radii_stim":235,"angles_stim":46,"category":"B"},{"radii":448,"angles":332,"radii_stim":195,"angles_stim":92,"category":"B"},{"radii":498,"angles":316,"radii_stim":215,"angles_stim":88,"category":"B"},{"radii":549,"angles":1,"radii_stim":235,"angles_stim":9,"category":"A"},{"radii":506,"angles":1,"radii_stim":218,"angles_stim":9,"category":"A"},{"radii":551,"angles":328,"radii_stim":236,"angles_stim":91,"category":"B"},{"radii":531,"angles":588,"radii_stim":228,"angles_stim":156,"category":"B"},{"radii":589,"angles":264,"radii_stim":251,"angles_stim":75,"category":"B"},{"radii":600,"angles":8,"radii_stim":255,"angles_stim":11,"category":"B"},{"radii":567,"angles":1,"radii_stim":242,"angles_stim":9,"category":"A"},{"radii":600,"angles":588,"radii_stim":255,"angles_stim":156,"category":"B"},{"radii":587,"angles":72,"radii_stim":250,"angles_stim":27,"category":"B"},{"radii":359,"angles":304,"radii_stim":160,"angles_stim":85,"category":"B"},{"radii":562,"angles":1,"radii_stim":240,"angles_stim":9,"category":"A"},{"radii":26,"angles":472,"radii_stim":28,"angles_stim":127,"category":"A"},{"radii":129,"angles":244,"radii_stim":69,"angles_stim":70,"category":"A"},{"radii":496,"angles":1,"radii_stim":214,"angles_stim":9,"category":"A"},{"radii":592,"angles":600,"radii_stim":252,"angles_stim":159,"category":"B"},{"radii":466,"angles":1,"radii_stim":202,"angles_stim":9,"category":"A"},{"radii":529,"angles":492,"radii_stim":227,"angles_stim":132,"category":"B"},{"radii":516,"angles":600,"radii_stim":222,"angles_stim":159,"category":"B"},{"radii":162,"angles":344,"radii_stim":82,"angles_stim":95,"category":"A"},{"radii":86,"angles":180,"radii_stim":52,"angles_stim":54,"category":"A"},{"radii":306,"angles":80,"radii_stim":139,"angles_stim":29,"category":"A"},{"radii":405,"angles":600,"radii_stim":178,"angles_stim":159,"category":"B"},{"radii":448,"angles":1,"radii_stim":195,"angles_stim":9,"category":"A"}]},{"cond_indicator":40,"subids":114,"category_type":"rule-based","order":"order2","antenna_vals":[{"radii":321,"angles":552,"radii_stim":161,"angles_stim":209,"category":"B"},{"radii":600,"angles":248,"radii_stim":255,"angles_stim":133,"category":"A"},{"radii":27,"angles":100,"radii_stim":62,"angles_stim":96,"category":"A"},{"radii":600,"angles":336,"radii_stim":255,"angles_stim":155,"category":"B"},{"radii":561,"angles":492,"radii_stim":242,"angles_stim":194,"category":"B"},{"radii":1,"angles":388,"radii_stim":53,"angles_stim":168,"category":"B"},{"radii":1,"angles":60,"radii_stim":53,"angles_stim":86,"category":"A"},{"radii":582,"angles":284,"radii_stim":249,"angles_stim":142,"category":"A"},{"radii":318,"angles":600,"radii_stim":160,"angles_stim":221,"category":"B"},{"radii":600,"angles":548,"radii_stim":255,"angles_stim":208,"category":"B"},{"radii":600,"angles":140,"radii_stim":255,"angles_stim":106,"category":"A"},{"radii":193,"angles":316,"radii_stim":118,"angles_stim":150,"category":"B"},{"radii":356,"angles":244,"radii_stim":173,"angles_stim":132,"category":"A"},{"radii":131,"angles":584,"radii_stim":97,"angles_stim":217,"category":"B"},{"radii":1,"angles":28,"radii_stim":53,"angles_stim":78,"category":"A"},{"radii":1,"angles":48,"radii_stim":53,"angles_stim":83,"category":"A"},{"radii":552,"angles":496,"radii_stim":239,"angles_stim":195,"category":"B"},{"radii":576,"angles":348,"radii_stim":247,"angles_stim":158,"category":"B"},{"radii":306,"angles":444,"radii_stim":156,"angles_stim":182,"category":"B"},{"radii":549,"angles":84,"radii_stim":238,"angles_stim":92,"category":"A"},{"radii":253,"angles":88,"radii_stim":138,"angles_stim":93,"category":"A"},{"radii":540,"angles":440,"radii_stim":235,"angles_stim":181,"category":"B"},{"radii":42,"angles":288,"radii_stim":67,"angles_stim":143,"category":"A"},{"radii":1,"angles":88,"radii_stim":53,"angles_stim":93,"category":"A"},{"radii":442,"angles":212,"radii_stim":202,"angles_stim":124,"category":"A"},{"radii":9,"angles":240,"radii_stim":56,"angles_stim":131,"category":"A"},{"radii":253,"angles":572,"radii_stim":138,"angles_stim":214,"category":"B"},{"radii":404,"angles":88,"radii_stim":189,"angles_stim":93,"category":"A"},{"radii":579,"angles":352,"radii_stim":248,"angles_stim":159,"category":"B"},{"radii":315,"angles":8,"radii_stim":159,"angles_stim":73,"category":"A"},{"radii":15,"angles":328,"radii_stim":58,"angles_stim":153,"category":"B"},{"radii":413,"angles":84,"radii_stim":192,"angles_stim":92,"category":"A"}]},{"cond_indicator":41,"subids":115,"category_type":"information-integration","order":"order1","antenna_vals":[{"radii":507,"angles":372,"radii_stim":228,"angles_stim":126,"category":"B"},{"radii":291,"angles":416,"radii_stim":165,"angles_stim":137,"category":"A"},{"radii":600,"angles":228,"radii_stim":255,"angles_stim":90,"category":"B"},{"radii":490,"angles":448,"radii_stim":223,"angles_stim":145,"category":"B"},{"radii":326,"angles":68,"radii_stim":175,"angles_stim":50,"category":"B"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":33,"category":"B"},{"radii":600,"angles":576,"radii_stim":255,"angles_stim":177,"category":"B"},{"radii":1,"angles":264,"radii_stim":80,"angles_stim":99,"category":"A"},{"radii":370,"angles":32,"radii_stim":188,"angles_stim":41,"category":"B"},{"radii":1,"angles":236,"radii_stim":80,"angles_stim":92,"category":"A"},{"radii":600,"angles":156,"radii_stim":255,"angles_stim":72,"category":"B"},{"radii":1,"angles":584,"radii_stim":80,"angles_stim":179,"category":"A"},{"radii":1,"angles":100,"radii_stim":80,"angles_stim":58,"category":"A"},{"radii":428,"angles":1,"radii_stim":205,"angles_stim":33,"category":"B"},{"radii":1,"angles":336,"radii_stim":80,"angles_stim":117,"category":"A"},{"radii":576,"angles":508,"radii_stim":248,"angles_stim":160,"category":"B"},{"radii":189,"angles":340,"radii_stim":135,"angles_stim":118,"category":"A"},{"radii":555,"angles":148,"radii_stim":242,"angles_stim":70,"category":"B"},{"radii":469,"angles":280,"radii_stim":217,"angles_stim":103,"category":"B"},{"radii":394,"angles":124,"radii_stim":195,"angles_stim":64,"category":"B"},{"radii":59,"angles":316,"radii_stim":97,"angles_stim":112,"category":"A"},{"radii":600,"angles":116,"radii_stim":255,"angles_stim":62,"category":"B"},{"radii":168,"angles":540,"radii_stim":129,"angles_stim":168,"category":"A"},{"radii":493,"angles":160,"radii_stim":224,"angles_stim":73,"category":"B"},{"radii":531,"angles":340,"radii_stim":235,"angles_stim":118,"category":"B"},{"radii":185,"angles":264,"radii_stim":134,"angles_stim":99,"category":"A"},{"radii":490,"angles":180,"radii_stim":223,"angles_stim":78,"category":"B"},{"radii":582,"angles":260,"radii_stim":250,"angles_stim":98,"category":"B"},{"radii":456,"angles":320,"radii_stim":213,"angles_stim":113,"category":"B"},{"radii":278,"angles":308,"radii_stim":161,"angles_stim":110,"category":"A"},{"radii":456,"angles":104,"radii_stim":213,"angles_stim":59,"category":"B"},{"radii":35,"angles":288,"radii_stim":90,"angles_stim":105,"category":"A"}]},{"cond_indicator":42,"subids":116,"category_type":"information-integration","order":"order1","antenna_vals":[{"radii":225,"angles":436,"radii_stim":133,"angles_stim":180,"category":"A"},{"radii":323,"angles":72,"radii_stim":165,"angles_stim":89,"category":"B"},{"radii":65,"angles":76,"radii_stim":81,"angles_stim":90,"category":"A"},{"radii":4,"angles":76,"radii_stim":61,"angles_stim":90,"category":"A"},{"radii":50,"angles":436,"radii_stim":76,"angles_stim":180,"category":"A"},{"radii":474,"angles":436,"radii_stim":214,"angles_stim":180,"category":"B"},{"radii":535,"angles":76,"radii_stim":234,"angles_stim":90,"category":"B"},{"radii":538,"angles":228,"radii_stim":235,"angles_stim":128,"category":"B"},{"radii":252,"angles":436,"radii_stim":142,"angles_stim":180,"category":"A"},{"radii":65,"angles":336,"radii_stim":81,"angles_stim":155,"category":"A"},{"radii":584,"angles":436,"radii_stim":250,"angles_stim":180,"category":"B"},{"radii":145,"angles":84,"radii_stim":107,"angles_stim":92,"category":"B"},{"radii":1,"angles":72,"radii_stim":60,"angles_stim":89,"category":"A"},{"radii":74,"angles":76,"radii_stim":84,"angles_stim":90,"category":"A"},{"radii":133,"angles":72,"radii_stim":103,"angles_stim":89,"category":"B"},{"radii":191,"angles":436,"radii_stim":122,"angles_stim":180,"category":"A"},{"radii":458,"angles":236,"radii_stim":209,"angles_stim":130,"category":"B"},{"radii":308,"angles":600,"radii_stim":160,"angles_stim":221,"category":"A"},{"radii":126,"angles":216,"radii_stim":101,"angles_stim":125,"category":"A"},{"radii":320,"angles":1,"radii_stim":164,"angles_stim":71,"category":"B"},{"radii":507,"angles":212,"radii_stim":225,"angles_stim":124,"category":"B"},{"radii":206,"angles":488,"radii_stim":127,"angles_stim":193,"category":"A"},{"radii":391,"angles":216,"radii_stim":187,"angles_stim":125,"category":"B"},{"radii":388,"angles":1,"radii_stim":186,"angles_stim":71,"category":"B"},{"radii":311,"angles":260,"radii_stim":161,"angles_stim":136,"category":"B"},{"radii":400,"angles":1,"radii_stim":190,"angles_stim":71,"category":"B"},{"radii":560,"angles":432,"radii_stim":242,"angles_stim":179,"category":"B"},{"radii":148,"angles":600,"radii_stim":108,"angles_stim":221,"category":"A"},{"radii":191,"angles":600,"radii_stim":122,"angles_stim":221,"category":"A"},{"radii":145,"angles":256,"radii_stim":107,"angles_stim":135,"category":"A"},{"radii":271,"angles":268,"radii_stim":148,"angles_stim":138,"category":"B"},{"radii":332,"angles":600,"radii_stim":168,"angles_stim":221,"category":"A"}]},{"cond_indicator":43,"subids":118,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":565,"angles":20,"radii_stim":241,"angles_stim":113,"category":"B"},{"radii":263,"angles":548,"radii_stim":120,"angles_stim":245,"category":"A"},{"radii":248,"angles":48,"radii_stim":114,"angles_stim":120,"category":"A"},{"radii":360,"angles":384,"radii_stim":159,"angles_stim":204,"category":"B"},{"radii":442,"angles":80,"radii_stim":192,"angles_stim":128,"category":"B"},{"radii":352,"angles":1,"radii_stim":156,"angles_stim":108,"category":"B"},{"radii":305,"angles":132,"radii_stim":137,"angles_stim":141,"category":"B"},{"radii":370,"angles":216,"radii_stim":163,"angles_stim":162,"category":"B"},{"radii":600,"angles":264,"radii_stim":255,"angles_stim":174,"category":"B"},{"radii":427,"angles":76,"radii_stim":186,"angles_stim":127,"category":"B"},{"radii":497,"angles":240,"radii_stim":214,"angles_stim":168,"category":"B"},{"radii":515,"angles":400,"radii_stim":221,"angles_stim":208,"category":"B"},{"radii":600,"angles":212,"radii_stim":255,"angles_stim":161,"category":"B"},{"radii":165,"angles":140,"radii_stim":81,"angles_stim":143,"category":"A"},{"radii":220,"angles":188,"radii_stim":103,"angles_stim":155,"category":"A"},{"radii":417,"angles":340,"radii_stim":182,"angles_stim":193,"category":"B"},{"radii":150,"angles":400,"radii_stim":75,"angles_stim":208,"category":"A"},{"radii":600,"angles":556,"radii_stim":255,"angles_stim":247,"category":"B"},{"radii":532,"angles":256,"radii_stim":228,"angles_stim":172,"category":"B"},{"radii":175,"angles":308,"radii_stim":85,"angles_stim":185,"category":"A"},{"radii":377,"angles":300,"radii_stim":166,"angles_stim":183,"category":"B"},{"radii":422,"angles":388,"radii_stim":184,"angles_stim":205,"category":"B"},{"radii":427,"angles":368,"radii_stim":186,"angles_stim":200,"category":"B"},{"radii":525,"angles":372,"radii_stim":225,"angles_stim":201,"category":"B"},{"radii":600,"angles":368,"radii_stim":255,"angles_stim":200,"category":"B"},{"radii":235,"angles":152,"radii_stim":109,"angles_stim":146,"category":"A"},{"radii":385,"angles":140,"radii_stim":169,"angles_stim":143,"category":"B"},{"radii":392,"angles":476,"radii_stim":172,"angles_stim":227,"category":"B"},{"radii":110,"angles":584,"radii_stim":59,"angles_stim":254,"category":"A"},{"radii":492,"angles":264,"radii_stim":212,"angles_stim":174,"category":"B"},{"radii":407,"angles":564,"radii_stim":178,"angles_stim":249,"category":"B"},{"radii":43,"angles":368,"radii_stim":32,"angles_stim":200,"category":"A"}]},{"cond_indicator":44,"subids":119,"category_type":"information-integration","order":"order2","antenna_vals":[{"radii":508,"angles":428,"radii_stim":222,"angles_stim":205,"category":"B"},{"radii":1,"angles":308,"radii_stim":38,"angles_stim":175,"category":"A"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":98,"category":"B"},{"radii":340,"angles":600,"radii_stim":161,"angles_stim":248,"category":"B"},{"radii":1,"angles":1,"radii_stim":38,"angles_stim":98,"category":"A"},{"radii":34,"angles":1,"radii_stim":50,"angles_stim":98,"category":"A"},{"radii":1,"angles":320,"radii_stim":38,"angles_stim":178,"category":"A"},{"radii":600,"angles":4,"radii_stim":255,"angles_stim":99,"category":"B"},{"radii":3,"angles":1,"radii_stim":39,"angles_stim":98,"category":"A"},{"radii":1,"angles":336,"radii_stim":38,"angles_stim":182,"category":"A"},{"radii":600,"angles":536,"radii_stim":255,"angles_stim":232,"category":"B"},{"radii":600,"angles":480,"radii_stim":255,"angles_stim":218,"category":"B"},{"radii":130,"angles":336,"radii_stim":85,"angles_stim":182,"category":"A"},{"radii":600,"angles":328,"radii_stim":255,"angles_stim":180,"category":"B"},{"radii":600,"angles":516,"radii_stim":255,"angles_stim":227,"category":"B"},{"radii":600,"angles":336,"radii_stim":255,"angles_stim":182,"category":"B"},{"radii":600,"angles":316,"radii_stim":255,"angles_stim":177,"category":"B"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":98,"category":"B"},{"radii":238,"angles":1,"radii_stim":124,"angles_stim":98,"category":"A"},{"radii":246,"angles":368,"radii_stim":127,"angles_stim":190,"category":"B"},{"radii":274,"angles":164,"radii_stim":137,"angles_stim":139,"category":"A"},{"radii":268,"angles":504,"radii_stim":135,"angles_stim":224,"category":"B"},{"radii":1,"angles":372,"radii_stim":38,"angles_stim":191,"category":"A"},{"radii":1,"angles":160,"radii_stim":38,"angles_stim":138,"category":"A"},{"radii":1,"angles":4,"radii_stim":38,"angles_stim":99,"category":"A"},{"radii":1,"angles":508,"radii_stim":38,"angles_stim":225,"category":"A"},{"radii":600,"angles":160,"radii_stim":255,"angles_stim":138,"category":"B"},{"radii":387,"angles":192,"radii_stim":178,"angles_stim":146,"category":"A"},{"radii":395,"angles":1,"radii_stim":181,"angles_stim":98,"category":"A"},{"radii":398,"angles":300,"radii_stim":182,"angles_stim":173,"category":"B"},{"radii":390,"angles":428,"radii_stim":179,"angles_stim":205,"category":"B"},{"radii":89,"angles":300,"radii_stim":70,"angles_stim":173,"category":"A"}]},{"cond_indicator":45,"subids":122,"category_type":"information-integration","order":"order2","antenna_vals":[{"radii":301,"angles":1,"radii_stim":149,"angles_stim":1,"category":"A"},{"radii":546,"angles":348,"radii_stim":236,"angles_stim":88,"category":"B"},{"radii":366,"angles":600,"radii_stim":172,"angles_stim":151,"category":"B"},{"radii":116,"angles":1,"radii_stim":83,"angles_stim":1,"category":"A"},{"radii":552,"angles":600,"radii_stim":238,"angles_stim":151,"category":"B"},{"radii":254,"angles":348,"radii_stim":132,"angles_stim":88,"category":"B"},{"radii":380,"angles":1,"radii_stim":177,"angles_stim":1,"category":"A"},{"radii":420,"angles":580,"radii_stim":191,"angles_stim":146,"category":"B"},{"radii":600,"angles":372,"radii_stim":255,"angles_stim":94,"category":"B"},{"radii":389,"angles":1,"radii_stim":180,"angles_stim":1,"category":"A"},{"radii":12,"angles":600,"radii_stim":46,"angles_stim":151,"category":"B"},{"radii":144,"angles":504,"radii_stim":93,"angles_stim":127,"category":"B"},{"radii":358,"angles":600,"radii_stim":169,"angles_stim":151,"category":"B"},{"radii":600,"angles":452,"radii_stim":255,"angles_stim":114,"category":"B"},{"radii":473,"angles":1,"radii_stim":210,"angles_stim":1,"category":"A"},{"radii":591,"angles":456,"radii_stim":252,"angles_stim":115,"category":"B"},{"radii":420,"angles":592,"radii_stim":191,"angles_stim":149,"category":"B"},{"radii":195,"angles":424,"radii_stim":111,"angles_stim":107,"category":"B"},{"radii":408,"angles":360,"radii_stim":187,"angles_stim":91,"category":"B"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":151,"category":"B"},{"radii":124,"angles":368,"radii_stim":86,"angles_stim":93,"category":"A"},{"radii":169,"angles":36,"radii_stim":102,"angles_stim":10,"category":"A"},{"radii":273,"angles":216,"radii_stim":139,"angles_stim":55,"category":"A"},{"radii":40,"angles":324,"radii_stim":56,"angles_stim":82,"category":"A"},{"radii":389,"angles":212,"radii_stim":180,"angles_stim":54,"category":"B"},{"radii":318,"angles":228,"radii_stim":155,"angles_stim":58,"category":"A"},{"radii":490,"angles":140,"radii_stim":216,"angles_stim":36,"category":"B"},{"radii":493,"angles":380,"radii_stim":217,"angles_stim":96,"category":"B"},{"radii":512,"angles":468,"radii_stim":224,"angles_stim":118,"category":"B"},{"radii":279,"angles":148,"radii_stim":141,"angles_stim":38,"category":"A"},{"radii":124,"angles":44,"radii_stim":86,"angles_stim":12,"category":"A"},{"radii":332,"angles":404,"radii_stim":160,"angles_stim":102,"category":"B"}]},{"cond_indicator":46,"subids":130,"category_type":"rule-based","order":"order2","antenna_vals":[{"radii":351,"angles":396,"radii_stim":157,"angles_stim":176,"category":"B"},{"radii":33,"angles":424,"radii_stim":32,"angles_stim":183,"category":"B"},{"radii":600,"angles":40,"radii_stim":255,"angles_stim":87,"category":"A"},{"radii":600,"angles":560,"radii_stim":255,"angles_stim":217,"category":"B"},{"radii":508,"angles":600,"radii_stim":219,"angles_stim":227,"category":"B"},{"radii":561,"angles":600,"radii_stim":240,"angles_stim":227,"category":"B"},{"radii":16,"angles":224,"radii_stim":25,"angles_stim":133,"category":"A"},{"radii":600,"angles":188,"radii_stim":255,"angles_stim":124,"category":"A"},{"radii":132,"angles":540,"radii_stim":71,"angles_stim":212,"category":"B"},{"radii":229,"angles":1,"radii_stim":109,"angles_stim":77,"category":"A"},{"radii":150,"angles":204,"radii_stim":78,"angles_stim":128,"category":"A"},{"radii":457,"angles":388,"radii_stim":199,"angles_stim":174,"category":"B"},{"radii":64,"angles":420,"radii_stim":44,"angles_stim":182,"category":"B"},{"radii":183,"angles":588,"radii_stim":91,"angles_stim":224,"category":"B"},{"radii":541,"angles":216,"radii_stim":232,"angles_stim":131,"category":"A"},{"radii":56,"angles":264,"radii_stim":41,"angles_stim":143,"category":"A"},{"radii":1,"angles":92,"radii_stim":19,"angles_stim":100,"category":"A"},{"radii":1,"angles":172,"radii_stim":19,"angles_stim":120,"category":"A"},{"radii":1,"angles":324,"radii_stim":19,"angles_stim":158,"category":"B"},{"radii":1,"angles":508,"radii_stim":19,"angles_stim":204,"category":"B"},{"radii":1,"angles":408,"radii_stim":19,"angles_stim":179,"category":"B"},{"radii":209,"angles":592,"radii_stim":101,"angles_stim":225,"category":"B"},{"radii":204,"angles":88,"radii_stim":99,"angles_stim":99,"category":"A"},{"radii":287,"angles":600,"radii_stim":132,"angles_stim":227,"category":"B"},{"radii":343,"angles":280,"radii_stim":154,"angles_stim":147,"category":"A"},{"radii":328,"angles":272,"radii_stim":148,"angles_stim":145,"category":"A"},{"radii":143,"angles":316,"radii_stim":75,"angles_stim":156,"category":"B"},{"radii":460,"angles":280,"radii_stim":200,"angles_stim":147,"category":"A"},{"radii":99,"angles":268,"radii_stim":58,"angles_stim":144,"category":"A"},{"radii":178,"angles":600,"radii_stim":89,"angles_stim":227,"category":"B"},{"radii":6,"angles":192,"radii_stim":21,"angles_stim":125,"category":"A"},{"radii":237,"angles":1,"radii_stim":112,"angles_stim":77,"category":"A"}]},{"cond_indicator":47,"subids":131,"category_type":"information-integration","order":"order1","antenna_vals":[{"radii":46,"angles":340,"radii_stim":34,"angles_stim":156,"category":"A"},{"radii":552,"angles":280,"radii_stim":236,"angles_stim":141,"category":"B"},{"radii":289,"angles":576,"radii_stim":131,"angles_stim":215,"category":"A"},{"radii":600,"angles":240,"radii_stim":255,"angles_stim":131,"category":"B"},{"radii":479,"angles":600,"radii_stim":207,"angles_stim":221,"category":"A"},{"radii":562,"angles":564,"radii_stim":240,"angles_stim":212,"category":"A"},{"radii":284,"angles":116,"radii_stim":129,"angles_stim":100,"category":"B"},{"radii":8,"angles":1,"radii_stim":19,"angles_stim":71,"category":"B"},{"radii":376,"angles":396,"radii_stim":166,"angles_stim":170,"category":"A"},{"radii":419,"angles":600,"radii_stim":183,"angles_stim":221,"category":"A"},{"radii":567,"angles":240,"radii_stim":242,"angles_stim":131,"category":"B"},{"radii":394,"angles":560,"radii_stim":173,"angles_stim":211,"category":"A"},{"radii":594,"angles":464,"radii_stim":253,"angles_stim":187,"category":"B"},{"radii":168,"angles":336,"radii_stim":83,"angles_stim":155,"category":"A"},{"radii":509,"angles":600,"radii_stim":219,"angles_stim":221,"category":"A"},{"radii":600,"angles":4,"radii_stim":255,"angles_stim":72,"category":"B"},{"radii":221,"angles":472,"radii_stim":104,"angles_stim":189,"category":"A"},{"radii":457,"angles":560,"radii_stim":198,"angles_stim":211,"category":"A"},{"radii":384,"angles":132,"radii_stim":169,"angles_stim":104,"category":"B"},{"radii":484,"angles":424,"radii_stim":209,"angles_stim":177,"category":"B"},{"radii":437,"angles":468,"radii_stim":190,"angles_stim":188,"category":"A"},{"radii":176,"angles":452,"radii_stim":86,"angles_stim":184,"category":"A"},{"radii":346,"angles":240,"radii_stim":154,"angles_stim":131,"category":"B"},{"radii":559,"angles":456,"radii_stim":239,"angles_stim":185,"category":"B"},{"radii":153,"angles":424,"radii_stim":77,"angles_stim":177,"category":"A"},{"radii":524,"angles":420,"radii_stim":225,"angles_stim":176,"category":"B"},{"radii":26,"angles":460,"radii_stim":26,"angles_stim":186,"category":"A"},{"radii":281,"angles":416,"radii_stim":128,"angles_stim":175,"category":"A"},{"radii":41,"angles":76,"radii_stim":32,"angles_stim":90,"category":"A"},{"radii":161,"angles":68,"radii_stim":80,"angles_stim":88,"category":"B"},{"radii":334,"angles":76,"radii_stim":149,"angles_stim":90,"category":"B"},{"radii":56,"angles":108,"radii_stim":38,"angles_stim":98,"category":"A"}]},{"cond_indicator":48,"subids":134,"category_type":"information-integration","order":"order1","antenna_vals":[{"radii":600,"angles":328,"radii_stim":255,"angles_stim":172,"category":"B"},{"radii":557,"angles":1,"radii_stim":239,"angles_stim":90,"category":"B"},{"radii":519,"angles":264,"radii_stim":225,"angles_stim":156,"category":"B"},{"radii":277,"angles":528,"radii_stim":135,"angles_stim":222,"category":"A"},{"radii":113,"angles":1,"radii_stim":74,"angles_stim":90,"category":"B"},{"radii":505,"angles":220,"radii_stim":220,"angles_stim":145,"category":"B"},{"radii":1,"angles":336,"radii_stim":32,"angles_stim":174,"category":"A"},{"radii":261,"angles":16,"radii_stim":129,"angles_stim":94,"category":"B"},{"radii":1,"angles":1,"radii_stim":32,"angles_stim":90,"category":"B"},{"radii":315,"angles":476,"radii_stim":149,"angles_stim":209,"category":"A"},{"radii":264,"angles":532,"radii_stim":130,"angles_stim":223,"category":"A"},{"radii":317,"angles":496,"radii_stim":150,"angles_stim":214,"category":"A"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":90,"category":"B"},{"radii":454,"angles":208,"radii_stim":201,"angles_stim":142,"category":"B"},{"radii":113,"angles":356,"radii_stim":74,"angles_stim":179,"category":"A"},{"radii":511,"angles":1,"radii_stim":222,"angles_stim":90,"category":"B"},{"radii":137,"angles":60,"radii_stim":83,"angles_stim":105,"category":"B"},{"radii":283,"angles":508,"radii_stim":137,"angles_stim":217,"category":"A"},{"radii":334,"angles":252,"radii_stim":156,"angles_stim":153,"category":"B"},{"radii":446,"angles":64,"radii_stim":198,"angles_stim":106,"category":"B"},{"radii":519,"angles":232,"radii_stim":225,"angles_stim":148,"category":"B"},{"radii":479,"angles":300,"radii_stim":210,"angles_stim":165,"category":"B"},{"radii":331,"angles":504,"radii_stim":155,"angles_stim":216,"category":"A"},{"radii":264,"angles":4,"radii_stim":130,"angles_stim":91,"category":"B"},{"radii":546,"angles":480,"radii_stim":235,"angles_stim":210,"category":"B"},{"radii":248,"angles":292,"radii_stim":124,"angles_stim":163,"category":"A"},{"radii":162,"angles":52,"radii_stim":92,"angles_stim":103,"category":"B"},{"radii":70,"angles":160,"radii_stim":58,"angles_stim":130,"category":"A"},{"radii":49,"angles":444,"radii_stim":50,"angles_stim":201,"category":"A"},{"radii":366,"angles":148,"radii_stim":168,"angles_stim":127,"category":"B"},{"radii":49,"angles":1,"radii_stim":50,"angles_stim":90,"category":"B"},{"radii":336,"angles":464,"radii_stim":157,"angles_stim":206,"category":"A"}]},{"cond_indicator":49,"subids":137,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":406,"angles":424,"radii_stim":194,"angles_stim":148,"category":"B"},{"radii":1,"angles":56,"radii_stim":66,"angles_stim":56,"category":"A"},{"radii":555,"angles":1,"radii_stim":241,"angles_stim":42,"category":"B"},{"radii":1,"angles":368,"radii_stim":66,"angles_stim":134,"category":"A"},{"radii":1,"angles":12,"radii_stim":66,"angles_stim":45,"category":"A"},{"radii":425,"angles":600,"radii_stim":200,"angles_stim":192,"category":"B"},{"radii":1,"angles":556,"radii_stim":66,"angles_stim":181,"category":"A"},{"radii":286,"angles":596,"radii_stim":156,"angles_stim":191,"category":"A"},{"radii":1,"angles":596,"radii_stim":66,"angles_stim":191,"category":"A"},{"radii":393,"angles":596,"radii_stim":190,"angles_stim":191,"category":"B"},{"radii":444,"angles":1,"radii_stim":206,"angles_stim":42,"category":"B"},{"radii":29,"angles":72,"radii_stim":75,"angles_stim":60,"category":"A"},{"radii":600,"angles":352,"radii_stim":255,"angles_stim":130,"category":"B"},{"radii":276,"angles":532,"radii_stim":153,"angles_stim":175,"category":"A"},{"radii":349,"angles":572,"radii_stim":176,"angles_stim":185,"category":"B"},{"radii":143,"angles":124,"radii_stim":111,"angles_stim":73,"category":"A"},{"radii":457,"angles":44,"radii_stim":210,"angles_stim":53,"category":"B"},{"radii":273,"angles":368,"radii_stim":152,"angles_stim":134,"category":"A"},{"radii":514,"angles":4,"radii_stim":228,"angles_stim":43,"category":"B"},{"radii":92,"angles":28,"radii_stim":95,"angles_stim":49,"category":"A"},{"radii":283,"angles":360,"radii_stim":155,"angles_stim":132,"category":"A"},{"radii":447,"angles":8,"radii_stim":207,"angles_stim":44,"category":"B"},{"radii":1,"angles":1,"radii_stim":66,"angles_stim":42,"category":"A"},{"radii":324,"angles":372,"radii_stim":168,"angles_stim":135,"category":"B"},{"radii":153,"angles":1,"radii_stim":114,"angles_stim":42,"category":"A"},{"radii":321,"angles":468,"radii_stim":167,"angles_stim":159,"category":"B"},{"radii":111,"angles":376,"radii_stim":101,"angles_stim":136,"category":"A"},{"radii":400,"angles":380,"radii_stim":192,"angles_stim":137,"category":"B"},{"radii":340,"angles":1,"radii_stim":173,"angles_stim":42,"category":"B"},{"radii":115,"angles":84,"radii_stim":102,"angles_stim":63,"category":"A"},{"radii":565,"angles":464,"radii_stim":244,"angles_stim":158,"category":"B"},{"radii":580,"angles":1,"radii_stim":249,"angles_stim":42,"category":"B"}]},{"cond_indicator":50,"subids":138,"category_type":"information-integration","order":"order2","antenna_vals":[{"radii":316,"angles":1,"radii_stim":158,"angles_stim":136,"category":"A"},{"radii":547,"angles":476,"radii_stim":237,"angles_stim":255,"category":"B"},{"radii":1,"angles":528,"radii_stim":50,"angles_stim":268,"category":"A"},{"radii":600,"angles":536,"radii_stim":255,"angles_stim":270,"category":"B"},{"radii":228,"angles":548,"radii_stim":128,"angles_stim":273,"category":"B"},{"radii":445,"angles":180,"radii_stim":202,"angles_stim":181,"category":"B"},{"radii":1,"angles":524,"radii_stim":50,"angles_stim":267,"category":"A"},{"radii":410,"angles":172,"radii_stim":190,"angles_stim":179,"category":"A"},{"radii":600,"angles":500,"radii_stim":255,"angles_stim":261,"category":"B"},{"radii":600,"angles":532,"radii_stim":255,"angles_stim":269,"category":"B"},{"radii":600,"angles":112,"radii_stim":255,"angles_stim":164,"category":"B"},{"radii":600,"angles":556,"radii_stim":255,"angles_stim":275,"category":"B"},{"radii":1,"angles":400,"radii_stim":50,"angles_stim":236,"category":"A"},{"radii":1,"angles":1,"radii_stim":50,"angles_stim":136,"category":"A"},{"radii":1,"angles":600,"radii_stim":50,"angles_stim":286,"category":"B"},{"radii":188,"angles":1,"radii_stim":114,"angles_stim":136,"category":"A"},{"radii":600,"angles":528,"radii_stim":255,"angles_stim":268,"category":"B"},{"radii":1,"angles":532,"radii_stim":50,"angles_stim":269,"category":"A"},{"radii":600,"angles":180,"radii_stim":255,"angles_stim":181,"category":"B"},{"radii":1,"angles":176,"radii_stim":50,"angles_stim":180,"category":"A"},{"radii":310,"angles":532,"radii_stim":156,"angles_stim":269,"category":"B"},{"radii":188,"angles":420,"radii_stim":114,"angles_stim":241,"category":"B"},{"radii":503,"angles":72,"radii_stim":222,"angles_stim":154,"category":"A"},{"radii":600,"angles":28,"radii_stim":255,"angles_stim":143,"category":"B"},{"radii":600,"angles":508,"radii_stim":255,"angles_stim":263,"category":"B"},{"radii":249,"angles":1,"radii_stim":135,"angles_stim":136,"category":"A"},{"radii":316,"angles":600,"radii_stim":158,"angles_stim":286,"category":"B"},{"radii":304,"angles":584,"radii_stim":154,"angles_stim":282,"category":"B"},{"radii":1,"angles":212,"radii_stim":50,"angles_stim":189,"category":"A"},{"radii":383,"angles":1,"radii_stim":181,"angles_stim":136,"category":"A"},{"radii":208,"angles":56,"radii_stim":121,"angles_stim":150,"category":"A"},{"radii":296,"angles":600,"radii_stim":151,"angles_stim":286,"category":"B"}]},{"cond_indicator":51,"subids":140,"category_type":"information-integration","order":"order1","antenna_vals":[{"radii":276,"angles":352,"radii_stim":135,"angles_stim":179,"category":"A"},{"radii":238,"angles":72,"radii_stim":121,"angles_stim":109,"category":"B"},{"radii":114,"angles":1,"radii_stim":75,"angles_stim":91,"category":"B"},{"radii":346,"angles":360,"radii_stim":161,"angles_stim":181,"category":"A"},{"radii":354,"angles":1,"radii_stim":164,"angles_stim":91,"category":"B"},{"radii":330,"angles":360,"radii_stim":155,"angles_stim":181,"category":"A"},{"radii":357,"angles":1,"radii_stim":165,"angles_stim":91,"category":"B"},{"radii":540,"angles":364,"radii_stim":233,"angles_stim":182,"category":"B"},{"radii":475,"angles":1,"radii_stim":209,"angles_stim":91,"category":"B"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":91,"category":"B"},{"radii":586,"angles":352,"radii_stim":250,"angles_stim":179,"category":"B"},{"radii":192,"angles":352,"radii_stim":104,"angles_stim":179,"category":"A"},{"radii":165,"angles":1,"radii_stim":94,"angles_stim":91,"category":"B"},{"radii":63,"angles":1,"radii_stim":56,"angles_stim":91,"category":"B"},{"radii":17,"angles":356,"radii_stim":39,"angles_stim":180,"category":"A"},{"radii":338,"angles":224,"radii_stim":158,"angles_stim":147,"category":"B"},{"radii":567,"angles":540,"radii_stim":243,"angles_stim":226,"category":"B"},{"radii":397,"angles":356,"radii_stim":180,"angles_stim":180,"category":"B"},{"radii":54,"angles":352,"radii_stim":53,"angles_stim":179,"category":"A"},{"radii":160,"angles":140,"radii_stim":92,"angles_stim":126,"category":"B"},{"radii":492,"angles":1,"radii_stim":215,"angles_stim":91,"category":"B"},{"radii":92,"angles":220,"radii_stim":67,"angles_stim":146,"category":"A"},{"radii":600,"angles":84,"radii_stim":255,"angles_stim":112,"category":"B"},{"radii":600,"angles":340,"radii_stim":255,"angles_stim":176,"category":"B"},{"radii":600,"angles":580,"radii_stim":255,"angles_stim":236,"category":"B"},{"radii":600,"angles":148,"radii_stim":255,"angles_stim":128,"category":"B"},{"radii":6,"angles":376,"radii_stim":35,"angles_stim":185,"category":"A"},{"radii":559,"angles":372,"radii_stim":240,"angles_stim":184,"category":"B"},{"radii":600,"angles":240,"radii_stim":255,"angles_stim":151,"category":"B"},{"radii":287,"angles":1,"radii_stim":139,"angles_stim":91,"category":"B"},{"radii":30,"angles":1,"radii_stim":44,"angles_stim":91,"category":"B"},{"radii":600,"angles":264,"radii_stim":255,"angles_stim":157,"category":"B"}]},{"cond_indicator":52,"subids":142,"category_type":"information-integration","order":"order2","antenna_vals":[{"radii":600,"angles":156,"radii_stim":255,"angles_stim":50,"category":"B"},{"radii":31,"angles":600,"radii_stim":71,"angles_stim":161,"category":"B"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":11,"category":"B"},{"radii":96,"angles":328,"radii_stim":92,"angles_stim":93,"category":"A"},{"radii":1,"angles":4,"radii_stim":61,"angles_stim":12,"category":"A"},{"radii":204,"angles":396,"radii_stim":127,"angles_stim":110,"category":"B"},{"radii":600,"angles":304,"radii_stim":255,"angles_stim":87,"category":"B"},{"radii":1,"angles":1,"radii_stim":61,"angles_stim":11,"category":"A"},{"radii":1,"angles":84,"radii_stim":61,"angles_stim":32,"category":"A"},{"radii":294,"angles":72,"radii_stim":156,"angles_stim":29,"category":"A"},{"radii":473,"angles":372,"radii_stim":214,"angles_stim":104,"category":"B"},{"radii":161,"angles":580,"radii_stim":113,"angles_stim":156,"category":"B"},{"radii":488,"angles":1,"radii_stim":219,"angles_stim":11,"category":"A"},{"radii":1,"angles":344,"radii_stim":61,"angles_stim":97,"category":"A"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":11,"category":"B"},{"radii":559,"angles":600,"radii_stim":242,"angles_stim":161,"category":"B"},{"radii":1,"angles":60,"radii_stim":61,"angles_stim":26,"category":"A"},{"radii":1,"angles":268,"radii_stim":61,"angles_stim":78,"category":"A"},{"radii":173,"angles":8,"radii_stim":117,"angles_stim":13,"category":"A"},{"radii":121,"angles":600,"radii_stim":100,"angles_stim":161,"category":"B"},{"radii":130,"angles":308,"radii_stim":103,"angles_stim":88,"category":"A"},{"radii":87,"angles":600,"radii_stim":89,"angles_stim":161,"category":"B"},{"radii":507,"angles":452,"radii_stim":225,"angles_stim":124,"category":"B"},{"radii":396,"angles":272,"radii_stim":189,"angles_stim":79,"category":"B"},{"radii":322,"angles":1,"radii_stim":165,"angles_stim":11,"category":"A"},{"radii":65,"angles":304,"radii_stim":82,"angles_stim":87,"category":"A"},{"radii":600,"angles":48,"radii_stim":255,"angles_stim":23,"category":"B"},{"radii":251,"angles":576,"radii_stim":142,"angles_stim":155,"category":"B"},{"radii":312,"angles":344,"radii_stim":162,"angles_stim":97,"category":"B"},{"radii":136,"angles":304,"radii_stim":105,"angles_stim":87,"category":"A"},{"radii":207,"angles":80,"radii_stim":128,"angles_stim":31,"category":"A"},{"radii":183,"angles":388,"radii_stim":120,"angles_stim":108,"category":"A"}]},{"cond_indicator":53,"subids":147,"category_type":"rule-based","order":"order1","antenna_vals":[{"radii":367,"angles":480,"radii_stim":162,"angles_stim":179,"category":"B"},{"radii":477,"angles":388,"radii_stim":206,"angles_stim":156,"category":"B"},{"radii":567,"angles":600,"radii_stim":242,"angles_stim":209,"category":"B"},{"radii":600,"angles":124,"radii_stim":255,"angles_stim":90,"category":"B"},{"radii":520,"angles":228,"radii_stim":223,"angles_stim":116,"category":"B"},{"radii":263,"angles":600,"radii_stim":120,"angles_stim":209,"category":"A"},{"radii":200,"angles":432,"radii_stim":95,"angles_stim":167,"category":"A"},{"radii":300,"angles":308,"radii_stim":135,"angles_stim":136,"category":"B"},{"radii":228,"angles":432,"radii_stim":106,"angles_stim":167,"category":"A"},{"radii":298,"angles":312,"radii_stim":134,"angles_stim":137,"category":"A"},{"radii":268,"angles":156,"radii_stim":122,"angles_stim":98,"category":"A"},{"radii":3,"angles":252,"radii_stim":16,"angles_stim":122,"category":"A"},{"radii":305,"angles":564,"radii_stim":137,"angles_stim":200,"category":"B"},{"radii":350,"angles":368,"radii_stim":155,"angles_stim":151,"category":"B"},{"radii":600,"angles":1,"radii_stim":255,"angles_stim":59,"category":"B"},{"radii":128,"angles":304,"radii_stim":66,"angles_stim":135,"category":"A"},{"radii":180,"angles":116,"radii_stim":87,"angles_stim":88,"category":"A"},{"radii":475,"angles":120,"radii_stim":205,"angles_stim":89,"category":"B"},{"radii":245,"angles":484,"radii_stim":113,"angles_stim":180,"category":"A"},{"radii":50,"angles":448,"radii_stim":35,"angles_stim":171,"category":"A"},{"radii":1,"angles":292,"radii_stim":15,"angles_stim":132,"category":"A"},{"radii":258,"angles":12,"radii_stim":118,"angles_stim":62,"category":"A"},{"radii":487,"angles":252,"radii_stim":210,"angles_stim":122,"category":"B"},{"radii":430,"angles":468,"radii_stim":187,"angles_stim":176,"category":"B"},{"radii":322,"angles":80,"radii_stim":144,"angles_stim":79,"category":"B"},{"radii":285,"angles":292,"radii_stim":129,"angles_stim":132,"category":"A"},{"radii":208,"angles":1,"radii_stim":98,"angles_stim":59,"category":"A"},{"radii":295,"angles":456,"radii_stim":133,"angles_stim":173,"category":"A"},{"radii":412,"angles":312,"radii_stim":180,"angles_stim":137,"category":"B"},{"radii":158,"angles":600,"radii_stim":78,"angles_stim":209,"category":"A"},{"radii":278,"angles":1,"radii_stim":126,"angles_stim":59,"category":"A"},{"radii":335,"angles":272,"radii_stim":149,"angles_stim":127,"category":"B"}]},{"cond_indicator":54,"subids":148,"category_type":"information-integration","order":"order1","antenna_vals":[{"radii":271,"angles":512,"radii_stim":140,"angles_stim":150,"category":"A"},{"radii":337,"angles":456,"radii_stim":163,"angles_stim":136,"category":"A"},{"radii":183,"angles":480,"radii_stim":109,"angles_stim":142,"category":"A"},{"radii":514,"angles":80,"radii_stim":225,"angles_stim":42,"category":"B"},{"radii":1,"angles":20,"radii_stim":45,"angles_stim":27,"category":"A"},{"radii":1,"angles":124,"radii_stim":45,"angles_stim":53,"category":"A"},{"radii":1,"angles":472,"radii_stim":45,"angles_stim":140,"category":"A"},{"radii":240,"angles":248,"radii_stim":129,"angles_stim":84,"category":"A"},{"radii":166,"angles":12,"radii_stim":103,"angles_stim":25,"category":"B"},{"radii":457,"angles":76,"radii_stim":205,"angles_stim":41,"category":"B"},{"radii":1,"angles":40,"radii_stim":45,"angles_stim":32,"category":"A"},{"radii":548,"angles":60,"radii_stim":237,"angles_stim":37,"category":"B"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":172,"category":"B"},{"radii":600,"angles":32,"radii_stim":255,"angles_stim":30,"category":"B"},{"radii":600,"angles":600,"radii_stim":255,"angles_stim":172,"category":"B"},{"radii":600,"angles":472,"radii_stim":255,"angles_stim":140,"category":"B"},{"radii":600,"angles":276,"radii_stim":255,"angles_stim":91,"category":"B"},{"radii":517,"angles":272,"radii_stim":226,"angles_stim":90,"category":"B"},{"radii":511,"angles":124,"radii_stim":224,"angles_stim":53,"category":"B"},{"radii":169,"angles":72,"radii_stim":104,"angles_stim":40,"category":"B"},{"radii":189,"angles":532,"radii_stim":111,"angles_stim":155,"category":"A"},{"radii":223,"angles":268,"radii_stim":123,"angles_stim":89,"category":"A"},{"radii":237,"angles":208,"radii_stim":128,"angles_stim":74,"category":"B"},{"radii":600,"angles":436,"radii_stim":255,"angles_stim":131,"category":"B"},{"radii":520,"angles":424,"radii_stim":227,"angles_stim":128,"category":"B"},{"radii":300,"angles":336,"radii_stim":150,"angles_stim":106,"category":"A"},{"radii":58,"angles":148,"radii_stim":65,"angles_stim":59,"category":"A"},{"radii":568,"angles":600,"radii_stim":244,"angles_stim":172,"category":"A"},{"radii":400,"angles":132,"radii_stim":185,"angles_stim":55,"category":"B"},{"radii":557,"angles":384,"radii_stim":240,"angles_stim":118,"category":"B"},{"radii":534,"angles":264,"radii_stim":232,"angles_stim":88,"category":"B"},{"radii":1,"angles":20,"radii_stim":45,"angles_stim":27,"category":"A"}]}];

// grab active learner match based on condition value from maker getter
var yoked_active_learner = yoked_param_vals[cond];

// grab category and order information
var category_type = yoked_active_learner.category_type;
var order = yoked_active_learner.order;
var cond_indicator = yoked_active_learner.cond_indicator;

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
var numExamples = 4;
var num_correct_in_block = 0;
var num_blocks = 2;
var num_trials_block = 48;
var num_trials = num_trials_block * num_blocks;
var num_training_trials_block = 16;
var num_training_trials_experiment = num_training_trials_block * num_blocks
var num_test_trials_block = 32;
var num_trials_block = num_training_trials_block + num_test_trials_block;
var flag = "true";


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

// convert test trials parameter space values to stimulus space values
var test_radii_stim = convertParamStim(test_radii_param, scale_factor_radius, radius_lower_limit);
var test_orientations_stim = convertParamStim(test_orientations_param, scale_factor_orientation, rotation_lower_limit);

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
if(yoked_active_learner.category_type == "rule-based") {
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


// add 4 active learning traning examples
for(i = 0; i < numExamples; i++) {
	trial_type = "active_example"

    antenna = {
      radius: random(radius_lower_limit, radius_upper_limit),
      angle: random(rotation_lower_limit, rotation_upper_limit),
      category: "NA",
    };

     trial_info = {
          trial_number_experiment: "example",
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

        if(trial_type == "training") {
            training_trial = yoked_active_learner.antenna_vals.shift();           
            trial_radius_param = training_trial.radii;
            trial_radius = training_trial.radii_stim;
            trial_angle_param = training_trial.angles;
            trial_angle = training_trial.angles_stim;
            trial_category = training_trial.category;
            trial_number++; 
        } else {       
            // get test trials
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
                   if (trial_angle_param > trial_radius_param) { // y = x, if y value (radius) is bigger than x value, then category A
                      trial_category = "A";
                    } else {
                      trial_category = "B";
                    }
                } else {
                    if (trial_angle_param < 600 - trial_radius_param) { // y = -x, if y value (radius) is smaller than x value, then category A
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
          quadrant: trial_quadrant
        }

        trials.push(trial_info);
    }

}

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

      // decrement maker-getter if this is a turker 
      if (turk.workerId.length > 0) {
            var xmlHttp = null;
            xmlHttp = new XMLHttpRequest()
            xmlHttp.open("GET", "https://langcog.stanford.edu/cgi-bin/subject_equalizer/decrementer.php?filename=" + filename + "&to_decrement=" + cond, false);
            xmlHttp.send(null)
        }


      if(training_condition == "active") {
        $("#instructions_text_active").attr("style", "display: block");
        $("#instructions_text_receptive").attr("style", "display: none")
        showSlide("instructions2");
      } else {
        $("#instructions_text_active").attr("style", "display: none");
        $("#instructions_text_receptive").attr("style", "display: block")
        showSlide("instructions2");
      }
    }
});


// This is where we define the experiment variable, 
// which tracks all the information we want to know about the experiment.

var experiment = {
  condition: training_condition,
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

  summarySlide: function(num_correct_in_block) {
    var prop_correct = num_correct_in_block / num_test_trials_block;
    prop_correct = prop_correct * 100;
    $("#block_acc").text(prop_correct + "%");
    showSlide("summarySlide");
  },

  loadingSlide: function() {
	showSlide('loading');

	setTimeout(function() {
    	showSlide("instructions4");
	}, 4000);
  },

/*The work horse of the sequence: what to do on every trial.*/
  next: function() {

    // remove text from adjust mode field
    $("#").text("");

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
		if (trial.trial_type == "active_example") {
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
          training_condition == "yoked") {
          		$('.category_label').hide()
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
        		//$('.category_label').show()
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
          training_condition == "yoked") {
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

                    // store information from the trial
                    var endTime = (new Date()).getTime();

                    // check which training condition, if in active log interaction data
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

                  experiment.data.push(data);

                   // move on to the next trial, show instructions slide if on the first trial of experiment
                  if(trial.trial_number_block == 4 && trial.trial_type == "active_example") {
                  		showSlide("instructions3");
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


                  //reset correct counter on the first trial of the test block
                  if(trial.trial_number_experiment == 65 || trial.trial_number_experiment == 113 ||
                    trial.trial_number_experiment == 161 || trial.trial_number_experiment == 209 ||
                    trial.trial_number_experiment == 257) {
                    num_correct_in_block = 0;
                  }
                  // track number of correct in the block 
                  if(test_response == trial.antenna_category) {
                    num_correct_in_block++;
                  };

                  experiment.data.push(data);

                  if(trial.trial_number_experiment == 48 || trial.trial_number_experiment == 96 ||
                    trial.trial_number_experiment == 144 || trial.trial_number_experiment == 192 ||
                    trial.trial_number_experiment == 240 || trial.trial_number_experiment == 288) { 
                    setTimeout(function() {
                    paper.clear();
                    setTimeout(experiment.summarySlide(num_correct_in_block), 1);
                  }, 500);
                  } else {
                    setTimeout(function() {
                    paper.clear();
                    setTimeout(experiment.blank, 1);
                  }, 500);

                  }
        };

/* SET UP USER INTERACTIVITY */

    if(trial.trial_type == "active_example") { 

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
                      $("#channel_label").css("border", "3px solid green");
                      $(document).unbind("keyup") // remove other event listeners
                      circle.undrag() // unbind the ability to modify the antenna
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
                default:
              }
          });

    } else if(trial.trial_type == "training" & // this should be "training"
              training_condition == "yoked") {

            $("#adjust").text("");
    		$("#adjust").attr("style", "visibility: hidden");

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