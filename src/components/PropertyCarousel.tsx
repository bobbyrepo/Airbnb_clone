import { useState } from "react"
import { Box, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import PropertyCardComponent from "./Cards/PropertyCard"
import type { Property } from "../airbnb_clone_data_dummy"

interface PropertyCarouselProps {
    title: string
    properties: Property[]
}

export default function PropertyCarousel({ title, properties }: PropertyCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const isTablet = useMediaQuery(theme.breakpoints.down("md"))
    const isLarge = useMediaQuery(theme.breakpoints.down("lg"))

    const getCardsToShow = () => {
        if (isMobile) return 2
        if (isTablet) return 3
        if (isLarge) return 4
        return 5
    }

    const cardsToShow = getCardsToShow()

    const slideLeft = () => {
        const newIndex = Math.max(0, currentIndex - cardsToShow)
        setCurrentIndex(newIndex)
    }

    const slideRight = () => {
        const maxIndex = Math.max(0, properties.length - cardsToShow)
        const newIndex = Math.min(maxIndex, currentIndex + cardsToShow)
        setCurrentIndex(newIndex)
    }

    const canSlideLeft = currentIndex > 0
    const canSlideRight = currentIndex < properties.length - cardsToShow

    // Don't render if not enough properties to show
    if (properties.length === 0) return null

    return (
        <Box sx={{ mb: 3 }}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        fontSize: "20px",
                    }}
                >
                    Popular homes in {title}
                </Typography>

                {/* Navigation Buttons */}
                <Box display="flex" gap={1}>
                    <IconButton
                        sx={{
                            bgcolor: "background.paper",
                            boxShadow: 2,
                            width: 32,
                            height: 32,
                            "&:hover": {
                                bgcolor: canSlideLeft ? "grey.50" : "background.paper",
                                cursor: canSlideLeft ? "pointer" : "not-allowed",
                            },
                            opacity: canSlideLeft ? 1 : 0.5,
                        }}
                        onClick={slideLeft}
                        disabled={!canSlideLeft}
                    >
                        <ChevronLeft sx={{ fontSize: 20 }} />
                    </IconButton>

                    <IconButton
                        sx={{
                            bgcolor: "background.paper",
                            boxShadow: 2,
                            width: 32,
                            height: 32,
                            "&:hover": {
                                bgcolor: canSlideRight ? "grey.50" : "background.paper",
                                cursor: canSlideRight ? "pointer" : "not-allowed",
                            },
                            opacity: canSlideRight ? 1 : 0.5,
                        }}
                        onClick={slideRight}
                        disabled={!canSlideRight}
                    >
                        <ChevronRight sx={{ fontSize: 20 }} />
                    </IconButton>
                </Box>

            </Box>

            {/* Carousel Container */}
            <Box sx={{ position: "relative" }}>

                {/* Cards Container */}
                <Box sx={{ overflow: "hidden" }}>
                    <Box
                        sx={{
                            display: "flex",
                            transition: "transform 0.5s ease-in-out",
                            gap: 3,
                            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
                        }}
                    >
                        {properties.map((property) => (
                            <Box
                                key={property.id}
                                sx={{
                                    flexShrink: 0,
                                    width: `${80 / cardsToShow}%`,
                                }}
                            >
                                <PropertyCardComponent property={property} />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}
