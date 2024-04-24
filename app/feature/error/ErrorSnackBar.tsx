import React from 'react';
import { Snackbar } from 'react-native-paper';
import { useError } from '../../store/hooks/useError';

const ErrorSnackbar = () => {
  const {error, setError} = useError()

  const handleDismissSnackbar = () => {
    setError(null); // Dispatch action to clear error when Snackbar is dismissed
  };

  return (
    <Snackbar
      visible={!!error} // Show Snackbar if error exists
      onDismiss={handleDismissSnackbar}
      duration={Snackbar.DURATION_SHORT}
      action={{
        label: 'Dismiss',
        onPress: handleDismissSnackbar,
      }}
    >
      {error}
    </Snackbar>
  );
};

export default ErrorSnackbar;
