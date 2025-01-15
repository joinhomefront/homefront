import Svg, { Path } from "react-native-svg";

interface DiscoverProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Discover: React.FC<DiscoverProps> = ({
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
        stroke="#0E4D7E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="30"
        d="M280 433.332V700m0-266.668 38.518-19.257c18.511-9.255 21.62-7.074 21.62-7.074M280 433.332l-38.518-19.256a133.332 133.332 0 0 0-59.62-14.072h-57.418C99.898 400.004 80 419.902 80 444.448v177.775c0 24.547 19.898 44.444 44.444 44.444h57.414c20.699 0 41.114 4.82 59.629 14.075L280 700m0 0 38.511-19.258a133.323 133.323 0 0 1 59.636-14.079h57.409c24.546 0 44.444-19.9 44.444-44.444V484.444"
      />
      <Path
        fill="none"
        stroke="#0C72BD"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="30"
        d="M568 404H340m228 0c0-13.984 11.349-25.333 25.333-25.333 13.984 0 25.334 11.349 25.334 25.333M568 404c0 13.984 11.349 25.333 25.333 25.333 13.984 0 25.334-11.349 25.334-25.333M340 404v63.333A12.655 12.655 0 0 0 352.667 480h354.666A12.655 12.655 0 0 0 720 467.333V112.667A12.655 12.655 0 0 0 707.333 100H352.667A12.655 12.655 0 0 0 340 112.667V404Zm278.667 0H712.4M492 201.333v101.334L580.667 252 492 201.333Z"
      />
    </Svg>
  );
};
