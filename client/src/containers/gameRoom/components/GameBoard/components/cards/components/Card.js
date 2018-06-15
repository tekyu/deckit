import React from 'react';
import './Card.css';

const Card = (props) => {

        let cardClasses = ['card-img-container'];
        let reassureElement = null;
        if (props.reassure === props.data.id) {
            cardClasses.push('card-reassure');
            reassureElement = (
                <button onClick={()=>props.onReassureHandler(props.data)}>Are you sure? There is no turn back!</button>
            );
        }
    
        let cardProps = {};
        if (props.onClickedHandler) {
            cardProps = {
                onClick:()=>props.onClickedHandler(props.data.id)
            }
        }

    return (
        <div className="card" id={props.data.id} {...cardProps}>
            {reassureElement}
            <div className={cardClasses}>
                <img className="card-img" src={props.data.img} alt={props.data.title}/>
            </div>
        </div>
    );
};

export default Card;