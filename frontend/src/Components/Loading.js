import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
const Loading = () => {

    return (
        <div className="container center-loading">
            <Loader type={"Oval"} color={"red"} />
        </div>
    )
}

export default Loading;