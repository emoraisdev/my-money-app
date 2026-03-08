import { faBank } from "@fortawesome/free-solid-svg-icons";
import Content from "../common/template/content";
import ContentHeader from "../common/template/contentHeader";
import ValueBox from "../common/widget/valueBox";
import Row from "../common/template/row";

export default () => {



    return (
        <div>
            <ContentHeader title='Dashboard' small='Versão 1.0' />
            <Content>
                <Row>
                    <ValueBox
                        cols='12 4'
                        color='success'
                        icon={faBank}
                        value='10'
                        text='Total de Créditos' />
                    <ValueBox
                        cols='12 4'
                        color='danger'
                        icon={faBank}
                        value='10'
                        text='Total de Créditos' />
                    <ValueBox
                        cols='12 4'
                        color='primary'
                        icon={faBank}
                        value='0'
                        text='Valor Consolidado' />
                </Row>
            </Content>
        </div>
    )
}