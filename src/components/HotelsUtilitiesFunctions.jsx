export function hotelsArrayWithNoRep(incommingArray){
    const array = []

    incommingArray.filter(x => {
        if (array.includes(x.Hotel)) {
            return false
        } else {
            array.push(x.Hotel)
            return true
        }
    })

    return array
}
export function TypesOfRooms(rooms) {
    const typesOfRooms = []

    rooms.filter(x => {
        if (typesOfRooms.includes(x.capacity)) {
            return false
        } else {
            typesOfRooms.push(x.capacity)
            return true
        }
    })

    rooms.map(x => {
        if (typesOfRooms.includes(x.capacity)) {
            return false
        } else {
            typesOfRooms.push(x.capacity)
            return true
        }
    })

    typesOfRooms.sort().map((x, i) => {
        switch (x) {
            case 1:
                typesOfRooms.splice(i, 1, 'Single');
                break;
            case 2:
                typesOfRooms.splice(i, 1, 'Double');
                break;
            case 3:
                typesOfRooms.splice(i, 1, 'Triple');
                break;
        }
    })

    return typesOfRooms.map((x, i) => {
        if (typesOfRooms.length === 1) {
            return x
        }
        else if (typesOfRooms.length - 1 === i) {
            return 'e ' + x
        }
        else if (typesOfRooms.length - 2 === i) {
            return x + ' '
        } else {
            return x + ', '

        }
    })
}
export function HotelAvailability(rooms){
    let balance = 0;
    rooms.map(x => {
        balance += x.capacity - (x.Booking.length)
    })

    return balance
}
export function typeOfRoom(capacity){
    let type;
    switch (capacity) {
        case 1:
            type='Single';
            break;
        case 2:
            type='Double';
            break;
        case 3:
            type='Triple';
            break;
    }
    return type
}
export function RoomVacancy(hotels, chosenRoom){
    const hotel = hotels?.find(objeto => {
        return objeto?.id === chosenRoom?.hotelId 
    })
    const room = hotel?.Rooms.find(objeto => {
        return objeto?.id === chosenRoom?.id
    })

    

    return room?.Booking.length
}


