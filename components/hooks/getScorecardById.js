import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGetScorecardById = id => {
  const getScorecardByIdURL = `http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/scorecard/${id}`;

  const getScorecard = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(getScorecardByIdURL, {
      headers,
    });
    return response ? response.data : null;
  };

  const {data, isLoading, isError, error} = useQuery(
    ['scorecardByIdData'],
    getScorecard,
  );
  return {data, isLoading, isError, error};
};
