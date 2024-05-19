import React from 'react'
import { Styled } from '../constants/Styled'

const Desc = (props) => {
  return (
    <div>
        <Styled.Wrapper sx="merchant__details__desc" key={props.key}>
            <Styled.Text>{props.title}</Styled.Text>
            <Styled.Text>{props.desc}</Styled.Text>
        </Styled.Wrapper>
    </div>
  )
}

export default Desc