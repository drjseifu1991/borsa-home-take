import { View, Image, Text, StyleSheet } from 'react-native'
import SvgUri from 'react-native-svg-uri';
import { UserInfo } from '../../../model'

const UserCard = ({ item }: { item: UserInfo }) => {

  return (
    <View style={styles.card}>
        <View style={styles.column1}>
            <View style={styles.imageWithName}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Default placeholder image
                    style={styles.profileImage}
                    resizeMode="cover"
                />
                <Text>{`${item.firstName} ${item.lastName}`}</Text>
            </View>
            <View>
                
            {
                item.isBuyer ?
                    <SvgUri
                        width="20"
                        height="20"
                        source={require('../../../../assets/Buyer.svg')}
                    />
                    : 
                    <SvgUri
                        width="20"
                        height="20"
                        source={require('../../../../assets/PlaceOutlined.svg')}
                    />
            }
            </View>
        </View>
        <View style={styles.column2}>
            <View style={styles.textWithSVG}>
                <SvgUri
                    width="20"
                    height="20"
                    source={require('../../../../assets/AlternateEmailOutlined.svg')}
                />
                <Text>{item.userName}</Text>
            </View>
            <View style={styles.textWithSVG}>
                <SvgUri
                    width="20"
                    height="20"
                    source={require('../../../../assets/EmailOutlined.svg')}
                />
                <Text>{item.email}</Text>
            </View>
        </View>
        <View style={styles.textWithSVG}>
            <SvgUri
                width="20"
                height="20"
                source={require('../../../../assets/PlaceOutlined.svg')}
            />
            <Text>{item.address}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
      flexDirection: 'column',
      gap: 12,
      padding: 16,
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      marginHorizontal: 8
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 30, // For circular images, half of the width and height
    },
    column1: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    imageWithName: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    column2: {
        flexDirection: "row",
        alignContent: "center",
        gap: 16
    },
    textWithSVG: {
        flexDirection: "row",
        alignContent: "center",
        gap: 4
    },
  });

export default UserCard