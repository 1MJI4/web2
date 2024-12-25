import "./Footer.css"

interface footer{
    urlLogo:String;
    children:React.ReactNode;
}
const footer=(props:footer)=>{
    return(
        <footer className="footer">
            <img src={props.urlLogo} alt="logo" className="footer"/>
            {props.children}
        </footer>
    )
}
export default footer;