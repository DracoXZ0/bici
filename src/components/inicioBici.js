import React from "react"
import { useState, useEffect } from "react"
import Alert from 'react-bootstrap/Alert';
import Mitad from "./mitad";


function InicioBici() {

    const [networks, setNetworks] = useState([])
    const [networkInfo, setNetworkInfo] = useState ([])

    const ConsumirAPI = async () => {
        var url = "http://api.citybik.es/v2/networks"
        const response = await fetch(url, { method: 'GET' })
            .then(response => response.json())
            .catch(error => console.log(error))
        setNetworks(response.networks)
    }

    const ConsumirAPIdetallada = async (id) => {

        var url = `http://api.citybik.es/v2/networks/${id}`
        const response = await fetch(url, { method: 'GET' })
            .then(response => response.json())
            .catch(error => console.log(error))
        setNetworkInfo(response.network)
        
    }

    useEffect(() => {
        ConsumirAPI()
    }, [])

    return (
        <div className="lista_networks">
            <Mitad data={networkInfo}></Mitad>
            {
                networks.map(network => {
                    return (
                        <div key={network.id} className="box">
                            <Alert variant={'dark'}>
                                <Alert.Link onClick={()=> ConsumirAPIdetallada(network.id)} className="borrar_linea" href="#">{network.name} ({network.location.city})</Alert.Link>
                            </Alert>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default InicioBici