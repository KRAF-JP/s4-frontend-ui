import React from 'react'
import styled from 'styled-components'
import Lottie from 'react-lottie-player'
import LoadingJson from './icon/loading4.json'

const LoadingIcon: React.FC = () => {
  return (
    <Wrap>
      <Lottie
        loop
        play
        animationData={LoadingJson}
        style={{ width: 300, height: 300 }}
      />
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export default LoadingIcon
