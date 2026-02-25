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
import IconButton from '@mui/material/IconButton';

// icons
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

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

  const vendorServices = useSelector(selectAllVendorServices) ?? [];
  const loading = useSelector(selectVendorServiceLoading);
  const error = useSelector(selectVendorServiceError);
  const success = useSelector(selectVendorServiceSuccess);
  const vendorData = useSelector(selectSelectedVendor);

  // null = show list, object = show detail
  const [selectedItem, setSelectedItem] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
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

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vendor service?')) {
      dispatch(deleteVendorService(id));
      setSelectedItem(null); // go back to list if deleted from detail view
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

  // ─── DETAIL VIEW ──────────────────────────────────────────────────────────
  if (selectedItem) {
    return (
      <Box>
        <MainCard
          title={
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton onClick={() => setSelectedItem(null)} size="small" sx={{ mr: 0.5 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h4">Service Details</Typography>
            </Stack>
          }
          secondary={
            <Button variant="outlined" color="primary" startIcon={<EditOutlinedIcon />} onClick={() => handleOpenEdit(selectedItem)}>
              Edit
            </Button>
          }
        >
          {/* ─── Summary Bar ─── */}
          <Box
            sx={{
              bgcolor: 'primary.dark',
              borderRadius: 2,
              p: 2.5,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2
            }}
          >
            <Stack spacing={0.5}>
              <Typography variant="caption" sx={{ color: 'primary.200' }}>
                Custom Price
              </Typography>
              <Typography variant="h3" sx={{ color: '#fff', fontWeight: 700 }}>
                ₹{selectedItem.custom_price}
              </Typography>
            </Stack>
            <Chip
              label={selectedItem.status === 'active' ? 'Active' : 'Inactive'}
              sx={{
                bgcolor: selectedItem.status === 'active' ? 'success.dark' : 'error.dark',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.85rem',
                px: 1
              }}
            />
          </Box>

          {/* ─── Services List ─── */}
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
            Included Services ({selectedItem.services?.length ?? 0})
          </Typography>

          {Array.isArray(selectedItem.services) && selectedItem.services.length > 0 ? (
            <Stack spacing={2}>
              {selectedItem.services.map((svc) => (
                <Box
                  key={svc.id}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    p: 2.5,
                    bgcolor: 'background.paper'
                  }}
                >
                  {/* Service header */}
                  <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                    <Avatar
                      src={svc.service_image ? `${BASE_URL || ''}${svc.service_image}` : undefined}
                      variant="rounded"
                      sx={{ width: 56, height: 56, bgcolor: 'primary.light' }}
                    >
                      <CategoryIcon />
                    </Avatar>
                    <Box flex={1}>
                      <Typography fontWeight={700} fontSize="1.05rem">
                        {svc.name}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.75 }} flexWrap="wrap">
                        {svc.category?.name && <Chip label={svc.category.name} size="small" color="primary" variant="outlined" />}
                        {svc.subcategory?.name && <Chip label={svc.subcategory.name} size="small" color="secondary" variant="outlined" />}
                        <Chip
                          label={svc.is_active ? 'Active' : 'Inactive'}
                          size="small"
                          sx={{
                            bgcolor: svc.is_active ? 'success.light' : 'error.light',
                            color: svc.is_active ? 'success.dark' : 'error.dark',
                            fontWeight: 600
                          }}
                        />
                      </Stack>
                    </Box>
                    <Box textAlign="right" flexShrink={0}>
                      <Typography fontSize="0.72rem" color="text.secondary">
                        Base Price
                      </Typography>
                      <Typography fontWeight={700} color="primary" fontSize="1.1rem">
                        ₹{svc.base_price}
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider sx={{ mb: 2 }} />

                  {/* Service details grid */}
                  <Grid container spacing={2}>
                    {svc.description && (
                      <Grid item xs={12}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
                          Description
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.25 }}>
                          {svc.description}
                        </Typography>
                      </Grid>
                    )}
                    {svc.what_covered && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
                          ✅ What's Covered
                        </Typography>
                        <Typography variant="body2" color="success.main" sx={{ mt: 0.25 }}>
                          {svc.what_covered}
                        </Typography>
                      </Grid>
                    )}
                    {svc.not_covered && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
                          ❌ Not Covered
                        </Typography>
                        <Typography variant="body2" color="error.main" sx={{ mt: 0.25 }}>
                          {svc.not_covered}
                        </Typography>
                      </Grid>
                    )}
                    {svc.will_need_from_you && (
                      <Grid item xs={12}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
                          🔧 You'll Need to Provide
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.25 }}>
                          {svc.will_need_from_you}
                        </Typography>
                      </Grid>
                    )}
                    {(svc.duration_minutes || svc.vat_percentage) && (
                      <Grid item xs={12}>
                        <Stack direction="row" spacing={3}>
                          {svc.duration_minutes && (
                            <Box>
                              <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
                                ⏱ Duration
                              </Typography>
                              <Typography variant="body2">{svc.duration_minutes} min</Typography>
                            </Box>
                          )}
                          {svc.vat_percentage && (
                            <Box>
                              <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
                                🧾 VAT
                              </Typography>
                              <Typography variant="body2">{svc.vat_percentage}%</Typography>
                            </Box>
                          )}
                        </Stack>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography color="text.secondary" textAlign="center" py={6}>
              No services linked to this entry.
            </Typography>
          )}
        </MainCard>

        {/* Edit Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Edit Vendor Service</DialogTitle>
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
                <TextField
                  select
                  label="Status"
                  fullWidth
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
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
              Update
            </Button>
          </DialogActions>
        </Dialog>

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

  // ─── LIST VIEW ────────────────────────────────────────────────────────────
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
                    onClick={() => setSelectedItem(vs)}
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

      {/* Create Dialog */}
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
