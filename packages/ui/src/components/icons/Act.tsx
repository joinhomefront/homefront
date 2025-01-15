import Svg, { Path } from "react-native-svg";

interface ActProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Act: React.FC<ActProps> = ({
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
        stroke="#0E4D7E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="30"
        d="M520 100h180m0 0v180m0-180L520 280"
      />
      <Path
        stroke="#0C72BD"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="30"
        d="M580 400h120m0 0v120m0-120L580 520M280 100h120m0 0v120m0-120L280 220"
      />
      <Path
        fill="#0E4D7E"
        stroke="#0E4D7E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="30"
        d="M280 720c110.457 0 200-89.543 200-200s-89.543-200-200-200S80 409.543 80 520s89.543 200 200 200Z"
      />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="30"
        d="m350.626 449.333-70.71 70.711 70.71 70.711"
      />
    </Svg>
  );
};
