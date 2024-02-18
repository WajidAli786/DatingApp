import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { PaginatedResult } from '../models/pagination.model';

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
  let httpParams = new HttpParams();

  httpParams = httpParams.append('pageNumber', pageNumber);
  httpParams = httpParams.append('pageSize', pageSize);

  return httpParams;
}

export function getPaginatedResult<T>(
  url: string,
  http: HttpClient,
  httpParams: HttpParams
) {
  const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

  return http
    .get<T>(url, {
      observe: 'response',
      params: httpParams,
    })
    .pipe(
      map((response) => {
        if (response.body) {
          paginatedResult.result = response.body;
        }

        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }

        return paginatedResult;
      })
    );
}
