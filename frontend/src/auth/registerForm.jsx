import { useForm } from "react-hook-form";
import { useRegisterMutation } from "./authApi";
import { setCredentials } from "./authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default () => {

    const { register, handleSubmit, reset } = useForm();
    const [formError, setFormError] = useState(null);
    const [registerUser, { isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {

        setFormError(null);
        try {

            const result = await registerUser(data).unwrap();

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

    function redirectToLogin() {
        navigate('/login')
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

                <h2 className="text-center mb-2 fw-bold">
                    My Money App
                </h2>
                <h3 className="text-center mb-4 text-muted">Crie uma conta</h3>

                {formError && (
                    <div className="alert alert-danger mt-2">
                        {formError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                    <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input
                            autoFocus
                            className="form-control"
                            {...register("name")}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">E-mail</label>
                        <input
                            type="email"
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
                        <label className="form-label">Confirmar Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            {...register("confirmPassword")}
                        />
                    </div>

                    <div className="mb-3 d-flex gap-3">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isLoading}>

                            {isLoading ? "Criando conta..." : "Cadastrar"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-light w-100"
                            onClick={redirectToLogin}
                            disabled={isLoading}>

                            Voltar
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}