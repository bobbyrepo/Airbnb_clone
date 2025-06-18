import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const PhotoGallery = styled(Box)({
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    gap: "8px",
    height: "400px",
    borderRadius: "12px",
    overflow: "hidden",
    position: "relative",
});

const MainImage = styled("img")({
    gridRow: "1 / 3",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    cursor: "pointer",
});

const SmallImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    cursor: "pointer",
});

interface Props {
    mainImage: string;
    images: string[];
}

const PhotoGallerySection: React.FC<Props> = ({ mainImage, images }) => (
    <PhotoGallery sx={{ mb: 4 }}>
        <MainImage src={mainImage} alt="Main property photo" />
        {images.slice(1, 5).map((img, i) => (
            <SmallImage key={i} src={img} alt={`Property photo ${i + 2}`} />
        ))}
    </PhotoGallery>
);

export default PhotoGallerySection;

