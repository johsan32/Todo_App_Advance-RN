import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TaskListScreen from '../screens/taskList';
import AddTaskScreen from '../screens/addTask';
import colors from '../themes/Colors';
import {ADDTASK, HOME, SPLASH, TASKLIST} from '../utils/routes';
import HomeScreen from '../screens/home';
import SplashScreen from '../screens/splash';


const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={HOME}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.white,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name={HOME}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SPLASH}
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={TASKLIST}
        component={TaskListScreen}
        options={{headerShown: false}}
      />  
      <Stack.Screen
        name={ADDTASK}
        component={AddTaskScreen}
        options={{title: 'Task Oluştur', headerTransparent: true, headerTintColor:colors.white, headerStyle:{
          backgroundColor:"transparent", 
        }}}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
