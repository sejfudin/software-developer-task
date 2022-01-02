import { GET_SHOWS } from '../actions/types';

const initialState = { 
    shows: []
};

const showsReducer = (state = initialState, action) => {
    switch (action.type) {

            case GET_SHOWS:
            return {
                ...state,
                shows: [...state.shows, ...action.payload]
            };

        default:
            return state;
    }
}
export default showsReducer;