import {StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 4,
  },
  emptyMessage: {
    color: colors.white,
    fontSize: 40,
  },
  lineChart: {
    borderRadius: 16,
  },
});
