import If from "../operator/if";

export default props => (

    <If test={props.visibleTabs.includes(props.id)}>
        <div style={{ display: props.active ? "block" : "none" }}>
            {props.children}
        </div>
    </If>
)