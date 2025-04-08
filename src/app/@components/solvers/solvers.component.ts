import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { EquationNavigation } from "../../@models/equations";

@Component({
  selector: "app-solvers",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./solvers.component.html",
  styleUrl: "./solvers.component.scss",
})
export class SolversComponent {
  solversEquations: EquationNavigation[] = [
    {
      title: "Bisection",
      href: "/bisection",
    },
    {
      title: "Chord",
      href: "/chord",
    },
    {
      title: "Secant",
      href: "/secant",
    },
  ];
}
