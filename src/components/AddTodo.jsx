import React, {useState}                            from "react";
import {View, StyleSheet, Button, TextInput, Alert} from "react-native";
import {THEME}                                      from "../theme.js";

export const AddTodo = ({onSubmit}) => {
   const [title, setTitle] = useState('');

   const addTodo = () => {
      if (title.trim()) {
         onSubmit(title)
         setTitle('')
      } else {
         Alert.alert('Todo can not be empty')
      }
   }

   return (
      <View style={styles.wrapper}>
         <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.input}
            placeholder="Enter todo..."
            value={title}
            onChangeText={setTitle}/>
         <Button style={styles.button} title="Добавить" onPress={addTodo}/>
      </View>
   );
};

const styles = StyleSheet.create({
   wrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 15
   },
   input: {
      width: "70%",
      borderStyle: "solid",
      borderBottomWidth: 2,
      borderBottomColor: THEME.MAIN_COLOR
   },
});

