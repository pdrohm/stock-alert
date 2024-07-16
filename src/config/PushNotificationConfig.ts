import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  requestPermissions: Platform.OS === 'ios',
});

export const showNotification = (title: string, message: string) => {
  PushNotification.localNotification({
    title: title,
    message: message,
  });
};
