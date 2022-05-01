import { ref, child, set } from "@firebase/database";
import { useState } from 'react';
import Papa from 'papaparse';

import database from '../../utils/firebase';

const AddFromFile = () => {
    const [dataT, setData] = useState<any>();
    const changeHandler = (event: any) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results: any) {
              setData(results);
            },
          });
        
      };
    
      const formatDataForFirebse = () => {
        if (!dataT) {
          return;
        }
        
        dataT?.data.forEach((item: any, index: any) => {
            set(child(ref(database,'/users'), `/${index}`), {
              id: 1000+index,
              email: item['Directory Server'],
              lemons: 0,
              diamonds: 0
          })
        });
      }
    return (
        <div>
            <input
                type="file"
                name="file"
                accept=".csv"
                onChange={changeHandler}
            />
            <button onClick={formatDataForFirebse}>Записать в базу</button>
        </div>
    )
}  

export default AddFromFile;