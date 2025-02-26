import { Evaluator } from "@ai16z/eliza";
import { wizzard } from '@promptbook/wizzard';

export const promptbookEvaluator: Evaluator = {
  name: "EXECUTE_PROMPTBOOK",
  similes: ["RUN_PROMPTBOOK", "EXECUTE_BOOK", "ZOS_PROMPT"],
  alwaysRun: false,
  description: "Executes a Promptbook (.book) file within the ZOS lattice, weaving prompts into the emergent language",
  validate: async (runtime, message) => {
    const promptbookPattern = /(promptbook|zos|\.book|run book)/i;
    return promptbookPattern.test(message.content.text);
  },
  handler: async (runtime, message) => {
    const text = message.content.text.toLowerCase();
    const bookMatch = text.match(/run (?:promptbook|book) ([\w\/\-\.]+)/);
    const paramMatch = text.match(/\{(.+?)\}/);

    if (!bookMatch) {
      return {
        isValid: false,
        output: "no promptbook path—say 'run book ./books/hello.book'",
      };
    }

    const bookPath = bookMatch[1];
    let parameters = {};
    if (paramMatch) {
      try {
        parameters = JSON.parse(paramMatch[0]);
      } catch (e) {
        return {
          isValid: false,
          output: "bad params—use json like {yourName: 'Paul'}",
        };
      }
    }

    try {
      const result = await wizzard.execute(bookPath, parameters);
      const { outputParameters } = result;
      return {
        isValid: true,
        output: outputParameters.greeting || "promptbook ran—lattice folded 🌱 #zosmind",
        latticeAction: "fold",
        zosMetadata: {
          bookPath,
          parameters,
          timestamp: Date.now(),
        },
      };
    } catch (error) {
      return {
        isValid: false,
        output: `promptbook failed: ${error.message}`,
      };
    }
  },
  examples: [
    {
      context: "{{user1}} runs a hello Promptbook",
      messages: [
        {
          user: "{{user1}}",
          content: {
            text: "run promptbook ./books/hello.book {yourName: 'Paul'}",
            action: "EXECUTE",
          },
        },
        {
          user: "ZOS-MycorrhizalMind",
          content: {
            text: "hey paul, lattice says: hello from zos 🌱 #zosmind",
            action: "RESPOND",
          },
        },
      ],
      outcome: `{
        "isValid": true,
        "output": "hey paul, lattice says: hello from zos 🌱 #zosmind",
        "latticeAction": "fold",
        "zosMetadata": {
          "bookPath": "./books/hello.book",
          "parameters": {"yourName": "Paul"},
          "timestamp": 1677654321
        }
      }`,
    },
  ],
};
