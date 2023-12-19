import { useReducer, useEffect } from 'react'
export const Storage = ({ storageSize }) => {

    const MAX_STORAGE = 6
    const initialState = { count: 1 }
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        storageSize(state.count)
    }, [state.count])
    
    function reducer(state, action) {
        switch (action.type) {
            case 'increment':
                return { count: state.count + 1 }
            case 'decrement':
                return { count: state.count - 1 }
            default:
                throw new Error()
        }
    }

    return (
        <div className="relative flex items-center border border-border-grey-100 p-12 rounded-standard transition duration-400 hover:border-blue-100 dark-states">
            <span className={`btn-primary-round minus ${state.count === 1 ? 'invisible' : ''}`} onClick={() => dispatch({ type: 'decrement' })}></span>
            <div className="flex items-center space-x-4 ml-auto">
                <div className="relative">
                    <span>{state.count}</span> GB
                </div>
            </div>

            <div className="flex items-center space-x-4 ml-auto">
                <div className="relative">
                    <span className={`btn-primary-round plus ${state.count === MAX_STORAGE ? 'invisible' : ''}`} onClick={() => dispatch({ type: 'increment' })}></span>
                </div>
            </div>
        </div>
    )
}