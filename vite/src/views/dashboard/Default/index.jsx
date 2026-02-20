import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// existing imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from '../../../ui-component/cards/TotalIncomeDarkCard';
import TotalIncomeLightCard from '../../../ui-component/cards/TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

// cards
import ServiceCard from '../../../components/commonComponents/ServiceCard';
import VendorServiceCard from '../../../components/commonComponents/vendorServiceCard';

// redux — vendorService
import { fetchVendorServices, updateVendorService, deleteVendorService } from '../../../features/vendorService/vendorServiceThunk';
import {
  selectAllVendorServices,
  selectVendorServiceLoading,
  selectVendorServiceSuccess,
  selectVendorServiceError
} from '../../../features/vendorService/vendorServiceSelectors';
import { clearVendorServiceMessages } from '../../../features/vendorService/vendorServiceSlice';

// redux — service
import { fetchServices } from '../../../features/services/serviceThunk';
import { selectAllServices, selectServiceLoading } from '../../../features/services/serviceSelectors';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);

  // ── Selectors ──────────────────────────────────────────────────────────────
  const vendorServices = useSelector(selectAllVendorServices);
  const vendorLoading = useSelector(selectVendorServiceLoading);
  const vendorSuccess = useSelector(selectVendorServiceSuccess);
  const vendorError = useSelector(selectVendorServiceError);
  const services = useSelector(selectAllServices);
  const servicesLoading = useSelector(selectServiceLoading);

  // ── Dialog state ───────────────────────────────────────────────────────────
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [activeVS, setActiveVS] = useState(null); // the clicked vendor service
  const [editForm, setEditForm] = useState({ custom_price: '', status: 'active' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // ── Fetch on mount ─────────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(fetchVendorServices());
    dispatch(fetchServices());
    setLoading(false);
  }, [dispatch]);

  // ── Snackbar on success / error ────────────────────────────────────────────
  useEffect(() => {
    if (vendorSuccess) {
      setSnackbar({ open: true, message: vendorSuccess, severity: 'success' });
      dispatch(clearVendorServiceMessages());
      setEditOpen(false);
      setDetailOpen(false);
    }
    if (vendorError) {
      setSnackbar({ open: true, message: typeof vendorError === 'string' ? vendorError : 'Something went wrong', severity: 'error' });
      dispatch(clearVendorServiceMessages());
    }
  }, [vendorSuccess, vendorError, dispatch]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  // 1️⃣ Card clicked → open detail dialog
  const handleCardClick = (vs) => {
    setActiveVS(vs);
    setDetailOpen(true);
  };

  // 2️⃣ Edit clicked (from card menu OR detail dialog)
  const handleEditOpen = (vs) => {
    setActiveVS(vs);
    setEditForm({ custom_price: vs.custom_price ?? '', status: vs.status ?? 'active' });
    setDetailOpen(false);
    setEditOpen(true);
  };

  // 3️⃣ Submit edit → PATCH API
  const handleEditSubmit = () => {
    dispatch(
      updateVendorService({
        id: activeVS.id,
        data: {
          custom_price: editForm.custom_price,
          status: editForm.status
        }
      })
    );
  };

  // 4️⃣ Delete → DELETE API
  const handleDelete = (id) => {
    if (window.confirm('Delete this vendor service?')) {
      dispatch(deleteVendorService(id));
      setDetailOpen(false);
    }
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          {/* <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid> */}

          {/* ✅ DYNAMIC VendorServiceCard */}
          {/* <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <VendorServiceCard
              isLoading={vendorLoading}
              vendorService={vendorServices[0]}
              onClick={() => handleCardClick(vendorServices[0])} // ← opens detail dialog
              onEdit={(vs) => handleEditOpen(vs)} // ← opens edit dialog
              onDelete={(id) => handleDelete(id)} // ← calls DELETE API
            />
          </Grid> */}

          {/* <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
            <Grid container spacing={gridSpacing}>
              <Grid size={{ sm: 6, xs: 12, md: 6, lg: 12 }}>
                <TotalIncomeDarkCard isLoading={isLoading} />
              </Grid>
              <Grid size={{ sm: 6, xs: 12, md: 6, lg: 12 }}>
                <TotalIncomeLightCard
                  isLoading={isLoading}
                  total={203}
                  label="Total Income"
                  icon={<StorefrontTwoToneIcon fontSize="inherit" />}
                />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>

      {/* Service Cards Row */}
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          {(servicesLoading ? [1, 2, 3] : services.slice(0, 3)).map((service, i) => (
            <Grid key={servicesLoading ? i : service.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ServiceCard
                isLoading={servicesLoading}
                service={servicesLoading ? null : service}
                onClick={() => navigate(`/subcategory/${service?.id}`)}
                // onClick={() => navigate(`/services`)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid> */}

      {/* ─────────────────────────────────────────────────────────────────────
          DETAIL DIALOG — opens on card click
      ───────────────────────────────────────────────────────────────────── */}
      <Dialog open={detailOpen} onClose={() => setDetailOpen(false)} maxWidth="xs" fullWidth>
        {activeVS && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">{activeVS.service?.name}</Typography>
                <Chip
                  label={activeVS.status}
                  size="small"
                  sx={{
                    bgcolor: activeVS.status === 'active' ? 'success.dark' : 'error.dark',
                    color: '#fff',
                    fontWeight: 700,
                    textTransform: 'capitalize'
                  }}
                />
              </Stack>
            </DialogTitle>

            <DialogContent dividers>
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ width: 130 }}>
                    Vendor
                  </Typography>
                  <Typography fontWeight={600}>{activeVS.vendor?.name}</Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ width: 130 }}>
                    Service
                  </Typography>
                  <Typography>{activeVS.service?.name}</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ width: 130 }}>
                    Custom Price
                  </Typography>
                  <Typography fontWeight={700} fontSize="1.1rem">
                    ₹{activeVS.custom_price}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ width: 130 }}>
                    Created At
                  </Typography>
                  <Typography>{new Date(activeVS.created_at).toLocaleDateString()}</Typography>
                </Stack>
              </Stack>
            </DialogContent>

            <DialogActions>
              <Button color="error" onClick={() => handleDelete(activeVS.id)}>
                Delete
              </Button>
              <Button variant="outlined" onClick={() => handleEditOpen(activeVS)}>
                Edit
              </Button>
              <Button onClick={() => setDetailOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ─────────────────────────────────────────────────────────────────────
          EDIT DIALOG — PATCH API call
      ───────────────────────────────────────────────────────────────────── */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Edit Vendor Service</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Custom Price (₹)"
              fullWidth
              value={editForm.custom_price}
              onChange={(e) => setEditForm({ ...editForm, custom_price: e.target.value })}
            />
            <TextField
              select
              label="Status"
              fullWidth
              value={editForm.status}
              onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary" disabled={vendorLoading}>
            {vendorLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
