import React, { useState} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View,Image } from 'react-native';
import { Button } from '@rneui/base';
import { useAuth } from '../../store/hooks/useAuth';


const LoginPage = () => {
    const { submitLoginRequest, selectIsLoading } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        submitLoginRequest({email: email, password: password})
    }

    return (
        <View style={styles.container}>
            <View style={styles.view1}>
                    <Text style={styles.heading1}>Hello Again!</Text>
                    <Text style={styles.para1}>Welcome back you've been missed!</Text>
            </View>

            <View style={styles.view2}>
                <TextInput 
                    placeholder="Email Address" 
                    style={styles.email} 
                    value={email} 
                    onChangeText={setEmail}
                />
                <TextInput 
                    placeholder="Password" 
                    style={styles.email} 
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <Text style={styles.fogPw}>Forgot Password</Text>

                <Button
                    title="Sign In"
                    type='solid'
                    loading= {selectIsLoading}
                    style={styles.buttonstyle}
                    onPress={handleLogin}
                />
                {/* <TouchableOpacity style={styles.buttonstyle} onPress={handleLogin} load>
                    <Text style={styles.signintxt}>Sign In</Text>
                </TouchableOpacity> */}

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
                <Text style={{textAlign:'center'}}>Not a member?{" "}<Text style={{color:'#1580FF'}}>Register here</Text> </Text>
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

    email:{
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

export default LoginPage