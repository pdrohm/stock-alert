import React from 'react';
import {
  Dimensions,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useStockContext} from '../../context/StockContext';
import {styles} from './styles';
import {colors} from '../../styles/colors';
import {showNotification} from '../../config/PushNotificationConfig';
import Icon from 'react-native-vector-icons/Ionicons';

const GraphScreen = () => {
  const {watchedStocks} = useStockContext();

  const data = {
    labels: watchedStocks.map(stock => stock.displaySymbol),
    datasets: [
      {
        data: watchedStocks.map(stock => stock.c),
      },
    ],
  };

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth * 0.9;

  const handleButtonPress = () => {
    showNotification('Test Title', 'Test Message');
  };

  return (
    <SafeAreaView style={styles.container}>
      {watchedStocks.length === 0 ? (
        <Text style={styles.emptyMessage}>No stocks to display</Text>
      ) : (
        <>
          <LineChart
            data={data}
            width={chartWidth}
            height={220}
            chartConfig={{
              backgroundGradientFrom: colors.blue,
              backgroundGradientTo: colors.darkBlue,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.lineChart}
          />
        </>
      )}
      <View style={styles.fixedBottomRight}>
        <TouchableOpacity
          onPress={handleButtonPress}
          style={styles.notificationButton}>
          <Text style={styles.notificationText}>Test Notification</Text>
          <Icon name="notifications" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GraphScreen;
