import { Injectable } from "@angular/core";
import {
  BisectionEquationRequest,
  BisectionEquationResponse,
} from "../@models/equations";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ICalculation } from "../@models/calculation";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CalculationService extends ICalculation<
  BisectionEquationRequest,
  BisectionEquationResponse
> {
  constructor(private http: HttpClient) {
    super();
  }

  calculate(
    data: BisectionEquationRequest,
  ): Observable<BisectionEquationResponse> {
    return this.http.post<BisectionEquationResponse>(
      `${environment.apiUrl}/numerical/bisection`,
      {
        equation: data.equation,
        lowerBound: data.lowerBound,
        upperBound: data.upperBound,
        epsilon: data.epsilon,
      },
    );
  }
}
