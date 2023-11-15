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
        height: height * 0.15,
        justifyContent: 'center',
        backgroundColor: '#099F91',
        shadowColor: 'black',
        shadowRadius: 10,
    },
    nav_bar_text: 
    {
        color: 'white',
        textAlign: 'center',
        fontSize: width * 0.06,
        marginTop: height * 0.02,
        fontWeight: 'bold',
        width: width,
    },
    nav_bar_image_div: 
    {
        paddingLeft: width * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nav_bar_title_div: 
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nav_bar_image:
    {
        backgroundColor: '#099F91',
        height: width * 0.20,
        width: width * 0.20,
    },

    // schedule
    schedule_div: 
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
    centered_text_white: 
    { 
        color: 'white', 
        fontSize: width * 0.05, 
        textAlign: 'center', 
    },
    centered_text_small: 
    { 
      paddingTop: height * 0.004,
      color: 'gray', 
      fontSize: width * 0.03, 
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
    switch_text_div: 
    {
      paddingVertical: height * 0.01,
      flexDirection: 'row',
      marginLeft: width * 0.27,
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
    topPadding:
    {
        paddingTop: width * 0.04,
    },
});