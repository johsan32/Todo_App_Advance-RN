import {ImageBackground, View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageKey from '../../constants/AsyncStorageKey';
import LottieView from 'lottie-react-native';
import styles from './styles';
import { SPLASH, TASKLIST } from '../../utils/routes';

export default function SplashScreen() {
  const navigation = useNavigation();

  async function checkHomeComplete() {
    const homeComplete = await AsyncStorage.getItem(
      AsyncStorageKey.homeComplete,
    );

    if (homeComplete === 'true') {
      navigation.replace(TASKLIST);
    } else {
      navigation.replace(SPLASH);
    }
  }
  return (
    <ImageBackground source={require("../../assets/images/back2.jpg")} resizeMode='cover' style={{flex:1 , justifyContent:"center"}}>

      <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/splash.json')}
        autoPlay
        loop={false}
        style={{width:"100%", height:"80%"}}
        onAnimationFinish={() => {
          setTimeout(() => {
            checkHomeComplete();
          }, 800);
        }}
      />
        <Text style={styles.title}>Haydi Görevlerini Tamamla!</Text>
       </View>
   
    </ImageBackground>
  );
}
