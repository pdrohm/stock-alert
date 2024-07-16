import {StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  changeContainer: {
    marginTop: 8,
  },
  changePercentage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
  removeButton: {
    position: 'absolute',
    bottom: 8,
    right: 16,
  },
});
