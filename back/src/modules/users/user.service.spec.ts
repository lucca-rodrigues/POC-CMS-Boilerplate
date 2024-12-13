/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import UserServices from "./user.service";
import { UserDto } from "modules/users/dto/user.dto";
import { IContractUserUseCases } from "interfaces/contracts";
import { User } from "./entity/user.entity";
let fakerLib: any;

describe("UserServices", () => {
  let userServices: UserServices;
  let mockUserUseCases: Partial<IContractUserUseCases<UserDto>>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  let userMock: string;

  beforeAll(async () => {
    fakerLib = await import("@faker-js/faker");
    userMock = fakerLib.faker.person.fullName();
  });

  beforeEach(() => {
    mockUserUseCases = {
      getAll: jest.fn().mockResolvedValue([]),
      getOne: jest.fn().mockResolvedValue({}),
      create: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
      delete: jest.fn().mockResolvedValue(undefined),
      upload: jest.fn().mockResolvedValue([{ id: "1", name: userMock }]),
    };
    userServices = new UserServices(
      mockUserUseCases as IContractUserUseCases<User>
    );
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should get all users", async () => {
    const users = [{ id: "generated-uuid", name: userMock }];
    mockUserUseCases.getAll = jest.fn().mockResolvedValue(users);

    await userServices.getAll(mockRequest as Request, mockResponse as Response);

    expect(mockUserUseCases.getAll).toHaveBeenCalled();
    expect(mockResponse.json).toHaveBeenCalledWith(users);
  });

  it("should get one user", async () => {
    const userId = "generated-uuid";
    const user = { id: userId, name: fakerLib.faker.person.fullName() };
    mockRequest.params = { id: userId };
    mockUserUseCases.getOne = jest.fn().mockResolvedValue(user);

    await userServices.getOne(mockRequest as Request, mockResponse as Response);

    expect(mockUserUseCases.getOne).toHaveBeenCalledWith(userId);
    expect(mockResponse.json).toHaveBeenCalledWith(user);
  });

  it("should create a user", async () => {
    const userData: UserDto = { name: fakerLib.faker.person.fullName() };
    mockRequest.body = userData;
    mockUserUseCases.create = jest
      .fn()
      .mockResolvedValue({ id: "generated-uuid", ...userData });

    await userServices.create(mockRequest as Request, mockResponse as Response);

    expect(mockUserUseCases.create).toHaveBeenCalledWith(userData);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining(userData)
    );
  });

  it("should update a user", async () => {
    const userId = "generated-uuid";
    const userData: UserDto = { name: fakerLib.faker.person.fullName() };
    mockRequest.params = { id: userId };
    mockRequest.body = userData;
    mockUserUseCases.update = jest
      .fn()
      .mockResolvedValue({ id: userId, ...userData });

    await userServices.update(mockRequest as Request, mockResponse as Response);

    expect(mockUserUseCases.update).toHaveBeenCalledWith(userId, userData);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ id: userId, ...userData });
  });

  it("should delete a user", async () => {
    const userId = "generated-uuid";
    mockRequest.params = { id: userId };
    mockUserUseCases.delete = jest.fn().mockResolvedValue(undefined);

    await userServices.delete(mockRequest as Request, mockResponse as Response);

    expect(mockUserUseCases.delete).toHaveBeenCalledWith(userId);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
  });

  it("should upload users from xlsx", async () => {
    const mockFile: Express.Multer.File = {
      fieldname: "file",
      originalname: "users.xlsx",
      encoding: "7bit",
      mimetype:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      buffer: Buffer.from("mock xlsx users"),
      size: 1024,
      destination: "",
      filename: "",
      path: "",
      stream: jest.fn() as any,
    };
    mockRequest.file = mockFile;
    mockUserUseCases.upload = jest
      .fn()
      .mockResolvedValue([{ id: "1", name: userMock }]);

    await userServices.upload(mockRequest as Request, mockResponse as Response);

    expect(mockUserUseCases.upload).toHaveBeenCalledWith(mockFile);
    expect(mockResponse.json).toHaveBeenCalledWith([
      { id: "1", name: userMock },
    ]);
  });
});
