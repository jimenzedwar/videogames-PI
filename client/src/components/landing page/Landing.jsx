import React from "react"
import { useNavigate } from "react-router-dom"

export default function LandingP () {
const navigate = useNavigate()
const goHome = () => {
    navigate("/home")
}
return (
    <div className="Homebtn">
<button onClick={() => goHome()}
>home</button>
</div>
)
}