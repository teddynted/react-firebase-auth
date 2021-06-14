import { Flex, FlexProps, Spinner } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

const Wrapper = styled(Flex)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  position: absolute;
  align-items: center;
  background-size: cover;
  justify-content: center;
  background-color: #fff;
  height: 100vh;
`

const Loader: React.FC<FlexProps> = ({...rest}) => {
  return (
    <Wrapper {...rest}>
      <Spinner color="brand.500" size="lg">
        <span />
      </Spinner>
    </Wrapper>
  )
}

export default Loader