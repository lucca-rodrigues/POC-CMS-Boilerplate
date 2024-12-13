import { Router } from "express";
import { validator } from "infra";

import SettingsService from "modules/settings/settings.service";
import SettingsUseCases from "modules/settings/settings.useCases"; 
import { SettingsDto } from "modules/settings/dto/settings.dto";

const controller = Router();
const settingsUseCases = new SettingsUseCases(); 
const settingsService = new SettingsService(settingsUseCases);

controller.get("/", (req, res) => settingsService.getAll(req, res));
controller.get("/:id", (req, res) => settingsService.getOne(req, res));
controller.post("/", validator(SettingsDto), (req, res) => settingsService.create(req, res));
controller.put("/:id", validator(SettingsDto), (req, res) => settingsService.update(req, res));
controller.delete("/:id", (req, res) => settingsService.delete(req, res));

export default controller;