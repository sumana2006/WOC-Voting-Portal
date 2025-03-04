import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useEvmStore} from '../store/zustand';

const EvmRegistration = () => {
  const [evmIdInput, setEvmIdInput] = useState('');
  const setEvmId = useEvmStore((state) => state.setEvmId);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (evmIdInput.trim()) {
      setEvmId(evmIdInput);
      navigate('/voter-login');
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">EVM Registration</h2>
      <input
        type="text"
        placeholder="Enter EVM ID"
        value={evmIdInput}
        onChange={(e) => setEvmIdInput(e.target.value)}
        className="border px-3 py-2 rounded"
      />
      <button onClick={handleRegister} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Register
      </button>
    </div>
  );
};

export default EvmRegistration;
