// import PropTypes from 'prop-types';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import Chip from '@mui/material/Chip';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemText from '@mui/material/ListItemText';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// // project imports
// import { withAlpha } from 'utils/colorUtils';

// // assets
// import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons-react';
// import User1 from 'assets/images/users/user-round.svg';

// function ListItemWrapper({ children }) {
//   const theme = useTheme();

//   return (
//     <Box
//       sx={{
//         p: 2,
//         borderBottom: '1px solid',
//         borderColor: 'divider',
//         cursor: 'pointer',
//         '&:hover': {
//           bgcolor: withAlpha(theme.palette.grey[200], 0.3)
//         }
//       }}
//     >
//       {children}
//     </Box>
//   );
// }

// // ==============================|| NOTIFICATION LIST ITEM ||============================== //

// export default function NotificationList() {
//   const containerSX = { gap: 2, pl: 7 };

//   return (
//     <List sx={{ width: '100%', maxWidth: { xs: 300, md: 330 }, py: 0 }}>
//       <ListItemWrapper>
//         <ListItem
//           alignItems="center"
//           disablePadding
//           secondaryAction={
//             <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
//               <Typography variant="caption">2 min ago</Typography>
//             </Stack>
//           }
//         >
//           <ListItemAvatar>
//             <Avatar alt="John Doe" src={User1} />
//           </ListItemAvatar>
//           <ListItemText primary="John Doe" />
//         </ListItem>
//         <Stack sx={containerSX}>
//           <Typography variant="subtitle2">It is a long established fact that a reader will be distracted</Typography>
//           <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
//             <Chip label="Unread" color="error" size="small" sx={{ width: 'min-content' }} />
//             <Chip label="New" color="warning" size="small" sx={{ width: 'min-content' }} />
//           </Stack>
//         </Stack>
//       </ListItemWrapper>
//       <ListItemWrapper>
//         <ListItem
//           alignItems="center"
//           disablePadding
//           secondaryAction={
//             <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
//               <Typography variant="caption">2 min ago</Typography>
//             </Stack>
//           }
//         >
//           <ListItemAvatar>
//             <Avatar
//               sx={{
//                 color: 'success.dark',
//                 bgcolor: 'success.light'
//               }}
//             >
//               <IconBuildingStore stroke={1.5} size="20px" />
//             </Avatar>
//           </ListItemAvatar>
//           <ListItemText primary={<Typography variant="subtitle1">Store Verification Done</Typography>} />
//         </ListItem>
//         <Stack sx={containerSX}>
//           <Typography variant="subtitle2">We have successfully received your request.</Typography>
//           <Chip label="Unread" color="error" size="small" sx={{ width: 'min-content' }} />
//         </Stack>
//       </ListItemWrapper>
//       <ListItemWrapper>
//         <ListItem
//           alignItems="center"
//           disablePadding
//           secondaryAction={
//             <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
//               <Typography variant="caption">2 min ago</Typography>
//             </Stack>
//           }
//         >
//           <ListItemAvatar>
//             <Avatar
//               sx={{
//                 color: 'primary.dark',
//                 bgcolor: 'primary.light'
//               }}
//             >
//               <IconMailbox stroke={1.5} size="20px" />
//             </Avatar>
//           </ListItemAvatar>
//           <ListItemText primary={<Typography variant="subtitle1">Check Your Mail.</Typography>} />
//         </ListItem>
//         <Stack sx={containerSX}>
//           <Typography variant="subtitle2">All done! Now check your inbox as you&apos;re in for a sweet treat!</Typography>
//           <Button variant="contained" endIcon={<IconBrandTelegram stroke={1.5} size={20} />} sx={{ width: 'min-content' }}>
//             Mail
//           </Button>
//         </Stack>
//       </ListItemWrapper>
//       <ListItemWrapper>
//         <ListItem
//           alignItems="center"
//           disablePadding
//           secondaryAction={
//             <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
//               <Typography variant="caption">2 min ago</Typography>
//             </Stack>
//           }
//         >
//           <ListItemAvatar>
//             <Avatar alt="John Doe" src={User1} />
//           </ListItemAvatar>
//           <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>} />
//         </ListItem>
//         <Stack sx={containerSX}>
//           <Typography component="span" variant="subtitle2">
//             Uploaded two file on &nbsp;
//             <Typography component="span" variant="h6">
//               21 Jan 2020
//             </Typography>
//           </Typography>
//           <Card sx={{ bgcolor: 'secondary.light' }}>
//             <Stack direction="row" sx={{ p: 2.5, gap: 2 }}>
//               <IconPhoto stroke={1.5} size="20px" />
//               <Typography variant="subtitle1">demo.jpg</Typography>
//             </Stack>
//           </Card>
//         </Stack>
//       </ListItemWrapper>
//       <ListItemWrapper>
//         <ListItem
//           alignItems="center"
//           disablePadding
//           secondaryAction={
//             <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
//               <Typography variant="caption">2 min ago</Typography>
//             </Stack>
//           }
//         >
//           <ListItemAvatar>
//             <Avatar alt="John Doe" src={User1} />
//           </ListItemAvatar>
//           <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>} />
//         </ListItem>
//         <Stack sx={containerSX}>
//           <Typography variant="subtitle2">It is a long established fact that a reader will be distracted</Typography>
//           <Chip label="Confirmation of Account." color="success" size="small" sx={{ width: 'min-content' }} />
//         </Stack>
//       </ListItemWrapper>
//     </List>
//   );
// }

