import React from 'react';

import * as d3 from 'd3';

import math from '../utils/math';

class Covariance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPoint: null,
    };

    this.renderD3 = this.renderD3.bind(this)
  }

  componentDidMount() {
    this.renderD3();
  }

  componentDidUpdate() {
    this.renderD3();
  }

  renderD3() {
    const points = this.props.data;
    if (points.length === 0) return;

    const { selectedPoint } = this.state;

    // Compute data
    const xVals = points.map(point => point[0]);
    const yVals = points.map(point => point[1]);

    const xMean = math.mean(xVals);
    const yMean = math.mean(yVals);

    // Constants
    const svgWidth = 500;
    const svgHeight = 500;

    const plotMargin = 50;
    const plotWidth = svgWidth - 2*plotMargin;
    const plotHeight = svgHeight - 2*plotMargin;

    const plotDomain = [0, 10];
    const plotRange = [0, 10];

    // Get ready
    const container = this.container;

    // Clear plot
    d3.select(container).selectAll('svg').remove();

    // Add g
    const svg = d3.select(container)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .style('border', 'solid 1px black')
      .append('g')
        .attr('transform', `translate(${plotMargin}, ${plotMargin})`);

    // Add x-axis
    const x = d3.scaleLinear()
      .domain(plotDomain)
      .range([ 0, plotWidth ]);

    svg
      .append('g')
        .attr('transform', `translate(0, ${plotHeight})`)
        .call(d3.axisBottom(x));

    // Add y-axis
    const y = d3.scaleLinear()
      .domain(plotRange)
      .range([ plotHeight, 0 ]);

    svg
      .append('g')
        .attr('transform', `translate(0, 0)`)
        .call(d3.axisLeft(y));

    // Plot means
    //   x-bar
    const meanStroke = 'black';
    const meanStrokeWidth = 1;
    const meanStrokeDashArray = '5';

    svg.append('line')
        .style('stroke', meanStroke)
        .style('stroke-width', meanStrokeWidth)
        .style('stroke-dasharray', meanStrokeDashArray)
        .attr('x1', x(xMean))
        .attr('y1', y(0))
        .attr('x2', x(xMean))
        .attr('y2', y(plotRange[1])); 

    svg.append('text')
      .text('x')
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '16px')
      .attr('text-decoration', 'overline')
      .attr('x', x(xMean))
      .attr('y', y(plotRange[1]));

    //   y-bar
    svg.append('line')
        .style('stroke', meanStroke)
        .style('stroke-width', meanStrokeWidth)
        .style('stroke-dasharray', meanStrokeDashArray)
        .attr('x1', x(0))
        .attr('y1', y(yMean))
        .attr('x2', x(plotDomain[1]))
        .attr('y2', y(yMean)); 

    svg.append('text')
      .text('y')
      .attr('alignment-baseline', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '16px')
      .attr('text-decoration', 'overline')
      .attr('x', x(plotRange[1]))
      .attr('y', y(yMean));

    // Draw covariance box
    for (let i = 0; i < points.length; i += 1) {
      const point = points[i];
      const xPoint = point[0];
      const yPoint = point[1];

      const covarianceRect = svg.append('rect');

      if (point === selectedPoint) {
      } else {
        covarianceRect
          .style('opacity', .3);
      }

      const xDiff = xPoint - xMean;
      const yDiff = yPoint - yMean;

      const isPositive = xDiff * yDiff > 0 ? true : false;
      if (isPositive) {
        covarianceRect
          .style('fill', 'green');
      } else {
        covarianceRect
          .style('fill', 'red');
      }

      if (xDiff > 0 && yDiff > 0) {
        covarianceRect
            .attr('x', x(xMean))
            .attr('y', y(yPoint))
            .attr('width', x(xDiff))
            .attr('height', y(plotRange[1] - yDiff)); 
      } else if(xDiff > 0 && yDiff < 0) {
        covarianceRect
            .attr('x', x(xMean))
            .attr('y', y(yMean))
            .attr('width', x(xDiff))
            .attr('height', y(plotRange[1] + yDiff)); 
      } else if(xDiff < 0 && yDiff > 0) {
        covarianceRect
            .attr('x', x(xPoint))
            .attr('y', y(yPoint))
            .attr('width', x(-xDiff))
            .attr('height', y(plotRange[1] - yDiff)); 
      } else if(xDiff < 0 && yDiff < 0) {
        covarianceRect
            .attr('x', x(xPoint))
            .attr('y', y(yMean))
            .attr('width', x(-xDiff))
            .attr('height', y(plotRange[1] + yDiff)); 
      }
    }

    function onMouseOver(e, point) {
      this.setState((prevState) => ({
        selectedPoint: point,
      }));
    }

    // Plot points
    svg
      .append('g')
        .selectAll('circle')
        .data(points)
        .enter()
          .append('circle')
          .style('fill', point => {
            if (point === selectedPoint) {
              return 'blue';
            } else {
              return 'black';
            }
          })
          .attr('r', point => {
            if (point === selectedPoint) {
              return 8;
            } else {
              return 4;
            }
          })
          .attr('cx', point => x(point[0]))
          .attr('cy', point => y(point[1]))
          .on('mouseover', onMouseOver.bind(this));
  }

  render() {
    return <div
      ref={ ref => this.container = ref }
    />;
  }
}

export default Covariance;
