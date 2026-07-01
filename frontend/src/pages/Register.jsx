import {useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });

    // ...formData keeps the old values after change.
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Without this, the browser refreshes the page after submitting the form
        
        try
        {
            const response = await api.post("/auth/register", formData);
            toast.success(response.data.message);
            navigate("/login");
        }
        catch(error)
        {
            toast.error(error.response.data.message);
        }
    };

    // To see the live change in fields on the browser, add this below inputs.
    // <pre>{JSON.stringify(formData, null, 2)}</pre>
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>

                <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />

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

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;