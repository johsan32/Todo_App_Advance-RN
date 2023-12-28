import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../themes/Colors';
import StatusButton from './StatusButton';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTaskContext} from '../context/AppContext';
import {ADDTASK} from '../utils/routes';
import formatDate from '../utils/DateUtils';

export default function TodoItem({data}) {
  const navigation = useNavigation();
  const {deleteTask} = useTaskContext();
  const handleDeleteTask = () => {
    deleteTask(data?.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemHeader}>
        <Text
          style={[
            styles.taskTitle,
            {
              textDecorationLine:
                data?.status === 'kapalı' ? 'line-through' : null,
            },
            {
              color:
                data?.status === 'kapalı' ? 'red' : null,
            },
          ]}>
          {data?.title?.toUpperCase()}
        </Text>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[
              styles.statusContainer,
              {
                backgroundColor:
                  data?.status === 'açık' || data?.status === 'devam ediyor'
                    ? '#CAF6cB'
                    : data?.status === 'beklemede'
                    ? '#f18701'
                    : data?.status === 'kapalı'
                    ? '#ff0000'
                    : ' #fff',
              },
            ]}>
            <Text
              style={[
                styles.textStatus,
                {
                  color:
                    data?.status === 'açık' || data?.status === 'devam ediyor'
                      ? '#000'
                      : '#fff',
                },
              ]}>
              {data?.status.toUpperCase()}
            </Text>
          </TouchableOpacity>
          <View style={{position:"absolute", flexDirection:"row", right: 0, top: 40, gap:5}}>
            <TouchableOpacity
              style={{backgroundColor: 'transparent'}}
              
             >
              <StatusButton iconName="pencil" color="#ffea00" size={25}
              
               onPress={() => navigation.navigate(ADDTASK, {task: data})}
              />
            </TouchableOpacity>
            <TouchableOpacity>
                      <StatusButton
              iconName="delete"
              size={25}
              onPress={() => handleDeleteTask()}
              color="#e0695e"
            />
            </TouchableOpacity>
    
          </View>
        </View>
      </View>
      <View></View>

      <Text style={styles.taskDescription}>{data?.description}</Text>
      <View style={styles.footerContainer}>
        <View>
          <Text>Başlangıç Tarihi</Text>
          <View style={styles.timeContainer}>
            <Icon name="clock-outline" color={colors.primary} size={15} />
            <Text style={styles.timeText2}>{formatDate(data?.startDate)}</Text>
          </View>
        </View>

        <View>
          <Text>Bitiş Tarihi</Text>
          <View style={styles.timeContainer}>
            <Icon name="clock-outline" color={colors.primary} size={15} />
            <Text style={styles.timeText2}>{formatDate(data?.endDate)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  taskTitle: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 5,
    flexWrap: 'wrap',
    maxWidth: 230,
  },
  taskDescription: {
    fontsize: 13,
    color: colors.black,
    marginVertical: 10,
    paddingHorizontal: 0,
    marginBottom: 15,
    marginTop:30,
    fontFamily: 'Quicksand-Medium',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 30,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText2: {
    color: colors.text.primary,
    fontWeight: '600',
    marginHorizontal: 5,
    fontsize: 14,
  },
  textStatus: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 12,
  },
});
