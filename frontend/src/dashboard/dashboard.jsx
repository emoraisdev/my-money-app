import { faBank, faCreditCard, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import Content from "../common/template/content";
import ContentHeader from "../common/template/contentHeader";
import ValueBox from "../common/widget/valueBox";
import Row from "../common/template/row";
import { useGetSummaryQuery } from "../billingCycle/billingCycleApi";

export default () => {

    const { data: summary, isLoading, error } = useGetSummaryQuery()

    if (isLoading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao carregar summary</div>;

    return (
        <div>
            <ContentHeader title='Dashboard' small='Versão 1.0' />
            <Content>
                <Row>
                    <ValueBox
                        cols='12 4'
                        color='success'
                        icon={faBank}
                        value={summary.credit}
                        text='Total de Créditos' />
                    <ValueBox
                        cols='12 4'
                        color='danger'
                        icon={faCreditCard}
                        value={summary.debt}
                        text='Total de Débitos' />
                    <ValueBox
                        cols='12 4'
                        color='primary'
                        icon={faMoneyBill}
                        value={summary.credit - summary.debt}
                        text='Valor Consolidado' />
                </Row>
            </Content>
        </div>
    )
}