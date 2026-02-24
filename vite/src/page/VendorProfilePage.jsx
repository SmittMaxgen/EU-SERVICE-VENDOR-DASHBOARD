// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// // MUI
// import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Chip from '@mui/material/Chip';
// import CircularProgress from '@mui/material/CircularProgress';
// import Divider from '@mui/material/Divider';
// import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
// import Grid from '@mui/material/Grid';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Alert from '@mui/material/Alert';
// import { useTheme } from '@mui/material/styles';

// // Icons
// import EditIcon from '@mui/icons-material/Edit';
// import LogoutIcon from '@mui/icons-material/Logout';
// import PersonIcon from '@mui/icons-material/Person';
// import BusinessIcon from '@mui/icons-material/Business';
// import LockIcon from '@mui/icons-material/Lock';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import SaveIcon from '@mui/icons-material/Save';
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
// import BadgeIcon from '@mui/icons-material/Badge';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';
// import AnimateButton from 'ui-component/extended/AnimateButton';

// // Redux — Auth
// import { logoutVendor } from '../features/auth/authThunk';

// // Redux — Vendor
// import { fetchVendorById, updateVendor } from '../features/vendorProfile/vendorProfileThunk';
// import { clearVendorMessages } from '../features/vendorProfile/vendorProfileSlice';
// import {
//   selectSelectedVendor,
//   selectVendorLoading,
//   selectVendorError,
//   selectVendorSuccess
// } from '../features/vendorProfile/vendorProfileSelectors';

// // ─── Status chip color map ────────────────────────────────────────────────────
// const statusColor = {
//   approved: 'success',
//   pending: 'warning',
//   rejected: 'error',
//   suspended: 'default'
// };

// const BASE_URL = 'https://serviceapp.pythonanywhere.com';

// // ==============================|| PROFILE PAGE ||============================== //

// export default function ProfilePage() {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const vendorData = useSelector(selectSelectedVendor);
//   console.log('vendorData', vendorData);
//   const loading = useSelector(selectVendorLoading);
//   const apiError = useSelector(selectVendorError);
//   const successMsg = useSelector(selectVendorSuccess);

//   const [activeTab, setActiveTab] = useState('personal');
//   const [editMode, setEditMode] = useState(false);
//   const [showOldPw, setShowOldPw] = useState(false);
//   const [showNewPw, setShowNewPw] = useState(false);
//   const [showConfPw, setShowConfPw] = useState(false);

//   const [profile, setProfile] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     business_name: '',
//     vat_number: '',
//     business_registration_number: '',
//     iban: '',
//     stripe_account_id: '',
//     commission_percentage: '',
//     status: '',
//     profilepic: null, // file upload
//     business_logo: null // file upload
//   });

//   const [passwords, setPasswords] = useState({
//     old_password: '',
//     new_password: '',
//     confirm_password: ''
//   });
//   const [pwErrors, setPwErrors] = useState({});

//   // ─── Fetch profile on mount ────────────────────────────────────────────────
//   useEffect(() => {
//     dispatch(fetchVendorById());
//     return () => dispatch(clearVendorMessages());
//   }, [dispatch]);

//   // ─── Populate form when data arrives ──────────────────────────────────────
//   useEffect(() => {
//     if (vendorData) {
//       setProfile((prev) => ({
//         ...prev,
//         name: vendorData.data.name || '',
//         email: vendorData.data.email || '',
//         mobile: vendorData.data.mobile || '',
//         business_name: vendorData.data.business_name || '',
//         vat_number: vendorData.data.vat_number || '',
//         business_registration_number: vendorData.data.business_registration_number || '',
//         iban: vendorData.iban || '',
//         stripe_account_id: vendorData.data.stripe_account_id || '',
//         commission_percentage: vendorData.data.commission_percentage || '',
//         status: vendorData.data.status || ''
//       }));
//     }
//   }, [vendorData]);

//   // ─── Close edit + show success ────────────────────────────────────────────
//   useEffect(() => {
//     if (successMsg) {
//       setEditMode(false);
//       setTimeout(() => dispatch(clearVendorMessages()), 3000);
//     }
//   }, [successMsg, dispatch]);

//   const handleProfileChange = (field) => (e) => setProfile((prev) => ({ ...prev, [field]: e.target.value }));

//   const handleFileChange = (field) => (e) => setProfile((prev) => ({ ...prev, [field]: e.target.files[0] }));

//   const handlePwChange = (field) => (e) => {
//     setPasswords((prev) => ({ ...prev, [field]: e.target.value }));
//     setPwErrors((prev) => ({ ...prev, [field]: '' }));
//   };

//   // ─── PATCH /vendor/profile/{id}/ ──────────────────────────────────────────
//   const handleSaveProfile = () => {
//     const id = vendorData?.id;
//     if (!id) return;
//     dispatch(updateVendor({ id, data: profile }));
//   };

//   const validatePasswords = () => {
//     const errs = {};
//     if (!passwords.old_password) errs.old_password = 'Current password is required';
//     if (!passwords.new_password) errs.new_password = 'New password is required';
//     else if (passwords.new_password.length < 6) errs.new_password = 'Minimum 6 characters';
//     if (!passwords.confirm_password) errs.confirm_password = 'Please confirm new password';
//     else if (passwords.new_password !== passwords.confirm_password) errs.confirm_password = 'Passwords do not match';
//     setPwErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   const handleChangePassword = () => {
//     if (!validatePasswords()) return;
//     // dispatch(changePassword(passwords)); ← wire up when API ready
//     setPasswords({ old_password: '', new_password: '', confirm_password: '' });
//   };

//   const handleLogout = () => {
//     dispatch(logoutVendor());
//     navigate('/login', { replace: true });
//   };

//   // ─── Field-level API error helper ─────────────────────────────────────────
//   const fieldErr = (field) => (apiError && typeof apiError === 'object' && apiError[field] ? apiError[field][0] : null);

//   const tabs = [
//     { id: 'personal', label: 'Personal Info', icon: <PersonIcon fontSize="small" /> },
//     { id: 'business', label: 'Business Info', icon: <BusinessIcon fontSize="small" /> },
//     { id: 'banking', label: 'Banking & Billing', icon: <BadgeIcon fontSize="small" /> },
//     { id: 'password', label: 'Change Password', icon: <LockIcon fontSize="small" /> }
//   ];

