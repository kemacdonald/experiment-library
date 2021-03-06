// ---------------- 1. HELPER FUNCTIONS ------------------
// This .js file has al the alphanumeric functions
// necessary to generate random instances of the experiment.

// random function
function random(a,b) {
    if (typeof b == "undefined") {
	a = a || 2;
	return Math.floor(Math.random()*a);
    } else {
	return Math.floor(Math.random()*(b-a+1)) + a;
    }
}

// a hacky/complicated function to check that quadmods examples are unique
// loop over array of examples, skipping the first example
// at the second example, check if this example equals the first. 
// if it does, then randomly generate a new example until they do not match
// do the same for the third example, but check it against both the first and the second examples

function checkExamples(array) {

    var cleanArray = array;
    var new_example = [];

    for (var i = 0; i < cleanArray.length; i++) {
        if (i == 1) {

            do {
                new_example = [random(0,3), random(0,2)];
                cleanArray[i] = new_example;
            } 
            while (arraysEqual(cleanArray[i], cleanArray[i-1]))

        } else if (i == 2) {
            // check if the third example is the same as the second example
            if (arraysEqual(cleanArray[i], cleanArray[i-1])) {

                do {
                new_example = [random(0,3), random(0,2)];
                cleanArray[i] = new_example;
                } 
                while (arraysEqual(cleanArray[i], cleanArray[i-1]))

            } else if (arraysEqual(cleanArray[i], cleanArray[i-2])) {

                do {
                new_example = [random(0,3), random(0,2)];
                cleanArray[i] = new_example;
                } 
                while (arraysEqual(cleanArray[i], cleanArray[i-2]))

            }
        };
    };

    return cleanArray;

}

// function to only keep unique values in array while preserving order

getUnique = function(array){
   var u = {}, a = [];
   for(var i = 0, l = array.length; i < l; ++i){
      if(u.hasOwnProperty(array[i])) {
         continue;
      }
      a.push(array[i]);
      u[array[i]] = 1;
   }
   return a;
}



function choose_from(arrayName) {
    var randomIndex = Math.floor(Math.random() * arrayName.length);
    var randomElement = arrayName[randomIndex];
    return randomElement
}

// range function
function range(a,b) {
    var rangeArray = new Array();

    for (var i=a; i<=b; i++) {
	rangeArray.push(i);
    }
    
    return rangeArray;
}

// unique function
function unique(arrayName)
{
    var newArray=new Array();
    label:for(var i=0; i<arrayName.length;i++ )
    {  
	for(var j=0; j<newArray.length;j++ )
	{
	    if(newArray[j]==arrayName[i]) 
		continue label;
	}
	newArray[newArray.length] = arrayName[i];
    }
    return newArray;
}

// shuffle function    -- What the hell is the comna for???!!!??!?!?!?! om() * i), 
function shuffle (a) 
{ 
    var o = [];
    for (var i=0; i < a.length; i++) { o[i] = a[i]; }
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), 
	 x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

// show slide function
function showSlide(id) {
    $(".slide").hide(); //jquery - all elements with class of slide - hide
    $("#"+id).show(); //jquery - element with given id - show
}


// create HTML for property matrix and base image
// base = the kind of stimuli
function stimHTML(base, n, prop_mat, props, id, file_number) {
    var html = "";

    html += '<img src="images' + file_number +  '/' + base + '-base' + String(n+1) +
    '.png" width=200px height=200px alt="' + base + '" id="' + id + 'Image"/>';

    var c = 0;
    for (var p = 0; p < prop_mat.length; p++) {
	   if (prop_mat[p] == 1) {
    	    html += '<img  src="images' + file_number +  '/' + base + '-' + props[p] + 
    		'.png" width=200px height=200px alt="' + props[p] + '" ' +
    		'id="' + id + 'Property' + String(c+1) + '"/>';
    	    c = c + 1; // keep count of how many properties we've stacked
	   }
    }

    return html;
}



