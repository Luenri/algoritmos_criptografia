import bootstrap from 'bootstrap/dist/css/bootstrap.css'

import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Caesar = () => {

    const [plainText, setPlainText] = useState('');
    const [shift, setShift] = useState('');
    const [resultadoENC, setResultadoENC] = useState('');

    const [cipherText, setCipherText] = useState('');
    const [cipherShift, setCipherShift] = useState('');
    const [resultadoDEN, setResultadoDEN] = useState('');

    const handleChangePlainText = (event) => {
        setPlainText(event.target.value);
    }

    const handleChangeShift = (event) => {
        if(!isNaN(event.target.value)){
            setShift(parseInt(event.target.value));
        }
    }

    const handleSubmit = (event) => {
        let cifrado= caesar_cipher_encryption(plainText,shift);
        setResultadoENC(cifrado);
        event.preventDefault();
    }

    const handleSubmitDES = (event) => {
        let plano= caesar_cipher_decryption(cipherText,cipherShift);
        setResultadoDEN(plano);
        event.preventDefault();
    }

    const handleChangeCipherText = (event) => {
        setCipherText(event.target.value);
    }

    const handleChangeCipherShift = (event) => {
        if(!isNaN(event.target.value)){
            setCipherShift(parseInt(event.target.value));
        }
    }
    
    //Algoritmo caesar cipher para encriptar
    const caesar_cipher_encryption=(plaintext, shift)=> {
        var ciphertext = '';
        for (var i = 0; i < plaintext.length; i++) {
            var char = plaintext[i];
            if (char === ' ') {
                ciphertext += ' ';
            } else if (char.match(/[A-Z]/)) {
                ciphertext += String.fromCharCode((char.charCodeAt(0) + shift - 65) % 26 + 65);
            } else {
                ciphertext += String.fromCharCode((char.charCodeAt(0) + shift - 97) % 26 + 97);
            }
        }
        return ciphertext;
    }

    //Algoritmo caesar cipher para desencriptar
    const caesar_cipher_decryption=(ciphertext, shift)=> {
        var plaintext = '';
        for (var i = 0; i < ciphertext.length; i++) {
            var char = ciphertext[i];
            if (char === ' ') {
                plaintext += ' ';
            } else if (char.match(/[A-Z]/)) {
                plaintext += String.fromCharCode((char.charCodeAt(0) - shift - 65 + 26) % 26 + 65);
            } else {
                plaintext += String.fromCharCode((char.charCodeAt(0) - shift - 97 + 26) % 26 + 97);
            }
        }
        return plaintext;
    }


    return(
        <div className="container">
            <br></br>
            <h1>Ceasar cipher encription and decryption</h1>
            <Alert variant="primary">
                <Alert.Heading>Algoritmo Ceasar para encriptar y desencriptar</Alert.Heading>
                <p>
                    A continuación se podrá ingresar un texto y este será cifrado con el algoritmo caesar.
                </p>
            </Alert>
            <h3>Encriptar</h3>
            <div className='col-md-12' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                
                <div className='col-md-6'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingrese un texto plano</Form.Label>
                            <Form.Control type='text' value={plainText} onChange={handleChangePlainText} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingrese un shift</Form.Label>
                            <Form.Control type='number' value={shift} onChange={handleChangeShift} />
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
                    <Form onSubmit={handleSubmitDES}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingrese un texto cifrado</Form.Label>
                            <Form.Control type='text' value={cipherText} onChange={handleChangeCipherText} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingrese un shift</Form.Label>
                            <Form.Control type='number' value={cipherShift} onChange={handleChangeCipherShift} />
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
export default Caesar