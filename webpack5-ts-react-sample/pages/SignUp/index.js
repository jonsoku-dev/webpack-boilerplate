import React, { useCallback, useState } from 'react';
import { Button, Error, Form, Header, Input, Label, LinkContainer, Success } from '@pages/SignUp/style';
import useInput from '@hooks/useInput';
var SignUp = function () {
    var _a = useState(false), signUpError = _a[0], setSignUpError = _a[1];
    var _b = useState(false), signUpSuccess = _b[0], setSignUpSuccess = _b[1];
    var _c = useState(false), mismatchError = _c[0], setMismatchError = _c[1];
    var _d = useInput(''), email = _d[0], onChangeEmail = _d[1];
    var _e = useInput(''), nickname = _e[0], onChangeNickname = _e[1];
    var _f = useInput(''), password = _f[0], setPassword = _f[2];
    var _g = useInput(''), passwordCheck = _g[0], setPasswordCheck = _g[2];
    var onChangePassword = useCallback(function (e) {
        setPassword(e.target.value);
        setMismatchError(passwordCheck !== e.target.value);
    }, [passwordCheck]);
    var onChangePasswordCheck = useCallback(function (e) {
        setPasswordCheck(e.target.value);
        setMismatchError(password !== e.target.value);
    }, [password]);
    var onSubmit = useCallback(function (e) {
        e.preventDefault();
        if (!nickname || !nickname.trim()) {
            return;
        }
        if (!mismatchError) {
            setSignUpError(false);
            setSignUpSuccess(false);
            // axios
            //   .post('/api/users', { email, nickname, password })
            //   .then(() => {
            //     setSignUpSuccess(true);
            //   })
            //   .catch((error) => {
            //     setSignUpError(error.response?.data?.statusCode === 403);
            //   });
        }
    }, [email, nickname, password, mismatchError]);
    // if (userData) {
    //   return <Redirect to="/workspace/sleact" />;
    // }
    return (React.createElement("div", { id: "container" },
        React.createElement(Header, null, "Sleact"),
        React.createElement(Form, { onSubmit: onSubmit },
            React.createElement(Label, { id: "email-label" },
                React.createElement("span", null, "\uC774\uBA54\uC77C \uC8FC\uC18C"),
                React.createElement("div", null,
                    React.createElement(Input, { type: "email", id: "email", name: "email", value: email, onChange: onChangeEmail }))),
            React.createElement(Label, { id: "nickname-label" },
                React.createElement("span", null, "\uB2C9\uB124\uC784"),
                React.createElement("div", null,
                    React.createElement(Input, { type: "text", id: "nickname", name: "nickname", value: nickname, onChange: onChangeNickname }))),
            React.createElement(Label, { id: "password-label" },
                React.createElement("span", null, "\uBE44\uBC00\uBC88\uD638"),
                React.createElement("div", null,
                    React.createElement(Input, { type: "password", id: "password", name: "password", value: password, onChange: onChangePassword }))),
            React.createElement(Label, { id: "password-check-label" },
                React.createElement("span", null, "\uBE44\uBC00\uBC88\uD638 \uD655\uC778"),
                React.createElement("div", null,
                    React.createElement(Input, { type: "password", id: "password-check", name: "password-check", value: passwordCheck, onChange: onChangePasswordCheck })),
                mismatchError && React.createElement(Error, null, "\uBE44\uBC00\uBC88\uD638\uAC00 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."),
                !nickname && React.createElement(Error, null, "\uB2C9\uB124\uC784\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694."),
                signUpError && React.createElement(Error, null, "\uC774\uBBF8 \uAC00\uC785\uB41C \uC774\uBA54\uC77C\uC785\uB2C8\uB2E4."),
                signUpSuccess && React.createElement(Success, null, "\uD68C\uC6D0\uAC00\uC785\uB418\uC5C8\uC2B5\uB2C8\uB2E4! \uB85C\uADF8\uC778\uD574\uC8FC\uC138\uC694.")),
            React.createElement(Button, { type: "submit" }, "\uD68C\uC6D0\uAC00\uC785")),
        React.createElement(LinkContainer, null,
            "\uC774\uBBF8 \uD68C\uC6D0\uC774\uC2E0\uAC00\uC694?\u00A0",
            React.createElement("a", { href: "/login" }, "\uB85C\uADF8\uC778 \uD558\uB7EC\uAC00\uAE30"))));
};
export default SignUp;
//# sourceMappingURL=index.js.map