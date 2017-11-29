//Helper functions are stored in utils.js script

// Global variable assignment for the experiment 

var imgsPerSlide = 2
var numBlocks = 6; 
var numOccurs = 2
var numUsedImgs = ((imgsPerSlide*numOccurs)-1)*numBlocks
var numUsedSounds = numBlocks;

var numImgs = 28;
var numSounds = 6;

allImgs = range(1,numImgs);
allImgs = shuffle(allImgs);
allImgs = allImgs.slice(0,numUsedImgs);

allSounds = range(1,numSounds);
allSounds = shuffle(allSounds);
allSounds = allSounds.slice(0,numUsedSounds);

allImgs = allImgs.map(function(elem){return 'Novel'+elem;});
$(allImgs.map(function(elem){return 'stimuli/images/'+elem+'.jpg';})).preload();

// controls order of trial types
var trialOrder = [1, 1, 2, 2, 1, 2];           

// controls whether we move the image on test trials
var allSamePosOne = [[1, 0], [0, 1], [1, 0]];

// controls the delay between exposure and test         
var allSpacings = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

var condition, handler, testFaceIdx;
var numExamples = 2;
var startTime = 0;
var samePosOrderOne = random(2);
var samePosOrderTwo = random(2);
var cont = 0;
var audioSprite = $("#sound_player")[0];
var exampleImages = ['lion','flower','truck','tie'];
var exampleFaces = ['down-right', 'down-left'];
var exampleFacesIdx = [1,0];
var testFaces = ['down-left', 'down-right'];
var trialSounds = allSounds.map(function(elem){return 'Sound'+elem;});

//Show instruction slide
showSlide("instructions"); 

/*This is where we define the experiment variable, 
which tracks all the information we want to know about 
the experiment.
*/

