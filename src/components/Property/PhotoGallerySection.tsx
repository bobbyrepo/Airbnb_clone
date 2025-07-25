import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const PhotoGallery = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "8px",
    borderRadius: "12px",
    overflow: "hidden",
    position: "relative",
    [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
        rowGap: "8px",
    },
}));

const MainImage = styled("img")(({ theme }) => ({
    gridRow: "1 / 3",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
        aspectRatio: 16 / 7

    },
}));

const SmallImage = styled("img")(({ theme }) => ({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
        aspectRatio: 16 / 8

    },
}));

interface Props {
    mainImage: string;
    images: string[];
}

const PhotoGallerySection: React.FC<Props> = ({ mainImage, images }) => (
    <PhotoGallery sx={{ mb: 4 }}>
        <MainImage src={mainImage} alt="Main property photo" />
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
        }}>
            {images.slice(1, 5).map((img, i) => (
                <SmallImage key={i} src={img} alt={`Property photo ${i + 2}`} />
            ))}
        </Box>
    </PhotoGallery>
);

export default PhotoGallerySection;

