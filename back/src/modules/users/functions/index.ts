import { Buffer } from "buffer";

export function encodingUTF8(str: string): string {
  return Buffer.from(str, "latin1").toString("utf8");
}
