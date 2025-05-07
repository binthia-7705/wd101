const email = document.getElementById("email");
email.addEventListener("input", () => validate(email));

function validate(element) {
  if (element.validity.typeMismatch) {
    element.setCustomValidity("The Email is not the right format!!!");
    element.reportValidity();
  } else {
    element.setCustomValidity("");
  }
}

const dob = document.getElementById("dob");

function validateAge() {
  const dobValue = new Date(dob.value);
  const today = new Date();

  let age = today.getFullYear() - dobValue.getFullYear();
  const monthDiff = today.getMonth() - dobValue.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobValue.getDate())) {
    age--;
  }

  if (age < 18 || age > 55) {
    dob.setCustomValidity("You must be between 18 and 55 years old.");
    dob.reportValidity();
  } else {
    dob.setCustomValidity("");
  }
}
dob.addEventListener("input", validateAge);


const userForm = document.getElementById("user-form");

const retrieveUserEntries = () => {
  let entries = localStorage.getItem("userEntries");
  return entries ? JSON.parse(entries) : [];
};

let userEntries = retrieveUserEntries();

const displayUserEntries = () => {
  const entries = retrieveUserEntries();

  const rows = entries.map((entry) => {
    return `
      <tr>
        <td class="border px-4 py-2">${entry.name}</td>
        <td class="border px-4 py-2">${entry.email}</td>
        <td class="border px-4 py-2">${entry.password}</td>
        <td class="border px-4 py-2">${entry.dob}</td>
        <td class="border px-4 py-2">${entry.acceptedTerms}</td>
      </tr>
    `;
  }).join("");

  const table = `
    <table class="table-auto border-collapse">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Password</th>
          <th class="px-4 py-2">Dob</th>
          <th class="px-4 py-2">Accepted Terms</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>`;

  const details = document.getElementById("userEntries");
  details.innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("acceptTerms").checked;

  const entry = { name, email, password, dob, acceptedTerms };
  userEntries.push(entry);

  localStorage.setItem("userEntries", JSON.stringify(userEntries));
  displayUserEntries();
};

userForm.addEventListener("submit", saveUserForm);
displayUserEntries();
