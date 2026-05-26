import type { AgentInput, AgentOutput } from "../../common/types/agent.types";

export interface AgentAdapter {
  generate(input: AgentInput): Promise<AgentOutput>;
  stream?(input: AgentInput): AsyncIterable<string>;
}

