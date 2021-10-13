import React from 'react';
import iconMap from './iconMap.json';
import * as Styled from './Icon.styled';

type IconProps = {
  icon: string;
  size?: number;
  className?: string;
  // All other props
  [x: string]: any;
}

const Icon = ({
  icon, size = 50, className = '', ...rest
}: IconProps): JSX.Element => {
  const importSize = size > 50 ? '100' : '50';
  return (
    <Styled.Icon
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      className={className}
      // @ts-ignore
      src={`/assets/icons/Favorites/icons8-${iconMap[icon]}-${importSize}.png`}
      alt={icon}
      size={size}
    />
  );
};

export default Icon;
