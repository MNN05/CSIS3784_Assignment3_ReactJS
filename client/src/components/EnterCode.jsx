import { useState } from 'react';

const EnterCodeScreen = ({ onSubmit }) => {
  const [code, setCode] = useState('');

  return (
    <div>
      <input value={code} onChange={e => setCode(e.target.value)} placeholder="Enter Game Code" />
      <button onClick={() => onSubmit(code)}>Next</button>
    </div>
  );
};

export default EnterCodeScreen;