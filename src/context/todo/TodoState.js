import React, {useReducer, useContext}                                                                      from 'react';
import {Alert}                                                                                              from "react-native";
import {ScreenContext}                                                                                      from "../screen/screenContext.js";
import {ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO} from "../types.js";
import {TodoContext}                                                                                        from './todoContext.js'
import {todoReducer}                                                                                        from "./todoReducer.js";

export const TodoState = ({children}) => {
   const initialState = {
      todos: [],
      loading: false,
      error: null
   }
   const [state, dispatch] = useReducer(todoReducer, initialState)
   const {changeScreen} = useContext(ScreenContext)

   const fetchTodos = async () => {
      showLoader()
      const response = await fetch('https://react-native-23-default-rtdb.firebaseio.com/todos.json', {
         method: 'GET',
         headers: {'Content-Type': 'application/json'},
      })
      const data = await response.json()
      const todos = Object.keys(data).map(key => ({...data[key], id: key}))

      dispatch({type: FETCH_TODOS, todos})
      hideLoader()
   }
   const addTodo = async title => {
      const response = await fetch('https://react-native-23-default-rtdb.firebaseio.com/todos.json', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({title})
      })
      const data = await response.json()

      dispatch({type: ADD_TODO, title, id: data.name})
   }
   const removeTodo = id => {
      const todo = state.todos.find(t => t.id === id)
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
                  changeScreen(null)
                  dispatch({type: REMOVE_TODO, id})
               }
            }
         ],
         {cancelable: false}
      );


   }
   const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title})

   const showLoader = () => dispatch({type: SHOW_LOADER})
   const hideLoader = () => dispatch({type: HIDE_LOADER})
   const showError = error => dispatch({type: SHOW_ERROR, error})
   const clearError = () => dispatch({type: CLEAR_ERROR})

   return (
      <TodoContext.Provider value={{
         todos: state.todos,
         loading: state.loading,
         error: state.error,
         addTodo,
         removeTodo,
         updateTodo,
         fetchTodos
      }}>
         {children}
      </TodoContext.Provider>
   );
}

