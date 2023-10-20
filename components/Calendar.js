import DatePicker from "react-native-modern-datepicker";

const Calendar = ({ theme, onDateChange }) => {
  return (
    <DatePicker
          options={{
            backgroundColor: theme.colors.secondaryContainer,
            textHeaderColor: theme.colors.onSecondaryContainer,
            textDefaultColor: theme.colors.onSecondaryContainer,
            selectedTextColor: theme.colors.onSecondary,
            mainColor: theme.colors.onSecondaryContainer,
            textSecondaryColor: theme.colors.tertiary,
            borderColor: theme.colors.tertiary
          }}
          onSelectedChange={(date) => onDateChange(date)}
          mode="calendar"
        />
  )
}

export default Calendar;