import { Injectable } from "@angular/core";
import { evaluate } from "mathjs";

declare const Plotly: any;

@Injectable({
  providedIn: "root",
})
export class GraphService {
  constructor() {}

  prepareGraphData(
    iterations: any[],
    lowerBound: number,
    upperBound: number,
    equation: string,
  ) {
    const x = iterations.map((item) => item.p);
    const y = iterations.map((item) => item.fp);

    const step = (upperBound - lowerBound) / 100;
    const xValues: number[] = [];
    const yValues: number[] = [];

    for (let i = lowerBound; i <= upperBound; i += step) {
      xValues.push(i);
      yValues.push(evaluate(equation, { x: i }));
    }

    const functionTrace = {
      x: xValues,
      y: yValues,
      type: "scatter",
      mode: "lines",
      name: `f(x) = ${equation}`,
      line: { color: "blue" },
    };

    const iterationPoints = {
      x: x,
      y: y,
      mode: "lines+markers",
      type: "scatter",
      name: "Function",
      marker: { color: "red", size: 8 },
      line: { color: "red", width: 2 },
    };

    return [functionTrace, iterationPoints];
  }

  plotGraph(data: any[], layout: any, divId: string) {
    Plotly.newPlot(divId, data, layout);
  }
}
