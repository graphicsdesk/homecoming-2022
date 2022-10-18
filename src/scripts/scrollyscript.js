// set the dimensions and margins of the graph
import { selection } from "d3";
import scrollama from "scrollama";  
require("d3");

var scroller = scrollama();
var main = document.querySelector("main");
var scrolly = main.querySelector("#scrolly");
var sticky = scrolly.querySelector(".sticky-thing");
var article = scrolly.querySelector("article");
var steps = article.querySelectorAll(".step");
var myTimer=0;
var count=0;
var responseindex=0;
var resizeCheck=50;
var resizeDelay1=500;
var resizeDelay2=700;
var changeColorDelay1=500;
var changeColorDelay2=1000;
var changeColorTimer=1;


var margin = {top: 30, right: 30, bottom: 30, left: 30},
width = 615 - margin.left - margin.right,
height = 615 - margin.top - margin.bottom;

var margin2 = {top:40}

function resize(){
if(responseindex>2){
    resizeCheck=0;
    resizeDelay1=400;
    resizeDelay2=400;
    changeColorDelay1=400;
    changeColorDelay2=400;
    changeColorTimer=0;
  }
    d3.select(".sticky-thing").selectAll("*").remove();
    if(innerWidth<800){
      width = window.innerWidth - 80 - margin.left - margin.right,
      height = window.innerHeight - 80 - margin.top - margin.bottom;
    }
    if(innerHeight<700){
      height = window.innerHeight - 80 - margin.top - margin.bottom;
    }
    else{
      width = 615 - margin.left - margin.right,
      height = 615 - margin.top - margin.bottom;
    }
    buildGraph(responseindex);
    console.log("fire");
}

function buildGraph(rindex){
  if(innerWidth<850){
    width = window.innerWidth - 80 - margin.left - margin.right,
    height = window.innerHeight - 80 - margin.top - margin.bottom;
  }
  if(innerHeight<700){
    height = window.innerHeight - 80 - margin.top - margin.bottom;
    
  }

// append the svg object to the body of the page
var svg = d3.select(".sticky-thing")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom+25)
  .append("g")
    .attr("class","graphplot")
    .attr("transform",
          "translate(" + margin.left + "," + margin2.top + ")");

//Read the data
d3.csv("https://gist.githubusercontent.com/apark2020/8d3320df7af52627b689c2d53178cab6/raw/763c4347ab0316cfc2462c4293ee6aa881e50078/hocodata-fixed.csv", function(data) {
  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 70])
    .range([ 0, width ]);
  svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 70])
    .range([ height, 0]);
  svg.append("g")
    .attr("class", "yAxis")
    .call(d3.axisLeft(y));

  d3.select(".yAxis").select(".tick")
  .style("opacity",0);

  //gridlines
  d3.selectAll("g.yAxis g.tick")
    .append("line")
    .attr("class", "gridline")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", width)
    .attr("y2", 0)
    .style("stroke","#919191")
    .style("opacity",0.4)
    .style("stroke-width",1);

d3.selectAll("g.xAxis g.tick")
    .append("line")
    .attr("class", "gridline")
    .attr("x1", 0)
    .attr("y1", -height)
    .attr("x2", 0)
    .attr("y2", 0)
    .style("stroke","#919191")
    .style("opacity",0.4)
    .style("stroke-width",1);

//axes labels
svg.append("text")
    .attr("class", "xlabel")
    .attr("x", x(30))
    .attr("y", y(-5.5))
    .text("Points allowed");

    svg.append("text")
    .attr("class", "ylabel")
    .attr("text-anchor", "end")
    .attr("x", x(12))
    .attr("y", y(71))
    .text("Points scored");

//add line
svg.append('line')    
.style("stroke","black")
.style("stroke-width",2)
.style("opacity",0.5)
.attr("x1",x(0))
.attr("x2",x(70))
.attr("y1",y(0))
.attr("y2",y(70))

var originX=x(60);
var originY=y(67);
//add pd text

//arrow markers
svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
  .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 0)
    .attr("refY", 0)
    .attr("markerWidth", 5)
    .attr("markerHeight", 5)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

//add arrows
svg.append("line")
    .attr("x1",x(8))
    .attr("y1",y(7))
    .attr("x2",x(2))
    .attr("y2",y(7))
    .attr("id","arrow0")
    .attr("stroke","black")  
    .attr("stroke-width",2)  
    .attr("marker-end", "url(#end)")
    .attr("opacity", function(){
      if(rindex==1){
        return 1;
      }
      return 0;
    });

svg.append("line")
    .attr("x2",x(6))
    .attr("y2",y(46.5))
    .attr("x1",x(6))
    .attr("y1",y(52.5))
    .attr("id","arrow1")
    .attr("stroke","black")  
    .attr("stroke-width",2)  
    .attr("marker-end", "url(#end)")
    .attr("opacity", function(){
      if(rindex==4){
        return 1;
      }
      return 0;
    });

