import Modal from "./Modal";
import { useState } from "react";
import MyProComponent from "./MyProComponent";
import { LoanContext } from "./context/InputContext";
import "./MyProjectStyle.css";
export default function MyProject() {
  const [errorMessage, seterrorMessage] = useState(null);

  const [modal, setmodal] = useState(false);
  const [pro, setPro] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    student: false,
    salary: "",
  });

  function submit(event) {
    event.preventDefault();
    seterrorMessage(null);
    const { age, phoneNumber } = pro;
    if (age < 18 || age > 100) {
      seterrorMessage("the age is not allowed");
    } else if (phoneNumber.length < 10 || phoneNumber.length > 12) {
      seterrorMessage("Phone number is INCORRECT");
    }
    setmodal(true);
  }
  let subBtn = pro.name === "" || pro.phoneNumber === "" || pro.age === "";
  let submitBtn = "";
  if (subBtn) {
    submitBtn = "disabled";
  } else {
    submitBtn = "";
  }
  function divClick() {
    if (modal) {
      setmodal(false);
    }
  }
  function handleChangeNameInput(value) {
    setPro({ ...pro, name: value });
  }
  function handleChangephoneNumberInput(value) {
    setPro({ ...pro, phoneNumber: value });
  }
  function handleChangeAgeInput(value) {
    setPro({ ...pro, age: value });
  }

  return (
    <div
      onClick={divClick}
      className="flix"
      style={{ flexDirection: "column" }}
    >
      <form id="Buttonn" style={{ flexDirection: "column" }}>
        <div>
          <h1> Requesting a Loan</h1>
          <hr></hr>

          <LoanContext.Provider
            value={{
              value: pro.name,
              handleChange: handleChangeNameInput,
              labelTitle: "name",
            }}
          >
            <MyProComponent />
          </LoanContext.Provider>
          <LoanContext.Provider
            value={{
              value: pro.phoneNumber,
              handleChange: handleChangephoneNumberInput,
              labelTitle: "Phone Number",
            }}
          >
            <MyProComponent />
          </LoanContext.Provider>
          <LoanContext.Provider
            value={{
              value: pro.age,
              handleChange: handleChangeAgeInput,
              labelTitle: "Age",
            }}
          >
            <MyProComponent />
          </LoanContext.Provider>
          <label>Are you student</label>
          <input
            type="checkbox"
            checked={pro.student}
            onChange={(event) => {
              setPro({ ...pro, student: event.target.checked });
            }}
          />
          <label>Salary</label>
          <select
            value={pro.salary}
            onChange={(event) => {
              setPro({ ...pro, salary: event.target.value });
            }}
          >
            <option>1000</option>
            <option>2000</option>
            <option>3000</option>
          </select>
          <button
            id="submitt"
            onClick={submit}
            disabled={subBtn}
            className={submitBtn}
          >
            Submit
          </button>
        </div>
      </form>
      <Modal errorMessage={errorMessage} isVisible={modal} />
    </div>
  );
}
