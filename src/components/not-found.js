import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function Notfound() {
  return (
    <>
      <Stack direction="row" justifyContent="center">
        <Box>
          <lottie-player
            src="https://assets6.lottiefiles.com/packages/lf20_bhw1ul4g.json"
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
