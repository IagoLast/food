import React, { FunctionComponent } from 'react';
import './Nutriscore.css';

interface INutriscoreProps {
    letter: 'a' | 'b' | 'c' | 'd' | 'e';
}

const Nutriscore: FunctionComponent<INutriscoreProps> = ({ letter }) => {
    return (
        <div className="Nutriscore">
            <span>NUTRI-SCORE</span>
            <ul>
                <li className={letter === 'a' ? 'a active' : 'a'}>A</li>
                <li className={letter === 'b' ? 'b active' : 'b'}>B</li>
                <li className={letter === 'c' ? 'c active' : 'c'}>C</li>
                <li className={letter === 'd' ? 'd active' : 'd'}>D</li>
                <li className={letter === 'e' ? 'e active' : 'e'}>E</li>
            </ul>
        </div>
    );
}


export default Nutriscore;