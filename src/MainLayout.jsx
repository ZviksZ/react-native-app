import {useState, useContext}    from "react";
import * as React                from 'react';
import {Alert, StyleSheet, View} from "react-native";
import {Navbar}                  from "./components/Navbar.jsx";
import {TodoContext}             from "./context/todo/todoContext.js";
import {MainScreen}              from "./screens/MainScreen.jsx";
import {TodoScreen}              from "./screens/TodoScreen.jsx";
import {THEME}                   from "./theme.js";

export const MainLayout = () => {
   const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext);
   const [todoId, setTodoId] = useState(null);
  /* const [todos, setTodos] = useState([
      {id: "1", title: "learn react native"},
   ]);*/


/*
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
   }*/


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

