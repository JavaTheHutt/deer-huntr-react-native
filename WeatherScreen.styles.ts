import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    safeArea: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    topRight: {
        position: 'absolute',
        top: 20,
        right: 20,
        alignItems: 'flex-end',
    },
    city: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5,
    },
    temperature: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5,
    },
    description: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'right',
    },
    bottomContent: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
    },
    details: {
        fontSize: 18,
        marginBottom: 5,
        color: '#ffffff',
    },
    windDirection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    windArrow: {
        marginLeft: 10,
        fontSize: 20,
        color: '#ffffff',
    },
    logo: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 80,
        height: 80,
        zIndex: 10,
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    refreshContainer: {
        position: 'absolute',
        top: 5,
        left: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    refreshButton: {
        padding: 5,
    },
    refreshIcon: {
        fontSize: 18,
        color: '#ffffff',
    },
    lastRefreshed: {
        fontSize: 10,
        color: '#ffffff',
        marginLeft: 10,
    },
});