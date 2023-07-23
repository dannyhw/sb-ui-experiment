import {
  Image,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

const SEARCH_ICON_SIZE = 14;
const searchIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPKSURBVHgB1ZhBU9NAFMffy7Y3namfwPAJ7BU92DqDeIOrJ+DmTaBlRmaEpnDAGVroN1A/gXhUDq0X4Rg/geETWAZvJVnfLm26TdNmk6a1/GeYZneyuz9edt++9wDuiRASavPoyGS32TznaBrcy4k+D402IneyGWZ/2N1yIEXFAi0fHheAGyscYBWAmxFTO2BAK8uMahrQWqDvrFOzw9yPwKEASWTgp0mBI0FLh7W3BNgIGSo+s80RHHT5lejhgDk04Althzy1csERHNE62StVIU1QyzrN3TD3S9CKiNCiJau1vZ0WjJHYJtzDdVphLbDi2UOXbVjWVhsmBRWQf5nb5BzycQGD2qRtwwyvqe5pmst+4LJiHNhMWOcN88R+9CE559X6/o4FCdSw5L5cKFePLfr0lbv5IC+/FkBRdx4W7Cgf1is00xsV8qSSDFLVz9Z561lhCcmchW6XuVhcur5onl/qjB/49PJ0G+5vSBlSlWpZoWyWLeh4A0NtdAyv0m+hkzakUE3MKfd7d81bcnsa8kGFNcmG6722mzW0909cIR1Kv0FeRV4kEfJBB6xJDrqR8hWoSnoOxarkxlajxqifvtB7QO59hilrwKqIK9Hvw9Ahatf3y49gBiod1P7Qj7zB3GxnobG764x6V1qU7nHfZxK6DbOSspaIxMa9KkHJDZl+jwe/YFby4Kr3iHx8NCZBDQ5+AEF7J9YdPIloLcdvKAxhMuCeSIJ6CL4VOcPHMCOJsNBvKAxhkqCIFI33R5swK1Hs6i+rMoS+SnJd1j/pStQ0dSlruRk21ttI0LtQzP+PcjpX2qTqrtH99OhE3YT9w8T5V/8RsAJTFufGmkLRinrfB0WDn/Vn0QsUkmooAKLEL2qMDzoUKEzRqh2ZmvQI9AKgAT9Kh2rDb5BVt0W0n7JkBqHkTzrWFBpIRS5b39qLxeVrilReiTb9FhZfLMNF8/sPSEECkq5rq9cWGcTp+9KZztihnImgLp++eFmgRxNShA1CikyUEsbXuuND02VKcXOM0uVBn4pOlqL+uNUOmd+L/R5SZYlTkBhZgOjCirR5MPqmzS8Ca60CRAigsKRaL9CFjSzpBLNGZWibYjMbOdqUS1yLHo/iBBRX8IiSDkVLW7X9nUZwTh1YrSKZrHagaw2VZzQlqiy3GbahuqG4sLHKjn1gfK5VdqTbTlwko7ZJHNjkhVwBTSlMWCHXzXTscflPEtjEoGlKB5bBHChYlwrz3XMBKhQFOzegQqGwxeUrgrXnLrkTRTRKnROVz/+Ltg/q6+IP7pv+AZtF3IXPDf6/AAAAAElFTkSuQmCC";

export const SearchBar = ({ style }: { style?: StyleProp<ViewStyle> }) => (
  <View
    style={[
      {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderColor: "lightgray",
      },
      style,
    ]}
  >
    <Image
      source={{
        uri: searchIcon,
        width: SEARCH_ICON_SIZE,
        height: SEARCH_ICON_SIZE,
      }}
    />

    <TextInput
      placeholder="Find components"
      placeholderTextColor={"#73828C"}
      style={{
        padding: 0,
        ...StyleSheet.absoluteFillObject,
        fontSize: 16,
        fontWeight: "400",
        paddingStart: 22 + SEARCH_ICON_SIZE,
      }}
    />
  </View>
);
