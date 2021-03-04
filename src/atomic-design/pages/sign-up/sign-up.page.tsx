import React from "react";

import { AuthorizationTemplate } from '../templates'
import { SignUpForm } from '../../organisms';


const SignUpPage = () => (
    <AuthorizationTemplate>
      <SignUpForm />
    </AuthorizationTemplate>
);

export { SignUpPage };
