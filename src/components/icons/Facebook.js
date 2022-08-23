import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Facebook(props) {
    return (
        <Svg viewBox="0 0 512 512" {...props}>
            <Path
                d="M448 0H64C28.704 0 0 28.704 0 64v384c0 35.296 28.704 64 64 64h384c35.296 0 64-28.704 64-64V64c0-35.296-28.704-64-64-64z"
                fill="#1976d2"
            />
            <Path
                d="M432 256h-80v-64c0-17.664 14.336-16 32-16h32V96h-64c-53.024 0-96 42.976-96 96v64h-64v80h64v176h96V336h48l32-80z"
                fill="#fafafa"
            />
        </Svg>
    )
}

export default Facebook;
