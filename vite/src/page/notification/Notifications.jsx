// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import Chip from '@mui/material/Chip';
// import CircularProgress from '@mui/material/CircularProgress';
// import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuItem from '@mui/material/MenuItem';
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';

// // redux
// import { fetchBookingRequests, updateBookingRequest } from '../../features/bookingRequest/bookingRequestThunk';
// import {
//   selectAllBookingRequests,
//   selectBookingRequestLoading,
//   selectBookingRequestSuccess,
//   selectBookingRequestError
// } from '../../features/bookingRequest/bookingRequestSelectors';
// import { setSelectedBookingRequest, clearBookingRequestMessages } from '../../features/bookingRequest/bookingRequestSlice';

// // assets
// import { IconBell, IconCheck, IconX, IconUser, IconBuilding, IconCalendar, IconId } from '@tabler/icons-react';

// // ─── Constants ────────────────────────────────────────────────────────────────
// const STATUS_OPTIONS = [
//   { value: 'all', label: 'All' },
//   { value: 'sent', label: 'Sent' },
//   { value: 'accepted', label: 'Accepted' },
//   { value: 'rejected', label: 'Rejected' },
//   { value: 'timeout', label: 'Timeout' }
// ];

// const STATUS_META = {
//   sent: { label: 'Pending', color: 'warning' },
//   accepted: { label: 'Accepted', color: 'success' },
//   rejected: { label: 'Rejected', color: 'error' },
//   timeout: { label: 'Timeout', color: 'default' }
// };

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const formatDate = (iso) => {
//   if (!iso) return '—';
//   return new Date(iso).toLocaleString('en-IN', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });
// };

// const relativeTime = (iso) => {
//   if (!iso) return '';
//   const diff = Math.floor((Date.now() - new Date(iso)) / 60000);
//   if (diff < 1) return 'Just now';
//   if (diff < 60) return `${diff} min ago`;
//   if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`;
//   return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
// };

// // ─── Detail Info Row ──────────────────────────────────────────────────────────
// function InfoRow({ icon: Icon, label, value }) {
//   return (
//     <Stack direction="row" spacing={1.5} alignItems="center" sx={{ py: 0.75 }}>
//       <Box sx={{ color: 'text.secondary', display: 'flex' }}>
//         <Icon size={16} stroke={1.5} />
//       </Box>
//       <Typography variant="caption" color="text.secondary" sx={{ minWidth: 110 }}>
//         {label}
//       </Typography>
//       <Typography variant="body2" fontWeight={500}>
//         {value || '—'}
//       </Typography>
//     </Stack>
//   );
// }

// // ─── Detail Panel ─────────────────────────────────────────────────────────────
// function NotificationDetail({ request, onUpdateStatus, updating }) {
//   const theme = useTheme();
//   if (!request) {
//     return (
//       <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ height: '100%', py: 8 }}>
//         <IconBell size={52} stroke={1} color={theme.palette.grey[400]} />
//         <Typography variant="body1" color="text.disabled">
//           Select a notification to view details
//         </Typography>
//       </Stack>
//     );
//   }

//   const { id, booking_id, request_status, created_at, responded_at, customer, vendor, service_radius_km } = request;

//   const statusMeta = STATUS_META[request_status] || { label: request_status, color: 'default' };
//   const customerAvatar = customer?.profilepic ? `${import.meta.env.VITE_API_BASE_URL}${customer.profilepic}` : null;
//   const vendorAvatar = vendor?.profilepic ? `${import.meta.env.VITE_API_BASE_URL}${vendor.profilepic}` : null;

//   return (
//     <Stack spacing={2.5} sx={{ p: 3 }}>
//       {/* ── Header ── */}
//       <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
//         <Stack spacing={0.5}>
//           <Typography variant="h4">Booking Request #{booking_id}</Typography>
//           <Typography variant="caption" color="text.secondary">
//             {formatDate(created_at)}
//           </Typography>
//         </Stack>
//         <Chip label={statusMeta.label} color={statusMeta.color} size="small" />
//       </Stack>

//       <Divider />

//       {/* ── Customer Card ── */}
//       <Card variant="outlined" sx={{ p: 2 }}>
//         <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
//           <Avatar src={customerAvatar} sx={{ bgcolor: 'primary.light', color: 'primary.dark', width: 44, height: 44 }}>
//             {!customerAvatar && (customer?.username?.[0]?.toUpperCase() || '?')}
//           </Avatar>
//           <Stack>
//             <Typography variant="subtitle1" fontWeight={600}>
//               {customer?.username || '—'}
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               Customer
//             </Typography>
//           </Stack>
//         </Stack>
//         <InfoRow icon={IconUser} label="Email" value={customer?.email} />
//         <InfoRow icon={IconId} label="Mobile" value={customer?.mobile} />
//       </Card>

//       {/* ── Vendor Card ── */}
//       <Card variant="outlined" sx={{ p: 2 }}>
//         <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
//           <Avatar src={vendorAvatar} sx={{ bgcolor: 'warning.light', color: 'warning.dark', width: 44, height: 44 }}>
//             {!vendorAvatar && (vendor?.name?.[0]?.toUpperCase() || '?')}
//           </Avatar>
//           <Stack>
//             <Typography variant="subtitle1" fontWeight={600}>
//               {vendor?.name || '—'}
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               Vendor · {vendor?.business_name}
//             </Typography>
//           </Stack>
//         </Stack>
//         <InfoRow icon={IconBuilding} label="Business" value={vendor?.business_name} />
//         <InfoRow icon={IconId} label="Service Radius" value={`${service_radius_km} km`} />
//         <InfoRow icon={IconCalendar} label="Responded At" value={formatDate(responded_at)} />
//       </Card>

//       {/* ── Action Buttons ── */}
//       {request_status === 'sent' && (
//         <Stack direction="row" spacing={2}>
//           <Button
//             fullWidth
//             variant="contained"
//             color="success"
//             disabled={updating}
//             startIcon={updating ? <CircularProgress size={14} /> : <IconCheck size={16} stroke={2} />}
//             onClick={() => onUpdateStatus(id, 'accepted')}
//           >
//             Accept Request
//           </Button>
//           <Button
//             fullWidth
//             variant="outlined"
//             color="error"
//             disabled={updating}
//             startIcon={<IconX size={16} stroke={2} />}
//             onClick={() => onUpdateStatus(id, 'rejected')}
//           >
//             Reject Request
//           </Button>
//         </Stack>
//       )}

//       {/* ── Already actioned message ── */}
//       {request_status !== 'sent' && (
//         <Typography variant="caption" color="text.secondary" textAlign="center">
//           This request has already been {statusMeta.label.toLowerCase()}.
//         </Typography>
//       )}
//     </Stack>
//   );
// }

// // ==============================|| NOTIFICATIONS PAGE ||============================== //

// export default function Notifications() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams(); // /notifications/:id (optional)
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const bookingRequests = useSelector(selectAllBookingRequests);
//   const loading = useSelector(selectBookingRequestLoading);
//   const successMessage = useSelector(selectBookingRequestSuccess);
//   const error = useSelector(selectBookingRequestError);

//   const [statusFilter, setStatusFilter] = useState('all');
//   const [selectedId, setSelectedId] = useState(id ? Number(id) : null);
//   const [updating, setUpdating] = useState(false);

//   // ─── Fetch all on mount ────────────────────────────────────────────────────
//   useEffect(() => {
//     dispatch(fetchBookingRequests());
//     return () => dispatch(clearBookingRequestMessages());
//   }, [dispatch]);

//   // ─── If URL has :id, auto-select that notification ────────────────────────
//   useEffect(() => {
//     if (id) setSelectedId(Number(id));
//   }, [id]);

//   // ─── Auto-clear updating flag when success ────────────────────────────────
//   useEffect(() => {
//     if (successMessage) {
//       setUpdating(false);
//       dispatch(clearBookingRequestMessages());
//     }
//   }, [successMessage, dispatch]);

//   // ─── Filtered list ────────────────────────────────────────────────────────
//   const filteredRequests = statusFilter === 'all' ? bookingRequests : bookingRequests.filter((r) => r.request_status === statusFilter);

//   // ─── Selected request object ──────────────────────────────────────────────
//   const selectedRequest = bookingRequests.find((r) => r.id === selectedId) || null;

//   // ─── Handlers ─────────────────────────────────────────────────────────────
//   const handleSelect = (request) => {
//     setSelectedId(request.id);
//     navigate(`/notifications/${request.id}`, { replace: true });
//   };

//   const handleUpdateStatus = (reqId, newStatus) => {
//     setUpdating(true);
//     dispatch(updateBookingRequest({ id: reqId, data: { request_status: newStatus } }));
//   };

//   return (
//     <MainCard title="Notifications">
//       {/* ─── Status filter ── */}
//       <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
//         <TextField
//           select
//           size="small"
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           sx={{ minWidth: 160 }}
//           label="Filter by status"
//         >
//           {STATUS_OPTIONS.map((opt) => (
//             <MenuItem key={opt.value} value={opt.value}>
//               {opt.label}
//             </MenuItem>
//           ))}
//         </TextField>
//       </Stack>

//       <Grid container spacing={2} sx={{ height: '100%' }}>
//         {/* ─── LEFT: List ─────────────────────────────────────────────────── */}
//         <Grid
//           item
//           xs={12}
//           md={4}
//           sx={{
//             borderRight: { md: `1px solid ${theme.palette.divider}` },
//             maxHeight: { md: 'calc(100vh - 240px)' },
//             overflowY: 'auto',
//             '&::-webkit-scrollbar': { width: 4 }
//           }}
//         >
//           {loading && !bookingRequests.length ? (
//             <Stack alignItems="center" sx={{ py: 6 }}>
//               <CircularProgress size={28} />
//             </Stack>
//           ) : !filteredRequests.length ? (
//             <Stack alignItems="center" spacing={1} sx={{ py: 6 }}>
//               <IconBell size={40} stroke={1} color={theme.palette.grey[400]} />
//               <Typography variant="body2" color="text.disabled">
//                 No notifications
//               </Typography>
//             </Stack>
//           ) : (
//             <List disablePadding>
//               {filteredRequests.map((request) => {
//                 const { id: rId, booking_id, request_status, customer, created_at } = request;
//                 const meta = STATUS_META[request_status] || { label: request_status, color: 'default' };
//                 const isSelected = selectedId === rId;
//                 const avatarSrc = customer?.profilepic ? `${import.meta.env.VITE_API_BASE_URL}${customer.profilepic}` : null;

//                 return (
//                   <Box key={rId}>
//                     <ListItemButton
//                       selected={isSelected}
//                       onClick={() => handleSelect(request)}
//                       sx={{
//                         px: 2,
//                         py: 1.5,
//                         bgcolor: isSelected ? 'primary.light' : 'transparent',
//                         '&.Mui-selected': { bgcolor: 'primary.light' },
//                         '&.Mui-selected:hover': { bgcolor: 'primary.light' }
//                       }}
//                     >
//                       <ListItemAvatar>
//                         <Avatar src={avatarSrc} sx={{ bgcolor: 'primary.light', color: 'primary.dark', width: 38, height: 38 }}>
//                           {!avatarSrc && (customer?.username?.[0]?.toUpperCase() || '?')}
//                         </Avatar>
//                       </ListItemAvatar>
//                       <ListItemText
//                         primary={
//                           <Stack direction="row" justifyContent="space-between" alignItems="center">
//                             <Typography variant="subtitle2" fontWeight={600} noWrap sx={{ maxWidth: 110 }}>
//                               {customer?.username || 'Unknown'}
//                             </Typography>
//                             <Chip label={meta.label} color={meta.color} size="small" sx={{ fontSize: 10, height: 18 }} />
//                           </Stack>
//                         }
//                         secondary={
//                           <Stack direction="row" justifyContent="space-between">
//                             <Typography variant="caption" color="text.secondary">
//                               Booking #{booking_id}
//                             </Typography>
//                             <Typography variant="caption" color="text.disabled">
//                               {relativeTime(created_at)}
//                             </Typography>
//                           </Stack>
//                         }
//                       />
//                     </ListItemButton>
//                     <Divider />
//                   </Box>
//                 );
//               })}
//             </List>
//           )}
//         </Grid>

//         {/* ─── RIGHT: Detail ──────────────────────────────────────────────── */}
//         <Grid
//           item
//           xs={12}
//           md={8}
//           sx={{
//             maxHeight: { md: 'calc(100vh - 240px)' },
//             overflowY: 'auto',
//             '&::-webkit-scrollbar': { width: 4 }
//           }}
//         >
//           <NotificationDetail request={selectedRequest} onUpdateStatus={handleUpdateStatus} updating={updating} />
//         </Grid>
//       </Grid>
//     </MainCard>
//   );
// }
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// redux
import { clearBookingRequestMessages } from '../../features/bookingRequest/bookingRequestSlice';
import { fetchBookingRequests, updateBookingRequest } from '../../features/bookingRequest/bookingRequestThunk';
import {
  selectAllBookingRequests,
  selectBookingRequestLoading,
  selectBookingRequestSuccess
} from '../../features/bookingRequest/bookingRequestSelectors';

// icons
import {
  IconBell,
  IconCheck,
  IconX,
  IconMail,
  IconPhone,
  IconBuilding,
  IconMapPin,
  IconCalendarEvent,
  IconClock,
  IconRefresh,
  IconChevronRight,
  IconInbox
} from '@tabler/icons-react';

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_TABS = [
  { value: 'all', label: 'All' },
  { value: 'sent', label: 'Pending' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'timeout', label: 'Timeout' }
];

const STATUS_META = {
  sent: { label: 'Pending', color: 'warning', dot: '#f59e0b', bg: '#fffbeb' },
  accepted: { label: 'Accepted', color: 'success', dot: '#10b981', bg: '#ecfdf5' },
  rejected: { label: 'Rejected', color: 'error', dot: '#ef4444', bg: '#fef2f2' },
  timeout: { label: 'Timeout', color: 'default', dot: '#9ca3af', bg: '#f9fafb' }
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const relativeTime = (iso) => {
  if (!iso) return '';
  const diff = Math.floor((Date.now() - new Date(iso)) / 60000);
  if (diff < 1) return 'Just now';
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
};

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ message = 'No notifications' }) {
  const theme = useTheme();
  return (
    <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ py: 8, px: 3 }}>
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: alpha(theme.palette.primary.main, 0.06),
          border: `2px dashed ${alpha(theme.palette.primary.main, 0.2)}`
        }}
      >
        <IconInbox size={30} stroke={1.2} color={theme.palette.primary.main} />
      </Box>
      <Stack alignItems="center" spacing={0.5}>
        <Typography variant="subtitle2" fontWeight={600}>
          {message}
        </Typography>
        <Typography variant="caption" color="text.disabled">
          Nothing to show here right now
        </Typography>
      </Stack>
    </Stack>
  );
}

