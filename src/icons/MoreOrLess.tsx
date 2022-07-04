import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export default function MoreOrLess(props: SvgProps) {
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
        d="m23.582 7.555.555-.832-1.664-1.11-.555.832-12 18-.555.832 1.664 1.11.555-.832 12-18ZM9.75 6v3h3v2h-3v3h-2v-3h-3V9h3V6h2Zm12 15h-1v2h8v-2h-7Z"
        fill="#fff"
      />
    </Svg>
  );
}
