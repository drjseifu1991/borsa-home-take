import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Divider } from '@rneui/base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAP_AP_KEY } from "@env";
import { useAuth } from '../store/hooks/useAuth';
import { CustomModal } from '../components';

type Props = {
    navigation: StackNavigationProp<any, 'Profile'>; // Define the navigation prop type
};

export const ProfilePage: React.FC<Props> = ({ navigation }) => {
    const {
        session,
        selectIsLoading,
        editProfile,
        logOut,
        setEditNameModalVisible,
        setEditUserNameModalVisible,
        setEditEmailModalVisible,
        setEditAddressModalVisible,
        selectEditNameModalVisible,
        selectEditUserNameModalVisible,
        selectEditEmailModalVisible,
        selectEditAddressModalVisible
    } = useAuth();
    const [firstName, setFirstName] = useState<string>(session?.userInfo.firstName ?? '');
    const [lastName, setLastName] = useState<string>(session?.userInfo.lastName ?? '');
    const [userName, setUserName] = useState<string>(session?.userInfo.userName ?? '');
    const [email, setEmail] = useState<string>(session?.userInfo.email ?? '');
    const [address, setAddress] = useState<string>(session?.userInfo.address ?? '');

    const handleEditName = () => {
        editProfile({ _id: session?.userInfo._id ?? "", firstName: firstName, lastName: lastName });
    };
    const handleEditUserName = () => {
        editProfile({ _id: session?.userInfo._id ?? "", userName: userName });
    };
    const handleEditEmail = () => {
        editProfile({ _id: session?.userInfo._id ?? "", email: email });
    };
    const handleEditAddress = () => {
        editProfile({ _id: session?.userInfo._id ?? "", address: address });
    };

    return (
        <View style={styles.page}>
            <View style={styles.item}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
                    style={styles.profileImage}
                    resizeMode="cover"
                />
                <Button title={"Logout"} type='outline' onPress={logOut} />
            </View>
            <Divider />
            <View style={styles.item}>
                <View style={styles.textWithSVG}>
                    <SvgUri
                        width="20"
                        height="20"
                        source={require('../../assets/AccountCircleOutlined.svg')}
                    />
                    <Text>Name</Text>
                </View>
                <Text style={styles.textLink} onPress={() => setEditNameModalVisible(true)}>{`${session?.userInfo.firstName} ${session?.userInfo.lastName}`}</Text>
            </View>
            <Divider />
            <View style={styles.item}>
                <View style={styles.textWithSVG}>
                    <SvgUri
                        width="20"
                        height="20"
                        source={require('../../assets/AlternateEmailOutlined.svg')}
                    />
                    <Text>Username</Text>
                </View>
                <Text style={styles.textLink} onPress={() => setEditUserNameModalVisible(true)}>{session?.userInfo.userName}</Text>
            </View>
            <Divider />
            <View style={styles.item}>
                <View style={styles.textWithSVG}>
                    <SvgUri
                        width="20"
                        height="20"
                        source={require('../../assets/EmailOutlined.svg')}
                    />
                    <Text>Email</Text>
                </View>
                <Text style={styles.textLink} onPress={() => setEditEmailModalVisible(true)}>{session?.userInfo.email}</Text>
            </View>
            <Divider />
            <View style={styles.item}>
                <View style={styles.textWithSVG}>
                    <SvgUri
                        width="20"
                        height="20"
                        source={require('../../assets/PlaceOutlined.svg')}
                    />
                    <Text>Address</Text>
                </View>
                <Text style={styles.textLink} onPress={() => setEditAddressModalVisible(true)}>{session?.userInfo.address}</Text>
            </View>
            <Divider />
            {selectEditNameModalVisible &&
                <CustomModal
                    open={selectEditNameModalVisible}
                    onClose={setEditNameModalVisible}
                    title='Edit Name'
                >
                    <View style={styles.modalView}>
                        <View style={styles.inputItem}>
                            <Text>First Name</Text>
                            <TextInput
                                placeholder="First Name"
                                value={firstName}
                                onChangeText={setFirstName}
                                style={styles.textInput}
                            />
                        </View>
                        <View style={styles.inputItem}>
                            <Text>Last Name</Text>
                            <TextInput
                                placeholder="Last Name"
                                value={lastName}
                                onChangeText={setLastName}
                                style={styles.textInput}
                            />
                        </View>
                        <View style={styles.inputItem}>
                            <Button
                                title='SUBMIT'
                                style={styles.button}
                                loading={selectIsLoading}
                                onPress={handleEditName}
                            />
                        </View>
                    </View>
                </CustomModal>
            }
            {selectEditUserNameModalVisible &&
                <CustomModal
                    open={selectEditUserNameModalVisible}
                    onClose={setEditUserNameModalVisible}
                    title='Edit User Name'
                >
                    <View style={styles.modalView}>
                        <View style={styles.inputItem}>
                            <Text>User Name</Text>
                            <TextInput
                                placeholder="User Name"
                                value={userName}
                                onChangeText={setUserName}
                                style={styles.textInput}
                            />
                        </View>
                        <View style={styles.inputItem}>
                            <Button
                                title='SUBMIT'
                                style={styles.button}
                                loading={selectIsLoading}
                                onPress={handleEditUserName}
                            />
                        </View>
                    </View>
                </CustomModal>
            }
            {selectEditEmailModalVisible &&
                <CustomModal
                    open={selectEditEmailModalVisible}
                    onClose={setEditEmailModalVisible}
                    title='Edit Email'
                >
                    <View style={styles.modalView}>
                        <View style={styles.inputItem}>
                            <Text>Email</Text>
                            <TextInput
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.textInput}
                            />
                        </View>
                        <View style={styles.inputItem}>
                            <Button
                                title='SUBMIT'
                                style={styles.button}
                                loading={selectIsLoading}
                                onPress={handleEditEmail}
                            />
                        </View>
                    </View>
                </CustomModal>
            }
            {selectEditAddressModalVisible &&
                <CustomModal
                    open={selectEditAddressModalVisible}
                    onClose={setEditAddressModalVisible}
                    title='Edit Address'
                >
                    <View style={styles.modalView}>
                        <View style={styles.inputItem}>
                            <GooglePlacesAutocomplete
                                placeholder="Address"
                                onPress={(data) => {
                                    setAddress(data.description);
                                }}
                                query={{
                                    key: MAP_AP_KEY,
                                    types: '(cities)'
                                }}
                                disableScroll={true}
                                styles={{
                                    textInputContainer: {
                                        width: '100%',
                                        borderWidth: 1,
                                        borderRadius: 5
                                    },
                                    description: {
                                        fontWeight: 'bold'
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb'
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.inputItem}>
                            <Button
                                title='SUBMIT'
                                style={styles.button}
                                loading={selectIsLoading}
                                onPress={handleEditAddress}
                            />
                        </View>
                    </View>
                </CustomModal>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        gap: 20,
        backgroundColor: "#FFFFFF",
        height: "100%"
    },
    inputItem: {
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        gap: 8,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10
    },
    label: {
        color: "#AFADAD"
    },
    textWithSVG: {
        flexDirection: "row",
        alignContent: "center",
        gap: 4
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    textLink: {
        color: "#9F520B"
    },
    modalView: {
        flexDirection: "column",
        alignItems: "center",
        gap: 20
    },
    textInput: {
        width: "100%",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: "#AFADAD",
        backgroundColor: 'white',
        color: '#000000',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: "100%"
    },
});

export default ProfilePage;
