import React, { useEffect, useState } from 'react';
import {Create,SimpleForm,TextInput,useTranslate,required,FormTab,SelectInput,minLength,maxLength,number,email,choices,ReferenceInput,AutocompleteInput,TabbedForm,SelectArrayInput,} from "react-admin";

const validateName = [required(), minLength(2), maxLength(15)];
const validateEmail = [required(), email()];
const validateLocation=[required()];
const validatForm = [required()];
const validateGender = choices(['m', 'f'], 'Please choose one of the values');

const UserCreate = (props) => {
  const [departments, setDepartments] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [establishments, setEstablishments] = useState([]);
  const translate = useTranslate();

  useEffect(() => {
    // Fetch departments
    fetch(`http://localhost:8000/department`)
      .then(response => response.json())
      .then(data => setDepartments(data))
      .catch(error => console.error('Error fetching departments', error));

    // Fetch districts
    fetch(`http://localhost:8000/district`)
      .then(response => response.json())
      .then(data => setDistricts(data))
      .catch(error => console.error('Error fetching districts', error));

    // Fetch establishments
    fetch(`http://localhost:8000/establishment`)
      .then(response => response.json())
      .then(data => setEstablishments(data))
      .catch(error => console.error('Error fetching establishments', error));
  }, []);

    return (
      <Create title={translate("ra.custom.create")} {...props}>
        <TabbedForm>
          <FormTab label={translate("ra.custom.userDetails")}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <TextInput
                      source="given_name"
                      label={translate("ra.resources.users.fields.firstName")}
                      validate={validateName}
                    />
                  </td>
                  <td>
                    <TextInput
                      source="family_name"
                      label={translate("ra.resources.users.fields.lastName")}
                      validate={validateName}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <TextInput
                      source="username"
                      label={translate("ra.resources.users.fields.username")}
                      validate={validateName}
                    />
                  </td>
                  <td>
                    <SelectInput
                      label={translate("ra.resources.users.fields.sex")}
                      source="sex"
                      choices={[
                        { id: "m", name: "Male" },
                        { id: "f", name: "Female" },
                      ]}
                      validate={validateGender}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <TextInput
                      source="email"
                      label={translate("ra.resources.users.fields.email")}
                      validate={validateEmail}
                    />
                  </td>
                  <td>
                    <TextInput
                      source="cell"
                      label={translate("ra.resources.users.fields.cell")}
                      validate={validatForm}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <ReferenceInput
                      source="nomdpto"
                      reference="departments"
                      validate={validateLocation}
                    >
                      <AutocompleteInput
                        label={translate(
                          "ra.resources.users.fields.department"
                        )}
                        optionText="nomdpto"
                        optionValue="nomdpto"
                      />
                    </ReferenceInput>
                  </td>
                  <td>
                    <ReferenceInput
                      source="nomdist"
                      reference="districts"
                      validate={validateLocation}
                    >
                      <AutocompleteInput
                        label={translate("ra.resources.users.fields.district")}
                        optionText="nomdist"
                        optionValue="nomdist"
                      />
                    </ReferenceInput>
                  </td>
                </tr>
                <tr>
                  <td>
                    <ReferenceInput
                      source="nomserv"
                      reference="establishments"
                      validate={validateLocation}
                    >
                      <AutocompleteInput
                        label={translate(
                          "ra.resources.users.fields.establishment"
                        )}
                        optionText="nomserv"
                        optionValue="nomserv"
                      />
                    </ReferenceInput>
                  </td>
                  <td>
                    <SelectArrayInput
                      label={translate(
                        "ra.resources.users.fields.formsAssignedTo"
                      )}
                      source="form_assigned_to"
                      choices={[
                        { id: "1", name: "Signal Detection" },
                        { id: "2", name: "Triage" },
                        { id: "3", name: "Verification" },
                        { id: "4", name: "Risk Assessment" },
                      ]}
                      optionValue="name"
                      validate={validatForm}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </FormTab>
        </TabbedForm>
      </Create>
    );
}

export default UserCreate;
