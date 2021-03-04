import React from "react";

import { AuthorizationTemplate } from '../templates'
import { SignInForm } from '../../organisms';


const SignInPage = () => (
    <AuthorizationTemplate>
        <SignInForm />
    </AuthorizationTemplate>
);

export { SignInPage };
