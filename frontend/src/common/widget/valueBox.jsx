import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Grid from "../template/grid";

export default props => (

    <Grid cols={props.cols}>
        <div className={`card text-bg-${props.color}`}>
            <div className="card-body d-flex justify-content-between align-items-center">
                
                <div>
                    <h3 className="card-title">R$ {props.value}</h3>
                    <p className="card-text">{props.text}</p>
                </div>

                <FontAwesomeIcon icon={props.icon} size="3x" />

            </div>
        </div>
    </Grid>
)