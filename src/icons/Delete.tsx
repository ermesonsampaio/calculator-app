import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export default function DeleteIcon(props: SvgProps) {
  return (
    <Svg
      width={33}
      height={32}
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.086 7H28.5v18H11.086l-.293-.293-8-8L2.086 16l.707-.707 8-8L11.086 7Zm.828 2-7 7 7 7H26.5V9H11.914Zm3.586 2.586.707.707 2.293 2.293 2.293-2.293.707-.707L22.914 13l-.707.707L19.914 16l2.293 2.293.707.707-1.414 1.414-.707-.707-2.293-2.293-2.293 2.293-.707.707L14.086 19l.707-.707L17.086 16l-2.293-2.293-.707-.707 1.414-1.414Z"
        fill="#fff"
      />
    </Svg>
  );
}
