class ScheduleController
{
    // changes checkbox and button state
    static changeState(State: boolean)
    {
        let buttonText = 'submit'
        let isDisabled = false;

        if (State)
        {
            buttonText = 'change';
            isDisabled = true;
        }

        return {buttonText: buttonText, isDisabled: isDisabled};
    }

    // calculates the wednesday of the deadline
    static getWednesdayDate(weekNumber: number): String
    {
        if (weekNumber == 0)
        {
            weekNumber = 52;
        }
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
    
        // calculates the first day of the year
        const firstDayOfYear = new Date(currentYear, 0, 1);
    
        // calculates the first wednesday of the year
        const firstWednesdayOfYear = new Date(firstDayOfYear);
        firstWednesdayOfYear.setDate(
          firstDayOfYear.getDate() + ((3 - firstDayOfYear.getDay() + 7) % 7)
        );
    
        // calculates the deadline wednesday based on the week number
        const targetWednesday = new Date(firstWednesdayOfYear);
        targetWednesday.setDate(targetWednesday.getDate() + 7 * (weekNumber - 1));
    
        // changes the format into a more readable one
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return targetWednesday.toLocaleDateString(undefined, options);
    }
}

export default ScheduleController;