import React, { useState } from 'react';
import { GestureResponderEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useAuth } from '../store/hooks/useAuth';
import { UserRegistrationModel } from '../model';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAP_AP_KEY } from '@env';
import { Button, TextInput } from 'react-native-paper';

// Validation Schema for Registration form
const ValidationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    userName: yup.string().required('User Name is required'),
    address: yup.string().required('Address is required'),
    isBuyer: yup.boolean().required('Please specify if you are a buyer'),
    profilePic: yup.string(),
    password: yup.string()
        .required('Password is required')
        .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
        .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
        .matches(/\d/, 'Password must have a number')
        .min(8, ({ min }) => `Password must be at least ${min} characters`),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
});

type RadioButtonProps = {
    label: string;
    selected: boolean;
    onSelect: () => void;
};

export const RegistrationPage = () => {
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

    const { selectIsLoading, registerUser } = useAuth();
    const [hidePass, setHidePass] = useState(true);
    const [hideConfirmPass, setHideConfirmPass] = useState(true);

    const handleRegister = (values: UserRegistrationModel) => {
        console.log(values);
        registerUser(values);
    };

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
                                mode="outlined"
                                placeholder="First Name"
                                style={styles.input}
                                value={values.firstName}
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                            />
                            {errors.firstName &&
                                <Text style={styles.error}>{errors.firstName}</Text>
                            }
                            <TextInput
                                mode="outlined"
                                placeholder="Last Name"
                                style={styles.input}
                                value={values.lastName}
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                            />
                            {errors.lastName &&
                                <Text style={styles.error}>{errors.lastName}</Text>
                            }
                            <TextInput
                                mode="outlined"
                                placeholder="Email Address"
                                style={styles.input}
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                            />
                            {errors.email &&
                                <Text style={styles.error}>{errors.email}</Text>
                            }
                            <TextInput
                                mode="outlined"
                                placeholder="User Name"
                                style={styles.input}
                                value={values.userName}
                                onChangeText={handleChange('userName')}
                                onBlur={handleBlur('userName')}
                            />
                            {errors.userName &&
                                <Text style={styles.error}>{errors.userName}</Text>
                            }
                            <GooglePlacesAutocomplete
                                placeholder="Address"
                                onPress={(data) => {
                                    console.log(data);
                                    setFieldValue("address", data.description);
                                }}
                                query={{
                                    key: MAP_AP_KEY,
                                    types: '(cities)',
                                }}
                                disableScroll={true}
                                styles={{
                                    textInputContainer: {
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
                                    }
                                }}
                            />
                            {errors.address &&
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
                                mode="outlined"
                                placeholder="Password"
                                style={styles.input}
                                value={values.password}
                                secureTextEntry={hidePass ? true : false}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                right={
                                    <TextInput.Icon
                                        icon={hidePass ? "eye" : "eye-off"}
                                        onPress={() => setHidePass(!hidePass)}
                                    />
                                }
                            />
                            {errors.password &&
                                <Text style={styles.error}>{errors.password}</Text>
                            }
                            <TextInput
                                mode="outlined"
                                placeholder="Confirm Password"
                                style={styles.input}
                                value={values.confirmPassword}
                                secureTextEntry={hideConfirmPass ? true : false}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                right={
                                    <TextInput.Icon
                                        icon={hideConfirmPass ? "eye" : "eye-off"}
                                        onPress={() => setHideConfirmPass(!hideConfirmPass)}
                                    />
                                }
                            />
                            {errors.confirmPassword &&
                                <Text style={styles.error}>{errors.confirmPassword}</Text>
                            }
                            <Button
                                mode='contained'
                                loading={selectIsLoading}
                                style={styles.button}
                                onPress={handleSubmit as (e?: GestureResponderEvent) => void}
                            >
                                SUBMIT
                            </Button>
                        </View>

                    )}
                </Formik>
                <View style={styles.bottom}>
                    <Text style={{ textAlign: 'center' }}>Already have an account?{" "}<Text style={{ color: '#1580FF' }}>Sign In here</Text> </Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        paddingHorizontal: '4%',
        backgroundColor: '#EEF1F7'
    },
    input: {
        margin: 12,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    button: {
        marginHorizontal: 12,
        marginTop: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    radioContainer: {
        marginTop: 12,
        marginLeft: 12
    },
    radioGroup: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 40,
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
        marginTop: 20
    },
    bottom: {
        marginVertical: 32
    }
})

export default RegistrationPage;
