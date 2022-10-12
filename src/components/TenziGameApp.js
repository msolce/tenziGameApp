import React from 'react';
import Die from './Die'
import Placar from './Placar'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'


export default function TenziGameApp() {

    const [contadorClicks, setContadorClicks] = React.useState(0); 
    const [ dice, setDice ] = React.useState(allNewDice())
    const [ tenzie, setTenzie ] = React.useState(false)
        //lazy initialize......  so roda a primeira vez
    const [ placar, setPlacar] = React.useState(() =>  
            JSON.parse(localStorage.getItem('placar')) || []
        )

    //FUNCAO QUE CRIA OS OBJETO PARA VALORES DOS DADOS
    function allNewDice() {
        const diceArray = [];
        for (let i = 0; i < 10; i++) {
            const dice = Math.ceil(Math.random() * 6)

            diceArray.push({
                id: nanoid(),
                value: dice,
                isHeld: false
            });
        }
        return diceArray;
    }

    /*
    FUNCAO TESTA SE OS VALORES DOS DADOS
    SAO IGUAIS E SE ESTAO TODOS com isHeld = TRUE
    RETORNA TRUE OU FALSE
    */
    function isSameValue(el, index, arr) {
        if (index === 0) {
          return true;
        } else {
          return (el.value === arr[index - 1].value && el.isHeld === true );
        }
      }

    /*
    ALTERA O PARAMETRO isHeld DO ID PASSADO
    */
    function setHeld(id){
        setDice(prevDice=>{
            return (
                prevDice.map(dice => {
                    return dice.id === id
                    ? {...dice, isHeld: !dice.isHeld}
                    : dice
                })
            )
        })
    };

    //CRIA OS COMPONENTES DOS DADOS
    const diceElements = dice.map(die => {
        return (
               <Die 
                key={die.id}
                id={die.id}
                value={die.value}
                isHeld={die.isHeld}
                setHeld ={setHeld}
               />
    )})

    //VERIFICA SE O GANHOU O JOGO TODA VEZ QUE O ARRY DE DADOS É ALTERADO
    React.useEffect(()=>{
        // console.log('Dice State Changed')
        const ganhou = dice.every(isSameValue)
        if(ganhou){
            // console.log('GANHOU!');
            setTenzie(true);
        }
        if(!ganhou){
            setTenzie(false)
        };
    }, [dice])

    //FUNCAO PARA ALTERAR O VALUE DO DADO COM isHeld = false
    function roll(){
        setContadorClicks(prev => prev + 1);
        setDice(prevDice => {
            return (
                prevDice.map(dice => {
                    return dice.isHeld === true
                    ? dice
                    : {...dice, value: (Math.ceil(Math.random() * 6))}
                }

                )
            )
        });
    }

    //REGISTRA PLACAR E RESETA PARA UM NOVO JOGO
    function newGame(){
        const nome = prompt("Qual o nome do player?")
        const placarJorgador = {
            nome: nome,
            clicks: contadorClicks
        };
        setPlacar(prevArray => [...prevArray, placarJorgador])
        setContadorClicks(0);
        setDice(allNewDice);
        // console.log(placar)
    }

    React.useEffect(() => {
        localStorage.setItem('placar', JSON.stringify(placar))
    }, [placar])

    return (
        <div>
            <main>
                {tenzie && <Confetti />}
                <div className='dice-container'>
                    {diceElements}
                </div>
                <div className='space'></div>
                {!tenzie && <button className='roll-button' onClick={roll}>Roll</button>}
                {tenzie && <button className='roll-button' onClick={newGame}>RESET</button>}
                <div className='contador-clicks'>Clicks: {contadorClicks}</div>
            </main>
            <div>
                <Placar
                    placar={placar}
                />
            </div>
        </div>
        
    )
};