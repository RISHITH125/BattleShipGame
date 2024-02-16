import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setUsername}) {
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Redirect to the board after successful login
    // window.location.href = '/board';
    navigate("/room");
  };

  const handleButtonClick = () => {
    // Update the username state when the button is clicked
    setUsername(document.getElementById('username').value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            How should we know you
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleButtonClick}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Lets Begin!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  setUsername: PropTypes.func.isRequired,
  socket: PropTypes.instanceOf(WebSocket).isRequired,
};

export default LoginPage;
