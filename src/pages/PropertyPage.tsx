import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Container,
    Grid,
} from "@mui/material";
import { type Range } from "react-date-range";

import { PropertiesData } from "../airbnb_clone_data_dummy";

// ✅ Modular components
import HeaderSection from "../components/Property/HeaderSection";
import PhotoGallerySection from "../components/Property/PhotoGallerySection";
import PropertyDetails from "../components/Property/PropertyDetails";
import BookingWidget from "../components/Property/BookingWidget";
import ReviewsSection from "../components/Property/ReviewsSection";

const PropertyPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const property = PropertiesData.find((item) => item.id === Number(id));

    const [isFavorite, setIsFavorite] = useState(false);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        key: "selection",
    });

    const toggleFavorite = () => setIsFavorite((prev) => !prev);

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
            <Grid container spacing={5}>
                <Grid item xs={12} md={7}>
                    <PropertyDetails
                        details={property.details}
                        rating={property.rating}
                        numReviews={property.num_reviews}
                    />
                </Grid>

                <Grid item xs={12} md={5}>
                    <BookingWidget
                        id={property.id}
                        price={property.price}
                        guestLabel={property.details.has.slice(0, 1)}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                    />
                </Grid>
            </Grid>

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