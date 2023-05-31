import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserUrl =
  'http://ec2-54-87-189-240.compute-1.amazonaws.com:3000/users/me';

const getUser = async () => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(getUserUrl, {headers});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useGetUserDetails = () => {
  const {data, isLoading, isError, error} = useQuery(['userData'], getUser);
  return {data, isLoading, isError, error};
};
