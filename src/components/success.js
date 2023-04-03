import { Box, Stack, Typography } from "@mui/material";

export default function Success(props) {
  return (
    <>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Typography sx={{ fontWeight: "bold", fontSize: "2.5rem" }}>
          {props.message}
        </Typography>
        <Box sx={{ maxWidth: "400px", maxHeight: "400px" }}>
          <lottie-player
            src="https://assets1.lottiefiles.com/packages/lf20_jbrw3hcz.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </Box>
      </Stack>
    </>
  );
}
