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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton Loader
// ─────────────────────────────────────────────────────────────────────────────
const ServiceCardSkeleton = () => (
  <MainCard border={false} content={false} sx={{ bgcolor: 'secondary.dark', overflow: 'hidden' }}>
    <Box sx={{ p: 2.25 }}>
      <Skeleton variant="rounded" width={40} height={40} sx={{ bgcolor: 'secondary.800', mb: 2 }} />
      <Skeleton variant="text" width="60%" sx={{ bgcolor: 'secondary.800', mb: 1 }} />
      <Skeleton variant="text" width="40%" sx={{ bgcolor: 'secondary.800', mb: 2 }} />
      <Skeleton variant="text" width="80%" sx={{ bgcolor: 'secondary.800' }} />
    </Box>
  </MainCard>
);

// ─────────────────────────────────────────────────────────────────────────────
// ServiceCard Component
// Props:
//   service     — service object from API
//   isLoading   — show skeleton
//   onClick     — called when card body is clicked (view details)
//   onEdit      — called with service object when Edit is clicked
//   onDelete    — called with service.id when Delete is clicked
// ─────────────────────────────────────────────────────────────────────────────
export default function ServiceCard({ service, isLoading, onClick, onAdd, onEdit, onDelete }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (e) => {
    e.stopPropagation(); // prevent card click
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = () => {
    handleMenuClose();
    onEdit?.(service);
  };

  const handleAdd = () => {
    handleMenuClose();
    onAdd?.(service);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete?.(service.id);
  };

  if (isLoading) return <ServiceCardSkeleton />;

  return (
    <MainCard
      border={false}
      content={false}
      onClick={onClick}
      sx={{
        bgcolor: 'secondary.dark',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': onClick
          ? {
              transform: 'translateY(-4px)',
              boxShadow: `0 12px 32px rgba(0,0,0,0.3)`
            }
          : {},
        // decorative circles — matching EarningCard style
        '&:after': {
          content: '""',
          position: 'absolute',
          width: 210,
          height: 210,
          background: theme.vars?.palette?.secondary?.[800] ?? theme.palette.secondary[800],
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
          background: theme.vars?.palette?.secondary?.[800] ?? theme.palette.secondary[800],
          borderRadius: '50%',
          top: { xs: -125 },
          right: { xs: -15 },
          opacity: 0.5,
          pointerEvents: 'none'
        }
      }}
    >
      <Box sx={{ p: 2.25, position: 'relative', zIndex: 1 }}>
        {/* ─── Top Row: Category chip + Menu ─── */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack spacing={0.5}>
            <Chip
              label={service.category?.name ?? 'Uncategorized'}
              size="small"
              sx={{
                bgcolor: 'secondary.800',
                color: 'secondary.200',
                fontWeight: 600,
                fontSize: '0.7rem',
                height: 22
              }}
            />
            {service.subcategory?.name && (
              <Chip
                label={service.subcategory.name}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: 'secondary.200',
                  color: 'secondary.200',
                  fontSize: '0.65rem',
                  height: 20
                }}
              />
            )}
          </Stack>

          {/* Three-dot menu */}
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              bgcolor: 'secondary.dark',
              color: 'secondary.200',
              zIndex: 1
            }}
            aria-controls="menu-service-card"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MoreHorizIcon fontSize="inherit" />
          </Avatar>
        </Stack>

        <Menu
          id="menu-service-card"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          variant="selectedMenu"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleAdd}>
            <EditOutlinedIcon sx={{ mr: 1.75, fontSize: '1rem' }} /> Add Service
          </MenuItem>
          {/* <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <DeleteOutlineIcon sx={{ mr: 1.75, fontSize: '1rem' }} /> Delete Service
          </MenuItem> */}
        </Menu>

        {/* ─── Service Name ─── */}
        <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, mt: 1.5, mb: 0.5, lineHeight: 1.3 }}>{service.name}</Typography>

        {/* ─── Description ─── */}
        {service.description && (
          <Typography
            sx={{
              fontSize: '0.8rem',
              color: 'secondary.200',
              mb: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {service.description}
          </Typography>
        )}

        <Divider sx={{ borderColor: 'secondary.800', mb: 1.5 }} />

        {/* ─── Stats Row ─── */}
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {/* Price */}
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <AttachMoneyIcon sx={{ fontSize: '1rem', color: 'secondary.200' }} />
            <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>₹{service.base_price}</Typography>
          </Stack>

          {/* Duration */}
          {service.duration_minutes && (
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <AccessTimeIcon sx={{ fontSize: '1rem', color: 'secondary.200' }} />
              <Typography sx={{ fontSize: '0.85rem', color: 'secondary.200' }}>{service.duration_minutes} min</Typography>
            </Stack>
          )}

          {/* VAT */}
          {service.vat_percentage && (
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <PercentIcon sx={{ fontSize: '1rem', color: 'secondary.200' }} />
              <Typography sx={{ fontSize: '0.85rem', color: 'secondary.200' }}>{service.vat_percentage} VAT</Typography>
            </Stack>
          )}
        </Stack>

        {/* ─── Active Badge ─── */}
        <Box sx={{ mt: 1.5 }}>
          <Chip
            label={service.is_active ? 'Active' : 'Inactive'}
            size="small"
            sx={{
              bgcolor: service.is_active ? 'success.dark' : 'error.dark',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.7rem'
            }}
          />
        </Box>
      </Box>
    </MainCard>
  );
}

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    base_price: PropTypes.string,
    duration_minutes: PropTypes.number,
    vat_percentage: PropTypes.string,
    is_active: PropTypes.bool,
    category: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
    subcategory: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
  }),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};
