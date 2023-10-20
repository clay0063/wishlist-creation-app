import React, { useState, useEffect } from "react";
import { Portal, Modal, Text } from "react-native-paper";

const ErrorModal = ({ errorMessage, clearError }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setVisible(true);
    }
  }, [errorMessage]);

  const onDismiss = () => {
    setVisible(false);
    clearError();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}
      >
        <Text>{errorMessage}</Text>
      </Modal>
    </Portal>
  );
};

export default ErrorModal;

// Set it up with:
// const [errorMessage, setErrorMessage] = useState("");
// const showModal = (error) => {
//   setErrorMessage(error);
// };

// const clearError = () => {
//   setErrorMessage("");
// };
// <ErrorModal errorMessage={errorMessage} clearError={clearError} />
