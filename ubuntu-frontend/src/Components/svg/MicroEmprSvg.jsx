import { Box } from "@mui/material";

const SvgMicroemp = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <svg
        className="svg-microemprendimientos"
        viewBox="0 0 361 550"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none" 
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <path d="M361 183C189.669 191.629 104.632 167.382 0 0V550H361V183Z" fill="#226516" />
      </svg>
    </Box>
  );
};

export default SvgMicroemp;