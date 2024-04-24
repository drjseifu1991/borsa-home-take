import React from 'react';
import { GestureResponderEvent, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as yup from 'yup'
import { Field, Formik } from 'formik';
import { useAuth } from '../../store/hooks/useAuth';
import { UserRegistrationModel } from '../../model';
import { Button } from '@rneui/base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const ValidationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    userName: yup.string().required('User Name is required'),
    address: yup.string().required('Address is required'),
    isBuyer: yup.boolean().required('Please specify if you are a buyer'),
    profilePic: yup.string(),
    password: yup.string().required('Password is required'),
//     password: Yup.string()
// .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
// .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
// .matches(/\d/, 'Password must have a number')
// .min(8, ({min}) => `Password must be at least ${min} characters`)
// .required('Password is required')
    confirmPassword: yup.string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password')], 'Passwords must match')
});

type RadioButtonProps = {
    label: string;
    selected: boolean;
    onSelect: () => void;
  };

const RegistrationPage = () => {
    const RadioButton = ({ label, selected, onSelect }: RadioButtonProps) => (
        <TouchableOpacity 
        style={[styles.radioButton, 
        { backgroundColor: selected ? '#007BFF' : '#FFF' }]} 
        onPress={onSelect} 
    > 
        <Text style={[styles.radioButtonText, 
        { color: selected ? '#FFF' : '#000' }]}> 
            {label} 
        </Text> 
    </TouchableOpacity>
    );

    const { selectIsLoading, registerUser } = useAuth()

    const handleRegister = (values: UserRegistrationModel) => {
        console.log(values)
        registerUser(values)
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Formik<UserRegistrationModel>
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        userName: '',
                        address: '',
                        isBuyer: true,
                        profilePic: '',
                        password: '',
                        confirmPassword: '',
                    }}

                    validationSchema={ValidationSchema}
                    onSubmit={handleRegister}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting, isValid, setFieldValue }) => (
                        <View>
                            <TextInput 
                                placeholder="First Name" 
                                style={styles.input} 
                                value={values.firstName} 
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                            />
                            { errors.firstName &&
                                <Text style={styles.error}>{errors.firstName}</Text>
                            }
                            <TextInput 
                                placeholder="Last Name" 
                                style={styles.input} 
                                value={values.lastName} 
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                            />
                            { errors.lastName &&
                                <Text style={styles.error}>{errors.lastName}</Text>
                            }
                            <TextInput 
                                placeholder="Email Address" 
                                style={styles.input} 
                                value={values.email} 
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                            />
                            { errors.email &&
                                <Text style={styles.error}>{errors.email}</Text>
                            }
                            <TextInput 
                                placeholder="User Name" 
                                style={styles.input} 
                                value={values.userName} 
                                onChangeText={handleChange('userName')}
                                onBlur={handleBlur('userName')}
                            />
                            { errors.userName &&
                                <Text style={styles.error}>{errors.userName}</Text>
                            }
                            <GooglePlacesAutocomplete
                                placeholder="Type a place"
                                onPress={(data) => {
                                    console.log(data)
                                    setFieldValue("address", data.description)
                                    // setAddress(data.description); // Set the selected address to the input field
                                    // handleSelectAddress(data.description);
                                }}
                                query={{
                                    key: "",
                                }}
                                disableScroll={true}
                                fetchDetails={true}
                                onFail={error => console.log(error)}
                                onNotFound={() => console.log('no results')}
                                styles={{
                                    textInputContainer: {
                                    //   width: '100%',
                                      borderWidth: 1,
                                      borderRadius: 5,
                                      marginHorizontal: 12,
                                      marginTop: 16
                                    },
                                    description: {
                                      fontWeight: 'bold'
                                    },
                                    predefinedPlacesDescription: {
                                      color: '#1faadb'
                                    }}}
                            />
                            { errors.address &&
                                <Text style={styles.error}>{errors.address}</Text>
                            }
                            <View style={styles.radioContainer}>
                                <Text>Are you a buyer?</Text>
                                <View style={styles.radioGroup}>
                                    <>
                                        <RadioButton
                                            label="Yes"
                                            selected={values.isBuyer === true}
                                            onSelect={() => setFieldValue('isBuyer', true)}
                                        />
                                        <RadioButton
                                            label="No"
                                            selected={values.isBuyer === false}
                                            onSelect={() => setFieldValue('isBuyer', false)}
                                        />
                                    </>
                                </View>
                            </View>
                            <TextInput 
                                placeholder="Password" 
                                style={styles.input} 
                                value={values.password} 
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                            { errors.password &&
                                <Text style={styles.error}>{errors.password}</Text>
                            }
                            <TextInput 
                                placeholder="Confirm Password" 
                                style={styles.input} 
                                value={values.confirmPassword} 
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                            />
                            { errors.confirmPassword &&
                                <Text style={styles.error}>{errors.confirmPassword}</Text>
                            }
                            <View style={styles.buttonContainer}>
                                <Button
                                    title="SUBMIT"
                                    type='solid'
                                    loading= {selectIsLoading}
                                    style={styles.button}
                                    onPress={handleSubmit as (e?: GestureResponderEvent) => void}
                                />
                            </View>
                        </View>
                        
                    )}
                </Formik>
                <View style={styles.bottom}>
                    <Text style={{textAlign:'center'}}>Already have an account?{" "}<Text style={{color:'#1580FF'}}>Sign In here</Text> </Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        flex:1,
        paddingHorizontal:'4%',
        backgroundColor:'#EEF1F7'
    },
    input:{
        height: 55,
        margin: 12,
        borderWidth: 0,
        padding: 10,
        borderRadius:8,
        backgroundColor:'white',
        color:'#AFADAD',
    },
    button:{
        borderRadius:10,
        margin: 12,
        backgroundColor:'#FC6B68',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioContainer: {
        marginTop: 12,
        marginLeft: 12
    },
    radioGroup: {
        flexDirection: 'row',
        marginBottom: 20,
        gap:40,
        marginTop: 8
    },
    radioButton: { 
        borderRadius: 15, 
        borderWidth: 1, 
        borderColor: '#007BFF', 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center', 
        width: 30,
        height: 30
    },
    radioButtonText: { 
        fontSize: 12, 
    },
    error: {
        marginHorizontal: 12,
        fontSize: 10, 
        color: 'red'
    },
    buttonContainer: {
        marginHorizontal: 12,
        marginTop:20
    },
    bottom: {
        marginVertical: 32
    }
})

export default RegistrationPage