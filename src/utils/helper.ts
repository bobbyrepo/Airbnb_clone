import { type Range } from "react-date-range";
import { isSameDay, addDays } from "date-fns";

/**
 * Calculates number of nights between startDate and endDate in a date range.
 */
export const getNumberOfNights = (dateRange: Range): string | null => {
    const { startDate, endDate } = dateRange;
    if (!startDate || !endDate) return null;

    const timeDiff = endDate.getTime() - startDate.getTime();
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} night${days > 1 ? "s" : ""}` : null;
};

/**
 * Returns the total number of guests including adults, children, infants, and pets.
 */
export const getTotalGuests = (guestCount: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
}): number => {
    return (
        guestCount.adults +
        guestCount.children +
        guestCount.infants +
        guestCount.pets
    );
};

/**
 * Ensures endDate is at least one day after startDate.
 * If both are the same, adds one day to endDate.
 */
export const normalizeDateRange = (value: Range): Range => {
    if (!value.startDate || !value.endDate) return value;

    const start = new Date(value.startDate);
    let end = new Date(value.endDate);

    if (isSameDay(start, end)) {
        end = addDays(end, 1);
    }

    return {
        ...value,
        endDate: end,
    };
};

export type GuestCount = {
    adults: number;
    children: number;
    infants: number;
    pets: number;
};

export const formatGuestSummary = (guestCount: GuestCount): string => {
    const { adults, children, infants, pets } = guestCount;
    const parts: string[] = [];

    const totalGuests = adults + children;
    if (totalGuests > 0) parts.push(`${totalGuests} guest${totalGuests > 1 ? "s" : ""}`);
    if (infants > 0) parts.push(`${infants} infant${infants > 1 ? "s" : ""}`);
    if (pets > 0) parts.push(`${pets} pet${pets > 1 ? "s" : ""}`);

    return parts.join(", ");
};