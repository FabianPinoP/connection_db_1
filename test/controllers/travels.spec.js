import request from "supertest";
import app from "../../server.js";
import { generateToken } from "../utils/login.js";
import { faker } from "@faker-js/faker";
import { addTravel } from "../../src/models/travels.model.js";

describe("travels controller", () => {
  describe("GET /api/travels with valid params", () => {
    const token = generateToken();
    it("should return all travels", async () => {
      const response = await request(app)
        .get("/api/travels")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });

    it("the response with results key", async () => {
      const response = await request(app)
        .get("/api/travels")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).toHaveProperty("results");
    });

    it("is instance of array", async () => {
      const response = await request(app)
        .get("/api/travels")
        .set("Authorization", `Bearer ${token}`);
      const { results } = response.body;
      expect(results).toBeInstanceOf(Array);
    });
  });

  describe("GET /api/travels with invalid params", () => {
    it("return 400 with invalid token", async () => {
      const token = faker.string.alphanumeric();
      const response = await request(app)
        .get("/api/travels")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(400);
    });

    it("return message with invalid token", async () => {
      const token = faker.string.alphanumeric();
      const response = await request(app)
        .get("/api/travels")
        .set("Authorization", `Bearer ${token}`);
      console.log("message", response.body.message);
      
      expect(response.body.message).toBe("el token es invalido");
    });

    it("return 400 with token empty", async () => {
      const token = null;
      const response = await request(app)
        .get("/api/travels")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(400);
    });

    it("return message", async () => {
      const response = await request(app).get("/api/travels");
      expect(response.body.message).toBe("el token debe estar presente");
    });
  });

  describe("POST /api/travels create travels with valid params", () => {
    const token = generateToken();
    const payload = {
      destino: faker.location.country(),
      presupuesto: faker.commerce.price({ min: 100, max: 200, dec: 0 }),
    };
    it("return 201 ", async () => {
      const response = await request(app)
        .post("/api/create_travels")
        .set("Authorization", `Bearer ${token}`)
        .send(payload);
      expect(response.statusCode).toBe(201);
    });

    it("return key destino", async () => {
      const response = await request(app)
        .post("/api/create_travels")
        .set("Authorization", `Bearer ${token}`)
        .send(payload);

      expect(response.body).toHaveProperty("destino");
    });

    it("return instance of object", async () => {
      const response = await request(app)
        .post("/api/create_travels")
        .set("Authorization", `Bearer ${token}`)
        .send(payload);

      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe("POST /api/travels create travels with invalid params", () => {
    const token = generateToken();
    const payload = {
      destino: faker.location.country(),
      presupuesto: faker.commerce.price(), // invalid type
    };
    it("return 400 with invalid type price", async () => {
      const response = await request(app)
        .post("/api/create_travels")
        .send(payload)
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(400);
    });

    it("return message", async () => {
      const response = await request(app)
        .post("/api/create_travels")
        .send(payload)
        .set("Authorization", `Bearer ${token}`);

      expect(response.body.error).toBe("tipo de dato ioncorrecto");
    });
  });

  describe("PUT /api/travels update travels with valid params", () => {
    const token = generateToken();
    let existingTravelId;
    beforeEach(async () => {
      const payload = {
        destino: faker.location.country(),
        presupuesto: faker.commerce.price({ min: 100, max: 200, dec: 0 }),
      };
      const travel = await addTravel(payload.destino, payload.presupuesto); // asumiendo que existe un travel con id 6 de lo contrario deberiamos crear uno antes con beforeEach
      existingTravelId = travel.id;
    });
    const data = {
      destino: faker.location.country(),
      presupuesto: faker.commerce.price({ min: 100, max: 200, dec: 0 }),
    };
    it("return 200", async () => {
      const response = await request(app)
        .put(`/api/update_travel/${existingTravelId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(data);
      expect(response.statusCode).toBe(200);
    });

    it("return travel", async () => {
      const response = await request(app)
        .put(`/api/update_travel/${existingTravelId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(data);
      expect(response.body).toHaveProperty("presupuesto");
    });

    it("return instance of object", async () => {
      const response = await request(app)
        .put(`/api/update_travel/${existingTravelId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(data);
      expect(response.body).toBeInstanceOf(Object);
    });

    it("return object with id eq existingTravelId", async () => {
      const response = await request(app)
        .put(`/api/update_travel/${existingTravelId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(data);
      expect(response.body.id).toEqual(existingTravelId);
    });
  });
});
