import React, { Component } from 'react'
import items from './data'
console.log(items);
const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms : [],
        sortedRooms : [],
        featuredRooms : [],
        loading : true
    }

    formatData = (items) => {
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image =>image.fields.file.url);
            let room = {...item.fields,images,id}
            return room;
        })
        return tempItems
    }

    componentDidMount(){
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        this.setState ({
            rooms , 
            featuredRooms , 
            sortedRooms : rooms,
            loading : false
        });
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug)
        return room;
    }
    

    render() {
        return (
            <div>
                <RoomContext.Provider value={{...this.state,getRoom:this.getRoom}}>
                    {this.props.children}
                </RoomContext.Provider>
            </div>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component){
    return function CosumerWrapper(props){
        return <RoomConsumer>
            {value => <Component {...props} context={value}></Component>}
        </RoomConsumer>
    }
}

export {RoomContext , RoomProvider , RoomConsumer} 