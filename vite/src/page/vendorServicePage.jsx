import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

// icons
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import VendorServiceCard from '../components/commonComponents/vendorServiceCard';

// redux
import {
  fetchVendorServices,
  createVendorService,
  updateVendorService,
  deleteVendorService
} from 'features/vendorService/vendorServiceThunk';
import {
  selectAllVendorServices,
  selectVendorServiceLoading,
  selectVendorServiceError,
  selectVendorServiceSuccess
} from 'features/vendorService/vendorServiceSelectors';
import { clearVendorServiceMessages } from 'features/vendorService/vendorServiceSlice';
import { fetchVendorById } from '../features/vendorProfile/vendorProfileThunk';
import { selectSelectedVendor } from '../features/vendorProfile/vendorProfileSelectors';

// ─────────────────────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  custom_price: '',
  status: 'active'
};
const BASE_URL = 'https://serviceapp.pythonanywhere.com';

// ─────────────────────────────────────────────────────────────────────────────
export default function VendorServicesPage() {
  const dispatch = useDispatch();

  // Selector returns the flat array directly: [{id, services:[...], ...}, ...]
  const vendorServices = useSelector(selectAllVendorServices) ?? [];
  const loading = useSelector(selectVendorServiceLoading);
  const error = useSelector(selectVendorServiceError);
  const success = useSelector(selectVendorServiceSuccess);
  const vendorData = useSelector(selectSelectedVendor);

  // Local state — avoids Redux losing nested arrays like services[]
  const [selectedItem, setSelectedItem] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [search, setSearch] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    dispatch(fetchVendorById());
  }, [dispatch]);

  useEffect(() => {
    if (vendorData?.data?.id) {
      dispatch(fetchVendorServices(vendorData.data.id));
    }
  }, [dispatch, vendorData]);

  useEffect(() => {
    if (success) {
      setSnackbar({ open: true, message: success, severity: 'success' });
      dispatch(clearVendorServiceMessages());
      setDialogOpen(false);
    }
    if (error) {
      setSnackbar({
        open: true,
        message: typeof error === 'string' ? error : 'Something went wrong',
        severity: 'error'
      });
      dispatch(clearVendorServiceMessages());
    }
  }, [success, error, dispatch]);

  const filteredVendorServices = vendorServices.filter((vs) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return vs.services?.some(
      (s) =>
        s.name?.toLowerCase().includes(q) || s.subcategory?.name?.toLowerCase().includes(q) || s.category?.name?.toLowerCase().includes(q)
    );
  });

  const handleOpenCreate = () => {
    setIsEditing(false);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const handleOpenEdit = (vs) => {
    setIsEditing(true);
    setForm({
      custom_price: vs.custom_price ?? '',
      status: vs.status ?? 'active',
      _id: vs.id
    });
    setDialogOpen(true);
  };

  // Store directly in local state — no Redux dispatch, no serialization loss
  const handleCardClick = (vs) => {
    setSelectedItem(vs);
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vendor service?')) {
      dispatch(deleteVendorService(id));
    }
  };

  const handleSubmit = () => {
    const payload = {
      custom_price: form.custom_price,
      status: form.status
    };
    if (isEditing) {
      dispatch(updateVendorService({ id: form._id, data: payload }));
    } else {
      dispatch(createVendorService(payload));
    }
  };

  return (
    <Box>
      <MainCard
        title="Vendor Services"
        secondary={
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenCreate}>
            Add Vendor Service
          </Button>
        }
      >
        <TextField
          fullWidth
          placeholder="Search by service, subcategory or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />

        <Grid container spacing={3}>
          {loading && vendorServices.length === 0
            ? [1, 2, 3, 4, 5, 6].map((i) => (
                <Grid key={i} item xs={12} sm={6} md={4}>
                  <VendorServiceCard isLoading />
                </Grid>
              ))
            : filteredVendorServices.map((vs) => (
                <Grid key={vs.id} item xs={12} sm={6} md={4}>
                  <VendorServiceCard
                    vendorService={vs}
                    onClick={() => handleCardClick(vs)}
                    onEdit={handleOpenEdit}
                    onDelete={handleDelete}
                  />
                </Grid>
              ))}

          {!loading && filteredVendorServices.length === 0 && (
            <Grid item xs={12}>
              <Typography color="text.secondary" textAlign="center" py={6}>
                No vendor services found.
              </Typography>
            </Grid>
          )}
        </Grid>
      </MainCard>

      {/* ─── Create / Edit Dialog ─── */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Vendor Service' : 'Add Vendor Service'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Custom Price (₹)"
                fullWidth
                type="number"
                value={form.custom_price}
                onChange={(e) => setForm({ ...form, custom_price: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField select label="Status" fullWidth value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ─── Detail Dialog ─── */}
      <Dialog open={detailOpen} onClose={handleDetailClose} maxWidth="sm" fullWidth>
        {selectedItem && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack spacing={0.5}>
                  <Typography variant="h4">Service Details</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={selectedItem.status === 'active' ? 'Active' : 'Inactive'}
                      size="small"
                      sx={{
                        bgcolor: selectedItem.status === 'active' ? 'success.dark' : 'error.dark',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.7rem'
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Custom Price: <strong>₹{selectedItem.custom_price}</strong>
                    </Typography>
                  </Stack>
                </Stack>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    handleDetailClose();
                    handleOpenEdit(selectedItem);
                  }}
                >
                  Edit
                </Button>
              </Stack>
            </DialogTitle>

            <DialogContent dividers>
              {Array.isArray(selectedItem.services) && selectedItem.services.length > 0 ? (
                <Stack spacing={2}>
                  <Typography variant="subtitle1" fontWeight={700}>
                    Included Services ({selectedItem.services.length})
                  </Typography>

                  {selectedItem.services.map((svc) => (
                    <Box
                      key={svc.id}
                      sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, bgcolor: 'background.default' }}
                    >
                      {/* Header */}
                      <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 1.5 }}>
                        <Avatar
                          src={svc.service_image ? `${BASE_URL || ''}${svc.service_image}` : undefined}
                          variant="rounded"
                          sx={{ width: 48, height: 48, bgcolor: 'primary.light' }}
                        >
                          <CategoryIcon />
                        </Avatar>
                        <Box flex={1}>
                          <Typography fontWeight={700} fontSize="1rem">
                            {svc.name}
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                            {svc.category?.name && <Chip label={svc.category.name} size="small" color="primary" variant="outlined" />}
                            {svc.subcategory?.name && (
                              <Chip label={svc.subcategory.name} size="small" color="secondary" variant="outlined" />
                            )}
                          </Stack>
                        </Box>
                        <Box textAlign="right">
                          <Typography fontSize="0.75rem" color="text.secondary">
                            Base Price
                          </Typography>
                          <Typography fontWeight={700} color="primary">
                            ₹{svc.base_price}
                          </Typography>
                        </Box>
                      </Stack>

                      <Divider sx={{ mb: 1.5 }} />

                      <Stack spacing={1}>
                        {svc.description && (
                          <Stack direction="row" spacing={1}>
                            <Typography variant="caption" color="text.secondary" sx={{ width: 120, flexShrink: 0, fontWeight: 600 }}>
                              Description
                            </Typography>
                            <Typography variant="caption">{svc.description}</Typography>
                          </Stack>
                        )}
                        {svc.what_covered && (
                          <Stack direction="row" spacing={1}>
                            <Typography variant="caption" color="text.secondary" sx={{ width: 120, flexShrink: 0, fontWeight: 600 }}>
                              What's Covered
                            </Typography>
                            <Typography variant="caption" color="success.main">
                              {svc.what_covered}
                            </Typography>
                          </Stack>
                        )}
                        {svc.not_covered && (
                          <Stack direction="row" spacing={1}>
                            <Typography variant="caption" color="text.secondary" sx={{ width: 120, flexShrink: 0, fontWeight: 600 }}>
                              Not Covered
                            </Typography>
                            <Typography variant="caption" color="error.main">
                              {svc.not_covered}
                            </Typography>
                          </Stack>
                        )}
                        {svc.will_need_from_you && (
                          <Stack direction="row" spacing={1}>
                            <Typography variant="caption" color="text.secondary" sx={{ width: 120, flexShrink: 0, fontWeight: 600 }}>
                              You'll Need
                            </Typography>
                            <Typography variant="caption">{svc.will_need_from_you}</Typography>
                          </Stack>
                        )}
                        <Stack direction="row" spacing={3}>
                          {svc.duration_minutes && (
                            <Stack direction="row" spacing={0.5}>
                              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                Duration:
                              </Typography>
                              <Typography variant="caption">{svc.duration_minutes} min</Typography>
                            </Stack>
                          )}
                          {svc.vat_percentage && (
                            <Stack direction="row" spacing={0.5}>
                              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                VAT:
                              </Typography>
                              <Typography variant="caption">{svc.vat_percentage}%</Typography>
                            </Stack>
                          )}
                        </Stack>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Typography color="text.secondary" textAlign="center" py={4}>
                  No services linked to this entry.
                </Typography>
              )}
            </DialogContent>

            <DialogActions>
              <Button onClick={handleDetailClose}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ─── Snackbar ─── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
