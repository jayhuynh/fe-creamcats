import { DatePicker, DatePickerProps, KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const CcDatePicker = (props: DatePickerProps) => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        variant="inline"
        inputVariant="outlined"
        format="DD/MM/yyyy"
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CcDatePicker;
