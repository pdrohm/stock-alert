import React, {useEffect} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {useStockContext} from '../../context/StockContext';
import StockCard from '../../components/StockCard/StockCard';
import {styles} from './styles';
import createSocket from '../../services/socket';
import _ from 'lodash';
import {API_TOKEN} from '../../services/Api';

const WatchlistScreen: React.FC = () => {
  const {watchedStocks, loadMoreStocks, updateStockPrice} = useStockContext();

  const openSocketConnection = () => {
    const symbols = watchedStocks.map(stock => stock.symbol);
    const token = API_TOKEN;

    const handleSocketMessage = _.throttle(
      (data: {s: string; p: number}[]) => {
        data.forEach(trade => {
          updateStockPrice(trade.s, trade.p);
        });
      },
      5000,
      {leading: true},
    );

    const {closeSocket} = createSocket(token, symbols, handleSocketMessage);

    return closeSocket;
  };

  useEffect(() => {
    const closeSocket = openSocketConnection();
    return () => closeSocket();
  });

  const renderItem = ({item}: {item: any}) => <StockCard stock={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={watchedStocks}
        renderItem={renderItem}
        keyExtractor={item => item.symbol}
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMoreStocks}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default WatchlistScreen;
