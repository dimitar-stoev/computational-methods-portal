import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Equation, EquationRequest, EquationResponse} from "../@models/equations";

export interface SolverStrategy {
    calculate(data: EquationRequest): Observable<EquationResponse>;
}

@Injectable({
    providedIn: 'root',
})
export class SolverService {
    private strategy: SolverStrategy | null = null;

    setStrategy(strategy: SolverStrategy) {
        this.strategy = strategy;
    }

    calculate(data: Equation): Observable<EquationResponse> {
        if (!this.strategy) {
            throw new Error('Solver strategy not set');
        }

        return this.strategy.calculate(data);
    }
}