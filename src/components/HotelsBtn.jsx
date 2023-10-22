import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HotelAvailability, TypesOfRooms } from './HotelsUtilitiesFunctions';


export default function HotelsBtn(props) {
    const {id, rooms, name, image, setChosenRoom, booked, chosenHotel, setChosenHotel, chosenRoom, setRoomOptions, typeOfRoom, reserved} = props
    const [selected, setSelected] = useState(false)
    function selectOption(e) {
        e.preventDefault();
        setChosenRoom()

        if (selected) {
            setChosenHotel()
            setRoomOptions([])
            

        } else {
            setChosenHotel({id, name, image})
            setRoomOptions(rooms)
        }
    }
    useEffect(() => {
        if (chosenHotel?.id === id) {
            setSelected(true)
        }
        else{
            setSelected(false)
        }
    })
    console.log(booked)
    return (
        <OptionBox onClick={reserved ? () =>{} : selectOption} $reserved={reserved.toString()} selected={selected}>
            <img src={image} />
            <h1>{name}</h1>
            <h2>{!reserved ? 'Tipos de acomodação': 'Quarto reservado' }</h2>
            <h3>{!reserved ? TypesOfRooms(rooms) : `${chosenRoom.name} (${typeOfRoom})`}</h3>
            <h2>{!reserved ? 'Vagas disponíveis': 'Pessoas no seu quarto' }</h2>
            <h3>{!reserved ? HotelAvailability(rooms): booked === 1 ? `Apenas você` : `Você e mais ${booked - 1} pessoas`}</h3>

        </OptionBox>
    )
}


const OptionBox = styled.div`
    background-color: ${(props) => (props.selected === true ? "#ffeed2" : "#ebebeb")};
    width: 196px!important;
    height: 264px;
    top: 323px;
    left: 510px;
    border-radius: 10px;
    border: 1px;
    padding-left: 14px;
    margin-right: 19px!important;
    cursor:  ${(props) => {props.reserved === 'true' ? 'normal' : 'pointer'}};
    font-family: 'Roboto', sans-serif !important;
    &:hover{
        background-color: ${(props) => props.reserved === 'true' ? "#ffeed2" : (props.selected === true ? "#ffeed29d" : "#eaeaea")};
        transition: 0.5s;
        opacity: ${(props) => {props.reserved === 'true' ? '' : '0.7'}};
    }
    h1{
        color: #343434; 
        font-size: 20px;
        font-weight: 400;
        line-height: 23px;
        letter-spacing: 0em;
        margin-left: 1px;
        margin-bottom: -2px;
    }
    h2{
        font-size: 12px;
        font-weight: 700;
        line-height: 14px;
        letter-spacing: 0em;
        margin-left: 1px;
        color: #3c3c3c;
        margin-top: 12px;
        margin-bottom: 2px;

    }
    h3{
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        letter-spacing: 0em;
        margin-left: 1px;
        margin-bottom: 2px;
        color: #3c3c3c;
    }
    
    img{
        border-radius: 5px;
        width: 168px;
        height: 109px;
        margin-top: 16px;
        margin-bottom: 10px;
    }
`
