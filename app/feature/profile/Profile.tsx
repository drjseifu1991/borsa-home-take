import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, Modal, Pressable, Alert } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { useAuth } from '../../store/hooks/useAuth'
import { StackNavigationProp } from '@react-navigation/stack';
import { Divider } from '@rneui/base';

type Props = {
    navigation: StackNavigationProp<any, 'Home'>; // Define the navigation prop type
};

const Profile: React.FC<Props> = ({ navigation }) => {
    const { session } = useAuth()
    const [modalVisible, setModalVisible] = useState(true);
    return (
        <View style={styles.page}>
            <View style={styles.item}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Default placeholder image
                    style={ styles.profileImage }
                    resizeMode="cover"
                />

            </View>
            <Divider/>
            <View style={styles.item}>
                <View style={styles.textWithSVG}>
                    <SvgUri
                        width="20"
                        height="20"
                        source={require('../../../assets/AccountCircleOutlined.svg')}
                    />
                    <Text>Name</Text>
                </View>
                <Text style={styles.textLink}>{`${session?.userInfo.firstName} ${session?.userInfo.lastName}`}</Text>
            </View>
            <Divider/>
            <View style={styles.item}>
                <View style={styles.textWithSVG}>
                    <SvgUri
                        width="20"
                        height="20"
                        source={require('../../../assets/AlternateEmailOutlined.svg')}
                    />
                    <Text>Username</Text>
                </View>
                <Text style={styles.textLink}>{session?.userInfo.userName}</Text>
            </View>
            <Divider/>
            <View style={styles.item}>
                <View style={styles.textWithSVG}>
                    <SvgUri
                        width="20"
                        height="20"
                        source={require('../../../assets/EmailOutlined.svg')}
                    />
                    <Text>Email</Text>
                </View>
                <Text style={styles.textLink}>{session?.userInfo.email}</Text>
            </View>
            <Divider/>
            <View style={styles.item}>
                <View style={styles.textWithSVG}>
                    <SvgUri
                        width="20"
                        height="20"
                        source={require('../../../assets/PlaceOutlined.svg')}
                    />
                    <Text>Address</Text>
                </View>
                <Text style={styles.textLink}>{session?.userInfo.address}</Text>
            </View>
            <Divider/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Hello World!</Text>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        gap: 20,
        backgroundColor: "#FFFFFF",
        height: "100%"
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10
    },
    textWithSVG: {
        flexDirection: "row",
        alignContent: "center",
        gap: 4
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50, // For circular images, half of the width and height
    },
    textLink: {
        color: "#9F520B"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
})

export default Profile
