import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useStockContext} from '../../context/StockContext';
import {useAlertContext} from '../../context/AlertContext';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Badge from '../../components/Badge/Badge';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import StockService from '../../services/StockService';
import ProfileBanner from '../../components/ProfileBanner/ProfileBanner';

const AddAlertScreen = () => {
  const {stocks, addWatchedStock, setStocks} = useStockContext();
  const {addAlert, alerts} = useAlertContext();
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [priceAlert, setPriceAlert] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [stockOptions, setStockOptions] = useState(
    stocks.map(stock => ({
      label: `${stock.description} (${stock.displaySymbol})`,
      value: stock.symbol,
    })),
  );

  useEffect(() => {
    setStockOptions(
      stocks.map(stock => ({
        label: `${stock.description} (${stock.displaySymbol})`,
        value: stock.symbol,
      })),
    );
  }, [stocks]);

  const handleSearch = async (query: string) => {
    if (query.length > 2) {
      const results = await StockService.searchStock(query);
      const formattedResults = results.map((stock: any) => ({
        label: `${stock.description} (${stock.symbol})`,
        value: stock.symbol,
      }));
      setStocks(results);
      setStockOptions(formattedResults);
      setOpen(true);
    }
  };

  const alertExists = (symbol: string, price: number) => {
    return alerts.some(
      alert => alert.symbol === symbol && alert.price === price,
    );
  };

  const handleAddAlert = () => {
    if (selectedStocks.length === 0 || !priceAlert) {
      Alert.alert(
        'Validation Error',
        'Please select at least one stock and enter a price',
      );
      return;
    }

    const price = parseFloat(priceAlert);
    selectedStocks.forEach(symbol => {
      if (alertExists(symbol, price)) {
        Alert.alert(
          'Duplicate Alert',
          `An alert for ${symbol} at the same price already exists`,
        );
        return;
      }

      addWatchedStock(symbol);
      addAlert(symbol, price);
    });

    setSelectedStocks([]);
    setPriceAlert('');
    setStockOptions(
      stocks.map(stock => ({
        label: `${stock.description} (${stock.displaySymbol})`,
        value: stock.symbol,
      })),
    );
    setOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileBanner />
      <Text style={styles.label}>Search Stock:</Text>
      <DropDownPicker
        open={open}
        value={selectedStocks}
        items={stockOptions}
        setOpen={setOpen}
        setValue={setSelectedStocks}
        setItems={setStockOptions}
        multiple={true}
        min={0}
        max={10}
        searchable={true}
        searchPlaceholder="Search stock..."
        placeholder="Select stocks"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropDownContainer}
        textStyle={styles.dropDownText}
        onChangeSearchText={handleSearch}
        selectedItemContainerStyle={styles.selectedItemContainer}
        selectedItemLabelStyle={styles.selectedItemLabel}
        badgeStyle={styles.badge}
        badgeTextStyle={styles.badgeTextStyle}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        showBadgeDot={true}
        mode="BADGE"
        renderBadgeItem={({label, value}) => (
          <Badge label={label} value={value} />
        )}
      />
      <Text style={styles.label}>Price Alert:</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Enter Price"
        placeholderTextColor={styles.placeholder.color}
        value={priceAlert}
        onChangeText={text => setPriceAlert(text)}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <SubmitButton title="Add Alert" onPress={handleAddAlert} />
      </View>
    </SafeAreaView>
  );
};

export default AddAlertScreen;
