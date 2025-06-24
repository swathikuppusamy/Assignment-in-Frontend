export const dateUtils = {
  getDaysInMonth: (year, month) => new Date(year, month + 1, 0).getDate(),
  getFirstDayOfMonth: (year, month) => new Date(year, month, 1).getDay(),
  formatDate: (date) => date.toISOString().split('T')[0],
  isToday: (year, month, day) => {
    const today = new Date();
    return year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
  },
  formatTime: (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  },
  getMonthNames: () => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  getDayNames: () => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  getDayNamesShort: () => ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};
