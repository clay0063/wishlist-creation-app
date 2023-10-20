import { Button } from "react-native-paper";
import { useState, useEffect } from "react";

const CancelButton = ({text, data, onPress}) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const inputs = text.trim() !== "" && data
    setEnabled(inputs);
  }, [text, data]);
  
  return (
    <Button 
      style={{paddingHorizontal:25, marginLeft:40}}
      labelStyle={{fontWeight:"bold"}}
      mode="elevated"
      icon="check-underline"
      disabled={!enabled}
      onPress={onPress}
    >
    Save
  </Button>
  )
}

export default CancelButton;