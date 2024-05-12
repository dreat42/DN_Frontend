import { useEffect, useState } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import ResizeHandle from "./ResizeHandle";
import styles from "./styles.module.css";
import axios from "axios";
import Form from "./Component/Form";
import Table from "./Component/Table";
import fakeData from "./fakeData.json";

export default function App() {
  const [formData, setFormData] = useState([fakeData]);
  const [data, setData] = useState({});
  const [count, setCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prevDocId = formData.find((item) => {
      return item.id == data.id;
    });

    console.log(prevDocId);

    if (!prevDocId) {
      setFormData((prev) => [...prev, data]);
      setData({ ...fakeData });

      const response = await axios.post(
        "https://dn-backend-h186.onrender.com/add",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setCount(count + 1);
    }
  };

  const handleUpdateData = async () => {
    const response = await axios.put(
      "https://dn-backend-h186.onrender.com/update",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setFormData((prev) => {
      const newState = [...prev];

      const index = formData.findIndex((item) => {
        return item.id == data.id;
      });

      newState[index] = data;

      return newState;
    });

    setCount(count + 1);
    setData({ ...fakeData });
  };

  const Count = async () => {
    const response = await axios.get(
      "https://dn-backend-h186.onrender.com/count",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("response===>", response);

    setCount(response.data[0].count);
  };

  useEffect(() => {
    Count();
  }, []);

  return (
    <div className={styles.Container}>
      <PanelGroup PanelGroup autoSaveId="example" direction="horizontal">
        <Panel defaultSize={0}></Panel>
        <ResizeHandle />
        <Panel>
          <div>
            <PanelGroup autoSaveId="example" direction="vertical">
              <Panel>
                <div className={styles.BottomRow}>
                  <PanelGroup autoSaveId="example" direction="vertical">
                    <Panel defaultSize={0}></Panel>
                    <ResizeHandle />

                    <Panel
                      className={styles.Panel}
                      collapsible={true}
                      defaultSize={20}
                      order={1}
                    >
                      <PanelGroup direction="horizontal">
                        <Panel className={styles.Panel} defaultSize={30}>
                          <div className={styles.PanelContent_first}>
                            <div className={styles.count}>
                              <div>Count</div>
                              <div>{count}</div>
                            </div>
                          </div>
                        </Panel>
                        <ResizeHandle />
                        <Panel className={styles.Panel} defaultSize={70}>
                          <Form
                            data={data}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            handleUpdateData={handleUpdateData}
                          />
                        </Panel>
                      </PanelGroup>
                    </Panel>

                    <ResizeHandle />
                    <Panel
                      className={styles.Panel}
                      collapsible={true}
                      order={2}
                    >
                      <Table formData={formData} setFormData={setFormData} />
                    </Panel>
                  </PanelGroup>
                </div>
              </Panel>
              <ResizeHandle />
              <Panel defaultSize={0}></Panel>
            </PanelGroup>
          </div>
        </Panel>
        <ResizeHandle />
        <Panel defaultSize={0}></Panel>
      </PanelGroup>
    </div>
  );
}
