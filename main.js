
function color(n) {
  var color = ["#FDE6A6", "#EBEBEC", "#A8E6D1", "#EBEBEC", "#F0CCDF", "#EBEBEC", "#A8E6D1", "#EBEBEC", "#D2E1FF", "#EBEBEC", "#FAD7C2", "#EBEBEC"];
  return color[n % color.length];
}
var padding = {top:10, right:50, bottom:0, left:75},
            w = 555 - padding.left - padding.right,
            h = 555 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            picked = 100000,
            oldpick = [];        
        var data = [
                    {"label":"JOURNEY", "value":" Click to Play!", "Question":"Well Done! Your Selection is: Journey Quiz"}, 
                    {"label":"ACHIEVEMENTS",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: Achievements Quiz"}, 
                    {"label":"LEADERBOARD",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: Leaderboard Quiz"}, 
                    {"label":"SAM",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: SAM Quiz"}, 
                    {"label":"EMMY",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: EMMY Quiz"}, 
                    {"label":"iPRAISE",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: iPRAISE Quiz"}, 
                    {"label":"LEARNING",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: Learning Quiz"}, 
                    {"label":"TIMELINE",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: Timeline Quiz"},
                    {"label":"EVENTS",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: Events Quiz"}, 
                    {"label":"NOTIFICATION",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: Notification Quiz"}, 
                    {"label":"BADGES", "value":"Click to Play!", "Question":"Well Done! Your Selection is: Badges Quiz"}, 
                    {"label":"MYFEED", "value":"Click to Play!", "Question":"Well Done! Your Selection is: Myfeed Quiz"}
                    
                    //comma
        ];
        var svg = d3.select('#chart')
            .append("svg")
            .data([data])
            .attr("width",  w + padding.left + padding.right)
            .attr("height", h + padding.top + padding.bottom);

        var container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");

        var vis = container
            .append("g");
            
        var pie = d3.layout.pie().sort(null).value(function(d){return 1;});

        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);

        // select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");
            

        arcs.append("path")
            .attr("fill", function(d, i){ return color(i); })// pTH COLOR
            .attr("d", function (d) { return arc(d); });

        // add the text
        arcs.append("text").attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle)/2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
            })
            .attr("text-anchor", "end")
            .text( function(d, i) {
                return data[i].label;
            });

        


        function spin(d){
              
            container.on("click", null);

            //all slices have been seen, all done
            console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
            if(oldpick.length == data.length){
                console.log("done");
                container.on("click", null);
                return;
            }

            var  ps       = 360/data.length,
                 pieslice = Math.round(1440/data.length),
                 rng      = Math.floor((Math.random() * 1440) + 360);
                
            rotation = (Math.round(rng / ps) * ps);
            
            picked = Math.round(data.length - (rotation % 360)/ps);
            picked = picked >= data.length ? (picked % data.length) : picked;


            if(oldpick.indexOf(picked) !== -1){
                d3.select(this).call(spin);
                return;
            } else {
                oldpick.push(picked);
            }

            rotation += 0 - Math.round(ps/2);

            vis.transition()
                .duration(3000)
                .attrTween("transform", rotTween)
                .each("end", function(){

                    //mark Question as seen
                    
                    d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                        .attr("fill", "#383C45");
                    d3.select(".slice:nth-child(" + (picked + 1) + ") text")
                        .attr("fill", "white");

                    //populate Question
                    d3.select("#Question button")
                        .text(data[picked].value);

                    d3.select("#Question h3")
                        .text(data[picked].Question);


                         document.getElementById("h1").style.display="none";
                         document.getElementById('img4').style.display="none";
                        document.getElementById('btn1').style.display="block";
                        document.getElementById('p1').style.display = "block";
                         document.getElementById("img3").setAttribute('src', 'spincenter.png');

                    oldrotation = rotation;
                
                    container.on("click", spin);

                });
                 document.getElementById('container1').style.display="none";
                
                        document.getElementById('container2').style.display="block";
        }

        
        
        function rotTween(to) {
          var i = d3.interpolate(oldrotation % 360, rotation);
          return function(t) {
            return "rotate(" + i(t) + ")";
          };
        }
        
        
        function getRandomNumbers(){
            var array = new Uint16Array(1000);
            var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);

            if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
                window.crypto.getRandomValues(array);
                console.log("works");
            } else {
                //no support for crypto, get crappy random numbers
                for(var i=0; i < 1000; i++){
                    array[i] = Math.floor(Math.random() * 100000) + 1;
                }
            }

            return array;
        }
         
/*Quiz Script*/
function start(d)

 { 
 document.getElementById("img3").disabled = true;
  document.getElementById('container2').style.display="none";
    $("#h1").text("to play ")
  if ((data[picked].label) == "ACHIEVEMENTS") { 
    $("#heading").text("ACHIEVEMENTS");
    document.getElementById("btn1").style.display = "none";
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "Where can you view the history of points earned by imperatives in a sorted manner?",
    options: ["Timeline", "Progress", "My Feed", "Notification"],
    answer: 0
  }, 
  {
    question: "Where will you find the total badges earned?",
    options: ["My Feed", "Notification","Achievements", "Progress"],
    answer: 2
  },
   {
    question: "Where can you see all the appreciation provided and received in EmPower Platform?",
    options: ["My Feed", "Achievements","Notification", "Progress"],
    answer: 1
  },
   {
    question: "Where can you see the progress imperatives wise in EmPower?",
    options: ["My Feed", "Achievements","Notification", "Progress"],
    answer: 3
  },
  {
    question: "Where can you view the total universal energy left in EmPower?",
    options:["My Feed", "Achievements","Notification", "Progress"],
    answer: 1
  }]
}
else if ((data[picked].label) == "JOURNEY") { 
  $("#heading").text("JOURNEY");
    document.getElementById("btn1").style.display = "none";
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "The entire game experience is designed on Car Race Concept ‘Mumbai – Grand Prix’.",
    options: ["True","False"],
    answer: 0
  }, 
  {
    question: "How many points are needed to complete an Entire Lap?",
    options: ["2300","2400","2500"],
    answer: 0
  }, 
  {
    question: "Level configurations on EmPower is inspired from SEA Level of Autonomous car? ",
    options:["True","False"],
    answer: 0
  }, 
  {
    question: "What does the Level L0 in the journey denotes?",
    options: ["No Automation","Fully Automation","Driver Automation","Conditional Automation"],
    answer: 0
  }, 
  {
    question: "What does the Level L4 in the journey denotes?",
    options: ["High Automation","Fully Automation","Driver Automation","Conditional Automation"],
    answer: 0
  }]
}
else if ((data[picked].label) == "LEADERBOARD") { 
  $("#heading").text("LEADERBOARD");
    document.getElementById("btn1").style.display = "none";
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "In which page can you determine the current Topmost users with the highest points in your team?",
    options: ["Leaderboard >> Team", "Leaderboard >> All", "Leaderboard >> Department", "Leaderboard >> Location"],
    answer: 0
  }, 
  {
    question: "In which page can you determine the current Top 10 users with the highest points in our Organization?",
    options: ["Leaderboard >> Team", "Leaderboard >> All", "Leaderboard >> Department", "Leaderboard >> Location"],
    answer: 1
  },
  {
    question: "Where can you find the current Top 10 users at your location?",
    options: ["Leaderboard >> Team", "Leaderboard >> All", "Leaderboard >> Department", "Leaderboard >> Location"],
    answer: 3
  },
  {
    question: "How to check your points earned for last month based on different imperatives?",
    options: ["Leaderboard>> Filter>> Time Period>> Last Month", "Leaderboard >> Filter>> Time Period>> Current Quarter", "Leaderboard >> DepartmentFilter>> Time Period>> Current Quarter", "Leaderboard >> LocationFilter>> Time Period>> Current Month"],
    answer: 0
  },
  {
    question: "How to check the Leaderboard scores for badges earned by Top 10 users?",
    options: ["Select Dropdown list for Badges next to filter option", "Select Dropdown list for Scores next to filter option","Select Dropdown list for Quiz next to filter option", "All"],
    answer: 0
  }]
}
else if ((data[picked].label) == "SAM") { 
  $("#heading").text("SAM");
    document.getElementById("btn1").style.display = "none";
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "What is SAM?",
    options: ["System Automated Messenger", "System Automated Message", "System Automation Message", "System Automation Messenger"],
    answer: 1
  },
  {
    question: "Who provides information related to your earned points, earned badges and team members activities?",
    options: ["SAM", "EMMY", "Daily Email Digest", "My Feed"],
    answer: 0
  },
  {
    question: "Who displays/Nudges you regarding the imperatives that you should do to earn badge?",
    options: ["SAM", "EMMY", "Daily Email Digest", "My Feed"],
    answer: 0
  },
  {
    question: "Where can you find SAM in our EmPower Platform",
    options: ["Journey", "Homepage", "Achievements", "Leaderboard"],
    answer: 1
  }]
}
else if ((data[picked].label) == "EMMY") { 
  $("#heading").text("EMMY");
    document.getElementById("btn1").style.display = "none";
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "Who is EMMY?",
    options: ["Event Manager", "Engagement Manager", "Event Management"],
    answer: 2
  }, {
    question: "Who broadcast messages, post events and quizzes for users?",
    options: ["SAM", "EMMY", "Daily Email Digest", "My Feed"],
    answer: 1
  }]
}
else if ((data[picked].label) == "iPRAISE") { 
  $("#heading").text("iPRAISE");
    document.getElementById("btn1").style.display = "none";
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "What is iPraise?",
    options: ["Appreciate your fellow Teammate","Display ongoing Events","Raise a Voice"],
    answer: 0
  }, 
  {
    question: "What are the deducted points called when you appreciate a team member?",
    options: ["Universal Energy","Karma Points"],
    answer: 0
  }, 
   {
    question: "What are the points called when you have been appreciated by a team member?",
    options: ["Universal Energy","Karma Points"],
    answer: 1
  },
  {
    question: "How many points are deducted when you appreciate a team member?",
    options: ["25","50","75","30"],
    answer: 0
  },
  {
   question: "What are the core value badges user can give while appreciating a team member?",
    options: ["BeBold, BeTrue, GiveBack, LearnFast,WinTogether", "BeBold, BeTrue, GiveBack, LearnFast", "BeBold, BeTrue, GiveBack, LearnFast, BeDedicated"],
    answer: 0
  }]
}
else if ((data[picked].label) == "LEARNING") { 
  $("#heading").text("LEARNING");
    document.getElementById("btn1").style.display = "none";
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "When you complete a training the completed trainings are sorted as per completed date?",
    options: ["True","False"],
    answer: 0
  },
  {
    question: "How many points do you earn when you complete the training?",
    options: ["50","100", "150", "None of the above"],
    answer: 3
  }, 
  {
    question: "Only those training can be availed for Earning points which are present on EmPower?",
    options: ["True","False"],
    answer: 0
  }, 
  {
    question: "Training completed before 1st April can also be credited in EmPower?",
    options:["Yes","No"],
    answer: 1
  }]
}
else if ((data[picked].label) == "TIMELINE") { 
  $("#heading").text("TIMELINE");
    document.getElementById("btn1").style.display = "none";
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "Where can you view the history of points earned by imperatives in a sorted manner?",
    options: ["Timeline","Progress","My Feed","Notification"],
    answer: 0
  }, {
    question: "Does the Timeline section display the badges earned by the user?",
    options: ["True","False"],
    answer: 1
  }]
}
else if ((data[picked].label) == "EVENTS") { 
  $("#heading").text("EVENTS");
    document.getElementById("btn1").style.display = "none";
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "Where can you find the upcoming/ongoing/past events in EmPower?",
    options: ["Events","Journey","Leaderboard","Achievements"],
    answer: 0
  }, 
  {
    question: "Is all the information regarding to date, time and place of event will be available in the Event Section?",
    options: ["True","False"],
    answer: 0
  },
  {
    question: "Where are the counts of the ongoing events displayed in the EmPower?",
    options: ["Carousel / Slider Display","My Feed","Notification"],
    answer: 0
  }]
}
else if ((data[picked].label) == "NOTIFICATION") { 
  $("#heading").text("NOTIFICATION");
    document.getElementById("btn1").style.display = "none";
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "Where can you find the points earned for the respective imperative, Appreciation & Upcoming Quiz  ?",
    options:  ["Notification","Timeline","Achievements","My Feed"],
    answer: 0
  }, {
    question: "Notification is displayed as a bell icon ",
    options: ["True","False"],
    answer: 0
  },
  {
    question: "Messages which are not viewed are highlighted in stacked numbers?",
    options: ["True","False"],
    answer: 0
  }]
}
else if ((data[picked].label) == "MYFEED") { 
  $("#heading").text("MYFEED");
    document.getElementById("btn1").style.display = "none";
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "Where will the message from SAM and Emmy will be displayed?",
    options: ["My Feed","Notification","SAM and Emmy","Daily Email Digest"],
    answer: 0
  }, {
    question: "All messages for points and badges earned, Appreciation card, Events, Broadcast and Upcoming ",
    options: ["True","False"],
    answer: 1
  },
  {
    question: "Like and Comments from Team members are visible in which section?",
    options: ["My Feed","Notification","SAM and Emmy","Daily Email Digest"],
    answer: 0
  },
  {
    question: "Can you sort the messages in My feed based on most commented?",
    options: ["Yes","No"],
    answer: 0
  }, 
  {
    question: "How to filter messages from Emmy In My Feed section? ",
    options: ["Filter by>> SAM","Filter by>> Emmy","Filter by>> All"],
    answer: 2
  }]
}
else{
  $("#heading").text("BADGES");
    document.getElementById("btn1").style.display = "none";
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "How many streaks are needed to earn Consistent ranger badge for Timesheet Save?",
    options: ["3","2","1"],
    answer: 0
  },
  {
    question: "How many streaks are needed to earn Consistent ranger badge for Timesheet Submit?",
    options: ["2","3","1"],
    answer: 0
  },
  {
    question: "How many streaks are needed to earn Horsepower Burner badge for Prohance?",
    options: ["1","2","3"],
    answer: 2
  },
  {
    question: "For which imperative you earn a Benevolent Guru badge?",
    options: ["How to-Upload","A3","Learning","How to-View"],
    answer:0
  },
  {
    question: "For which imperative you earn a Luminous Mind badge?",
    options: ["Learning","A3","How to-Upload ","How to-View"],
    answer: 1
  }]
};

 
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
  var seconds = 1500;  
  nextQuestion();


