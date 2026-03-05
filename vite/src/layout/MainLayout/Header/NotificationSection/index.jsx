// import { Activity, useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CardActions from '@mui/material/CardActions';
// import Chip from '@mui/material/Chip';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import Divider from '@mui/material/Divider';
// import Paper from '@mui/material/Paper';
// import Popper from '@mui/material/Popper';
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';
// import Transitions from 'ui-component/extended/Transitions';
// import NotificationList from './NotificationList';

// // assets
// import { IconBell } from '@tabler/icons-react';

// // notification status options
// const status = [
//   {
//     value: 'all',
//     label: 'All Notification'
//   },
//   {
//     value: 'new',
//     label: 'New'
//   },
//   {
//     value: 'unread',
//     label: 'Unread'
//   },
//   {
//     value: 'other',
//     label: 'Other'
//   }
// ];

// // ==============================|| NOTIFICATION ||============================== //

// export default function NotificationSection() {
//   const theme = useTheme();
//   const downMD = useMediaQuery(theme.breakpoints.down('md'));

//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState('');

//   /**
//    * anchorRef is used on different componets and specifying one type leads to other components throwing an error
//    * */
//   const anchorRef = useRef(null);

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }
//     setOpen(false);
//   };

//   const prevOpen = useRef(open);
//   useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }
//     prevOpen.current = open;
//   }, [open]);

//   const handleChange = (event) => {
//     event?.target.value && setValue(event?.target.value);
//   };

//   return (
//     <>
//       <Box sx={{ ml: 2 }}>
//         <Avatar
//           variant="rounded"
//           sx={{
//             ...theme.typography.commonAvatar,
//             ...theme.typography.mediumAvatar,
//             transition: 'all .2s ease-in-out',
//             color: theme.vars.palette.warning.dark,
//             background: theme.vars.palette.warning.light,
//             '&:hover, &[aria-controls="menu-list-grow"]': {
//               color: theme.vars.palette.warning.light,
//               background: theme.vars.palette.warning.dark
//             }
//           }}
//           ref={anchorRef}
//           aria-controls={open ? 'menu-list-grow' : undefined}
//           aria-haspopup="true"
//           onClick={handleToggle}
//         >
//           <IconBell stroke={1.5} size="20px" />
//         </Avatar>
//       </Box>
//       <Popper
//         placement={downMD ? 'bottom' : 'bottom-end'}
//         open={open}
//         anchorEl={anchorRef.current}
//         role={undefined}
//         transition
//         disablePortal
//         modifiers={[{ name: 'offset', options: { offset: [downMD ? 5 : 0, 20] } }]}
//       >
//         {({ TransitionProps }) => (
//           <ClickAwayListener onClickAway={handleClose}>
//             <Transitions position={downMD ? 'top' : 'top-right'} in={open} {...TransitionProps}>
//               <Paper>
//                 <Activity mode={open ? 'visible' : 'hidden'}>
//                   <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]} sx={{ maxWidth: 330 }}>
//                     <Stack sx={{ gap: 2 }}>
//                       <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', pt: 2, px: 2 }}>
//                         <Stack direction="row" sx={{ gap: 2 }}>
//                           <Typography variant="subtitle1">All Notification</Typography>
//                           <Chip size="small" label="01" variant="filled" sx={{ color: 'background.default', bgcolor: 'warning.dark' }} />
//                         </Stack>
//                         <Typography component={Link} to="#" variant="subtitle2" sx={{ color: 'primary.main' }}>
//                           Mark as all read
//                         </Typography>
//                       </Stack>
//                       <Box sx={{ height: 1, maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden', '&::-webkit-scrollbar': { width: 5 } }}>
//                         <Box sx={{ px: 2, pt: 0.25 }}>
//                           <TextField
//                             id="outlined-select-currency-native"
//                             select
//                             fullWidth
//                             value={value}
//                             onChange={handleChange}
//                             slotProps={{ select: { native: true } }}
//                           >
//                             {status.map((option) => (
//                               <option key={option.value} value={option.value}>
//                                 {option.label}
//                               </option>
//                             ))}
//                           </TextField>
//                         </Box>
//                         <Divider sx={{ mt: 2 }} />
//                         <NotificationList />
//                       </Box>
//                     </Stack>
//                     <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
//                       <Button size="small" disableElevation>
//                         View All
//                       </Button>
//                     </CardActions>
//                   </MainCard>
//                 </Activity>
//               </Paper>
//             </Transitions>
//           </ClickAwayListener>
//         )}
//       </Popper>
//     </>
//   );
// }
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';

// redux
import { fetchBookingRequests, updateBookingRequest } from '../../../../features/bookingRequest/bookingRequestThunk';
import { selectAllBookingRequests, selectBookingRequestLoading } from '../../../../features/bookingRequest/bookingRequestSelectors';
import { clearBookingRequestMessages } from '../../../../features/bookingRequest/bookingRequestSlice';

