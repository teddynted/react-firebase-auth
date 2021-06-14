import { extendTheme } from '@chakra-ui/react'
import { colors } from './foundations/colors'
import { buttonStyle as Button } from './components/buttonStyle'

const theme = extendTheme({ 
  colors,
  components: {
    Button
  }
})

export { theme }