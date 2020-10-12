import React, { useEffect, useState } from 'react';
import { iconsPath } from '../../../assets/Icon/pathLib';
import styles from '../../scss/base-scss/utils/_export.scss';

function Icon(props) {
  const { icon, classType, size, viewBox, color } = props;
  const [iconColor, setIconColor] = useState();
  const { primaryColor, grayColor, blackColor } = styles;

  useEffect(() => {
    switch (color) {
      case 'primary':
        setIconColor(primaryColor);
        break;
      case 'gray':
        setIconColor(grayColor);
        break;
      case 'black':
        setIconColor(blackColor);
        break;
      default:
        setIconColor(grayColor);
    }
  });

  return (
    <svg
      className={`Icon-${classType} Icon-${size}`}
      viewBox={viewBox || '0 0 28 28'}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        d={iconsPath[icon]}
        fill={classType === 'fill' ? iconColor : 'none'}
        stroke={classType === 'line' ? iconColor : 'none'}
      />
    </svg>
  );
}

export default Icon;
