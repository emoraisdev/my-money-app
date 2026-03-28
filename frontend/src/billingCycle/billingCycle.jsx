import { faBars, faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import TabHeader from "../common/tab/tabHeader";
import Tabs from "../common/tab/tabs";
import TabsHeaders from "../common/tab/tabsHeaders";
import Content from "../common/template/content";
import ContentHeader from "../common/template/contentHeader";
import Row from "../common/template/row";
import { useState } from "react";
import TabContent from "../common/tab/tabContent";
import BillingCycleList from "./billingCycleList";
import BillingCycleForm from "./billingCycleForm";
import {
    useCreateBillingCycleMutation, useUpdateBillingCycleMutation,
    useDeleteBillingCycleMutation
} from "./billingCycleApi";

export default () => {

    const [activeTab, setActiveTab] = useState('tabList')
    const [visibleTabs, setVisibleTabs] = useState(["tabList", "tabCreate"])
    const [successMessage, setSuccessMessage] = useState(null);
    const [activeItem, setActiveItem] = useState(null);

    const isActive = (tab) => activeTab === tab

    function edit(item) {

        setActiveItem(item)
        setActiveTab("tabUpdate")
        setVisibleTabs(["tabUpdate"])
    }

    function remove(item) {

        setActiveItem(item)
        setActiveTab("tabDelete")
        setVisibleTabs(["tabDelete"])
    }

    function setAfterOperation(message) {
        setSuccessMessage(message);
        setDefaultLayout()
        setTimeout(() => setSuccessMessage(null), 4000);
    }

    function setDefaultLayout() {
        setActiveTab("tabList")
        setVisibleTabs(["tabList", "tabCreate"])
    }

    return (
        <div>
            <ContentHeader title='Ciclos de Pagamentos' small='Versão 1.0' />
            <Content>

                <Row>
                    <Tabs>
                        <TabsHeaders>
                            <TabHeader
                                label="Listar"
                                icon={faBars}
                                target='tabList'
                                onClick={setActiveTab}
                                active={isActive("tabList")}
                                visibleTabs={visibleTabs} />

                            <TabHeader
                                label="Incluir"
                                icon={faPlus}
                                target='tabCreate'
                                onClick={setActiveTab}
                                active={isActive("tabCreate")}
                                visibleTabs={visibleTabs} />

                            <TabHeader
                                label="Alterar"
                                icon={faPencil}
                                target='tabUpdate'
                                onClick={setActiveTab}
                                active={isActive("tabUpdate")}
                                visibleTabs={visibleTabs} />

                            <TabHeader
                                label="Excluir"
                                icon={faTrash}
                                target='tabDelete'
                                onClick={setActiveTab}
                                active={isActive("tabDelete")}
                                visibleTabs={visibleTabs} />

                        </TabsHeaders>


                        <TabContent
                            id="tabList"
                            active={isActive("tabList")}
                            visibleTabs={visibleTabs} >

                            {successMessage && (
                                <div className="alert alert-success mt-3">
                                    {successMessage}
                                </div>
                            )}

                            <BillingCycleList edit={edit} remove={remove} />

                        </TabContent>

                        <TabContent
                            id="tabCreate"
                            active={isActive("tabCreate")}
                            visibleTabs={visibleTabs}>

                            <BillingCycleForm
                                useMutationHook={useCreateBillingCycleMutation}
                                onSuccess={() => {
                                    setAfterOperation("Ciclo de pagamento salvo com sucesso!")
                                }}
                                onCancel={() => setDefaultLayout()} />

                        </TabContent>

                        <TabContent
                            id="tabUpdate"
                            active={isActive("tabUpdate")}
                            visibleTabs={visibleTabs} >

                            <BillingCycleForm
                                useMutationHook={useUpdateBillingCycleMutation}
                                item={activeItem}
                                onSuccess={() => {
                                    setAfterOperation("Ciclo de pagamento alterado com sucesso!")
                                }}
                                onCancel={() => setDefaultLayout()} />

                        </TabContent>

                        <TabContent
                            id="tabDelete"
                            active={isActive("tabDelete")}
                            visibleTabs={visibleTabs} >

                            <BillingCycleForm
                                useMutationHook={useDeleteBillingCycleMutation}
                                item={activeItem}
                                onSuccess={() => {
                                    setAfterOperation("Ciclo de pagamento removido com sucesso!")
                                }}
                                onCancel={() => setDefaultLayout()}
                                deleteMode={true} />

                        </TabContent>

                    </Tabs>
                </Row>
            </Content>
        </div>
    )
}