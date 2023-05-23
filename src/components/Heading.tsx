import React from "react";
import {CiWallet} from "react-icons/ci"

export default function Heading(){
    return(
        <div className="selHeading">
            <div className="headingSection">
                <p>Section</p>
            </div>
            <div className="headingWallet">
                <CiWallet/>
                <p>0.2 $XYZ</p>
                <button>Tier 1</button>
            </div>
        </div>
    )
}