//   const initials = profile.name
//     ? profile.name
//         .split(' ')
//         .map((n) => n[0])
//         .join('')
//         .toUpperCase()
//         .slice(0, 2)
//     : 'V';

//   const profilePicUrl = vendorData?.profilepic ? `${BASE_URL}${vendorData.profilepic}` : null;
//   const businessLogoUrl = vendorData?.business_logo ? `${BASE_URL}${vendorData.business_logo}` : null;

//   // ─── Full page loader ─────────────────────────────────────────────────────
//   if (loading && !vendorData) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
//         <CircularProgress color="secondary" />
//       </Box>
//     );
//   }

//   // ─── Save button — reused across tabs ─────────────────────────────────────
//   const SaveButton = () => (
//     <Box sx={{ mt: 3 }}>
//       <AnimateButton>
//         <Button
//           variant="contained"
//           color="secondary"
//           startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
//           onClick={handleSaveProfile}
//           disabled={loading}
//         >
//           {loading ? 'Saving...' : 'Save Changes'}
//         </Button>
//       </AnimateButton>
//     </Box>
//   );

//   // ─── Edit toggle button — reused across tabs ──────────────────────────────
//   const EditToggle = () => (
//     <Button
//       variant={editMode ? 'outlined' : 'contained'}
//       color="secondary"
//       startIcon={editMode ? null : <EditIcon />}
//       size="small"
//       onClick={() => setEditMode((m) => !m)}
//     >
//       {editMode ? 'Cancel' : 'Edit'}
//     </Button>
//   );

//   return (
//     <Box>
//       {/* ─── Header Banner ──────────────────────────────────────────────────── */}
//       <Box
//         sx={{
//           background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
//           borderRadius: 3,
//           p: 3,
//           mb: 3,
//           position: 'relative',
//           overflow: 'hidden',
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: -40,
//             right: -40,
//             width: 180,
//             height: 180,
//             borderRadius: '50%',
//             background: 'rgba(255,255,255,0.08)'
//           },
//           '&::after': {
//             content: '""',
//             position: 'absolute',
//             bottom: -60,
//             right: 80,
//             width: 120,
//             height: 120,
//             borderRadius: '50%',
//             background: 'rgba(255,255,255,0.05)'
//           }
//         }}
//       >
//         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
//           {/* Avatar */}
//           <Box sx={{ position: 'relative' }}>
//             <Avatar
//               src={profilePicUrl}
//               sx={{
//                 width: 90,
//                 height: 90,
//                 bgcolor: 'rgba(255,255,255,0.2)',
//                 color: '#fff',
//                 fontSize: 32,
//                 fontWeight: 700,
//                 border: '3px solid rgba(255,255,255,0.4)'
//               }}
//             >
//               {!profilePicUrl && initials}
//             </Avatar>
//             <IconButton
//               size="small"
//               component="label"
//               sx={{
//                 position: 'absolute',
//                 bottom: 0,
//                 right: 0,
//                 bgcolor: '#fff',
//                 color: theme.palette.secondary.main,
//                 width: 28,
//                 height: 28,
//                 '&:hover': { bgcolor: '#f0f0f0' }
//               }}
//             >
//               <CameraAltIcon sx={{ fontSize: 14 }} />
//               <input hidden accept="image/*" type="file" onChange={handleFileChange('profilepic')} />
//             </IconButton>
//           </Box>

//           {/* Info */}
//           <Box sx={{ flex: 1 }}>
//             <Typography variant="h3" sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}>
//               {profile.name || 'Vendor Profile'}
//             </Typography>
//             <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
//               {profile.email}
//             </Typography>
//             <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
//               {profile.mobile && (
//                 <Chip label={profile.mobile} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.7rem' }} />
//               )}
//               {profile.business_name && (
//                 <Chip
//                   label={profile.business_name}
//                   size="small"
//                   sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.7rem' }}
//                 />
//               )}
//               {profile.status && (
//                 <Chip
//                   label={profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
//                   size="small"
//                   color={statusColor[profile.status] || 'default'}
//                   sx={{ fontSize: '0.7rem' }}
//                 />
//               )}
//             </Stack>
//           </Box>

//           {/* Logout */}
//           <AnimateButton>
//             <Button
//               variant="outlined"
//               startIcon={<LogoutIcon />}
//               onClick={handleLogout}
//               sx={{
//                 color: '#fff',
//                 borderColor: 'rgba(255,255,255,0.5)',
//                 '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' }
//               }}
//             >
//               Logout
//             </Button>
//           </AnimateButton>
//         </Stack>
//       </Box>

//       <Grid>
//         {/* ─── Left Tabs ──────────────────────────────────────────────────── */}
//         <Grid item xs={12} md={3}>
//           <MainCard>
//             <Box sx={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
//               {tabs.map((tab, idx) => (
//                 <Box key={tab.id} sx={{ display: 'flex', alignItems: 'center' }}>
//                   <Box
//                     onClick={() => {
//                       setActiveTab(tab.id);
//                       setEditMode(false);
//                     }}
//                     sx={{
//                       px: 2.5,
//                       py: 2,
//                       cursor: 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: 1.5,
//                       whiteSpace: 'nowrap',
//                       bgcolor: activeTab === tab.id ? theme.palette.secondary.light : 'transparent',
//                       borderBottom: activeTab === tab.id ? `3px solid ${theme.palette.secondary.main}` : '3px solid transparent',
//                       transition: 'all 0.2s',
//                       '&:hover': {
//                         bgcolor: activeTab === tab.id ? theme.palette.secondary.light : theme.palette.grey[50]
//                       }
//                     }}
//                   >
//                     <Box sx={{ color: activeTab === tab.id ? theme.palette.secondary.main : theme.palette.text.secondary }}>{tab.icon}</Box>
//                     <Typography
//                       variant="body1"
//                       sx={{
//                         fontWeight: activeTab === tab.id ? 600 : 400,
//                         color: activeTab === tab.id ? theme.palette.secondary.main : theme.palette.text.primary
//                       }}
//                     >
//                       {tab.label}
//                     </Typography>
//                   </Box>
//                   {idx < tabs.length - 1 && <Divider orientation="vertical" flexItem />}
//                 </Box>
//               ))}
//             </Box>
//           </MainCard>
//         </Grid>
//         {/* ─── Right Content ───────────────────────────────────────────────── */}
//         <Grid width="100%" item xs={12} md={9}>
//           <MainCard>
//             {/* Alerts */}
//             {successMsg && (
//               <Alert severity="success" sx={{ mb: 2 }} onClose={() => dispatch(clearVendorMessages())}>
//                 {successMsg}
//               </Alert>
//             )}
//             {apiError && typeof apiError === 'string' && (
//               <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearVendorMessages())}>
//                 {apiError}
//               </Alert>
//             )}

