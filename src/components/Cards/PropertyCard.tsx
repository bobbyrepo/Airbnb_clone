import React from "react"
import {
    Typography,
    Box,
    IconButton,
    Card,
    CardMedia,
} from "@mui/material"
import {
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon,
    Star as StarIcon
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"

import { Link } from 'react-router-dom'
import type { Property } from "../../airbnb_clone_data_dummy"

const PropertyCard = styled(Card)(() => ({
    borderRadius: "12px",
    boxShadow: "none",
    position: "relative",
    cursor: "pointer",
}))

const FavoriteButton = styled(IconButton)(() => ({
    position: "absolute",
    top: "12px",
    right: "12px",
    color: "white",
    // backgroundColor: "rgba(255,255,255,0.9)",
    zIndex: 1,
    "&:hover": {
        color: "black",
    },
}))

// const GuestFavouriteChip = styled(Chip)(({ theme }) => ({
//     position: "absolute",
//     top: "12px",
//     left: "12px",
//     backgroundColor: "white",
//     fontSize: "12px",
//     height: "28px",
//     zIndex: 1,
// }))

const PropertyCardComponent: React.FC<{ property: Property }> = ({ property }) => {
    const [isFavorite, setIsFavorite] = React.useState<boolean>(false)

    return (
        <Link to={`/property/${property.id}`} style={{ textDecoration: "none" }}>
            <PropertyCard>
                {/* <GuestFavouriteChip label="Guest favourite" size="small" /> */}
                <FavoriteButton onClick={() => setIsFavorite(!isFavorite)}>
                    {isFavorite ? <FavoriteIcon sx={{ color: "#FF385C" }} /> : <FavoriteBorderIcon />}
                </FavoriteButton>
                <CardMedia
                    component="img"
                    // height="200"
                    image={property.place_image}
                    alt={property.place_name}
                    sx={{ borderRadius: "12px", aspectRatio: "1" }}
                />

                <Box sx={{ padding: "6px 0" }}>
                    <Typography variant="body2" fontWeight={600} sx={{
                        fontSize: {
                            xs: "13px",
                            sm: "14px",
                            md: "16px",
                            lg: "17px",
                        },
                    }} >
                        {property.place_name}
                    </Typography>
                    <Box sx={{
                        display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", fontSize: {
                            xs: "13px",
                            sm: "14px",
                            md: "16px",
                            lg: "17px",
                        },
                    }}>
                        <Typography variant="body2" fontWeight={400} fontSize={14}>
                            ${property.price} for 1 nights
                        </Typography>
                        <Box sx={{ display: "flex", gap: .3, alignItems: "center" }}>
                            <StarIcon sx={{ color: "black", fontSize: "12px" }} />
                            <Typography variant="body2" color="text.secondary">
                                {property.rating} ({property.num_reviews})
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </PropertyCard>
        </Link>
    )
}

export default PropertyCardComponent