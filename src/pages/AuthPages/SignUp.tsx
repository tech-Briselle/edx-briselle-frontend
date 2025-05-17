import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
              title="Briselle Signup Pages | AI-Driven EdTech Platform | Briselle - Smart Education Ecosystem"
              description="This is Briselle Signup Pages | Briselle is an AI-powered EdTech platform designed for universities, schools, and institutes, enhancing learning, management, and collaboration with smart automation."
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
