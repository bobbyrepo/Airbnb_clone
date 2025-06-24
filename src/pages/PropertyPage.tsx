import React, { useState } from "react";
import { data, useParams } from "react-router-dom";
import {
    Box,
    Container,
    Divider,
    Typography,
} from "@mui/material";
import Grid from '@mui/material/Grid';

import { type Range, type RangeKeyDict } from "react-date-range";

import { PropertiesData } from "../airbnb_clone_data_dummy";

// ✅ Modular components
import HeaderSection from "../components/Property/HeaderSection";
import PhotoGallerySection from "../components/Property/PhotoGallerySection";
import PropertyDetailsSection from "../components/Property/PropertyDetailsSection";
import BookingWidget from "../components/Property/BookingWidget";
import ReviewsSection from "../components/Property/ReviewsSection";
import PopertyMap from "../components/Map/PopertyMap";
import { normalizeDateRange } from "../utils/helper";
import CalendarSelector from "../Modals/CalendarSelector";
import Calendar from "../Modals/Calender";

const PropertyPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const property = PropertiesData.find((item) => item.id === Number(id));

    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        key: "selection",
    });

    const toggleFavorite = () => setIsFavorite((prev) => !prev);

    const handleChange = (value: RangeKeyDict) => {
        const normalized = normalizeDateRange(value.selection);
        setDateRange(normalized);
    };

    console.log(property?.details.location.lat)

    if (!property) return <div>Property not found</div>;

    return (
        <Container sx={{ py: 5 }}>
            {/* Header */}
            <HeaderSection
                placeName={property.place_name}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
            />

            {/* Photo Gallery */}
            <PhotoGallerySection
                mainImage={property.place_image}
                images={property.details.images}
            />

            {/* Details + Booking Card */}
            <Grid
                container
                spacing={5}
                width="100%"
                justifyContent="space-between"
                position="relative"
            >

                <Box >
                    <PropertyDetailsSection
                        details={property.details}
                        rating={property.rating}
                        numReviews={property.num_reviews}
                    />

                    <Divider sx={{ mb: 6 }} />

                    <Box>
                        <Typography variant="h5" fontWeight={600} mb={1}>
                            Select checkout date                        </Typography>
                        <Typography variant="body1" color="text.secondary" >
                            Select checkout date
                        </Typography>

                        <Calendar
                            value={dateRange}
                            onChange={handleChange}
                        />

                    </Box>
                </Box>
                <Grid >
                    <Box position="sticky" top={100}>
                        <BookingWidget
                            id={property.id}
                            price={property.price}
                            guestLabel={property.details.has.slice(0, 1)}
                            dateRange={dateRange}
                            setDateRange={setDateRange}
                        />
                    </Box>
                </Grid>
            </Grid>

            {/* Map */}
            {/* <PopertyMap property={property} lat={property.details.location.lat} long={property.details.location.lng} /> */}
            <PopertyMap property={property} />

            {/* Reviews */}
            <Box mt={6} mb={10}>
                <ReviewsSection reviews={property.details.reviews} />
            </Box>
        </Container>
    );
};

export default PropertyPage;

{/* <Grid container spacing={0} sx={{ mb: 2 }}>
    <Grid item xs={6}>
        <TextField
            fullWidth
            label="CHECK-IN"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: "8px 0 0 8px",
                    borderRight: "none",
                },
            }}
        />
    </Grid>
    <Grid item xs={6}>
        <TextField
            fullWidth
            label="CHECKOUT"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: "0 8px 8px 0",
                },
            }}
        />
    </Grid>
</Grid> */}