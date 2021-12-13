import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { GatewaysService } from '../services/gateways.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Gateway } from '../models/gateway';

const collectionStub = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(Observable.bind([]))
}

const angularFiresotreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
}

describe('GatewaysService', () => {

    let service: GatewaysService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GatewaysService,
                { provide: AngularFirestore, useValue: angularFiresotreStub }
            ]
        });

        service = TestBed.get(GatewaysService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

});