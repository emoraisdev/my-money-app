import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useGetBillingCyclesQuery } from "./billingCycleApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default props => {

    const { data, isLoading, error } = useGetBillingCyclesQuery()

    if (isLoading) return <div>Carregando...</div>
    if (error) return <div>Erro ao carregar lista de Ciclos de Pagamentos</div>

    function renderRows() {
        const list = data.data || []

        return list.map((item) => (
            <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.month}</td>
                <td>{item.year}</td>
                <td>
                    <div className="d-flex gap-2">

                        <button
                            className="btn btn-outline-primary"
                            onClick={() => props.edit(item)}>

                            <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <button className="btn btn-outline-danger">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>

                    </div>
                </td>
            </tr>
        ))
    }

    return (
        <div className="container mt-4">

            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Mês</th>
                            <th>Ano</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {renderRows()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}