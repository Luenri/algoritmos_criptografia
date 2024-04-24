import bootstrap from 'bootstrap/dist/css/bootstrap.css'

import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Mcd = () => {

    const [numA, setNumA] = useState('');
    const [numB, setNumB] = useState('');

    const [resultado, setResultado] = useState('');

    const handleChangeNumA = (event) => {
        if(!isNaN(event.target.value)){
            setNumA(parseInt(event.target.value));
        }
    }

    const handleChangeNumB = (event) => {
        if(!isNaN(event.target.value)){
            setNumB(parseInt(event.target.value));
        }
    }

    const handleSubmit = (event) => {
        const mcd = gcd(numA, numB);
        setResultado(mcd);
        event.preventDefault();
    }

    
    const gcd = (a, b)=> {
        if (!(a >= 0 && b >= 0 && a + b > 0)) {
            throw new Error("Los números deben ser mayores o iguales a cero y su suma debe ser mayor a cero.");
        }
        while (b > 0) {
            [a, b] = [b, a % b];
        }
        return isNaN(a) ? '' : String(a);
    }



    return(
        <div className="container" style={{padding:'15px'}}>
            <div>
                <h1>Máximo común divisor</h1>
            </div>

            <Alert variant="primary">
                <Alert.Heading>Algoritmo para calcular el MÁXIMO COMÚN DIVISOR (Algoritmo de Euclides) </Alert.Heading>
                <p>
                    A continuación se podrá ingresar dos números y se calculará el MCD entre ellos.
                </p>
            </Alert>

            <div className='col-md-12' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div className='col-md-6'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingrese un número A</Form.Label>
                            <Form.Control type="number" value={numA} onChange={handleChangeNumA} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingrese un número B</Form.Label>
                            <Form.Control type='number' value={numB} onChange={handleChangeNumB} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button type='submit'>Calcular MCD</Button>
                        </Form.Group>
                    </Form>
                </div>

                <div className='col-md-6'>
                    <h2><p>Resultado: {resultado}</p></h2>
                    

                </div>
            
            </div>
            
        </div>
        
    )
}
export default Mcd