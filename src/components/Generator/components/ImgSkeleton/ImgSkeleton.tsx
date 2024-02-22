import { Box, Skeleton } from "@mui/material";
import React from "react";
import ImageIcon from "@mui/icons-material/Image";

type Props = {
  height?: number;
};

const ImgSkeleton: React.FC<Props> = ({ height = 250 }: Props) => {
  const boxStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
  };

  const skeletonStyle: React.CSSProperties = {
    borderRadius: 4,
  };

  const iconStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    width: "25%",
    height: "25%",
  };

  return (
    <Box sx={boxStyle} height={height}>
      <Skeleton
        animation={false}
        sx={skeletonStyle}
        variant="rectangular"
        width={"100%"}
        height={"100%"}
      />
      <ImageIcon sx={iconStyle} />
    </Box>
  );
};

export default ImgSkeleton;
