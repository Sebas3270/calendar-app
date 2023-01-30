import React from 'react'
import styled, {keyframes} from 'styled-components'

export const LoadingPage = () => {
  return (
    <LoadingLayout>
        <Loader/>
    </LoadingLayout>
  )
}

const LoadingLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;
    width: 100vw;
`

const Rotation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const Loader = styled.span`
    width: 48px;
    height: 48px;
    border: 5px solid #000;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${ Rotation } 1s linear infinite;
`