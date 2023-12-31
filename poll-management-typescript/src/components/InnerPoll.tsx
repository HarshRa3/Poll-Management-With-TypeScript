import React, { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";

interface InnerPollProps {
  option: string;
  votes: ReactNode;
  deleteOption?: ReactNode; 
}

const InnerPoll: React.FC<InnerPollProps> = ({ option, votes, deleteOption }) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        justifyContent: "space-between",
        bgcolor: "white",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h5" sx={{ wordBreak: "break-word", maxWidth: "50%" }}>
        {option}
      </Typography>
      <Stack direction={"row"} spacing={4} sx={{ alignItems: "center" }}>
        <Box>
          <Typography variant="h6">{votes}</Typography>
        </Box>
        <Box>{deleteOption}</Box>
      </Stack>
    </Stack>
  );
};

export default InnerPoll;
