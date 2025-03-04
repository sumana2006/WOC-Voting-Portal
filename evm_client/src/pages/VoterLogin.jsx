import { useNavigate } from 'react-router-dom';

const VoterLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold">Voter Login</h2>
      <button onClick={() => navigate('/dashboard')} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
        Go to Dashboard
      </button>
    </div>
  );
};

export default VoterLogin;
