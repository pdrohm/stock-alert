import React from 'react';
import {View, Text} from 'react-native';

import {styles} from './styles';
import {Stock} from '../../types/StockTypes';

interface StockCardProps {
  stock: Stock & {description: string; displaySymbol: string};
}

const StockCard = ({stock}: StockCardProps) => {
  const price = stock.c != null ? stock.c.toFixed(2) : '--';
  const changePercentage = stock.dp != null ? stock.dp.toFixed(2) : '--';
  const changeValue = stock.d != null ? stock.d.toFixed(2) : '--';
  const isPositive = stock.dp != null && stock.dp >= 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.symbol}>{stock.displaySymbol}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
      <View style={styles.changeContainer}>
        <Text
          style={[
            styles.changePercentage,
            isPositive ? styles.positive : styles.negative,
          ]}>
          {isPositive ? '▲' : '▼'} {changePercentage}% ({changeValue})
        </Text>
      </View>
    </View>
  );
};

export default StockCard;
