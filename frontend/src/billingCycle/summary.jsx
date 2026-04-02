import { faBank, faCreditCard, faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import Row from "../common/template/row"
import ValueBox from "../common/widget/valueBox"

export default ({ credits = 0, debts = 0 }) => {

    return (
        <div className="col-12 mb-3">
            <fieldset className="border rounded p-3">
                <div className="row mb-1">
                    <div className="col-md-10">
                        <legend className="w-auto px-2">
                            Resumo
                        </legend>
                    </div>

                    <ValueBox
                        cols='12 4'
                        color='success'
                        icon={faBank}
                        value={credits}
                        text='Total de Créditos' />
                    <ValueBox
                        cols='12 4'
                        color='danger'
                        icon={faCreditCard}
                        value={debts}
                        text='Total de Débitos' />
                    <ValueBox
                        cols='12 4'
                        color='primary'
                        icon={faMoneyBill}
                        value={credits - debts}
                        text='Valor Consolidado' />
                </div>
            </fieldset>
        </div>
    )
}