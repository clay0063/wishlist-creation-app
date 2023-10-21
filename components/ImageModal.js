import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";
import { Portal, Modal, Button } from "react-native-paper";

const ImageModal = ({ imageURL, clearImage }) => {
  const [visible, setVisible] = useState(false);
  const { width } = Dimensions.get("window");

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
          <Image source={{ uri: imageURL }} style={{ width: width * 0.85, aspectRatio: 2 / 3 }} />
        ) : null}
        <View style={styles.buttonContainer}>
          <Button mode="elevated" onPress={()=>onDismiss()} style={{ alignSelf: 'center'}}>Close Image</Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white", 
    padding: 20, 
    alignItems: "center", 
    justifyContent: "center", 
    flex: 1
  },
  enlargedImage: {
    width: "85%", 
    height: "auto"
  },
  buttonContainer: {
    marginTop: 20, 
    width: "100%"
  }
})

export default ImageModal;

