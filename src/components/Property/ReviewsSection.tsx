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
    const [visibleCount, setVisibleCount] = useState(5);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 5);
    };

    const visibleReviews = reviews.slice(0, visibleCount);
    const hasMore = visibleCount < reviews.length;

    return (
        <Box>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                Reviews
            </Typography>

            {visibleReviews.map((review, i) => (
                <Box key={i} sx={{ my: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar src={review.image} sx={{ width: 40, height: 40 }} />
                        <Typography variant="body2" fontWeight={600}>{review.name}</Typography>
                    </Box>
                    <Rating value={review.stars} readOnly size="small" />
                    <Typography variant="body2">{review.comment}</Typography>
                </Box>
            ))}

            {hasMore && (
                <Box mt={2}>
                    <Button variant="outlined" onClick={handleLoadMore}>
                        Load more
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ReviewsSection;
