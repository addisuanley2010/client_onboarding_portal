import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Registration = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const initialValues = {
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "+251",
    companySize: "",
    industryType: "",
    projectDescription: "",
    expectedTimeline: "",
    budgetRange: "",
    serviceNeeded: "",
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company name is required"),
    contactPerson: Yup.string().required("Contact person name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(
        /^\+251[0-9]{9}$/,
        "Phone number must be a valid Ethiopian number (+251xxxxxxxxx)"
      )
      .required("Phone number is required"),
    companySize: Yup.string().required("Company size is required"),
    industryType: Yup.string().required("Industry type is required"),
    projectDescription: Yup.string()
      .min(50, "Please provide at least 50 characters")
      .required("Project description is required"),
    expectedTimeline: Yup.string().required("Expected timeline is required"),
    budgetRange: Yup.string().required("Budget range is required"),
    serviceNeeded: Yup.string().required("Service needed is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    dispatch({ type: "user/register", values });

  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-12 text-center text-xl font-bold text-orange-500">
          Software Development Project Registration
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Partner with Teamwork Software Company to bring your project to life
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 rounded-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company Name
                    </label>
                    <Field
                      id="companyName"
                      name="companyName"
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="companyName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contactPerson"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Person
                    </label>
                    <Field
                      id="contactPerson"
                      name="contactPerson"
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="contactPerson"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                       Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <Field
                      id="phone"
                      name="phone"
                      type="tel"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="serviceNeeded"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Service Needed
                    </label>
                    <Field
                      as="select"
                      id="serviceNeeded"
                      name="serviceNeeded"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Select service needed</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-development">
                        Mobile Development
                      </option>
                      <option value="ui-ux-design">UI/UX Design</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="serviceNeeded"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="companySize"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company Size
                    </label>
                    <Field
                      as="select"
                      id="companySize"
                      name="companySize"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </Field>
                    <ErrorMessage
                      name="companySize"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="industryType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Industry Type
                    </label>
                    <Field
                      as="select"
                      id="industryType"
                      name="industryType"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="education">Education</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="industryType"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="projectDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Project Description
                  </label>
                  <Field
                    as="textarea"
                    id="projectDescription"
                    name="projectDescription"
                    rows="4"
                    placeholder="Please describe your project requirements, goals, and any specific features you need..."
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="projectDescription"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div>
                    <label
                      htmlFor="expectedTimeline"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expected Timeline
                    </label>
                    <Field
                      as="select"
                      id="expectedTimeline"
                      name="expectedTimeline"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Select timeline</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6-12 months">6-12 months</option>
                      <option value="12+ months">12+ months</option>
                    </Field>
                    <ErrorMessage
                      name="expectedTimeline"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="budgetRange"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Budget Range
                    </label>
                    <Field
                      as="select"
                      id="budgetRange"
                      name="budgetRange"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Select budget range</option>
                      <option value="10000-25000">10,000 - 25,000 birr</option>
                      <option value="25000-50000">25,000 - 50,000 birr</option>
                      <option value="50000-100000">50,000 - 100,000 birr</option>
                      <option value="100000+">100,000+</option>
                    </Field>
                    <ErrorMessage
                      name="budgetRange"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  >
                    {user.loading ? "Processing..." : "Submit Project Request"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already registered?
            <a
              onClick={() => navigate("/login")}
              className="ml-1 font-semibold text-orange-600 hover:text-orange-500 cursor-pointer"
            >
              Sign in to your account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
