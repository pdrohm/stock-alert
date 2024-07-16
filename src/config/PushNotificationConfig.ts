import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
    if (Platform.OS === 'ios') {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }
  },
  requestPermissions: Platform.OS === 'ios',
});
export const showNotification = (title: string, message: string) => {
  PushNotification.localNotification({
    title: title,
    message: message,
  });
};
