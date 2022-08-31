// @ts-nocheck

import DatePicker from "react-datepicker";
import DateRangeIcon from '@mui/icons-material/DateRange';
import "react-datepicker/dist/react-datepicker.css";
import './styles.css';

type Props = {
    setDateRange: any;
    startDate: Date | null;
    endDate: Date | null;
}

export const UiDatePicker = (props: Props) => {
    return (
    <div className="datepicker-wrapper">
        <DateRangeIcon 
            className='ui-input__icon'
        />
        <DatePicker
          selectsRange={true}
          startDate={props.startDate}
          endDate={props.endDate}
          onChange={(update) => {
            props.setDateRange(update);
          }}
          withPortal
          placeholderText="Нажмите, чтобы выбрать дату"
        />
    </div>
    );
  };
