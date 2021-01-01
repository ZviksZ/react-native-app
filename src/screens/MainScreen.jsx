import * as React                         from 'react';
import {FlatList, StyleSheet, View, Image} from 'react-native'
import {AddTodo}                          from "../components/AddTodo.jsx";
import {Todo}                             from "../components/Todo.jsx";

export const MainScreen = ({addTodo, todos, removeTodo, onOpen}) => {
   let content  = (
      <FlatList
         data={todos}
         renderItem={({item}) => <Todo onOpen={onOpen} onRemove={removeTodo} todo={item} />}
         keyExtractor={item => item.id.toString()}
      />
   )

   if (todos.length === 0) {
      content = <View style={styles.imgWrap}>
        <Image style={styles.image} source={require('../../assets/no-items.png')}/>
         {/*<Image style={styles.image} source={{uri:
          'data:image/jpeg;base64,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'}}/> */}
      </View>
   }

   return (
      <View>
         <AddTodo onSubmit={addTodo} />
         {content}
      </View>
   );
}

const styles = StyleSheet.create({
   imgWrap: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
      height: 300
   },
   image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain'
   }
})
