import {
  type Action,
  type IAgentRuntime,
  type Memory,
  type State,
 // composeContext,
  //elizaLogger,
  //ModelClass,
  //generateObject,
  //truncateToCompleteSentence,
} from "@elizaos/core";
export const promptbookAction: Action = {
  name: "RUN_PROMPTBOOK",
  description: "Triggers the execution of a Promptbook file within the ZOS lattice",
  similes:["RUN_PROMPTBOOK", "EXECUTE_BOOK", "ZOS_PROMPT"],
  examples: [],
  validate: async (runtime: IAgentRuntime, message: Memory, state?: State) => {
    const promptbookPattern = /(promptbook|zos|\.book|run book)/i;
    //return promptbookPattern.test(message.text);
    return true
  },

  handler: async (runtime: IAgentRuntime, _message: Memory, state?: State) => {
    //const { bookPath, parameters } = message.memory;
    // Placeholder for Promptbook execution logic
    // In a full setup, this could call wizzard directly or delegate to evaluator
    return {
     // text: `running promptbook at ${bookPath} with params ${JSON.stringify(parameters)} 🌱`,
      action: "RESPOND",
    };
  },
};
