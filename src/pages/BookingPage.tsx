import { useParams, useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Divider,
    IconButton,
    Chip,
} from "@mui/material";
import {
    ArrowBack as ArrowBackIcon,
    Diamond as DiamondIcon,
    Star as StarIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { type Range } from "react-date-range";
import { PropertiesData } from "../airbnb_clone_data_dummy";
import { getNumberOfNights } from "../utils/helper";

import { toast, ToastContainer } from "react-toastify";

const successNotify = (val: string) => {
    toast.success(val, {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

const StyledCard = styled(Card)({
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    border: "1px solid #e0e0e0",
});

const RareFindCard = styled(Card)({
    backgroundColor: "#fdf2f8",
    border: "1px solid #f9a8d4",
    borderRadius: "12px",
    marginBottom: "24px",
});

const ContinueButton = styled(Button)({
    backgroundColor: "#FF385C",
    color: "white",
    borderRadius: "8px",
    padding: "14px 24px",
    fontSize: "16px",
    fontWeight: 600,
    textTransform: "none",
    width: "100%",
    "&:hover": {
        backgroundColor: "#E31C5F",
    },
});

const BookingPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const state = location.state as {
        dateRange: { startDate: string; endDate: string };
        guestLabel: number;
    };

    const navigate = useNavigate();
    const property = PropertiesData.find((p) => p.id === Number(id));

    if (!property) {
        return <Typography>Property not found</Typography>;
    }

    const formattedDateRange = state?.dateRange
        ? (() => {
            const start = new Date(state.dateRange.startDate);
            let end = new Date(state.dateRange.endDate);
            return `${format(start, "dd")}–${format(end, "dd MMM")}`;
        })()
        : "Select dates";

    let selectedDateRange: Range | null = null;

    if (state.dateRange) {
        selectedDateRange = {
            startDate: new Date(state.dateRange.startDate),
            endDate: new Date(state.dateRange.endDate),
            key: 'selection',
        };
    }

    const nightsString = selectedDateRange ? getNumberOfNights(selectedDateRange) : null;
    const nights = nightsString ? parseInt(nightsString) : 1;
    const taxes = 216;
    const baseTotal = property.price * nights;
    const total = baseTotal + taxes;

    return (
        <Box sx={{
            maxWidth: "1200px",
            mx: "auto",
            p: { xs: 2, sm: 3 },
            width: "100%"
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                mb: { xs: 2, sm: 3, md: 4 }
            }}>
                <IconButton
                    sx={{ mr: { xs: 1, sm: 2 } }}
                    onClick={() => navigate(-1)}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" fontWeight={600} sx={{
                    fontSize: {
                        xs: "1.15rem",
                        sm: "1.25rem",
                        md: "1.75rem",
                        lg: "2rem",
                    },
                }}>
                    Request to book
                </Typography>
            </Box>

            <Box sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr minmax(300px, 400px)"
                },
                gap: { xs: 2, sm: 3, md: 4 }
            }}>
                {/* Left Column */}
                <Box sx={{
                    order: { xs: 2, md: 1 }, // Order 1 for xs, order 2 for md and up
                }}>
                    <RareFindCard>
                        <CardContent sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: { xs: 1, sm: 2 },
                            p: { xs: 1.5, sm: 2 }
                        }}>
                            <DiamondIcon sx={{
                                color: "#ec4899",
                                fontSize: { xs: 24, sm: 32 }
                            }} />
                            <Box>
                                <Typography
                                    variant="body1"
                                    fontWeight={600}
                                    gutterBottom
                                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                                >
                                    This is a rare find.
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                                >
                                    {property.details.hosted_by}'s place is usually booked.
                                </Typography>
                            </Box>
                        </CardContent>
                    </RareFindCard>

                    <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
                        <Typography
                            variant="h5"
                            fontWeight={600}
                            gutterBottom
                            sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' } }}
                        >
                            Your trip
                        </Typography>

                        <Box sx={{ py: { xs: 2, sm: 3 } }}>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: { xs: 2, sm: 3 },
                                flexWrap: { xs: 'wrap', sm: 'nowrap' }
                            }}>
                                <Box>
                                    <Typography variant="body1" fontWeight={600} gutterBottom>
                                        Dates
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {formattedDateRange}
                                    </Typography>
                                </Box>
                                {/* <EditLink>Edit</EditLink> */}
                            </Box>

                            <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />

                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%"
                            }}>
                                <Box>
                                    <Typography
                                        variant="body1"
                                        fontWeight={600}
                                        gutterBottom
                                        sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                                    >
                                        Guests
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                                    >
                                        {state?.guestLabel}
                                    </Typography>
                                </Box>
                                {/* <EditLink>Edit</EditLink> */}
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ mt: { xs: 2, sm: 3 } }}>
                        <ContinueButton
                            onClick={() => successNotify("Booking Successful")}
                            sx={{
                                py: { xs: 1.5, sm: 2 },
                                fontSize: { xs: '0.9rem', sm: '1rem' }
                            }}
                        >
                            Book
                        </ContinueButton>
                    </Box>
                </Box>

                {/* Right Column */}
                <Box sx={{
                    order: { xs: 1, md: 2 }, // Order 1 for xs, order 2 for md and up
                }}>
                    <StyledCard sx={{ mb: { xs: 2, sm: 3 } }}>
                        <Box sx={{
                            display: "flex",
                            p: { xs: 1.5, sm: 2 },
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'flex-start', sm: 'center' }
                        }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    width: { xs: '100%', sm: 120 },
                                    height: { xs: 'auto', sm: 80 },
                                    maxHeight: { xs: 150, sm: 'none' },
                                    borderRadius: "8px",
                                    mr: { xs: 0, sm: 2 },
                                    mb: { xs: 1.5, sm: 0 },
                                    objectFit: "cover"
                                }}
                                image={property.place_image}
                                alt={property.place_name}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                    gutterBottom
                                    sx={{ fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' } }}
                                >
                                    {property.place_name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    gutterBottom
                                    sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                                >
                                    {property.details.type}
                                </Typography>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    flexWrap: 'wrap'
                                }}>
                                    <StarIcon sx={{
                                        fontSize: { xs: 14, sm: 16 },
                                        color: "#FF385C"
                                    }} />
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                                    >
                                        {property.rating}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                                    >
                                        ({property.num_reviews} reviews)
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ display: { xs: 'none', sm: 'block' } }}
                                    >
                                        •
                                    </Typography>
                                    <Chip
                                        label="Superhost"
                                        size="small"
                                        sx={{
                                            backgroundColor: "#f7f7f7",
                                            fontSize: { xs: "10px", sm: "12px" },
                                            height: { xs: "18px", sm: "20px" },
                                            px: { xs: 0.5, sm: 1 }
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </StyledCard>

                    <StyledCard>
                        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                            <Typography
                                variant="h6"
                                fontWeight={600}
                                gutterBottom
                                sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}
                            >
                                Your total
                            </Typography>

                            <Box sx={{ mt: { xs: 2, sm: 3 } }}>
                                <Typography
                                    variant="body1"
                                    fontWeight={600}
                                    gutterBottom
                                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                                >
                                    Price details
                                </Typography>

                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: { xs: 1.5, sm: 2 },
                                    flexWrap: 'wrap'
                                }}>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                                    >
                                        ${property.price} x {nights} nights
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                        sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                                    >
                                        ${baseTotal.toLocaleString()}
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: { xs: 1.5, sm: 2 }
                                }}>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                                    >
                                        Taxes
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                        sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                                    >
                                        ${taxes}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />

                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: { xs: 1.5, sm: 2 }
                                }}>
                                    <Typography
                                        variant="body1"
                                        fontWeight={600}
                                        sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                                    >
                                        Total (INR)
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        fontWeight={600}
                                        sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                                    >
                                        ${total.toLocaleString()}
                                    </Typography>
                                </Box>

                            </Box>
                        </CardContent>
                    </StyledCard>
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default BookingPage;
