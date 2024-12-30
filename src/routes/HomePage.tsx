import { Box, Button, Snackbar } from "@mui/material";
import { useState } from "react";

async function callStartAPI(){
  let result = await fetch("http://localhost:8086/api/capture/start")
  return result;
}

async function callStopAPI(){
  let result = await fetch("http://localhost:8086/api/capture/stop")
  return result;
}


function HomePage() {
  const [snackBarControl, setSnackBarControl] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [currentAction, setCurrentAction] = useState<string>('');
  const [showMessageBox, setShowMessageBox] = useState(false);


  const handleStart = async function(){
    
      let apiResult = await callStartAPI();
      if(apiResult.ok){
        setSnackbarMessage("Audio Capture Started");
        setSnackBarControl(true);
        setCurrentAction('start'); 
        setShowMessageBox(true); 
      } else {
        setSnackbarMessage("Could not start Audio Capture");
        setSnackBarControl(true);
        setShowMessageBox(false); 
      }
      
    
  }

  const handleStop = async function(){
    let apiResult = await callStopAPI();

    if(apiResult.ok){
      setSnackbarMessage("Audio Capture Stopped");
      setSnackBarControl(true);
      setShowMessageBox(false); 
      setCurrentAction('stop');  

    } else {
      setSnackbarMessage("Could not stop Audio Capture");
      setSnackBarControl(true);
       setShowMessageBox(true); 
    }
  }

  return (
    <Box
      sx={{
        height: "calc(100vh - 56px)", // Subtract header height (56px)
        display: "flex",
        flexDirection: "column",
        padding: 2
      }}
    >
  <Box
    sx={{
      display: "flex",
      flexDirection: "column", // Stack elements vertically
      alignItems: "center", // Center the content horizontally
      gap: 0,
      flexGrow: 1,
    }}
  >   
      <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Center the button horizontally
            alignItems: "center", // Center the button vertically
            gap: 2,
            flexGrow: 1,
            maxHeight:200
          }}
        >
          <Button variant="contained" onClick={handleStart} disabled={currentAction === 'start'}>
            Start
          </Button>
          <Button variant="contained" color="error" onClick={handleStop} disabled={currentAction === 'stop'}>
            Stop
          </Button>
      </Box>    
   { showMessageBox && <Box
    sx={{
        marginTop: 0, // Add spacing below the buttons
        padding: 2,
        backgroundColor: '#ffe0e0',
        color: 'red',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        borderRadius: 2,
        width: '100%', // Ensure the box spans the width of the container
        maxWidth: 400, // Optional: Set a max width for better appearance
      }}
      >
      This audio is being recorded for speech analytics purposes
    </Box>
    }</Box>
    <Snackbar
          open={snackBarControl}
          autoHideDuration={5000}
          action={
            <Button variant="contained" color="secondary" size="small" onClick={()=>{ setSnackBarControl(false) }}>
              Close
            </Button>
          }
          message={snackbarMessage}
        />
    </Box>
  );
}

export default HomePage;
