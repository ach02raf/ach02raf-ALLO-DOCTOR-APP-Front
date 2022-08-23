import { Dimensions, PixelRatio } from "react-native";

const { width } = Dimensions.get("window");

export default interface IconProps {
    active?: boolean;
}

const numberOfIcons = 5;
const horizontalPadding = 48;
export const DURATION = 200;
export const PADDING = 16;
export const SEGMENT = PixelRatio.roundToNearestPixel(width / numberOfIcons);
export const ICON_SIZE = SEGMENT - horizontalPadding;
export const Colors = {
    primary: "#9EDAE4",
    border: "#616164"
};
