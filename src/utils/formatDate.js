function formatDateToReadable(dateString) {
    const inputDate = new Date(dateString);
    const now = new Date();

    const diffInSeconds = Math.floor((now - inputDate) / 1000); // Time difference in seconds

    if (diffInSeconds < 60) {
        return 'Just Now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} mins ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
        return 'Yesterday';
    } else if (diffInDays < 7) {
        return `${diffInDays} days ago`;
    }

    // For dates older than a week, return the full date in the format: DD/MM/YYYY
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = inputDate.getFullYear();

    return `${day}/${month}/${year}`;
}


export default formatDateToReadable;