import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import If from "../operator/if";

export default props => (

    <li className="nav-item">
        <If test={props.visibleTabs.includes(props.target)}>
            <button
                className={`nav-link d-flex align-items-center gap-2 px-3 py-2 fw-semibold 
                ${props.active ? "active" : "text-secondary"}`}
                onClick={() => props.onClick(props.target)}
                type="button">

                <FontAwesomeIcon icon={props.icon} />
                {props.label}
            </button >
        </If>
    </li>
)