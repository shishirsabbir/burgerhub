// imports

export const normalizeArray = (inputData) => {
    if (!inputData) return [];

    // if already an array
    if (Array.isArray(inputData)) return inputData;

    if (typeof inputData === "string") {
        const trimmed = inputData.trim();

        if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
            try {
                return JSON.parse(trimmed);
                // eslint-disable-next-line no-unused-vars
            } catch (e) {
                return trimmed
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean);
            }
        }

        // Handle comma-separated string
        return trimmed
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
    }

    return [];
};
