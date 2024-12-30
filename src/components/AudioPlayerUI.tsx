// import React from "react";
import {
  Paper,
  // Box,
  // IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  SelectChangeEvent,
  SxProps,
  Theme,
} from "@mui/material";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import PauseIcon from "@mui/icons-material/Pause";
// import StopIcon from "@mui/icons-material/Stop";
// import { useAuth } from "../hooks/Auth";


interface AudioPlayerUIProps {
  title: string;
  sx?: SxProps<Theme>; // Allow `sx` prop
  selectedDevice: any;
  devices: any[];
  handleDeviceChange: (event: SelectChangeEvent<string>, type: string) => void
}

function AudioPlayerUI({ title, sx, selectedDevice, handleDeviceChange, devices }: AudioPlayerUIProps) {
  
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        width: "100%",
        // height: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        borderRadius: '16px',
        ...sx
      }}
    >
      {/* Title */}
      <Typography variant="h6" component="div">
        {title}
      </Typography>

      {/* Speaker Dropdown */}
      <FormControl variant="standard" fullWidth>
        <InputLabel id="speaker-select-label">{title}</InputLabel>
        <Select
          labelId="speaker-select-label"
          value={selectedDevice}
          onChange={(event)=>{
            handleDeviceChange(event, title.toLowerCase());
          }}
        >
          {devices.map((item: any, index: number)=>{
            return <MenuItem key={index} value={item["device.strid"]}>{item["name"]}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Paper>
  );
}

export default AudioPlayerUI;
