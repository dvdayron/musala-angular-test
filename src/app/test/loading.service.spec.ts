import { BehaviorSubject } from 'rxjs';
import { LoadingService } from '../services/loading.service';

describe('LoadingService', () => {

    let service: LoadingService;
    beforeEach(() => { service = new LoadingService(); });

    it('test show function', () => {
        service.show();
        expect(service.isLoading).toEqual(new BehaviorSubject(true));
    });

    it('test hide function', () => {
        service.hide();
        expect(service.isLoading).toEqual(new BehaviorSubject(false));
    });

});