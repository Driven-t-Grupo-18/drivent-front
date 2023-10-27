import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsPerson, BsPersonFill } from 'react-icons/bs/index';

export default function RoomsBtn(props) {
    const { id, name, firstChosenRoom, setChosenRoom, chosenRoom, hotelId, booked, capacity } = props
    const [available, setAvailable] = useState(true)
    const [selected, setSelected] = useState(false)
    const [alreadyRunned, setAlreadyRunned] = useState(false)
    function selectOption(e) {
        e.preventDefault();
        if (selected && chosenRoom) {
            setChosenRoom()
            setSelected(false)
        } else {
            setChosenRoom({ id, name, booked: booked + 1, capacity, hotelId })
            setSelected(true)
        }
    }

    useEffect(() => {
        if (!chosenRoom && !alreadyRunned) {
            setChosenRoom(firstChosenRoom)
        }

        if (capacity === booked && firstChosenRoom.id !== id) {
            setAvailable(false)
        }
        else {
            setAvailable(true)
        }

        if (chosenRoom?.id === id) {
            setSelected(true)
        } else if (id === firstChosenRoom?.id && !chosenRoom && !alreadyRunned) {
            setSelected(true)
        } else {
            setSelected(false)
        }
        setAlreadyRunned(true)

    }, [chosenRoom])

    function vacancy() {
        const result = []
        if (id === firstChosenRoom?.id) {
            if (available){
                for (let i = -1; i < capacity - booked; i++) {
                result.push("free")
            }}

            for (let i = 0; i < booked-1; i++) {
                result.push("occupied")
            }

        } else {
            for (let i = 0; i < capacity - booked; i++) {
                result.push("free")
            }

            for (let i = 0; i < booked; i++) {
                result.push("occupied")
            }
        }


        if (selected) {
            const i = result.indexOf('occupied')
            i === -1 ? result.splice(-1, 1, "selected") : result.splice(i - 1, 1, "selected")
        }
        return result
    }

    return (
        <OptionBox disabled={!available} onClick={e => available ? selectOption(e) : alert('Esse quarto já está lotado! Por favor, escolha outro.')} selected={selected}>
            <h1>{name}</h1>
            <div>
                {vacancy().map((vaga, index) => {
                    return vaga === 'free' ? <BsPerson key={index} /> : <BsPersonFill key={index} color={!available ? '#8C8C8C' : (vaga === 'selected' ? "#FF4791" : "#000000")} />
                })}
            </div>
        </OptionBox>
    )
}


const OptionBox = styled.div`
    background-color: ${(props) => (!props.available === true ? (props.selected === true ? "#ffeed2" : "#ebebeb") : "#CECECE")};
    width: 190px !important;
    height: 45px;
    top: 437px;
    left: 350px;
    border-radius: 10px;
    border: 1px solid #CECECE;
    margin-right: 19px!important;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-family: 'Roboto', sans-serif !important;
    flex-shrink: 0;
    &:hover{
        background-color: ${(props) => (props.selected === true ? "#ffeed29d" : "#eaeaea")};
        transition: 0.5s;
        opacity: 0.7;
    }
    h1{
        width: 100px;
        color: #454545; 
        font-size: 20px;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0em;
        text-align: center;
    }
    div{
        position:static;
        width: 90px;
        height: 27px;
        margin-right: 10px;
        font-size: 27px;
        text-align: end;

    }
`
