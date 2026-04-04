import { useForm } from "react-hook-form";
import { useLoginMutation } from "./authApi";
import { setCredentials } from "./authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default () => {

    const { register, handleSubmit, reset } = useForm();
    const [formError, setFormError] = useState(null);
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {

        setFormError(null);
        try {

            const result = await login(data).unwrap();

            dispatch(setCredentials({
                user: { name: result.name },
                token: result.token
            }));

            navigate('/')
            reset();

        } catch (err) {
            setFormError(err?.data?.error || "Erro desconhecido. Consulte o suporte.");
        }
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "#f5f6fa" }}
        >
            <div
                className="card p-4 shadow"
                style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
            >

                <h2 className="text-center mb-4 fw-bold">
                    My Money App
                </h2>

                {formError && (
                    <div className="alert alert-danger">
                        {formError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-3">
                        <label className="form-label">E-mail</label>
                        <input
                            className="form-control"
                            {...register("email")}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            {...register("password")}
                        />
                    </div>

                    <div className="mb-3">
                        <button
                            type="submit" className="btn btn-primary w-100"
                            disabled={isLoading}>

                            {isLoading ? "Entrando..." : "Login"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}