// ListItemWrapper.propTypes = { children: PropTypes.node };
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import { withAlpha } from 'utils/colorUtils';

// assets
import { IconBell, IconCheck, IconX } from '@tabler/icons-react';

// ─── Status chip config ───────────────────────────────────────────────────────
const STATUS_META = {
  sent: { label: 'Pending', color: 'warning' },
  accepted: { label: 'Accepted', color: 'success' },
  rejected: { label: 'Rejected', color: 'error' },
  timeout: { label: 'Timeout', color: 'default' }
};

// ─── Format date ──────────────────────────────────────────────────────────────
const formatDate = (iso) => {
  if (!iso) return '—';
  const diff = Math.floor((Date.now() - new Date(iso)) / 60000);
  if (diff < 1) return 'Just now';
  if (diff < 60) return `${diff} min ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`;
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
};

// ─── Wrapper (same as original) ───────────────────────────────────────────────
function ListItemWrapper({ children }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        cursor: 'pointer',
        '&:hover': { bgcolor: withAlpha(theme.palette.grey[200], 0.3) }
      }}
    >
      {children}
    </Box>
  );
}

// ==============================|| NOTIFICATION LIST ||============================== //

export default function NotificationList({ requests = [], loading, onUpdateStatus }) {
  const containerSX = { gap: 1.5, pl: 7 };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ py: 4 }}>
        <CircularProgress size={26} />
      </Stack>
    );
  }

  // ── Empty ─────────────────────────────────────────────────────────────────
  if (!requests.length) {
    return (
      <Stack alignItems="center" justifyContent="center" spacing={1} sx={{ py: 4 }}>
        <IconBell size={36} stroke={1} color="#bbb" />
        <Typography variant="body2" color="text.disabled">
          No notifications
        </Typography>
      </Stack>
    );
  }

  // ── List ───────────────────────────────────────────────────────────────────
  return (
    <List sx={{ width: '100%', maxWidth: { xs: 300, md: 330 }, py: 0 }}>
      {requests.map((request) => {
        const { id, booking_id, request_status, customer, vendor, created_at } = request;
        const statusMeta = STATUS_META[request_status] || { label: request_status, color: 'default' };

        const avatarSrc = customer?.profilepic ? `${import.meta.env.VITE_API_BASE_URL}${customer.profilepic}` : null;

        return (
          <ListItemWrapper key={id}>
            {/* ── Row: avatar + name + time ── */}
            <ListItem
              alignItems="center"
              disablePadding
              secondaryAction={
                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Typography variant="caption">{formatDate(created_at)}</Typography>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar src={avatarSrc} alt={customer?.username} sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}>
                  {!avatarSrc && (customer?.username?.[0]?.toUpperCase() || '?')}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">{customer?.username || 'Unknown Customer'}</Typography>} />
            </ListItem>

            {/* ── Body: booking info + status + actions ── */}
            <Stack sx={containerSX}>
              <Typography variant="subtitle2">
                Booking request #{booking_id} for{' '}
                <Typography component="span" variant="h6">
                  {vendor?.business_name || vendor?.name || '—'}
                </Typography>
              </Typography>

              {/* Status chip */}
              <Chip label={statusMeta.label} color={statusMeta.color} size="small" sx={{ width: 'min-content' }} />

              {/* Accept / Reject — only for "sent" */}
              {request_status === 'sent' && (
                <Stack direction="row" sx={{ gap: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    startIcon={<IconCheck size={14} stroke={2} />}
                    sx={{ fontSize: 11, py: 0.4, px: 1.5, minWidth: 0 }}
                    onClick={() => onUpdateStatus(id, 'accepted')}
                  >
                    Accept
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<IconX size={14} stroke={2} />}
                    sx={{ fontSize: 11, py: 0.4, px: 1.5, minWidth: 0 }}
                    onClick={() => onUpdateStatus(id, 'rejected')}
                  >
                    Reject
                  </Button>
                </Stack>
              )}
            </Stack>
          </ListItemWrapper>
        );
      })}
    </List>
  );
}

NotificationList.propTypes = {
  requests: PropTypes.array,
  loading: PropTypes.bool,
  onUpdateStatus: PropTypes.func
};

ListItemWrapper.propTypes = { children: PropTypes.node };
