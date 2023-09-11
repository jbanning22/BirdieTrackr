import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
  // const [imageBool, setImageBool] = useState(false);
  // const [imageData, setImageData] = useState([]);

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

  // const getProfilePic = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('profileImageData');
  //     if (value !== null) {
  //       setImageData(value);
  //       setImageBool(true);
  //       return value;
  //     }
  //   } catch (error) {
  //     throw new Error('Error getting profile pic');
  //   }
  // };

  // useEffect(() => {
  //   getProfilePic();
  // }, []);

  return (
    <ScrollView contentContainerStyle={styles.box1}>
      <ImageBackground source={myImage} style={styles.imageBackground}>
        <View style={styles.avatarView}>
          <FontAwesomeIcon
            icon={faUser}
            color={'black'}
            size={34}
            testID="avatar-icon"
          />
        </View>
        <View
          style={{
            width: 320,
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 15,
          }}>
          {/* {imageBool ? (
            <Image
              source={{uri: imageData}}
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
            />
          ) : (
          )} */}
          <KeyboardAvoidingView style={{width: '100%'}}>
            <View style={{margin: 2}}>
              <Text style={styles.textInputHeader}>User Name</Text>
              <TextInput
                style={styles.emailInput}
                value={formData.userName}
                onChangeText={text =>
                  setFormData({...formData, userName: text})
                }
                clearButtonMode={'always'}
                testID="username"
              />
            </View>
            <View style={{margin: 2}}>
              <Text style={styles.textInputHeader}>First Name</Text>
              <TextInput
                style={styles.emailInput}
                value={formData.firstName}
                onChangeText={text =>
                  setFormData({...formData, firstName: text})
                }
                clearButtonMode={'always'}
                testID="first-name"
              />
            </View>
            <View style={{margin: 2}}>
              <Text style={styles.textInputHeader}>Last Name</Text>
              <TextInput
                style={styles.emailInput}
                value={formData.lastName}
                onChangeText={text =>
                  setFormData({...formData, lastName: text})
                }
                clearButtonMode={'always'}
                testID="last-name"
              />
            </View>
            <View style={{margin: 2}}>
              <Text style={styles.textInputHeader}>City</Text>
              <TextInput
                style={styles.emailInput}
                value={formData.city}
                onChangeText={text => setFormData({...formData, city: text})}
                clearButtonMode={'always'}
                testID="city"
              />
            </View>
            <View style={{margin: 2}}>
              <Text style={styles.textInputHeader}>State</Text>
              <TextInput
                style={styles.emailInput}
                value={formData.state}
                onChangeText={text => setFormData({...formData, state: text})}
                clearButtonMode={'always'}
                testID="state"
              />
            </View>
            <View style={{margin: 2}}>
              <Text style={styles.textInputHeader}>Password</Text>
              <TextInput
                style={styles.loginTextInput}
                value={formData.password}
                onChangeText={text =>
                  setFormData({...formData, password: text})
                }
                clearButtonMode={'always'}
                secureTextEntry={true}
                autoCorrect={false}
                testID="password"
              />
            </View>
          </KeyboardAvoidingView>
        </View>
        <LargeButton
          buttonText="Save"
          onPress={() => editUser.mutate(formData)}
        />
      </ImageBackground>
    </ScrollView>
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
    borderWidth: 0.25,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  loginTextInput: {
    height: 50,
    width: 280,
    padding: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
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
    fontSize: 18,
    color: 'white',
  },
  textInputHeader: {
    backgroundColor: 'white',
    fontSize: 12,
    // color: '#7A7979',
    color: 'black',
    marginBottom: 5,
    paddingLeft: 15,
  },
  imageBackground: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
