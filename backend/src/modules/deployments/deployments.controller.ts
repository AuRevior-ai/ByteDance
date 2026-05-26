import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { randomUUID } from "node:crypto";

@Controller("deployments")
export class DeploymentsController {
  @Post()
  create(@Body() body: { artifactId: string }) {
    return {
      id: randomUUID(),
      artifactId: body.artifactId,
      status: "success",
      previewUrl: "http://localhost:3000/demo/portfolio",
      logs: ["build started", "static files generated", "mock deploy completed"],
    };
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return {
      id,
      status: "success",
      previewUrl: "http://localhost:3000/demo/portfolio",
    };
  }
}
