import { StyleSheet, Dimensions } from 'react-native';

// takes dimensions from phone for dynamic screens
const { width, height } = Dimensions.get('window');

export const basestyles = StyleSheet.create({

    // container
    container: 
    {
        flexGrow: 1,
        flexDirection: 'column',
        backgroundColor: '#D9D9D9',
    },

    // nav bar
    nav_bar_div: 
    {
        flexDirection: 'row',
        width: width,
        height: height * 0.1,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowRadius: 10,
    },
    nav_bar_settings_div:
    {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.2,
        height: height * 0.1,
    },
    nav_bar_image_div:
    {
        flex: 0.2,
        justifyContent: 'center',
        paddingLeft: width * 0.02,
        backgroundColor: '#099F91',

    },
    nav_bar_title_div: 
    {
        flex: 0.6,
        width: width * 0.6,
        justifyContent: 'center',
    },
    nav_bar_settings:
    {
        height: width * 0.1,
        width: width * 0.1,
    },
    nav_bar_image:
    {
        height: width * 0.16,
        width: width * 0.16,
    },
    nav_bar_title: 
    {
        color: 'black',
        fontSize: width * 0.06,
        paddingLeft: width * 0.05,
    },

    // schedule
    schedule_div_overview: 
    {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: width * 0.05,
        paddingVertical: width * 0.05,
        marginHorizontal: height * 0.05,
        marginVertical: height * 0.25,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowRadius: 10,
    },
    schedule_div_form: 
    {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: width * 0.05,
        paddingBottom: width * 0.05,
        marginHorizontal: height * 0.05,
        marginVertical: height * 0.05,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowRadius: 10,
    },
    schedule_week_div:
    {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#099F91',
        marginHorizontal: width * 0.2
    },

    // text
    centered_text_black:
    { 
        color: 'black', 
        fontSize: width * 0.05, 
        textAlign: 'center', 
    },
    text_black:
    { 
        color: 'black', 
        fontSize: width * 0.05, 
        // textAlign: 'center', 
    },
    centered_text_white: 
    { 
        color: 'white', 
        fontSize: width * 0.05, 
        textAlign: 'center', 
    },
    text_small: 
    { 
        paddingTop: height * 0.004,
        color: 'gray', 
        fontSize: width * 0.03, 
    },
    centered_text_small: 
    { 
        paddingTop: height * 0.004,
        color: 'gray', 
        fontSize: width * 0.03, 
        textAlign: 'center',
    },

    // text divs
    centered_text_div: 
    {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.01,
    },
    checkbox_text_div: 
    {
        paddingVertical: height * 0.01,
        flexDirection: 'row',
        marginLeft: width * 0.1,
    },
    switch_right_text_div: 
    {
        paddingVertical: height * 0.01,
        flexDirection: 'row',
        marginLeft: width * 0.27,
    },
    switch_left_text_div:
    {
        paddingBottom: height * 0.01,
        flexDirection: 'row',
        marginLeft: width * 0.05,
    },
    left_aligned_text_div: 
    {
        marginBottom: height * 0.01,
        paddingLeft: width * 0.05,
    },

    // buttons
    button: 
    {
        backgroundColor: '#F9834C',
        color: 'white',
        fontWeight: '600',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 20 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },

    // extra padding
    schedule_padding:
    {
        padding: width * 0.025,
    },
    top_padding:
    {
        paddingTop: width * 0.04,
    },

    //settings
    settings_div: 
    {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: width * 0.05,
        paddingVertical: width * 0.05,
        marginHorizontal: height * 0.05,
        marginVertical: height * 0.05,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowRadius: 10,
    },
    //Flags
    flags_div: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: '4%',
    },
    flags: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
    },
    activeFlag: {
        width: 30,
        height: 30,
        marginHorizontal: '2%',
    },
    inactiveFlag: {
        width: 30,
        height: 30,
        opacity: 0.5,
        marginHorizontal: '2%',
    }
});