const cat = (state = {}, action) => {
    switch (action.type) {
        case "ADD_MEOW":
            return {
                ...state,
                sound: state.sound + "meow"
            }
        default:
            return state
    }
}

export default cat;
