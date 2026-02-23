import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Redux
import { loginVendor } from '../../../features/auth/authThunk';
import { clearAuthMessages } from '../../../features/auth/authSlice';
import { selectAuthLoading, selectAuthError, selectIsAuthenticated } from '../../../features/auth/authSelectors';

export default function AuthLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Navigate to dashboard on successful login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isAuthenticated && token) navigate('/dashboard', { replace: true });
  }, [isAuthenticated]);

  // Cleanup on unmount
  useEffect(() => {
    return () => dispatch(clearAuthMessages());
  }, [dispatch]);

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(values.email)) newErrors.email = 'Enter a valid email';
    if (!values.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // ✅ Dynamic API call → POST /vendors/login/
    dispatch(loginVendor({ email: values.email, password: values.password }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {/* ─── API Error ──────────────────────────────────────────────────────── */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearAuthMessages())}>
          {typeof error === 'string' ? error : error?.detail || 'Invalid email or password.'}
        </Alert>
      )}

      {/* ─── Email ──────────────────────────────────────────────────────────── */}
      <FormControl fullWidth error={Boolean(errors.email)}>
        <InputLabel htmlFor="login-email">Email Address</InputLabel>
        <OutlinedInput
          id="login-email"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          label="Email Address"
          name="email"
        />
        {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
      </FormControl>

      {/* ─── Password ───────────────────────────────────────────────────────── */}
      <FormControl fullWidth error={Boolean(errors.password)} sx={{ mt: 2 }}>
        <InputLabel htmlFor="login-password">Password</InputLabel>
        <OutlinedInput
          id="login-password"
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          name="password"
          label="Password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((s) => !s)} onMouseDown={(e) => e.preventDefault()} edge="end" size="large">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
      </FormControl>

      {/* ─── Remember me + Forgot password ─────────────────────────────────── */}
      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} name="checked" color="primary" />}
            label="Keep me logged in"
          />
        </Grid>
        <Grid>
          <Typography variant="subtitle1" component={Link} to="#!" sx={{ textDecoration: 'none', color: 'secondary.main' }}>
            Forgot Password?
          </Typography>
        </Grid>
      </Grid>

      {/* ─── Submit ─────────────────────────────────────────────────────────── */}
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button
            color="secondary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading && <CircularProgress size={18} color="inherit" />}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </AnimateButton>
      </Box>
    </Box>
  );
}
