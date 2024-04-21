import React, { useState} from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View,Image, ScrollView } from 'react-native';
import * as yup from 'yup'
import { Formik } from 'formik';
import { useAuth } from '../../store/hooks/useAuth';
import { UserInfo, UserRegistrationModel } from '../../model';

const ValidationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    userName: yup.string().required('User Name is required'),
    address: yup.string().required('Address is required'),
    isBuyer: yup.boolean().required('Please specify if you are a buyer'),
    profilePic: yup.string(),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password')], 'Passwords must match')
  });

const RegistrationPage = () => {
    const { submitLoginRequest, selectIsLoading } = useAuth()
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('');
    const [userName, setUSerName] = useState<string>('');
    const [address, setAddress] = useState<string>('')
    const [isBuyer, setIsBuyer] = useState<boolean>(false)
    const [profilePic, setProfilePic] = useState<string>('')
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleRegister = (values: UserRegistrationModel) => {
        submitLoginRequest({email: email, password: password})
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.heading1}>Hello Again!</Text>
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
                        confirmPassword: ''
                    }}

                    validationSchema={ValidationSchema}
                    onSubmit={handleRegister}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting, isValid }) => (
                        <View>
                            <TextInput 
                                placeholder="First Name" 
                                style={styles.input} 
                                value={values.firstName} 
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                            />
                            { errors.firstName &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.firstName}</Text>
                            }
                            <TextInput 
                                placeholder="Last Name" 
                                style={styles.input} 
                                value={values.lastName} 
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                            />
                            { errors.lastName &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.lastName}</Text>
                            }
                            <TextInput 
                                placeholder="Email Address" 
                                style={styles.input} 
                                value={values.email} 
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                            />
                            { errors.email &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                            }
                            <TextInput 
                                placeholder="User Name" 
                                style={styles.input} 
                                value={values.userName} 
                                onChangeText={handleChange('userName')}
                                onBlur={handleBlur('userName')}
                            />
                            { errors.userName &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.userName}</Text>
                            }
                            <TextInput 
                                placeholder="Adress" 
                                style={styles.input} 
                                value={values.address} 
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                            />
                            { errors.address &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.address}</Text>
                            }
                            <TextInput 
                                placeholder="Profile Picture"
                                style={styles.input} 
                                value={values.profilePic} 
                                onChangeText={handleChange('profilePic')}
                                onBlur={handleBlur('profilePic')}
                            />
                            { errors.profilePic &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.profilePic}</Text>
                            }
                            <TextInput 
                                placeholder="Password" 
                                style={styles.input} 
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                secureTextEntry={true}
                            />
                            { errors.password &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                            }
                            <TextInput 
                                placeholder="Confirm Password" 
                                style={styles.input} 
                                value={values.confirmPassword} 
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                secureTextEntry={true}
                            />
                            { errors.confirmPassword &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.confirmPassword}</Text>
                            }
                            {/* <Button onPress={handleSubmit} title="Submit" /> */}
                            {/* <Button
                                title="Sign In"
                                type='solid'
                                loading= {selectIsLoading}
                                style={styles.buttonstyle}
                                onPress={handleSubmit}
                            /> */}
                        </View>
                    )}
                </Formik>
                <View style={styles.view2}>
                    
                    {/* <TouchableOpacity style={styles.buttonstyle} onPress={handleLogin} load>
                        <Text style={styles.signintxt}>Sign In</Text>
                    </TouchableOpacity> */}

                </View>
                
                <View style={{bottom:'-2%'}}>
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
        paddingVertical:'11%',
        paddingHorizontal:'4%',
        backgroundColor:'#EEF1F7'
    },

    view1:{
        flex:1,
        backgroundColor:'#EEF1F7',
        top:'8%'

    },

    view2:{
        flex:2,
        bottom:'7%'
        
    },

    //text styles
    heading1:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center'

    },

    para1:{
        fontSize:18,
        opacity:0.7,
        textAlign:'center',
        paddingHorizontal:'20%',
        top:3
        
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

    fogPw:{
        textAlign:"right",
        right:14,
        top:2,
    },

    buttonstyle:{
        borderRadius:10,
        height: 55,
        margin: 12,
        backgroundColor:'#FC6B68',
        justifyContent: 'center',
        alignItems: 'center',
        top:40,


    },

    signintxt:{
        color:'white',
        fontWeight:'bold',
        fontSize:18,

    },



    continue:{
        textAlign:'center',
        top:80,
    },

    loginBTNS:{
        flexDirection:'row',
        top:'35%',
        justifyContent: 'space-evenly',
        
    }
    
})

export default RegistrationPage