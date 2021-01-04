import React, {useState} from "react";
import {ScreenState}     from "./src/context/screen/ScreenState.js";
import {TodoState}       from "./src/context/todo/TodoState.js";
import {MainLayout}      from "./src/MainLayout.jsx";
import * as Font         from 'expo-font'
import AppLoading        from 'expo-app-loading'

async function loadApplication() {
   return await Font.loadAsync({
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
   })
}

export default function App() {
   const [isReady, setIsReady] = useState(false)

   if (!isReady) {
      return <AppLoading
         startAsync={loadApplication}
         onFinish={() => setIsReady(true)}
         onError={err => console.log(err)}/>
   }

   return (
      <ScreenState>
         <TodoState>
            <MainLayout/>
         </TodoState>
      </ScreenState>
   )
}
