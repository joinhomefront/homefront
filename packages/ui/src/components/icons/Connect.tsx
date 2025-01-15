import Svg, { Path } from "react-native-svg";

interface ConnectProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Connect: React.FC<ConnectProps> = ({
  width = 100,
  height = 100,
  className,
}) => {
  return (
    <Svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 800 800"
    >
      <Path
        fill="none"
        stroke="#0C72BD"
        strokeMiterlimit="10"
        strokeWidth="30"
        d="M242.502 598c40 40 97.5 64.999 157.499 64.999 60 0 117.499-24.999 157.499-64.999M327.5 225.496c-89.999 30-152.499 114.999-152.499 212.499 0 10 0 20 2.5 29.999M622.493 467.994c0-9.999 2.5-19.999 2.5-29.999 0-97.5-62.499-182.499-152.499-212.499"
      />
      <Path
        fill="#0E4D7E"
        stroke="#0E4D7E"
        strokeMiterlimit="10"
        strokeWidth="30"
        d="M400 287.999c41.422 0 75-33.579 75-75S441.422 138 400 138c-41.421 0-74.999 33.578-74.999 74.999 0 41.421 33.578 75 74.999 75ZM199.999 612.997c41.422 0 75-33.578 75-75 0-41.421-33.578-74.999-75-74.999-41.421 0-74.999 33.578-74.999 74.999 0 41.422 33.578 75 74.999 75ZM599.999 612.997c41.421 0 74.999-33.578 74.999-75 0-41.421-33.578-74.999-74.999-74.999-41.421 0-74.999 33.578-74.999 74.999 0 41.422 33.578 75 74.999 75Z"
      />
    </Svg>
  );
};
