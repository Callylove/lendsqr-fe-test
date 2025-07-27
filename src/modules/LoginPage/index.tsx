"use client";
import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import Image from "next/image";
import styles from "../../styles/LoginPage.module.scss";
import { FormikInput } from "@/components";
import { Button } from "@/components/Button";
import { handleForgotPassword, initialValues, validate } from "./utils";
import { useRouter } from "next/navigation";
import { LoginFormValues } from "./types";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (
    values: LoginFormValues,
    formikHelpers: FormikHelpers<LoginFormValues>,
  ): Promise<void> => {
    const { setSubmitting } = formikHelpers;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Navigate to dashboard
      router.push("/users");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className={styles.loginContainer}>
      {/* Left Side - Illustration */}
      <div className={styles.leftSide}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.svg"
            alt="Lendsqr Logo"
            width={174}
            height={36}
            priority
          />
        </div>

        <div className={styles.illustrationContainer}>
          <Image
            src="/login-image.png"
            alt="Login Illustration"
            width={600}
            height={400}
            priority
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          <div className={styles.welcomeSection}>
            <h1 className={styles.welcomeTitle}>Welcome!</h1>
            <p className={styles.welcomeSubtitle}>Enter details to login.</p>
          </div>

          <Formik
            initialValues={initialValues}
            validate={validate}
            validateOnChange={true}
            validateOnFocus={true}
            validateOnBlur={true}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={styles.loginForm}>
                <FormikInput
                  name="email"
                  type="email"
                  placeholder="Email"
                  containerClassName={styles.inputGroup}
                />

                <FormikInput
                  name="password"
                  type="password"
                  placeholder="Password"
                  showPassword={true}
                  containerClassName={styles.inputGroup}
                />

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className={styles.forgotPasswordLink}
                >
                  FORGOT PASSWORD?
                </button>

                <div className={styles.submitButtonContainer}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    loadingText="Logging in..."
                    className={styles.loginButton}
                  >
                    LOG IN
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
