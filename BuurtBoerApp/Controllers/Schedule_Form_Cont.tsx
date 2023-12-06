class ScheduleController
{
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
}

export default ScheduleController;