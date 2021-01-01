import React, { useState }  from "react";
import {StyleSheet, View, Text, Button} from 'react-native'
import {EditModal}                      from "../components/EditModal.jsx";
import {AppCard}                        from "../components/ui/AppCard.jsx";
import {THEME}                          from "../theme.js";

export const TodoScreen = ({todo, goBack, removeTodo, onSave}) => {
   const [modal, setModal] = useState(false);

   const saveHandler = title => {
      onSave(todo.id, title)
      setModal(false)
   }

   return (
      <View>
         <EditModal value={todo.title} visible={modal} onCancel={() => setModal(false)} onSave={saveHandler}/>

         <AppCard style={styles.card}>
            <Text style={styles.title}>{todo.title}</Text>
            <Button title="Ред." onPress={() => setModal(true)}/>
         </AppCard>
         <View style={styles.buttons}>
            <View style={styles.button}>
               <Button title="Назад" color={THEME.GRAY_COLOR} onPress={goBack}/>
            </View>
            <View style={styles.button}>
               <Button title="Удалить" color={THEME.DANGER_COLOR} onPress={() => removeTodo(todo.id)}/>
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
   },
   card: {
      marginBottom: 20,
      padding: 15
   },
   title: {
      fontSize: 20
   }
})
