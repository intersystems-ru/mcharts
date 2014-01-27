
var chartData1=[], chartData2=[];


var getData = function ( url, callback ) {
    $.ajax({
        type:"GET",
        url: url,
        dataType:"json"
    }).success(function(data){  callback(data); });
};

//
//
//
//
//

var chart,chart2;


var CHARTS_WIDTH = 1000;
var currentSlide=0;
                var maxSlides=2;
                var speed=500;
                
                var slides;
                    
                var swipeOptions=
                {
                    triggerOnTouchEnd : true,   
                    swipeStatus : swipeStatus,
                    allowPageScroll:"vertical",
                    threshold:75            
                    }



$(window).on("resize",function(){
    CHARTS_WIDTH = $(window).width()-20;
    $("#content").css("width",CHARTS_WIDTH);
    $(".amcharts").css("width",CHARTS_WIDTH);
    $(".swiper-wrapper").css("width",maxSlides*CHARTS_WIDTH) 
}).trigger("resize");


AmCharts.ready(function() {
 


    


// SERIAL CHART
var items=[];
var url1 = "http://37.139.4.54/mdx2json/MDX/SELECT NON EMPTY [Product].[P1].[Product Category].Members ON 0,NON EMPTY [Outlet].[H1].[Region].Members ON 1 FROM [HoleFoods]";
var url2 = "http://37.139.4.54/mdx2json/MDX/SELECT NON EMPTY [DateOfSale].[Actual].[DaySold].Members ON 1 FROM [HoleFoods] %25FILTER [Measures].[Amount Sold]"
    
    
               getData( url1 , function ( data ) {
                       for(var i=0;i<data.columnCount;i++)
                     {
                       //chartData1=[];
                       chartData1.push({
                                       "name": data.axes[0].tuples[i].caption,
                                      "value":data.cells[i]
                                });
                      }
                       if(chart) {chart.validateData();}
                       });
               
               
               getData( url2 , function ( data ) {
                       for(var i=0;i<data.rowCount;i++)
                       {
                       chartData2=[];
                       chartData2.push({
                                       "date": data.axes[1].tuples[i].caption,
                                       "value":data.cells[i]
                                       });
                       }
                       if(chart2) chart2.validateData();
                       });


    chart2 = new AmCharts.AmSerialChart();
    chart2.pathToImages = "http://www.amcharts.com/lib/3/images/";
    chart2.marginRight = 10;
    chart2.dataProvider = chartData2;
    chart2.categoryField = "date";
    //chart2.dataDateFormat = "YYYY";
    
    // AXES
    // Category
    var categoryAxis = chart2.categoryAxis;
    //categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    //categoryAxis.minPeriod = "YYYY"; // our data is yearly, so we set minPeriod to YYYY
    categoryAxis.minorGridEnabled = true;
    categoryAxis.minorGridAlpha = 0.15;
    
    // VALUE
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.gridAlpha = 0;
    valueAxis.axisAlpha = 0;
    valueAxis.fillColor = "#000000";
    valueAxis.fillAlpha = 0.05;
    valueAxis.inside = true;
    chart2.addValueAxis(valueAxis);
    
    // GRAPH                 
    graph2 = new AmCharts.AmGraph();
    graph2.type = "step"; // this line makes step graph
    graph2.valueField = "value";
    graph2.lineColor = "#000000";
    graph2.balloonText = "[[category]]<br><b><span style='font-size:14px;'>[[value]] C</span></b>";
    chart2.addGraph(graph2);
    
    // CURSOR
    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorAlpha = 0;
    chartCursor.cursorPosition = "mouse";
    //chartCursor.categoryBalloonDateFormat = "YYYY";
    chart2.addChartCursor(chartCursor);
    
    // SCROLLBAR
    var chartScrollbar = new AmCharts.ChartScrollbar();
    chart2.addChartScrollbar(chartScrollbar);
    
    // WRITE
        chart2.write("chartdiv2"); 
    //etc..
               

});



AmCharts.ready(function () {
    // SERIAL CHART
    chart = new AmCharts.AmSerialChart();
    chart.dataProvider = chartData1;
    chart.categoryField = "name";
    // this single line makes the chart a bar chart, 
    // try to set it to false - your bars will turn to columns                
    chart.rotate = true;
    // the following two lines makes chart 3D
    chart.depth3D = 20;
    chart.angle = 30;

    // AXES
    // Category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.gridPosition = "start";
    categoryAxis.axisColor = "#DADADA";
    categoryAxis.fillAlpha = 1;
    categoryAxis.gridAlpha = 0;
    categoryAxis.fillColor = "#FAFAFA";

    // value
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisColor = "#DADADA";
    valueAxis.title = "Income in millions, USD";
    valueAxis.gridAlpha = 0.1;
    chart.addValueAxis(valueAxis);

    // GRAPH
    var graph = new AmCharts.AmGraph();
    //graph.showBalloon=false;
    graph.title = "Income";
    graph.valueField = "value";
    graph.type = "column";
    graph.balloonText = "Income in [[category]]:[[value]]";
    graph.lineAlpha = 0;
    graph.fillColors = "#bf1c25";
    graph.fillAlphas = 1;
    chart.addGraph(graph);
    chart.addListener("clickGraphItem", function(item) {
        console.log(item);
        chart.balloon.showBalloon(item.item.dataContext[graph.valueField]);
    });
    // WRITE
    chart.write("chartdiv1");
    $("#chartdiv1").chart=chart;
               });

