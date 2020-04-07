import React from "react";
import styled from "styled-components";
import iconMap from "./iconMap.json";

const StyledIcon = styled.img`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  min-width: ${({ size }) => `${size}px`};
  min-height: ${({ size }) => `${size}px`};
`;
const Icon = ({ icon, size = 50, className, ...rest }) => {
  const importSize = size > 50 ? "100" : "50";
  return (
    <StyledIcon
      {...rest}
      className={className}
      src={`/assets/icons/Favorites/icons8-${iconMap[icon]}-${importSize}.png`}
      alt={icon}
      size={size}
    />
  );
};

export default Icon;
