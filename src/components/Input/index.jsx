import './styles.css'

export const TextInput = ({ inputValue, actionFn, placeholder }) => {
    return (
        <input
            type='search'
            className='input-form'
            onChange={actionFn}
            value={inputValue}
            placeholder={placeholder}
        />
    )
}