import DebugConfig from "../Config/DebugConfig";
import FixtureApi from "./FixtureApi";

export default {
  create: DebugConfig.useFixtures ? FixtureApi : {},
};

export interface Api {}
