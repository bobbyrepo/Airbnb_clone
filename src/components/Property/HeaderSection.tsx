import React from "react";
import { Box, Typography } from "@mui/material";
// import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface Props {
    placeName: string;
    // isFavorite: boolean;
    // toggleFavorite: () => void;
}

const HeaderSection: React.FC<Props> = ({ placeName }) => (
    <Box sx={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        mb: {
            xs: 1,
            sm: 2,
            md: 3,
        }
    }}>
        <Typography
            fontWeight={600}
            sx={{
                fontSize: {
                    xs: "1.15rem",
                    sm: "1.25rem",
                    md: "1.75rem",
                    lg: "2rem",
                },
            }}
        >            {placeName}
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
