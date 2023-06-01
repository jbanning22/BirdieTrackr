import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getScorecardsUrl =
  'http://ec2-54-87-189-240.compute-1.amazonaws.com:3000/scorecard';

const getScorecards = async () => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(getScorecardsUrl, {
    headers,
  });
  return response ? response.data : null;
};

export const useGetScorecards = () => {
  const {data, isLoading, isError, error} = useQuery(
    ['scorecardData'],
    getScorecards,
  );
  return {data, isLoading, isError, error};
};
