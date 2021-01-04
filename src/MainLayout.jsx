import {useContext}       from "react";
import * as React         from 'react';
import {StyleSheet, View} from "react-native";
import {Navbar}           from "./components/Navbar.jsx";
import {ScreenContext}    from "./context/screen/screenContext.js";
import {MainScreen}       from "./screens/MainScreen.jsx";
import {TodoScreen}       from "./screens/TodoScreen.jsx";
import {THEME}            from "./theme.js";

export const MainLayout = () => {
   const {todoId} = useContext(ScreenContext)

   return (
      <View>
         <Navbar title="Todo App"/>
         <View style={styles.container}>
            {todoId ? <TodoScreen/> : <MainScreen/>}
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

