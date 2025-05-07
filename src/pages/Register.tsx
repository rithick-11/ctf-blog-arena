
import Navbar from '../components/Navbar';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-background grid-bg">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
