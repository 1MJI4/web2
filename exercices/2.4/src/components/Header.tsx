import "./Header.css"

interface header{
    urlLogo:String;
    children:React.ReactNode;
}
const header=(props:header)=>{
    return(
        <header className="header">
            <img src={props.urlLogo} alt="logo" className="logo"/>
            <div>{props.children}</div>
        </header>
    )
}
export default header;