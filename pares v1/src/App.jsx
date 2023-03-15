import Parejas from "./Parejas"
import Contador from "./Contador"
import { useState } from "react"
import "./styles/app.sass"

var comparationTime = []

function App() {
    const [startGame, setStartGame] = useState(false)
    const [seeBTime, setSeeBTime] = useState(" ")
    const [getTime, setGetTime] = useState(false)

    function bestTimeComparation(min, seg) {
        var uniteArrays = min.concat(seg)
        var resultInPantalla = []
        var zerosToPush = [] //Los ceros a poner

        while (uniteArrays[0] == 0) {
            uniteArrays.shift()
        }

        uniteArrays = uniteArrays.join("")
        uniteArrays = parseInt(uniteArrays)


        //--comparación--
        comparationTime.push(uniteArrays)

        if (comparationTime.length == 2) {

            //eligiendo cual tiempo es mejor
            if (comparationTime[0] > comparationTime[1]) {
                uniteArrays = comparationTime[1]
                comparationTime.splice(0, 1)
            } else {
                uniteArrays = comparationTime[0]
                comparationTime.splice(1, 1)
            }

        }
        //--fin comparación--


        uniteArrays = uniteArrays.toString()
        uniteArrays = uniteArrays.split("")

        for (let i = 4; i > uniteArrays.length; i--) {
            zerosToPush.push("0")
        }


        //--Agregando ceros y los dos puntos
        uniteArrays = zerosToPush.concat(uniteArrays)
        for (let i = 2; i <= 3; i++) {
            resultInPantalla.push(uniteArrays[i])
        }
        uniteArrays.splice(2)
        uniteArrays.push(":")
        resultInPantalla = uniteArrays.concat(resultInPantalla)
        //--Fin agregando ceros y dos puntos--


        setSeeBTime(resultInPantalla.join(""))
    }

    return (
        <>
            <div className="titulo">
                <h1>¡Encuentra las parejas!</h1>
            </div>

            <div className="pares">
                <Parejas
                    iniciar={startGame}
                    start={(boolean) => {
                        if (boolean == true) {
                            return setStartGame(true)
                        }

                        if (boolean == false) {
                            return setStartGame(false)
                        }
                    }}
                    saveTime={(boolean) => {
                        if (boolean == true) {
                            setGetTime(true)
                            setTimeout(() => {
                                setGetTime(false)
                            }, 1)
                        }
                    }}
                />
            </div>

            <div className="contadorYBestTime">
                <div className="contador">
                    <Contador
                        iniciar={startGame}
                        time={getTime}
                        gettingTheTime={(min, seg) => {
                            bestTimeComparation(min, seg)
                        }}
                    />
                </div>

                <span className="bestTime">
                    <h2>Mejor tiempo:<br /><span id="theBestTime">{seeBTime}</span></h2>
                </span>
            </div>
        </>
    )
}

export default App