import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BisectionEquationRequest, BisectionEquationResponse} from "../@models/equations";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BisectionStrategyService {
    constructor(private http: HttpClient) {
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
