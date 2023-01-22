import { FC } from "react";
import { Box, styled } from "@mui/material";
import Sidebar from "../Sidebar";

export const Body: FC = () => {
  return (
    <StyledBox>
      <Sidebar />
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  background-color: ${(props) => props.theme.palette.neutral.light};
  height: 100%;
  width: 100%;
  overflow: auto;
`;
