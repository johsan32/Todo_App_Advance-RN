import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../themes/Colors';

export default function CustomButton({onPress, style, textStyle, label}) {
  return (
    <View  style={styles.container} >
    <TouchableOpacity style={[styles.button, style]} onPress={() => onPress()}>
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
alignItems:"center",
justifyContent:"flex-end",
width:"100%",
paddingBottom:15,

  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf:"center",
    borderWidth:2,
    borderColor:colors.background.current
  },
  label: {
    fontSize: 20,
    color: colors.primary,
    alignSelf: 'center',
    fontFamily:"Quicksand-Bold",
  },
  textStyle:{

  }
});
