import React from 'react';
import {Dimensions, Text, SafeAreaView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useStockContext} from '../../context/StockContext';
import {styles} from './styles';
import {colors} from '../../styles/colors';

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

  return (
    <SafeAreaView style={styles.container}>
      {watchedStocks.length === 0 ? (
        <Text style={styles.emptyMessage}>No stocks to display</Text>
      ) : (
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
          style={{
            borderRadius: 16,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default GraphScreen;
