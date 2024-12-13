import { Router } from "express";
import { validator } from "infra";

import PagesService from "modules/pages/pages.service";
import PagesUseCases from "modules/pages/pages.useCases"; 
import { PagesDto } from "modules/pages/dto/pages.dto";

const controller = Router();
const pagesUseCases = new PagesUseCases(); 
const pagesService = new PagesService(pagesUseCases);

controller.get("/", (req, res) => pagesService.getAll(req, res));
controller.get("/:id", (req, res) => pagesService.getOne(req, res));
controller.post("/", validator(PagesDto), (req, res) => pagesService.create(req, res));
controller.put("/:id", validator(PagesDto), (req, res) => pagesService.update(req, res));
controller.delete("/:id", (req, res) => pagesService.delete(req, res));

export default controller;