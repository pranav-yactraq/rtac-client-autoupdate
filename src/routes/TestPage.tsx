import { Box, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../hooks/Auth";




const TestPage = () => {
  const [snackBarControl, setSnackBarControl] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [isTestCapture, setIsTestCapture] = useState<boolean>(false);
  const { logout, navigateToHome } = useAuth();
  const handleTest = async () => {
    setSnackBarControl(false);
    setSnackbarMessage("");

    try {
      const response = await fetch("http://localhost:8086/api/connect/test");
      if(!response.ok){
        logout();
        return;
      }
      const reader = (response.body as any).getReader();
      const decoder = new TextDecoder("utf-8");

      const readStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            console.log("Stream complete");
            setSnackbarMessage("Audio Capture Successful");
            setSnackBarControl(true);
            setTimeout(()=>{
                navigateToHome();
            }, 3000)
            setIsTestCapture(false)
            break;
          }
          
          const chunk = decoder.decode(value, { stream: true });
          if (chunk.startsWith("Error:")) {
            setIsTestCapture(false)
            setSnackbarMessage("Error while testing Audio Capture");
            setSnackBarControl(true);
            setTimeout(()=>{
                logout();
            }, 3000)
            
            break;
          }
          
          if(chunk.startsWith("Start:")){
            setSnackbarMessage("Audio Capture Started");
            setIsTestCapture(true)
            setSnackBarControl(true);
          }
        }
      };

      await readStream();
      
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Could not start testing of Audio Capture");
      setSnackBarControl(true);
      setTimeout(()=>{
        logout();
    }, 3000)
    
    }
  };

  // const handleConnection = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8086/api/connect/ping");
  //     if(!response.ok){
  //       let errorJsonResponse = await response.json();
  //       setSnackbarMessage(errorJsonResponse?.message || 'Some Error has occured');
  //           setSnackBarControl(true);
  //           setTimeout(()=>{
  //             logout();
  //           }, 3000)
  //       return;
  //     } 

  //     let successfulJsonResponse = await response.json();
  //     setSnackbarMessage(successfulJsonResponse?.message || successfulJsonResponse);
  //     setSnackBarControl(true);
  //     setIsTestCapturePossible(true)
  //   } catch(e){
  //     console.log(e)
  //     setSnackbarMessage("Not able to connect with local server");
  //     setSnackBarControl(true);
  //     setTimeout(()=>{
  //       logout();
  //   }, 3000)
  //   }
  // }

  return (
    <Box
      sx={{
        height: "calc(100vh - 56px)",
        display: "flex",
        flexDirection: "column",
        padding: 2
      }}
    >
      <Box
          sx={{
            display: "flex",
            justifyContent: "center", 
            alignItems: "center",
            gap: 2,
            flexGrow: 1
          }}
        >
          <Button variant="contained" onClick={handleTest} disabled={isTestCapture}>
            Test 
          </Button>
        </Box>
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

export default TestPage;
