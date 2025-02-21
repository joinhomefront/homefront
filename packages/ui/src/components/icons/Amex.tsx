import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

interface AmexProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Amex: React.FC<AmexProps> = ({
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
      fill="none"
    >
      <G clipPath="url(#a)">
        <Rect width={30} height={20} fill="#fff" rx={3} />
        <Path
          fill="#006FCF"
          d="m25.875 4.114.76-2.006H30v-3.633H-3.75v22.989H30V17.83h-3.202l-1.194-1.355-1.194 1.355H15.4v-7.265h-2.984l3.745-8.404h3.636l.868 1.898V2.162h4.505zm-2.496.542.325.813 1.52 4.012h1.411l1.52-4.012.271-.813v4.771H30V3.301h-2.605L26.2 6.39l-.326.867-.325-.867-1.194-3.09H21.75v6.126h1.628zm-3.365 4.771h1.79l-2.713-6.126h-2.116L14.26 9.427h1.791l.489-1.193h2.985zm-2.28-4.012.326-.759.326.759.651 1.572h-1.9zm-1.085 5.15v6.127h5.102v-1.3h-3.582v-1.085h3.473v-1.301H18.17V11.92h3.582v-1.3zm10.854 6.073h2.009l-2.877-3.036 2.877-3.036h-2.009l-1.845 2.006-1.845-2.006h-2.062l2.876 3.09-2.876 3.036h1.953l1.846-2.006zm.76-3.036L30 15.392v-3.525z"
        />
      </G>
      <Rect
        width={29.5}
        height={19.5}
        x={0.25}
        y={0.25}
        stroke="#000"
        strokeWidth={0.5}
        rx={2.75}
      />
      <Defs>
        <ClipPath id="a">
          <Rect width={30} height={20} fill="#fff" rx={3} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
