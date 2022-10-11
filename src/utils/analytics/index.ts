import { addDoc, collection } from '@firebase/firestore';
import timestamp from 'time-stamp';
import { cloudDatabase } from '../firebase';

export class AnalyticsSender {
    public sendAccrualLenons (count: number) {
        addDoc(collection(cloudDatabase, 'analytics'), {
            date: timestamp(),
            type: 'lemons/accrual',
            count: count
        });
        console.log('[SA] lemons/accrual');
    }

    public sendSpendingLemons (count: number) {
        addDoc(collection(cloudDatabase, 'analytics'), {
            date: timestamp(),
            type: 'lemons/spend',
            count: count
        });
        console.log('[SA] lemons/spend');
    }

    public sendAccrualDiamons (count: number) {
        addDoc(collection(cloudDatabase, 'analytics'), {
            date: timestamp(),
            type: 'diamonds/accrual',
            count: count
        });
        console.log('[SA] diamonds/accrual');
    }


    public sendSpendingDiamons (count: number) {
        addDoc(collection(cloudDatabase, 'analytics'), {
            date: timestamp(),
            type: 'diamonds/spend',
            count: count
        });
        console.log('[SA] diamonds/spend');
    }

    public sendAddPersonal () {
        addDoc(collection(cloudDatabase, 'analytics'), {
            date: timestamp(),
            type: 'personal/add',
        });
        console.log('[SA] personal/add');
    }

    public sendRemovePersonal () {
        addDoc(collection(cloudDatabase, 'analytics'), {
            date: timestamp(),
            type: 'personal/remove',
        });
        console.log('[SA] personal/remove');
    }
}
