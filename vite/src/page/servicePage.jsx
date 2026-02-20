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
import Divider from '@mui/material/Divider';

// icons
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ServiceCard from '../components/commonComponents/ServiceCard';

// redux
import { fetchServices, createService, updateService, deleteService } from '../features/services/serviceThunk';
import { selectAllServices, selectServiceLoading, selectServiceError, selectServiceSuccess } from '../features/services/serviceSelectors';
import { clearServiceMessages, setSelectedService, clearSelectedService } from '../features/services/serviceSlice';
import { selectSelectedService } from '../features/services/serviceSelectors';

// ─────────────────────────────────────────────────────────────────────────────
// Empty Form State
// ─────────────────────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  name: '',
  description: '',
  duration_minutes: '',
  base_price: '',
  vat_percentage: '',
  what_covered: '',
  will_need_from_you: '',
  not_covered: '',
  is_active: true,
  category: '', // category ID
  subcategory: '' // subcategory ID
};

// ─────────────────────────────────────────────────────────────────────────────
// ServicesPage
// ─────────────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const dispatch = useDispatch();

  const services = useSelector(selectAllServices);
  const loading = useSelector(selectServiceLoading);
  const error = useSelector(selectServiceError);
  const success = useSelector(selectServiceSuccess);
  const selectedService = useSelector(selectSelectedService);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [search, setSearch] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // ─── Fetch on mount ───────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // ─── Handle success/error snackbar ───────────────────────────────────────
  useEffect(() => {
    if (success) {
      setSnackbar({ open: true, message: success, severity: 'success' });
      dispatch(clearServiceMessages());
      setDialogOpen(false);
    }
    if (error) {
      setSnackbar({ open: true, message: typeof error === 'string' ? error : 'Something went wrong', severity: 'error' });
      dispatch(clearServiceMessages());
    }
  }, [success, error, dispatch]);

  // ─── Open create dialog ───────────────────────────────────────────────────
  const handleOpenCreate = () => {
    setIsEditing(false);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  // ─── Open edit dialog ─────────────────────────────────────────────────────
  const handleOpenEdit = (service) => {
    setIsEditing(true);
    setForm({
      name: service.name ?? '',
      description: service.description ?? '',
      duration_minutes: service.duration_minutes ?? '',
      base_price: service.base_price ?? '',
      vat_percentage: service.vat_percentage ?? '',
      what_covered: service.what_covered ?? '',
      will_need_from_you: service.will_need_from_you ?? '',
      not_covered: service.not_covered ?? '',
      is_active: service.is_active ?? true,
      category: service.category?.id ?? '',
      subcategory: service.subcategory?.id ?? '',
      _id: service.id
    });
    setDialogOpen(true);
  };

  // ─── Open detail dialog on card click ────────────────────────────────────
  const handleCardClick = (service) => {
    dispatch(setSelectedService(service));
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
    dispatch(clearSelectedService());
  };

  // ─── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      dispatch(deleteService(id));
    }
  };

  const handleAdd = (id) => {
    if (window.confirm('Are you sure you want to Add this service?')) {
      dispatch(deleteService(id));
    }
  };

  // ─── Form Submit ──────────────────────────────────────────────────────────
  const handleSubmit = () => {
    const payload = {
      name: form.name,
      description: form.description,
      duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : undefined,
      base_price: form.base_price,
      vat_percentage: form.vat_percentage,
      what_covered: form.what_covered,
      will_need_from_you: form.will_need_from_you,
      not_covered: form.not_covered,
      is_active: form.is_active,
      category: form.category ? Number(form.category) : undefined,
      subcategory: form.subcategory ? Number(form.subcategory) : undefined
    };

    if (isEditing) {
      dispatch(updateService({ id: form._id, data: payload }));
    } else {
      dispatch(createService(payload));
    }
  };

  // ─── Filter services by search ────────────────────────────────────────────
  const filteredServices = services.filter(
    (s) => s.name?.toLowerCase().includes(search.toLowerCase()) || s.category?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      {/* ─── Header ─── */}
      <MainCard
        title="Services"
        secondary={
          <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={handleOpenCreate}>
            Add Service
          </Button>
        }
      >
        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search by name or category..."
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
          {loading && services.length === 0
            ? // Show skeletons while loading for the first time
              [1, 2, 3, 4, 5, 6].map((i) => (
                <Grid key={i} item xs={12} sm={6} md={4}>
                  <ServiceCard isLoading />
                </Grid>
              ))
            : filteredServices.map((service) => (
                <Grid key={service.id} item xs={12} sm={6} md={4}>
                  <ServiceCard
                    service={service}
                    onClick={() => handleCardClick(service)}
                    onEdit={handleOpenEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                  />
                </Grid>
              ))}

          {!loading && filteredServices.length === 0 && (
            <Grid item xs={12}>
              <Typography color="text.secondary" textAlign="center" py={6}>
                No services found.
              </Typography>
            </Grid>
          )}
        </Grid>
      </MainCard>

      {/* ─── Create / Edit Dialog ─── */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Service' : 'Add New Service'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12}>
              <TextField label="Service Name *" fullWidth value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Category ID *"
                fullWidth
                type="number"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                helperText="Enter category ID"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Subcategory ID *"
                fullWidth
                type="number"
                value={form.subcategory}
                onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                helperText="Enter subcategory ID"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Base Price (₹)"
                fullWidth
                value={form.base_price}
                onChange={(e) => setForm({ ...form, base_price: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Duration (minutes)"
                fullWidth
                type="number"
                value={form.duration_minutes}
                onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="VAT %"
                fullWidth
                value={form.vat_percentage}
                onChange={(e) => setForm({ ...form, vat_percentage: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="What's Covered"
                fullWidth
                multiline
                rows={2}
                value={form.what_covered}
                onChange={(e) => setForm({ ...form, what_covered: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="What We'll Need From You"
                fullWidth
                multiline
                rows={2}
                value={form.will_need_from_you}
                onChange={(e) => setForm({ ...form, will_need_from_you: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Not Covered"
                fullWidth
                multiline
                rows={2}
                value={form.not_covered}
                onChange={(e) => setForm({ ...form, not_covered: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="secondary" disabled={loading || !form.name}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ─── Detail Dialog (on card click) ─── */}
      <Dialog open={detailOpen} onClose={handleDetailClose} maxWidth="sm" fullWidth>
        {selectedService && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">{selectedService.name}</Typography>
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    handleDetailClose();
                    handleOpenEdit(selectedService);
                  }}
                >
                  Edit
                </Button>
              </Stack>
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ width: 140, flexShrink: 0 }}>
                    Category
                  </Typography>
                  <Typography>{selectedService.category?.name}</Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ width: 140, flexShrink: 0 }}>
                    Subcategory
                  </Typography>
                  <Typography>{selectedService.subcategory?.name}</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ width: 140, flexShrink: 0 }}>
                    Base Price
                  </Typography>
                  <Typography fontWeight={700}>₹{selectedService.base_price}</Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ width: 140, flexShrink: 0 }}>
                    Duration
                  </Typography>
                  <Typography>{selectedService.duration_minutes} minutes</Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ width: 140, flexShrink: 0 }}>
                    VAT
                  </Typography>
                  <Typography>{selectedService.vat_percentage}%</Typography>
                </Stack>
                <Divider />
                {selectedService.description && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Description
                    </Typography>
                    <Typography variant="body2">{selectedService.description}</Typography>
                  </Box>
                )}
                {selectedService.what_covered && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      What's Covered
                    </Typography>
                    <Typography variant="body2">{selectedService.what_covered}</Typography>
                  </Box>
                )}
                {selectedService.will_need_from_you && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      What We'll Need
                    </Typography>
                    <Typography variant="body2">{selectedService.will_need_from_you}</Typography>
                  </Box>
                )}
                {selectedService.not_covered && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Not Covered
                    </Typography>
                    <Typography variant="body2">{selectedService.not_covered}</Typography>
                  </Box>
                )}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDetailClose}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ─── Snackbar Feedback ─── */}
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
