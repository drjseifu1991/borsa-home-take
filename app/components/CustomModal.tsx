// Import necessary dependencies
import { PropsWithChildren } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the props type for CustomModal component
type CustomModalProps = {
  open: boolean; // Determines if the modal is open or closed
  onClose: (value: boolean) => void; // Function to close the modal
  title: string; // Title of the modal
};

// CustomModal component
export const CustomModal = (props: PropsWithChildren<CustomModalProps>) => {
  return (
    <Modal
      visible={props.open} // Whether the modal is visible or not
      transparent={true} // Make the modal transparent
      onRequestClose={() => props.onClose(false)} // Function to call when modal is requested to close
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header of the modal */}
          <View style={styles.header}>
            <Text style={styles.title}>{props.title}</Text>
            {/* Close button */}
            <TouchableOpacity onPress={() => props.onClose(false)} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {/* Scrollable content of the modal */}
          <ScrollView style={{ maxHeight: '100%' }}>
            {props.children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// Styles for the CustomModal component
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white', // Background color of the modal
    width: '80%', // Width of the modal
    borderRadius: 10, // Border radius for rounded corners
    padding: 20, // Padding inside the modal
    maxHeight: '80%', // Maximum height of the modal
    overflow: 'hidden', // Hide content that overflows the modal
  },
  header: {
    flexDirection: 'row', // Header items arranged in a row
    justifyContent: 'space-between', // Space between items
    alignItems: 'center', // Align items vertically centered
    marginBottom: 10, // Margin at the bottom of the header
  },
  title: {
    fontSize: 20, // Font size of the title
    fontWeight: 'bold', // Bold font weight for the title
  },
  closeButton: {
    padding: 5, // Padding for the close button
  },
});

export default CustomModal; // Exporting the CustomModal component
