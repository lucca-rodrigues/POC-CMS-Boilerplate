/* eslint-disable @typescript-eslint/no-explicit-any */
import { userRepository } from "infra/repository";
import UserUseCases from "modules/users/user.useCases";
import { ErrorHandler } from "infra/errorHandlers";
import { User } from "./entity/user.entity";
import { encodingUTF8 } from "./functions";
import XLSX from "xlsx";

let fakerLib: any;

jest.mock("infra/repository");
jest.mock("infra/errorHandlers");
jest.mock("./functions");
jest.mock("xlsx");
describe("UserUseCases", () => {
  let userUseCases: UserUseCases;
  let mockUser: User;

  beforeAll(async () => {
    fakerLib = await import("@faker-js/faker");
  });

  beforeEach(() => {
    userUseCases = new UserUseCases();
    mockUser = {
      id: fakerLib.faker.string.uuid(),
      name: fakerLib.faker.person.fullName(),
    } as User;
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should return all users", async () => {
      const mockAllUsers = [{ ...mockUser }];
      (userRepository.find as jest.Mock).mockResolvedValue(mockAllUsers);

      const result = await userUseCases.getAll();

      expect(result).toMatchObject(mockAllUsers);
      expect(userRepository.find).toHaveBeenCalled();
    });

    it("should return an empty array if no users are found", async () => {
      (userRepository.find as jest.Mock).mockResolvedValue([]);

      const result = await userUseCases.getAll();

      expect(result).toEqual([]);
      expect(userRepository.find).toHaveBeenCalled();
    });

    it("should throw an error if repository throws", async () => {
      const error = new Error("Processing failed");
      (userRepository.find as jest.Mock).mockRejectedValue(error);
      (ErrorHandler.InternalServerError as jest.Mock).mockReturnValue(error);

      await expect(userUseCases.getAll()).rejects.toThrow("Processing failed");
      expect(ErrorHandler.InternalServerError).toHaveBeenCalledWith(error);
    });
  });

  describe("getOne", () => {
    it("should return a user if found", async () => {
      (userRepository.findOneBy as jest.Mock).mockResolvedValue(mockUser);

      const result = await userUseCases.getOne(mockUser.id);

      expect(result).toEqual(mockUser);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        id: mockUser.id,
      });
    });

    it("should throw NotFound error if user not found", async () => {
      (userRepository.findOneBy as jest.Mock).mockResolvedValue(null);
      const notFoundError = new Error("User not found");
      (ErrorHandler.NotFound as jest.Mock).mockReturnValue(notFoundError);

      await expect(
        userUseCases.getOne(fakerLib.faker.string.uuid())
      ).rejects.toThrow("User not found");
      expect(ErrorHandler.NotFound).toHaveBeenCalledWith("User not found");
    });

    it("should throw Processing failed error if repository throws", async () => {
      const error = new Error("Some repository error");
      (userRepository.findOneBy as jest.Mock).mockRejectedValue(error);
      (ErrorHandler.InternalServerError as jest.Mock).mockReturnValue(error);

      await expect(userUseCases.getOne(mockUser.id)).rejects.toThrow(
        "Some repository error"
      );
      expect(ErrorHandler.InternalServerError).toHaveBeenCalledWith(error);
    });
  });

  describe("create", () => {
    it("should create and return a new user", async () => {
      const newUserName = fakerLib.faker.person.fullName();
      (userRepository.save as jest.Mock).mockResolvedValue({
        ...mockUser,
        name: newUserName,
      });

      const result = await userUseCases.create({ name: newUserName });

      expect(result).toEqual({ ...mockUser, name: newUserName });
      expect(userRepository.save).toHaveBeenCalledWith({ name: newUserName });
    });

    it("should throw an error if creation fails", async () => {
      const error = new Error("Processing failed");
      (userRepository.save as jest.Mock).mockRejectedValue(error);
      (ErrorHandler.InternalServerError as jest.Mock).mockReturnValue(error);

      await expect(
        userUseCases.create({ name: fakerLib.faker.person.fullName() })
      ).rejects.toThrow("Processing failed");
      expect(ErrorHandler.InternalServerError).toHaveBeenCalledWith(error);
    });
  });

  describe("update", () => {
    it("should update and return the updated user", async () => {
      const updatedName = fakerLib.faker.person.fullName();
      (userRepository.findOneBy as jest.Mock).mockResolvedValue(mockUser);
      (userRepository.update as jest.Mock).mockResolvedValue({ affected: 1 });

      const result = await userUseCases.update(mockUser.id, {
        name: updatedName,
      });

      expect(result).toEqual({ ...mockUser, name: updatedName });
      expect(userRepository.update).toHaveBeenCalledWith(mockUser.id, {
        name: updatedName,
      });
    });

    it("should throw NotFound error if user not found", async () => {
      (userRepository.findOneBy as jest.Mock).mockResolvedValue(null);
      const notFoundError = new Error("User not found");
      (ErrorHandler.NotFound as jest.Mock).mockReturnValue(notFoundError);

      await expect(
        userUseCases.update(fakerLib.faker.string.uuid(), {
          name: fakerLib.faker.person.fullName(),
        })
      ).rejects.toThrow("User not found");
      expect(ErrorHandler.NotFound).toHaveBeenCalledWith("User not found");
    });

    it("should throw Processing failed error if repository throws", async () => {
      const error = new Error("Some update error");
      (userRepository.findOneBy as jest.Mock).mockRejectedValue(error);
      (ErrorHandler.InternalServerError as jest.Mock).mockReturnValue(error);

      await expect(
        userUseCases.update(mockUser.id, { name: "New Name" })
      ).rejects.toThrow("Some update error");
      expect(ErrorHandler.InternalServerError).toHaveBeenCalledWith(error);
    });
  });

  describe("delete", () => {
    it("should delete the user", async () => {
      (userRepository.findOneBy as jest.Mock).mockResolvedValue(mockUser);
      (userRepository.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      await userUseCases.delete(mockUser.id);

      expect(userRepository.delete).toHaveBeenCalledWith(mockUser.id);
    });

    it("should throw NotFound error if user not found", async () => {
      (userRepository.findOneBy as jest.Mock).mockResolvedValue(null);
      const notFoundError = new Error("User not found");
      (ErrorHandler.NotFound as jest.Mock).mockReturnValue(notFoundError);

      await expect(
        userUseCases.delete(fakerLib.faker.string.uuid())
      ).rejects.toThrow("User not found");
      expect(ErrorHandler.NotFound).toHaveBeenCalledWith("User not found");
    });

    it("should throw Processing failed error if repository throws", async () => {
      const error = new Error("Some delete error");
      (userRepository.findOneBy as jest.Mock).mockRejectedValue(error);
      (ErrorHandler.InternalServerError as jest.Mock).mockReturnValue(error);

      await expect(userUseCases.delete(mockUser.id)).rejects.toThrow(
        "Some delete error"
      );
      expect(ErrorHandler.InternalServerError).toHaveBeenCalledWith(error);
    });
  });

  describe("upload", () => {
    it("should upload users from a valid XLSX file", async () => {
      const mockFile: Express.Multer.File = {
        fieldname: "file",
        originalname: "users.xlsx",
        encoding: "7bit",
        mimetype:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        buffer: Buffer.from("mock xlsx data"),
        size: 1024,
        destination: "",
        filename: "",
        path: "",
        stream: jest.fn() as any,
      };

      const mockSheetData = [{ Nome: "Mock User" }];

      (XLSX.read as jest.Mock).mockReturnValue({
        SheetNames: ["Sheet1"],
        Sheets: {
          Sheet1: XLSX.utils.json_to_sheet(mockSheetData),
        },
      });

      (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue(mockSheetData);

      (encodingUTF8 as jest.Mock).mockImplementation((name) => name);

      (userRepository.save as jest.Mock).mockResolvedValue(mockUser);

      const result = await userUseCases.upload(mockFile);

      expect(XLSX.read).toHaveBeenCalledWith(mockFile.buffer, {
        type: "buffer",
      });
      expect(XLSX.utils.sheet_to_json).toHaveBeenCalled();
      expect(userRepository.save).toHaveBeenCalledWith({ name: "Mock User" });
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockUser]);
    });

    it("should throw BadRequest error if no file is uploaded", async () => {
      (ErrorHandler.BadRequest as jest.Mock).mockImplementation((message) => {
        throw new Error(message);
      });

      await expect(userUseCases.upload(null)).rejects.toThrow(
        "No file uploaded"
      );
      expect(ErrorHandler.BadRequest).toHaveBeenCalledWith("No file uploaded");
    });

    it("should throw UploadFailed error if processing fails", async () => {
      const mockFile: Express.Multer.File = {
        fieldname: "file",
        originalname: "users.xlsx",
        encoding: "7bit",
        mimetype:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        buffer: Buffer.from("invalid xlsx data"),
        size: 1024,
        destination: "",
        filename: "",
        path: "",
        stream: jest.fn() as any,
      };

      jest.spyOn(XLSX, "read").mockImplementation(() => {
        throw new Error("XLSX processing failed");
      });

      (ErrorHandler.UploadFailed as jest.Mock).mockImplementation(() => {
        throw new Error("Processing upload failed");
      });

      await expect(userUseCases.upload(mockFile)).rejects.toThrow(
        "Processing upload failed"
      );
      expect(ErrorHandler.UploadFailed).toHaveBeenCalled();
    });
  });
});
