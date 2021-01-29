import { Subject, Observable } from 'rxjs';

export class DialogOutput {
  closed: Subject<any> = new Subject();
  _onClose: Observable<any> = this.closed.asObservable();

  public close(data) {
    this.closed.next(data);
  }
}
