import {Component} from '@angular/core';
import {AsyncPipe, NgClass} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BehaviorSubject, catchError, Subject} from "rxjs";
import {ChordEquationRequest, ChordEquationResponse} from "../../../@models/equations";
import {GraphService} from "../../../@services/graph.service";
import {ChordStrategyService} from "../../../@services/chord-strategy.service";
import {SolverService} from "../../../@services/strategies.service";

@Component({
    selector: 'app-chord',
    standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        ReactiveFormsModule,
        NgClass
    ],
    templateUrl: './chord.component.html',
    styleUrl: './chord.component.scss'
})
export class ChordComponent {
    chordForm = this.formBuilder.group({
        equation: ["", Validators.required],
        lowerBound: [0],
        upperBound: [1],
        epsilon: [0.0001, Validators.required],
    });

    labelSelected = new BehaviorSubject<boolean>(true);
    response = new Subject<ChordEquationResponse>();

    constructor(
        private formBuilder: FormBuilder,
        private chordStrategy: ChordStrategyService,
        private solverService: SolverService,
        private graphService: GraphService,
    ) {
        this.solverService.setStrategy(this.chordStrategy);
    }

    handleLabels(isLabel: boolean) {
        this.labelSelected.next(isLabel);
    }

    handleSave() {
        const data = this.chordForm.value as ChordEquationRequest;
        if (!this.validateData(data)) {
            return;
        }

        this.solverService
            .calculate(this.chordForm.value as ChordEquationRequest)
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
                            this.chordForm.value.lowerBound || 0,
                            this.chordForm.value.upperBound || 1,
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
                    this.chordForm.value.lowerBound || 0,
                    this.chordForm.value.upperBound || 1,
                    this.chordForm.value.equation || "",
                );

                this.graphService.plotGraph(data, layout, "bisectionGraph");
                this.response.next(response);
            });
    }

    validateData(data: ChordEquationRequest): boolean {
        if (this.chordForm.invalid || this.chordForm.value.epsilon === 0) {
            this.chordForm.markAllAsTouched();
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
