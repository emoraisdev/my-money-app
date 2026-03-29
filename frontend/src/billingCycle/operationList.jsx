import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default ({ title, fields, register, append, remove, deleteMode }) => {

    function renderRows() {

        return fields.map((item, index) => (
            <tr key={item.id}>
                <td>
                    <input
                        readOnly={deleteMode}
                        className="form-control"
                        {...register(`credits.${index}.name`)}
                    />
                </td>
                <td>
                    <input
                        readOnly={deleteMode}
                        type="number"
                        className="form-control"
                        {...register(`credits.${index}.value`)}
                    />
                </td>

                <td>
                    {!deleteMode && (
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-danger"
                                type="button"
                                onClick={() => remove(index)} >

                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    )}
                </td>
            </tr>
        ))
    }

    return (
        <div className="col-md-6">
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