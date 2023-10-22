import React from "react"
import { useNavigate } from "react-router-dom"
import "./LandingP.css"

export default function LandingP () {
const navigate = useNavigate()

const goHome = () => {
    navigate("/home")
}
return (
    <div className='landingP'>
    <div className="gifLP"></div>
<button onClick={() => goHome()} className="Homebtn">
<span className="shadow"></span>
      <span className="edge"></span>
      <span className="front">
        Start
      </span>
      </button>
<button className="loginbtnLP">
<span className="shadow"></span>
      <span className="edge"></span>
      <span className="front">
        Login
      </span>
</button>
</div>
)
}