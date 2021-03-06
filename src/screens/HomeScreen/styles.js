import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'gray'
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
        backgroundColor: 'gray'
    },
    
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    buttons: {
        backgroundColor: 'gray',
        color: 'gray',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        
    },
    deletebutton: {
        height: 47,
        borderRadius: 5,
        backgroundColor: 'red',
        width: 80,
        alignItems: "center",
        justifyContent: 'center',
        color: 'red'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {

        padding: 20,
        backgroundColor: 'gray'
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16,
        
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    }
})