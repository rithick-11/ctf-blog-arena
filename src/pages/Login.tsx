
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-background grid-bg">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
