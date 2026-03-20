import { useState } from "react";
import { Badge, Button, Card, InputBar, SegmentedControl, Tab } from "../components/ui";

export function ExampleDashboard() {
  const [tab, setTab] = useState("home");
  const [segment, setSegment] = useState("student");

  return (
    <main>
      <nav>
        <Tab active={tab === "home"} onClick={() => setTab("home")}>ホーム</Tab>
        <Tab active={tab === "tasks"} onClick={() => setTab("tasks")}>タスク</Tab>
      </nav>

      <SegmentedControl
        selected={segment}
        onChange={setSegment}
        items={[
          { id: "student", label: "生徒" },
          { id: "teacher", label: "先生" },
        ]}
      />

      <Card>
        <h2>進路希望調査</h2>
        <p>提出期限: 1月15日</p>
        <Badge variant="warning">未提出</Badge>
        <Button variant="primary">提出する</Button>
        <Button variant="secondary">詳細を見る</Button>
      </Card>

      <InputBar />
    </main>
  );
}
