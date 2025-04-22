import { Component } from "@angular/core";
import { BehaviorSubject, catchError, Subject } from "rxjs";
import { AsyncPipe, NgClass } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import {
  BisectionEquationRequest,
  BisectionEquationResponse,
} from "../../../@models/equations";
import { CalculationService } from "../../../@services/calculation.service";
import { GraphService } from "../../../@services/graph.service";

@Component({
  selector: "app-bisection",
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, AsyncPipe],
  templateUrl: "./bisection.component.html",
  styleUrl: "./bisection.component.scss",
})
export class BisectionComponent {
  bisectionForm = this.formBuilder.group({
    equation: ["", Validators.required],
    lowerBound: [0],
    upperBound: [1],
    epsilon: [0.0001, Validators.required],
  });

  labelSelected = new BehaviorSubject<boolean>(true);
  response = new Subject<BisectionEquationResponse>();

  constructor(
    private formBuilder: FormBuilder,
    private calculationService: CalculationService,
    private graphService: GraphService,
  ) {}

  handleLabels(isLabel: boolean) {
    this.labelSelected.next(isLabel);
  }

  handleSave() {
    const data = this.bisectionForm.value as BisectionEquationRequest;
    if (!this.validateData(data)) {
      return;
    }

    this.calculationService
      .calculate(this.bisectionForm.value as BisectionEquationRequest)
      .pipe(
        catchError((err) => {
          this.response.next({
            result: err.error.message,
            table: [],
          });
          return [];
        }),
      )
      .subscribe((response) => {
        const layout = {
          title: "Bisection Method",
          xaxis: {
            title: "X",
            range: [
              this.bisectionForm.value.lowerBound || 0,
              this.bisectionForm.value.upperBound || 1,
            ],
          },
          yaxis: {
            title: "f(x)",
            zeroline: true,
          },
          showlegend: true,
        };

        const data = this.graphService.prepareGraphData(
          response.table,
          this.bisectionForm.value.lowerBound || 0,
          this.bisectionForm.value.upperBound || 1,
          this.bisectionForm.value.equation || "",
        );

        this.graphService.plotGraph(data, layout, "bisectionGraph");
        this.response.next(response);
      });
  }

  validateData(data: BisectionEquationRequest): boolean {
    if (this.bisectionForm.invalid || this.bisectionForm.value.epsilon === 0) {
      this.bisectionForm.markAllAsTouched();
      alert("Please fill in all fields correctly.");
      return false;
    }

    if (
      (data.epsilon && data.epsilon.toString().length > 8) ||
      (data.lowerBound && data.lowerBound.toString().length > 8) ||
      (data.upperBound && data.upperBound.toString().length > 8)
    ) {
      alert("Tolerance must be less than 8 characters.");
      return false;
    }

    return true;
  }
}
