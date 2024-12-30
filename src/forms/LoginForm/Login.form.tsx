import { Box, Button, TextField } from "@mui/material";
import validationSchema from "./Login.schema";
import { useFormik } from "formik";
import { useAuth } from "../../hooks/Auth";


const LoginForm = () =>{
  const { login } = useAuth();

  const LoginFormObject = {
    initialValues: {
      username: null,
      password: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      console.log(JSON.stringify(values, null, 2));
      login(values);
    },
  }



  const formik = useFormik(LoginFormObject);



  
  return (<Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2, 
          marginTop: 4,
          width: "100%", 
          // maxWidth: "400px", 
          margin: "0 auto", 
        }}
        noValidate
        autoComplete="off"
      >
        <h1>Welcome to the Application</h1>
       
      
  <TextField
          label="username"
          id="username"
          placeholder="Enter your username"
          variant="outlined"
          fullWidth
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />

        <TextField
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          variant="outlined"
          fullWidth
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button variant="contained" color="primary" fullWidth 
        onClick={(e) => {
          e.preventDefault(); 
          formik.handleSubmit();
        }}>
          Login
        </Button>
        </Box>);
  
}

  
  export default LoginForm;