"use client";
import DeleteForm from "@/components/Form/DeleteForm";
import FormatedCode from "@/components/Form/FormatedCode";
import InsertForm from "@/components/Form/InsertForm";
import SelectForm from "@/components/Form/SelectForm";
import UpdateForm from "@/components/Form/UpdateForm";
import { Card, CardBody, Select, SelectItem, Tab, Tabs } from "@heroui/react";
import { useState } from "react";

const queries = [
  { key: "Insert", label: "Insert" },
  { key: "Select", label: "Select" },
  { key: "Delete", label: "Delete" },
  { key: "Update", label: "Update" },
];

export default function Home() {
  const [selectedQuery, setSelectedQuery] = useState<string>("Insert");

  const renderForm = () => {
    switch (selectedQuery) {
      case "Insert":
        return <InsertForm />;
      case "Select":
        return <SelectForm />;
      case "Delete":
        return <DeleteForm />;
      case "Update":
        return <UpdateForm />;
      default:
        return <p>Please select a query type.</p>;
    }
  };
  const tabs = [
    {
      id: "FormatedCode",
      label: "Formated Code",
      content: <FormatedCode />,
    },
    {
      id: "FormatedSQL",
      label: "FormatedSQL",
      content: (
        <div className="flex flex-col gap-[20px]">
          <h2 className="text-[20px] font-bold">Format string SQL</h2>
          <Select
            className="my-[20px]"
            label="Select query"
            placeholder="Select query"
            defaultSelectedKeys={["Insert"]}
            onChange={(event) => setSelectedQuery(event.target.value)}
          >
            {queries.map((query) => (
              <SelectItem key={query.key} value={query.key}>
                {query.label}
              </SelectItem>
            ))}
          </Select>

          {renderForm()}
        </div>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-[100vh]">
      <section className="w-[800px] bg-[#3d3d3d] p-[20px] rounded-[10px] flex flex-col gap-[20px]  min-h-[90vh]">
        <Tabs aria-label="Dynamic tabs" items={tabs}>
          {(item) => (
            <Tab key={item.id} title={item.label}>
              <Card>
                <CardBody>{item.content}</CardBody>
              </Card>
            </Tab>
          )}
        </Tabs>
      </section>
    </div>
  );
}
