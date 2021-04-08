import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { AppService } from '../../app.service';
import { cloneDeep, get, set } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  isElectron: boolean;

  constructor(private http: HttpClient, private appService: AppService, private electronService: ElectronService) {
    this.isElectron = this.electronService.isElectronApp;
  }

  getOrders(skip, take) {
    if (this.isElectron) {
      return this.appService.electronEmit('allOrders', { skip, take });
    }
    return this.http.get(`${URL}/orders`, { params: { skip, take } }) as Observable<Array<unknown>>;
  }

  saveOrders(data) {
    if (this.isElectron) {
      return this.appService.electronEmit('saveOrders', data);
    }
    return this.http.post(URL + '/orders', data) as Observable<Array<unknown>>;
  }

  updateOrders(data) {
    if (this.isElectron) {
      return this.appService.electronEmit('updateOrders', data);
    }
    return this.http.post(URL + '/orders/update', data) as Observable<Array<unknown>>;
  }

  getAllUsers() {
    if (this.isElectron) {
      return this.appService.electronEmit('allUsers');
    }
    return this.http.get(URL + '/users') as Observable<Array<unknown>>;
  }

  getUserSavings(id) {
    if (this.isElectron) {
      return this.appService.electronEmit('getUserSavings', { id: id });
    }
    return this.http.get(URL + `/getUserSavingsDetails/${id}`) as Observable<Array<unknown>>;
  }

  delete(data) {
    if (this.isElectron) {
      return this.appService.electronEmit('removeOrders', { id: data.id });
    }
    return this.http.delete(URL + `/orders/${data.id}`) as Observable<Array<unknown>>;
  }

  getAllProducts() {
    if (this.isElectron) {
      return this.appService.electronEmit('allProducts');
    }
    return this.http.get(URL + '/products') as Observable<Array<unknown>>;
  }

  getAllUserOrders(userId: string, start_date: Date, end_date: Date, allOrders?: boolean) {
    if (this.isElectron) {
      return this.appService.electronEmit('allOrders', {
        id: userId
      });
    }
    return this.http.get(
      `${URL}/orders/${userId}`
    ) as Observable<Array<unknown>>;
  }

  getUserRepaymentDetails(userId: string, start_date?: Date, end_date?: Date, allOrders?: boolean) {
    if (this.isElectron) {
      return this.appService.electronEmit('getUserRepaymentDetails', { id: userId });
    }
    return this.http.get(`${URL}/getUserRepaymentDetails/${userId}`) as Observable<Array<unknown>>;
  }

  getRemainingStock(productId: string) {
    if (this.isElectron) {
      return this.appService.electronEmit('getRemainingStock', { productId });
    }
    return this.http.get(`${URL}/products/remainingStock/${productId}`) as Observable<Array<unknown>>;
  }

  saveRepayment(repayment) {
    if (this.isElectron) {
      return this.appService.electronEmit('saveRepayment', repayment);
    }
    return this.http.post(URL + '/repayments', repayment);
  }

  getDetails(combinedOrders: any) {
    const length = combinedOrders.length;
    if (!length) {
      return [];
    }

    for (let i = 0; i < combinedOrders.length; i++) {
      const current = combinedOrders[i];
      const details = this.getOrderDetails(current, undefined, current.paid_on || current.ordered_on);
      this.setDetails(current, details.originalPrincipal, details.interestAccuredToToday, details.originalPrincipal);
      let sum = 0;
      let diff = 0;
      for (let j = 0; j < i; j++) {
        const innerDetails = this.getOrderDetails(combinedOrders[j], undefined, details.endDate);
        const newdetails = this.getOrderDetails(current, undefined, current.paid_on || current.ordered_on);
        if (innerDetails.isRepayment !== details.isRepayment && innerDetails.amount > 0 && details.amount > 0) {
          const total_order_value = Number((innerDetails.interestAccured + innerDetails.amount).toFixed(2));
          diff = Number(newdetails.amount) - sum;
          let breakups;
          if (diff >= 0 && total_order_value > 0) {
            if (innerDetails.interestType === 'compound') {
              breakups = this.PrincipalAndInterestComponentBreakupCompoundInterest(
                Math.abs(diff) <= total_order_value ?
                  Math.abs(diff) :
                  total_order_value,
                innerDetails.monthlyInterest,
                365,
                innerDetails.startDate,
                innerDetails.endDate,
              );
            } else {
              breakups = this.PrincipalAndInterestComponentBreakupSimpleInterest(
                Math.abs(diff) <= total_order_value ?
                  Math.abs(diff) :
                  total_order_value,
                innerDetails.monthlyInterest,
                innerDetails.startDate,
                innerDetails.endDate,
              );
            }

            const remainingPrincipal = Number((innerDetails.amount - breakups["principalComponent"]).toFixed(2));
            const remainingOuterPrincipal = Number((newdetails.amount - breakups["principalComponent"] - breakups["interestComponent"]).toFixed(2))
            set(combinedOrders[j], 'remaining_principal', remainingPrincipal);
            set(current, 'remaining_principal', remainingOuterPrincipal);

            this.setDetails(
              combinedOrders[j],
              innerDetails.originalPrincipal,
              this.getOrderDetails(combinedOrders[j]).interestAccuredToToday,
              remainingPrincipal,
              breakups["principalComponent"],
              breakups["interestComponent"],
              remainingPrincipal === 0 ? "FULLY_PAID" : "PARTIALLY_PAID",
              {
                obj: cloneDeep(current),
                principalComponent: breakups["principalComponent"],
                interestComponent: breakups["interestComponent"]
              }
            );

            this.setDetails(
              current,
              newdetails.originalPrincipal,
              this.getOrderDetails(current).interestAccuredToToday,
              remainingOuterPrincipal,
              breakups["principalComponent"] + breakups["interestComponent"],
              0,
              remainingOuterPrincipal === 0 ? "FULLY_PAID" : "PARTIALLY_PAID"
            );
          }
          sum = sum + Number(total_order_value);
        }
      }
    }
    return combinedOrders;
  }

  setDetails(
    order,
    originalPrincipal,
    interestAccuredToToday,
    remainingPrincipal,
    paidPrincipal?,
    paidInterest?,
    paymentStatus?,
    other?
  ) {
    set(order, 'original_principal', originalPrincipal);
    set(order, 'remaining_principal', remainingPrincipal);
    set(order, 'remaining_interest', interestAccuredToToday);
    set(order, 'paid_interest', [...get(order, "paid_interest", []) || [], paidInterest || 0]);
    set(order, 'paid_principal', [...get(order, "paid_principal", []) || [], paidPrincipal || 0]);
    set(order, 'payment_status', paymentStatus || "NOT_PAID");
  }

  getOrderDetails(current = {}, startDate?, endDate?) {
    const monthlyInterest = Number(get(current, "monthly_interest", 0) || get(current, "product.rate_of_interest", 0));
    const interestType = get(current, "interest_type.name", 0) || get(current, "product.interest_type.name", '');
    const originalPrincipal = get(current, "price", 0) || (get(current, "product.unit_price", 0) * get(current, "quantity", 0));
    const amount = Object.prototype.hasOwnProperty.call(current, "remaining_principal") ? Number(get(current, "remaining_principal", 0)) : Number(originalPrincipal);
    const isRepayment = get(current, "type", '') === "repayment";
    const sd = startDate || get(current, "paid_on", null) || get(current, "ordered_on", null);
    const ed = endDate || new Date().toISOString();
    const interestAccured = interestType === "simple" ?
      this.calculateSimpleInterest(amount, monthlyInterest, sd, ed)
      : this.calculateCompoundInterest(amount, monthlyInterest, 365, sd, ed);
    const interestAccuredToToday = interestType === "simple" ?
      this.calculateSimpleInterest(amount, monthlyInterest, sd)
      : this.calculateCompoundInterest(amount, monthlyInterest, 365, sd);
    return { interestAccured, monthlyInterest, interestType, amount, isRepayment, startDate: sd, endDate: ed, originalPrincipal, interestAccuredToToday }
  }

  getTotals(combinedOrders) {
    if (!combinedOrders.length) {
      return { ordersTotal: 0, ordersTotalInterest: 0, repaymentsTotal: 0, repaymentsTotalInterest: 0, remainingAmount: 0 }
    }
    const ordersTotal = combinedOrders.reduce((sum, next) => {
      if (next.type !== 'repayment') {
        return sum + Number(get(next, "original_principal", 0))
      }
      return sum;
    }, 0);
    const repaymentsTotal = combinedOrders.reduce((sum, next) => sum + Number(get(next, "price", 0)), 0)
    const ordersTotalInterest = combinedOrders.reduce((sum, next) => {
      if (next.type !== 'repayment') {
        return sum
          + Number(get(next, "remaining_interest", 0))
          + Number((get(next, "paid_interest", []) || []).reduce((sum, interest) => sum + interest, 0));
      } else { return sum }
    }, 0);
    const repaymentsTotalInterest = combinedOrders.reduce((sum, next) => {
      if (next.type === 'repayment') {
        return sum
          + Number(get(next, "remaining_interest", 0))
          + Number((get(next, "paid_interest", []) || []).reduce((sum, interest) => sum + interest, 0));
      } return sum;
    }, 0);
    const remainingAmount = Number(ordersTotal) + Number(ordersTotalInterest) - Number(repaymentsTotal) - Number(repaymentsTotalInterest);
    return { ordersTotal, ordersTotalInterest, repaymentsTotal, repaymentsTotalInterest, remainingAmount }
  }

  PrincipalAndInterestComponentBreakupSimpleInterest(
    principalAmount = 0,
    monthlyInterest = 2,
    startDate: string = new Date().toISOString(),
    endDate: string = new Date().toISOString()
  ): { principalComponent: number, interestComponent: number } {

    const oneDay = 24 * 60 * 60 * 1000,
      sd = new Date(startDate).setHours(23, 59, 59, 999),
      ed = new Date(endDate).setHours(23, 59, 59, 999),
      days_since_purchase = Math.round(Math.abs((sd - ed) / oneDay)),
      principalComponent = Number((principalAmount / (1 + (days_since_purchase * 12 * monthlyInterest) / 36500)).toFixed(2)),
      interestComponent = Number((principalAmount - principalComponent).toFixed(2));

    return { principalComponent, interestComponent };
  }

  PrincipalAndInterestComponentBreakupCompoundInterest(
    principalAmount = 0,
    monthlyInterest = 2,
    compoundingPeriodInDays = 365,
    startDate: string = new Date().toISOString(),
    endDate: string = new Date().toISOString()
  ): { principalComponent: number, interestComponent: number } {
    const oneDay = 24 * 60 * 60 * 1000,
      ed = new Date(endDate).setHours(23, 59, 59, 999),
      sd = new Date(startDate).setHours(23, 59, 59, 999),
      daysSincePurchase = Math.round(Math.abs((sd - ed) / oneDay)),
      timesToCompound = Math.floor(daysSincePurchase / compoundingPeriodInDays),
      compoundingMonthsPerYear = Math.floor(365 / compoundingPeriodInDays),
      extraDays = daysSincePurchase - (timesToCompound * compoundingPeriodInDays),
      principalComponent = Number((
        principalAmount /
        (Math.pow(1 + (monthlyInterest * 12) / (compoundingMonthsPerYear * 100), timesToCompound) *
          (1 + (extraDays * monthlyInterest * 12) / 36500))
      ).toFixed(2)),
      interestComponent = Number((principalAmount - principalComponent).toFixed(2));

    return { principalComponent, interestComponent };
  }

  calculateSimpleInterest(
    principalAmount = 0,
    monthlyInterest = 2,
    startDate: string = new Date().toISOString(),
    endDate: string = new Date().toISOString()
  ): number {
    const oneDay = 24 * 60 * 60 * 1000,
      ed = new Date(endDate).setHours(23, 59, 59, 999),
      sd = new Date(startDate).setHours(23, 59, 59, 999);

    const daysSincePurchase = Math.round(Math.abs((sd - ed) / oneDay));
    return Number(((daysSincePurchase * principalAmount * monthlyInterest * 12) / 36500).toFixed(2));

  }

  calculateCompoundInterest(
    principalAmount = 0,
    monthlyInterest = 2,
    compoundingPeriodInDays = 365,
    startDate: string = new Date().toISOString(),
    endDate: string = new Date().toISOString()
  ): number {
    const oneDay = 24 * 60 * 60 * 1000,
      ed = new Date(endDate).setHours(23, 59, 59, 999),
      sd = new Date(startDate).setHours(23, 59, 59, 999),
      daysSincePurchase = Math.round(Math.abs((sd - ed) / oneDay)),
      timesToCompound = Math.floor(daysSincePurchase / compoundingPeriodInDays),
      compoundingMonthsPerYear = Math.floor(365 / compoundingPeriodInDays),
      extraDays = daysSincePurchase - timesToCompound * compoundingPeriodInDays,
      totalWithInterestOnCompoundPeriod = principalAmount * Math.pow(1 + (monthlyInterest * 12) / (compoundingMonthsPerYear * 100), timesToCompound),
      interestOnCompoundingPeriod = totalWithInterestOnCompoundPeriod - principalAmount,
      interestForExtraDays = (extraDays * totalWithInterestOnCompoundPeriod * monthlyInterest * 12) / 36500;

    return Number((interestOnCompoundingPeriod + interestForExtraDays).toFixed(2));
  }
}
