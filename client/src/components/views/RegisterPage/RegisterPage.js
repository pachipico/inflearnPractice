import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

function RegisterPage(props) {
	const dispatch = useDispatch();

	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const [Name, setName] = useState("");
	const [ConfirmPassword, setConfirmPassword] = useState("");

	const onEmailHandler = (e) => {
		setEmail(e.currentTarget.value);
	};

	const onPasswordHandler = (e) => {
		setPassword(e.currentTarget.value);
	};
	const onNameHandler = (e) => {
		setName(e.currentTarget.value);
	};
	const onConfirmPasswordHandler = (e) => {
		setConfirmPassword(e.currentTarget.value);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();

		if (Password !== ConfirmPassword) {
			return alert("Password doesn't match");
		}

		let body = {
			email: Email,
			password: Password,
		};

		dispatch(registerUser(body)).then((response) => {
			if (response.payload.success) {
				props.history.push("/login");
			} else {
				alert("Failed to sign up");
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
			<form
				onSubmit={onSubmitHandler}
				style={{ display: "flex", flexDirection: "column" }}
			>
				<label>Email</label>
				<input type='email' value={Email} onChange={onEmailHandler} />

				<label>Name</label>
				<input type='text' value={Name} onChange={onNameHandler} />

				<label>Password</label>
				<input type='password' value={Password} onChange={onPasswordHandler} />

				<label>Confirm Password</label>
				<input
					type='password'
					value={ConfirmPassword}
					onChange={onConfirmPasswordHandler}
				/>

				<br />
				<button type='submit'>Register</button>
			</form>
		</div>
	);
}

export default withRouter(RegisterPage);