// Determine if the shape belongs to the shape of focus:
//function isShapeOfFocus()

















// the patch of color by color? 

// Select color at first!
// Patch of cloth referent matcher. file_number = the image folder 
// disposition: where in the experiment the image will be put on
function colorPatchHTML(base, n, prop_mat, props, id, position, file_number, color_ordering) {
    var html = "";
    //html += '<img src="images3/square' + '-'  + base + '-' + stims_single_words  +'.png" width=200px height=200px id="objImage" />';
    html += '' //'<img src="images3/square-face-' + props[] +  '.png" width=200px height=200px id="objImage" />';


    html += '<img src="images3/square-' + base + '-' + props[n] +  
        '.png" width=80px height=80px id="objPatch" />';

    var c = 0;
    return html;
}



function hand_HTML(base, n, prop_mat, props, id, position) {
    var html = "";

    html += '<img  src="images3/hand.png" width=50px height=50px'  + 
     'alt="it is the hand!" id="objHandProperty"/>';
    //'alt="' + props[n] + '" ' + 'id="' + id + 'Property' + String(c+10) + '"/>';
    return html;
}



// The way to get the value of the selected radio button
// I don't use this one because it made IE not work
function getRadioVal(radioName) {
  var rads = document.getElementsByName(radioName);
  for (var rad in rads) {
    if (rads[rad].checked) {
      return rads[rad].value;
    }
  }
  return null;
}


// This was made for IE to work
// It returns -1 when the radio has not be checked. Otherwise it returns the value of the 
// chosen radio (in the other given in ifNameList)
function getNameRadioValue(idNameList) {
    var valueReturned = -1;
    for (var j=0; j<idNameList.length;j++ ) {
        if (document.getElementById(idNameList[j]).checked) {
            valueReturned = j;
        }
    }
    return valueReturned;
}



if (!('bind' in Function.prototype)) {
    Function.prototype.bind= function(owner) {
        var that= this;
        if (arguments.length<=1) {
            return function() {
                return that.apply(owner, arguments);
            };
        } else {
            var args= Array.prototype.slice.call(arguments, 1);
            return function() {
                return that.apply(owner, arguments.length===0? args : args.concat(Array.prototype.slice.call(arguments)));
            };
        }
    };
}

// Add ECMA262-5 string trim if not supported natively
//
if (!('trim' in String.prototype)) {
    String.prototype.trim= function() {
        return this.replace(/^\s+/, '').replace(/\s+$/, '');
    };
}

// Check if two arrays are equal
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// Add ECMA262-5 Array methods if not supported natively
//
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf= function(find, i /*opt*/) {
        if (i===undefined) i= 0;
        if (i<0) i+= this.length;
        if (i<0) i= 0;
        for (var n= this.length; i<n; i++)
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}
if (!('lastIndexOf' in Array.prototype)) {
    Array.prototype.lastIndexOf= function(find, i /*opt*/) {
        if (i===undefined) i= this.length-1;
        if (i<0) i+= this.length;
        if (i>this.length-1) i= this.length-1;
        for (i++; i-->0;) /* i++ because from-argument is sadly inclusive */
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach= function(action, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
if (!('map' in Array.prototype)) {
    Array.prototype.map= function(mapper, that /*opt*/) {
        var other= new Array(this.length);
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                other[i]= mapper.call(that, this[i], i, this);
        return other;
    };
}
if (!('filter' in Array.prototype)) {
    Array.prototype.filter= function(filter, that /*opt*/) {
        var other= [], v;
        for (var i=0, n= this.length; i<n; i++)
            if (i in this && filter.call(that, v= this[i], i, this))
                other.push(v);
        return other;
    };
}
if (!('every' in Array.prototype)) {
    Array.prototype.every= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && !tester.call(that, this[i], i, this))
                return false;
        return true;
    };
}
if (!('some' in Array.prototype)) {
    Array.prototype.some= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && tester.call(that, this[i], i, this))
                return true;
        return false;
    };
}