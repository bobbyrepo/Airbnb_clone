import React from "react";
import { Box, Typography, Divider, Avatar, Chip, Rating } from "@mui/material";
import { Star as StarIcon } from "@mui/icons-material";

interface Props {
    details: any;
    rating: number;
    numReviews: number;
}

const amenities = [
    {
        icon: <StarIcon />,
        title: "Designed for staying cool",
        description: "Beat the heat with the A/C and ceiling fan.",
    },
    {
        icon: <StarIcon />,
        title: "Self check-in",
        description: "Check yourself in with the keypad.",
    },
    {
        icon: <StarIcon />,
        title: "Free cancellation before 24 hours",
        description: "Get a full refund if you change your mind.",
    },
];

const PropertyDetails: React.FC<Props> = ({ details, rating, numReviews }) => (
    <Box>
        <Typography variant="h6" fontWeight={600}>
            {details?.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {details?.has}
        </Typography>

        <Box sx={{ mt: 2 }}>
            <Chip icon={<StarIcon />} label="Rare find!" size="small" sx={{ backgroundColor: "#FF385C", color: "white" }} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                This place is usually booked.
            </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <StarIcon sx={{ color: "#FF385C" }} />
            <Typography fontWeight={600}>Guest favourite</Typography>
            <Typography>{rating}</Typography>
            <Rating value={rating} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
                {numReviews} Reviews
            </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src={details?.host_image} sx={{ width: 56, height: 56 }} />
            <Typography>Hosted by {details?.hosted_by}</Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {amenities.map((item, idx) => (
            <Box key={idx} sx={{ display: "flex", gap: 2, mb: 2 }}>
                {item.icon}
                <Box>
                    <Typography fontWeight={600}>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item.description}
                    </Typography>
                </Box>
            </Box>
        ))}
    </Box>
);

export default PropertyDetails;
