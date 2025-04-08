import { Routes } from "@angular/router";
import { SolversComponent } from "./@components/solvers/solvers.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "calculate",
    pathMatch: "full",
  },
  {
    path: "calculate",
    component: SolversComponent,
  },
  {
    path: "calculate/bisection",
    loadComponent: () =>
      import("./@components/solvers/bisection/bisection.component").then(
        (m) => m.BisectionComponent,
      ),
  },
];
