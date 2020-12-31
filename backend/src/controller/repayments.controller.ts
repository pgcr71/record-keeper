import { getConnection, getRepository, InsertResult, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import { NextFunction, Request, Response } from "express";
import { Repayment } from "../entities/repayment.entity";
import { Order } from "../entities/order.entity";
import { OrderRepayment } from "../entities/order_repayments.entity";
import { PaymentStatus } from "../entities/payment_statuses.entity";

export class RepaymentController implements IRepository<Repayment> {
  repository: Repository<Repayment> = getRepository(Repayment);
  public async all(request: Request, response: Response, next: NextFunction): Promise<Repayment[]> {
    return this.repository.find();
  }

  public async one(request: Request, response: Response, next: NextFunction): Promise<Repayment | undefined> {
    return this.repository.findOne(request.params.id);
  }

  public async remove(request: Request, response: Response, next: NextFunction): Promise<Repayment> {
    const repaymentToRemove = await this.repository.findOne(request.params.id);
    return await this.repository.remove(repaymentToRemove as Repayment);
  }

  public async save(request: Request, response: Response, next: NextFunction): Promise<any> {
    return await getConnection().transaction(async (transactionalEntityManager) => {
      const repayments = new Repayment();
      const amount = request.body.totalAmount;
      repayments.user = amount.user;
      repayments.paid_on = amount.paid_on;
      repayments.price = amount.price;
      console.log(repayments);
      const repaymentTransaction = await transactionalEntityManager.save(repayments);
      if (request.body && request.body.orderPaidFor) {
        for (let i = 0; i < request.body.orderPaidFor.length; i++) {
          {
            const order = request.body.orderPaidFor[i];
            const ordersPaidFor = new Order();
            const orderRepayment = new OrderRepayment();
            const paymentStatus = new PaymentStatus();

            if (order.remaining_amount) {
              paymentStatus.id = 2;
              ordersPaidFor.payment_status = paymentStatus;
            } else {
              paymentStatus.id = 3;
              ordersPaidFor.payment_status = paymentStatus;
            }
            ordersPaidFor.id = order.id;
            ordersPaidFor.remaining_amount_tobe_paid = order.remaining_amount;
            const orderTransaction = await transactionalEntityManager.save(ordersPaidFor);
            orderRepayment.order = ordersPaidFor;
            orderRepayment.payment = repaymentTransaction;
            const orderRepaymentTransaction = await transactionalEntityManager.save(orderRepayment);
          }
        }
      }
    });
    //return this.repository.insert({});
  }
}