// ─── Timeline Row ─────────────────────────────────────────────────────────────
function TimelineRow({ icon: Icon, label, value, accent }) {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Box
        sx={{
          mt: 0.3,
          width: 28,
          height: 28,
          borderRadius: '8px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: accent ? alpha(accent, 0.1) : alpha(theme.palette.primary.main, 0.08)
        }}
      >
        <Icon size={14} stroke={2} color={accent || theme.palette.primary.main} />
      </Box>
      <Stack spacing={0.1}>
        <Typography variant="caption" color="text.disabled" sx={{ lineHeight: 1.2 }}>
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={500} color="text.primary">
          {value || '—'}
        </Typography>
      </Stack>
    </Stack>
  );
}

// ─── Persona Card ─────────────────────────────────────────────────────────────
function PersonaCard({ title, name, subtitle, avatarSrc, avatarBg, avatarColor, children }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        borderRadius: '12px',
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.paper,
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.07)}` }
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
        <Avatar src={avatarSrc} sx={{ width: 46, height: 46, bgcolor: avatarBg, color: avatarColor, fontWeight: 700, fontSize: 18 }}>
          {!avatarSrc && (name?.[0]?.toUpperCase() || '?')}
        </Avatar>
        <Stack spacing={0.2}>
          <Typography variant="caption" color="text.disabled" sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 10 }}>
            {title}
          </Typography>
          <Typography variant="subtitle2" fontWeight={700}>
            {name || '—'}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Stack>
      </Stack>
      <Divider sx={{ mb: 1.5 }} />
      <Stack spacing={1.2}>{children}</Stack>
    </Box>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function NotificationDetail({ request, onUpdateStatus, updating }) {
  const theme = useTheme();

  if (!request) {
    return (
      <Stack alignItems="center" justifyContent="center" spacing={2.5} sx={{ height: '100%', minHeight: 400 }}>
        <Box
          sx={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.03)})`,
            border: `2px dashed ${alpha(theme.palette.primary.main, 0.2)}`
          }}
        >
          <IconBell size={36} stroke={1} color={alpha(theme.palette.primary.main, 0.5)} />
        </Box>
        <Stack alignItems="center" spacing={0.5}>
          <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
            Select a notification
          </Typography>
          <Typography variant="caption" color="text.disabled">
            Click any item from the list to view details
          </Typography>
        </Stack>
      </Stack>
    );
  }

  const { id, booking_id, request_status, created_at, responded_at, customer, vendor, service_radius_km } = request;
  const meta = STATUS_META[request_status] || { label: request_status, color: 'default', dot: '#9ca3af' };
  const customerAvatar = customer?.profilepic ? `${import.meta.env.VITE_API_BASE_URL}${customer.profilepic}` : null;
  const vendorLogoSrc = vendor?.business_logo ? `${import.meta.env.VITE_API_BASE_URL}${vendor.business_logo}` : null;
  const vendorAvatar = vendor?.profilepic ? `${import.meta.env.VITE_API_BASE_URL}${vendor.profilepic}` : null;

  return (
    // ✅ NO fixed width / vw — fully flexible, fills whatever Grid gives it
    <Stack sx={{ height: '100%', width: '100%', overflow: 'hidden' }}>
      {/* ── Hero Header ── */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          flexShrink: 0,
          background: `linear-gradient(135deg, ${alpha(meta.dot, 0.08)} 0%, ${alpha(theme.palette.background.paper, 0)} 60%)`,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: meta.dot, boxShadow: `0 0 0 3px ${alpha(meta.dot, 0.2)}` }} />
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 10 }}
              >
                Request ID #{id}
              </Typography>
            </Stack>
            <Typography variant="h4" fontWeight={700}>
              Booking #{booking_id}
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <IconClock size={12} stroke={1.5} color={theme.palette.text.disabled} />
              <Typography variant="caption" color="text.disabled">
                {formatDate(created_at)}
              </Typography>
            </Stack>
          </Stack>
          <Chip
            label={meta.label}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: 11,
              bgcolor: alpha(meta.dot, 0.12),
              color: meta.dot,
              border: `1px solid ${alpha(meta.dot, 0.3)}`,
              '& .MuiChip-label': { px: 1.5 }
            }}
          />
        </Stack>
      </Box>

      {/* ── Scrollable Body ── */}
      <Box sx={{ p: 3, overflowY: 'auto', flex: 1, '&::-webkit-scrollbar': { width: 4 } }}>
        <Stack spacing={2.5}>
          {/* Persona cards */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <PersonaCard
                title="Customer"
                name={customer?.username}
                avatarSrc={customerAvatar}
                avatarBg={alpha(theme.palette.primary.main, 0.1)}
                avatarColor={theme.palette.primary.main}
              >
                <TimelineRow icon={IconMail} label="Email" value={customer?.email} accent={theme.palette.primary.main} />
                <TimelineRow icon={IconPhone} label="Mobile" value={customer?.mobile} accent={theme.palette.primary.main} />
              </PersonaCard>
            </Grid>
            <Grid item xs={12} sm={6}>
              <PersonaCard
                title="Vendor"
                name={vendor?.name}
                subtitle={vendor?.business_name}
                avatarSrc={vendorLogoSrc || vendorAvatar}
                avatarBg={alpha('#f59e0b', 0.1)}
                avatarColor="#d97706"
              >
                <TimelineRow icon={IconBuilding} label="Business" value={vendor?.business_name} accent="#d97706" />
                <TimelineRow icon={IconMapPin} label="Service Radius" value={`${service_radius_km} km`} accent="#d97706" />
              </PersonaCard>
            </Grid>
          </Grid>

          {/* Timeline */}
          <Box
            sx={{
              p: 2,
              borderRadius: '12px',
              border: `1px solid ${theme.palette.divider}`,
              background: alpha(theme.palette.grey[100], 0.5)
            }}
          >
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 10, display: 'block', mb: 1.5 }}
            >
              Activity Timeline
            </Typography>
            <Stack spacing={1.5}>
              <TimelineRow
                icon={IconCalendarEvent}
                label="Request Created"
                value={formatDate(created_at)}
                accent={theme.palette.primary.main}
              />
              <TimelineRow
                icon={IconClock}
                label="Responded At"
                value={formatDate(responded_at)}
                accent={responded_at ? '#10b981' : theme.palette.text.disabled}
              />
            </Stack>
          </Box>

          {/* Action buttons */}
          {request_status === 'sent' && (
            <Stack spacing={1.5}>
              <Typography
                variant="caption"
                color="text.disabled"
                textAlign="center"
                sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 10 }}
              >
                Action Required
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  size="large"
                  disabled={updating}
                  startIcon={updating ? <CircularProgress size={16} color="inherit" /> : <IconCheck size={18} stroke={2.5} />}
                  onClick={() => onUpdateStatus(id, 'accepted')}
                  sx={{ borderRadius: '10px', fontWeight: 700, py: 1.2, boxShadow: `0 4px 14px ${alpha('#10b981', 0.3)}` }}
                >
                  Accept
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  size="large"
                  disabled={updating}
                  startIcon={<IconX size={18} stroke={2.5} />}
                  onClick={() => onUpdateStatus(id, 'rejected')}
                  sx={{ borderRadius: '10px', fontWeight: 700, py: 1.2 }}
                >
                  Reject
                </Button>
              </Stack>
            </Stack>
          )}

          {request_status !== 'sent' && (
            <Box
              sx={{
                py: 1.5,
                px: 2.5,
                borderRadius: '10px',
                textAlign: 'center',
                bgcolor: alpha(meta.dot, 0.07),
                border: `1px dashed ${alpha(meta.dot, 0.3)}`
              }}
            >
              <Typography variant="body2" fontWeight={500} sx={{ color: meta.dot }}>
                This request was {meta.label.toLowerCase()}
                {responded_at && ` on ${formatDate(responded_at)}`}
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </Stack>
  );
}

