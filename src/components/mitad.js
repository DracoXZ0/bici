import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function Mitad({ data }) {
    
    const [total_free_bikes, setAllFB] = useState(null)
    const [all_empty_slots, setAllES] = useState(null)
    const estaciones = data.stations

    const handleCount = () => {
        var temp_estaciones = estaciones
        var all_empty_slots = 0
        var all_free_bikes = 0
        for (var i in temp_estaciones) {
            all_empty_slots = all_empty_slots + temp_estaciones[i].empty_slots
            all_free_bikes = all_free_bikes + temp_estaciones[i].free_bikes
        }
        setAllFB(all_free_bikes)
        setAllES(all_empty_slots)
    }

    useEffect(() => {
        handleCount()
    }, [handleCount])

    if (data.length === 0) {
        return (
            <div className="contenedor_medio">
                <Alert variant="success">
                    <Alert.Heading>Dale Click a una network</Alert.Heading>
                </Alert>
            </div>
        )
    }
    return (
        <div className="contenedor_medio">
            <Alert className='Alert' variant="success">
                <Alert.Heading>
                    {data.name}
                    <br></br>
                    Total espacios libres: {all_empty_slots}
                    <br></br>
                    Total bicicletas libres: {total_free_bikes}
                </Alert.Heading>
                <p className="mb-0">
                    {data.company} {data.location.country}
                </p>
                {
                    estaciones.map(estacionInterna => {
                        return (
                            <div key={estacionInterna.id} className="box">
                                {estacionInterna.name}
                                <br></br>
                                Bicicletas libres: {estacionInterna.free_bikes === null ? "No hay información" : estacionInterna.free_bikes } 
                                <br></br>
                                Espacios libres: {estacionInterna.empty_slots === null ? "No hay información" : estacionInterna.empty_slots}
                                <br></br>
                                Total espacios: {estacionInterna.empty_slots + estacionInterna.free_bikes}
                                <br></br>
                                Ultima actualización: {estacionInterna.timestamp}
                                <hr></hr>
                                
                            </div>
                        )
                    })
                }
            </Alert>
        </div>
    )
}

export default Mitad