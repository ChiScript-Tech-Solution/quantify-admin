import React from 'react'
import { Styled } from '../constants/Styled'

const Tag = (props) => {
  return (
    <>
        <Styled.Text sx="details__tag">{props.title}</Styled.Text>
    </>
  )
}

export default Tag