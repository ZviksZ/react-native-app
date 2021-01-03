import React, {useState}                            from "react";
import {View, StyleSheet, TextInput, Alert, Keyboard} from "react-native";
import {THEME}                                      from "../theme.js";
import {AntDesign}                                  from '@expo/vector-icons'

export const AddTodo = ({onSubmit}) => {
   const [title, setTitle] = useState('');

   const addTodo = () => {
      if (title.trim()) {
         onSubmit(title)
         setTitle('')
         Keyboard.dismiss()
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
         <AntDesign.Button  onPress={addTodo} style={styles.button} name="pluscircleo">
            Добавить
         </AntDesign.Button>
         {/*<Button style={styles.button} title="Добавить" onPress={addTodo}/>*/}
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
      width: "60%",
      borderStyle: "solid",
      borderBottomWidth: 2,
      borderBottomColor: THEME.MAIN_COLOR
   },
});

