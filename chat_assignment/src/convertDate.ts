// Corrected export syntax
export default formatDate;

// Function definition remains the same
function formatDate(input: string): string {
 // Parse the input string into a Date object
 const date = new Date(input);

 // Extract the day, month, and year
 const day = date.getDate(); // Gets the day of the month (1-31)
 const month = date.getMonth(); // Gets the month (0-11, where 0 is January)
 const year = date.getFullYear(); // Gets the year

 // Map month index to month name
 const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 const formattedMonth = monthNames[month];

 // Format the date as "06 Mar 2024"
 const formattedDate = `${day < 10 ? '0' + day : day} ${formattedMonth} ${year}`;
console.log(formattedDate);
 return formattedDate;
}



