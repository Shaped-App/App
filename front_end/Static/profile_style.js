import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    background: {
        backgroundColor: '#aaebff',
        width: '100%',
        height: '100%'
    },
    edit_button:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 17,
        width: 130,
        height: 34,
        marginTop: 15
    },
    username_header: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 8
    },
    category_header: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 14,
        paddingTop: 14
    },
    text_style: {
        fontSize: 14,
        color: '#353535'
    },
    edit_text_input: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 16,
        paddingLeft: 16,
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 8,
    },
    edit_text: {
        fontSize: 12,
        color: '#353535',
        marginBottom: 8,
    },
    interest_container: {
        position: "relative",
        paddingRight: 16,
        paddingTop: 10
    },
    interest_background: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 16,
        padding: 10
    },
    remove__button: {
        right: 0,
        top: 0,
        position: 'absolute',
        borderRadius: 15,
        backgroundColor: 'lightgray',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    add__button: {
        marginLeft: 10,
        borderRadius: 15,
        backgroundColor: '#16B7EA',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
});