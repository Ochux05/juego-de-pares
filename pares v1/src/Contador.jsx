import { useState } from "react"

var min = [0, 0]
var seg = [0, 0]
var iniciando = true

function Contador(props) {
    const [contando, setContando] = useState()

    if (props.time == true) {
        //Toca añadir un delay para evitar bug
        setTimeout(() => {
            props.gettingTheTime(min, seg)
        }, 1)
    }

    var theContador = 
        setTimeout(() => {
            seg[1]++

            if (props.iniciar == false) {
                iniciando = true
                return (
                    seg = [0, 0],
                    min = [0, 0]
                )
            } 

            if (seg[1] == 10) {
                seg[1] = 0
                seg[0]++
            }

            if (seg[0] == 6 && seg[1] == 0) {
                seg[0] = 0
                seg[1] = 0
                min[1]++
            }

            if (min[1] == 10) {
                min[1] = 0
                min[0]++
            }

            setContando(`${min.join("")}:${seg.join("")}`)

            iniciando = false
        }, 1000)
    
    return (
        <h1>{iniciando == false && props.iniciar == true ? contando : "00:00"}</h1>
    )
}

export default Contador