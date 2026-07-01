import {useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try
        {
            const response = await api.post("/auth/login", formData);
            localStorage.setItem('token', response.data.token);
            toast.success(response.data.message);
            navigate("/home");
        }
        catch(error)
        {
            toast.error(error.response.data.message);
        }
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login Page</h1>

                <input
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;