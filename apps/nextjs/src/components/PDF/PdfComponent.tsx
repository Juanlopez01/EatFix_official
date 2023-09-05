import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

type Props = {
    weeklyDiet: {
        Monday: {
            breakfast: string,
            lunch: string,
            snack: string,
            dinner: string
        },
        Tuesday: {
            breakfast: string,
            lunch: string,
            snack: string,
            dinner: string
        },
        Wednesday: {
            breakfast: string,
            lunch: string,
            snack: string,
            dinner: string
        },
        Thursday: {
            breakfast: string,
            lunch: string,
            snack: string,
            dinner: string
        },
        Friday: {
            breakfast: string,
            lunch: string,
            snack: string,
            dinner: string
        },
        Saturday: {
            breakfast: string,
            lunch: string,
            snack: string,
            dinner: string
        },
        Sunday: {
            breakfast: string,
            lunch: string,
            snack: string,
            dinner: string
        },
    }
}

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
      padding: '8px',
    },
    title: {
        flexDirection: 'column',
        gap: '12px',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '20px',
        paddingBottom: '10px',
    },
    section : {
        height: '100%',
        borderRight: '1px solid green',
        width: '120px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    days: {
        borderTop: '1px solid green',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '10px',
        paddingVertical: '4px',
        gap: '20px',
    }
  });

const PdfComponent = (props: Props) => {
  return (
    <Document>
        <Page size="A4" style={styles.page} orientation='portrait'>
            <View style={styles.title}>
                <Text>Eat Fix</Text>
                <Text>Weekly diet</Text>
            </View>
           <View style={styles.days}>
                <View style={styles.section}>
                    <Text>Monday</Text>
                </View>
                <View>
                    <Text>Breakfast : {`${props.weeklyDiet.Monday.breakfast}`}</Text>
                    <Text>Lunch : {`${props.weeklyDiet.Monday.lunch}`}</Text>
                    <Text>Snack : {`${props.weeklyDiet.Monday.snack}`}</Text>
                    <Text>Dinner : {`${props.weeklyDiet.Monday.dinner}`}</Text>
                </View>
           </View>
           <View style={styles.days}>
                <View style={styles.section}>
                    <Text>Tuesday</Text>
                </View>
                <View>
                    <Text>Breakfast : {`${props.weeklyDiet.Tuesday.breakfast}`}</Text>
                    <Text>Lunch : {`${props.weeklyDiet.Tuesday.lunch}`}</Text>
                    <Text>Snack : {`${props.weeklyDiet.Tuesday.snack}`}</Text>
                    <Text>Dinner : {`${props.weeklyDiet.Tuesday.dinner}`}</Text>
                </View>
           </View>
           <View style={styles.days}>
                <View style={styles.section}>
                    <Text>Wednesday</Text>
                </View>
                <View>
                    <Text>Breakfast : {`${props.weeklyDiet.Wednesday.breakfast}`}</Text>
                    <Text>Lunch : {`${props.weeklyDiet.Wednesday.lunch}`}</Text>
                    <Text>Snack : {`${props.weeklyDiet.Wednesday.snack}`}</Text>
                    <Text>Dinner : {`${props.weeklyDiet.Wednesday.dinner}`}</Text>
                </View>
           </View>
           <View style={styles.days}>
                <View style={styles.section}>
                    <Text>Thursday</Text>
                </View>
                <View>
                    <Text>Breakfast : {`${props.weeklyDiet.Thursday.breakfast}`}</Text>
                    <Text>Lunch : {`${props.weeklyDiet.Thursday.lunch}`}</Text>
                    <Text>Snack : {`${props.weeklyDiet.Thursday.snack}`}</Text>
                    <Text>Dinner : {`${props.weeklyDiet.Thursday.dinner}`}</Text>
                </View>
           </View>
           <View style={styles.days}>
                <View style={styles.section}>
                    <Text>Friday</Text>
                </View>
                <View>
                    <Text>Breakfast : {`${props.weeklyDiet.Friday.breakfast}`}</Text>
                    <Text>Lunch : {`${props.weeklyDiet.Friday.lunch}`}</Text>
                    <Text>Snack : {`${props.weeklyDiet.Friday.snack}`}</Text>
                    <Text>Dinner : {`${props.weeklyDiet.Friday.dinner}`}</Text>
                </View>
           </View>
           <View style={styles.days}>
                <View style={styles.section}>
                    <Text>Saturday</Text>
                </View>
                <View>
                    <Text>Breakfast : {`${props.weeklyDiet.Saturday.breakfast}`}</Text>
                    <Text>Lunch : {`${props.weeklyDiet.Saturday.lunch}`}</Text>
                    <Text>Snack : {`${props.weeklyDiet.Saturday.snack}`}</Text>
                    <Text>Dinner : {`${props.weeklyDiet.Saturday.dinner}`}</Text>
                </View>
           </View>
           <View style={{...styles.days, borderBottom: '1px solid green'}}>
                <View style={styles.section}>
                    <Text>Sunday</Text>
                </View>
                <View>
                    <Text>Breakfast : {`${props.weeklyDiet.Sunday.breakfast}`}</Text>
                    <Text>Lunch : {`${props.weeklyDiet.Sunday.lunch}`}</Text>
                    <Text>Snack : {`${props.weeklyDiet.Sunday.snack}`}</Text>
                    <Text>Dinner : {`${props.weeklyDiet.Sunday.dinner}`}</Text>
                </View>
           </View>
           
        </Page>
    </Document>
  )
}

export default PdfComponent
