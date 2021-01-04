import {FontAwesome}                                       from "@expo/vector-icons";
import React, { useState }                                 from "react";
import {StyleSheet, View, TextInput, Modal, Alert} from 'react-native'
import {THEME}                                             from "../theme.js";
import {AppButton}                                         from "./ui/AppButton.jsx";

export const EditModal = ({value, visible, onCancel, onSave}) => {
   const [title, setTitle] = useState(value);

   const saveHandler = () => {
      if (title.trim().length < 3) {
         Alert.alert('Ошибка!', `Минимальная длина названия 3 символа. Сейчас ${title.trim().length} символов.`)
      } else {
         onSave(title)
      }
   }

   const cancelHandler = () => {
      setTitle(value)
      onCancel()
   }

   return (
      <Modal visible={visible} animationType="slide" transparent={false}>
         <View style={styles.wrapper}>
            <TextInput style={styles.input}
                       value={title}
                       onChangeText={setTitle}
                       placeholder={"Введите название"}
                       autoCapitalize="none"
                       autoCorrect={false}
                       maxLength={64}
            />
            <View style={styles.buttons}>
               <AppButton color={THEME.DANGER_COLOR} onPress={cancelHandler}>
                  Отменить
               </AppButton>
               <AppButton onPress={saveHandler}>
                  Сохранить
               </AppButton>
            </View>

         </View>
      </Modal>
   );
}

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   input: {
      padding: 10,
      borderBottomColor: THEME.MAIN_COLOR,
      borderBottomWidth: 2,
      width: '80%'
   },
   buttons: {
      width: '100%',
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-around'
   }
});
