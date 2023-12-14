import { Box, Stack, Typography } from "@mui/material";
import React from "react";
const PollItem = ({title,InnerOption,deleteTitle,AddTitle,EditTitle}) => {
  return (
    <>
      <Stack
        direction={"column"}
        spacing={1}
        sx={{
          width: "95%",
          margin: "10px auto",
          padding: "10px",
          bgcolor: "#546de5",
          borderRadius: "10px",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            bgcolor: "#b691c0f2",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h5" sx={{wordBreak:'break-word',maxWidth:'50%'}} >{title}</Typography>
          <Stack
            direction={"row"}
            spacing={4}
            sx={{ justifyContent: "center" }}
          >
            <Box>
              {AddTitle}
            </Box>
            <Box>
              {EditTitle}
            </Box>
            <Box>
              {deleteTitle}
            </Box>
          </Stack>
        </Stack>
        {InnerOption}
      </Stack>
    </>
  );
};

export default PollItem;
