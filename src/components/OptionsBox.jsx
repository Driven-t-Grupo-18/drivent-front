import { useState } from 'react';
import styled from 'styled-components';

export default function SelectOption(props){
    const [selected, setSelected] = useState(false)
    function selectOption(e){
        e.preventDefault();
        if (selected) {
            setSelected(false)
        } else{
            setSelected(true)
        }

    }


    return (
        <OptionBox onClick={selectOption} selected={selected}> 
        <h1>Presencial</h1>
        <h2>R$250</h2>
        </OptionBox> 
    )
}


const OptionBox = styled.button`
    background-color: ${(props) => (props.selected === true ? "#ffcb86" : "#FFFFFF")};
    width: 145px;
    height: 145px;
    top: 323px;
    left: 510px;
    border-radius: 20px;
    border: 1px;
    border: 1px solid #CECECE;
    margin-right: 20px;
    cursor: pointer;
    &:hover{
        background-color: ${(props) => (props.selected === true ? "#ffcb869d" : "#eaeaea")};
        transition: 0.5s;
        opacity: 0.7;
    }
    h1{
        color: #454545; 
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        letter-spacing: 0em;
        text-align: center;
    }
    h2{
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0em;
        text-align: center;
        color: #898989;
    }
`
