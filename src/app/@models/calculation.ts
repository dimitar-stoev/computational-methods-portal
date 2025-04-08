import { Observable } from "rxjs";

export abstract class ICalculation<RequestType, ResponseType> {
  abstract calculate(data: RequestType): Observable<ResponseType>;
}
