import bootstrap from 'bootstrap/dist/css/bootstrap.css'

import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AffineCaesar = () => {
    const [plainText, setPlainText] = useState('');
    const [shiftA, setShiftA] = useState('');
    const [shiftB, setShiftB] = useState('');
    const [resultadoENC, setResultadoENC] = useState('');

    const [cipherText, setCipherText] = useState('');
    const [cipherShiftA, setCipherShiftA] = useState('');
    const [cipherShiftB, setCipherShiftB] = useState('');
    const [resultadoDEN, setResultadoDEN] = useState('');

    const handleChangePlainText = (event) => {
        setPlainText(event.target.value);
    }

    const handleChangeShiftA = (event) => {
        if(!isNaN(event.target.value)){
            setShiftA(parseInt(event.target.value));
        }
    }

    const handleChangeShiftB = (event) => {
        if(!isNaN(event.target.value)){
            setShiftB(parseInt(event.target.value));
        }
    }

    const handleSubmitEnc = (event) => {
        let cifrado= affine_cipher_encryption(plainText,shiftA,shiftB);
        setResultadoENC(cifrado);
        event.preventDefault();
    }

    const handleChangeCipherText = (event) => {
        setCipherText(event.target.value);
    }

    const handleChangeCipherShiftA = (event) => {
        if(!isNaN(event.target.value)){
            setCipherShiftA(parseInt(event.target.value));
        }
    }

    const handleChangeCipherShiftB = (event) => {
        if(!isNaN(event.target.value)){
            setCipherShiftB(parseInt(event.target.value));
        }
    }

    const handleSubmitDen = (event) => {
        let plano= affine_cipher_decryption(cipherText,cipherShiftA,cipherShiftB);
        setResultadoDEN(plano);
        event.preventDefault();
    }


    //Algoritmo caesar cipher para encriptar con dos llaves
    const affine_cipher_encryption=(plaintext, a, b)=> {
        var ciphertext = '';
        for (var i = 0; i < plaintext.length; i++) {
            var char = plaintext[i];
            if (char === ' ') {
                ciphertext += ' ';
            } else if (char.match(/[A-Z]/)) {
                ciphertext += String.fromCharCode((a * (char.charCodeAt(0) - 65) + b) % 26 + 65);
            } else {
                ciphertext += String.fromCharCode((a * (char.charCodeAt(0) - 97) + b) % 26 + 97);
            }
        }
        return ciphertext;
    }

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
    //Algoritmo caesar cipher para desencriptar con dos llave
    const affine_cipher_decryption=(ciphertext, a, b)=> {
        const N = 26;
        const bar_a = gcdext(a, N)[1] % N;
        let plaintext = '';
        for (let i = 0; i < ciphertext.length; i++) {
            const charCode = ciphertext.charCodeAt(i);
            if (charCode === 32) {
                plaintext += ' ';
            } else if (charCode >= 65 && charCode <= 90) {
                plaintext += String.fromCharCode((bar_a * (charCode - 65 - b) % 26 + 26) % 26 + 65);
            } else if (charCode >= 97 && charCode <= 122) {
                plaintext += String.fromCharCode((bar_a * (charCode - 97 - b) % 26 + 26) % 26 + 97);
            }
        }
        return plaintext;
    }



    return(
        <div className='container'>
            <br></br>
            
            <h1>Affine Ceasar cipher encription and decryption</h1>
            <Alert variant="primary">
                <Alert.Heading>Algoritmo Affine Ceasar para encriptar y desencriptar</Alert.Heading>
                <p>
                    A continuación se podrá ingresar un texto y este será cifrado con el algoritmo Affine caesar.
                </p>
            </Alert>
            <h3>Encriptar</h3>
            <div className='col-md-12' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                
                <div className='col-md-6'>
                    <Form onSubmit={handleSubmitEnc}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingrese un texto plano</Form.Label>
                            <Form.Control type='text' value={plainText} onChange={handleChangePlainText} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingrese una llave A</Form.Label>
                            <Form.Control type='number' value={shiftA} onChange={handleChangeShiftA} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingrese una llave B</Form.Label>
                            <Form.Control type='number' value={shiftB} onChange={handleChangeShiftB} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button type='submit'>Encriptar</Button>
                        </Form.Group>
                    </Form>
                </div>

                <div className='col-md-6'>
                    <h2><p>Texto Encriptado: {resultadoENC}</p></h2>
                </div>
            
            </div>

            <h3>Desencriptar</h3>
            <div className='col-md-12' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                
                <div className='col-md-6'>
                    <Form onSubmit={handleSubmitDen}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingrese un texto encriptado</Form.Label>
                            <Form.Control type='text' value={cipherText} onChange={handleChangeCipherText} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingrese una llave A</Form.Label>
                            <Form.Control type='number' value={cipherShiftA} onChange={handleChangeCipherShiftA} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingrese una llave B</Form.Label>
                            <Form.Control type='number' value={cipherShiftB} onChange={handleChangeCipherShiftB} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button type='submit'>Desencriptar</Button>
                        </Form.Group>
                    </Form>
                </div>

                <div className='col-md-6'>
                    <h2><p>Texto plano: {resultadoDEN}</p></h2>
                </div>
            
            </div>


        </div>


    )


}
export default AffineCaesar