import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateDebtModel } from 'src/app/shared/models/createDebt.model';
import { DebtModel } from 'src/app/shared/models/debt.model';
import { UpdateDebtModel } from 'src/app/shared/models/updateDebt.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DebtService {
  constructor(private http: HttpClient) {}

  createDebt(debt: CreateDebtModel): Observable<DebtModel> {
    return this.http.post<DebtModel>(`${environment.apiUrl}/debts`, debt);
  }

  // Pegar Os detalhes de uma dívida
  getDebtDetails(idDebt: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/debts/${idDebt}/detail`);
  }

  updateDebt(idDebt: number, debt: UpdateDebtModel): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/debts/${idDebt}`, debt);
  }

  removeDebt(idDebt: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/debts/${idDebt}`);
  }
}

// 1. Adicionar nova dívida, informando qual cliente está relacionada a ela;
// 2. Listar todas as dívidas associadas a um determinado cliente;
// 3. Obter detalhes de uma dívida;
// 4. Editar uma dívida;
// 5. Deletar uma dívida