//             {/* ══ Personal Info ═══════════════════════════════════════════════ */}
//             {activeTab === 'personal' && (
//               <Box>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//                   <Box>
//                     <Typography variant="h4">Personal Information</Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       Manage your personal details
//                     </Typography>
//                   </Box>
//                   <EditToggle />
//                 </Stack>

//                 <Grid container spacing={2.5}>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth error={Boolean(fieldErr('name'))}>
//                       <InputLabel>Full Name</InputLabel>
//                       <OutlinedInput value={profile.name} onChange={handleProfileChange('name')} label="Full Name" disabled={!editMode} />
//                       {fieldErr('name') && <FormHelperText>{fieldErr('name')}</FormHelperText>}
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth error={Boolean(fieldErr('mobile'))}>
//                       <InputLabel>Mobile Number</InputLabel>
//                       <OutlinedInput
//                         value={profile.mobile}
//                         onChange={handleProfileChange('mobile')}
//                         label="Mobile Number"
//                         disabled={!editMode}
//                       />
//                       {fieldErr('mobile') && <FormHelperText>{fieldErr('mobile')}</FormHelperText>}
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <FormControl fullWidth error={Boolean(fieldErr('email'))}>
//                       <InputLabel>Email Address</InputLabel>
//                       <OutlinedInput
//                         value={profile.email}
//                         onChange={handleProfileChange('email')}
//                         label="Email Address"
//                         type="email"
//                         disabled={!editMode}
//                       />
//                       {fieldErr('email') && <FormHelperText>{fieldErr('email')}</FormHelperText>}
//                     </FormControl>
//                   </Grid>

//                   {/* Profile pic preview + upload */}
//                   <Grid item xs={12}>
//                     <Stack direction="row" spacing={2} alignItems="center">
//                       {profilePicUrl && <Avatar src={profilePicUrl} sx={{ width: 56, height: 56 }} />}
//                       {editMode && (
//                         <Button variant="outlined" color="secondary" component="label" startIcon={<CameraAltIcon />}>
//                           Upload Photo
//                           <input hidden accept="image/*" type="file" onChange={handleFileChange('profilepic')} />
//                         </Button>
//                       )}
//                       {profile.profilepic instanceof File && (
//                         <Typography variant="caption" color="text.secondary">
//                           {profile.profilepic.name}
//                         </Typography>
//                       )}
//                     </Stack>
//                   </Grid>
//                 </Grid>

//                 {editMode && <SaveButton />}
//               </Box>
//             )}

//             {/* ══ Business Info ════════════════════════════════════════════════ */}
//             {activeTab === 'business' && (
//               <Box>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//                   <Box>
//                     <Typography variant="h4">Business Information</Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       Manage your business details
//                     </Typography>
//                   </Box>
//                   <EditToggle />
//                 </Stack>

//                 <Grid container spacing={2.5}>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth error={Boolean(fieldErr('business_name'))}>
//                       <InputLabel>Business Name</InputLabel>
//                       <OutlinedInput
//                         value={profile.business_name}
//                         onChange={handleProfileChange('business_name')}
//                         label="Business Name"
//                         disabled={!editMode}
//                       />
//                       {fieldErr('business_name') && <FormHelperText>{fieldErr('business_name')}</FormHelperText>}
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth error={Boolean(fieldErr('vat_number'))}>
//                       <InputLabel>VAT Number</InputLabel>
//                       <OutlinedInput
//                         value={profile.vat_number}
//                         onChange={handleProfileChange('vat_number')}
//                         label="VAT Number"
//                         disabled={!editMode}
//                       />
//                       {fieldErr('vat_number') && <FormHelperText>{fieldErr('vat_number')}</FormHelperText>}
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth error={Boolean(fieldErr('business_registration_number'))}>
//                       <InputLabel>Business Registration No.</InputLabel>
//                       <OutlinedInput
//                         value={profile.business_registration_number}
//                         onChange={handleProfileChange('business_registration_number')}
//                         label="Business Registration No."
//                         disabled={!editMode}
//                       />
//                       {fieldErr('business_registration_number') && (
//                         <FormHelperText>{fieldErr('business_registration_number')}</FormHelperText>
//                       )}
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     {/* Commission is read-only — set by admin */}
//                     <FormControl fullWidth>
//                       <InputLabel>Commission %</InputLabel>
//                       <OutlinedInput value={profile.commission_percentage} label="Commission %" disabled />
//                     </FormControl>
//                   </Grid>

//                   {/* Business logo preview + upload */}
//                   <Grid item xs={12}>
//                     <Stack direction="row" spacing={2} alignItems="center">
//                       {businessLogoUrl && <Avatar src={businessLogoUrl} variant="rounded" sx={{ width: 56, height: 56 }} />}
//                       {editMode && (
//                         <Button variant="outlined" color="secondary" component="label" startIcon={<BusinessIcon />}>
//                           Upload Logo
//                           <input hidden accept="image/*" type="file" onChange={handleFileChange('business_logo')} />
//                         </Button>
//                       )}
//                       {profile.business_logo instanceof File && (
//                         <Typography variant="caption" color="text.secondary">
//                           {profile.business_logo.name}
//                         </Typography>
//                       )}
//                     </Stack>
//                   </Grid>
//                 </Grid>

//                 {editMode && <SaveButton />}
//               </Box>
//             )}

//             {/* ══ Banking & Billing ════════════════════════════════════════════ */}
//             {activeTab === 'banking' && (
//               <Box>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//                   <Box>
//                     <Typography variant="h4">Banking & Billing</Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       Manage your payment details
//                     </Typography>
//                   </Box>
//                   <EditToggle />
//                 </Stack>

//                 <Grid container spacing={2.5}>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth error={Boolean(fieldErr('iban'))}>
//                       <InputLabel>IBAN</InputLabel>
//                       <OutlinedInput value={profile.iban} onChange={handleProfileChange('iban')} label="IBAN" disabled={!editMode} />
//                       {fieldErr('iban') && <FormHelperText>{fieldErr('iban')}</FormHelperText>}
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     {/* Stripe ID is read-only — set by system */}
//                     <FormControl fullWidth>
//                       <InputLabel>Stripe Account ID</InputLabel>
//                       <OutlinedInput value={profile.stripe_account_id} label="Stripe Account ID" disabled />
//                     </FormControl>
//                   </Grid>
//                 </Grid>

