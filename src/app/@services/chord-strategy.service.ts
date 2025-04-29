import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChordEquationRequest, ChordEquationResponse} from "../@models/equations";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ChordStrategyService {
    constructor(private http: HttpClient) {
    }

    calculate(
        data: ChordEquationRequest,
    ): Observable<ChordEquationResponse> {
        return this.http.post<ChordEquationResponse>(
            `${environment.apiUrl}/numerical/chord`,
            {
                equation: data.equation,
                lowerBound: data.lowerBound,
                upperBound: data.upperBound,
                epsilon: data.epsilon,
            },
        );
    }
}
