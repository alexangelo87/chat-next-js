import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';



const socket = io('localhost:3000');
function Index() {
    const [status, setStatus] = useState('...');
    const [mensagem, setMensagem] = useState('');
    const [mensagemServidor, setMensagemServidor] = useState([]);
    socket.on('now', status => {
        if(status) {
            console.log(status)
            setStatus(status);
        }   
    });

    socket.on('mensagem', mensagemServidor => {
        console.log(mensagemServidor)
        setMensagemServidor(mensagemServidor);
    });

    socket.on('novo', mensagemServidor => {
        console.log(mensagemServidor)
    });

    const sendMessege = (e) => {
        setMensagemServidor([...mensagemServidor, mensagem])
        socket.emit('mensagem', mensagem)
    }

    return(
        <div>
            <h3>Status: <b>{status}</b></h3>
            <ul>
                {mensagemServidor.map(mensagem => <li>{mensagem}</li>)}
            </ul>
            <input type='text' value={mensagem} onChange = {e => setMensagem(e.target.value)}/>
            <button onClick= {() => sendMessege()}>enviar</button>
        </div>
    );
} 

export default Index;