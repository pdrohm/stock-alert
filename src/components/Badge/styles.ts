import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  badgeContainer: {
    backgroundColor: colors.blue,
    color: colors.blue,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 2,
    marginBottom: 8,
  },
  badgeText: {
    color: colors.text,
    fontSize: 14,
  },
});
