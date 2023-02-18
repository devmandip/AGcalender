import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Calendar } from 'react-native-calendars'
import moment from 'moment'

const HomeScreen = () => {
    const today = moment().format('YYYY-MM-DD');
    return (
        <View style={styles.container}>
            <Calendar
                hideArrows={true}
                markedDates={{
                    [today]: { selected: true, selectedColor: '#56AB2F' },
                }}
                renderHeader={date => {
                    /*Return JSX*/
                }}
                onDayPress={day => {
                    console.log('selected day', day);
                }}
                theme={{
                    selectedDayBackgroundColor: "#56AB2F",
                    selectedDayTextColor: "white"
                }}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    }
})