// assets
import { IconBell } from '@tabler/icons-react';
import { selectSelectedVendor } from '../../../../features/vendorProfile/vendorProfileSelectors';

// ─── Filter tabs ──────────────────────────────────────────────────────────────
const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'sent', label: 'Sent' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'timeout', label: 'Timeout' }
];

// ─── Notification category tabs ───────────────────────────────────────────────
const CATEGORY_OPTIONS = [
  { value: 'booking_requests', label: 'Booking Requests' }
  // add more categories here later e.g. { value: 'orders', label: 'Orders' }
];

// ==============================|| NOTIFICATION ||============================== //

export default function NotificationSection() {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();

  // ✅ Adjust path to match your auth slice
  const vendorId = useSelector((state) => state.auth.user?.vendor_id);
  const vendorData = useSelector(selectSelectedVendor);
  console.log('vendorData:::>>>', vendorData);
  const bookingRequests = useSelector(selectAllBookingRequests);
  const loading = useSelector(selectBookingRequestLoading);

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('booking_requests');
  const [status, setStatus] = useState('all');

  const anchorRef = useRef(null);

  // ─── Fetch when panel opens OR category changes to booking_requests ─────────
  // Hits: GET /booking-requests/?vendor_id=15
  useEffect(() => {
    if (open && category === 'booking_requests' && vendorData) {
      dispatch(fetchBookingRequests({ vendor_id: vendorData.data.id }));
    }
  }, [open, category, vendorData, dispatch]);

  // ─── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => {
    return () => dispatch(clearBookingRequestMessages());
  }, [dispatch]);

  // ─── Focus trap on close ──────────────────────────────────────────────────
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleToggle = () => setOpen((prev) => !prev);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  // ─── Update request status ─────────────────────────────────────────────────
  // Hits: PATCH /booking-requests/{id}/  { request_status: 'accepted' }
  const handleUpdateStatus = (id, newStatus) => {
    dispatch(updateBookingRequest({ id, data: { request_status: newStatus } }));
  };

  // ─── Filter list by status dropdown ───────────────────────────────────────
  const filteredRequests = status === 'all' ? bookingRequests : bookingRequests.filter((r) => r.request_status === status);

  // ─── Badge = only "sent" (pending/unresponded) ────────────────────────────
  const unreadCount = bookingRequests.filter((r) => r.request_status === 'sent').length;

  return (
    <>
      <Box sx={{ ml: 2 }}>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            transition: 'all .2s ease-in-out',
            color: theme.vars.palette.warning.dark,
            background: theme.vars.palette.warning.light,
            '&:hover, &[aria-controls="menu-list-grow"]': {
              color: theme.vars.palette.warning.light,
              background: theme.vars.palette.warning.dark
            }
          }}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <IconBell stroke={1.5} size="20px" />
        </Avatar>
      </Box>

      <Popper
        placement={downMD ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[{ name: 'offset', options: { offset: [downMD ? 5 : 0, 20] } }]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions position={downMD ? 'top' : 'top-right'} in={open} {...TransitionProps}>
              <Paper>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]} sx={{ maxWidth: 360 }}>
                  <Stack sx={{ gap: 1.5 }}>
                    {/* ── Header ── */}
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', pt: 2, px: 2 }}>
                      <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                        <Typography variant="subtitle1">Notifications</Typography>
                        {unreadCount > 0 && (
                          <Chip
                            size="small"
                            label={unreadCount}
                            variant="filled"
                            sx={{ color: 'background.default', bgcolor: 'warning.dark' }}
                          />
                        )}
                      </Stack>
                      <Typography component={Link} to="#" variant="subtitle2" sx={{ color: 'primary.main' }}>
                        Mark all read
                      </Typography>
                    </Stack>

                    {/* ── Category Selector ── */}
                    <Box sx={{ px: 2 }}>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          setStatus('all');
                        }}
                        slotProps={{ select: { native: true } }}
                      >
                        {CATEGORY_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </TextField>
                    </Box>

                    {/* ── Status Filter ── */}
                    <Box sx={{ px: 2 }}>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        slotProps={{ select: { native: true } }}
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </TextField>
                    </Box>

                    <Divider />

                    {/* ── List ── */}
                    <Box sx={{ maxHeight: 'calc(100vh - 260px)', overflowY: 'auto', '&::-webkit-scrollbar': { width: 5 } }}>
                      <NotificationList requests={filteredRequests} loading={loading} onUpdateStatus={handleUpdateStatus} />
                    </Box>
                  </Stack>

                  <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                    <Button size="small" disableElevation>
                      View All
                    </Button>
                  </CardActions>
                </MainCard>
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}
