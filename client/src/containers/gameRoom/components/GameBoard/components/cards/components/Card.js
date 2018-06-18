import React from "react";
import "./Card.css";

const Card = props => {
    let cardContainerClasses = ["card"];
    let cardClasses = ["card-img-container"];
    let reassureElement = null;
    if (props.selected) {
        cardContainerClasses.push("selected");
    }
    if (props.reassure === props.data.id) {
        cardClasses.push("card-reassure");
        reassureElement = (
            <button onClick={() => props.onReassureHandler(props.data)}>
                Are you sure? There is no turn back!
            </button>
        );
    }

    let cardProps = {};
    if (props.onClickedHandler) {
        cardProps = {
            onClick: () => props.onClickedHandler(props.data.id)
        };
    }
    let cardImgStyle = {
        "background-image": `url(${props.data.img})`
    };
    return (
        <div
            className={cardContainerClasses.join(" ")}
            id={props.data.id}
            {...cardProps}>
            {reassureElement}
            <div className={cardClasses.join(" ")}>
                <div className="card-img" style={cardImgStyle} />
            </div>
        </div>
    );
};

export default Card;
