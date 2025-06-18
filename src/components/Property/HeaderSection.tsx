import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface Props {
    placeName: string;
    isFavorite: boolean;
    toggleFavorite: () => void;
}

const HeaderSection: React.FC<Props> = ({ placeName, isFavorite, toggleFavorite }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" fontWeight={600}>
            {placeName}
        </Typography>
        {/* <Box sx={{ display: "flex", gap: 2 }}>
            <Button
                startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                variant="text"
                sx={{ color: "text.primary", textDecoration: "underline", textTransform: "none" }}
                onClick={toggleFavorite}
            >
                Save
            </Button>
        </Box> */}
    </Box>
);

export default HeaderSection;
