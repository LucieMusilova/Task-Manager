import { FC } from "react";
import { Box, styled, Typography } from "@mui/material";

const Error: FC = () => {
  return (
    <StyledBox>
      <Typography variant="h2">Ooops!!!</Typography>
      <Typography variant="h3">Something went wrong</Typography>
      <Box
        component="img"
        sx={{
          maxWidth: 500,
          margin: "100px auto",
        }}
        alt="Error"
        src="https://cdn.pixabay.com/photo/2017/01/09/12/56/mistake-1966460_960_720.jpg"
      />
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  background-color: white;
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 58px 57px;
  text-align: center;
`;

export default Error;
