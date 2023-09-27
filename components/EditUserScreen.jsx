import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ImageBackground,
  View,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import LargeButton from './button/LargeButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import myImage from '../assets/images/BasketBackground2.png';
import {faUser} from '@fortawesome/free-solid-svg-icons';

const EditUserScreen = ({navigation}) => {
  const [formData, setFormData] = useState({
    password: '',
    firstName: '',
    lastName: '',
    userName: '',
    city: '',
    state: '',
  });

  const queryClient = useQueryClient();
  const [imageBool, setImageBool] = useState(false);
  const [imageData, setImageData] = useState([]);
  const isDisabled = !formData.userName || !formData.password;

  const editUser = useMutation(
    async formData => {
      const token = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const editMeRes = await axios.patch(
        'http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/users',
        formData,
        {
          headers: headers,
        },
      );
      await navigation.navigate('ProfileLanding');

      return editMeRes.data;
    },
    {
      onError: error => {
        console.error('Error editing user: ', error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries('userData');
      },
    },
  );

  const getProfilePic = async () => {
    try {
      const value = await AsyncStorage.getItem('profileImageData');
      if (value !== null) {
        setImageData(value);
        setImageBool(true);
        return value;
      }
    } catch (error) {
      throw new Error('Error getting profile pic');
    }
  };

  useEffect(() => {
    getProfilePic();
  }, []);

  return (
    <ImageBackground source={myImage} style={styles.imageBackground}>
      <View style={styles.avatarView}>
        {imageBool ? (
          <Image
            source={{uri: imageData}}
            style={{
              height: 75,
              width: 75,
              borderRadius: 50,
            }}
          />
        ) : (
          <FontAwesomeIcon icon={faUser} color={'black'} size={30} />
        )}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              marginVertical: 50,
              padding: 10,
              marginTop: 2,
              backgroundColor: '#F9FAFB',
              borderRadius: 15,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            {/* <View style={{margin: 2}}> */}
            <Text style={styles.textInputHeader}>User Name</Text>
            <TextInput
              style={styles.emailInput}
              value={formData.userName}
              onChangeText={text => setFormData({...formData, userName: text})}
              clearButtonMode={'always'}
              testID="username"
            />
            {/* </View> */}
            {/* <View style={{margin: 2}}> */}
            <Text style={styles.textInputHeader}>City</Text>
            <TextInput
              style={styles.emailInput}
              value={formData.city}
              onChangeText={text => setFormData({...formData, city: text})}
              clearButtonMode={'always'}
              testID="city"
            />
            {/* </View> */}
            {/* <View style={{margin: 2}}> */}
            <Text style={styles.textInputHeader}>State</Text>
            <TextInput
              style={styles.emailInput}
              value={formData.state}
              onChangeText={text => setFormData({...formData, state: text})}
              clearButtonMode={'always'}
              testID="state"
            />
            {/* </View> */}
            {/* <View style={{margin: 2}}> */}
            <Text style={styles.textInputHeader}>Password</Text>
            <TextInput
              style={styles.loginTextInput}
              value={formData.password}
              onChangeText={text => setFormData({...formData, password: text})}
              clearButtonMode={'always'}
              secureTextEntry={true}
              autoCorrect={false}
              testID="password"
            />
            {/* </View> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <LargeButton
        buttonText="Save"
        onPress={() => editUser.mutate(formData)}
        disabled={isDisabled}
      />
    </ImageBackground>
  );
};

export default EditUserScreen;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignContent: 'center',
  },
  avatarView: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTextInput: {
    height: 50,
    width: 280,
    padding: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    alignSelf: 'center',
    // marginBottom: 10,
  },
  emailInput: {
    height: 50,
    width: 280,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    alignSelf: 'center',
    padding: 10,
  },
  textButton: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 18,
    color: 'white',
  },
  textInputHeader: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
    // marginBottom: 5,
    // margin: 5,
    paddingLeft: 15,
  },
  imageBackground: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
