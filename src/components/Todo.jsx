import * as React                                   from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {AppText}                                    from "./ui/AppText.jsx";

export const Todo = ({ todo, onRemove, onOpen }) => {
   const longPressHandler = () => {
      onRemove(todo.id)
   }

   return (
      <TouchableOpacity
         activeOpacity={0.5}
         /*onLongPress={longPressHandler} */
         onLongPress={onRemove.bind(null, todo.id)}
         onPress={() => onOpen(todo.id)}>
         <View style={styles.todo}>
            <AppText>{todo.title}</AppText>
         </View>
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   todo: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderWidth: 1,
      borderColor: '#eee',
      borderRadius: 5,
      marginBottom: 10
   }
});
