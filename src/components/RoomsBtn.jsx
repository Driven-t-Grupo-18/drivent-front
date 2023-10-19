import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {BsFillPersonFill, BsPerson} from 'react-icons/bs/index';

export default function RoomsBtn(props) {
    const {id, name, image, setChosenRoom} = props
    const [available, setAvailable] = useState(true)
    const [selected, setSelected] = useState(false)
    function selectOption(e) {
        e.preventDefault();
        if (selected) {
            setChosenRoom()
            setSelected(false)
        } else {
            setChosenRoom(id)
            setSelected(true)
        }
    }

    useEffect(() => {
        if (capacity === booked) {
            setAvailable(false)
        }
        else{
            setAvailable(true)
        }
    }, [])
    


    return (
        <OptionBox onClick={e => available ? selectOption(e) : alert('Esse quarto já está lotado! Por favor, escolha outro.')} selected={selected}>
            <h1>{name}</h1>
            <div>
                <BsFillPersonFill></BsFillPersonFill>
                <BsPerson></BsPerson>
            </div>
        </OptionBox>
    )
}


const OptionBox = styled.div`
    background-color: ${(props) => (props.selected === true ? "#ffeed2" : "#ebebeb")};
    width: 190px !important;
    height: 45px;
    top: 437px;
    left: 350px;
    border-radius: 10px;
    border: 1px;
    padding-left: 14px;
    margin-right: 19px!important;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-family: 'Roboto', sans-serif !important;
    &:hover{
        background-color: ${(props) => (props.selected === true ? "#ffeed29d" : "#eaeaea")};
        transition: 0.5s;
        opacity: 0.7;
    }
    h1{
        width: 80px;
        color: #454545; 
        font-size: 20px;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0em;
        text-align: center;
    }
    div{
        position:static;
        width: 81px;
        height: 27px;
        right: 10px;
        font-size: 27px;
        text-align: end;

    }
`
