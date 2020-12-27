import * as React                       from 'react';
import {StyleSheet, View, Text, Button} from 'react-native'
import {THEME}                          from "../theme.js";

export const TodoScreen = ({todo, goBack}) => {
   return (
      <View>
         <Text>{todo.title}</Text>
         <View style={styles.buttons}>
            <View style={styles.button}>
               <Button title="Назад" color={THEME.GRAY_COLOR} onPress={goBack}/>
            </View>
            <View style={styles.button}>
               <Button title="Удалить" color={THEME.DANGER_COLOR} onPress={() => console.log('remove')}/>
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   button: {
      width: '42%'
   }
})
