import React from "react";
import "./Rules.css";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const Rules = props => {
    return (
        <div className="rules">
            <FontAwesomeIcon
                icon="times"
                className="rules-close"
                onClick={props.rulesHandler}
            />
            <h2>Rules of deckit</h2>
            <label className="rules-credits">
                Game based on amazing card game{" "}
                <a href="http://en.libellud.com/games/dixit">Dixit</a> by
                Jean-Louis Roubira
            </label>
            <p>
                One player is the storyteller for the turn and looks at the
                images on the 5 cards in her hand. From one of these, she makes
                up a sentence, click on the card and type it at the top of the
                page. Each other player selects the card in their hands which
                best matches the sentence and clicks the card, without saying
                the content to the others.{" "}
            </p>
            <p>
                After all of the players successfully picks, cards are being
                shuffled.{" "}
            </p>
            <p>
                All pictures are shown face up and every player has to bet upon
                which picture was the storyteller's.{" "}
            </p>
            <p>
                If nobody or everybody finds the correct card, the storyteller
                scores 0, and each of the other players scores 2.{" "}
            </p>
            <p>
                Otherwise the storyteller and whoever found the correct answer
                score 3.{" "}
            </p>
            <p>Players score 1 point for every vote for their own card. </p>
            <p>
                The game ends when the deck is empty or if a player scores
                maximum points. In either case, the player with the most points
                wins the game.
            </p>
            <p>Good luck!</p>
        </div>
    );
};

export default Rules;
