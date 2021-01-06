import React, {useReducer, useContext}                                                                      from 'react';
import {Alert}                                                                                              from "react-native";
import {ScreenContext}                                                                                      from "../screen/screenContext.js";
import {ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO} from "../types.js";
import {TodoContext}                                                                                        from './todoContext.js'
import {todoReducer}                                                                                        from "./todoReducer.js";
import {Http} from '../../htttp.js'


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
      clearError()
      try {
         const data = await Http.get('https://react-native-23-default-rtdb.firebaseio.com/todos.json')

         const todos = Object.keys(data).map(key => ({...data[key], id: key}))

         dispatch({type: FETCH_TODOS, todos})
      } catch (e) {
         showError('Что-то пошло не так...')
         console.log(e)
      } finally {
         hideLoader()
      }
   }
   const addTodo = async title => {
      clearError()
      try {
         const data = await Http.post('https://react-native-23-default-rtdb.firebaseio.com/todos.json', {title})

         dispatch({type: ADD_TODO, title, id: data.name})
      } catch (e) {
         showError('Что-то пошло не так...')
         console.log(e)
      }
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
               onPress: async () => {
                  changeScreen(null)
                  await Http.delete(`https://react-native-23-default-rtdb.firebaseio.com/todos/${id}.json`)

                  dispatch({type: REMOVE_TODO, id})
               }
            }
         ],
         {cancelable: false}
      );


   }
   const updateTodo = async (id, title) => {
      clearError()
      try {
         await Http.patch(`https://react-native-23-default-rtdb.firebaseio.com/todos/${id}.json`, {title})

         dispatch({type: UPDATE_TODO, id, title})
      } catch (e) {
         showError('Что-то пошло не так...')
         console.log(e)
      }



   }

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

