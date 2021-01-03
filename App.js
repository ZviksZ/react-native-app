import React, {useState}         from "react";
import {StyleSheet, View, Alert} from "react-native";
import {Navbar}                  from "./src/components/Navbar.jsx";
import {MainScreen}              from "./src/screens/MainScreen.jsx";
import {TodoScreen}              from "./src/screens/TodoScreen.jsx";
import * as Font                 from 'expo-font'
import AppLoading                from 'expo-app-loading'
import {THEME}                   from "./src/theme.js";

async function loadApplication() {
   return await Font.loadAsync({
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
   })
}

export default function App() {
   const [isReady, setIsReady] = useState(false)
   const [todoId, setTodoId] = useState(null);
   const [todos, setTodos] = useState([
      {id: "1", title: "learn react native"},
   ]);

   if (!isReady) {
      return <AppLoading
         startAsync={loadApplication}
         onFinish={() => setIsReady(true)}
         onError={err => console.log(err)}/>
   }

   const removeTodo = id => {
      const todo = todos.find(t => t.id === id)
      Alert.alert(
         "Удаление элемента",
         `Вы уверены, чтоы хотите удалить "${todo.title}"?`,
         [
            {
               text: "Отмена",
               style: "cancel"
            },
            {
               text: "Удалить",
               onPress: () => {
                  setTodoId(null)
                  setTodos(prev => prev.filter(todo => todo.id !== id))
               }
            }
         ],
         {cancelable: false}
      );


   }

   const addTodo = title => {
      setTodos((prev) => [
         ...prev,
         {
            id: Date.now().toString(),
            title,
         },
      ]);
   };

   const updateTodo = (id, title) => {
      setTodos(prev => prev.map(todo => {
         if (todo.id === id) {
            todo.title = title
         }
         return todo
      }))
   }

   let content = (
      <MainScreen addTodo={addTodo} removeTodo={removeTodo} todos={todos} onOpen={setTodoId}/>
   )

   if (todoId) {
      const selectedTodo = todos.find(todo => todo.id === todoId)
      content = <TodoScreen onSave={updateTodo} removeTodo={removeTodo} goBack={() => setTodoId(null)} todo={selectedTodo}/>
   }

   return (
      <View>
         <Navbar title="Todo App"/>
         <View style={styles.container}>
            {content}
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      paddingHorizontal: THEME.PADDING_HORIZONTAL,
      paddingVertical: 20,
   },
});
