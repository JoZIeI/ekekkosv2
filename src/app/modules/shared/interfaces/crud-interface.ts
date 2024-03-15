import { Observable } from "rxjs";
import { GenericFilterRequest } from "src/app/Models/generic-filter-request.model";
import { GenericFilterResponse } from "src/app/Models/generec-filter-response.model";

export interface CrudInterface<T, Y> {

    getAll(): Observable<Y[]>;
    create(request: T): Observable<Y>;
    update(request: T): Observable<Y>;
    delete(id: number): Observable<number>;
    //getByFilter(request: GenericFilterRequest): Observable<GenericFilterResponse<T>>;
    //createMultiple(request: T[]): Observable<T[]>;
    //updateMultiple(request: T[]): Observable<T[]>;

}
