import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Portal, Modal, Button } from "react-native-paper";

const ImageModal = ({ imageURL, clearImage }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (imageURL) {
      setVisible(true);
    }
  }, [imageURL]);

  const onDismiss = () => {
    setVisible(false);
    clearImage();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        {imageURL ? (
          <Image source={{ uri: imageURL }} style={{ width: '85%', height: '85%' }} />
        ) : null}
        <View style={{ marginTop: 20, width: '100%' }}>
          <Button mode="elevated" onPress={()=>onDismiss()} style={{ alignSelf: 'center'}}>Close Image</Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white', 
    padding: 20, 
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1
  }
})

export default ImageModal;

