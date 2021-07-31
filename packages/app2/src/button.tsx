import React from 'react'
const button = () => (
    <div style={{ padding: '8px' }}>
        <input type={'text'}></input>
        <button onClick={() => { alert('hello') }}>Some button</button>
    </div>
);
export default button;