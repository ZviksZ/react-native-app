import React, { useState }        from "react";
import {StyleSheet, View, Dimensions} from 'react-native'
import {EditModal}                from "../components/EditModal.jsx";
import {AppButton}                from "../components/ui/AppButton.jsx";
import {AppCard}                  from "../components/ui/AppCard.jsx";
import {AppTextBold}              from "../components/ui/AppTextBold.jsx";
import {THEME}                    from "../theme.js";
import {FontAwesome, AntDesign}                                  from '@expo/vector-icons'

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
            <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
            <AppButton onPress={() => setModal(true)}>
               <FontAwesome name="edit" size={20}/>
            </AppButton>
         </AppCard>
         <View style={styles.buttons}>
            <View style={styles.button}>
               <AppButton color={THEME.GRAY_COLOR} onPress={goBack}>
                  <AntDesign name="back" size={20} color="#fff"/>
               </AppButton>
            </View>
            <View style={styles.button}>
               <AppButton color={THEME.DANGER_COLOR} onPress={() => removeTodo(todo.id)}>
                  <FontAwesome name="remove" size={20} color="#fff"/>
               </AppButton>
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
      //width: Dimensions.get('window').width / 3
      width: Dimensions.get('window').width > 400 ? 150 : 100
   },
   card: {
      marginBottom: 20,
      padding: 15
   },
   title: {
      fontSize: 20
   }
})
