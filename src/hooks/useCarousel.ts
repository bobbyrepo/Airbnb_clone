import { useState } from "react";

export const useCarousel = (images: string[]) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prev = () =>
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    const next = () =>
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    return { currentIndex, prev, next };
};
