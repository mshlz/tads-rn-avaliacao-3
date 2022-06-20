import * as React from "react"
import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useAuthentication } from './src/hooks/useAuthentication'
import { LoginScreen, RegisterScreen } from './src/screens/auth'
import { BlankScreen, HomeScreen, MateusScreen } from './src/screens/app'

const students = {
  "Mateus Soares Holzschuh": MateusScreen,
  "Lucas Alves D'Ornellas Silva Pinto": null,
  "Marco Antônio Acosta dos Santos": null,
  "Lucas Antonio Pintos Bielemann": null,
  "Álisson de Freitas Valadão": null,
  "Kauan dos Santos Aguiar": null,
  "Rodrigo Prola Sampei Paz": null,
  "Leonardo Schuwarten Tateishi Arantes": null,
  "Laura Soares Perera": null
}

const Drawer = createDrawerNavigator()
const AppNavigator = (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeScreen} />
    {Object.entries(students).map(([name, component]) => <Drawer.Screen key={name} name={name} component={component || BlankScreen} />)}
  </Drawer.Navigator>
)

const Stack = createStackNavigator()
const AuthNavigator = (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
)

export default function App() {
  const { user } = useAuthentication()

  return (
    <NavigationContainer>
      {user ? AppNavigator : AuthNavigator}
    </NavigationContainer>
  )
}
