import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("pages")
export class Pages {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
}
