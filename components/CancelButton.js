import { Button, useTheme } from "react-native-paper";

const CancelButton = ({onPress}) => {
  const theme = useTheme();
  
  return (
    <Button 
      buttonColor={theme.colors.error} 
      textColor={theme.colors.onError}
      mode="contained-tonal" 
      onPress={onPress}
    >
      Cancel
    </Button>
  )
}

export default CancelButton;