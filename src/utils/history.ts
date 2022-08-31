
import {
    collection,
    getDocs,
    query as firestoreQuery,
    where,
    orderBy,
    limit,
    DocumentData,
    WhereFilterOp,
    Query,
    startAfter,
    endBefore,
    limitToLast
  } from "@firebase/firestore";
import { cloudDatabase } from './firebase';

type QueryData = {
    email?: string;
    dateStart?: string;
    dateEnd?: string;
    order?: "desc" | "asc";
}

interface FirestoreQuery {
    property: string;
    operator: WhereFilterOp;
    value: unknown;
}

export class HistoryService {
    size: number;
    limit: number;

    constructor () {
        this.size = 0;
        this.limit = 25;
    }

    private createQueryConditions = (queryList: FirestoreQuery[]) => {
        return queryList.map((condition) => 
            where(condition.property, condition.operator, condition.value)
        )
    }
    
    private createFirestoreQuery = (
        {email, dateStart, dateEnd, order} : QueryData,
        start?: DocumentData
    ) => {
        const queryList: FirestoreQuery[] = [];

        if (email) {
            queryList.push({property: "to", operator: "==", value: email})
        }

        if (dateStart && dateEnd) {
            queryList.push({property: "created", operator: ">=", value: dateStart});
            queryList.push({property: "created", operator: "<=", value: dateEnd});
        }

        const queryConditions = this.createQueryConditions(queryList);
        queryConditions.push(
            orderBy('created', order ? order : "desc"), 
        );

        if (start) {
            queryConditions.push(
                startAfter(start), 
            ); 
        }

        queryConditions.push(
            limit(this.limit)
        );

        return firestoreQuery(
            collection(cloudDatabase, 'history'),
            ...queryConditions,
        )
    }

    public getHistory = async (
        order: "desc" | "asc" = "desc",
    ) => {
        const firestoreQuery = this.createFirestoreQuery({
            order
        }); 

        const qs = await getDocs(firestoreQuery);

        this.size = qs.size;

        return {
            data: qs.docs.map((doc) => doc.data()),
            lastVisible: qs.docs[qs.size-1]
        };
    }

    public getHistoryByEmail = async (
        email: string,
        order: "desc" | "asc" = "desc",
    ) => {
        console.log('enter here');
        const firestoreQuery = this.createFirestoreQuery({
            email,
            order,
        }); 
        
        const qs = await getDocs(firestoreQuery);

        this.size = qs.size;

        return {
            data: qs.docs.map((doc) => doc.data()),
            lastVisible: qs.docs[qs.size-1]
        };
    }

    public getHistoryByDate = async (
        dateStart: string,
        dateEnd: string,
        order: "desc" | "asc" = "desc",
    ) => {
        const firestoreQuery = this.createFirestoreQuery({
            dateStart,
            dateEnd,
            order,
        }); 
        
        const qs = await getDocs(firestoreQuery);

        this.size = qs.size;

        return {
            data: qs.docs.map((doc) => doc.data()),
            lastVisible: qs.docs[qs.size-1]
        };
    }

    public getHistoryByDateAndEmail = async (
        email: string,
        dateStart: string,
        dateEnd: string,
        order: "desc" | "asc" = "desc",
    ) => {
        const firestoreQuery = this.createFirestoreQuery({
            email,
            dateStart,
            dateEnd,
            order,
        }); 
        
        const qs = await getDocs(firestoreQuery);

        this.size = qs.size;

        return {
            data: qs.docs.map((doc) => doc.data()),
            lastVisible: qs.docs[qs.size-1]
        };
    }

    public loadMore = async (
        lastVisible: DocumentData,
        filters?: QueryData
    ) => {
        const qs = this.createFirestoreQuery({...filters}, lastVisible);
        
        const result = await getDocs(qs);
        console.log(result.docs.map((doc) => doc.data()));

        return {
            data: result.docs.map((doc) => doc.data()),
            lastVisible: result.docs[result.size-1]
        };
    }

}
