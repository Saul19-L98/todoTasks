function getDays(dueDateParam: string): {
    days: number;
    isOnTime: boolean;
  } {
    const dueDate = new Date(dueDateParam);
    const currentDate = new Date();
    const timeDiff = dueDate.getTime() - currentDate.getTime();
    if (timeDiff >= 0) {
      const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return { days: daysRemaining, isOnTime: true };
    } else {
      const daysPastDue = Math.ceil(Math.abs(timeDiff) / (1000 * 60 * 60 * 24));
      return { days: daysPastDue, isOnTime: false };
    }
}

export default getDays;