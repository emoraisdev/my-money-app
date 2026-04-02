import { faClone, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import If from "../common/operator/if"

export default ({ title, fields, register, append,
    watch, remove, deleteMode, fieldName, showStatus = false }) => {

    function renderRows() {

        return fields.map((item, index) => (
            <tr key={item.id}>
                <td>
                    <input
                        readOnly={deleteMode}
                        className="form-control"
                        {...register(`${fieldName}.${index}.name`)}
                    />
                </td>
                <td>
                    <input
                        readOnly={deleteMode}
                        type="number"
                        className="form-control"
                        {...register(`${fieldName}.${index}.value`,
                            { valueAsNumber: true })}
                    />
                </td>
                <If test={showStatus}>
                    <td>
                        <input
                            readOnly={deleteMode}
                            className="form-control"
                            {...register(`${fieldName}.${index}.status`)}
                        />
                    </td>
                </If>

                <td>
                    {!deleteMode && (
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-danger"
                                type="button"
                                title="Excluir"
                                onClick={() => remove(index)} >

                                <FontAwesomeIcon icon={faTrash} />
                            </button>

                            <button className="btn btn-outline-secondary"
                                type="button"
                                title="Clonar"
                                onClick={() =>
                                    append({
                                        name: watch(`${fieldName}.${index}.name`) || "",
                                        value: watch(`${fieldName}.${index}.value`) || 0,
                                        status: watch(`${fieldName}.${index}.status`) || ""
                                    })} >

                                <FontAwesomeIcon icon={faClone} />
                            </button>
                        </div>
                    )}
                </td>
            </tr>
        ))
    }

    return (
        <div className="col-12 col-md-6">
            <fieldset className="border rounded p-3">

                <div className="row">
                    <div className="col-md-10">
                        <legend className="w-auto px-2">
                            {title}
                        </legend>
                    </div>

                    {!deleteMode && (
                        <div className="col-md-2">
                            <button
                                type="button"
                                title="Adicionar Item"
                                className="btn btn-outline-success mb-3"
                                onClick={() => append({ name: "", value: 0 })}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>)
                    }
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Valor</th>
                                <If test={showStatus}>
                                    <th>Status</th>
                                </If>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {renderRows()}
                        </tbody>
                    </table>
                </div>
            </fieldset>
        </div>
    )
}