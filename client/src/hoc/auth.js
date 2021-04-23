import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function Auth(SpecificComponent, option, adminRoute = null) {
	function AuthenticationCheck(props) {
		const dispatch = useDispatch();

		useEffect(() => {
			dispatch(auth()).then((response) => {
				if (!response.payload.isAuth) {
					//not logged in
					if (option) {
						props.history.push("/login");
					}
				} else {
					//logged in status
					if (adminRoute && !response.payload.isAdmin) {
						//trying to get in admin route, but not admin
						props.history.push("/");
					} else {
						if (option === false) {
							props.history.push("/");
						}
					}
				}
			});
		}, []);
		return <SpecificComponent />;
	}

	return AuthenticationCheck;
}
