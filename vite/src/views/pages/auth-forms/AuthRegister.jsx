import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// MUI
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// Redux
import { registerVendor } from '../../../features/auth/authThunk';
import { clearAuthMessages } from '../../../features/auth/authSlice';
import { selectAuthLoading, selectAuthError, selectAuthSuccess, selectIsAuthenticated } from '../../../features/auth/authSelectors';

export default function AuthRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const successMessage = useSelector(selectAuthSuccess);

  const [values, setValues] = useState({
    name: '',
    // lastName: '',
    email: '',
    password: '',
    name: '', // ← new
    mobile: '', // ← new
    business_name: '', // ← new
    vat_number: '' // ← new
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  // ✅ Redirect to /login after successful registration
  useEffect(() => {
    if (successMessage) navigate('/login', { replace: true });
  }, [successMessage, navigate]);

  useEffect(() => {
    return () => dispatch(clearAuthMessages());
  }, [dispatch]);

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    if (field === 'password') changePassword(e.target.value);
  };

  const validate = () => {
    const newErrors = {};
    // if (!values.firstName) newErrors.firstName = 'First name is required';
    // if (!values.lastName) newErrors.lastName = 'Last name is required';
    if (!values.name) newErrors.name = 'Full name is required';
    if (!values.mobile) newErrors.mobile = 'Mobile number is required';
    if (!values.business_name) newErrors.business_name = 'Business name is required';
    if (!values.vat_number) newErrors.vat_number = 'VAT number is required';
    if (!values.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(values.email)) newErrors.email = 'Enter a valid email';
    if (!values.password) newErrors.password = 'Password is required';
    else if (values.password.length < 6) newErrors.password = 'Minimum 6 characters';
    if (!checked) newErrors.checked = 'Please accept Terms & Conditions';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(
      registerVendor({
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        name: values.name, // ← new
        mobile: values.mobile, // ← new
        business_name: values.business_name, // ← new
        vat_number: values.vat_number // ← new
      })
    );
  };

  // ─── Helper to show API field errors ──────────────────────────────────────
  const apiError = (field) => {
    if (error && typeof error === 'object' && error[field]) {
      return error[field][0]; // e.g. "This field is required."
    }
    return null;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isAuthenticated && token) navigate('/', { replace: true });
  }, [isAuthenticated]);

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack sx={{ mb: 2, alignItems: 'center' }}>
        <Typography variant="subtitle1">Sign up with Email address</Typography>
      </Stack>

      {/* ─── Generic API Error ────────────────────────────────────────────── */}
      {error && typeof error === 'string' && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearAuthMessages())}>
          {error}
        </Alert>
      )}
      {error?.detail && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearAuthMessages())}>
          {error.detail}
        </Alert>
      )}

      {/* ─── First / Last Name ────────────────────────────────────────────── */}
      {/* <Grid container spacing={{ xs: 0, sm: 2 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth error={Boolean(errors.firstName || apiError('first_name'))} sx={{ mb: 2 }}>
            <InputLabel htmlFor="reg-first">First Name</InputLabel>
            <OutlinedInput id="reg-first" value={values.firstName} onChange={handleChange('firstName')} label="First Name" />
            <FormHelperText>{errors.firstName || apiError('first_name')}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth error={Boolean(errors.lastName || apiError('last_name'))} sx={{ mb: 2 }}>
            <InputLabel htmlFor="reg-last">Last Name</InputLabel>
            <OutlinedInput id="reg-last" value={values.lastName} onChange={handleChange('lastName')} label="Last Name" />
            <FormHelperText>{errors.lastName || apiError('last_name')}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid> */}

      {/* ─── Full Name ────────────────────────────────────────────────────── */}
      <FormControl fullWidth error={Boolean(errors.name || apiError('name'))} sx={{ mb: 2 }}>
        <InputLabel htmlFor="reg-name">Full Name</InputLabel>
        <OutlinedInput id="reg-name" value={values.name} onChange={handleChange('name')} label="Full Name" />
        <FormHelperText>{errors.name || apiError('name')}</FormHelperText>
      </FormControl>

      {/* ─── Mobile ───────────────────────────────────────────────────────── */}
      <FormControl fullWidth error={Boolean(errors.mobile || apiError('mobile'))} sx={{ mb: 2 }}>
        <InputLabel htmlFor="reg-mobile">Mobile Number</InputLabel>
        <OutlinedInput id="reg-mobile" type="tel" value={values.mobile} onChange={handleChange('mobile')} label="Mobile Number" />
        <FormHelperText>{errors.mobile || apiError('mobile')}</FormHelperText>
      </FormControl>

      {/* ─── Business Name ────────────────────────────────────────────────── */}
      <FormControl fullWidth error={Boolean(errors.business_name || apiError('business_name'))} sx={{ mb: 2 }}>
        <InputLabel htmlFor="reg-business">Business Name</InputLabel>
        <OutlinedInput id="reg-business" value={values.business_name} onChange={handleChange('business_name')} label="Business Name" />
        <FormHelperText>{errors.business_name || apiError('business_name')}</FormHelperText>
      </FormControl>

      {/* ─── VAT Number ───────────────────────────────────────────────────── */}
      <FormControl fullWidth error={Boolean(errors.vat_number || apiError('vat_number'))} sx={{ mb: 2 }}>
        <InputLabel htmlFor="reg-vat">VAT Number</InputLabel>
        <OutlinedInput id="reg-vat" value={values.vat_number} onChange={handleChange('vat_number')} label="VAT Number" />
        <FormHelperText>{errors.vat_number || apiError('vat_number')}</FormHelperText>
      </FormControl>

      {/* ─── Email ────────────────────────────────────────────────────────── */}
      <FormControl fullWidth error={Boolean(errors.email || apiError('email'))} sx={{ mb: 2 }}>
        <InputLabel htmlFor="reg-email">Email Address</InputLabel>
        <OutlinedInput id="reg-email" type="email" value={values.email} onChange={handleChange('email')} label="Email Address" />
        <FormHelperText>{errors.email || apiError('email')}</FormHelperText>
      </FormControl>

      {/* ─── Password ─────────────────────────────────────────────────────── */}
      <FormControl fullWidth error={Boolean(errors.password || apiError('password'))} sx={{ mb: 2 }}>
        <InputLabel htmlFor="reg-password">Password</InputLabel>
        <OutlinedInput
          id="reg-password"
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          label="Password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" size="large">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>{errors.password || apiError('password')}</FormHelperText>
      </FormControl>

      {/* ─── Password Strength ────────────────────────────────────────────── */}
      {strength !== 0 && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
            <Box sx={{ width: 85, height: 8, borderRadius: '7px', bgcolor: level?.color }} />
            <Typography variant="subtitle1" sx={{ fontSize: '0.75rem' }}>
              {level?.label}
            </Typography>
          </Stack>
        </FormControl>
      )}

      {/* ─── Terms ────────────────────────────────────────────────────────── */}
      <FormControl error={Boolean(errors.checked)}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
                setErrors((prev) => ({ ...prev, checked: '' }));
              }}
              color="primary"
            />
          }
          label={
            <Typography variant="subtitle1">
              Agree with&nbsp;
              <Typography variant="subtitle1" component={Link} to="#" sx={{ color: 'secondary.main' }}>
                Terms & Conditions
              </Typography>
            </Typography>
          }
        />
        {errors.checked && <FormHelperText>{errors.checked}</FormHelperText>}
      </FormControl>

      {/* ─── Submit ───────────────────────────────────────────────────────── */}
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button
            disableElevation
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
            disabled={loading}
            startIcon={loading && <CircularProgress size={18} color="inherit" />}
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </Button>
        </AnimateButton>
      </Box>
    </Box>
  );
}
