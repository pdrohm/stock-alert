import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { RenderBadgeItemPropsInterface } from "react-native-dropdown-picker";

interface BadgeProps extends RenderBadgeItemPropsInterface<string> {}

const Badge = ({ label, value }:any) => {
  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{value}</Text>
    </View>
  );
};


export default Badge;
