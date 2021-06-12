import React from "react";
import PropTypes from "prop-types";
import iconMap from "./iconMap.json";
import * as Styled from "./Icon.styled";

const Icon = ({
  icon, size = 50, className, ...rest
}) => {
  const importSize = size > 50 ? `100` : `50`;
  return (
    <Styled.Icon
      {...rest}
      className={className}
      src={`/assets/icons/Favorites/icons8-${iconMap[icon]}-${importSize}.png`}
      alt={icon}
      size={size}
    />
  );
};

Icon.defaultProps = {
  size: 50,
  className: ``,
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default Icon;
