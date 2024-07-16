import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    
  },
  label: {
    fontSize: 24,
    marginBottom: 8,
    color: colors.text,
  },
  picker: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.secondary,
    color: colors.text,
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  dropdown: {
    borderColor: "#ccc",
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    height: 60,
  },
  dropDownContainer: {
    backgroundColor: colors.tertiary,
    borderColor: '#ccc',
  },
  dropDownText: {
    color: colors.text,
    fontSize: 18,
  },
  selectedItemContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 4,
    margin: 2,
  },
  selectedItemLabel: {
    color: colors.text,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 4,
  },
  badgeTextStyle: {
    color: colors.text,
    fontSize: 14,
  },
  placeholder: {
    color: colors.text,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 16,
  }
});
