import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const LargeButton = ({buttonText, onPress, disabled, customStyles}) => {
  return (
    <TouchableOpacity
      style={[
        styles.createScorecardButton,
        disabled ? styles.disabledButton : null,
        customStyles,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

LargeButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  customStyles: PropTypes.object,
};

export default LargeButton;

const styles = StyleSheet.create({
  createScorecardButton: {
    width: 327,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#2D6061',
    borderRadius: 14,
    margin: 15,
  },
  disabledButton: {
    opacity: 0.4,
  },
  buttonText: {
    fontFamily: 'Satoshi-Medium',
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});
