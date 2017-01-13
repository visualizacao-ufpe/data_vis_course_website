//Width and height
var margin = {top: 10, right: 20, bottom: 10, left: 20};
var width = 900 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

//
var generator = d3.randomUniform(0, 1);

//			
var dataset = [
    [5, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88],
    [600, 150]
];

function updateDataset(){
    // //
    // var coeff = generator();
    // if(coeff < 0.1){
    // 	//
    // 	var removedPoint = dataset.pop();
    // 	console.log('removed',removedPoint);
    // }
    // else{
    // 	var newPoint = [600 * generator(), 150 * generator()];
    // 	console.log('newPoint',newPoint);
    // 	dataset.push(newPoint);
    // }

    var newDataset = [];
    
    var numPoints = dataset.length;
    for(var i = 0 ; i < numPoints ; ++i){
	var x = 600 * generator();
	var y = 200 * generator();
	newDataset.push([x,y]);
    }

    dataset = newDataset;
}

function renderDataset(){
    //
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[0]; })])
        .range([0, width]);
    //
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	.range([height,0]);

    //
    var rScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	.range([5,8]);

    //
    var cScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	.range(["gray","red"]);
    
    
    //
    var xAxis = d3.axisBottom(xScale).ticks(6);		  
    var xAxisGroup = d3.select("#xAxis")
	.transition()
	.call(xAxis);

    //
    var yAxis = d3.axisLeft(yScale).ticks(6);		  
    var yAxisGroup = d3.select("#yAxis").transition().call(yAxis);		    		  	

    //
    var circleSelection = svg.selectAll("circle")
	.data(dataset);

    //Remove circles that are not needed
    circleSelection
	.exit()
	.attr("fill","rgba(255, 255, 255, 0)")
	.remove();
    
    //Create circles
    circleSelection
	.enter()
	.append("circle")
	.attr("cx", function(d) {
	    return xScale(d[0]);
	})
	.attr("cy", function(d) {
	    return yScale(d[1]);
	})
	.attr("r", function(d) {
	    return rScale(d[1]);
	})
	.attr("fill", function(d){
	    return cScale(d[1]);
	});

    //
    circleSelection
        .transition()
	// .delay(function(d,i){return 100*i;})
	// .duration(1000)
	.attr("cx", function(d) {
	    return xScale(d[0]);
	})
	.attr("cy", function(d) {
	    return yScale(d[1]);
	})
	.attr("r", function(d) {
	    return rScale(d[1]);
	})
	.attr("fill", function(d){
	    return cScale(d[1]);
	});
    
}


function init(){
    //create clickable paragraph
    d3.select("body")
	.append("p")
	.text("Click on me!")
	.on("click", function() {
	    updateDataset();
	    renderDataset();
	});
    
    //Create SVG element
    var svg = d3.select("body")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //
    svg.append("g").attr("id","xAxis").attr("transform","translate(0," + (height - margin.bottom) + ")");
    svg.append("g").attr("id","yAxis").attr("transform","translate(" + (margin.left) + ",0)");
    
    return svg;
}		  		  		  

//
var svg = init();
