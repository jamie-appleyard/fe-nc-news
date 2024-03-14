const StatusMessage = (props) => {
    const {message, setDisplayStatusMessage} = props

    return (
        <div className="status-message" style={ message === 'Comment Posted Succesfully' ? {background:'green'} : {background:'red'}}>
            <p>{message}</p>
            <img src='/src/assets/x-solid.svg' onClick={() => {setDisplayStatusMessage(false)}}/>
        </div>
    )
}

export default StatusMessage