import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import AsyncStorageKey from '../../constants/AsyncStorageKey';
import styles from './styles';
import {SPLASH} from '../../utils/routes';
import LottieView from 'lottie-react-native';
import colors from '../../themes/Colors';
export default function HomeScreen() {
  const navigation = useNavigation();

  const handleHomeComplete = async () => {
    await AsyncStorage.setItem(AsyncStorageKey.homeComplete, 'true');
    navigation.navigate(SPLASH);
  };

  return (
   <View>
      <StatusBar  backgroundColor={colors.background.current} barStyle={"dark-content"} />
      <ImageBackground source={require("../../assets/images/back2.jpg")} style={styles.container} resizeMode="cover">
      <View style={styles.ellipseBackground} />
      <View style={styles.inlineContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/intro2.png')}
            style={styles.image}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.title}>Task Manager!</Text>
        </View>
        <View style={styles.footerImage}>
         
          <TouchableOpacity style={styles.footerButton}
       
            onPress={handleHomeComplete}>
            <LottieView
              source={require('../../assets/animations/home.json')}
              autoPlay
              loop={true}
              style={{width: 250, height: 200 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
    </View>
  );
}
