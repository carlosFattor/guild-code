import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environment';
import { UaaResultSet } from '../security/uaa-result-set.interface';

@Injectable()
export class UaaApi {

  constructor(
    private httpClient: HttpClient
  ) { }

  autenticate(
    usuario: {
      empresa: string;
      matricula: string;
      senha: string;
    },
    filial: {
      codigo: number;
      empresa: number;
    }
  ): Observable<UaaResultSet> {
    const params = new HttpParams()
      .set('empresaFuncionario', usuario.empresa)
      .set('empresaFilial', String(filial.empresa))
      .set('filial', String(filial.codigo))
      .set('username', String(usuario.matricula))
      .set('password', usuario.senha)
      .set('scope', 'webclient')
      .set('canalVenda', 'ViaMais')
      .set('grant_type', 'password');

    return this.uaaRequest(params);
  }

  refreshToken(uaaResultSet: UaaResultSet): Observable<UaaResultSet> {
    const params = new HttpParams()
      .set('refresh_token', uaaResultSet.refresh_token)
      .set('scope', 'webclient')
      .set('grant_type', 'refresh_token');
    return this.uaaRequest(params);
  }

  private uaaRequest(params: HttpParams): Observable<UaaResultSet> {
    const path = `${environment.server}uaa/oauth/token`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic`
    });

    return this.httpClient.post<UaaResultSet>(path, params, {
      headers
    });
  }
}
