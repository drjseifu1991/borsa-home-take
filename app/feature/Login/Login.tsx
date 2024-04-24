import React, { useState} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View,Image, GestureResponderEvent } from 'react-native';
import { Button } from '@rneui/base';
import * as yup from 'yup'
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { useAuth } from '../../store/hooks/useAuth';
import { LoginRequest } from '../../model';

type Props = {
    navigation: StackNavigationProp<any, 'Login'>; // Define the navigation prop type
};

const ValidationSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required')
// .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
// .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
// .matches(/\d/, 'Password must have a number')
// .min(8, ({min}) => `Password must be at least ${min} characters`)
});

const LoginPage: React.FC<Props> = ({navigation}) => {
    const { submitLoginRequest, selectIsLoading } = useAuth()

    const handleLogin = (values: LoginRequest) => {
        submitLoginRequest(values)
    }

    return (
        <View style={styles.container}>
            <View style={styles.view1}>
                    <Text style={styles.heading1}>Hello Again!</Text>
                    <Text style={styles.para1}>Welcome back you've been missed!</Text>
            </View>

            <View style={styles.view2}>
            <Formik<LoginRequest>
                    initialValues={{
                        email: '',
                        password: '',
                    }}

                    validationSchema={ValidationSchema}
                    onSubmit={handleLogin}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting, isValid, setFieldValue }) => (
                        <View>
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
                                placeholder="Password" 
                                style={styles.input} 
                                value={values.password} 
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                            { errors.password &&
                                <Text style={styles.error}>{errors.password}</Text>
                            }
                            <View style={styles.buttonContainer}>
                                <Button
                                    title="SUBMIT"
                                    type='solid'
                                    loading= {selectIsLoading}
                                    style={styles.buttonstyle}
                                    onPress={handleSubmit as (e?: GestureResponderEvent) => void}
                                />
                            </View>
                        </View>
                        
                    )}
                </Formik>
                <Text style={styles.continue}>- Or continue with -</Text>

                {/*---login button section (google apple facebook)--- */}

                <View style={styles.loginBTNS}>
                    <TouchableOpacity>
                        <View style={{width:100,borderWidth:2,borderColor:'white', borderRadius:8}}>
                            <Image  source={require('../../../assets/googleIcon.webp')} style={{width:60, height:60,alignSelf:'center' }}/>
                        </View>
                    </TouchableOpacity>
                    
                    
                    <TouchableOpacity style={{ borderWidth:2,borderColor:'white', borderRadius:8, width:100}}>
                        <View >
                            <Image  source={require('../../../assets/apple-icon.webp')} style={{width:50, height:50, alignSelf:'center'}}/>
                        </View>

                    </TouchableOpacity>
                    

                    <TouchableOpacity style={{ width:100,borderWidth:2,borderColor:'white', borderRadius:8}}>
                    <View >
                        <Image  source={require('../../../assets/facebookicon.png')} style={{width:45, height:45, top:5,alignSelf:'center'}}/>
                    </View>
                    </TouchableOpacity>
                    
                </View>
    
            </View>
            
            <View style={{bottom:'-2%'}}>
                <Text style={{textAlign:'center'}}>Not a member?{" "}<Text onPress={() => navigation.navigate('Register')} style={{color:'#1580FF'}}>Register here</Text> </Text>
            </View>
        </View>
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
    email:{
        height: 55,
        margin: 12,
        borderWidth: 0,
        padding: 10,
        borderRadius:8,
        backgroundColor:'white',
        color:'#AFADAD',
    },
    buttonContainer: {
        marginHorizontal: 12,
        marginTop:20
    },
    buttonstyle:{
        borderRadius: 20,
        height: 60,
        margin: 12,
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
    },
    error: {
        marginHorizontal: 12,
        fontSize: 10, 
        color: 'red'
    }
})

export default LoginPage