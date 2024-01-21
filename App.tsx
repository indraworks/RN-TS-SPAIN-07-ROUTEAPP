import 'react-native-gesture-handler'
import { NavigationContainer } from "@react-navigation/native"
import NavigationApp from "./src/navigations/NavigationApp"

const App = () => {
  return (
    <NavigationContainer>
      <NavigationApp/>
      
    </NavigationContainer>
  )
}

export default App