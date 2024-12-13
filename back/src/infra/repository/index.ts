import { AppDataSource } from "data-source";

import { User } from "modules/users/entity/user.entity";
export const userRepository = AppDataSource.getRepository(User);

import { Pages } from "modules/pages/entity/pages.entity";
export const pagesRepository = AppDataSource.getRepository(Pages);

import { Settings } from "modules/settings/entity/settings.entity";
export const settingsRepository = AppDataSource.getRepository(Settings);
