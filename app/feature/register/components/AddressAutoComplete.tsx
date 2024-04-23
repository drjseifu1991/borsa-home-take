import React from 'react';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

type AddressAutoCompleteProps = {
  onSelectAddress: (details: string) => void
}

const AddressAutocomplete = ({ onSelectAddress }: AddressAutoCompleteProps) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Enter Address"
      onPress={(data, details = null) => {
        onSelectAddress(details?.name ?? "");
      }}
      query={{
        key: '',
        language: 'en',
        type: '(cities)',
        components: 'country:*'
      }}
      enablePoweredByContainer={false}
      styles={{
        textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: '#5d5d5d',
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
    />
  );
};

export default AddressAutocomplete;
