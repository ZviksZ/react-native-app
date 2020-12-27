import * as React                         from 'react';
import {FlatList, StyleSheet, View} from 'react-native'
import {AddTodo}                          from "../components/AddTodo.jsx";
import {Todo}                             from "../components/Todo.jsx";

export const MainScreen = ({addTodo, todos, removeTodo, onOpen}) => {
   return (
      <View>
         <AddTodo onSubmit={addTodo} />

         <FlatList
            data={todos}
            renderItem={({item}) => <Todo onOpen={onOpen} onRemove={removeTodo} todo={item} />}
            keyExtractor={item => item.id.toString()}
         />
      </View>
   );
}

const styles = StyleSheet.create({

})
