import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
// import {useNavigation} from '@react-navigation/native';

const ProfileHeader = () => {
  // const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        // onPress={() => navigation.navigate('EditProfile')}
        style={{marginRight: 15}}>
        <FontAwesomeIcon icon={faPencilAlt} color="white" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;

// const styles = StyleSheet.create({});
