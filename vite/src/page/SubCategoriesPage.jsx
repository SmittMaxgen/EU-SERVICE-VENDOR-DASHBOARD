// import { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// // material-ui
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Chip from '@mui/material/Chip';
// import Divider from '@mui/material/Divider';
// import CircularProgress from '@mui/material/CircularProgress';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// // icons
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import CategoryIcon from '@mui/icons-material/Category';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';
// import { fetchServices } from '../features/services/serviceThunk';
// import { selectAllServices, selectServiceLoading } from '../features/services/serviceSelectors';

// export default function SubCategoryPage() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const allServices = useSelector(selectAllServices);
//   const loading = useSelector(selectServiceLoading);

//   useEffect(() => {
//     if (allServices.length === 0) dispatch(fetchServices());
//   }, [dispatch, allServices.length]);

//   // ✅ filter by subcategory id
//   const subcategoryServices = allServices.filter((s) => s.subcategory?.id === Number(id));

//   const subcategoryInfo = subcategoryServices[0]?.subcategory ?? null;
//   const categoryInfo = subcategoryServices[0]?.category ?? null;

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       <MainCard
//         title={
//           <Stack direction="row" alignItems="center" spacing={2}>
//             <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} size="small" color="inherit">
//               Back
//             </Button>
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <CategoryIcon color="primary" />
//               <Typography variant="h4">{subcategoryInfo?.name ?? `Subcategory #${id}`}</Typography>
//             </Stack>
//           </Stack>
//         }
//       >
//         {/* ─── Breadcrumb ─── */}
//         {categoryInfo && (
//           <Stack direction="row" spacing={1} sx={{ mb: 3 }} alignItems="center">
//             <Typography variant="body2" color="text.secondary">
//               Category:
//             </Typography>
//             <Chip label={categoryInfo.name} size="small" color="secondary" sx={{ fontWeight: 600 }} />
//             <Typography color="text.secondary">›</Typography>
//             <Chip label={subcategoryInfo?.name} size="small" color="primary" sx={{ fontWeight: 600 }} />
//           </Stack>
//         )}

//         <Divider sx={{ mb: 3 }} />

//         <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
//           {subcategoryServices.length} Service{subcategoryServices.length !== 1 ? 's' : ''} found
//         </Typography>

//         {/* ✅ Simple attribute LIST — no cards */}
//         {subcategoryServices.length > 0 ? (
//           <TableContainer component={Paper} variant="outlined">
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: 'grey.50' }}>
//                   <TableCell sx={{ fontWeight: 700 }}>Sr</TableCell>
//                   <TableCell sx={{ fontWeight: 700 }}>Subcategory Name</TableCell>
//                   {/* <TableCell sx={{ fontWeight: 700 }}>Base Price</TableCell>
//                   <TableCell sx={{ fontWeight: 700 }}>Duration</TableCell>
//                   <TableCell sx={{ fontWeight: 700 }}>VAT %</TableCell>
//                   <TableCell sx={{ fontWeight: 700 }}>Status</TableCell> */}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {subcategoryServices.map((service) => (
//                   <TableRow
//                     key={service.id}
//                     hover
//                     sx={{ cursor: 'pointer' }}
//                     // onClick={() => navigate('/services')}
//                   >
//                     {console.log('service:::', service)}
//                     <TableCell>{service.id}</TableCell>
//                     <TableCell>
//                       <Typography fontWeight={600}>{service?.subcategory?.name}</Typography>
//                       {/* {service.description && (
//                         <Typography
//                           variant="caption"
//                           color="text.secondary"
//                           sx={{
//                             display: '-webkit-box',
//                             WebkitLineClamp: 1,
//                             WebkitBoxOrient: 'vertical',
//                             overflow: 'hidden'
//                           }}
//                         >
//                           {service.description}
//                         </Typography>
//                       )} */}
//                     </TableCell>
//                     {/* <TableCell>
//                       <Typography fontWeight={700} color="primary">
//                         ₹{service.base_price}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>{service.duration_minutes} min</TableCell>
//                     <TableCell>{service.vat_percentage}%</TableCell> */}
//                     {/* <TableCell>
//                       <Chip
//                         label={service.is_active ? 'Active' : 'Inactive'}
//                         size="small"
//                         sx={{
//                           bgcolor: service.is_active ? 'success.dark' : 'error.dark',
//                           color: '#fff',
//                           fontWeight: 600,
//                           fontSize: '0.7rem'
//                         }}
//                       />
//                     </TableCell> */}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <Box textAlign="center" py={6}>
//             <CategoryIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
//             <Typography color="text.secondary">No services found.</Typography>
//             <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate('/services')}>
//               View All Services
//             </Button>
//           </Box>
//         )}
//       </MainCard>
//     </Box>
//   );
// }
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CategoryIcon from '@mui/icons-material/Category';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { fetchServices } from '../features/services/serviceThunk';
import { selectAllServices, selectServiceLoading } from '../features/services/serviceSelectors';

