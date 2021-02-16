import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DebtService {
  constructor(private http: HttpClient) {}

  createDebt(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/debts`, {});
  }

  // Pegar Os detalhes de uma dívida
  getDebtDetails(idDebt: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/debts/${idDebt}/detail`);
  }

  updateDebt(idDebt: number): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/debts/${idDebt}`, {});
  }

  removeDebt(idDebt: number): Observable<any> {
    return this.http.delete(``);
  }
}

// 1. Adicionar nova dívida, informando qual cliente está relacionada a ela;
// 2. Listar todas as dívidas associadas a um determinado cliente;
// 3. Obter detalhes de uma dívida;
// 4. Editar uma dívida;
// 5. Deletar uma dívida
