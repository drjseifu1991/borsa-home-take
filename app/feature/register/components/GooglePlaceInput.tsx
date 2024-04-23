import React from 'react';
import { View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

type GooglePlacesInputProps = {
  onSelectAddress: (details: string) => void
}

const GooglePlacesInput = ({onSelectAddress}: GooglePlacesInputProps) => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        onSelectAddress(details?.name ?? "")
      }}  
      query={{
        key: 'AIzaSyBYyZDCRIuzPw44wN1FTdTTty47DhCIVFs',
        language: 'en',
        components: 'country:us'
      }}
      enablePoweredByContainer={false}
      styles={{
        textInputContainer: {
          width: '100%'
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}
    />
  );
}

export default GooglePlacesInput