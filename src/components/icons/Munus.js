import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={600}
      height={600}
      viewBox="0 0 512 512"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="prefix__feather prefix__feather-more-vertical"
      {...props}>
      <Circle cx={12} cy={12} r={1} fill={'#292929'}/>
      <Circle cx={12} cy={5} r={1} fill={'#292929'} />
      <Circle cx={12} cy={19} r={1}  fill={'#292929'}/>
    </Svg>
  );
}

export default SvgComponent;
