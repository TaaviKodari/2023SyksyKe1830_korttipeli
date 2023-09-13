
export default function Card({card}){
    return(
        <div className="card">
            <img src = {card.image}/>
            <ul className="stat-list">
                <li className="stat-list-item">
                    <span>{card.stats[0].name}</span>
                    <span>{card.stats[0].value}</span>
                </li>
                <li>
                    <span>Weight</span>
                    <span>19</span>
                </li>
                <li>
                    <span>Speed</span>
                    <span>30</span>
                </li>
            </ul>
            
        </div>
    );
}