import React, { useState }  from "react";
import { StyleSheet, View } from "react-native";
import { Navbar }           from "./src/components/Navbar.jsx";
import {MainScreen}         from "./src/screens/MainScreen.jsx";
import {TodoScreen}         from "./src/screens/TodoScreen.jsx";

export default function App() {
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([
     {id: "1", title: "learn react native"},
     {id: "2", title: "learn react native app"}
  ]);

  const removeTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
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

  let content = (
     <MainScreen addTodo={addTodo} removeTodo={removeTodo} todos={todos} onOpen={setTodoId}/>
  )

  if (todoId) {
     const selectedTodo = todos.find(todo => todo.id === todoId)
     content = <TodoScreen goBack={() => setTodoId(null)} todo={selectedTodo}/>
  }

  return (
    <View>
      <Navbar title="Todo App" />
      <View style={styles.container}>
         {content}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});
