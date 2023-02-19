"use strict"

/* Configuration variables: drawing */
let svgWidth = 600;
let svgHeight = 600;
let margin = 25;

/* Resize div to match width of visualization. */
d3.select("#container")
    .style("width", String(svgWidth) + "px");

/* Create drawing canvas */
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw canvas border */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw margin border. */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", svgWidth - margin * 2)
    .attr("height", svgHeight - margin * 2);

let dataset = [
    /*** 
     x= daily observation of happiness levels on a scale of 0-5 with 0 being sad and 5 being happy
     y= minutes spent on Youtube/day
     ***/
    /*** 11/02/23 ***/
    { x: 3, y: 10 },
    /*** 12/02/23 ***/
    { x: 4.5, y: 237 },
    /*** 13/02/23 ***/
    { x: 3, y: 90 },
    /*** 14/02/23 ***/
    { x: 3, y: 214 },
    /*** 15/02/23 ***/
    { x: 3, y: 102 },
    /*** 16/02/23 ***/
    { x: 4, y: 165 },
    /*** 17/02/23 ***/
    { x: 2, y: 100 }
];

let happinessRange = d3.scaleLinear()
    .domain([0, 5])
    .range([margin, svgWidth - margin]);

let minutesOnYoutube = d3.scaleLinear()
    .domain([0, 500])
    .range([svgHeight - margin, margin]);

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("r", 5)
    .attr("cx", function (value) {
        return happinessRange(value.x);
    })
    .attr("cy", function (value) {
        return minutesOnYoutube(value.y);
    })
    .attr("fill", function (value)
    /****  the function takes into consideration the value of the x axis to depict what color the circle would be
    grey = less than 3
    orange = 3
    green = more than 3
    (0-sad & black circles  3- average & orange circles 5-very happy & green circles)
    this provides an easier way to visually discern how my my mood and my increase or decrease in youtube consumption are correlated****/ {
        if (value.x < 3) {
            return "black";
        } else if (value.x > 3) {
            return "green";
        } else { return "orange"; }
    });

/**** label the axes ****/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - (margin / 4))
    .attr("text-anchor", "middle")
    .text("Happiness level scale: 0 being 😔 - 5 being 😃");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", margin / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("Time spent on Youtube in minutes")
    .attr("transform", "rotate(-90)");

/**** label key graph coordinates ****/
let originLabel = svg.append("text")
    .attr("x", margin)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("0");

/* labels the max value of coordinates on the X axis */
let xAxisMaxValue = svg.append("text")
    .attr("x", svgWidth - margin)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "end")
    .text("5");

/* labels the max value of coordinates on the Y axis */

let yAxisMaxValue = svg.append("text")
    .attr("x", -margin)
    .attr("y", margin / 2)
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .text("500")
    .attr("transform", "rotate(-90)");


