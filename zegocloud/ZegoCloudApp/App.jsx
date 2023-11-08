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
            appID={321004940}
            appSign='458d8d6b68f9df333bd476fd8892e82021ee24fbc6c41c007aa731bf238e55ee'
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


// // App.js
// import React from 'react';
// import { View, StyleSheet } from 'react-native'; // Import View and StyleSheet
// import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';

// export default function App() {
//     const randomUserID = String(Math.floor(Math.random() * 100000)); // Declare with const
//     return (
//         <View style={styles.container}>
//             <ZegoUIKitPrebuiltCall
//                 appID={321004940}
//                 appSign={"458d8d6b68f9df333bd476fd8892e82021ee24fbc6c41c007aa731bf238e55ee"}
//                 userID={randomUserID} // Use randomUserID
//                 userName={'user_'+randomUserID}
//                 callID={"ZegoCloudOneOnOneVideoCall"}

//                 config={{
//                     ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
//                     // Ensure you have navigation set up to use this, or remove these lines if not using navigation
//                     // onOnlySelfInRoom: () => { /* handle the event */ },
//                     // onHangUp: () => { /* handle the event */ },
//                 }}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
// });
