import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { registerUserApi } from "../../apis/user";

export default function Signup() {
    const [form, setForm] = useState({
        fullName: "",
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);

    const handleChangeEvent = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (
            form.fullName.trim() &&
            form.username.trim() &&
            form.email.trim() &&
            form.password.trim()
        ) {
            const { success, message } = await registerUserApi(form);

            if (success) {
                toast.success(message);
                navigate("/auth/login");
            } else {
                toast.error(message);
            }
        } else {
            toast.error("Please fill in all fields.");
        }

        setIsLoading(false);
    };


    return (
        <div className="p-5 w-full max-w-md border border-secondary rounded bg-secondary/20">
            <h1 className="text-2xl font-extrabold">
                Create Account
            </h1>

            <p className="text-sm mt-2 text-accent">
                Create account for free to connect with friends.
            </p>

            <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
                <div className="flex flex-col items-start">
                    <label className="text-sm px-1 text-light/80" htmlFor="fullName">
                        Full name
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChangeEvent}
                        className="w-full mt-2 bg-secondary rounded-md text-base py-2 px-3 outline-none text-light/80"
                        placeholder="Full Name"
                    />
                </div>

                <div className="flex flex-col items-start">
                    <label className="text-sm px-1 text-light/80" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChangeEvent}
                        className="w-full mt-2 bg-secondary rounded-md text-base py-2 px-3 outline-none text-light/80"
                        placeholder="Username"
                    />
                </div>

                <div className="flex flex-col items-start">
                    <label className="text-sm px-1 text-light/80" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChangeEvent}
                        className="w-full mt-2 bg-secondary rounded-md text-base py-2 px-3 outline-none text-light/80"
                        placeholder="Email"
                    />
                </div>

                <div className="flex flex-col items-start">
                    <label className="text-sm px-1 text-light/80" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChangeEvent}
                        className="w-full mt-2 bg-secondary rounded-md text-base py-2 px-3 outline-none text-light/80"
                        placeholder="Password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`bg-accent/70 hover:bg-accent/60 text-light/90 py-2 font-semibold rounded-md mt-2 disabled:bg-secondary `}
                >
                    {isLoading ? 'Creating Account...' : 'Create'}
                </button>
            </form>

            <p className="mt-3 text-sm">
                Already have an account ?{" "}
                <Link className="font-semibold text-accent" to={'/auth/login'}>
                    Login Account
                </Link>
            </p>
        </div>
    );
}