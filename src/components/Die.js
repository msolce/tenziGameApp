export default function Die(props){
    // console.log(props)
    return (
        <div 
            className={props.isHeld ? 'die-face-held' : 'die-face'} 
            onClick={()=>props.setHeld(props.id)}>
                <h2 className='die-num' >{props.value}</h2> 
        </div>
    )
}