export default function SubCategoryPage() {
  const { id } = useParams(); // could be numeric id OR subcategory name
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allServices = useSelector(selectAllServices);
  console.log('allServices', allServices);
  const loading = useSelector(selectServiceLoading);

  useEffect(() => {
    if (allServices.length === 0) dispatch(fetchServices());
  }, [dispatch, allServices.length]);

  // ✅ Smart filter: match by subcategory numeric ID OR subcategory name (case-insensitive)
  const parsedId = Number(id);
  const isNumeric = !isNaN(parsedId) && id !== '';

  // const subcategoryServices = allServices.filter((s) => {
  //   if (!s.subcategory) return false;
  //   if (isNumeric) {
  //     // Match by subcategory id
  //     return s.subcategory.id === parsedId;
  //   } else {
  //     // Match by subcategory name (slug or name param)
  //     return s.subcategory.name?.toLowerCase() === decodeURIComponent(id).toLowerCase();
  //   }
  // });

  const subcategoryServices = allServices.filter((s) => s.id === Number(id));
  const subcategoryInfo = subcategoryServices[0]?.subcategory ?? null;
  const categoryInfo = subcategoryServices[0]?.category ?? null;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <MainCard
      title={
        <Stack direction="row" alignItems="center" spacing={1}>
          <CategoryIcon color="primary" />
          <Typography variant="h4">{subcategoryInfo?.name ?? `Subcategory #${id}`}</Typography>
        </Stack>
      }
    >
      {/* ─── Back Button ─── */}
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} size="small" color="inherit" sx={{ mb: 2 }}>
        Back
      </Button>

      {/* ─── Breadcrumb ─── */}
      {categoryInfo && (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Category:
          </Typography>
          <Chip label={categoryInfo.name} size="small" color="primary" variant="outlined" icon={<CategoryIcon />} />
          <Typography color="text.secondary">›</Typography>
          <Chip label={subcategoryInfo?.name ?? id} size="small" color="secondary" />
        </Stack>
      )}

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {subcategoryServices.length} Service{subcategoryServices.length !== 1 ? 's' : ''} found
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* ─── Services Table ─── */}
      {subcategoryServices.length > 0 ? (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                {/* <TableCell>#</TableCell> */}
                <TableCell>Sr</TableCell>
                <TableCell>Service Name</TableCell>
                <TableCell>Subcategory</TableCell>
                <TableCell>Base Price</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>VAT %</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subcategoryServices.map((service, index) => (
                <TableRow key={service.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/services/${service.id}`)}>
                  <TableCell>{index + 1}</TableCell>
                  {/* <TableCell>{service.id}</TableCell> */}
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service?.subcategory?.name}</TableCell>
                  <TableCell>₹{service.base_price}</TableCell>
                  <TableCell>{service.duration_minutes} min</TableCell>
                  <TableCell>{service.vat_percentage}%</TableCell>
                  <TableCell>
                    <Chip
                      label={service.is_active ? 'Active' : 'Inactive'}
                      size="small"
                      color={service.is_active ? 'success' : 'default'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box textAlign="center" py={4}>
          <Typography color="text.secondary" gutterBottom>
            No services found for this subcategory.
          </Typography>
          <Button variant="outlined" onClick={() => navigate('/services')}>
            View All Services
          </Button>
        </Box>
      )}
    </MainCard>
  );
}
