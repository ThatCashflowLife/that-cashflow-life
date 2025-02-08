export const formatTimestamp = (dateString: string) => {
  try {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    // Check if the dateString includes time information
    const hasTime = dateString.includes(":") || dateString.includes("T");

    if (hasTime) {
      // Format date and time
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    } else {
      // Format date only
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "invalid timestamp";
  }
};

export default formatTimestamp;
