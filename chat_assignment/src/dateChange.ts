let previousDate: Date | null = null;

function hasDateChanged(dateStr: string): boolean {
 const currentDate = new Date(dateStr);

 // Convert the current date to a format that can be directly compared
 currentDate.setUTCHours(0, 0, 0, 0);

 if (previousDate === null) {
    // If this is the first call, there is no previous date to compare against
    previousDate = currentDate;
    return false; // Assuming the first date is not considered a change
 }

 // Compare the current date with the previous date
 if (currentDate.getTime() !== previousDate.getTime()) {
    previousDate = currentDate; // Update the previous date
    return true; // Date has changed
 }

 return false; // Date has not changed
}

export default hasDateChanged;
