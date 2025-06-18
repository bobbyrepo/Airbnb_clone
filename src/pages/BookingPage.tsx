import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { addDays, format, isSameDay } from "date-fns";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Divider,
    Link,
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

const EditLink = styled(Link)({
    color: "#222",
    textDecoration: "underline",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    "&:hover": {
        color: "#FF385C",
    },
});

const BookingPage = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const state = location.state as {
        dateRange: { startDate: string; endDate: string };
        guestLabel: number;
    };



    const navigate = useNavigate();
    const property = PropertiesData.find((p) => p.id === Number(id));

    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("India (+91)");


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

    const handleContinue = () => {
        console.log("Continue with booking", { phoneNumber, countryCode });
    };

    return (
        <Box sx={{ maxWidth: "1200px", mx: "auto", p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <IconButton sx={{ mr: 2 }} onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" fontWeight={600}>
                    Request to book
                </Typography>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 400px" }, gap: 4 }}>
                {/* Left Column */}
                <Box>
                    <RareFindCard>
                        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <DiamondIcon sx={{ color: "#ec4899", fontSize: 32 }} />
                            <Box>
                                <Typography variant="body1" fontWeight={600} gutterBottom>
                                    This is a rare find.
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {property.details.hosted_by}'s place is usually booked.
                                </Typography>
                            </Box>
                        </CardContent>
                    </RareFindCard>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" fontWeight={600} gutterBottom>
                            Your trip
                        </Typography>

                        <Box sx={{ py: 3 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
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

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box>
                                    <Typography variant="body1" fontWeight={600} gutterBottom>
                                        Guests
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {state?.guestLabel}
                                    </Typography>
                                </Box>
                                {/* <EditLink>Edit</EditLink> */}
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <ContinueButton onClick={() => successNotify("Booking Successful")}>Book</ContinueButton>
                    </Box>
                </Box>

                {/* Right Column */}
                <Box>
                    <StyledCard sx={{ mb: 3 }}>
                        <Box sx={{ display: "flex", p: 2 }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 120, height: 80, borderRadius: "8px", mr: 2 }}
                                image={property.place_image}
                                alt={property.place_name}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    {property.place_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {property.details.type}
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <StarIcon sx={{ fontSize: 16, color: "#FF385C" }} />
                                    <Typography variant="body2" fontWeight={600}>
                                        {property.rating}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ({property.num_reviews} reviews)
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">•</Typography>
                                    <Chip
                                        label="Superhost"
                                        size="small"
                                        sx={{ backgroundColor: "#f7f7f7", fontSize: "12px", height: "20px" }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </StyledCard>

                    <StyledCard>
                        <CardContent>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Your total
                            </Typography>

                            <Box sx={{ mt: 3 }}>
                                <Typography variant="body1" fontWeight={600} gutterBottom>
                                    Price details
                                </Typography>

                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                    <Typography variant="body2">
                                        ${property.price} x {nights} nights
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600}>
                                        ${baseTotal.toLocaleString()}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                    <Typography variant="body2">Taxes</Typography>
                                    <Typography variant="body2" fontWeight={600}>
                                        ${taxes}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                    <Typography variant="body1" fontWeight={600}>
                                        Total (INR)
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
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
