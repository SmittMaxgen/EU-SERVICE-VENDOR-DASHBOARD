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

// icons
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

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
  selectVendorServiceSuccess,
  selectSelectedVendorService
} from 'features/vendorService/vendorServiceSelectors';
import {
  clearVendorServiceMessages,
  setSelectedVendorService,
  clearSelectedVendorService
} from 'features/vendorService/vendorServiceSlice';

// ─────────────────────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  vendor: '', // vendor ID
  service: '', // service ID
  custom_price: '',
  status: 'active'
};

// ─────────────────────────────────────────────────────────────────────────────
// VendorServicesPage
// ─────────────────────────────────────────────────────────────────────────────
export default function VendorServicesPage() {
  const dispatch = useDispatch();

  const vendorServices = useSelector(selectAllVendorServices);
  console.log('vendorServices', vendorServices);
  const loading = useSelector(selectVendorServiceLoading);
  const error = useSelector(selectVendorServiceError);
  const success = useSelector(selectVendorServiceSuccess);
  const selectedVendorService = useSelector(selectSelectedVendorService);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [search, setSearch] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // ─── Fetch on mount ───────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(fetchVendorServices());
  }, [dispatch]);

  // ─── Snackbar handler ─────────────────────────────────────────────────────
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

  const handleOpenCreate = () => {
    setIsEditing(false);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const handleOpenEdit = (vs) => {
    setIsEditing(true);
    setForm({
      vendor: vs.vendor?.id ?? '',
      service: vs.service?.id ?? '',
      custom_price: vs.custom_price ?? '',
      status: vs.status ?? 'active',
      _id: vs.id
    });
    setDialogOpen(true);
  };

  const handleCardClick = (vs) => {
    dispatch(setSelectedVendorService(vs));
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
    dispatch(clearSelectedVendorService());
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vendor service?')) {
      dispatch(deleteVendorService(id));
    }
  };

  const handleSubmit = () => {
    const payload = {
      vendor: form.vendor ? Number(form.vendor) : undefined,
      service: form.service ? Number(form.service) : undefined,
      custom_price: form.custom_price,
      status: form.status
    };

    if (isEditing) {
      dispatch(updateVendorService({ id: form._id, data: payload }));
    } else {
      dispatch(createVendorService(payload));
    }
  };

  const filteredVendorServices = vendorServices.filter(
    (vs) => vs.vendor?.name?.toLowerCase().includes(search.toLowerCase()) || vs.service?.name?.toLowerCase().includes(search.toLowerCase())
  );

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
        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search by vendor or service name..."
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

        {/* ─── Cards Grid ─── */}
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
            {/* <Grid item xs={12}>
              <TextField
                label="Vendor ID *"
                fullWidth
                type="number"
                value={form.vendor}
                onChange={(e) => setForm({ ...form, vendor: e.target.value })}
                helperText="Enter the vendor's ID"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                label="Service ID *"
                fullWidth
                type="number"
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                helperText="Enter the service's ID"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Custom Price (₹)"
                fullWidth
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
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading || !form.vendor || !form.service}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ─── Detail Dialog ─── */}
      <Dialog open={detailOpen} onClose={handleDetailClose} maxWidth="xs" fullWidth>
        {selectedVendorService && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">{selectedVendorService.service?.name}</Typography>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    handleDetailClose();
                    handleOpenEdit(selectedVendorService);
                  }}
                >
                  Edit
                </Button>
              </Stack>
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ width: 130, flexShrink: 0 }}>
                    Vendor
                  </Typography>
                  <Typography>{selectedVendorService.vendor?.name}</Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ width: 130, flexShrink: 0 }}>
                    Service
                  </Typography>
                  <Typography>{selectedVendorService.service?.name}</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ width: 130, flexShrink: 0 }}>
                    Custom Price
                  </Typography>
                  <Typography fontWeight={700}>₹{selectedVendorService.custom_price}</Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ width: 130, flexShrink: 0 }}>
                    Status
                  </Typography>
                  <Typography
                    sx={{
                      color: selectedVendorService.status === 'active' ? 'success.main' : 'error.main',
                      fontWeight: 600,
                      textTransform: 'capitalize'
                    }}
                  >
                    {selectedVendorService.status}
                  </Typography>
                </Stack>
              </Stack>
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
