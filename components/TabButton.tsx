import {
  Image,
  StyleProp,
  Text,
  TouchableHighlight,
  ViewStyle,
} from "react-native";

export const TabButton = ({
  text,
  icon,
  onPress,
  underlayColor = "#F6F9FC",
  iconSize = 14,
  style,
}: {
  text: string;
  icon?: string;
  onPress: () => void;
  underlayColor?: string;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <TouchableHighlight
      underlayColor={underlayColor}
      style={[
        {
          padding: 16,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          flexDirection: "row",
          columnGap: 12,
        },
        style,
      ]}
      onPress={onPress}
    >
      <>
        {icon && (
          <Image source={{ uri: icon, width: iconSize, height: iconSize }} />
        )}
        <Text
          style={{
            fontSize: 15,
            fontWeight: "400",
            color: "#2E3438",
          }}
        >
          {text}
        </Text>
      </>
    </TouchableHighlight>
  );
};
