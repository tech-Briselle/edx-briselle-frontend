import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
              title="Briselle SignIn Page | AI-Driven EdTech Platform | Briselle - Smart Education Ecosystem"
              description="This is Briselle SignIn Page | Briselle is an AI-powered EdTech platform designed for universities, schools, and institutes, enhancing learning, management, and collaboration with smart automation."
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
