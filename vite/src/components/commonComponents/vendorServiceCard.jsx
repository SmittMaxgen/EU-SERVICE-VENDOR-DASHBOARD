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
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton — same fixed height as the real card
// ─────────────────────────────────────────────────────────────────────────────
const VendorServiceCardSkeleton = () => (
  <MainCard border={false} content={false} sx={{ bgcolor: 'primary.dark', overflow: 'hidden', height: 200 }}>
    <Box sx={{ p: 2.25 }}>
      <Skeleton variant="rounded" width={40} height={40} sx={{ bgcolor: 'primary.800', mb: 2 }} />
      <Skeleton variant="text" width="60%" sx={{ bgcolor: 'primary.800', mb: 1 }} />
      <Skeleton variant="text" width="40%" sx={{ bgcolor: 'primary.800' }} />
    </Box>
  </MainCard>
);

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

  if (isLoading) return <VendorServiceCardSkeleton />;

  const isActive = vendorService?.status === 'active';
  const services = vendorService?.services ?? [];
  const primaryService = services[0];
  const displayTitle = primaryService?.name ?? 'Service';
  const subcategories = [...new Map(services.map((s) => [s.subcategory?.id, s.subcategory]).filter(([id]) => id)).values()];

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
        // ── Fixed dimensions — every card same size ──
        height: 200,
        display: 'flex',
        flexDirection: 'column',
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
      <Box
        sx={{
          p: 2.25,
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden' // clip any overflow text inside the fixed box
        }}
      >
        {/* ─── Top Row: Icon + Three-dot menu ─── */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ flexShrink: 0 }}>
          <Avatar variant="rounded" sx={{ bgcolor: 'primary.800', color: '#fff', width: 36, height: 36, borderRadius: 1.5 }}>
            <MiscellaneousServicesIcon fontSize="small" />
          </Avatar>

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

        {/* ─── Service Name — single line, ellipsis if too long ─── */}
        <Typography
          sx={{
            fontSize: '1.1rem',
            fontWeight: 700,
            mt: 1.25,
            mb: 0.25,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {displayTitle}
        </Typography>

        {services.length > 1 && (
          <Typography sx={{ fontSize: '0.72rem', color: 'primary.200', mb: 0.25, flexShrink: 0 }}>
            +{services.length - 1} more service{services.length - 1 > 1 ? 's' : ''}
          </Typography>
        )}

        <Divider sx={{ borderColor: 'primary.800', my: 1, flexShrink: 0 }} />

        {/* ─── Subcategory Tags ─── */}
        {subcategories.length > 0 && (
          <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mb: 0.75, flexShrink: 0 }}>
            {subcategories.slice(0, 2).map(
              (
                sub // max 2 chips to avoid overflow
              ) => (
                <Chip
                  key={sub.id}
                  label={sub.name}
                  size="small"
                  sx={{ bgcolor: 'primary.800', color: 'primary.200', fontSize: '0.65rem', fontWeight: 600, height: 18 }}
                />
              )
            )}
            {subcategories.length > 2 && (
              <Chip
                label={`+${subcategories.length - 2}`}
                size="small"
                sx={{ bgcolor: 'primary.800', color: 'primary.200', fontSize: '0.65rem', fontWeight: 600, height: 18 }}
              />
            )}
          </Stack>
        )}

        {/* ─── Bottom: Price + Status pushed to end ─── */}
        <Box sx={{ mt: 'auto', flexShrink: 0 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={0.25}>
              <CurrencyRupeeIcon sx={{ fontSize: '0.95rem', color: 'primary.200' }} />
              <Typography sx={{ fontSize: '1.05rem', fontWeight: 700 }}>{vendorService?.custom_price ?? '—'}</Typography>
              <Typography sx={{ fontSize: '0.7rem', color: 'primary.200' }}>(Custom)</Typography>
            </Stack>

            <Chip
              label={isActive ? 'Active' : 'Inactive'}
              size="small"
              sx={{
                bgcolor: isActive ? 'success.dark' : 'error.dark',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.68rem',
                height: 20
              }}
            />
          </Stack>
        </Box>
      </Box>
    </MainCard>
  );
}

VendorServiceCard.propTypes = {
  vendorService: PropTypes.shape({
    id: PropTypes.number,
    vendor_id: PropTypes.number,
    service_id: PropTypes.arrayOf(PropTypes.number),
    custom_price: PropTypes.string,
    status: PropTypes.string,
    services: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        base_price: PropTypes.string,
        description: PropTypes.string,
        duration_minutes: PropTypes.number,
        vat_percentage: PropTypes.string,
        what_covered: PropTypes.string,
        not_covered: PropTypes.string,
        will_need_from_you: PropTypes.string,
        service_image: PropTypes.string,
        category: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
        subcategory: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
      })
    )
  }),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};
