import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signup, signin } from '../../actions/auth' 
import LockOutLinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import Icon from './Icon'
import useStyles from './Styles'

const initialState = { firstName: '', lasrName: '', email: '', password: '', consirmPassword: ''}

const Auth = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup){
      dispatch(signup(formData, navigate))
    }else{
      dispatch(signin(formData, navigate))
    }

  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword) 
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
    handleShowPassword(false)
  }
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res.tokenId

    try{
      dispatch({ type: 'AUTH', data: { result, token } })

      navigate('/', {replace: true})
    } catch (error){

    }
  }
  const googleFailure = (error) => {
    console.log(error)
    console.log("Google SignIn was unsuccessful. Try again.")
  }

  return (
    <Container component='msin' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                  <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                </>
              )
            }
              <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
              <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' /> }
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>{isSignup ? 'Sign Up' : 'Sign In'}</Button>
          <GoogleLogin 
            clientId='790468912323-gfkmnkgurshvqbd126ha86fhjlvc5tis.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button className={classes.googleButton} color='primary' fullWidth onCLick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>Sign In by Google</Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single-host-origin'
          />
          <Grid container justify='flex-end'>
            <Grid item>
            <Button onClick={switchMode}>{isSignup ? "Already Signed Up? Login Here" : "Don't have an account? Signup Here"}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth