import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("settings")
export class Settings {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
}
