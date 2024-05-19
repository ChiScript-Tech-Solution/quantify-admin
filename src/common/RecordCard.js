import React from 'react'
import { Styled } from '../constants/Styled'
import { Icons } from '../constants/Icons'

const RecordCard = (props) => {
  const cardStyle = props.collapsed ? { width: '100%' } : null;

  const handleCardClick = () => {
    props.setCollapsed(!props.collapsed);
  };

  return (
    <>
        <Styled.Wrapper sx="record__card__wrapper" key={props.key} style={cardStyle} onClick={handleCardClick}>
            <Styled.Text sx="total">{props.title} <Icons.TotalIcon /></Styled.Text>
            <Styled.Text sx="balance">
              {props.amount}
            </Styled.Text>
        </Styled.Wrapper>
    </>
  )
}

export default RecordCard