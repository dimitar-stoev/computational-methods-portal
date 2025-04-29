export interface EquationNavigation {
    title: string;
    href: string;
}

export interface Equation {
    equation: string;
    lowerBound: number;
    upperBound: number;
    epsilon: number;
}

export type EquationRequest = {
    [k in | "equation"
        | "lowerBound"
        | "upperBound"
        | "epsilon"]: Equation[k];
}

export interface BisectionEquation extends Equation {
}

export interface ChordEquation extends Equation {
}

export type BisectionEquationRequest = {
    [k in | "equation"
        | "lowerBound"
        | "upperBound"
        | "epsilon"]: BisectionEquation[k];
};

export interface EquationResponse {
    result: string;
    table: Iterations[];
}

export interface BisectionEquationResponse extends EquationResponse {
}

export type ChordEquationRequest = {
    [k in | "equation"
        | "lowerBound"
        | "upperBound"
        | "epsilon"]: ChordEquation[k];
};

export interface ChordEquationResponse extends EquationResponse {
}

export interface Iterations {
    [key: string]: string;
}

export interface IterationsBisection {
    left: string;
    right: string;
    p: string;
    fp: string;
}