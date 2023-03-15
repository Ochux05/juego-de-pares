import { useState } from "react"

var valuePares = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6"]
var espacio = -1 //Poner un <br> para que se vea mejor
var ocultarDosValores = 0
var wonPar = false
var twoPar = [null, null] //Detecta los dos pares que se le han mandado
var restando = valuePares.length
var newGame = false
var colorPares = "black"

function revolviendoValues(array) {
    var largo = array.length
    var noRepetir = []

    array.forEach(() => {
        do {
            var numRandom = Math.floor(Math.random()*largo)

        } while (noRepetir.includes(numRandom))
        noRepetir.push(numRandom)

        array.push(array[numRandom])
    })

    for (let i = 0; i < noRepetir.length; i++) {
        array.shift()
    }
} 

function Parejas(props) {
    const [disableClick, setDisableClick] = useState(false)
    const [iniciar, setIniciar] = useState(false)
    const [jugando, setJugando] = useState(false)

    if (iniciar == true) {
        revolviendoValues(valuePares)
        setIniciar(false)
        setJugando(true)
    }

    function handleClick(e) {
        let input = e.target
        //En caso de volver a hacer click o si se han puesto otros pares
        if (input.style.color == colorPares || disableClick == true) {
            return
        }

        if (twoPar[0] == null) {
            twoPar[0] = input
        } else if (twoPar[0] != null) {
            twoPar[1] = input
        }
        input.style.color = colorPares
        ocultarDosValores++

        //Detectando si los pares son iguales
        if (twoPar[0] != null && twoPar[1] != null) {
            if (twoPar[0].value == twoPar[1].value) {
                wonPar = true
            }
        }


        if (ocultarDosValores == 2) {
            setDisableClick(true)
            setTimeout(() => {
                for (let i = 0; i < 2; i++) {

                    if (wonPar == true) {
                        //En caso de que sean iguales
                        twoPar[i].style.color = "transparent"
                        twoPar[i].disabled = true
                        //Lo anterior es para que parezca que se eliminó los input que fueron pares
                        restando--

                        if (restando == 0) {
                            restando = valuePares.length
                            props.start(false)
                            props.saveTime(true)
                            setIniciar(false)
                            setJugando(false)

                            //Para cambiar el valor a reiniciar
                            newGame = true
                        } 
                    } else {
                        //En caso de que los valores no sean iguales
                        twoPar[i].style.color = "transparent"
                    }

                    twoPar[i] = null
                }

                ocultarDosValores = 0
                setDisableClick(false)
                wonPar = false
            }, 400)
        }

    }


    const inputs =
        valuePares.map((element, i) => {
            espacio++

            if (espacio == 4) {
                espacio = 0
            }

            return (
                <span className="pares__span" key={i}>
                    <input
                        type="submit"
                        value={element}
                        id={`id${i}`}
                        onClick={handleClick}
                    />
                    {espacio == 3 ? <br /> : ""}
                </span>
            )
        })
    
    if (iniciar == false && jugando == false) {
        return <input
            type="submit"
            value="►"
            onClick={() => {
                setIniciar(true)
                props.start(true)
                espacio = -1
            }}
            id="inicioBoton"
            style={{
                margin: "1.1em"
            }}
        />
    }

    return inputs
}

export default Parejas