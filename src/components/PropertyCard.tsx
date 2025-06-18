import React from "react"
import {
    Typography,
    Box,
    IconButton,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material"
import {
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon,
    Star as StarIcon
} from "@mui/icons-material"
import { red } from "@mui/material/colors"
import { styled } from "@mui/material/styles"

import { Link } from 'react-router-dom'

const PropertyCard = styled(Card)(({ theme }) => ({
    borderRadius: "12px",
    boxShadow: "none",
    position: "relative",
    cursor: "pointer",
}))

const FavoriteButton = styled(IconButton)(({ theme }) => ({
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

function PropertyCardComponent({ property }: { property: any }) {
    const [isFavorite, setIsFavorite] = React.useState(false)

    return (
        <Link to={`/property/${property.id}`} style={{ textDecoration: "none" }}>
            <PropertyCard>
                {/* <GuestFavouriteChip label="Guest favourite" size="small" /> */}
                <FavoriteButton onClick={() => setIsFavorite(!isFavorite)}>
                    {isFavorite ? <FavoriteIcon sx={{ color: "#FF385C" }} /> : <FavoriteBorderIcon />}
                </FavoriteButton>
                <CardMedia
                    component="img"
                    height="200"
                    image={property.place_image}
                    alt={property.title}
                    sx={{ borderRadius: "12px" }}
                />
                {/* <Box
                sx={{
                    height: 200,
                    borderRadius: "12px",
                    backgroundColor: red[100], // #ffcdd2
                }}
            /> */}
                <CardContent sx={{ padding: "6px 0" }}>
                    <Typography variant="body2" fontWeight={600} fontSize={15} >
                        {property.place_name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                </CardContent>
            </PropertyCard>
        </Link>
    )
}

export default PropertyCardComponent