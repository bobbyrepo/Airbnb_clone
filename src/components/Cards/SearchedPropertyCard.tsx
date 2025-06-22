import React, { useState } from "react"
import {
    Typography,
    Box,
    IconButton,
    Card,
    CardContent,
} from "@mui/material"
import {
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon,
    Star as StarIcon,
    ChevronLeft,
    ChevronRight,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"

import { Link } from 'react-router-dom'

const PropertyCard = styled(Card)(() => ({
    boxShadow: "none",
    position: "relative",
    cursor: "pointer",
}))

const FavoriteButton = styled(IconButton)(() => ({
    position: "absolute",
    top: "12px",
    right: "12px",
    color: "white",
    zIndex: 1,
    "&:hover": {
        color: "black",
    },
}))

const DotsContainer = styled(Box)({
    position: "absolute",
    bottom: 12,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 4,
    zIndex: 2,
})

const Dot = styled(Box)<{ active: boolean }>(({ active }) => ({
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: active ? "white" : "rgba(255, 255, 255, 0.5)",
    transition: "background-color 0.2s ease",
}))



function SearchedPropertyCardComponent({ property }: { property: any }) {
    const [isFavorite, setIsFavorite] = React.useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false);

    const handlePrevImage = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImageIndex((prev) => (prev === 0 ? property?.details?.images?.length - 1 : prev - 1))
    }

    const handleNextImage = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImageIndex((prev) => (prev === property?.details?.images?.length - 1 ? 0 : prev + 1))
    }

    return (
        <PropertyCard
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <FavoriteButton onClick={() => setIsFavorite(!isFavorite)}>
                {isFavorite ? <FavoriteIcon sx={{ color: "#FF385C" }} /> : <FavoriteBorderIcon />}
            </FavoriteButton>

            <Box sx={{ position: "relative" }}>
                <Link to={`/property/${property.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <img
                        src={property.details.images[currentImageIndex] || "/placeholder.svg"}
                        alt={`${property.place_name} - Image ${currentImageIndex + 1}`}
                        style={{
                            width: "100%",
                            height: 220,
                            objectFit: "cover",
                            borderRadius: "20px",
                        }}
                    />
                </Link>

                {/* Navigation Arrows */}
                {property?.details?.images?.length > 1 && (
                    <Box sx={{
                        transition: "all 0.2s ease",
                        opacity: isHovered ? "1" : "0",
                    }}>
                        <IconButton
                            onClick={handlePrevImage}
                            sx={{
                                position: "absolute",
                                left: 12,
                                top: "50%",
                                transform: "translateY(-50%)",
                                backgroundColor: "rgba(255,255,255,0.9)",
                                width: 32,
                                height: 32,
                                "&:hover": {
                                    backgroundColor: "rgba(255,255,255,1)",
                                },
                            }}
                        >
                            <ChevronLeft />
                        </IconButton>

                        <IconButton
                            onClick={handleNextImage}
                            sx={{
                                position: "absolute",
                                right: 12,
                                top: "50%",
                                transform: "translateY(-50%)",
                                backgroundColor: "rgba(255,255,255,0.9)",
                                width: 32,
                                height: 32,
                                "&:hover": {
                                    backgroundColor: "rgba(255,255,255,1)",
                                },
                            }}
                        >
                            <ChevronRight />
                        </IconButton>
                    </Box>
                )}

                {property?.details?.images?.length > 1 && (
                    <DotsContainer>
                        {property?.details?.images.map((_: string, index: number) => (
                            <Dot key={index} active={index === currentImageIndex} />
                        ))}
                    </DotsContainer>
                )}

            </Box>

            <Link to={`/property/${property.id}`} style={{ textDecoration: "none", color: "inherit" }}>
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
            </Link >
        </PropertyCard>
    )
}

export default SearchedPropertyCardComponent