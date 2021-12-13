import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gateway } from '../models/gateway';

@Injectable({
    providedIn: 'root'
})
export class GatewaysService {

    collection: string = 'gateways';

    constructor(private readonly afs: AngularFirestore) {}

    getGateways(): Observable<Gateway[]> {

        let collection = this.afs.collection<Gateway>(this.collection);

        return collection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const id = a.payload.doc.id;
                const data = a.payload.doc.data() as Gateway;
                return { id, ...data };
            }))
        );
    }

    getGateway(id: string): Promise<Gateway> {
        return new Promise<Gateway>((resolve) => {
        let itemDoc = this.afs.doc<Gateway>(this.collection + '/' + id);
            itemDoc.get().subscribe((item) => {
                if (item) {
                    const id = item.id;
                    const data = item.data() as Gateway;
                    resolve({ id, ...data });
                } else {
                    resolve({});
                }
            });
        });
    }

    addGateway(gateway: Gateway): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            let itemsCollection = this.afs.collection<Gateway>(this.collection);
            itemsCollection.add(gateway)
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
    }

    updateGateway(gateway: Gateway): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            let itemsCollection = this.afs.collection<Gateway>(this.collection);
            itemsCollection.doc(gateway.id).set(gateway)
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
    }

    deleteGateway(id: any): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            let itemsCollection = this.afs.collection<Gateway>(this.collection);
            itemsCollection.doc(id).delete()
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
    }

    isUnique(serial_number: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            let collection = this.afs.collection<Gateway>(this.collection, ref => ref.where('serial_number', '==', serial_number));
            collection.snapshotChanges().subscribe((items) => {
                let result = items.map(a => {
                    return { id: a.payload.doc.id };
                });
                resolve(result.length === 0);
            });
        });
    }
}