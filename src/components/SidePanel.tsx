import React, { useState } from "react";
import {BiHomeAlt2} from "react-icons/bi"
import {MdInsertChartOutlined} from "react-icons/md"
import {RiStockLine} from "react-icons/ri"
import {HiShare} from "react-icons/hi"
import {BiArrowBack} from "react-icons/bi"
import {VscGlobe} from "react-icons/vsc"
import {BiToggleRight} from "react-icons/bi"
import { useAppDispatch } from "@/redux/hooks";
import { loadTaskList } from "@/redux/features/taskList/taskListSlice";


export default function SidePanel(){
    const [pageNo,setPageNo] = useState<number>(5);
    const dispatch=useAppDispatch()
    return (
        <div className="sidePanel">
            <div className="topPart">
                <div className="profile">  
                    <div className="profile-details">
                        <div className="profile-logo"><p>N</p></div>
                        <p className="profile-name">Name</p>
                    </div>
                    <BiArrowBack
                        onClick={()=>dispatch(loadTaskList([]))}
                    />
                </div>
                <button 
                    className={`topPart-button ${pageNo == 1 ?"selected":"notSel"}`}
                    onClick={()=>setPageNo(1)}>
                    <BiHomeAlt2/>
                    <p>Home</p>
                </button>
                <button
                    className={`topPart-button ${pageNo == 2 ?"selected":"notSel"}`}
                    onClick={()=>setPageNo(2)}>
                    <MdInsertChartOutlined/>
                    <p>Section 1</p>
                </button>
                <button
                    className={`topPart-button ${pageNo == 3 ?"selected":"notSel"}`}
                    onClick={()=>setPageNo(3)}>
                    <RiStockLine/>
                    <p>Section 2</p>
                </button>
                <button
                    className={`topPart-button ${pageNo == 4 ?"selected":"notSel"}`}
                    onClick={()=>setPageNo(4)}>
                    <HiShare/>
                    <p>Section 8</p>
                </button>
                <button
                    className={`topPart-button ${pageNo == 5 ?"selected":"notSel"}`}
                    onClick={()=>setPageNo(5)}>
                    <HiShare/>
                    <p>Section 8</p>
                </button>
            </div>
            <div className="bottomPart">
                <div className="bottomPart-button">
                    <button className="bottomPart-button-logo">
                        <div><span>N</span></div>
                        <p>$0.90</p>
                    </button>
                    <button className="bottomPart-button-buy">
                        <p>Buy $XYZ</p>
                    </button>
                </div>
                <div className="bottomPart-logo">
                    <VscGlobe/>
                    <BiToggleRight/>
                </div>
            </div>
        </div>
    )

}