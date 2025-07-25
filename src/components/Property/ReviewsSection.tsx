import React, { useState } from "react";
import { Box, Typography, Avatar, Rating, Button } from "@mui/material";

interface Review {
    name: string;
    comment: string;
    stars: number;
    image: string;
}

interface Props {
    reviews: Review[];
}

const ReviewsSection: React.FC<Props> = ({ reviews }) => {
    const [visibleCount, setVisibleCount] = useState<number>(5);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 5);
    };

    const visibleReviews = reviews.slice(0, visibleCount);
    const hasMore = visibleCount < reviews.length;

    return (
        <Box>
            <Typography variant="h6" fontWeight={600} sx={{
                mb: {
                    xs: 1,
                    sm: 2,
                    md: 3
                },
                fontSize: {
                    xs: "18px",
                    sm: "20px",
                    md: "22px",
                },
            }}>
                Reviews
            </Typography>

            {visibleReviews.map((review, i) => (
                <Box key={i} sx={{ my: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar src={review.image} sx={{ width: 40, height: 40 }} />
                        <Typography variant="body2" fontWeight={600}>{review.name}</Typography>
                    </Box>
                    <Rating value={review.stars} readOnly size="small"
                        sx={{ color: "black" }} />
                    <Typography variant="body2">{review.comment}</Typography>
                </Box>
            ))}

            {hasMore && (
                <Box mt={2}>
                    <Button variant="contained" onClick={handleLoadMore}
                        sx={{
                            backgroundColor: "#ddd",     // Black background
                            color: "#000",               // White text
                            '&:hover': {
                                backgroundColor: "#ccc",   // Darker on hover
                            },
                        }}>
                        Show more
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ReviewsSection;
