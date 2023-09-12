import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getThrowsUrl =
  'http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/measure-throws';

const getThrows = async () => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(getThrowsUrl, {headers});
  return response ? response.data : null;
};

export const useGetThrowDetails = () => {
  const {data, isLoading, isError, error} = useQuery(['throwData'], getThrows);
  return {data, isLoading, isError, error};
};
