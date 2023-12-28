import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import SearchIcon from '../../assets/images/SearchIcon.png';
import CustomButton from '../../components/CustomButton';
import TodoItem from '../../components/TodoItem';
import {useNavigation} from '@react-navigation/native';
import showToast from '../../utils/ToastUtils';
import styles from './styles';
import {ADDTASK} from '../../utils/routes';
import LottieView from 'lottie-react-native';
import {useTaskContext} from '../../context/AppContext';

export default function TaskListScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const {tasks, deleteAllTask} = useTaskContext();

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <LottieView
          source={require('../../assets/animations/empty.json')}
          autoPlay
          loop={true}
          style={{width: 300, height: 400}}
        />
        <Text style={styles.emptyText}>Henüz Kayıt Oluşturulmadı!</Text>
      </View>
    );
  };
  return (
    <ImageBackground
      source={require('../../assets/images/back2.jpg')}
      resizeMode="cover"
      style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.mainContentContainer}>
          <SafeAreaView style={[styles.container, {marginBottom: 20}]}>
            <View style={{flexDirection :"row", alignItems:"center", justifyContent:"space-between", paddingHorizontal:10 }}>
            <Text style={styles.headerText}>Tasks</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  Alert.alert('Temizle', 'Tüm kayıtlar silinecektir ?', [
                    {
                      text: 'Tamam',
                      onPress: () => {
                        deleteAllTask();
                      },
                    },
                    {
                      text: 'İptal',
                      onPress: () => {
                        showToast('info', 'Silme işlemi iptal edildi!');
                      },
                    },
                  ]);
                }}>
                <LottieView
                  source={require('../../assets/animations/trash.json')}
                  autoPlay
                  loop={true}
                  style={{width: 50, height: 50}}
                />
              </TouchableOpacity>
            </View>

            <CustomTextInput
              onChangeText={setSearchText}
              value={searchText}
              imageSource={SearchIcon}
              placeholder="Task Ara"
            />
            <FlatList
              data={tasks}
              keyExtractor={item => item.id?.toString()}
              ListEmptyComponent={renderEmptyList}
              renderItem={({item}) => <TodoItem data={item} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 30}}
            />
          </SafeAreaView>
          <CustomButton
            onPress={() => navigation.navigate(ADDTASK)}
            label="Task Ekle"
            style={styles.customText}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
