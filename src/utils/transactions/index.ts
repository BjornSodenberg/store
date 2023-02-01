import { getDocs , collection, query, where, doc, updateDoc } from '@firebase/firestore';
import { cloudDatabase } from '../firebase';

class Transactions {
    async getTransactions () {
        const q = query(collection(cloudDatabase, "transactions"), where("id", ">", "0"));
        const querySnapshot = await getDocs(q);
        return querySnapshot; 
    }

    changeStatusTransaction(id: string) {
        const tRef = doc(cloudDatabase, "transactions", id);
        updateDoc(tRef, {
            id: "0"
        });
    }
}

export default Transactions;
