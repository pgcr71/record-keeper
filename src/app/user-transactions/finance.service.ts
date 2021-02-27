import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { AppService } from '../app.service';
import { cloneDeep, get, set } from 'lodash';
import { Order } from 'backend/src';
import { InterestComponent } from 'out/my-project2-win32-x64/resources/app/src/app/interest/interest.component';

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
      return this.appService.electronEmit('getUserOrdersAndRepayments', {
        id: userId,
        start_date: start_date && start_date.toISOString(),
        end_date: end_date && end_date.toISOString(),
        allOrders: allOrders,
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

  calculateRemaining(repayment, orders) {
    const repaidAmount = repayment && repayment.price;
    if (!repaidAmount) {
      return;
    }

    let diff = 0;
    let sumOfFiltered = 0;
    let lastOrder = {};
    const retu = orders.filter((order) => {
      let include = false;
      let breakups;
      order["payment_status"] = order["payment_status"] || 'NOT_PAID';
      const orderInterestType = get(order, "product.interest_type.name", '');
      const monthlyInterestRate = get(order, "product.rate_of_interest", 2);
      set(order, "original_principal", get(order, "product.unit_price", 0) * get(order, "quantity", 0));
      set(order, "current_principal", get(order, "remaining_principal", order.original_principal))
      const remainingPrincipalTobePaid = order["payment_status"] === "NOT_PAID"
        ? order["original_principal"] :
        order["remaining_principal"];
      const interestAccured = orderInterestType === 'compound' ?
        this.calculateCompoundInterest(remainingPrincipalTobePaid, monthlyInterestRate, 365, order.ordered_on, repayment.paid_on) :
        this.calculateSimpleInterest(remainingPrincipalTobePaid, monthlyInterestRate, order.ordered_on, repayment.paid_on)
      set(order, 'interestAccured', Number(interestAccured.toFixed(2)));
      const total_order_value = Number((remainingPrincipalTobePaid + interestAccured).toFixed(2));
      diff = Number(repaidAmount) - sumOfFiltered;
      if (diff >= 0 && total_order_value > 0) {
        include = true;
        if (orderInterestType === 'compound') {
          breakups = this.PrincipalAndInterestComponentBreakupCompoundInterest(
            Math.abs(diff) <= total_order_value ?
              Math.abs(diff) :
              total_order_value,
            order.rate_of_interest,
            365,
            order.ordered_on,
            repayment.paid_on,
          );
        } else {
          breakups = this.PrincipalAndInterestComponentBreakupSimpleInterest(
            Math.abs(diff) <= total_order_value ?
              Math.abs(diff) :
              total_order_value,
            order.rate_of_interest,
            order.ordered_on,
            repayment.paid_on,
          );
        }
        set(order, 'paid_principal', breakups["principalComponent"])
        set(order, 'paid_interest', breakups["interestComponent"])
        set(order, 'remaining_principal', Number((remainingPrincipalTobePaid - breakups["principalComponent"]).toFixed(2)));
        if (order["remaining_principal"] === 0) {
          order["payment_status"] = "FULLY_PAID"
        } else {
          order["payment_status"] = "PARTIALLY_PAID"
        }
        lastOrder = order;
      }

      sumOfFiltered = sumOfFiltered + Number(total_order_value);
      return include;
    });
    if (diff > 0) {

      set(repayment, 'excess_amount', diff);
    } else {
      set(repayment, 'remaining_debt', get(lastOrder, "remaining_principal", 0));
    }


    return retu;
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
