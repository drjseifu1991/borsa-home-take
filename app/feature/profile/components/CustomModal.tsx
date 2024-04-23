import React, { PropsWithChildren, SetStateAction } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo icons


type CustoModalProps = {
  open: boolean,
  onClose: React.Dispatch<SetStateAction<boolean>>,
  title: string
}

const CustomModal = (props: PropsWithChildren<CustoModalProps>) => {
  return (
    <Modal
      visible={props.open}
      // animationType="slide"
      transparent={true}
      onRequestClose={() => props.onClose(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{props.title}</Text>
            <TouchableOpacity onPress={() => props.onClose(false)} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {props.children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
    overflow: 'hidden', // Hide content that overflows the modal
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});


export default CustomModal;
