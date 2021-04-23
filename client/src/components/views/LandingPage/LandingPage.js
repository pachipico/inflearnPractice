import axios from "axios";
import { withRouter } from "react-router-dom";

function LandingPage(props) {
	const onclickHandler = () => {
		axios.get("/api/users/logout").then((response) => {
			console.log("response", response);
			if (response.data.success) {
				props.history.push("/login");
			} else {
				alert("logout fail");
			}
		});
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "100vh",
			}}
		>
			<h2>Starting Page</h2>
			<button onClick={onclickHandler}> log out</button>
		</div>
	);
}

export default withRouter(LandingPage);
