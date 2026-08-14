import { formatDistanceToNow } from "date-fns";
// import { es } from "date-fns/locale";

export const formatCreatedDate = (date: Date) => {
    return formatDistanceToNow(date, {
        // Add locales
        // addSuffix: true,
        // locale: es
    });
}