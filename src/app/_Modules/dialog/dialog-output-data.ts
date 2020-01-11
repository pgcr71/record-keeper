import { Subject, Observable } from 'rxjs';


export class DialogOutput {
    close: Subject<any> = new Subject();
    _onClose: Observable<any> = this.close.asObservable();
}