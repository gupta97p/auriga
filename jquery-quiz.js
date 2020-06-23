let questions = [
	{
    id: 1,
    question: "Q1.Python is a______ ?",
    answer: "High Level Language",
    options: [
        "High Level Language",
        "English language",
	    "Low level language",
	    "None of these"
	    ],
	correct_option:0
	},
	{
	id: 2,
	question: "Q2.What is ful form of js?",
	answer: "Java Script",
	options: [
	    "Java screen",
		"Java Script",
		"Just Script",
		"None of these"
		],
		correct_option:1
    },
	{
	id: 3,
	question: "Q3.What is HTML",
	answer: "Hyper Text Markup Language",
	options: [
		"Hyper Tool making layer ",
		"Highest toggle markup Language",
		"Hyper Text Markup Language",	
		"HIgh Text Marking Language"
		],
		correct_option:2
	},
	{
	id: 4,
	question: "Q4.What is full form of css",
	answer: "Cascading Style Sheets",
	options: [
		"Cascading Style Shell",
		"Concatinate Style Sheets",
		"Cascading Script Sheets",	
		"Cascading Style Sheets"
		],
		correct_option:3
    },
	{
	id: 5,
	question: "Q5.Choose the correct HTML element for the largest heading:",
	answer: "h1",
	options: [
		"h1",
		"h6",
		"Heading",	
		"None"
		],
		correct_option:0
	}
];
var points=0;
var questionCount=0;
var user_ans;
var quiz_complete=false;
var progressBar_width;
window.onload=function()
{
	if(localStorage.getItem("currentQuestion")!==null && localStorage.getItem("currentQuestion")<=questions.length)
	{
		questionCount=localStorage.getItem("currentQuestion");
	}
	if(localStorage.getItem("progressBar_width"))
	{
	    progressBar_width=localStorage.getItem("progressBar_width");
		document.getElementById("progressBar").style.width=progressBar_width;
	}
	if(questionCount==0)
	{
		document.getElementById("prevButton").innerHTML="next";
	}
	
	if(questionCount==questions.length)
	{
		document.getElementById("nextButton").innerHTML="submit";
	}
	show(questionCount);
}
function show(count)
{
	if(quiz_complete==false){
		var Question=document.getElementById("Question");
		var [first,second,third,fourth]=questions[count].options;
		Question.innerHTML=`${questions[count].question}
		<ul class="option-group">
		<li  class="option">${first}</li>
		<li  class="option">${second}</li>
		<li  class="option">${third}</li>
		<li  class="option">${fourth}</li>
		</ul>`;
		changeBackground();	}
	else
	{
    	 quiz_complete=false;
		 questionCount=0;
		 clearStorage();
	}
}
function changeBackground()
{
	if(questionCount==0)
	{
		document.getElementById("prevButton").style.display="previous";
	}
	if(questionCount==questions.length-1)
	{
		document.getElementById("nextButton").innerHTML="submit";
	}
	if(questionCount==questions.length)
	{
		document.getElementById("nextButton").innerHTML="Play Again";
	}
	var buttons=document.querySelectorAll("li.option");
	for(let i=0;i<buttons.length;i++)
	{
		if(localStorage.getItem(questionCount)==i)
		{
			buttons[i].classList.add("active");
		}
		else
		{
			buttons[i].onclick= function()
			{
				for (let j=0;j<buttons.length;j++)
				{
					if(buttons[j].classList.contains("active"))
					{
						buttons[j].classList.remove("active");
					}
				}
			buttons[i].classList.add("active");
			user_ans=i;
			localStorage.setItem(questionCount,i);
			}
		}
	}
}
function nextQuestion()
{
	if(localStorage.getItem("progressBar_width"))
	{
		progressBar_width=localStorage.getItem("progressBar_width");
		document.getElementById("progressBar").style.width=progressBar_width;
	}
    progressBar_width=(((questionCount+1)/questions.length)*100)+"%";
	if(questionCount == questions.length-1)
	{
		results();
		document.getElementById("nextButton").innerHTML="Play Again";
		document.getElementById("prevButton").style.display="none";
		quiz_complete=true;
		questionCount++;
	}
	else
	{
		if(quiz_complete==true)
		{
			quiz_complete=false;
			questionCount=0;
			progressBar_width="0%";
			clearStorage();
			points=0;
			score=0;
			document.getElementById("nextButton").innerHTML="next";
		}
		else
		{
			localStorage.setItem("currentQuestion", questionCount);
			questionCount++;
			localStorage.setItem("currentQuestion",questionCount);
			if(questionCount==questions.length)
			{
				document.getElementById("nextButton").innerHTML="submit";
			}
			if(questionCount>0)
			{
				document.getElementById("prevButton").style.display="block";
			}
			show(questionCount);
		}
	}
	document.getElementById("progressBar").style.width=progressBar_width;
	localStorage.setItem("progressBar_width",progressBar_width);
}
function prevQuestion()
{
	questionCount--;
	var currentQuestion=localStorage.getItem("currentQuestion");
	progressBar_width=(((currentQuestion-1)/questions.length)*100)+"%";
	document.getElementById("progressBar").style.width=progressBar_width;
	localStorage.setItem("progressBar_width",progressBar_width);
	localStorage.setItem("currentQuestion",questionCount);
	show(questionCount);
	
}	
function clearStorage()
{
 	hideScore();
    for(let i=0;i<questions.length;i++)
	{
	   	localStorage.removeItem(i);
	}
	localStorage.removeItem("currentQuestion");
	show(questionCount);
}
function results()
{
 	for(let i=0;i<questions.length;i++)
	{
	  	if(localStorage.getItem(i)==questions[i].correct_option)
		{
			points++;	
		}
    }
    let score= (points/questions.length)*100;
	document.getElementById("result").innerHTML=Math.ceil(score);
	document.getElementById("result").style.backgroundColor="#848489";
	document.getElementById("result").style.display="block";
}
function hideScore()
{
	document.getElementById("result").style.display="none";
}
