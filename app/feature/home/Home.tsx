import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { useAuth } from '../../store/hooks/useAuth';
import { UserInfo } from '../../model';
import UserCard from './components/UserCard';
import { useError } from '../../store/hooks/useError';


type Props = {
  navigation: StackNavigationProp<any, 'Home'>; // Define the navigation prop type
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const {session} = useAuth()
  const { setError } = useError()
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)

  const fetchUsers = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://143.198.168.244:3000/api/users/fetch/dummy/user-v2?page=${page}&limit=10`);
      const data: UserInfo[] = response.data.data;
      // Simulate delay for loading indicator
      setTimeout(() => {
        setUsers(prevUsers => [...prevUsers, ...data]);
        setIsLoading(false); 
      }, 1000);
    } catch (e: any) {
      console.log(e)
      setError(e?.response?.data?.message ?? e?.message)
      setIsLoading(false);
    }
  };

  const loadMoreUsers = () => {
    if (isLoading) return;
    const nextPage = Math.ceil(users.length / 10) + 1;
    fetchUsers(nextPage);
  };

  useEffect(() => {
    if (session) {
      fetchUsers(1); // Fetch initial data when the component mounts
    }
  }, [session]);

  const renderFooter = () => {
    if (isLoading) {
      return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="#0000ff" />;
    }
    return null;
  };

  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  // Use useLayoutEffect to set navigation options
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerRight: () => (
        <TouchableOpacity onPress={() =>  navigation.navigate('Profile')}>
          <Image
              source={{ uri: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Default placeholder image
              style={ styles.profileImage }
              resizeMode="cover"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {session ? (
        <FlatList
          style={styles.flat}
          data={users}
          renderItem={UserCard}
          keyExtractor={(item) => item._id}
          onEndReached={loadMoreUsers}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={<></>}
          ItemSeparatorComponent={ItemSeparator}
        />
      ) : (
        <View>
          <Text>Please log in to view users</Text>
          <Button title="Log In" onPress={() => navigation.navigate('Login')} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flat: {
    marginTop: 4
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
  },
  separator: {
    height: 10, // Adjust the height for desired spacing
    backgroundColor: 'transparent', // Set the color of the space
  },
  profileImage: {
    marginRight: 20,
    width: 40,
    height: 40,
    borderRadius: 20, // For circular images, half of the width and height
  },
});

export default HomeScreen;