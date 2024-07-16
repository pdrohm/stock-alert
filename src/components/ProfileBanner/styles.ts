import {StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    zIndex: 1,
    marginHorizontal: 16,
  },
  textContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#555',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  logoutIcon: {
    marginLeft: 8,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 4,
  },
});
