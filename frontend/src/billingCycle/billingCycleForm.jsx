import { useFieldArray, useForm } from "react-hook-form";
import { faArrowLeft, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import OperationList from "./operationList";

export default ({ useMutationHook, onSuccess, item, onCancel,
    deleteMode = false
}) => {

    const { register, handleSubmit, reset, setError,
        control, formState: { errors } } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "credits"
    });
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

    useEffect(() => {
        if (item) {

            reset({
                id: item._id,
                name: item.name,
                month: item.month,
                year: item.year,
                credits: item.credits || []
            });
        }
    }, [item, reset]);

    function handleCancel() {
        reset()
        onCancel()
    }

    return (
        <div className="container mt-4">

            {formError && (
                <div className="alert alert-danger">
                    {formError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>

                <input type="hidden" {...register("id")} />
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Nome</label>
                        <input
                            readOnly={deleteMode}
                            className="form-control"
                            {...register("name")}
                        />

                        {errors.name && (
                            <div className="text-danger">
                                {errors.name.message}
                            </div>
                        )}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className="form-label">Mês</label>
                        <input
                            readOnly={deleteMode}
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

                    <div className="col-md-4 mb-3">
                        <label className="form-label">Ano</label>
                        <input
                            readOnly={deleteMode}
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
                </div>

                <div className="row mb-3">
                    <OperationList
                        title="Créditos"
                        fields={fields}
                        register={register}
                        append={append}
                        remove={remove}
                        deleteMode={deleteMode}
                    />
                </div>

                <div className="d-flex gap-2">

                    {deleteMode ? (
                        <button className="btn btn-danger" >
                            <FontAwesomeIcon icon={faTrash} className="me-1" />

                            {isLoading ? "Excluindo..." : "Excluir"}
                        </button>
                    ) : (
                        <button className="btn btn-primary" >
                            <FontAwesomeIcon icon={faSave} className="me-1" />

                            {isLoading ? "Salvando..." : "Salvar"}
                        </button>
                    )}

                    <button type="button"
                        className="btn btn-light"
                        onClick={() => handleCancel()}>

                        <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
                        Voltar
                    </button>
                </div>

            </form>

        </div>
    );
}