document.getElementById('seconds-counter').style.display = "block";
var el = document.getElementById('seconds-counter');

function incrementSeconds() {
   if(seconds>0){
   seconds -=1;
   if (seconds>=10) {
      el.innerText = "00 :" + seconds ;
   }
   else{
    el.innerText = "00 : 0" + seconds ;
    el.style.color ="red";
   }
   
   }
   else{
   quesCounter++;
   nextQuestion();
   seconds = 1500;
   }
   
}
var cancel = setInterval(incrementSeconds, 1000);

    
  $('#nextquiz').click(function () 
    {   
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            txt = "Please select one option";
            document.getElementById("demo").style.display = "block";
             document.getElementById("demo").innerHTML = txt;
        } 
        else 
        { seconds = 15;
          document.getElementById("demo").style.display = "none";
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h3>Question: ' + (index + 1) + '/'+allQuestions.length +'</h3>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);


        return element;
        

    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ol>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value= ' +  i  + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
      
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {   incrementSeconds();
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#nextquiz').show();
                    }


                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#nextquiz').hide();
                    $('#prev').hide();
                    resetQuiz();
                    playquiz();
                     /*clearInterval(cancel);*/
                }
        });
    }

    function resetQuiz()
      {
          question = 0;
          correct = 0;
          score =0;
          answer='';
          quesCounter=0;
          input='';
          clearInterval(cancel);
document.getElementById('seconds-counter').style.display = "none";
 document.getElementById("img3").disabled = false;
      }
  
  function displayResult() 
    {
        var score = $('<h3>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        /*score.append('You scored ' + correct + ' out of ' +allQuestions.length);*/
       if (correct == 0){
         score.append('<h1 id="heading"> Whoops! Better Luck Next Time </h1> <br> You Have Scored ' + correct + ' out of ' +allQuestions.length+ '<br> Tap on Spin to Play More!');
       }
       else if (correct == 1){
          score.append('<h1 id="heading"> Not Bad! You were Very Close </h1> <br> You scored ' + correct + ' out of ' +allQuestions.length+ '<br> Tap on Spin to Play More!');
       }
       else {
          score.append('<h1 id="heading"> Awesome! You Got A Perfect Score </h1> <br> You scored ' + correct + ' out of ' +allQuestions.length+ '<br> Tap on Spin to Play More!');
       }
        return score;
  }



function playquiz(){
document.getElementById('heading').style.display = "none";
document.getElementById('p1').style.display = "none";




}
 
};
$(document).ready(function(){
  var docEl = $(document),
  headerEl = $('header'),
  headerWrapEl = $('.wrapHead'),
  navEl = $('nav'),
  linkScroll = $('.scroll');
  
  docEl.on('scroll', function(){
  if ( docEl.scrollTop() > 60 ){
  headerEl.addClass('fixed-to-top');
  headerWrapEl.addClass('fixed-to-top');
  navEl.addClass('fixed-to-top');
  }
  else {
  headerEl.removeClass('fixed-to-top');
  headerWrapEl.removeClass('fixed-to-top');
  navEl.removeClass('fixed-to-top');
  }
  });
  
  linkScroll.click(function(e){
  e.preventDefault();
  $('body, html').animate({
  scrollTop: $(this.hash).offset().top
  }, 500);
  });
  });

