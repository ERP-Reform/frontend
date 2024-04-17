import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Button, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Stack } from '@mui/material';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project import

// assets
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import AnimateButton from 'components/@extended/AnimateButton';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useLogin } from 'services/accountServices';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [account, setAccount] = useState({
    username: '',
    password: ''
  });

  const handleChange = useCallback(
    (event) => {
      setAccount((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    [setAccount]
  );

  const handleOnSuccess = useCallback(
    (account, priority) => {
      console.log(account);
      setCookie('account', account);
      setCookie('priority', priority);
      navigate('/dashboard');
    },
    [navigate, setCookie]
  );

  const login = useLogin(account, handleOnSuccess);

  const handleSubmit = useCallback(() => {
    login.mutate();
  }, [login]);

  useEffect(() => {
    console.log(cookies);
  }, [cookies]);

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('用户名不能为空'),
          password: Yup.string().max(255).required('密码不能为空')
        })}
      >
        <form noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="username-login">用户名</InputLabel>
                <OutlinedInput
                  id="username-login"
                  type="text"
                  value={account?.username}
                  name="username"
                  onChange={handleChange}
                  placeholder="用户名"
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-login">密码</InputLabel>
                <OutlinedInput
                  fullWidth
                  // error={Boolean(touched.password && errors.password)}
                  id="password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={account.password}
                  name="password"
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="输入密码"
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" alignItems="center">
                <Link variant="h6" component={RouterLink} to="" color="text.primary">
                  忘记密码?
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  // disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  登录
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      </Formik>
    </>
  );
};

export default AuthLogin;
