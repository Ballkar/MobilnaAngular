import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationEvent } from '../model/paginationEvent.model';
import { Pagination } from '../model/response.model';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  mapApiPaginationToMaterialEvent(pagination: Pagination): PaginationEvent {
    return {
      length: pagination.total,
      pageIndex: pagination.current_page - 1,
      pageSize: pagination.per_page,
      previousPageIndex: null,
    };
  }

  returnParamsWithPaginationAdded(pagination: PaginationEvent, params: HttpParams): HttpParams {
    return params
      .set('limit', pagination ? pagination.pageSize.toString() : '5')
      .set('page', pagination ? (pagination.pageIndex + 1).toString() : '1');
  }
}