var graph2;



                
                
                $(function()
                {               
                    slides = $(".swiper-wrapper");
                    $(".swiper-wrapper").swipe( swipeOptions );
                    $("#chartdiv1").swipe({
                        tap:function(event, target) {
                            console.log($(target).parent().parent())
                            console.log(target);
                           // if (event.initMouseEvent)     // all browsers except IE before version 9
                            chart.balloon.setPosition(event.changedTouches[0].pageX,event.changedTouches[0].pageY+event.layerY);

                        //$(target).parent().mouseover();
                        chart.balloon.draw();
                       
                        }
                    });
                    $("#chartdiv2").swipe({
                        tap:function(event, target) {
                            console.log($(target).parent().parent())
                            console.log(target);
                            console.log(event);

                           // if (event.initMouseEvent)     // all browsers except IE before version 9
                            //chart2.balloon.setPosition(event.changedTouches[0].pageX-200,event.changedTouches[0].pageY+event.layerY);
                                //,
                                //chart2.chartCursor.handleMouseDown=function(){return 0;}
                                $("#text").text(event.changedTouches[0]);
                                chart2.mouseX =  event.changedTouches[0].pageX+event.layerX;
                                chart2.mouseY = event.changedTouches[0].pageY+event.layerY;
                                //chart2.chartCursor.
                                //chart2.chartCursor.zooming = false;
                            

                                //$("#chartdiv2").trigger("click");
                        //$(target).parent().mouseover();
                        //chart2.balloon.show=true;
                        //chart2.balloon.draw();
                       
                        },
                        pinchStatus:function(event, phase, direction, distance , duration , fingerCount, pinchZoom) {
          $("#text").html("Pinch zoom scale "+pinchZoom+"  <br/>Distance pinched "+distance+" <br/>Direction " + direction);
          var sign = (pinchZoom > 1) ? "1" : "-1";
            try{chart2.zoomToIndexes(chart2.start+sign*parseInt(distance),chart2.end-sign*parseInt(distance));
            } catch(e) {$("#text").text(e);}
            
        },
        fingers:2,  
        pinchThreshold:0  
                    });
                });
            
                    
                /**
                * Catch each phase of the swipe.
                * move : we drag the div.
                * cancel : we animate back to where we were
                * end : we animate to the next image
                */          
                function swipeStatus(event, phase, direction, distance)
                {
                    //If we are moving before swipe, and we are going Lor R in X mode, or U or D in Y mode then drag.
                    if( phase=="move" && (direction=="left" || direction=="right") )
                    {
                        var duration=0;
                        
                        if (direction == "left")
                            scrollSlides((CHARTS_WIDTH * currentSlide) + distance, duration);
                        
                        else if (direction == "right")
                            scrollSlides((CHARTS_WIDTH * currentSlide) - distance, duration);
                        
                    }
                    
                    else if ( phase == "cancel")
                    {
                        scrollSlides(CHARTS_WIDTH * currentSlide, speed);
                    }
                    
                    else if ( phase =="end" )
                    {
                        if (direction == "right")
                            previousSlide()
                        else if (direction == "left")           
                            nextSlide()
                    }
                }
                        
                
            
                function previousSlide()
                {
                    currentSlide = Math.max(currentSlide-1, 0);
                    scrollSlides( CHARTS_WIDTH * currentSlide, speed);
                }
            
                function nextSlide()
                {
                    currentSlide = Math.min(currentSlide+1, maxSlides-1);
                    scrollSlides( CHARTS_WIDTH * currentSlide, speed);
                }
                    
                /**
                * Manuallt update the position of the imgs on drag
                */
                function scrollSlides(distance, duration)
                {
                    slides.css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");
                    
                    //inverse the number we set in the css
                    var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
                    
                    //slides.css("-webkit-transform", "translate3d("+value +"px,0px,0px)");
                    slides.css("margin-left",value+"px");
                }



                $(function() {      
      $("#chartdiv2").children().swipe( {
        pinchIn:function(event, direction, distance, duration, fingerCount, pinchZoom)
        {
          $("#text").text("You pinched " +direction + " by " + distance +"px, zoom scale is "+pinchZoom);

        },
        pinchOut:function(event, direction, distance, duration, fingerCount, pinchZoom)
        {
          $("#text").text("You pinched " +direction + " by " + distance +"px, zoom scale is "+pinchZoom);
        },
        pinchStatus:function(event, phase, direction, distance , duration , fingerCount, pinchZoom) {
          $("#text").html("Pinch zoom scale "+pinchZoom+"  <br/>Distance pinched "+distance+" <br/>Direction " + direction);
          var sign = (pinchZoom > 1) ? "1" : "-1";
            try{chart2.zoomToIndexes(chart2.start+sign*parseInt(distance),chart2.end-sign*parseInt(distance));
            } catch(e) {$("#text").text(e);}
            
        },
        fingers:2,  
        pinchThreshold:0  
      });
    });
