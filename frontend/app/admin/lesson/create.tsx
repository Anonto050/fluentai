import {
  Create,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const LessonCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title" />
        <NumberInput source="order" validate={required()} label="Order" />
        <ReferenceInput source="unitId" reference="units" />
        
      </SimpleForm>
    </Create>
  );
};
