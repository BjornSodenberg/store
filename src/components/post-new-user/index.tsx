import { useState } from "react";

import { postNewUser } from '../../utils/firebase';

const PostForm = () => {
    // const {register, handleSubmit} = useForm();
    const [value, setValue] = useState<string>();

    const onSubmit = () => {
        if (value) {
            postNewUser(value);
        }
    }
    
    return (
        <div>
            <p>Новый пользователь</p>
            <input type="email" onChange={(e) => setValue(e.target.value)}/>
            <button type="button" onClick={onSubmit}>Записать</button>
        </div>
    )
}

export default PostForm;
