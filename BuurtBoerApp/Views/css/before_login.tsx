import { StyleSheet, Dimensions } from 'react-native';

// takes dimensions from phone for dynamic screens
const { width, height } = Dimensions.get('window');

export const before_login = StyleSheet.create({

    // divs
    container: {
      height: Dimensions.get('window').height,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#D9D9D9',
    },
    content_div: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#fff',
      shadowColor: 'black',
      shadowRadius: 5,
    },
    content_header_div:{
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollview_container: {
      height: Dimensions.get('window').height,
    },

    // rows
    forgotPasswordRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rememberMeRow: {
      flexDirection: 'row',
    },

    // texts
    centered_text: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    centered_text_small: 
    { 
        paddingTop: height * 0.004,
        color: 'gray', 
        fontSize: width * 0.03, 
        textAlign: 'center',
    },

    // buttons
    buttons: {
      backgroundColor: '#F9834C',
      color: 'white',
      fontWeight: '600',
      padding: '2%',
      borderRadius: 10,
      marginVertical: '2%',
      marginHorizontal: '1%',
      shadowColor: '#000',
      shadowOffset: { width: 5, height: 20 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 5,
    },
    buttons_space: {
      marginVertical: '6%',
    },

    // flags
    flags_div: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginTop: '4%',
    },
    flags: {
      flexDirection: 'row',
      justifyContent: 'center',
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
    },

    // headers
    content_header: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      marginHorizontal: 20,
      color: 'black',
      fontSize: 20,
    },

    // input
    input: {
      height: 0.058 * height,
      color: '#979797',
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      paddingLeft: 0.01 * width,
      marginTop: 0.01 * height,
      marginHorizontal: 0.02 * width,
    },

    // images
    image: {
      backgroundColor: '#099F91',
      height: Dimensions.get('window').height * 0.3199,
      width: Dimensions.get('window').height * 0.2666,
    },
    img_div: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#099F91',
      paddingHorizontal: '10%',
      paddingVertical: '5%',
      marginHorizontal: '8%',
      marginVertical: '2%',
    },
});