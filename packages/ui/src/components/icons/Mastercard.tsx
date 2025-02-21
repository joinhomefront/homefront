import Svg, { Path, Rect } from "react-native-svg";

interface MastercardProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Mastercard: React.FC<MastercardProps> = ({
  width = 30,
  height = 20,
  className,
}) => {
  return (
    <Svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 30 20"
    >
      <Rect
        x={0.25}
        y={0.25}
        width={29.5}
        height={19.5}
        fill="#fff"
        stroke="#000"
        strokeWidth={0.5}
        rx={2.75}
      />
      <Path fill="#FF5F00" d="M17.854 4.454h-5.949v10.69h5.95z" />
      <Path
        fill="#EB001B"
        d="M12.283 9.799a6.79 6.79 0 0 1 2.597-5.345 6.799 6.799 0 1 0 0 10.69 6.79 6.79 0 0 1-2.597-5.345"
      />
      <Path
        fill="#F79E1B"
        d="M25.88 9.799a6.798 6.798 0 0 1-11 5.345 6.8 6.8 0 0 0 0-10.69 6.798 6.798 0 0 1 11 5.345m-.649 4.213v-.22h.088v-.044h-.224v.045h.088v.219zm.436 0v-.264h-.069l-.079.181-.08-.181h-.068v.264h.049v-.2l.074.172h.05l.075-.172v.2z"
      />
    </Svg>
  );
};
