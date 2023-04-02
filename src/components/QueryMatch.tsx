import { ReturnObject } from "../api/types";

type componentProps = {
    query: []
    querySelection: (data: ReturnObject) => void
}

const QueryMatch = ({ query, querySelection}: componentProps): JSX.Element => (
        <ul>
            {query.map((data: ReturnObject, index: number) => {
                return(
                        <li key={data.name + '-' + index}>
                            <span
                            onClick={ () => {querySelection(data)}}>
                            {data.name}, {data.state}, {data.country}
                            </span>
                        </li>
                        
                )
            })}
        </ul>
)    
export default QueryMatch