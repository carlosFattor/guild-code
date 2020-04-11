export interface UaaResultSet {
  expires_in: number;
  jti: string;
  scope: 'webclient';
  token_type: 'bearer';
  access_token: string;
  refresh_token: string;

  codigoFuncionario?: number;
  nome?: string;
}
