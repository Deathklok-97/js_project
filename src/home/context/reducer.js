const specialReducer = {
    ACTION1: (state, data) => console.log(data) || ({
       ...state,
    })
}

const root = {
    ...specialReducer
}


export function rootReducer(state, action){
    const branch = root[action.type]

    if(!branch) throw new Error(`Unknown Action passed to reducer: ${action.type}`)

    return branch(state, action.payload);
}