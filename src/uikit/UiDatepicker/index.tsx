import * as React from 'react';
import { UiInput } from 'uikit/UiInput';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function BasicDatePicker() {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <div>
        <UiInput
            icon={<CalendarMonthIcon />}
            type="text"
            placeholder="C даты"
            onChange={() => {}}
            value=""
        />
        <UiInput
            icon={<CalendarMonthIcon />}
            type="text"
            placeholder="По дату"
            onChange={() => {}}
            value=""
        />
    </div>
  );
}
