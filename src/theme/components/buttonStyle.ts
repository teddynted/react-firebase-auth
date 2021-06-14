export const buttonStyle = {
  sizes: {
    xl: {
      h: '66px',
      fontSize: '30px',
      px: '30px'
    },
  },
  variants: {
    primary: {
      bg: 'brand.100',
      color: 'white',
      _hover: {
        bg: 'brand.50',
        boxShadow: 'md'
      }
    },
    secondary: {
      bg: 'brand.200',
      color: 'black',
      _hover: {
        bg: 'brand.200',
        boxShadow: 'md'
      }
    },
  }
}