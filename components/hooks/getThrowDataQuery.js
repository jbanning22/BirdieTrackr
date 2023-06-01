import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getThrowsUrl =
  'http://ec2-54-87-189-240.compute-1.amazonaws.com:3000/measure-throws';

const getThrows = async () => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(getThrowsUrl, {headers});
    return response ? response.data : null;
  } catch (error) {
    throw error;
  }
};

export const useGetThrowDetails = () => {
  const {data, isLoading, isError, error} = useQuery(['throwData'], getThrows);
  return {data, isLoading, isError, error};
};
