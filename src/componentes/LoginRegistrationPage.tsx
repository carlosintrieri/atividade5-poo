import React, { useState } from 'react';


const LoginRegistrationPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        console.log('Email:', email);
        console.log('Password:', password);

    };

    const toggleForm = () => {
        setIsLogin((prevState) => !prevState);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold">
                        {isLogin ? 'Login' : 'Register'}
                    </h2>
                </div>
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className="w-full mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white focus:outline-none"
                    onClick={handleSubmit}
                >
                    {isLogin ? 'Login' : 'Register'}
                </button>
                <div className="text-center mt-4">
                    <button
                        type="button"
                        className="text-gray-400 hover:text-white focus:outline-none"
                        onClick={toggleForm}
                    >
                        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginRegistrationPage;
