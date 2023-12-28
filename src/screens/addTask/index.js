import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import CustomTextInput from '../../components/CustomTextInput';
import TaskNameIcon from '../../assets/images/SearchIcon.png';
import CustomButton from '../../components/CustomButton';
import DropDownPicker from 'react-native-dropdown-picker';
import Status from '../../constants/Status';
import {useNavigation, useRoute} from '@react-navigation/native';
import showToast from '../../utils/ToastUtils';
import styles from './styles';
import {TASKLIST} from '../../utils/routes';
import {useTaskContext} from '../../context/AppContext';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../themes/Colors';
export default function AddTaskScreen() {
  const route = useRoute();
  const task = route?.params?.task;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const [items, setItems] = useState([
    {label: 'Açık', value: 'açık'},
    {label: 'Devam ediyor', value: 'devam ediyor'},
    {label: 'Beklemede', value: 'beklemede'},
    {label: 'Kapalı', value: 'kapalı'},
  ]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const {addTask, updateTask} = useTaskContext();
  const [date, setDate] = useState(new Date());

  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleStartConfirm = date => {
    setSelectedStartDate(date.toISOString());
    hideStartDatePicker();
  };

  const handleEndConfirm = date => {
    setSelectedEndDate(date.toISOString());
    hideEndDatePicker();
  };


  const handleAddTask = () => {
    const newTask = {
      id: task ? task?.id : Date.now(),
      title,
      description,
      completed: false,
      startDate: selectedStartDate.toString(),
      endDate: selectedEndDate.toString(),
      status: value ? value : Status.open,
    };
    if (task?.id) {
      updateTask(task?.id, newTask);
      showToast('success', 'Task başarıyla düzenlendi...!');
    } else {
      addTask(newTask);
    }

    navigation.navigate(TASKLIST);
  };
  useLayoutEffect(() => {
    setTitle(task?.title);
    setDescription(task?.description);
    setSelectedStartDate(task ? task?.startDate : new Date()?.toISOString());
    setSelectedEndDate(task ? task?.endDate : new Date()?.toISOString());
    setValue(task?.status);
    navigation.setOptions({
      title: task?.title ? 'Task Düzenle' : 'Task Oluştur',
    });
  }, [navigation, task]);

  return (
    <ImageBackground
      source={require('../../assets/images/back2.jpg')}
      resizeMode="cover"
      style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.inlineContainer}>
          <View style={styles.taskImageContainer}>
            <LottieView
              source={require('../../assets/animations/pen.json')}
              autoPlay
              loop
              style={{height: 200, width: 200, marginTop: 20}}
            />
          </View>
          <View>
            <CustomTextInput
              label={'Task Adı'}
              placeholder="Task için başlık giriniz..."
              imageSource={TaskNameIcon}
              onChangeText={setTitle}
              value={title}
            />
            <TouchableOpacity
              style={{position: 'absolute', top: 35, right: 32}}
              onPress={() => setTitle('')}>
              <Icon name="arrow-left-box" size={38} color={colors.primary} />
            </TouchableOpacity>
            <View>
              <CustomTextInput
                imageSource={TaskNameIcon}
                placeholder="Task için açıklama giriniz"
                onChangeText={setDescription}
                value={description}
              />
              <TouchableOpacity
                style={{position: 'absolute', top: 35, right: 32}}
                onPress={() => setDescription('')}>
                <Icon name="arrow-left-box" size={38} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <CustomTextInput
              style={{width: '40%'}}
              label={'Başlangıç Zamanı'}
              imageSource={TaskNameIcon}
              onChangeText={setStartDate}
              value={selectedStartDate}
              onPressIcon={() => showStartDatePicker()}
              isDate
            />
            <CustomTextInput
              style={{width: '40%'}}
              label={'Bitiş Zamanı'}
              imageSource={TaskNameIcon}
              onChangeText={setEndDate}
              value={selectedEndDate}
              onPressIcon={() => showEndDatePicker()}
              isDate
            />
          </View>
          <View style={styles.dropdownContainer}>
            <View>
              <Text style={styles.status}>Durum</Text>
              <DropDownPicker
                listMode="SCROLLVIEW"
                open={open}
                value={value}
                items={items}
                placeholder="Seçiminizi yapınız..."
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                containerStyle={{width: '90%'}}
                style={{borderWidth: 1, opacity: 0.8}}
              />
            </View>
          </View>
        </View>
        <CustomButton
          onPress={handleAddTask}
          label={task ? 'Taskı Düzenle' : 'Task Oluştur'}
          style={{width: '90%'}}
        />

        <DatePicker
          mode="datetime"
          modal
          androidVariant="nativeAndroid"
          is24hourSource="locale"
          locale="tr"
          title={'Tarih ve saat seçiniz'}
          confirmText="Onayla"
          cancelText="İptal"
          open={isStartDatePickerVisible}
          date={date}
          onConfirm={date => {
            handleStartConfirm(date);
          }}
          onCancel={() => {
            hideStartDatePicker();
          }}
        />
        <DatePicker
          mode="datetime"
          modal
          androidVariant="nativeAndroid"
          is24hourSource="locale"
          locale="tr"
          title={'Tarih ve saat seçiniz'}
          confirmText="Onayla"
          cancelText="İptal"
          open={isEndDatePickerVisible}
          date={date}
          onConfirm={date => {
            handleEndConfirm(date);
          }}
          onCancel={() => {
            hideEndDatePicker();
          }}
        />
      </View>
    </ImageBackground>
  );
}
