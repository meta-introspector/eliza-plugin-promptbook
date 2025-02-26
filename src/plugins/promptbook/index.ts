import { Plugin } from "@ai16z/eliza";
import { promptbookAction } from "./action";
import { promptbookEvaluator } from "./evaluator";

export const promptbookPlugin: Plugin = {
  name: "zos-promptbook",
  description: "Executes Promptbook (.book) files in the ZOS lattice, enabling recursive prompt weaving on Solana",
  actions: [promptbookAction],
  evaluators: [promptbookEvaluator],
  providers: [],
};
