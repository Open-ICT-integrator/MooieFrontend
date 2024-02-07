import React, { useState } from "react";
import { Button, Input, Link } from "@nextui-org/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your actual login logic here
    // For simplicity, let's assume a successful login
    const isAuthenticated = true;
    if (isAuthenticated) {
      console.log("hey");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-8 shadow-md rounded-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <Input
          type="text"
          placeholder="Username"
          className="mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          className="mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link href="#" underline="hover" className="mb-4">
          Forgot password
        </Link>
        <div className="flex space-x-4">
          <Button
            className="bg-blue-500 text-white"
            onClick={handleLogin}
            type="submit"
          >
            Login
          </Button>
          <Button className="bg-blue-500 text-white">Sign-up</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
