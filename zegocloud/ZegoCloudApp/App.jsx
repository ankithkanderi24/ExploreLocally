import { NavigationContainer, useNavigation} from '@react-navigation/native';
import React from "react";
import { Button, View} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="CallPage" component={CallPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomePage(props) {
    const navigation = useNavigation();
    return (
        <View style={{flex: 1,alignItems: 'center',justifyContent: 'space-around'}}>
            <Button title="Call" onPress={() => { navigation.navigate('CallPage') }} />
        </View>
    )
}

function CallPage(props) {
  const randomUserID = String(Math.floor(Math.random() * 100000))
  return (
      <View style={{flex: 1}}>
          <ZegoUIKitPrebuiltCall
            appID={app_ID_here}
            appSign='app sign here'
            userID={randomUserID}
            userName={'user_'+randomUserID}
            callID='testCallID'

            config={{
              ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
              onOnlySelfInRoom: () => { props.navigation.navigate('HomePage') },
              onHangUp: () => {props.navigation.navigate('HomePage')},
            }}
          />
      </View>
  )
}