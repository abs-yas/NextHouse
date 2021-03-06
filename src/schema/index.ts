import { buildSchemaSync, Query, Resolver } from "type-graphql";
// import { ImageResolver } from "./image";
// import { HouseResolver } from "./house";
import { authChecker } from "./auth";

@Resolver()
class DummyResolver {
  @Query(() => String)
  hello() {
    return "Asalamualaykum";
  }
}

export const schema = buildSchemaSync({
  resolvers: [DummyResolver],
  emitSchemaFile: process.env.NODE_ENV === "development",
  authChecker,
});
