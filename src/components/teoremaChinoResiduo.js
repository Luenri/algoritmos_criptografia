import bootstrap from 'bootstrap/dist/css/bootstrap.css'

import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Tcr = () => {
    const [ecuaciones, setEcuaciones] = useState('');

    const [resultado, setResultado] = useState('');

    const handleChangeEcuaciones = (event) => {
        setEcuaciones(event.target.value)
    }

    //Algoritmo de Euclides extendedido
    const gcdext=(a, b) => {
        var prevx = 1, x = 0;
        var prevy = 0, y = 1;
        while (b !== 0) {
            var q = Math.floor(a / b);
            var temp = x;
            x = prevx - q * x;
            prevx = temp;
            temp = y;
            y = prevy - q * y;
            prevy = temp;
            temp = b;
            b = a % b;
            a = temp;
        }
        return [a, prevx, prevy];
    }

    function calcularResiduo(dividendo, divisor) {
        let residuo = dividendo % divisor;
        if (residuo < 0) {
            residuo += Math.abs(divisor);
        }
        return residuo;
    }


    //Teorema chino del residuo
    const teoremaChinoResiduo=(sistemaEcuaciones)=>{
        if(sistemaEcuaciones.length<2){
            return "Deben existir al menos 2 ecuaciones para realizar el proceso"
        }
        let i = 1;
        let resultado = 0;
        while (i < sistemaEcuaciones.length) {
            let n = 1;
            for (let j = 0; j < sistemaEcuaciones.length; j++) {
                if (j < i) {
                    n *= sistemaEcuaciones[j][1];
                }
            }

            console.log("gcdext("+n+","+sistemaEcuaciones[i][1]+")");
            let [r, x, y] = gcdext(n, sistemaEcuaciones[i][1]);
            console.log(r);
            if(r!=1){
                return "El sistema puede que no tenga solución debido a que los modulos no son coprimos"
            }

            if(i==1){
                resultado=(sistemaEcuaciones[i - 1][0] * y * sistemaEcuaciones[i][1]) + (sistemaEcuaciones[i][0] * x * n);

            }else{
                resultado=(resultado * y * sistemaEcuaciones[i][1]) + (sistemaEcuaciones[i][0] * x * n);
            }
            i++;
        }

        let ntotal = 1;
        sistemaEcuaciones.map(function(arreglo){
            ntotal*=arreglo[1];
        }) 

        let Nsolucion = 1;

        if(resultado<0){
            Nsolucion = calcularResiduo(resultado, ntotal)
        }else{
            Nsolucion=resultado%ntotal;
        }

      
        
        return `Cualquier solucion tiene la forma: n = ${Nsolucion} + ${ntotal}z`;
    }

    const handleSubmit =(event)=>{
        var stringCoordenadas = ecuaciones.replace(/\(|\)|\s/g, '');

        var pares = stringCoordenadas.split('-');

        var arregloCoordenadas = pares.map(function(par) {
            return par.split(',');
        });

        arregloCoordenadas.map(function(arreglo){
            parseInt(arreglo[0]);
            parseInt(arreglo[1]);
        })

        setResultado(teoremaChinoResiduo(arregloCoordenadas));
        event.preventDefault();
    }

    return(
        <div className='container'>
            <br></br>

            <div>
                <h1>Teorema chino del residuo</h1>
            </div>

            <Alert variant="primary">
                <Alert.Heading>Algoritmo para calcular el Teorema chino del residuo </Alert.Heading>
                <p>
                    Considere una ecuación congruencial de la forma n = r (mod m).
                </p>
                <p>
                    A continuación para resolver un sistema de ecuaciones congruenciales por favor ingresar las tuplas de la forma (r,m) separadas por un "-" cada tupla.
                </p>
                <p>Ejemplo: (r1,m1)-(r2,m2)-(r3,m3)</p>
            </Alert>

            <h3>TCR</h3>
            <div className='col-md-12' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                
                <div className='col-md-6'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingrese un sistema de ecuaciones congruenciales de la forma que se menciona arriba: </Form.Label>
                            <Form.Control type='text' value={ecuaciones} onChange={handleChangeEcuaciones} />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Button type='submit'>Calcular solución</Button>
                        </Form.Group>
                    </Form>
                </div>

                <div className='col-md-6'>
                    <h3><p>Resultado: {resultado}</p></h3>
                </div>
            
            </div>


        </div>


    )

}

export default Tcr;