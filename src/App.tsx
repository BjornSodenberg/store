import './App.css';
import database from './utils/firebase';
import { ref, set } from "firebase/database";
import { useState } from 'react';
import { useForm } from "react-hook-form";

type Data = {
  email: string;
  diamonds: number,
  lemons: number,
  userId: number,
}

function App() {
  const [data, setData] = useState<Data>();
  const {register, handleSubmit} = useForm();

  const createTodo = () => {
    set(ref(database, 'users/' + data?.userId), {
      email: data?.email,
      diamonds: data?.diamonds,
      lemons:  data?.lemons,
    })
  }

  const onSubmit = (data: any) => {
    setData(data);
    createTodo();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="email" {...register('email')} />
      <input placeholder="diamonds" {...register('diamonds')} />
      <input placeholder="lemons" {...register('lemons')} />
      <input placeholder="userId" {...register('userId')} />
      <input type="submit" />
    </form>
  );
}

export default App;
//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