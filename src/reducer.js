export default function reducer(state, {type, payload}) {
    switch(type) {
        case "added":
            return [...state, {id: payload.id, ...payload.data}].sort((a, b) => a.number - b.number)
        case "modified":
            return [...state.filter(object => object.id !== payload.id), {id: payload.id, ...payload.data}].sort((a, b) => a.number - b.number)
        case "removed":
            return [...state.filter(object => object.id !== payload.id)].sort((a, b) => a.number - b.number)
        default:
            return state
    }
}