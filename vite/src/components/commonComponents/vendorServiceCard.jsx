import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

// icons
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import StoreIcon from '@mui/icons-material/Store';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton
// ─────────────────────────────────────────────────────────────────────────────
const VendorServiceCardSkeleton = () => (
  <MainCard border={false} content={false} sx={{ bgcolor: 'primary.dark', overflow: 'hidden' }}>
    <Box sx={{ p: 2.25 }}>
      <Skeleton variant="rounded" width={40} height={40} sx={{ bgcolor: 'primary.800', mb: 2 }} />
      <Skeleton variant="text" width="60%" sx={{ bgcolor: 'primary.800', mb: 1 }} />
      <Skeleton variant="text" width="40%" sx={{ bgcolor: 'primary.800' }} />
    </Box>
  </MainCard>
);

// ─────────────────────────────────────────────────────────────────────────────
// VendorServiceCard Component
// Props:
//   vendorService — vendor service object from API
//   isLoading     — show skeleton
//   onClick       — called when card body is clicked (view details)
//   onEdit        — called with vendorService object when Edit is clicked
//   onDelete      — called with vendorService.id when Delete is clicked
// ─────────────────────────────────────────────────────────────────────────────
export default function VendorServiceCard({ vendorService, isLoading, onClick, onEdit, onDelete }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = () => {
    handleMenuClose();
    onEdit?.(vendorService);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete?.(vendorService.id);
  };

  // if (isLoading) return <VendorServiceCardSkeleton />;

  const isActive = vendorService && vendorService?.status === 'active';

  return (
    <MainCard
      border={false}
      content={false}
      onClick={onClick}
      sx={{
        bgcolor: 'primary.dark',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': onClick ? { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(0,0,0,0.3)' } : {},
        '&:after': {
          content: '""',
          position: 'absolute',
          width: 210,
          height: 210,
          background: theme.palette.primary[800] ?? '#1565c0',
          borderRadius: '50%',
          top: { xs: -85 },
          right: { xs: -95 },
          pointerEvents: 'none'
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          width: 210,
          height: 210,
          background: theme.palette.primary[800] ?? '#1565c0',
          borderRadius: '50%',
          top: { xs: -125 },
          right: { xs: -15 },
          opacity: 0.5,
          pointerEvents: 'none'
        }
      }}
    >
      <Box sx={{ p: 2.25, position: 'relative', zIndex: 1 }}>
        {/* ─── Top Row: Vendor Avatar + Menu ─── */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: 'primary.800',
                color: '#fff',
                width: 36,
                height: 36,
                borderRadius: 1.5
              }}
            >
              <StoreIcon fontSize="small" />
            </Avatar>
            <Typography sx={{ fontSize: '0.8rem', color: 'primary.200', fontWeight: 600 }}>
              {vendorService?.vendor?.name ?? 'Vendor'}
            </Typography>
          </Stack>

          {/* Three-dot menu */}
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              bgcolor: 'primary.dark',
              color: 'primary.200',
              zIndex: 1
            }}
            aria-controls="menu-vendor-service-card"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MoreHorizIcon fontSize="inherit" />
          </Avatar>
        </Stack>

        <Menu
          id="menu-vendor-service-card"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          variant="selectedMenu"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleEdit}>
            <EditOutlinedIcon sx={{ mr: 1.75, fontSize: '1rem' }} /> Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <DeleteOutlineIcon sx={{ mr: 1.75, fontSize: '1rem' }} /> Delete
          </MenuItem>
        </Menu>

        {/* ─── Service Name ─── */}
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, mt: 1.5, mb: 0.5 }}>{vendorService?.service?.name ?? 'Service'}</Typography>

        <Divider sx={{ borderColor: 'primary.800', mb: 1.5 }} />

        {/* ─── Price Row ─── */}
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1.5 }}>
          <AttachMoneyIcon sx={{ fontSize: '1rem', color: 'primary.200' }} />
          <Typography sx={{ fontSize: '1.1rem', fontWeight: 700 }}>₹{vendorService?.custom_price ?? '—'}</Typography>
          <Typography sx={{ fontSize: '0.75rem', color: 'primary.200' }}>(Custom Price)</Typography>
        </Stack>

        {/* ─── Status Badge ─── */}
        <Chip
          label={isActive ? 'Active' : 'Inactive'}
          size="small"
          sx={{
            bgcolor: isActive ? 'success.dark' : 'error.dark',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.7rem'
          }}
        />
      </Box>
    </MainCard>
  );
}

VendorServiceCard.propTypes = {
  vendorService: PropTypes.shape({
    id: PropTypes.number,
    custom_price: PropTypes.string,
    status: PropTypes.string,
    vendor: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
    service: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
  }),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};
