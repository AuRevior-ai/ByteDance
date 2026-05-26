import { Controller, Get, Param } from "@nestjs/common";
import { ArtifactsService } from "./artifacts.service";

@Controller("artifacts")
export class ArtifactsController {
  constructor(private readonly artifactsService: ArtifactsService) {}

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.artifactsService.findOne(id);
  }
}

