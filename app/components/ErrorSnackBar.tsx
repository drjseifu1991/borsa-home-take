import { Snackbar } from 'react-native-paper';
import { useError } from '../store/hooks/useError';

// ErrorSnackbar component to display error messages
export const ErrorSnackbar = () => {
  const { error, setError } = useError(); // Get error state and setter function from custom hook

  // Function to dismiss Snackbar and clear error state
  const handleDismissSnackbar = () => {
    setError(null); // Dispatch action to clear error when Snackbar is dismissed
  };

  return (
    <Snackbar
      visible={!!error} // Show Snackbar if error exists
      onDismiss={handleDismissSnackbar} // Function to call when Snackbar is dismissed
      duration={Snackbar.DURATION_SHORT} // Set duration for Snackbar
      action={{
        label: 'Dismiss',
        onPress: handleDismissSnackbar,
      }}
    >
      {error} {/* Display the error message */}
    </Snackbar>
  );
};

export default ErrorSnackbar; // Export the ErrorSnackbar component