// ==============================|| NOTIFICATIONS PAGE ||============================== //
export default function Notifications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();

  const bookingRequests = useSelector(selectAllBookingRequests);
  const loading = useSelector(selectBookingRequestLoading);
  const successMessage = useSelector(selectBookingRequestSuccess);

  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(id ? Number(id) : null);
  const [updating, setUpdating] = useState(false);

  const filteredRequests = statusFilter === 'all' ? bookingRequests : bookingRequests.filter((r) => r.request_status === statusFilter);

  const selectedRequest = bookingRequests.find((r) => r.id === selectedId) || null;

  const handleSelect = (req) => {
    setSelectedId(req.id);
    navigate(`/notifications/${req.id}`, { replace: true });
  };
  const handleUpdateStatus = (reqId, newStatus) => {
    setUpdating(true);
    dispatch(updateBookingRequest({ id: reqId, data: { request_status: newStatus } }));
  };
  const handleRefresh = () => selectedRequest && dispatch(fetchBookingRequests({ vendor_id: selectedRequest?.vendor_id }));
  const countFor = (val) => (val === 'all' ? bookingRequests.length : bookingRequests.filter((r) => r.request_status === val).length);

  const pendingCount = countFor('sent');
  useEffect(() => {
    // dispatch(fetchBookingRequests());
    if (selectedRequest) {
      dispatch(fetchBookingRequests({ vendor_id: selectedRequest?.vendor_id }));
    }
    return () => dispatch(clearBookingRequestMessages());
  }, [dispatch]);

  useEffect(() => {
    if (id) setSelectedId(Number(id));
  }, [id]);

  useEffect(() => {
    if (successMessage) {
      setUpdating(false);
      dispatch(clearBookingRequestMessages());
    }
  }, [successMessage, dispatch]);
  return (
    <MainCard
      title={
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Badge badgeContent={pendingCount} color="warning" max={99}>
            <IconBell size={22} stroke={1.5} />
          </Badge>
          <Typography variant="h4" fontWeight={700}>
            Notifications
          </Typography>
        </Stack>
      }
      secondary={
        <Tooltip title="Refresh">
          <IconButton size="small" onClick={handleRefresh} disabled={loading}>
            <IconRefresh size={18} stroke={1.5} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          </IconButton>
        </Tooltip>
      }
      // ✅ Remove padding from card content so layout fills edge-to-edge
      sx={{ '& .MuiCardContent-root': { p: 0, '&:last-child': { pb: 0 } } }}
    >
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      {/* ── Tabs ── */}
      <Box sx={{ px: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Tabs
          value={statusFilter}
          onChange={(_, v) => setStatusFilter(v)}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{ style: { height: 3, borderRadius: '3px 3px 0 0' } }}
          sx={{ minHeight: 44 }}
        >
          {STATUS_TABS.map((tab) => {
            const count = countFor(tab.value);
            return (
              <Tab
                key={tab.value}
                value={tab.value}
                disableRipple
                sx={{ minHeight: 44, fontSize: 13, fontWeight: 600, px: 2, textTransform: 'none' }}
                label={
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <span>{tab.label}</span>
                    {count > 0 && (
                      <Box
                        sx={{
                          fontSize: 10,
                          fontWeight: 700,
                          lineHeight: 1,
                          px: 0.75,
                          py: 0.25,
                          borderRadius: '20px',
                          bgcolor:
                            statusFilter === tab.value ? alpha(theme.palette.primary.main, 0.12) : alpha(theme.palette.text.primary, 0.07),
                          color: statusFilter === tab.value ? theme.palette.primary.main : theme.palette.text.secondary
                        }}
                      >
                        {count}
                      </Box>
                    )}
                  </Stack>
                }
              />
            );
          })}
        </Tabs>
      </Box>

      {/* ✅ Split layout — flex row, fills remaining height, NO overflow on this wrapper */}
      <Box sx={{ display: 'flex', height: 'calc(100vh - 280px)', minHeight: 480, overflow: 'hidden' }}>
        {/* ── LEFT: list ── fixed width, scrolls internally */}
        <Box
          sx={{
            width: 320,
            flexShrink: 0,
            borderRight: `1px solid ${theme.palette.divider}`,
            overflowY: 'auto',
            height: '100%',
            '&::-webkit-scrollbar': { width: 3 },
            '&::-webkit-scrollbar-thumb': { bgcolor: alpha(theme.palette.primary.main, 0.15), borderRadius: 4 }
          }}
        >
          {loading && !bookingRequests.length ? (
            <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
              <CircularProgress size={28} />
            </Stack>
          ) : !filteredRequests.length ? (
            <EmptyState message={`No ${statusFilter === 'all' ? '' : statusFilter} notifications`} />
          ) : (
            filteredRequests.map((request) => {
              const { id: rId, booking_id, request_status, customer, created_at, vendor } = request;
              const meta = STATUS_META[request_status] || { dot: '#9ca3af' };
              const isSelected = selectedId === rId;
              const avatarSrc = customer?.profilepic ? `${import.meta.env.VITE_API_BASE_URL}${customer.profilepic}` : null;

              return (
                <Box
                  key={rId}
                  onClick={() => handleSelect(request)}
                  sx={{
                    px: 2,
                    py: 1.75,
                    cursor: 'pointer',
                    position: 'relative',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    bgcolor: isSelected ? alpha(theme.palette.primary.main, 0.06) : 'transparent',
                    transition: 'background 0.15s',
                    '&:hover': { bgcolor: isSelected ? alpha(theme.palette.primary.main, 0.08) : alpha(theme.palette.grey[500], 0.05) },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 3,
                      bgcolor: isSelected ? theme.palette.primary.main : 'transparent',
                      borderRadius: '0 2px 2px 0',
                      transition: 'background 0.15s'
                    }
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <Box sx={{ position: 'relative', flexShrink: 0 }}>
                      <Avatar
                        src={avatarSrc}
                        sx={{
                          width: 40,
                          height: 40,
                          fontWeight: 700,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main
                        }}
                      >
                        {!avatarSrc && (customer?.username?.[0]?.toUpperCase() || '?')}
                      </Avatar>
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: 11,
                          height: 11,
                          borderRadius: '50%',
                          bgcolor: meta.dot,
                          border: `2px solid ${theme.palette.background.paper}`
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Typography variant="subtitle2" fontWeight={700} noWrap sx={{ maxWidth: '65%' }}>
                          {customer?.username || 'Unknown'}
                        </Typography>
                        <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0, ml: 0.5 }}>
                          {relativeTime(created_at)}
                        </Typography>
                      </Stack>
                      <Typography variant="caption" color="text.secondary" noWrap>
                        Booking #{booking_id} · {vendor?.business_name || vendor?.name || '—'}
                      </Typography>
                    </Box>
                    {isSelected && (
                      <Box sx={{ flexShrink: 0, color: theme.palette.primary.main, display: 'flex', alignItems: 'center' }}>
                        <IconChevronRight size={16} stroke={2} />
                      </Box>
                    )}
                  </Stack>
                </Box>
              );
            })
          )}
        </Box>

        {/* ✅ RIGHT: detail — flex: 1 so it takes ALL remaining width automatically */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            height: '100%',
            overflowY: 'auto',
            bgcolor: alpha(theme.palette.grey[100], 0.3),
            '&::-webkit-scrollbar': { width: 3 },
            '&::-webkit-scrollbar-thumb': { bgcolor: alpha(theme.palette.primary.main, 0.15), borderRadius: 4 }
          }}
        >
          <NotificationDetail request={selectedRequest} onUpdateStatus={handleUpdateStatus} updating={updating} />
        </Box>
      </Box>
    </MainCard>
  );
}
