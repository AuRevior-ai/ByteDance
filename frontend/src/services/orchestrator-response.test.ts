import { describe, expect, it } from "vitest";
import { mapOrchestratorRunToWorkspaceUpdates } from "./orchestrator-response";

describe("mapOrchestratorRunToWorkspaceUpdates", () => {
  it("turns orchestrator outputs into agent messages, active artifact, and trace steps", () => {
    const updates = mapOrchestratorRunToWorkspaceUpdates(
      {
        plan: {
          conversationId: "demo-conversation",
          task: "生成作品集网页",
          mode: "sequential",
          steps: [
            { order: 1, agentId: "pm", objective: "澄清需求" },
            { order: 2, agentId: "frontend", objective: "生成可预览 Artifact" },
          ],
        },
        outputs: [
          {
            step: { order: 1, agentId: "pm", objective: "澄清需求" },
            output: {
              agentId: "pm",
              content: "页面结构建议为 Hero、项目精选、技能矩阵、联系 CTA。",
            },
          },
          {
            step: { order: 2, agentId: "frontend", objective: "生成可预览 Artifact" },
            output: {
              agentId: "frontend",
              content: "已生成 HTML Artifact。",
              artifacts: [
                {
                  type: "html",
                  title: "portfolio.html",
                  content: "<main><h1>AI Portfolio</h1></main>",
                },
              ],
            },
          },
        ],
        summary: "Mock Orchestrator 已完成顺序调度。",
      },
      {
        conversationId: "demo-conversation",
        timestamp: "20:31",
      },
    );

    expect(updates.messages).toHaveLength(3);
    expect(updates.messages.map((message) => message.agentId)).toEqual(["pm", "frontend", "orchestrator"]);
    expect(updates.messages[1].artifacts?.[0]).toMatchObject({
      id: "demo-conversation-frontend-2-0",
      title: "portfolio.html",
      type: "html",
      currentVersion: 1,
    });
    expect(updates.activeArtifact?.content).toContain("AI Portfolio");
    expect(updates.trace).toMatchObject({
      conversationId: "demo-conversation",
      task: "生成作品集网页",
      status: "success",
    });
    expect(updates.trace.steps.map((step) => step.title)).toEqual(["澄清需求", "生成可预览 Artifact"]);
  });
});

