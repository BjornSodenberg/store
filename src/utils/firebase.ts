import { initializeApp } from "@firebase/app";
import { 
  getDatabase, 
  get, 
  ref, 
  update, 
  limitToLast, 
  query, 
  set,
  remove
} from "@firebase/database";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  getDocs,
  query as firestoreQuery,
  where,
  orderBy,
  limit
} from "@firebase/firestore"
import { User } from "../components/update-user/types";
import timestamp from 'time-stamp';

const firebaseConfig = {
  apiKey: "AIzaSyB8AXb5pmw1_bzq8IJQiPC7MT-nDk1IXzo",
  authDomain: "bank-of-zp.firebaseapp.com",
  databaseURL: "https://bank-of-zp-default-rtdb.firebaseio.com",
  projectId: "bank-of-zp",
  storageBucket: "bank-of-zp.appspot.com",
  messagingSenderId: "377235341578",
  appId: "1:377235341578:web:594e36329dcd84ed547af3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const cloudDatabase = getFirestore(app);

// done
export const getUsers = async () => {
  const usersRef = ref(database, '/users');
  try {
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (e) {
    return e
  }
}
// done
export const updateUser = (user: User) => {
  const updates: any = {};
  const idx = user.id % 1000;

  updates[`/users/${idx}`] = user;
  return update(ref(database), updates);
}

export const postNewUser = async (new_email: string) => {
  // get last user fro know id
  const lastUserRef = query(ref(database, '/users'), limitToLast(1));
  let result;

  try {
    const snapshot = await get(lastUserRef);
    if (snapshot.exists()) {
      result = snapshot.val();
    }
  } catch (e) {
    return {
      code: 500,
      message: 'Ошибка добавления сотрудника. Обратитесь в поддержку.'
    }
  }

  const userId = +Object.keys(result)[0] + 1;
  const newUser = {
    id: userId + 1000,
    email: new_email,
    lemons: 0,
    diamonds: 0
  }

  set(ref(database, `/users/${userId}`), newUser);
  return {
    code: 200,
    message: `Сотрудник ${newUser.email} успешно добавлен.`
  };
}

export const deleteUser = async (id: number) => {
  const usersRef = ref(database, `/users/${id % 1000}`);
  try {
    await remove(usersRef);
  } catch(e) {
    return {
      code: 500,
      message: 'Ошибка при удалении сотрудника. Обратитесь в поддержку.'
    }
  }

  return {
    code: 200,
    message: 'Сотрудник удален'
  }
}

export const transfer = async (userFrom: User, userTo: User, count: number) => {
  const transferResult = userFrom.lemons - count;
  if (transferResult < 0) {
    return {
      code: 500,
      message: 'У сотрудника недостаточно лимонов для перевода.'
    } 
  }

  const userFrom_upd = {
    ...userFrom,
    lemons: transferResult
  }

  const userTo_upd = {
    ...userTo,
    lemons: userTo.lemons + count
  }

  try {
    await updateUser(userFrom_upd);
    await updateUser(userTo_upd);
  } catch (e) {
    console.log(e)
    return {
      code: 500,
      message: 'Ошибка перевода. Обратитесь в поддержку.'
    }
  }

  return {
    code: 200,
    message: 'Перевод успешно отправлен.'
  }

}

export const getSizeHistory = async() => {
  const query = collection(cloudDatabase, 'history');
  const snapshot = await getDocs(query);
  return snapshot.size;
}

export const getHistory = async () => {
  const q = firestoreQuery(collection(cloudDatabase, 'history'), orderBy('created', 'desc'), limit(10));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
}

export const getHistoryByEmail = async (email: string, limitCount:number = 10) => {
  const q = firestoreQuery(
    collection(cloudDatabase, 'history'),
    where("to", "==", email), 
    orderBy('created', 'desc'),
    limit(limitCount),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
}

export const writeToHistory = async (
  count: string, 
  from: string, 
  to: string, 
  operation: string, 
  type: string,
  comment: string,
) => {
  try {
    await addDoc(collection(cloudDatabase, 'history'), {
      count: count,
      from: from,
      to: to,
      operation: operation,
      type: type,
      comment: comment,
      created: timestamp()
    })
  } catch(e) {
    console.log(e)
  }
}

export default database;

