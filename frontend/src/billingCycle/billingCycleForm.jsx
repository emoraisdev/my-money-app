import { useForm } from "react-hook-form";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default ({ useMutationHook, onSuccess }) => {

    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();
    const [mutation, { isLoading }] = useMutationHook();
    const [formError, setFormError] = useState(null);

    const onSubmit = async (data) => {

        setFormError(null);
        try {

            await mutation(data).unwrap();
            reset();
            if (onSuccess) onSuccess();

        } catch (err) {

            if (err?.data?.errors) {

                err.data.errors.forEach(({ field, message }) => {
                    setError(field, { type: "server", message });
                });
            } else {
                setFormError(err?.error || "Erro ao salvar ciclo de pagamento");
            }
        }
    };

    return (
        <div className="container mt-4">

            {formError && (
                <div className="alert alert-danger">
                    {formError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                        className="form-control"
                        {...register("name")}
                    />

                    {errors.name && (
                        <div className="text-danger">
                            {errors.name.message}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Mês</label>
                    <input
                        className="form-control"
                        type="number"
                        {...register("month")}
                    />

                    {errors.month && (
                        <div className="text-danger">
                            {errors.month.message}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Ano</label>
                    <input
                        className="form-control"
                        type="number"
                        {...register("year")}
                    />

                    {errors.year && (
                        <div className="text-danger">
                            {errors.year.message}
                        </div>
                    )}
                </div>

                <button className="btn btn-primary">
                    <FontAwesomeIcon icon={faSave} className="me-1" />
                    {isLoading ? "Salvando..." : "Salvar"}
                </button>

            </form>

        </div>
    );
}