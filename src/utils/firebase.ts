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
import { User } from "../components/update-user/types";

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
const database = getDatabase(app);

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
    return e
  }

  const userId = +Object.keys(result)[0] + 1;
  const newUser = {
    id: userId + 1000,
    email: new_email,
    lemons: 0,
    diamonds: 0
  }

  set(ref(database, `/users/${userId}`), newUser)
}

export default database;