//                 {editMode && <SaveButton />}
//               </Box>
//             )}

//             {/* ══ Change Password ══════════════════════════════════════════════ */}
//             {activeTab === 'password' && (
//               <Box>
//                 <Box mb={3}>
//                   <Typography variant="h4">Change Password</Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Update your account password
//                   </Typography>
//                 </Box>
//                 <Grid container spacing={2.5}>
//                   <Grid item xs={12}>
//                     <FormControl fullWidth error={Boolean(pwErrors.old_password)}>
//                       <InputLabel>Current Password</InputLabel>
//                       <OutlinedInput
//                         type={showOldPw ? 'text' : 'password'}
//                         value={passwords.old_password}
//                         onChange={handlePwChange('old_password')}
//                         label="Current Password"
//                         endAdornment={
//                           <InputAdornment position="end">
//                             <IconButton onClick={() => setShowOldPw((s) => !s)} edge="end">
//                               {showOldPw ? <Visibility /> : <VisibilityOff />}
//                             </IconButton>
//                           </InputAdornment>
//                         }
//                       />
//                       {pwErrors.old_password && <FormHelperText>{pwErrors.old_password}</FormHelperText>}
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth error={Boolean(pwErrors.new_password)}>
//                       <InputLabel>New Password</InputLabel>
//                       <OutlinedInput
//                         type={showNewPw ? 'text' : 'password'}
//                         value={passwords.new_password}
//                         onChange={handlePwChange('new_password')}
//                         label="New Password"
//                         endAdornment={
//                           <InputAdornment position="end">
//                             <IconButton onClick={() => setShowNewPw((s) => !s)} edge="end">
//                               {showNewPw ? <Visibility /> : <VisibilityOff />}
//                             </IconButton>
//                           </InputAdornment>
//                         }
//                       />
//                       {pwErrors.new_password && <FormHelperText>{pwErrors.new_password}</FormHelperText>}
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth error={Boolean(pwErrors.confirm_password)}>
//                       <InputLabel>Confirm New Password</InputLabel>
//                       <OutlinedInput
//                         type={showConfPw ? 'text' : 'password'}
//                         value={passwords.confirm_password}
//                         onChange={handlePwChange('confirm_password')}
//                         label="Confirm New Password"
//                         endAdornment={
//                           <InputAdornment position="end">
//                             <IconButton onClick={() => setShowConfPw((s) => !s)} edge="end">
//                               {showConfPw ? <Visibility /> : <VisibilityOff />}
//                             </IconButton>
//                           </InputAdornment>
//                         }
//                       />
//                       {pwErrors.confirm_password && <FormHelperText>{pwErrors.confirm_password}</FormHelperText>}
//                     </FormControl>
//                   </Grid>
//                 </Grid>
//                 <Box sx={{ mt: 3 }}>
//                   <AnimateButton>
//                     <Button variant="contained" color="secondary" startIcon={<LockIcon />} onClick={handleChangePassword}>
//                       Update Password
//                     </Button>
//                   </AnimateButton>
//                 </Box>
//               </Box>
//             )}
//           </MainCard>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// MUI
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SaveIcon from '@mui/icons-material/Save';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import BadgeIcon from '@mui/icons-material/Badge';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

// Redux — Auth
import { logoutVendor } from '../features/auth/authThunk';

// Redux — Vendor Profile
import { fetchVendorById, updateVendor } from '../features/vendorProfile/vendorProfileThunk';
import { clearVendorMessages } from '../features/vendorProfile/vendorProfileSlice';
import {
  selectSelectedVendor,
  selectVendorLoading,
  selectVendorError,
  selectVendorSuccess
} from '../features/vendorProfile/vendorProfileSelectors';

// Redux — Vendor Documents
import {
  fetchVendorDocuments,
  createVendorDocument,
  updateVendorDocument,
  deleteVendorDocument
} from '../features/vendorDocument/vendorDocumentThunk';
import { clearDocumentMessages, setSelectedDocument, clearSelectedDocument } from '../features/vendorDocument/vendorDocumentSlice';
import {
  selectAllDocuments,
  selectDocumentLoading,
  selectDocumentError,
  selectDocumentSuccess
} from '../features/vendorDocument/vendorDocumentSelectors';

// ─── Constants ────────────────────────────────────────────────────────────────
const DOCUMENT_TYPES = [
  { value: 'government_id', label: 'Government ID' },
  { value: 'passport', label: 'Passport' },
  { value: 'national_id', label: 'National ID' },
  { value: 'driving_license', label: 'Driving License' },
  { value: 'business_registration', label: 'Business Registration' },
  { value: 'vat_certificate', label: 'VAT Certificate' },
  { value: 'tax_id_document', label: 'Tax ID Document' },
  { value: 'address_proof', label: 'Address Proof' },
  { value: 'bank_proof', label: 'Bank Proof' },
  { value: 'other', label: 'Other' }
];

const VERIFICATION_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'warning' },
  { value: 'approved', label: 'Approved', color: 'success' },
  { value: 'rejected', label: 'Rejected', color: 'error' }
];

const statusColor = {
  approved: 'success',
  pending: 'warning',
  rejected: 'error',
  suspended: 'default'
};

const BASE_URL = 'https://serviceapp.pythonanywhere.com';

// ==============================|| PROFILE PAGE ||============================== //

