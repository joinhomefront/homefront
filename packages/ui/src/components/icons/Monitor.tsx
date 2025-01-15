import Svg, { Path } from "react-native-svg";

interface MonitorProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Monitor: React.FC<MonitorProps> = ({
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
        fill="#0E4D7E"
        d="M336.36 390.64a90.004 90.004 0 0 1 0-127.28 90.004 90.004 0 0 1 127.28 0 90.004 90.004 0 0 1 0 127.28 90.004 90.004 0 0 1-127.28 0Z"
      />
      <Path
        fill="none"
        stroke="#0E4D7E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="30"
        d="M400 417a90.004 90.004 0 0 1-63.64-26.36 90.004 90.004 0 0 1 0-127.28 90.004 90.004 0 0 1 127.28 0 90.004 90.004 0 0 1 0 127.28A90.004 90.004 0 0 1 400 417Zm0 0v270"
      />
      <Path
        fill="none"
        stroke="#0C72BD"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="30"
        d="M531.521 196.681c72.639 72.637 72.639 190.406 0 263.045m-263.043-.003c-72.637-72.636-72.637-190.405 0-263.043m-87.681 350.726C59.734 426.342 59.734 230.062 180.797 109m438.407.001c121.061 121.063 121.061 317.344 0 438.405"
      />
    </Svg>
  );
};