var experiment = {
  experiment: 'soc_xsit_ipad',
  subId: '',
  social_cond: '',
  trialOrder: trialOrder,
  trialTypes: trialOrder,
  trials: allSpacings,
  samePosOrderOne: samePosOrderOne,
  samePosOrderTwo: samePosOrderTwo,
  samePos: [allSamePosOne[samePosOrderOne][0], allSamePosOne[samePosOrderOne][1],
            allSamePosOne[samePosOrderTwo][0], allSamePosOne[samePosOrderTwo][1],
            allSamePosOne[samePosOrderOne][0], allSamePosOne[samePosOrderOne][1]],
  data: [],
  keepPic: ['','','','','',''],
  keepIdx: [0, 0, 0, 0, 0, 0],
  item: 0,
  exampleItem: 0,
  trialSounds: trialSounds,
  exampleSounds: ['flower','truck'],
  trialImages: allImgs,
  exampleImages: exampleImages,
  exampleFace: 0,
  exampleFaces: exampleFaces,
  faceCenter: 'straight-ahead',
  faceVids: testFaces, 

/*The function that gets called when the sequence is finished. */
  end: function() {
    // grab variables and store in experiment object
    experiment.social_cond=testCondition;
    experiment.subId=subjectID;
    experiment.comments = $('#comments')[0].value;
    //Show the finish slide
    showSlide("finished"); 
    // submit to turk
    setTimeout(function() { turk.submit(experiment);}, 1500);
    },

/*shows a blank screen for 1500 ms*/
  blank: function() {
    showSlide("blankSlide");
    if(experiment.exampleItem == numExamples){
      experiment.exampleItem = numExamples+1;
      setTimeout(showSlide("instructions3"),500);
    } else {
      setTimeout(experiment.next, 1500);
    } 
  },

  conditionClick: function() {
    // check if subject id is numeric 
    if($.isNumeric($("#subjectID").val())){
        subjectID = $("#subjectID").val()
        showSlide("condition")
        $(".conditionButton").click(function() {
          testCondition = this.id;
        });
    } else {
      alert("Enter numeric for Subject ID");
      showSlide("instructions");
    }
  },

  conditionTouch: function() {
    subjectID = $("#subjectID").val()
    showSlide("condition")
    $(".conditionButton").one("touchstart", function(event) {
          testCondition = $(this).attr('id')
    })
  },


  training: function() {
    //variable creation
    var xcounter = 0;
    var dotCount = 5;
    var dotx = [];
    var doty = [];

    //start and pause audio player
    audioSprite.play();
    audioSprite.pause();

    // put dots on the screen
    for (i = 0; i < dotCount; i++) {
      createDot(dotx, doty, i);
    }

    showSlide("training");

    $('.dot').bind('click', function(event) {
        var dotID = $(event.currentTarget).attr('id');
        document.getElementById(dotID).src = "images/dots/x.jpg";
        xcounter++
        if (xcounter === dotCount) {
              setTimeout(function () {
                  training.removeChild(dot_1)
                  training.removeChild(dot_2)
                  training.removeChild(dot_3)
                  training.removeChild(dot_4)
                  training.removeChild(dot_5)
                  $("#reward_player")[0].play();
                }, 1000);
          setTimeout(function () {
            $("#training").hide();
          //  document.body.style.background = "black";
            setTimeout(function() {
            showSlide("instructions2");
          }, 1500);
        }, 1500);
      }
    });    
  },

/*The work horse of the sequence: what to do on every trial.*/
  next: function() {
    // variable creation
    var i, next_imgs = [],sound, face_vid, blank, faceLook, idx;

    //show example trials
    if(Math.floor(experiment.exampleItem) < numExamples) { 
            sound = experiment.exampleSounds[Math.floor(experiment.exampleItem)]
            faceLook = experiment.exampleFace;
            face_vid = experiment.exampleFaces[experiment.exampleFace];
            //update the images shown
            for(i = 0; i < imgsPerSlide; i++) { 
                next_imgs[i] = experiment.exampleImages.shift();
            };
            // increment counters
            experiment.exampleItem = experiment.exampleItem + 1; 
            experiment.exampleFace = experiment.exampleFace + 1;
    } else {
            trial = experiment.trials.shift();
            if (typeof trial == "undefined") {return showSlide("qanda");}
            experiment.item = trial-1;
            sound = experiment.trialSounds[experiment.item];
    
          // exposure trial
          if(experiment.keepPic[experiment.item].length == 0 & 
            testCondition == "Social") {
                faceLook = random(2);
                face_vid = experiment.faceVids[faceLook];
          } else {
                face_vid = experiment.faceCenter;
                faceLook = -1;
          }
        
        // test trial 
        if(experiment.keepPic[experiment.item].length > 0) { 
              idx = experiment.keepIdx[experiment.item];
              // need to put the kept object in a new place
              if(experiment.samePos[experiment.item] != 1){         
                var all_pos = range(0,imgsPerSlide-1); 
                all_pos.splice(idx,1);
                all_pos = shuffle(all_pos);
                idx = all_pos[0];
              }
        } else {
              idx = -1; 
        }    
    
      // grab all new images
      for(i = 0; i < imgsPerSlide; i++) {
        i == idx ? next_imgs[i] = experiment.keepPic[experiment.item] :
          next_imgs[i] = experiment.trialImages.shift();
      }
    }

    // update on-screen objects
    for (i = 0; i < imgsPerSlide; i++) {
      $(".xsit_pic")[i].children[0].src = "stimuli/images/"+next_imgs[i]+".jpg";
    }
    
// get video file
  experiment.browser=BrowserDetect.browser;
  videoElement = document.getElementById("video1");

           if (videoElement.canPlayType("video/mp4")) {
                  $("#video1")[0].src = "stimuli/videos/"+face_vid+".mov";          
               }
               else if (videoElement.canPlayType("video/ogg")) {
                    $("#video1")[0].src = "stimuli/videos/"+face_vid+".ogv";          
               }
               else {
                   window.alert("Can't play anything");
               }

  $("#video1")[0].load();

// get sound file
  if(experiment.keepPic[experiment.item].length != 0){
        sound=sound+'_find';
  } else {
        if(Math.floor(experiment.exampleItem) <= numExamples){
          sound=sound+'_this';
        } else{
          sound=sound+'_this'; 
        }
  }

    //blank out all borders so no item is pre-selected
      $(".xsit_pic").each(function(){this.children[0].style.border = '5px solid white';});

    //Re-Display the experiment slide
      showSlide("stage");

// Play video after video has loaded completely
      videoElement.oncanplaythrough = function() {
            // Play eye gaze video 
              setTimeout(function(){
                $("#video1")[0].play();
              }, 1300)

            //Start recording responses when video finishes (at end of longest eye gaze)
              setTimeout(function(){
                startTime = (new Date()).getTime();
                $(".xsit_pic").bind("click", makeChoice);
              }, 5) // should be 4000


            //Wait, Play a sound
              setTimeout(function(){
                audioSprite.removeEventListener('timeupdate', handler);
                audioSprite.currentTime = spriteData[sound].start;
                audioSprite.play();

                handler = function(){
                    if(this.currentTime >= spriteData[sound].start + spriteData[sound].length){
                        this.pause();
                    };
                };

                audioSprite.addEventListener('timeupdate', handler, false);
              }, 1600); 
        }; 

/* lets the participant select a picture and records which one was chosen */
        var makeChoice = function(event) {
                var img = trim(event.target.src);                       // get the image the participant selected
                var endTime, i, tmpImg, trial_type, gaze_target;        // variable creation         
                $(".xsit_pic").unbind("click");                         // unbind the click event handler 
                endTime = (new Date()).getTime();                       // get the end time for computing RT
                event.target.style.border = '5px solid green';          // visually indicates the participant's choice
                $("#reward_player")[0].play();                          // play chime

                //check where we are in the experiment
                if(Math.floor(experiment.exampleItem) <= numExamples) {
                  trial_type = "example";
                } else if(Math.floor(experiment.exampleItem) > numExamples & 
                    experiment.keepPic[experiment.item].length == 0) {
                  trial_type = "exposure";
                } else {
                  trial_type = "test";
                }

                // find the screen position of the clicked object
                for(i = 0; i < imgsPerSlide; i++) {
                  tmpImg = trim($(".xsit_pic")[i].children[0].src);
                  if(tmpImg == img){break;}
                }

                // store that image as new_image
                var new_i = i, new_img = img, correct;

                // get the kept images (previous and current)
                if(trial_type == "example") {
                        kept_prev = "NA";
                        kept_curr = "NA";
                        kept_idx = "NA";
                } else if (trial_type == "exposure") {
                        kept_prev = "NA";
                        experiment.keepPic[experiment.item] = new_img;
                        experiment.keepIdx[experiment.item] = new_i;
                } else {
                        kept_prev = experiment.keepPic[experiment.item];
                        kept_curr = "NA";
                }
                

                if(trial_type == "exposure") {
                    kept_curr = experiment.keepPic[experiment.item]; 
                }

                 // get gaze target
                if(face_vid == "down-left") {
                  gaze_target = trim($(".xsit_pic")[0].children[0].src);
                } else if (face_vid == "down-right") {
                  gaze_target = trim($(".xsit_pic")[1].children[0].src);
                } else {
                  gaze_target = "NA";
                }

                 // is response correct
                if(trial_type == "example" || trial_type == "exposure") {
                    correct = gaze_target == img;
                } else {
                  correct = kept_prev == img;
                }


                // keep picture from selection
                if(Math.floor(experiment.exampleItem) > numExamples &
                      experiment.trialTypes[experiment.item] != 1){ 
                    var all_pos = range(0,imgsPerSlide-1);
                    all_pos.splice(i,1); 
                    all_pos = shuffle(all_pos);
                    new_i = all_pos[0];  
                    new_img = trim($(".xsit_pic")[new_i].children[0].src);
                    experiment.keepPic[experiment.item] = new_img;
                    experiment.keepIdx[experiment.item] = new_i;   
                  } 

           
                //store everything we want about the trial
                data = {
                    itemNum: experiment.item,
                    trial_category: trial_type,
                    trialType: experiment.trialTypes[experiment.item],
                    samePos: experiment.samePos[experiment.item],
                    gaze_target: gaze_target,
                    chosen: img,
                    correct: correct,
                    chosen_idx: i,
                    kept_prev: kept_prev,
                    kept_curr: kept_curr,
                    kept_idx: experiment.keepIdx[experiment.item],
                    rt: endTime - startTime,
                    face_vid: face_vid,
                    face_idx: faceLook,
                };  
                console.log(data);
                experiment.data.push(data);
              
                setTimeout(experiment.blank, 500);
        }
    }
  };