export default function ProfilePage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const EMPTY_DOC_FORM = {
    document_type: '',
    document_number: '',
    document_file: null,
    vendor_id: id
  };

  // ─── Vendor Profile ───────────────────────────────────────────────────────
  const vendorData = useSelector(selectSelectedVendor);
  const loading = useSelector(selectVendorLoading);
  const apiError = useSelector(selectVendorError);
  const successMsg = useSelector(selectVendorSuccess);

  // ─── Vendor Documents ─────────────────────────────────────────────────────
  const documents = useSelector(selectAllDocuments);
  const docLoading = useSelector(selectDocumentLoading);
  const docError = useSelector(selectDocumentError);
  const docSuccess = useSelector(selectDocumentSuccess);

  // ─── UI State ─────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  const [showOldPw, setShowOldPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfPw, setShowConfPw] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // ─── Doc Dialog ───────────────────────────────────────────────────────────
  const [docDialogOpen, setDocDialogOpen] = useState(false);
  const [isEditingDoc, setIsEditingDoc] = useState(false);
  const [docForm, setDocForm] = useState(EMPTY_DOC_FORM);
  const [docFormErrors, setDocFormErrors] = useState({});
  const [editingDocId, setEditingDocId] = useState(null);

  // ─── Profile Form ─────────────────────────────────────────────────────────
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    mobile: '',
    business_name: '',
    vat_number: '',
    business_registration_number: '',
    iban: '',
    stripe_account_id: '',
    commission_percentage: '',
    status: '',
    profilepic: null,
    business_logo: null
  });

  const [passwords, setPasswords] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [pwErrors, setPwErrors] = useState({});

  // ─── Fetch on mount ───────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(fetchVendorById());
    dispatch(fetchVendorDocuments());
    return () => {
      dispatch(clearVendorMessages());
      dispatch(clearDocumentMessages());
    };
  }, [dispatch]);
  // ─── Document success / error ─────────────────────────────────────────────
  useEffect(() => {
    if (docSuccess) {
      setSnackbar({ open: true, message: docSuccess, severity: 'success' });
      setDocDialogOpen(false);
      setDocForm(EMPTY_DOC_FORM);
      setDocFormErrors({});
      dispatch(clearDocumentMessages());
      dispatch(fetchVendorDocuments()); // ✅ re-fetch after any create/update/delete
    }
    if (docError) {
      setSnackbar({
        open: true,
        message: typeof docError === 'string' ? docError : 'Something went wrong',
        severity: 'error'
      });
      dispatch(clearDocumentMessages());
    }
  }, [docSuccess, docError, dispatch]);

  // ─── Populate profile form ────────────────────────────────────────────────
  useEffect(() => {
    if (vendorData) {
      const d = vendorData.data || vendorData;
      setProfile((prev) => ({
        ...prev,
        name: d.name || '',
        email: d.email || '',
        mobile: d.mobile || '',
        business_name: d.business_name || '',
        vat_number: d.vat_number || '',
        business_registration_number: d.business_registration_number || '',
        iban: d.iban || '',
        stripe_account_id: d.stripe_account_id || '',
        commission_percentage: d.commission_percentage || '',
        status: d.status || ''
      }));
    }
  }, [vendorData]);

  // ─── Profile success ──────────────────────────────────────────────────────
  useEffect(() => {
    if (successMsg) {
      setEditMode(false);
      setSnackbar({ open: true, message: successMsg, severity: 'success' });
      setTimeout(() => dispatch(clearVendorMessages()), 3000);
    }
  }, [successMsg, dispatch]);

  // ─── Document success / error ─────────────────────────────────────────────
  useEffect(() => {
    if (docSuccess) {
      setSnackbar({ open: true, message: docSuccess, severity: 'success' });
      setDocDialogOpen(false);
      setDocForm(EMPTY_DOC_FORM);
      setDocFormErrors({});
      dispatch(clearDocumentMessages());
    }
    if (docError) {
      setSnackbar({
        open: true,
        message: typeof docError === 'string' ? docError : 'Something went wrong',
        severity: 'error'
      });
      dispatch(clearDocumentMessages());
    }
  }, [docSuccess, docError, dispatch]);

  // ─── Handlers — Profile ───────────────────────────────────────────────────
  const handleProfileChange = (field) => (e) => setProfile((prev) => ({ ...prev, [field]: e.target.value }));

  const handleFileChange = (field) => (e) => setProfile((prev) => ({ ...prev, [field]: e.target.files[0] }));

  const handleSaveProfile = () => {
    const d = vendorData?.data || vendorData;
    const id = d?.id;
    if (!id) return;
    dispatch(updateVendor({ id, data: profile }));
  };

  // ─── Handlers — Password ──────────────────────────────────────────────────
  const handlePwChange = (field) => (e) => {
    setPasswords((prev) => ({ ...prev, [field]: e.target.value }));
    setPwErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validatePasswords = () => {
    const errs = {};
    if (!passwords.old_password) errs.old_password = 'Current password is required';
    if (!passwords.new_password) errs.new_password = 'New password is required';
    else if (passwords.new_password.length < 6) errs.new_password = 'Minimum 6 characters';
    if (!passwords.confirm_password) errs.confirm_password = 'Please confirm new password';
    else if (passwords.new_password !== passwords.confirm_password) errs.confirm_password = 'Passwords do not match';
    setPwErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChangePassword = () => {
    if (!validatePasswords()) return;
    setPasswords({ old_password: '', new_password: '', confirm_password: '' });
  };

  // ─── Handlers — Documents ─────────────────────────────────────────────────
  const validateDocForm = () => {
    const errs = {};
    if (!docForm.document_type) errs.document_type = 'Document type is required';
    if (!docForm.document_number) errs.document_number = 'Document number is required';
    if (!isEditingDoc && !docForm.document_file) errs.document_file = 'Please upload a document file';
    setDocFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleOpenCreateDoc = () => {
    setIsEditingDoc(false);
    setEditingDocId(null);
    setDocForm(EMPTY_DOC_FORM);
    setDocFormErrors({});
    setDocDialogOpen(true);
  };

  const handleStatusChange = (docId, newStatus) => {
    dispatch(updateVendorDocument({ id: docId, data: { verification_status: newStatus } }));
  };

  const handleOpenEditDoc = (doc) => {
    setIsEditingDoc(true);
    setEditingDocId(doc.id);
    setDocForm({
      document_type: doc.document_type || '',
      document_number: doc.document_number || '',
      document_file: null
    });
    setDocFormErrors({});
    setDocDialogOpen(true);
  };

  const handleDocFileChange = (e) => {
    setDocForm((prev) => ({ ...prev, document_file: e.target.files[0] }));
    setDocFormErrors((prev) => ({ ...prev, document_file: '' }));
  };

  const handleDocSubmit = () => {
    if (!validateDocForm()) return;
    if (isEditingDoc) {
      dispatch(updateVendorDocument({ id: editingDocId, data: docForm }));
    } else {
      dispatch(createVendorDocument(docForm));
    }
  };

  const handleDeleteDoc = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      dispatch(deleteVendorDocument(id));
    }
  };

  const handleLogout = () => {
    dispatch(logoutVendor());
    navigate('/login', { replace: true });
  };

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const fieldErr = (field) => (apiError && typeof apiError === 'object' && apiError[field] ? apiError[field][0] : null);

  const getDocTypeLabel = (value) => DOCUMENT_TYPES.find((d) => d.value === value)?.label || value;

  const getStatusChipColor = (status) => VERIFICATION_STATUSES.find((s) => s.value === status)?.color || 'default';

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <PersonIcon fontSize="small" /> },
    { id: 'business', label: 'Business Info', icon: <BusinessIcon fontSize="small" /> },
    { id: 'banking', label: 'Banking & Billing', icon: <BadgeIcon fontSize="small" /> },
    { id: 'documents', label: 'Documents', icon: <DescriptionIcon fontSize="small" /> },
    { id: 'password', label: 'Change Password', icon: <LockIcon fontSize="small" /> }
  ];

  const initials = profile.name
    ? profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'V';

  const profilePicUrl = vendorData?.data?.profilepic ? `${BASE_URL}${vendorData?.data?.profilepic}` : null;
  const businessLogoUrl = vendorData?.data?.business_logo ? `${BASE_URL}${vendorData?.data?.business_logo}` : null;
  if (loading && !vendorData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  // ─── Reusable sub-components ──────────────────────────────────────────────
  const SaveButton = () => (
    <Box sx={{ mt: 3 }}>
      <AnimateButton>
        <Button
          variant="contained"
          color="secondary"
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
          onClick={handleSaveProfile}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </AnimateButton>
    </Box>
  );

  const EditToggle = () => (
    <Button
      variant={editMode ? 'outlined' : 'contained'}
      color="secondary"
      startIcon={editMode ? null : <EditIcon />}
      size="small"
      onClick={() => setEditMode((m) => !m)}
    >
      {editMode ? 'Cancel' : 'Edit'}
    </Button>
  );

  return (
    <Box>
      {/* ─── Header Banner ──────────────────────────────────────────────────── */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
          borderRadius: 3,
          p: 3,
          mb: 3,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -40,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -60,
            right: 80,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)'
          }
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={businessLogoUrl}
              sx={{
                width: 90,
                height: 90,
                bgcolor: 'rgba(255,255,255,0.2)',
                color: '#fff',
                fontSize: 32,
                fontWeight: 700,
                border: '3px solid rgba(255,255,255,0.4)'
              }}
            >
              {!businessLogoUrl && initials}
            </Avatar>
            <IconButton
              size="small"
              component="label"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: '#fff',
                color: theme.palette.secondary.main,
                width: 28,
                height: 28,
                '&:hover': { bgcolor: '#f0f0f0' }
              }}
            >
              <CameraAltIcon sx={{ fontSize: 14 }} />
              <input hidden accept="image/*" type="file" onChange={handleFileChange('profilepic')} />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}>
              {profile.name || 'Vendor Profile'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
              {profile.email}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {profile.mobile && (
                <Chip label={profile.mobile} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.7rem' }} />
              )}
              {profile.business_name && (
                <Chip
                  label={profile.business_name}
                  size="small"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.7rem' }}
                />
              )}
              {/* {profile.status && (
                <Chip
                  label={profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
                  size="small"
                  color={statusColor[profile.status] || 'default'}
                  sx={{ fontSize: '0.7rem' }}
                />
              )} */}
              {profile.status && (
                <Select
                  value={profile.status}
                  size="small"
                  onChange={(e) => {
                    const d = vendorData?.data || vendorData;
                    dispatch(updateVendor({ id: d?.id, data: { status: e.target.value } }));
                  }}
                  renderValue={(value) => (
                    <Chip
                      label={value.charAt(0).toUpperCase() + value.slice(1)}
                      size="small"
                      color={statusColor[value] || 'default'}
                      sx={{ fontSize: '0.7rem', cursor: 'pointer' }}
                    />
                  )}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& .MuiSelect-icon': { display: 'none' },
                    '& .MuiSelect-select': { p: 0 }
                  }}
                >
                  {['approved', 'pending', 'rejected', 'suspended'].map((s) => (
                    <MenuItem key={s} value={s}>
                      <Chip label={s.charAt(0).toUpperCase() + s.slice(1)} size="small" color={statusColor[s] || 'default'} />
                    </MenuItem>
                  ))}
                </Select>
              )}
            </Stack>
          </Box>

          <AnimateButton>
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.5)',
                '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Logout
            </Button>
          </AnimateButton>
        </Stack>
      </Box>

      {/* ─── Tabs Row ───────────────────────────────────────────────────────── */}
      <MainCard sx={{ mb: 2, p: 0 }}>
        <Box sx={{ display: 'flex', overflowX: 'auto' }}>
          {tabs.map((tab, idx) => (
            <Box key={tab.id} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditMode(false);
                }}
                sx={{
                  px: 2.5,
                  py: 2,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  whiteSpace: 'nowrap',
                  bgcolor: activeTab === tab.id ? theme.palette.secondary.light : 'transparent',
                  borderBottom: activeTab === tab.id ? `3px solid ${theme.palette.secondary.main}` : '3px solid transparent',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: activeTab === tab.id ? theme.palette.secondary.light : theme.palette.grey[50]
                  }
                }}
              >
                <Box sx={{ color: activeTab === tab.id ? theme.palette.secondary.main : theme.palette.text.secondary }}>{tab.icon}</Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    color: activeTab === tab.id ? theme.palette.secondary.main : theme.palette.text.primary
                  }}
                >
                  {tab.label}
                </Typography>
              </Box>
              {idx < tabs.length - 1 && <Divider orientation="vertical" flexItem />}
            </Box>
          ))}
        </Box>
      </MainCard>

      {/* ─── Tab Content ────────────────────────────────────────────────────── */}
      <MainCard>
        {/* Alerts */}
        {successMsg && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => dispatch(clearVendorMessages())}>
            {successMsg}
          </Alert>
        )}
        {apiError && typeof apiError === 'string' && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearVendorMessages())}>
            {apiError}
          </Alert>
        )}

        {/* ══ Personal Info ══════════════════════════════════════════════════ */}
        {activeTab === 'personal' && (
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Box>
                <Typography variant="h4">Personal Information</Typography>
                <Typography variant="caption" color="text.secondary">
                  Manage your personal details
                </Typography>
              </Box>
              <EditToggle />
            </Stack>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(fieldErr('name'))}>
                  <InputLabel>Full Name</InputLabel>
                  <OutlinedInput value={profile.name} onChange={handleProfileChange('name')} label="Full Name" disabled={!editMode} />
                  {fieldErr('name') && <FormHelperText>{fieldErr('name')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(fieldErr('mobile'))}>
                  <InputLabel>Mobile Number</InputLabel>
                  <OutlinedInput
                    value={profile.mobile}
                    onChange={handleProfileChange('mobile')}
                    label="Mobile Number"
                    disabled={!editMode}
                  />
                  {fieldErr('mobile') && <FormHelperText>{fieldErr('mobile')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(fieldErr('email'))}>
                  <InputLabel>Email Address</InputLabel>
                  <OutlinedInput
                    value={profile.email}
                    onChange={handleProfileChange('email')}
                    label="Email Address"
                    type="email"
                    disabled={!editMode}
                  />
                  {fieldErr('email') && <FormHelperText>{fieldErr('email')}</FormHelperText>}
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  {profilePicUrl && <Avatar src={profilePicUrl} sx={{ width: 56, height: 56 }} />}
                  {editMode && (
                    <Button variant="outlined" color="secondary" component="label" startIcon={<CameraAltIcon />}>
                      Upload Photo
                      <input hidden accept="image/*" type="file" onChange={handleFileChange('profilepic')} />
                    </Button>
                  )}
                  {profile.profilepic instanceof File && (
                    <Typography variant="caption" color="text.secondary">
                      {profile.profilepic.name}
                    </Typography>
                  )}
                </Stack>
              </Grid> */}
            </Grid>
            {editMode && <SaveButton />}
          </Box>
        )}

        {/* ══ Business Info ══════════════════════════════════════════════════ */}
        {activeTab === 'business' && (
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Box>
                <Typography variant="h4">Business Information</Typography>
                <Typography variant="caption" color="text.secondary">
                  Manage your business details
                </Typography>
              </Box>
              <EditToggle />
            </Stack>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(fieldErr('business_name'))}>
                  <InputLabel>Business Name</InputLabel>
                  <OutlinedInput
                    value={profile.business_name}
                    onChange={handleProfileChange('business_name')}
                    label="Business Name"
                    disabled={!editMode}
                  />
                  {fieldErr('business_name') && <FormHelperText>{fieldErr('business_name')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(fieldErr('vat_number'))}>
                  <InputLabel>VAT Number</InputLabel>
                  <OutlinedInput
                    value={profile.vat_number}
                    onChange={handleProfileChange('vat_number')}
                    label="VAT Number"
                    disabled={!editMode}
                  />
                  {fieldErr('vat_number') && <FormHelperText>{fieldErr('vat_number')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(fieldErr('business_registration_number'))}>
                  <InputLabel>Business Registration No.</InputLabel>
                  <OutlinedInput
                    value={profile.business_registration_number}
                    onChange={handleProfileChange('business_registration_number')}
                    label="Business Registration No."
                    disabled={!editMode}
                  />
                  {fieldErr('business_registration_number') && <FormHelperText>{fieldErr('business_registration_number')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Commission %</InputLabel>
                  <OutlinedInput value={profile.commission_percentage} label="Commission %" disabled />
                </FormControl>
              </Grid>
            </Grid>
            {/* <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                {<Avatar src={businessLogoUrl} variant="rounded" sx={{ width: 56, height: 56 }} />}
                {editMode && (
                  <Button variant="outlined" color="secondary" component="label" startIcon={<BusinessIcon />}>
                    Upload Logo
                    <input hidden accept="image/*" type="file" onChange={handleFileChange('business_logo')} />
                  </Button>
                )}
                {profile.business_logo instanceof File && (
                  <Typography variant="caption" color="text.secondary">
                    {profile.business_logo.name}
                  </Typography>
                )}
              </Stack>
            </Grid> */}
            {editMode && <SaveButton />}
          </Box>
        )}

        {/* ══ Banking & Billing ══════════════════════════════════════════════ */}
        {activeTab === 'banking' && (
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Box>
                <Typography variant="h4">Banking & Billing</Typography>
                <Typography variant="caption" color="text.secondary">
                  Manage your payment details
                </Typography>
              </Box>
              <EditToggle />
            </Stack>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(fieldErr('iban'))}>
                  <InputLabel>IBAN</InputLabel>
                  <OutlinedInput value={profile.iban} onChange={handleProfileChange('iban')} label="IBAN" disabled={!editMode} />
                  {fieldErr('iban') && <FormHelperText>{fieldErr('iban')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Stripe Account ID</InputLabel>
                  <OutlinedInput value={profile.stripe_account_id} label="Stripe Account ID" disabled />
                </FormControl>
              </Grid>
            </Grid>
            {editMode && <SaveButton />}
          </Box>
        )}

        {/* ══ Documents ══════════════════════════════════════════════════════ */}
        {activeTab === 'documents' && (
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Box>
                <Typography variant="h4">My Documents</Typography>
                <Typography variant="caption" color="text.secondary">
                  Upload and manage your verification documents
                </Typography>
              </Box>
              <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={handleOpenCreateDoc}>
                Upload Document
              </Button>
            </Stack>

            {/* Loading */}
            {docLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress color="secondary" />
              </Box>
            )}

            {/* Empty state */}
            {!docLoading && documents.length === 0 && (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 6,
                  border: `2px dashed ${theme.palette.divider}`,
                  borderRadius: 2
                }}
              >
                <DescriptionIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                <Typography color="text.secondary">No documents uploaded yet.</Typography>
                <Button variant="outlined" color="secondary" startIcon={<AddIcon />} onClick={handleOpenCreateDoc} sx={{ mt: 2 }}>
                  Upload Your First Document
                </Button>
              </Box>
            )}

            {/* Documents Table */}
            {!docLoading && documents.length > 0 && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Type</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Document No.</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Status</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Uploaded</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Rejection Reason</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>File</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Actions</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {getDocTypeLabel(doc.document_type)}
                          </Typography>
                        </TableCell>
                        <TableCell>{doc.document_number || '—'}</TableCell>
                        {/* <TableCell>
                          <Chip
                            label={doc.verification_status?.charAt(0).toUpperCase() + doc.verification_status?.slice(1)}
                            size="small"
                            color={getStatusChipColor(doc.verification_status)}
                          />
                        </TableCell> */}
                        <TableCell>
                          <Select
                            value={doc.verification_status || 'pending'}
                            size="small"
                            onChange={(e) => handleStatusChange(doc.id, e.target.value)}
                            renderValue={(value) => (
                              <Chip
                                label={value.charAt(0).toUpperCase() + value.slice(1)}
                                size="small"
                                color={getStatusChipColor(value)}
                                sx={{ cursor: 'pointer' }}
                              />
                            )}
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                              '& .MuiSelect-icon': { display: 'none' },
                              p: 0
                            }}
                          >
                            {VERIFICATION_STATUSES.map((s) => (
                              <MenuItem key={s.value} value={s.value}>
                                <Chip label={s.label} size="small" color={s.color} />
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption">
                            {doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : '—'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" color="error.main">
                            {doc.rejection_reason || '—'}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          {doc.document_file ? (
                            <Tooltip title="View Document">
                              <IconButton
                                size="small"
                                color="secondary"
                                onClick={() => window.open(`${BASE_URL}${doc.document_file}`, '_blank')}
                              >
                                <OpenInNewIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            '—'
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={0.5} justifyContent="center">
                            <Tooltip title="Edit">
                              <IconButton size="small" color="primary" onClick={() => handleOpenEditDoc(doc)}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton size="small" color="error" onClick={() => handleDeleteDoc(doc.id)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}

        {/* ══ Change Password ════════════════════════════════════════════════ */}
        {activeTab === 'password' && (
          <Box>
            <Box mb={3}>
              <Typography variant="h4">Change Password</Typography>
              <Typography variant="caption" color="text.secondary">
                Update your account password
              </Typography>
            </Box>
            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(pwErrors.old_password)}>
                  <InputLabel>Current Password</InputLabel>
                  <OutlinedInput
                    type={showOldPw ? 'text' : 'password'}
                    value={passwords.old_password}
                    onChange={handlePwChange('old_password')}
                    label="Current Password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowOldPw((s) => !s)} edge="end">
                          {showOldPw ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {pwErrors.old_password && <FormHelperText>{pwErrors.old_password}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(pwErrors.new_password)}>
                  <InputLabel>New Password</InputLabel>
                  <OutlinedInput
                    type={showNewPw ? 'text' : 'password'}
                    value={passwords.new_password}
                    onChange={handlePwChange('new_password')}
                    label="New Password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowNewPw((s) => !s)} edge="end">
                          {showNewPw ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {pwErrors.new_password && <FormHelperText>{pwErrors.new_password}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(pwErrors.confirm_password)}>
                  <InputLabel>Confirm New Password</InputLabel>
                  <OutlinedInput
                    type={showConfPw ? 'text' : 'password'}
                    value={passwords.confirm_password}
                    onChange={handlePwChange('confirm_password')}
                    label="Confirm New Password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfPw((s) => !s)} edge="end">
                          {showConfPw ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {pwErrors.confirm_password && <FormHelperText>{pwErrors.confirm_password}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <AnimateButton>
                <Button variant="contained" color="secondary" startIcon={<LockIcon />} onClick={handleChangePassword}>
                  Update Password
                </Button>
              </AnimateButton>
            </Box>
          </Box>
        )}
      </MainCard>

      {/* ══ Document Upload / Edit Dialog ══════════════════════════════════════ */}
      <Dialog open={docDialogOpen} onClose={() => setDocDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <UploadFileIcon color="secondary" />
            <Typography variant="h4">{isEditingDoc ? 'Edit Document' : 'Upload Document'}</Typography>
          </Stack>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2.5} sx={{ pt: 1 }}>
            {/* Document Type */}
            <Grid item xs={12}>
              <FormControl fullWidth error={Boolean(docFormErrors.document_type)} required>
                <InputLabel>Document Type *</InputLabel>
                <Select
                  sx={{ width: '15vw' }}
                  value={docForm.document_type}
                  onChange={(e) => {
                    setDocForm((prev) => ({ ...prev, document_type: e.target.value }));
                    setDocFormErrors((prev) => ({ ...prev, document_type: '' }));
                  }}
                  label="Document Type *"
                >
                  {DOCUMENT_TYPES.map((dt) => (
                    <MenuItem key={dt.value} value={dt.value}>
                      {dt.label}
                    </MenuItem>
                  ))}
                </Select>
                {docFormErrors.document_type && <FormHelperText>{docFormErrors.document_type}</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Document Number */}
            <Grid item xs={12}>
              <FormControl sx={{ width: '15vw' }} fullWidth error={Boolean(docFormErrors.document_number)} required>
                <InputLabel>Document Number *</InputLabel>
                <OutlinedInput
                  value={docForm.document_number}
                  onChange={(e) => {
                    setDocForm((prev) => ({ ...prev, document_number: e.target.value }));
                    setDocFormErrors((prev) => ({ ...prev, document_number: '' }));
                  }}
                  label="Document Number *"
                />
                {docFormErrors.document_number && <FormHelperText>{docFormErrors.document_number}</FormHelperText>}
              </FormControl>
            </Grid>

            {/* File Upload */}
            <Grid item xs={12}>
              <Box sx={{ width: '15vw' }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Document File {!isEditingDoc && <span style={{ color: 'red' }}>*</span>}
                  {isEditingDoc && (
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      (leave empty to keep existing file)
                    </Typography>
                  )}
                </Typography>
                <Button
                  variant="outlined"
                  color={docFormErrors.document_file ? 'error' : 'secondary'}
                  component="label"
                  startIcon={<UploadFileIcon />}
                  fullWidth
                  sx={{ py: 1.5, border: docFormErrors.document_file ? '1px solid red' : undefined }}
                >
                  {docForm.document_file ? docForm.document_file.name : 'Choose File'}
                  <input hidden type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleDocFileChange} />
                </Button>
                {docFormErrors.document_file && <FormHelperText error>{docFormErrors.document_file}</FormHelperText>}
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  Accepted: PDF, JPG, PNG
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setDocDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <AnimateButton>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDocSubmit}
              disabled={docLoading}
              startIcon={docLoading ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
            >
              {docLoading ? 'Saving...' : isEditingDoc ? 'Update Document' : 'Upload Document'}
            </Button>
          </AnimateButton>
        </DialogActions>
      </Dialog>

      {/* ─── Snackbar ───────────────────────────────────────────────────────── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
