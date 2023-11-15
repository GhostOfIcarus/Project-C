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
        width: width
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
});