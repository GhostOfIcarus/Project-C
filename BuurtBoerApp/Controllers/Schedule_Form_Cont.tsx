import AsyncStorage from '@react-native-async-storage/async-storage';

class ScheduleController
{
    static async changeState()
    {
        const State = await AsyncStorage.getItem('state');
        let buttonText = 'submit'
        let isDisabled = false;


        if (State == null)
        {
            await AsyncStorage.setItem('state', JSON.stringify(true));
        }

        if (!State)
        {
            buttonText = 'change';
            isDisabled = true;
        }

        await AsyncStorage.setItem('state', JSON.stringify(!State));
        return {buttonText: buttonText, isDisabled: isDisabled};
    }
}

export default ScheduleController;