svg.append("line")
    .attr("x1",x(50.3))
    .attr("y1",y(7))
    .attr("x2",x(44.3))
    .attr("y2",y(7))
    .attr("id","arrow2")
    .attr("stroke","black")  
    .attr("stroke-width",2)  
    .attr("marker-end", "url(#end)")
    .attr("opacity", function(){
      if(rindex==5){
        return 1;
      }
      return 0;
    });


  // Add dots
  svg.append('g')
    .attr("class","dots")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.pointsagainst); } )
      .attr("cy", function (d) { return y(d.pointsfor); } )
      .attr("r", function (d){
        if(rindex>=3){{
          if(rindex>=6){
            if(Number(d.Index)>=59){
              return 8;
            }
          }
          if(Number(d.Index)>73){
            return 8;
          } 
          return 6;
        }}
        return 6;
      })
      .style("fill", function(d){
        if(rindex>=3){{
          if(rindex>=6){
            if(Number(d.Index)>=59){
              return "#c0f0b0";
            }
          }
          if(Number(d.Index)>73){
            return "#B4E4FF";
          } 
          return "#919191";
        }}
        return "#FFBD1F";
      })
      .attr("opacity",function(){
        if(rindex>=2){
          return 1;
        }
        return 0;
      })
      .attr("class",function(d) {
        if(Number(d.Index)>73){
          return "Bagnoli";
        }
        else{
          return "notBagnoli";
        }})
      .attr("id",function (d) {return "game"+d.Index})
    })
    if(window.innerHeight<700){
    d3.select(".sticky-thing")
    .selectAll("circle")
    .attr("r",function(){
      console.log(window.innerHeight/700);
      return (window.innerHeight/700)*6;
    })

    }

  }





function showFirst(){
  d3.select("#game0")
    .style("fill", "#FFBD1F")
    .transition()
    .duration(1000)
    .attr("opacity", 1)
    
  d3.select("#arrow0")
    .transition()
      .duration(1000)
      .attr("opacity", 1)
  
}



function triggerShow(duration1,duration2,delay){
  count=0;
  myTimer = window.setInterval(function(){count+=1;},50);
  var svg = d3.select(".sticky-thing")
    svg.selectAll('circle')
    .transition()
    .duration(duration1)
    .style("fill", "#FFBD1F")
    .attr("r",6)
    .transition()
    .duration(duration2)
    .attr("opacity", 1)
    .delay(function(d, i) { return i * delay; })
}

function triggerClear(){
  var svg = d3.select(".sticky-thing")
    svg.selectAll('circle')
    .transition()
    .duration(400)
    .attr("opacity", 0)
    .delay(function(d, i) { return i * 10; })
}


function invisibleAll(){
  d3.selectAll("#arrow0,#arrow1,#arrow2")
      .transition()
      .duration(500)
      .attr("opacity",0)
}  

//checkFlag
function changeColors1(check,duration1,duration2){
  if(check==1){
    if(count<100) {
      window.setTimeout(changeColors1, 50, 1, 500, 1000); /* this checks the flag every 100 milliseconds*/
    }
   else{
    clearInterval(myTimer);
    d3.selectAll('.notBagnoli')
      .transition()
      .duration(duration1)
      .style("fill", "#919191");
    d3.selectAll('.Bagnoli')
      .transition()
      .duration(duration2)
      .style("fill", "#B4E4FF")
      .attr("r",8)
    } 
  }
  else{
    clearInterval(myTimer);
    console.log("check=0");
    d3.selectAll('.notBagnoli')
      .transition()
      .duration(duration1)
      .style("fill", "#919191");
    d3.selectAll('.Bagnoli')
      .transition()
      .duration(duration2)
      .style("fill", "#B4E4FF")
      .attr("r",8)
    
  }
  
}

function changeColors2(duration1,duration2){
  clearInterval(myTimer);
  d3.selectAll('circle')
  .each(function(d){
    if(d.Index<59){
      d3.select(this)
      .transition()
      .duration(duration1)
      .style("fill", "#919191");
    }
    else{
      d3.select(this)
      .transition()
      .duration(duration2)
      .style("fill", "#c0f0b0")
      .attr("r",8);
    }
  })
} 


function handleStepEnter(response){
  if(responseindex>2){
    resizeCheck=0;
    resizeDelay1=400;
    resizeDelay2=400;
    changeColorDelay1=400;
    changeColorDelay2=400;
    changeColorTimer=0;
  }
  if(responseindex<2){
    resizeCheck=50;
    resizeDelay1=500;
    resizeDelay2=700;
    changeColorDelay1=500;
    changeColorDelay2=1000;
    changeColorTimer=1;
  }
  console.log(resizeCheck);
  responseindex=response.index;
  invisibleAll();
  var el = response.element;
  console.log(response.index);
  if(response.index<2){
    triggerClear();
  }
  if(response.index==1){
    clearInterval(myTimer);
    showFirst();
  }
  if(response.index==2){
    clearInterval(myTimer);
    triggerShow(resizeDelay1,resizeDelay2,resizeCheck);
  }
  if(response.index==3){
    console.log(count);
    changeColors1(changeColorTimer,changeColorDelay1,changeColorDelay2);

  }
  if(response.index==4){
    d3.select("#arrow1")
      .transition()
      .duration(500)
      .attr("opacity",1)
  }
  if(response.index==5){
    d3.select("#arrow2")
      .transition()
      .duration(500)
      .attr("opacity",1)
    d3.selectAll('.notBagnoli')
      .transition()
      .duration(500)
      .attr("r",6)
      .style("fill", "#919191");
    d3.selectAll('.Bagnoli')
      .transition()
      .duration(500)
      .attr("r",8)
      .style("fill", "#B4E4FF")
  }
  if(response.index==6){
    changeColors2(500,500);
  }
  steps.forEach(step => step.classList.remove('is-active'));
  el.classList.add('is-active');
}


function init() {
  buildGraph(0);
  scroller
  .setup({
      step: "#scrolly article .step",
      offset: 0.5,
      debug: false
  })
  .onStepEnter(handleStepEnter);

  // setup resize event
  window.addEventListener("resize", scroller.resize);
  window.addEventListener("resize", resize);
}

init();




    
