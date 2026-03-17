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
import { useCreateBillingCycleMutation, useUpdateBillingCycleMutation } from "./billingCycleApi";

export default () => {

    const [activeTab, setActiveTab] = useState('tabList')
    const [visibleTabs, setVisibleTabs] = useState(["tabList", "tabCreate"])
    const [successMessage, setSuccessMessage] = useState(null);

    const isActive = (tab) => activeTab === tab

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
                            <BillingCycleList />
                            
                        </TabContent>

                        <TabContent
                            id="tabCreate"
                            active={isActive("tabCreate")}
                            visibleTabs={visibleTabs}>

                            <BillingCycleForm
                                useMutationHook={useCreateBillingCycleMutation}
                                onSuccess={() => {
                                    setSuccessMessage("Ciclo de pagamento salvo com sucesso!");
                                    setActiveTab("tabList");
                                    setTimeout(() => setSuccessMessage(null), 3000);
                                }} />

                        </TabContent>

                        <TabContent
                            id="tabUpdate"
                            active={isActive("tabUpdate")}
                            visibleTabs={visibleTabs} >
                            <BillingCycleForm useMutationHook={useUpdateBillingCycleMutation} />
                        </TabContent>

                        <TabContent
                            id="tabDelete"
                            active={isActive("tabDelete")}
                            visibleTabs={visibleTabs} >
                            Confirmação de exclusão...
                        </TabContent>

                    </Tabs>
                </Row>
            </Content>
        </div>
    )
}